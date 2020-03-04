const controller = server => {
  server.route({
    method: 'GET',
    path: '/workshops/hello',
    handler: (_, reply) =>
      reply(
        `<b><span type="img">👋</span> Looks like our server is ready for workshops 😊</b>`
      ).code(200)
  });
};

module.exports = controller;
