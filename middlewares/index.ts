import { Request, Response } from 'express';
import { appCache } from '../cache';
import { IPGeolocationService } from '../services';
import { logger } from '../commons'

const cacheTraces = async (req: Request, res: Response, next: Function) => {
    try{
        const { ip } = req.body;
        if(appCache.has(ip)) {
            logger.info("** El pais ya existia en cache de redis **");
            const cachedData = await appCache.get(ip);
            logger.info(JSON.stringify(cachedData))
            IPGeolocationService.saveHistoryTraces(cachedData);
            return res.status(200).send(cachedData);
        }else{
            next();
        }
    }catch(error){
        logger.error("Error en middleware de cache.");
        logger.error(error);
    }
}

export {
    cacheTraces
}