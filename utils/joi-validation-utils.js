const Joi = require('joi');

const responseUtils = require('./response-utils');

module.exports = {
    paginationHeaders: {
        [responseUtils.PAGINATION_HEADERS.page]:
            Joi.number().integer().greater(0).optional().description('Which page you want to get. Set this to use pagination'),
        [responseUtils.PAGINATION_HEADERS.perPage]: 
            Joi.number().integer().greater(0).allow(null).optional().description('How many items per page')
    }
};