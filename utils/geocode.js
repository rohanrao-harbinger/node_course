const request = require('request');
 
const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoicm9oYW4tcmFvIiwiYSI6ImNrM2U2bTdhMTExczUzbXA4bnFoaGd3OWIifQ.HaXSRyVIwIKQdsX2zyJidg&limit=1`
    request.get({url,
    json: true}, (err, res, body) => {
        if(err) {
           callback('Mapbox API is currently unreachable. Please check your network connection.');
        }else if(!body.features.length) {
            callback('Invalid location');
        }else {
            const data = {
                'latitude': body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'placeName': body.features[0].place_name
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;