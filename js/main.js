(function() {
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
})();