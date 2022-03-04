import Glide from '@glidejs/glide'

const mobileScreen = window.matchMedia("screen and (min-width: 300px) and (max-width: 660px)")

if (mobileScreen.matches) {

  const glideThree = new Glide('.glide-3', {
    perView: 1,
  })

  glideThree.mount()

} else {

  // Glide Science&Design Projects
  const glideThreeInput = document.querySelector('.glide-3');
  const glideThree = new Glide('.glide-3', {
    autoplay: 5000,
    hoverpause: true,
    perView: 1,
    animationDuration: 500,
    rewindDuration: 1000,
  })
  glideThreeInput.addEventListener('glideThreeInput', function (event) {
    glideThree.update({
      autoplay: (event.target.value != 0) ? event.target.value : false,
      animationDuration: event.target.value,
      rewindDuration: event.target.value
    })
  })

  glideThree.mount()

}


// ScrollUp Button
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll <= 0) {
		body.classList.remove("scroll-up");
		return;
	}

	if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
		body.classList.remove("scroll-up");
		body.classList.add("scroll-down");
	} else if (
		currentScroll < lastScroll &&
		body.classList.contains("scroll-down")
	) {
		body.classList.remove("scroll-down");
		body.classList.add("scroll-up");
	}
	lastScroll = currentScroll;
});
