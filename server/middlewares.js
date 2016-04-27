'use strict';
var //utils = require('./utils'),
	fs = require('fs'),
	iconvlite = require('iconv-lite');


module.exports = {
	checkCache: function(req, res, next) {
		var cacheValidator = req.app.get('cacheValidator');
		fs.stat('offer.txt', function(err, stat) {
			if(!cacheValidator || cacheValidator !== stat.mtime) {
				req.app.set('cacheValidator', stat.mtime);
				req.app.set('hasCache', false);
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