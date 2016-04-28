'use strict';
var fs = require('fs'),
	middlewares = require('../server/middlewares'),
	iconvlite = require('iconv-lite'),
	assert = require('assert');

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
						assert.strictEqual(value, '14617179');
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
						return '14617179';
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