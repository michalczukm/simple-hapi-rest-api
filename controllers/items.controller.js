const responseUtils = require('../response-utils')
let items = require('../data').items

const controller = (server) => {
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
      return responseUtils.buildCreateOrUpdateResponse(request, reply, items, 'items')
    }
  })

  // items DELETE - not implemented
  server.route({
    method: 'DELETE',
    path: '/items/{id}',
    handler: (request, reply) => {
      return reply().code(501)
    }
  })
}

module.exports = controller
