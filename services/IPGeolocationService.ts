import axios from "axios";
import { utils } from '../commons';
import { requestTraces } from '../cache';

/**
 * Getting trace by ip
 * @param {ip} req 
 * @param {*} res 
 */
const ipTraces = async (ip: string) => {
    let result;
    try{
        const response = await axios.post(`${process.env.IP_API_BASE_URL}/json/${ip}?fields=country,countryCode,lat,lon,currency,query`);
        result = {
            status: response?.status,
            data: await ipTracesResponseMapping(response?.data),
         };
         saveHistoryTraces(response?.data);
    }catch(error){
        throw(error);
    }
    return result;
}

const saveHistoryTraces = (newTraceData: any) => {
    const newYorkLatLon = { "lat": 40.7127837, "lon": -74.0059413 };
    let traceToSave = requestTraces.find((trace: any) => trace.country === newTraceData.country);
    if(!traceToSave){
        requestTraces.push({  
            country: newTraceData.country, 
            tracesCount: 1, 
            distanceFromUSA: utils.getDistanceFromLatLonInKm(newTraceData.lat, newTraceData.lon, newYorkLatLon.lat, newYorkLatLon.lon) });
    }else{
        traceToSave = {
            country: traceToSave.country,
            tracesCount: traceToSave.tracesCount++,
        }
    }
}

/**
 * Getting statistics
 */
const getStatistics = () => {   
    let result: any = {
        mostTracedFound: '',
        longestDistranceFound: ''
    };
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
            "apikey": process.env.API_LAYER_KEY
        }
        const response = await axios.get(`${process.env.API_LAYER_BASE_URL}/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, { headers });
        result = currencyResponseMapping(response?.data);
    }catch(error){
        throw(error);
    }
    return result;
}

/* Mapping the final response */
const ipTracesResponseMapping = async (ipData: any) => {
    let response = {};
    if(ipData){
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
    }
    return response;
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
}