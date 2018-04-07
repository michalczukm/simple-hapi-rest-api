const Boom = require('boom');

const responseUtils = require('../../../utils/response-utils');
let { lists, users } = require('../../../data');

module.exports = (request, reply) => {
    const userId = request.payload.userId;

    const list = lists.find(list => list.id == request.params.id);
    const user = users.find(user => user.id == userId);

    if (!user) {
      return reply(Boom.badRequest(`User at given userId doesn't exists`));
    }

    if (list) {
      list.userId = userId;
      return reply().code(200);
    } else {
      return reply(responseUtils.ERROR_NOT_FOUND).code(404);
    }
};