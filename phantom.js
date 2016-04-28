var phantom = require('phantom');


module.exports = function(url, evaluate, callback) {
	var page, instance;

	phantom.create()
		.then(function(ins) {
			instance = ins;
			return instance.createPage();
		})
		.then(function(p) {
			page = p;
			return page.open(url);
		})
		.then(function(status) {
			return page.property('content');
		})
		.then(function(content) {
			page.evaluate(evaluate).then(callback);
			
			page.close();
			instance.exit();
			// server.close();
		})
		.catch(function(error) {
			console.log(error);
			instance.exit(); 
		});
};