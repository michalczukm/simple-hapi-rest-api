/* items API actions require authorization - by Basic-Auth */
const Joi = require('joi');

const responseUtils = require('../utils/response-utils');
let items = require('../data').items;

const v1 = (server) => {
  server.route({
    method: 'GET',
    path: '/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, items, request.query);
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().integer().allow(null).optional()
        },
        query: {
          listId: Joi.number().integer().optional()
        }
      }
    }
  });

  server.route({
    method: ['POST'],
    path: '/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, items, 'items');
    },
    config: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          content: Joi.string().required(),
          listId: Joi.number().integer().required()
        }).required()
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, items, 'items');
    },
    config: {
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
  });

  /*
    DELETE from items
    intentionally not implemented method :)
  */
  server.route({
    method: 'DELETE',
    path: '/items/{id}',
    handler: (request, reply) => {
      return reply().code(501);
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

const v2 = (server) => {
  
  server.route({
    method: 'GET',
    path: '/v2/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildGetResponse(request, reply, items, request.query);
    },
    config: {
      auth: 'simple',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number().integer().allow(null).optional()
        },
        query: {
          listId: Joi.number().integer().optional()
        }
      }
    }
  });

  server.route({
    method: ['POST'],
    path: '/v2/items',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, items, 'items');
    },
    config: {
      auth: 'simple',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          id: Joi.number().optional(),
          content: Joi.string().required(),
          listId: Joi.number().integer().required()
        }).required()
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/v2/items/{id?}',
    handler: (request, reply) => {
      return responseUtils.buildCreateOrUpdateResponse(request, reply, items, 'items');
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
  });

  /*
    DELETE from items
    intentionally not implemented method :)
  */
  server.route({
    method: 'DELETE',
    path: '/v2/items/{id}',
    handler: (request, reply) => {
      return reply().code(501);
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
  });
};

const controller = (server) => {
  v1(server);
  v2(server);
};

module.exports = controller;
