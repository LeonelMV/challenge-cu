export interface IPTraceResponse {
    ip: string,
    name: string, 
    code: string, 
    lat: number, 
    lon: number,
    currencies: any[],
    distance_to_usa: number
};