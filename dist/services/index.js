"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.IPGeolocationService = void 0;
const IPGeolocationService_1 = __importDefault(require("./IPGeolocationService"));
exports.IPGeolocationService = IPGeolocationService_1.default;
const redisClient_1 = __importDefault(require("./redisClient"));
exports.redisClient = redisClient_1.default;
