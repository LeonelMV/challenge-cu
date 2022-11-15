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
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require('ioredis');
const redis = new Redis({
    host: 'redis-18849.c83.us-east-1-2.ec2.cloud.redislabs.com',
    port: 18849,
    password: 'ML7kq1AGP5RkY0yCQ3SRj8KVUQNDKbId'
});
const set = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    let result = false;
    try {
        yield redis.set(key, JSON.stringify(value));
    }
    catch (error) {
        result = false;
    }
    return result;
});
const get = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield redis.get(key);
        return JSON.parse(result);
    }
    catch (err) {
        console.log(err);
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const countriesTraces = yield redis.keys('*');
    const promises = countriesTraces.map((countryTrace) => __awaiter(void 0, void 0, void 0, function* () {
        const trace = yield redis.get(countryTrace);
        return JSON.parse(trace);
    }));
    return yield Promise.all(promises);
});
exports.default = {
    get,
    set,
    getAll,
};
