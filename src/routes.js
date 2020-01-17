const { Router } = require('express')
const routes = Router()
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

routes.get('/', (request, response) => {
  console.log(request.query)
  return response.json({message: 'Hello World!'})
})

routes.get('/dev', DevController.index)
routes.post('/dev', DevController.store)

routes.get('/search', SaerchController.index)

module.exports = routes
