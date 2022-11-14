import { Request, Response } from 'express';
import { appCache } from '../cache';

const cacheTraces = (req: Request, res: Response, next: Function) : Response<any, Record<string, any>> | undefined => {
    const { ip } = req.body;
    if(appCache.has(ip)) {
        return res.status(200).send(appCache.get(ip));
    }
    next();
}

export {
    cacheTraces
}