const Joi = require('joi')

const responseUtils = require('../response-utils')
let users = require('../data').users

const controller = (server) => {
  server.route({
    method: 'GET',
    path: '/users/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, users)
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().integer().allow(null).optional()
        }
      }
    }
  })

  server.route({
    method: ['POST', 'PUT'],
    path: '/users/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, users, 'users')
    },
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          username: Joi.string().required()
        }).required(),
        params: {
          id: Joi.number().optional()
        }
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: (request, reply) => {
      const { elements, response } = responseUtils.buildDeleteResponse(request, reply, [...users])
      users = elements
      return response
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().optional()
        }
      }
    }
  })
}
module.exports = controller
