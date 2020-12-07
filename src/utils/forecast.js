const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ea08fd8740e05657001732801e196234&query=${lat},${lon}&limit=1`
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                fellsLike: body.current.feelslike
            })
            //callback(undefined, `${response.body.current.weather_descriptions[0]}: It is currently ${response.body.current.temperature}º. But it feels like ${response.body.current.feelslike}º`)
        }
    })
}

module.exports = forecast