'use strict';

module.exports = {
	getCache: function(app, id, callback) {
		var cache = app.get('cache-' + id);
		if(cache)
			callback(null, cache);
		else
			callback(true);
	},
	setCache: function(app, id, data, callback) {
		app.set('cache-' + id, data);
		callback(null);
	}
};