var swiper = new Swiper('.blog-slider', {
	spaceBetween: 30,
	effect: 'fade',
	mousewheel: {
		invert: false,
	},
});

const sliderLength = swiper.slides.length


let interval;
let iconIndex = 0;

function setActive() {
	$(`.icon`).removeClass('active loading')
	let length = sliderLength
	iconIndex++
	let ind = Math.abs(iconIndex % length)

	if (ind == length - 1) {
		$(`.icon:eq(0)`).addClass('loading')
		$(`.icon:eq(${ind})`).addClass('active')
		swiper.slideTo(ind)

		return
	}
	swiper.slideTo(ind)
	$("animate")[0].beginElement();

	$(`.icon:eq(${ind})`).addClass('active').next().addClass('loading')
}


void function InitDomEvents() {
	$('.slider-buttons .icon').click(function () {
		iconIndex = $(this).attr('index')

		$(`.icon`).removeClass('active loading')
		$(`.icon:eq(${iconIndex})`).addClass('active').next().addClass('loading')

		if (iconIndex == sliderLength - 1) {
			iconIndex = 0
			$(`.icon:eq(${iconIndex})`).addClass('loading')
			$(`.icon:eq(${sliderLength - 1})`).addClass('active')
		}

		swiper.slideTo(iconIndex)

		$("animate")[0].beginElement();
		clearInterval(interval)
		interval = setInterval(setActive, 7000);
	})

	interval = setInterval(setActive, 7000);
}()