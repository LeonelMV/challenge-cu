"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheTraces = void 0;
const cache_1 = require("../cache");
const cacheTraces = (req, res, next) => {
    const { ip } = req.body;
    if (cache_1.appCache.has(ip)) {
        return res.status(200).send(cache_1.appCache.get(ip));
    }
    next();
};
exports.cacheTraces = cacheTraces;
