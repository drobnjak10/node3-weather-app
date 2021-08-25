const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Drobnjak'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'David Drobnjak'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'David Drobnjak'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
         res.send({
            error: "Yout must provide any address!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send(error);
        } 

        forecast(latitude, longitude, (forecastError, forecastData) => {
                if(forecastError) {
                     console.log('for:', forecastError);
                     return res.send(forecastError);
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
                console.log(location)
            })
        
    })
});

app.get('/products', (req,res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    });
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'David Drobnjak',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'David Drobnjak',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server is up on: ', port);
});

