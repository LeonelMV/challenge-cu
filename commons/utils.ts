const getDistanceFromLatLonInKm: Function = (lat1: number, lon1: number, lat2: number, lon2: number) : number => {
	var R: number = 6371; // Radius of the earth in km
	var dLat: number = deg2rad(lat2-lat1);  // deg2rad below
	var dLon: number = deg2rad(lon2-lon1); 
	var a: number = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d: number = R * c; // Distance in km
	return d;
}

const deg2rad = (deg: number) : number => {
	return deg * (Math.PI/180)
}

const validateIPaddress = (ip: string) : boolean => {  
    let isValidIP: boolean = false;
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {  
        isValidIP = true;
    }  
    return isValidIP;  
}  


export default {
	validateIPaddress,
    getDistanceFromLatLonInKm,
}