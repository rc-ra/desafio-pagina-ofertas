'use strict';
var fs = require('fs'),
	rmdir = require('rmdir');

fs.stat('cache', function(err, stat) {
	if(err || !stat.isDirectory()) {
		fs.mkdir('cache');
	}
	else {
		rmdir('cache', function(err) {
			if(err)
				throw new Error(err);

			fs.mkdir('cache');
		});
	}
});


module.exports = {
	getCache: function(app, id, callback) {
		var cache = app.get('cache-' + id);
		if(cache)
			callback(cache);
		else
			callback(false);
		// fs.readFile('cache/' + id + '.txt', function(err, data) {
		// 	if(err)
		// 		return callback(false);

		// 	callback(data.toString());
		// });
	},
	setCache: function(app, id, data, callback) {
		app.set('cache-' + id, data);
		callback(null);
		// fs.writeFile('cache/' + id + '.txt', data, callback);
	}
};