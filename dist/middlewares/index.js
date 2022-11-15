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
exports.cacheTraces = void 0;
const cache_1 = require("../cache");
const services_1 = require("../services");
const commons_1 = require("../commons");
const cacheTraces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ip } = req.body;
        if (cache_1.appCache.has(ip)) {
            commons_1.logger.info("** El pais ya existia en cache de redis **");
            const cachedData = yield cache_1.appCache.get(ip);
            commons_1.logger.info(JSON.stringify(cachedData));
            services_1.IPGeolocationService.saveHistoryTraces(cachedData);
            return res.status(200).send(cachedData);
        }
        else {
            next();
        }
    }
    catch (error) {
        commons_1.logger.error("Error en middleware de cache.");
        commons_1.logger.error(error);
    }
});
exports.cacheTraces = cacheTraces;
