'use strict'

import express, { Router } from 'express';
const api: Router = express.Router();

import { IPGeolocationController } from "../controllers";

import { ipTracesSchema } from "../controllers/schemas";

import { cacheTraces } from "../middlewares";

/** BEGIN ROUTES **/

/**
 * This function comment is parsed by doctrine
 * @route POST /traces
 * @group traces
 * @produces application/json
 * @consumes application/json
 * @param {string} ip.body.required - ip address to trace
 * @returns {object} 200 - object with trace data
 * @returns {Error}  default - Unexpected error
 */
api.post("/traces", ipTracesSchema, cacheTraces, IPGeolocationController.ipTraces);

/**
 * This function comment is parsed by doctrine
 * @route GET /statistics
 * @group statistics
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - object with trace data
 * @returns {Error}  default - Unexpected error
 */
api.get("/statistics", IPGeolocationController.getStatistics);

/** END ROUTES **/

export default api;
