/* items API actions require authorization - by Basic-Auth */
const Joi = require('joi')

const responseUtils = require('../response-utils')
let items = require('../data').items

const controller = (server) => {
  server.route({
    method: 'GET',
    path: '/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, items)
    },
    config: {
      auth: 'simple',
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
    path: '/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, items, 'items')
    },
    config: {
      auth: 'simple',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().optional()
        },
        payload: Joi.object({
          id: Joi.number().optional(),
          content: Joi.string().required(),
          listId: Joi.number().integer().required()
        }).required()
      }
    }
  })

  /*
    DELETE from items
    intentionally not implemented method :)
  */
  server.route({
    method: 'DELETE',
    path: '/items/{id}',
    handler: (request, reply) => {
      return reply().code(501)
    },
    config: {
      auth: 'simple',
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
