const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=10ce118c33617aaf55fe09b727a8a0e9&query=${long},${lat}`;
    request( {url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect weather service.", undefined);
        } else if(body.error) {
            callback("Unable to find coordinates.", undefined);
        } else {
            callback(undefined, 
                body.current.weather_descriptions + 
                '. It is currently ' + body.current.temperature + 
                ' degress out. There is ' + body.current.precip + 
                '% chance of rain.');
        }
    });
}

module.exports = forecast;