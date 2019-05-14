const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/618e16c733b195ead12f3c073d9503a5/'+latitude+','+longitude

    request({url, json:true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to server!', undefined)
        }else if(body.error){
            callback('Invalid location entered!', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature + ' degrees out. There is a '+body.currently.precipProbability + '% chance of rain.')
        }
    })
} 

module.exports = forecast