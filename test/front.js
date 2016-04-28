var server = require('../'),
	phantom = require('../phantom'),
	assert = require('assert'),
	running;


describe('Front-end', function() {
	beforeEach(function() {
		running = server.listen(8080);
	});
	afterEach(function() {
		running.close();
	});
	it('should change the active image', function(done) {
		phantom('http://localhost:8080/', function() {
			document.querySelector('.imagens .lista img:last-child').click();
			return document.querySelector('.imagens > .ativo').src;
		}, function(imgSrc) {
			assert.strictEqual(imgSrc, 'http://localhost:8080/images/photo1.jpg');
			done();
		});
	});
	it('should change the visible options', function(done) {
		phantom('http://localhost:8080/', function() {
			var departures = document.querySelector('#saidas'),
				days = document.querySelector('#diarias'),
				options = document.querySelectorAll('.opcoes > .opcao'),
				evt;

			departures.options.selectedIndex = 2;
			days.options.selectedIndex = 1;

			evt = new Event('change');

			departures.dispatchEvent(evt);
			days.dispatchEvent(evt);

			return [].slice.call(options).filter(function(option) {
				return !option.style.display;
			}).map(function(option) {
				return option.id;
			});
			
		}, function(optionsAvailable) {
			assert.strictEqual(optionsAvailable.length, 1);
			assert.strictEqual(optionsAvailable[0], 'opcao-0');
			done();
		});
	});
});