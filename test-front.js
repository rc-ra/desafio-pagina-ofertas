var server = require('./'),
	phantom = require('phantom'),
	sitepage, phInstance;

server.listen(8080);
phantom.create()
	.then(function(instance) {
		phInstance = instance;
		return instance.createPage();
	})
	.then(function(page) {
		sitepage = page;
		return page.open('http://localhost:8080/');
	})
	.then(function(status) {
		// console.log(arguments);
		return sitepage.property('content');
	})
	.then(function(content) {
		
		sitepage.evaluate(function() {
			return (document.querySelector('.ativo').tagName);
		}).then(function() {
			console.log(arguments);
		});
		sitepage.close();
		phInstance.exit();
	})
	.catch(function(error) {
		console.log(error);
		phInstance.exit(); 
	});