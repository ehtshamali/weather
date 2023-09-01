const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express
const publicDirectoryPAth = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPAth))

// Set handelbar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ehtasham'
    })
})
app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About Page',
        name: 'Ehtasham'
    })
})
app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Help Page',
        name: 'Ehtasham'
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(! address) {
        return res.send({
            error: 'Please provide address to see weather'
        })
    }
    geocode(address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.Longitude, data.Latitude, (forecasterror, forecastdata) => {
            if(forecasterror) {
                return res.send({
                    error: forecasterror
                })
            }
            res.send({
                Location: data.Placename,
                Temprature: forecastdata
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: '404 Page not found',
        name: 'Ehtasham'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})