"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestTraces = exports.appCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const appCache = new node_cache_1.default({ stdTTL: 3599 });
exports.appCache = appCache;
const requestTraces = [];
exports.requestTraces = requestTraces;
