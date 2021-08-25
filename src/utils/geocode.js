const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place&access_token=pk.eyJ1IjoiZHJvYm5qYWsxMCIsImEiOiJja3JjNXQxaGM0d2s0Mm5xaGQzbGl3bWtmIn0.mNd1BdSH2R0yFba-QYF6CQ&limit=1`;

    request({url, json: true}, (error, body) => {
        if(error) {
          callback("Unable to connect location service.", undefined);
        } else if(!body.features || body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: JSON.stringify(body.features[0].geometry.coordinates[1]),
                longitude: JSON.stringify(body.features[0].geometry.coordinates[0]),
                location: JSON.stringify(body.features[0].place_name)
            });
        }
    })
};

module.exports = geocode;