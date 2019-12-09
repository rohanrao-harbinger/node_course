const path = require('path');

const express = require('express');
const hbs = require('hbs');
const foreCast = require('../utils/forecast');
const geocode = require('../utils/geocode');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Welcome to express app !!!!',
        'createdBy': 'Rohan Rao'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help will always be given, those who ask for it!!',
        'createdBy': 'Pratik Wayker'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'ABOUT',
        'author': 'Rohan Rao',
        'createdBy': 'Amol Mutyelu'
    });
});

app.get('/weather', (req, res) => {
    if(req.query.address) {
        geocode(req.query.address, (error, data) => {
            if (error) {
               return res.send({
                   'error': 'Error in getting location'
               });
            } 
            foreCast(data, (err, foreCastData) => {
                if(err) {
                   return res.send({
                       'error': 'Error in forecasting'
                   });
                }
               return res.send({
                    'placeName': data.placeName,
                    'latitude': data.latitude,
                    'longitude': data.longitude,
                    'forecast': foreCastData

                });
            });
        });
         
    } else {
        res.send({
            'message': 'Please provide address.'
        });
    }

});

app.get('/help/*', (req, res) => {
    res.render('error',{
        'title': 'Error Page',
        'errorMsg': 'Help article not found'
    });
});

app.get('/*', (req, res) => {
    res.render('error', {
        'title': 'Error Page',
        'errorMsg': 'Page Not Found'
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});