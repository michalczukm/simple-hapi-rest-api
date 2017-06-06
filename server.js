'use strict'

const Hapi = require('hapi')
const STORAGE = require('./data')
const responseUtils = require('./response-utils');

let lists = STORAGE.lists
let users = STORAGE.users
let items = STORAGE.users

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 5050,
  routes: {
    cors: true
  }
})

// lists
server.route({
  method: 'GET',
  path: '/lists/{id?}',
  handler: (request, reply) => {
    return responseUtils.buildGetResponse(request, reply, lists)
  }
})

server.route({
  method: ['POST', 'PUT'],
  path: '/lists/{id?}',
  handler: (request, reply) => {
    return responseUtils.buildCreateOrUpdateResponse(request, reply, lists)
  }
})

// items
server.route({
  method: 'GET',
  path: '/items/{id?}',
  handler: (request, reply) => {
    return responseUtils.buildGetResponse(request, reply, items)
  }
})

server.route({
  method: ['POST', 'PUT'],
  path: '/items/{id?}',
  handler: (request, reply) => {
    return responseUtils.buildCreateOrUpdateResponse(request, reply, items)
  }
})

// users
server.route({
  method: 'GET',
  path: '/users/{id?}',
  handler: (request, reply) => {
    return responseUtils.buildGetResponse(request, reply, users)
  }
})

server.route({
  method: ['POST', 'PUT'],
  path: '/users/{id?}',
  handler: (request, reply) => {
    return responseUtils.buildCreateOrUpdateResponse(request, reply, users)
  }
})


server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
