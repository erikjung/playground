var Hapi = require('hapi');
var MiniCrud = require('./minicrud');
var server = new Hapi.Server('localhost', 3000, { cors: true });
var service = new MiniCrud([
  { id: 1, name: 'One', even: 'false' },
  { id: 2, name: 'Two', even: 'true' },
  { id: 3, name: 'Three', even: 'false' },
  { id: 4, name: 'Four', even: 'true' },
  { id: 5, name: 'Five', even: 'false' },
  { id: 6, name: 'Six', even: 'true' }
]);

server.route({
  path: '/thing',
  method: 'GET',
  handler: function (request, reply) {
    var result = service.findAll(request.query);
    reply(result);
  }
});

server.route({
  path: '/thing/{id}',
  method: 'GET',
  handler: function (request, reply) {
    var result = service.findOne({ id: request.params.id });
    reply(result);
  }
});

server.route({
  path: '/thing',
  method: 'POST',
  handler: function (request, reply) {
    var result = service.create(request.payload);
    reply(result);
  }
});

server.route({
  path: '/thing/{id}',
  method: 'PUT',
  handler: function (request, reply) {
    var id = parseInt(request.params.id);
    var result = service.update(id, request.payload);
    reply(result);
  }
});

server.route({
  path: '/thing/{id}',
  method: 'DELETE',
  handler: function (request, reply) {
    var id = parseInt(request.params.id);
    var result = service.destroy(id);
    reply(result);
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});