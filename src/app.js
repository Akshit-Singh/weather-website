const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templetes/views')
const partialsPath = path.join(__dirname, '../templetes/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Akshit Singh'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshit Singh'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        message: 'This is a test message!',
        title: 'Help',
        name: 'Akshit Singh'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
            })
    }
    )
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'Akshit Singh',
        errorMessage:'Help artical not found.'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title:'404',
        name:'Akshit Singh',
        errorMessage:'Page not Found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})