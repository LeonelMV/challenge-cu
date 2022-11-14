import nodecache from 'node-cache';

const appCache = new nodecache({ stdTTL : 3599});

const requestTraces: Array<any> = [];

export { 
    appCache,
    requestTraces
};