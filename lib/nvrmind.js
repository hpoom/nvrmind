var Hapi = require('hapi');
var Good = require('good');
var Tv = require('tv');
var cms = require('../controllers/cms');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply.view('index', { sites: cms.getSites() });
	}
});

server.route({
	method: 'GET',
	path: '/{site}',
	handler: function (request, reply) {
		//reply(cms.fetchSitePage(request.params.site));
		reply( 'placeholder' );
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

	server.views({
		engines: {
			html: require('handlebars')
		},
		path: './templates'
	});
});
