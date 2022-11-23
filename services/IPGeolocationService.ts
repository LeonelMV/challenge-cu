import axios from "axios";
import { logger, utils } from '../commons';
import { IPTraceDTO } from '../dto/IPTraceDTO';
import { redisClient } from './index'
import { IPTraceResponse } from '../dto/IPTraceResponse';

/**
 * Getting trace by ip
 * @param {ip} req 
 * @param {*} res 
 */
const ipTraces = async (ip: string): Promise<IPTraceResponse | undefined> => {
    let result: IPTraceResponse | undefined;
    try{
        const { data } = await axios.post<IPTraceDTO>(`${process.env['IP_API_BASE_URL']}/json/${ip}?fields=country,countryCode,lat,lon,currency,query`);
        result = await ipTracesResponseMapping(data);
        await saveHistoryTraces(result);
    }catch(error){
        throw(error);
    }
    return result;
}

const saveHistoryTraces = async (newTraceData: any) => {
    try{
        const newYorkLatLon = { "lat": 40.7127837, "lon": -74.0059413 };
        // Init default trace values
        let traceToSave = {  
            country: newTraceData.name, 
            tracesCount: 1, 
            distanceFromUSA: utils.getDistanceFromLatLonInKm(newTraceData.lat, newTraceData.lon, newYorkLatLon.lat, newYorkLatLon.lon)
        };

        //Check if exist in cache and if exist, replace the current value
        const traceCache = await redisClient.get(newTraceData.name);
        if(traceCache){
            traceToSave = {
                country: traceCache.country,
                tracesCount: traceCache.tracesCount + 1,
                distanceFromUSA: traceCache.distanceFromUSA
            }
        }

        //Setting or Updating in cache
        redisClient.set(traceToSave.country, traceToSave);
    }catch(error){
        logger.error(error);
    }
}

/**
 * Getting statistics
 */
const getStatistics = async () => {   
    let result: any = {
        mostTracedFound: '',
        longestDistranceFound: ''
    };
    const requestTraces = await redisClient.getAll();
    if(requestTraces.length > 0){
        let mostTracedFound : any;
        let longestDistranceFound : any;
        requestTraces.forEach((requestTrace: any) => {
            if(!mostTracedFound || (mostTracedFound.tracesCount < requestTrace.tracesCount)){
                mostTracedFound = requestTrace;
            }
            if(!longestDistranceFound || (longestDistranceFound.distanceFromUSA < requestTrace.distanceFromUSA)){
                longestDistranceFound = requestTrace;
            }
        });
    
        result =  {
            longest_distance: {
                country: longestDistranceFound.country,
                value: longestDistranceFound.distanceFromUSA
            },
            most_traced: {
                country: mostTracedFound.country,
                value: mostTracedFound.tracesCount
            },
        }
    }
    return result;
}

const convertCurrency = async (fromCurrency: string, toCurrency : string = "USD", amount: number = 1) => {
    let result;
    try{
        const headers = {
            "apikey": process.env['API_LAYER_KEY']
        }
        const response = await axios.get(`${process.env['API_LAYER_BASE_URL']}/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, { headers });
        result = currencyResponseMapping(response?.data);
    }catch(error){
        throw(error);
    }
    return result;
}

/* Mapping the final response */
const ipTracesResponseMapping = async (ipData: IPTraceDTO): (Promise<IPTraceResponse | undefined>) => {
    try{
        if(ipData){
            let response: IPTraceResponse;
            const { country: name, countryCode: code, lat, lon, query: ip, currency } = ipData;
            const newYorkLatLon = { "lat": 40.7127837, "lon": -74.0059413 };
            response = {
                ip,
                name, 
                code, 
                lat, 
                lon,
                currencies: await convertCurrency(currency),
                distance_to_usa: parseFloat(utils.getDistanceFromLatLonInKm(lat, lon, newYorkLatLon.lat, newYorkLatLon.lon).toFixed(2)),
            }
            return response;
        }
    }catch(error){
        logger.error(error);
    }
    return;
}

/* Mapping the final response */
const currencyResponseMapping = (currencyData: any) : Array<any> => {
    let currencies: Array<any> = [];
    if(currencyData){
        currencies = [
            { 
                iso: currencyData?.query?.from,
                symbol: '$',
                conversion_date: currencyData?.info?.rate
            },
            {
                iso: currencyData?.query?.to,
                symbol: '$',
                conversion_date: currencyData?.query?.amount
            }
        ];
    }
    return currencies;
}

export default {
    ipTraces,
    getStatistics,
    saveHistoryTraces,
}