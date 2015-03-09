var Hapi = require('hapi');
var Good = require('good');
var Tv = require('tv');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply('Hello, world!');
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function (request, reply) {
			reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
});

server.register([{
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			args:[{ log: '*', response: '*' }]
		}]
	}
},
{
	register: Tv
}], function (err) {
	if (err) {
		throw err; // something bad happened loading the plugin
	}

	server.start(function () {
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});
