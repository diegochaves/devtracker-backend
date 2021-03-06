const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index (request, response) {
    const devs = Dev.find()
    return response.json(devs)
  },
  async store (request, response) {
    const {github_username, techs, latitude, longitude} = request.body
    let dev = await Dev.findOne({github_username})

    if (!dev) {
      const githubApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
      const {name = login, avatar_url, bio} = githubApiResponse.data
      const techsArray = parseStringAsArray(techs)
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
      dev = await Dev.create(devData)
    }

    return response.json(dev)
  }
}
