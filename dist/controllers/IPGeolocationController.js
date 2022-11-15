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
const express_validator_1 = require("express-validator");
const cache_1 = require("../cache");
const services_1 = require("../services");
const commons_1 = require("../commons");
const ipTraces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultValidationReq = (0, express_validator_1.validationResult)(req);
        const hasErrors = !resultValidationReq.isEmpty();
        if (hasErrors) {
            return res.status(400).send(resultValidationReq);
        }
        const { ip } = req.body;
        const result = yield services_1.IPGeolocationService.ipTraces(ip);
        cache_1.appCache.set(ip, result === null || result === void 0 ? void 0 : result.data);
        res.status(result === null || result === void 0 ? void 0 : result.status).send(result === null || result === void 0 ? void 0 : result.data);
    }
    catch (error) {
        commons_1.logger.error(error);
        res.status(500).send(error);
    }
});
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield services_1.IPGeolocationService.getStatistics();
        res.status(200).send(result);
    }
    catch (error) {
        commons_1.logger.error(error);
        res.status(500).send(error);
    }
});
exports.default = {
    ipTraces,
    getStatistics,
};
