'use strict';
var //utils = require('./utils'),
	fs = require('fs'),
	iconvlite = require('iconv-lite');


module.exports = {
	checkCache: function(req, res, next) {
		var cacheValidator = req.app.get('cacheValidator'),
			now = ((new Date()).getTime() + '').substr(0, 8);

		if(cacheValidator === now) {
			req.hasCache = true;
			return next();
		}

		fs.stat('offer.txt', function(err, stat) {
			var time = ((new Date(stat.mtime)).getTime() + '').substr(0, 8);
			if(!cacheValidator || cacheValidator !== time) {
				req.app.set('cacheValidator', time);
				req.hasCache = false;
			}
			else {
				req.hasCache = true;
			}
			next();
		});
	},
	getDB: function(req, res, next) {
		if(req.hasCache)
			return next();

		fs.readFile('offer.txt', function(err, data) {
			if(err)
				return next(err);
			
			req.db = JSON.parse(iconvlite.decode(data, 'latin1'));
			next();
		});
		
	}
};