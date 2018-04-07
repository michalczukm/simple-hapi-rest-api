const Joi = require('joi');

const responseUtils = require('../utils/response-utils');
const joiValidationUtils = require('../utils/joi-validation-utils');
let { lists, items } = require('../data');

const controller = (server) => {
  server.route({
    method: 'GET',
    path: '/lists/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, lists, request.query);
    },
    config: {
      tags: ['api'],
      description: `You can paginate list on this endpoint. Default items per page ${responseUtils.PAGINATION_DEFAULT_LIMIT}`,
      validate: {
        headers: { ...joiValidationUtils.paginationHeaders },
        params: {
          id: Joi.number().integer().allow(null).optional()
        },
        query: {
          userId: Joi.number().integer().optional()
        },
        options: {
          allowUnknown: true
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/lists/{id}/items',
    handler: (request, reply) => {
      return responseUtils.buildNestedResourceGetResponse(
        request, reply, lists, 
        list => items.filter(item => item.listId == list.id));
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().integer().required()
        }
      }
    }
  });

  server.route({
    method: ['POST'],
    path: '/lists',
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
        }).required()
      }
    }
  });

  server.route({
    method: ['PUT'],
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
    method: ['PUT'],
    path: '/lists/{id}/move',
    handler: require('./handlers/lists/move-list.handler'),
    config: {
      tags: ['api'],
      description: 'Example of non CRUD operation. Move the list to another user - pass the user ID in body to do that',
      validate: {
        payload: Joi.object({
          userId: Joi.number().integer().required()
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
