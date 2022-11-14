"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const commons_1 = require("../commons");
const cache_1 = require("../cache");
/**
 * Getting trace by ip
 * @param {ip} req
 * @param {*} res
 */
const ipTraces = (ip) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    try {
        const response = yield axios_1.default.post(`${process.env.IP_API_BASE_URL}/json/${ip}?fields=country,countryCode,lat,lon,currency,query`);
        result = {
            status: response === null || response === void 0 ? void 0 : response.status,
            data: yield ipTracesResponseMapping(response === null || response === void 0 ? void 0 : response.data),
        };
        saveHistoryTraces(response === null || response === void 0 ? void 0 : response.data);
    }
    catch (error) {
        throw (error);
    }
    return result;
});
const saveHistoryTraces = (newTraceData) => {
    const newYorkLatLon = { "lat": 40.7127837, "lon": -74.0059413 };
    let traceToSave = cache_1.requestTraces.find((trace) => trace.country === newTraceData.country);
    if (!traceToSave) {
        cache_1.requestTraces.push({
            country: newTraceData.country,
            tracesCount: 1,
            distanceFromUSA: commons_1.utils.getDistanceFromLatLonInKm(newTraceData.lat, newTraceData.lon, newYorkLatLon.lat, newYorkLatLon.lon)
        });
    }
    else {
        traceToSave = {
            country: traceToSave.country,
            tracesCount: traceToSave.tracesCount++,
        };
    }
};
/**
 * Getting statistics
 */
const getStatistics = () => {
    let result = {
        mostTracedFound: '',
        longestDistranceFound: ''
    };
    if (cache_1.requestTraces.length > 0) {
        let mostTracedFound;
        let longestDistranceFound;
        cache_1.requestTraces.forEach((requestTrace) => {
            if (!mostTracedFound || (mostTracedFound.tracesCount < requestTrace.tracesCount)) {
                mostTracedFound = requestTrace;
            }
            if (!longestDistranceFound || (longestDistranceFound.distanceFromUSA < requestTrace.distanceFromUSA)) {
                longestDistranceFound = requestTrace;
            }
        });
        result = {
            longest_distance: {
                country: longestDistranceFound.country,
                value: longestDistranceFound.distanceFromUSA
            },
            most_traced: {
                country: mostTracedFound.country,
                value: mostTracedFound.tracesCount
            },
        };
    }
    return result;
};
const convertCurrency = (fromCurrency, toCurrency = "USD", amount = 1) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    try {
        const headers = {
            "apikey": process.env.API_LAYER_KEY
        };
        const response = yield axios_1.default.get(`${process.env.API_LAYER_BASE_URL}/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, { headers });
        result = currencyResponseMapping(response === null || response === void 0 ? void 0 : response.data);
    }
    catch (error) {
        throw (error);
    }
    return result;
});
/* Mapping the final response */
const ipTracesResponseMapping = (ipData) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {};
    if (ipData) {
        const { country: name, countryCode: code, lat, lon, query: ip, currency } = ipData;
        const newYorkLatLon = { "lat": 40.7127837, "lon": -74.0059413 };
        response = {
            ip,
            name,
            code,
            lat,
            lon,
            currencies: yield convertCurrency(currency),
            distance_to_usa: parseFloat(commons_1.utils.getDistanceFromLatLonInKm(lat, lon, newYorkLatLon.lat, newYorkLatLon.lon).toFixed(2)),
        };
    }
    return response;
});
/* Mapping the final response */
const currencyResponseMapping = (currencyData) => {
    var _a, _b, _c, _d;
    let currencies = [];
    if (currencyData) {
        currencies = [
            {
                iso: (_a = currencyData === null || currencyData === void 0 ? void 0 : currencyData.query) === null || _a === void 0 ? void 0 : _a.from,
                symbol: '$',
                conversion_date: (_b = currencyData === null || currencyData === void 0 ? void 0 : currencyData.info) === null || _b === void 0 ? void 0 : _b.rate
            },
            {
                iso: (_c = currencyData === null || currencyData === void 0 ? void 0 : currencyData.query) === null || _c === void 0 ? void 0 : _c.to,
                symbol: '$',
                conversion_date: (_d = currencyData === null || currencyData === void 0 ? void 0 : currencyData.query) === null || _d === void 0 ? void 0 : _d.amount
            }
        ];
    }
    return currencies;
};
exports.default = {
    ipTraces,
    getStatistics,
};
