import nodecache from 'node-cache';

const appCache = new nodecache({ stdTTL : 3599});

const requestTraces: any = [];

export { 
    appCache,
    requestTraces
};