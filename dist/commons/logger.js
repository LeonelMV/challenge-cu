"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.simple(),
    defaultMeta: '',
    transports: [
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'logs/info.log', level: 'info' }),
        new winston_1.default.transports.File({ filename: 'logs/warning.log', level: 'warn' }),
        new winston_1.default.transports.File({ filename: 'logs/combined.log' }),
    ],
});
module.exports = logger;
