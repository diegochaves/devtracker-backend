const { Router } = require('express')
const routes = Router()
const DevController = require('./controllers/DevController')

routes.get('/', (request, response) => {
  console.log(request.query)
  return response.json({message: 'Hello World!'})
})

routes.post('/dev', DevController.store)

module.exports = routes
