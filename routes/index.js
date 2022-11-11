'use strict'

const express = require('express');
const api = express.Router();

const { IPGeolocationController } = require("../controllers");

const { ipTracesSchema } = require("../controllers/schemas");

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
api.post("/traces", ipTracesSchema, IPGeolocationController.ipTraces);

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

module.exports = api;
