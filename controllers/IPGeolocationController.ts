import { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { appCache } from "../cache";

import { IPGeolocationService } from '../services';
import { logger } from '../commons';
import { IPTraceResponse } from '../dto/IPTraceResponse';

const ipTraces = async (req: Request, res: Response) => {
    try{
        const resultValidationReq: Result<ValidationError> = validationResult(req);
        const hasErrors: boolean = !resultValidationReq.isEmpty();

        if(hasErrors){
            return res.status(400).send(resultValidationReq); 
        }
        const { ip } = req.body;
        const result: (IPTraceResponse | undefined) = await IPGeolocationService.ipTraces(ip);
        appCache.set(ip, result);
        return res.status(200).send(result)
    }catch(error) {
        logger.error(error);
        return res.status(500).send(error);
    }
}

/**
 * 
 * @param {*} _req 
 * @param {*} res 
 */
const getStatistics = async (_req: Request, res: Response) => {
    try{
        const result = await IPGeolocationService.getStatistics();
        return res.status(200).send(result)
    }catch(error) {
        logger.error(error);
        return res.status(500).send(error);
    }
}

export default {
    ipTraces,
    getStatistics,
}