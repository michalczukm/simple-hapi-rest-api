const Joi = require('joi');

const responseUtils = require('../response-utils');
let lists = require('../data').lists;

const controller = (server) => {
  server.route({
    method: 'GET',
    path: '/lists/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, lists);
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().integer().allow(null).optional()
        }
      }
    }
  });

  server.route({
    method: ['POST', 'PUT'],
    path: '/lists/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, lists, 'lists');
    },
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          title: Joi.string().required(),
          userId: Joi.number().integer().required(),
          purpose: Joi.string().optional()
        }).required(),
        params: {
          id: Joi.number().optional()
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/lists/{id}',
    handler: (request, reply) => {
      const { elements, response } = responseUtils.buildDeleteResponse(request, reply, [...lists]);
      lists = elements;
      return response;
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().optional()
        }
      }
    }
  });
};

module.exports = controller;
