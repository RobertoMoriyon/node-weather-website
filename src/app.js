const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials/')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directoy to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roberto Moriyon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Roberto Moriyon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        messageHelp: 'here is the message',
        title: 'Help',
        name: 'Roberto Moriyon'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please provide an address to continue'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {

        if(error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })    
        })
    })
})

app.get('/products', (req, res) => {
    // If para cuando no esta Search
    if (!req.query.search) {
        // Usamos return para que cuando encuentre el error salte
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404,  article not found',
        name: 'Roberto Moriyon',
        page: 'Help article not found'
    })
})

// This one has to go last
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Roberto Moriyon',
        page: 'Page not found'
    })
})


// Starting the server up y ha que pasarle el puerto
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
