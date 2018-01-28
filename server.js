'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package.json');
const Basic = require('hapi-auth-basic');
const authService = require('./auth/auth-service');

const swaggerOptions = {
  basePath: '/api/',
  pathPrefixSize: 2,
  payloadType: 'json',
  info: {
    title: Pack.description,
    version: Pack.version
  }
};

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 5050,
  routes: {
    cors: true
  }
})
.state('visited', {
  ttl: null,
  isSecure: false,
  isHttpOnly: true,
  clearInvalid: false,
  strictHeader: true,
  isSameSite: false
});;

server.realm.modifiers.route.prefix = '/api';

const addRoutes = () => {
  require('./controllers/other-resources.controller')(server);
  require('./controllers/lists.controller')(server);
  require('./controllers/items.controller')(server);
  require('./controllers/users.controller')(server);
};

const basicAuthValidation = (request, username, password, callback) => {
  authService.isAuthorized(username, password)
    .then(result => callback(null, result.isValid, result.credentials))
    .catch(error => callback(null, false, error.credentials));
};

server.register([
  Inert, Vision, Basic,
  { register: HapiSwagger, options: swaggerOptions }
]).then(() => {
  server.auth.strategy('simple', 'basic', { validateFunc: basicAuthValidation });

  addRoutes();

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
}).catch(error => {
  console.error('Server plugins registration failed!');
  throw error;
});
