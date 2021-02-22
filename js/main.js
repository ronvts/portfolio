var tl = gsap.timeline();
tl.to(".reveal", {
	duration: 1.5,
	height: 0,
	ease: "expo.inOut",
});
tl.from(
	".logo",
	{
		duration: 1,
		y: 20,
		opacity: 0,
		ease: "expo.inOut",
	},
	"-=0.5"
);
tl.from(
	"nav li",
	{
		duration: 0.7,
		y: 20,
		opacity: 0,
		ease: "expo.inOut",
		stagger: 0.1,
	},
	"-=0.7"
);
if (document.querySelector("header")) {
	tl.from(
		"header p",
		{
			duration: 1,
			y: 20,
			opacity: 0,
			ease: "expo.inOut",
		},
		"-=1"
	);
	tl.from(
		"header a",
		{
			duration: 1,
			y: 20,
			opacity: 0,
			ease: "expo.inOut",
		},
		"-=0.9"
	);
}

//------------------------------
// Theme
// -----------------------------
const themebtn = document.querySelector("#theme");
const body = document.querySelector("body");

themebtn.addEventListener("click", () => {
	body.classList.toggle("light");
});

//------------------------------
// Scroll Navigation
// -----------------------------
var docElement = document.documentElement,
	navbar = document.querySelector("nav"),
	didScroll = false,
	changeNavbarOn = 70;

function init() {
	window.addEventListener(
		"scroll",
		function (e) {
			if (!didScroll) {
				didScroll = true;
				setTimeout(scrollPage, 250);
			}
		},
		false
	);
}

function scrollPage() {
	var yaxis = window.pageYOffset || docElement.scrollTop;
	if (yaxis >= changeNavbarOn) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
	didScroll = false;
}

function scrollY() {
	return window.pageYOffset || docElement.scrollTop;
}

init();

if (document.querySelector("#more-designs .all-designs")) {
	const allDesigns = document.querySelector("#more-designs .all-designs");
	const designSlides = document.querySelectorAll("#more-designs .img");
	const next = document.querySelector("#more-designs #next");
	const prev = document.querySelector("#more-designs #prev");
	prev.style.opacity = 0.3;
	let marginRight = 40;

	const number = designSlides.length;
	let width = designSlides[0].offsetWidth;

	if (window.matchMedia("(max-width: 600px)").matches) {
		const containerWidth = document.querySelector(
			"#more-designs .slide-container"
		).offsetWidth;
		width = containerWidth;
		marginRight = 0;
		designSlides.forEach((e) => {
			e.style.minWidth = `${containerWidth}px`;
			e.style.padding = "1px";
		});
	}

	// setting margin to the slide
	designSlides.forEach((e) => {
		e.style.marginRight = `${marginRight}px`;
	});

	let slideWidth = width + marginRight;
	let totWidth = number * slideWidth;
	allDesigns.style.width = `${totWidth}px`;

	const nextAnim = () => {
		gsap.to("#more-designs .all-designs", 0.7, {
			x: "-=" + slideWidth,
			ease: "Expo.inOut",
		});
	};

	const prevAnim = () => {
		gsap.to("#more-designs .all-designs", 0.7, {
			x: "+=" + slideWidth,
			ease: "Expo.inOut",
		});
	};

	const errorAnim = (direction) => {
		if (direction === next) {
			var tl1 = gsap.timeline();
			tl1.to("#more-designs .all-designs", 0.3, {
				ease: "power1.out",
				x: "-=100",
			});
			tl1.to("#more-designs .all-designs", 0.3, {
				ease: "power1.out",
				x: "+=100",
			});
		}
		if (direction === prev) {
			var tl1 = gsap.timeline();
			tl1.to("#more-designs .all-designs", 0.3, {
				ease: "power1.out",
				x: "+=100",
			});
			tl1.to("#more-designs .all-designs", 0.3, {
				ease: "power1.out",
				x: "-=100",
			});
		}
	};

	// For disable/burry arrow
	const disableArrow = () => {
		const current = document.querySelector(
			"#more-designs .all-designs .current"
		);
		if (!current.nextElementSibling) {
			next.style.opacity = 0.3;
		} else {
			next.style.opacity = 1;
		}
		if (!current.previousElementSibling) {
			prev.style.opacity = 0.3;
		} else {
			prev.style.opacity = 1;
		}
	};

	const nextSlide = () => {
		const current = document.querySelector(
			"#more-designs .all-designs .current"
		);

		if (current.nextElementSibling) {
			current.classList.remove("current");

			current.nextElementSibling.classList.add("current");

			setTimeout(() => {
				current.classList.remove("current");
			});

			nextAnim();
		} else {
			errorAnim(next);
		}
	};

	const prevSlide = () => {
		const current = document.querySelector(
			"#more-designs .all-designs .current"
		);

		if (current.previousElementSibling) {
			current.classList.remove("current");

			current.previousElementSibling.classList.add("current");

			setTimeout(() => {
				current.classList.remove("current");
			});

			prevAnim();
		} else {
			errorAnim(prev);
		}
	};

	// Button events
	next.addEventListener("click", (e) => {
		nextSlide();
		disableArrow();
	});

	prev.addEventListener("click", (e) => {
		prevSlide();
		disableArrow();
	});
}
