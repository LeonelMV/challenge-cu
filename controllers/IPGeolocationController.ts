import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { appCache } from "../cache";

import { IPGeolocationService } from '../services';
import { logger } from '../commons';

const ipTraces = async (req: Request, res: Response) => {
    try{
        const resultValidationReq = validationResult(req);
        const hasErrors = !resultValidationReq.isEmpty();

        if(hasErrors){
            return res.status(400).send(resultValidationReq); 
        }
        const { ip } = req.body;
        const result = await IPGeolocationService.ipTraces(ip);
        appCache.set(ip, result?.data);
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
const getStatistics = async (req: Request, res: Response) => {
    try{
        const result = await IPGeolocationService.getStatistics();
        res.status(200).send(result)
    }catch(error) {
        logger.error(error);
        res.status(500).send(error);
    }
}

export default {
    ipTraces,
    getStatistics,
}