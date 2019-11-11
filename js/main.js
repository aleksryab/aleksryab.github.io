'use strict';
window.addEventListener('DOMContentLoaded', function() {

	menu();
	slider();
	map();


	//Menu
	function menu() {
		var menu = document.querySelector('.menu'),
			hamburger = document.querySelector('.hamburger');
		var menuActive = false;
		var overlay = document.createElement('div');
		overlay.className = "overlay";

		hamburger.addEventListener('click', function() {
			if (menuActive) {
				hideMenu();
			} else {
				showMenu();
			}
		});

		menu.addEventListener('click', function(e) {
			if (e.target.classList.contains('menu_link')) {
				hideMenu();
			}
		});

		function showMenu() {
			hamburger.classList.add('hamburger_active');
			menu.classList.add('menu_active');
			document.body.prepend(overlay);
			overlay.addEventListener('click', function() {
				hideMenu();
			});
			menuActive = true;
		}
		function hideMenu() {
			hamburger.classList.remove('hamburger_active');
			menu.classList.remove('menu_active');
			overlay.remove();
			menuActive = false;
		}
	}

	// Slider
	function slider() {
		var slider = tns({
			container: '.slider_inner',
			items: 1,
			slideBy: 1,
			startIndex: 1,
			speed: 500,
			animateDelay: 500,
			loop: false,
			rewind: true,
			autoplay: false,
			nav: false,
			center: true,
			swipeAngle: false,
			controlsContainer: '.slider_controls',
			responsive: {
				768: {
					items: 3
				}
			}
		});
		fade();
		slider.events.on('indexChanged', function() {
			fade();
		});

		function fade() {
			var sliderInfo = slider.getInfo();
			var slides = sliderInfo.slideItems;
			for (var i = 0; i < slides.length; i++) {
				if (i == sliderInfo.index) {
					slides[i].classList.remove('slider_fade');
				} else {
					slides[i].classList.add('slider_fade');
				}
			}
		}
	}

	// Map
	function map() {
		ymaps.ready(function () {

			var balloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="contacts_info">' +
				'<a class="contacts_close" href="#">&times;</a>' +
				'<address><p class="contacts_city">г.Москва</p>' +
				'<p>Пресненская набережная, 8, стр. 1, офис 999</p></address>' +
				'<p>Тел: +7 (999) 999 99 99</p>' +
				'<p><a href="mailto:info@glopt.ru" class="contacts_mail">info@glopt.ru</a></p></div>',
				{
					build: function() {
						var balloon = this;
						balloon.constructor.superclass.build.call(this);
						balloon._element.querySelector('.contacts_close').addEventListener('click', function(e) {
							e.preventDefault();
							balloon.events.fire('userclose');
						});
					}
				}
			);

			var map = new ymaps.Map('map', {
				center: [55.75,37.55],
				zoom: 15,
				controls: ['smallMapDefaultSet']
			});

			var placemark = new ymaps.Placemark(
				[55.748027815811305,37.53857442471986],
				{
					balloonContentBody:
					'<div class="contacts_city">г.Москва </div>' +
					'<div>Пресненская набережная, 8, стр. 1, офис 999 </div>' +
					'<div>Тел: +7 (999) 999 99 99</div>' +
					'<div><a href="mailto:info@glopt.ru" class="contacts_mail">info@glopt.ru</a></div>'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/icons/map/map-mark.png',
					iconImageSize: [62, 63],
					iconImageOffset: [0, -63],
					balloonLayout: balloonLayout,
					hideIconOnBalloonOpen: false
			});

			map.geoObjects.add(placemark);
			placemark.balloon.open();
			map.behaviors.disable('scrollZoom');
		});
	}

});
