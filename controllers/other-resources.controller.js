const controller = (server) => {
    server.route({
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        path: '/alwaysbad',
        handler: (request, reply) => {
          return reply(`Nope, this method won't work`).code(418);
        }
      });
    
      server.route({
        method: ['GET'],
        path: '/gimme-cookie',
        handler: (request, reply) => {
          return request.state['visited'] === 'true'
            ? reply(`Hi again!`)
            : reply(`Oh, I see you're new here. Grab a cookie!`)
                .state('visited', 'true');
        },
        config: {
          tags: ['api'],
          description: 'set-cookie example',
          notes: 'Example of setting cookie in your browser. The cookie name is `visited`'
        }
      });
};

module.exports = controller;