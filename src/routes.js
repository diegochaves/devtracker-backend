const axios = require('axios')
const { Router } = require('express')
const routes = Router()
const Dev = require('./models/Dev')

routes.get('/', (request, response) => {
    console.log(request.query)
    return response.json({message: 'Hello World!'})
})

routes.post('/dev', async (request, response) => {
    const {github_username, techs, latitude, longitude} = request.body
    const githubApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    const {name = login, avatar_url, bio} = githubApiResponse.data
    const techsArray = techs.split(',').map(tech => tech.trim())
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }
    const devData = {
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
    }

    const dev = await Dev.create(devData)

    return response.json(dev)
})

module.exports = routes