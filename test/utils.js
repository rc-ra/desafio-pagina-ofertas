'use strict';
var utils = require('../server/utils'),
	assert = require('assert');

describe('Utils', function() {
	describe('Cache', function() {
		it('should get cache', function(done) {
			utils.getCache({
				get: function(id) {
					assert.strictEqual(id, 'cache-0');
					return 'cache string';
				}
			}, 0, function(err, cache) {
				assert.strictEqual(err, null);
				assert.strictEqual(cache, 'cache string');
				done();
			});
		});
		it('should get no cache', function(done) {
			utils.getCache({
				get: function(id) {
					assert.strictEqual(id, 'cache-1');
					return false;
				}
			}, 1, function(err) {
				assert.strictEqual(err, true);
				done();
			});
		});
		it('should set cache', function(done) {
			utils.setCache({
				set: function(id, data) {
					assert.strictEqual(id, 'cache-2');
					assert.strictEqual(data, 'testing str');
				}
			}, 2, 'testing str', function(err) {
				assert.strictEqual(err, null);
				done();
			});
		});
	});
});