const Redis = require('ioredis');

const redis = new Redis({
    host: 'redis-18849.c83.us-east-1-2.ec2.cloud.redislabs.com',
    port: 18849,
    password: 'ML7kq1AGP5RkY0yCQ3SRj8KVUQNDKbId'
});

const set = async (key: string, value: any) : Promise<boolean> => {
    let result = false;
    try{
        await redis.set(key, JSON.stringify(value));
    }catch(error){
        result = false;
    }
    return result;
}

const get = async (key: string) : Promise<any> => {
    try{
        const result = await redis.get(key);
        return JSON.parse(result);
    }catch(err){
        console.log(err);
    }
}

const getAll = async () => {
    const countriesTraces = await redis.keys('*');
    const promises = countriesTraces.map(async (countryTrace:Array<any>) => {
        const trace = await redis.get(countryTrace);
        return JSON.parse(trace);
    });
    return await Promise.all(promises);
}

export default {
    get,
    set,
    getAll,
}

