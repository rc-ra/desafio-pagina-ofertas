'use strict';
var server = require('./server'),
	open = require('open');

if(!module.parent) {
	server.listen(8080, function() {
		console.log('Servidor iniciado!!');
		open('http://localhost:8080/');
	});
}
else {
	module.exports = server;
}