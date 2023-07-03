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
