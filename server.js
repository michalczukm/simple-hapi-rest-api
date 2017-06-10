'use strict'

const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')
const Pack = require('./package.json')

const swaggerOptions = {
  basePath: '/api/',
  pathPrefixSize: 2,
  payloadType: 'json',
  info: {
    title: Pack.description,
    version: Pack.version
  }
}

const server = new Hapi.Server()

server.connection({
  port: process.env.PORT || 5050,
  routes: {
    cors: true
  }
})

server.realm.modifiers.route.prefix = '/api'

require('./controllers/lists.controller')(server)
require('./controllers/items.controller')(server)
require('./controllers/users.controller')(server)

server.register([
  Inert, Vision,
  { register: HapiSwagger, options: swaggerOptions }
]).then(() => {
  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
}).catch(error => {
  console.error('Server plugins registration failed!')
  throw error
})
