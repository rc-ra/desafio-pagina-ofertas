'use strict';
var express = require('express'),
	app = express(),
	middlewares = require('./middlewares'),
	utils = require('./utils'),
	exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.disable('etag');

app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

app.param('id', function(req, res, next, id) {
	var parsedId = parseInt(id, 10);
	if(isNaN(parsedId))
		parsedId = null;

	req.params.id = parsedId;

	next();
});


app.get('/:id?', [middlewares.checkCache, middlewares.getDB], function(req, res, next) {
	var id = req.params.id,
		renderCache = function() {
			var hotel;
			if(id === 0)
				hotel = req.db[id];
			else {
				hotel = req.db.filter(function(hotel) {
					return hotel.id === id;
				});
				if(hotel.length)
					hotel = hotel[0];
				else
					return next();
			}
			hotel.options.sort(function(a, b) {
				return a.price - b.price;
			});
			hotel.options = hotel.options.map(function(option, i) {
				option.price = (''+option.price).replace(/(\d)(?=(\d{3})+$)/g, '$1.');
				option.tax = [
					'$ Tarifa não reembolsável',
					'$ Cancelamento Grátis'
				][(i%2)?1:0];
				return option;
			});
			res.render('home', {
				hotel: hotel,
				helpers: {
					taxclass: function(i) {
						return (i%2)?'gratis':'';
					}
				}

			}, function(err, result) {
				utils.setCache(app, id, result, function(err) {
					if(err)
						return next(err);

					res.send(result);
					next();
				})
			});
		};

	if(typeof id === 'undefined' || id) {
		id = id || 0;
		if(req.hasCache) {
			utils.getCache(app, id, function(err, cache) {
				if(err) {
					renderCache()
				}
				else {
					res.send(cache);
					next();
				}
			})
		}
		else
			renderCache();
	}
	else {
		console.log('arquivo - ' + req.params);
		next();
	}
});


module.exports = app;