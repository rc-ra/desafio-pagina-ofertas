var galleryCreator = function() {
		'use strict';
		var imagesContainer = document.querySelector('.imagens'),
			images = imagesContainer.querySelectorAll('img'),
			imagesNav = document.createElement('div'),
			imageClickEvent = function() {
				var container = this.parentNode.parentNode,
					active = container.querySelectorAll('.ativo'),
					toActivate = container.querySelectorAll('img[src="' + this.getAttribute('src') + '"]'),
					i, ilen;
				for(i=0,ilen=active.length;i<ilen;i++)
					active[i].className = '';
				
				for(i=0,toActivate.length;i<ilen;i++)
					toActivate[i].className = 'ativo';
			},
			image, i, ilen;

		imagesNav.className = 'lista';

		for(i=0,ilen=images.length;i<ilen;i++) {
			image = images[i].cloneNode(true);

			if(!i)
				images[i].className = image.className = 'ativo';

			image.addEventListener('click', imageClickEvent);

			imagesNav.appendChild(image);
		}

		imagesContainer.appendChild(imagesNav);
	},
	createOptions = function(selector) {
		var fragment = document.createDocumentFragment(),
			optionField = document.createElement('option'),
			options = document.querySelectorAll(selector),
			obj = {},
			i, ilen, option;

		for(i=0,ilen=options.length;i<ilen;i++) {
			option = options[i];
			if(!obj[option.innerHTML])
				obj[option.innerHTML] = option.parentNode.parentNode.parentNode.id;
			else
				obj[option.innerHTML] += ',' + option.parentNode.parentNode.parentNode.id;
		}

		options = Object.keys(obj);

		for(i=0,ilen=options.length;i<ilen;i++) {
			option = optionField.cloneNode(true);
			option.value = obj[options[i]];
			option.innerHTML = options[i];
			fragment.appendChild(option);
		}

		return fragment;
	},
	filterCreator = function() {
		'use strict';
		var departureField = document.getElementById('saidas'),
			daysField = document.getElementById('diarias'),
			filter = function(options) {
				var allOptions = document.querySelectorAll('.opcoes .opcao'),
					initOption = options?'none':'',
					i, ilen;

				for(i=0,ilen=allOptions.length;i<ilen;i++)
					allOptions[i].style.display = initOption;

				if(!options || !options.length)
					return;

				for(i=0,ilen=options.length;i<ilen;i++)
					document.getElementById(options[i]).style.display = '';
				

				if(options.length < 4)
					window.scrollTo(0,5000);
			},
			changeEvent = function() {
				var optionsValue = departureField.options,
					departureOptions = optionsValue[optionsValue.selectedIndex].value,
					daysOptions, i, ilen, options;

				optionsValue = daysField.options;
				daysOptions = optionsValue[optionsValue.selectedIndex].value;

				if(!daysOptions.length && !departureOptions.length)
					filter();
				else if(!daysOptions.length)
					filter(departureOptions.split(','));
				else if(!departureOptions.length) {
					filter(daysOptions.split(','));
				}
				else {
					departureOptions = departureOptions.split(',');
					daysOptions = daysOptions.split(',');
					options = [];
					for(i=0,ilen=departureOptions.length;i<ilen;i++) {
						if(~daysOptions.indexOf(departureOptions[i]))
							options[options.length] = departureOptions[i];
					}
					filter(options);
				}

			};

		departureField.appendChild(createOptions('.saidas li'));
		daysField.appendChild(createOptions('.diarias .diaria strong'));

		daysField.addEventListener('change', changeEvent);
		departureField.addEventListener('change', changeEvent);

		document.querySelector('.escolhas').className += ' ativo';
	};

(function() {
	'use strict';
	galleryCreator();
	filterCreator();
})();