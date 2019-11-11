window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	menu();
	slider();
	map();


	//Menu
	function menu() {
		const menu = document.querySelector('.menu'),
			hamburger = document.querySelector('.hamburger');
		let menuActive = false;
		let overlay = document.createElement('div');
		overlay.className = "overlay";

		hamburger.addEventListener('click', () => {
			if (menuActive) {
				hideMenu();
			} else {
				showMenu();
			}
		});

		menu.addEventListener('click', (e) => {
			if (e.target.classList.contains('menu_link')) {
				hideMenu();
			}
		});

		function showMenu() {
			hamburger.classList.add('hamburger_active');
			menu.classList.add('menu_active');
			document.body.prepend(overlay);
			overlay.addEventListener('click', () => {
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
		let slider = tns({
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
		slider.events.on('indexChanged', () => {
			fade();
		});

		function fade() {
			let sliderInfo = slider.getInfo();
			let slides = sliderInfo.slideItems;
			for (let i = 0; i < slides.length; i++) {
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

			let balloonLayout = ymaps.templateLayoutFactory.createClass(
				'<div class="contacts_info">' +
				'<a class="contacts_close" href="#">&times;</a>' +
				'<address><p class="contacts_city">г.Москва</p>' +
				'<p>Пресненская набережная, 8, стр. 1, офис 999</p></address>' +
				'<p>Тел: +7 (999) 999 99 99</p>' +
				'<p><a href="mailto:info@glopt.ru" class="contacts_mail">info@glopt.ru</a></p></div>',
				{
					build() {
						this.constructor.superclass.build.call(this);
						this._parentElement.querySelector('.contacts_close').addEventListener('click', (e) => {
							e.preventDefault();
							this.events.fire('userclose');
						});
					}
				}
			);

			let map = new ymaps.Map('map', {
				center: [55.75,37.55],
				zoom: 15,
				controls: ['smallMapDefaultSet']
			});

			let placemark = new ymaps.Placemark(
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
