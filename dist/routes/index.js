'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = express_1.default.Router();
const controllers_1 = require("../controllers");
const schemas_1 = require("../controllers/schemas");
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
api.post("/traces", schemas_1.ipTracesSchema, controllers_1.IPGeolocationController.ipTraces);
/**
 * This function comment is parsed by doctrine
 * @route GET /statistics
 * @group statistics
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - object with trace data
 * @returns {Error}  default - Unexpected error
 */
api.get("/statistics", controllers_1.IPGeolocationController.getStatistics);
/** END ROUTES **/
exports.default = api;
