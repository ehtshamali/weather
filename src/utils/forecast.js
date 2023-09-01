const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88b3d11d3424f104436bb9f1509db12f&query='+ long +','+ lat +''
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect with Weather Stack API', undefined)
        } else if(response.body.error) {
            callback('Please enter correct location', undefined)
        } else {
            callback(undefined, response.body.current.temperature)
        }
    })
}

module.exports = forecast