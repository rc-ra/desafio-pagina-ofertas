'use strict';
var fs = require('fs'),
	middlewares = require('../server/middlewares'),
	iconvlite = require('iconv-lite'),
	assert = require('assert'),
	mtime;

before(function() {
	var stat = fs.statSync('offer.txt');
	mtime = ((new Date(stat.mtime)).getTime() + '').substr(0, 8);
});
describe('Middlewares', function() {
	describe('Cache', function() {
		it('should return no cache', function(done) {
			var req = {
				app: {
					get: function(str) {
						assert.strictEqual(str, 'cacheValidator');
						return false;
					},
					set: function(str, value) {
						assert.strictEqual(str, 'cacheValidator');
						assert.strictEqual(value, mtime);
					}
				}
			};
			middlewares.checkCache(req, {}, function() {
				assert.strictEqual(req.hasCache, false);

				if(!arguments.length)
					done();
			});
		});
		it('should return cache', function(done) {
			var req = {
				app: {
					get: function(str) {
						assert.strictEqual(str, 'cacheValidator');
						return mtime;
					}
				}
			};
			middlewares.checkCache(req, {}, function() {
				assert.strictEqual(req.hasCache, true);

				if(!arguments.length)
					done();
			});
		});
	});
	describe('`Database`', function() {
		it('should return db content', function(done) {
			middlewares.getDB({hasCache: true}, {}, done);
		});
		it('should return cache response', function(done) {
			var req = {};
			middlewares.getDB(req, {}, function() {
				fs.readFile('offer.txt', function(err, data) {
					if(err)
						return done(err);
					
					assert.deepEqual(req.db, JSON.parse(iconvlite.decode(data, 'latin1')));
					done();
				});
			});
		});
	});
});