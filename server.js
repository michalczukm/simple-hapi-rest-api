'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 5050,
  routes: {
    cors: true
  }
});

server.realm.modifiers.route.prefix = '/api';

require('./controllers/lists.controller')(server);
require('./controllers/items.controller')(server);
require('./controllers/users.controller')(server);

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
