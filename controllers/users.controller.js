const Joi = require('joi');

const responseUtils = require('../utils/response-utils');
let { users, lists } = require('../data');

const controller = (server) => {
  server.route({
    method: 'GET',
    path: '/users/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, users, request.query);
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
    method: 'GET',
    path: '/users/{id}/lists',
    handler: (request, reply) => {
      return responseUtils.buildNestedResourceGetResponse(
        request, reply, users, 
        user => lists.filter(list => list.userId == user.id));
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
    path: '/users',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, users, 'users');
    },
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          username: Joi.string().required()
        }).required()
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/users/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, users, 'users');
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
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: (request, reply) => {
      const { elements, response } = responseUtils.buildDeleteResponse(request, reply, [...users]);
      users = elements;
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
