const request = require('request');

const foreCast = ({latitude, longitude}, callback) => {
    const url = `https://api.darksky.net/forecast/4125b9c1cdb7dd7e32cebfaffa21d8b7/${latitude}, ${longitude}?units=si`;
    request.get({ url }, (error, response, body) => {
        if (error) {
            callback('Darksky weather API is currently unreachable. Please check your network connection.');
        } else if (response.error) {
            callback('Invalid co-ordiantes');
        } else {
            const parsedBody = JSON.parse(body);
            callback(undefined, `It is current ${parsedBody.currently.temperature} degrees out.
There is ${parsedBody.currently.precipProbability}% chance of rain.
`);

        }
    });

};

module.exports = foreCast;