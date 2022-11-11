const { validationResult } = require('express-validator');

const { IPGeolocationService } = require('../services');
const { logger } = require('../commons');

const ipTraces = async (req, res) => {
    try{
        const resultValidationReq = validationResult(req);
        const hasErrors = !resultValidationReq.isEmpty();

        if(hasErrors){
            return res.status(400).send(resultValidationReq); 
        }
        const { ip } = req.body;
        const result = await IPGeolocationService.ipTraces(ip);
        res.status(result?.status).send(result?.data)
    }catch(error) {
        logger.error(error);
        res.status(500).send(error);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getStatistics = (req, res) => {
    try{
        const result = IPGeolocationService.getStatistics();
        res.status(200).send(result)
    }catch(error) {
        logger.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    ipTraces,
    getStatistics,
}