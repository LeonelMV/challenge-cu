import { Request, Response } from 'express';
import { appCache } from '../cache';

const cacheTraces = (req: Request, res: Response, next: any) => {
    const { ip } = req.body;
    if(appCache.has(ip)){
        return res.status(200).send(appCache.get(ip));
    }
    next();
}

export {
    cacheTraces
}