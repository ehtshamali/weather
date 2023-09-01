const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZWh0YXNoYW1hbGkiLCJhIjoiY2xkdXAyNDJtMDgwcDNwcmZua3U5b2U3cyJ9.9U3EOZJEk1zwZi81HZD12g&limit=1'

    request({url:url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect with Geo Location API', undefined)
        } else if(response.body.features.length === 0) {
            callback('Please enter correct address', undefined)
        } else {
            const placename = response.body.features[0].place_name
            const long = response.body.features[0].center[1]
            const lat = response.body.features[0].center[0]
            callback(undefined, {
                Placename: placename,
                Longitude: long,
                Latitude: lat
            })
        }
    })
}

module.exports = geocode