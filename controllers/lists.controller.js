const Joi = require('joi')

const responseUtils = require('../response-utils')
let lists = require('../data').lists

const controller = (server) => {
  server.route({
    method: 'GET',
    path: '/lists/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, lists)
    },
    config: {
      tags: ['api']
    }
  })

  server.route({
    method: ['POST', 'PUT'],
    path: '/lists/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, lists, 'lists')
    },
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          title: Joi.string().required(),
          userId: Joi.number().required(),
          purpose: Joi.string().optional()
        }).required()
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/lists/{id}',
    handler: (request, reply) => {
      return responseUtils.buildDeleteResponse(request, reply, lists)
    },
    config: {
      tags: ['api']
    }
  })
}

module.exports = controller
