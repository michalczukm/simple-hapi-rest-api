const Joi = require('joi')

const responseUtils = require('../response-utils')
let users = require('../data').users

const controller = (server) => {
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
      return responseUtils.buildCreateOrUpdateResponse(request, reply, users, 'users')
    },
    config: {
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          username: Joi.string().required()
        }).required()
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: (request, reply) => {
      return responseUtils.buildDeleteResponse(request, reply, users)
    }
  })
}
module.exports = controller