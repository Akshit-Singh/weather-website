const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWtzaGl0MDEiLCJhIjoiY2p2M2Y2M2VtMDR1YTN5cG0wYTVqNWl2cyJ9.Ml7fqLmaQ7YMGrWa5lnaRw&limit=1'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to the server!', undefined)
        }else if(body.features.length === 0){
            callback('Invalid location entered!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode