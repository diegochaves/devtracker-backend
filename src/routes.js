const axios = require('axios')
const { Router } = require('express')
const routes = Router()
const Dev = require('./models/Dev')

routes.get('/', (request, response) => {
    console.log(request.query)
    return response.json({message: 'Hello World!'})
})

routes.post('/dev', (request, response) => {
    console.log(request.body)
    const {github_username, techs, latitude, longitude} = request.body
    const techsArray = techs.split(',').map(tech => tech.trim())
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    axios.get(`https://api.github.com/users/${github_username}`)
        .then(({data}) => {
            const {name = login, avatar_url, bio} = data
            const devData = {
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
            }
            Dev.create(devData).then(response => 
                console.log(response))
        })
        .catch(error => {
            console.log(error)
        })
    return response.json({ message: 'ok!'})
})

module.exports = routes