'use strict'

const Hapi = require('hapi')
const STORAGE = require('./data')
const utils = require('./utils')

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
});

const buildGetResponse = (request, reply, elements) => {
    if (request.params.id) {
      const id = encodeURIComponent(request.params.id)
      return reply(elements.find(e => e.id == id))
    } else {
      return reply(elements)
    }
};

// lists
server.route({
  method: 'GET',
  path: '/lists/{id?}',
  handler: (request, reply) => {
    return buildGetResponse(request, reply, lists);
  }
});

server.route({
  method: 'POST',
  path: '/lists',
  handler: (request, reply) => {
    lists = utils.createEntity(request.payload, lists)
    return reply(lists[lists.length - 1]).code(201)
  }
});

server.route({
  method: 'GET',
  path: '/items/{id?}',
  handler: (request, reply) => {
    return buildGetResponse(request, reply, lists);
  }
});

server.route({
  method: 'GET',
  path: '/users/{id?}',
  handler: (request, reply) => {
    return buildGetResponse(request, reply, lists);
  }
})

// Start the server
server.start((err) => {

  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
