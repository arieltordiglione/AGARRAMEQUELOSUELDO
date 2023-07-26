console.log('script loaded');
/* fijar el atributo active al visualizarlo */
// Obtener los elementos de enlace en el menú de navegación
const navLinks = document.querySelectorAll('.nav-ul a');

// Obtener las secciones de contenido correspondientes a los enlaces
const sections = Array.from(navLinks).map((link) =>
	document.querySelector(link.getAttribute('href'))
);

/* NAV  */

/* BARRA DE PROGRESO-- SOMBRA EN NAV Y FOOTER */
onscroll = () => {
	header.classList.add('shadowHeader');
	footer.classList.add('shadowFooter');

	setTimeout(() => {
		header.classList.remove('shadowHeader');
		footer.classList.remove('shadowFooter');
	}, 1000);

	const page = document.documentElement; //element HTML
	let totalHeight = page.scrollHeight; //Height Total of page
	let visibleHeight = page.clientHeight; //Height visible
	let scrolling = page.scrollTop; //size of scroll
	let max = totalHeight - visibleHeight;
	progressBar.style.width = Math.floor(((scrolling * 1.01) / max) * 100) + '%'; //width in %

	if (scrolling / max > 0.99) {
		progressBar.style.backgroundColor = 'green';
	} else {
		progressBar.style.backgroundColor = '#ff8c00'; /* color2 */
	}
};

/* HAMBURGER */
hamburger.onclick = () => {
	hamburger.classList.toggle('open');
	nav_ul.classList.toggle('slide');
	document.body.classList.toggle('noScroll');
};

/* .ACTIVE NARBAR */

// Obtener todos los elementos "li" en la lista de navegación
const navItems = document.querySelectorAll('.nav-ul li');
const navUl = document.querySelector('.nav-ul');
// Función para agregar o quitar la clase "active"
function toggleActiveClass(event) {
	// Remover la clase "active" de todos los elementos "li"
	navItems.forEach((item) => item.classList.remove('active'));
	// Agregar la clase "active" al elemento "li" seleccionado
	event.target.closest('li').classList.add('active');
}

// Asignar el evento de clic a cada enlace
navItems.forEach((item) => item.addEventListener('click', toggleActiveClass));

// Asignar el evento de clic a cada enlace
navUl.addEventListener('click', toggleActiveClass);

/* WHATSAP BOTON */
window.addEventListener('scroll', function () {
	let scrollPosition = window.scrollY;
	let btns = document.querySelectorAll('.btn');

	btns.forEach(function (btn) {
		if (scrollPosition > 200) {
			btn.classList.add('show-btn');
			btn.classList.remove('hide-btn');
		} else {
			btn.classList.add('hide-btn');
			btn.classList.remove('show-btn');
		}
	});
});

/* SLIDER CARROUSEL */
const carousel = document.querySelector('.carousel'),
	firstImg = carousel.querySelectorAll('img')[0],
	arrowIcons = document.querySelectorAll('.wrapper i');
let isDragStart = false,
	isDragging = false,
	prevPageX,
	prevScrollLeft,
	positionDiff;
const showHideIcons = () => {
	// showing and hiding prev/next icon according to carousel scroll left value
	let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
	arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
	arrowIcons[1].style.display =
		carousel.scrollLeft == scrollWidth ? 'none' : 'block';
};
arrowIcons.forEach((icon) => {
	icon.addEventListener('click', () => {
		let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
		// if clicked icon is left, reduce width value from the carousel scroll left else add to it
		carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
		setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
	});
});
const autoSlide = () => {
	// if there is no image left to scroll then return from here
	if (
		carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
		carousel.scrollLeft <= 0
	)
		return;
	positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
	let firstImgWidth = firstImg.clientWidth + 14;
	// getting difference value that needs to add or reduce from carousel left to take middle img center
	let valDifference = firstImgWidth - positionDiff;
	if (carousel.scrollLeft > prevScrollLeft) {
		// if user is scrolling to the right
		return (carousel.scrollLeft +=
			positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
	}
	// if user is scrolling to the left
	carousel.scrollLeft -=
		positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};
const dragStart = (e) => {
	// updatating global variables value on mouse down event
	isDragStart = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
	// scrolling images/carousel to left according to mouse pointer
	if (!isDragStart) return;
	e.preventDefault();
	isDragging = true;
	carousel.classList.add('dragging');
	positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
	carousel.scrollLeft = prevScrollLeft - positionDiff;
	showHideIcons();
};
const dragStop = () => {
	isDragStart = false;
	carousel.classList.remove('dragging');
	if (!isDragging) return;
	isDragging = false;
	autoSlide();
};
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);
document.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('touchend', dragStop);

/* FECHA COPYRIGTH FOOTER */
let fecha = document.getElementById('fecha');
fecha.innerHTML = new Date().getFullYear();

/* SCROLLREVEAL */
window.sr = ScrollReveal();
sr.reveal('.navbar', {
	delay: 100,
	duration: 1000,
	origin: 'top',
	/* mobile: false,
	distance: '100px' */
	/* interfiere con el menu responsive */
});

sr.reveal('.portada__titulo', {
	delay: 500,
	duration: 1500,
	origin: 'left',
	distance: '400px',
	reset: true,
});

sr.reveal('.nosotros__texto', {
	delay: 300,
	duration: 1000,
	origin: 'left',
	distance: '400px',
	reset: true,
});

sr.reveal('.nosotros__img', {
	delay: 300,
	duration: 1000,
	origin: 'right',
	distance: '400px',
	reset: true,
});

sr.reveal('.servicios__detalle details', {
	delay: 100,
	duration: 1000,
	origin: 'top',
	distance: '100px',
	reset: true,
	interval: 100,
});

sr.reveal('.servicios__descripcion ul li', {
	delay: 100,
	duration: 1000,
	origin: 'bottom',
	distance: '100px',
	reset: true,
	interval: 100,
});

sr.reveal('.wrapper', {
	delay: 100,
	duration: 1500,
	distance: '100px',
	reset: true,
});

sr.reveal('.contacto__datos', {
	delay: 100,
	duration: 1500,
	origin: 'bottom',
	distance: '100px',
	reset: true,
});

sr.reveal('.form', {
	delay: 100,
	duration: 1500,
	origin: 'bottom',
	distance: '100px',
	reset: true,
});

sr.reveal('.botones__flotantes', {
	delay: 2000,
	duration: 1500,
	origin: 'bottom',
	distance: '400px',
	reset: true,
});
