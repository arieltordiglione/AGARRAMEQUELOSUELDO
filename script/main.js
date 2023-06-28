console.log('script loaded');
/* NAV  */

hamburger.onclick = () => {
	hamburger.classList.toggle('open');
	nav_ul.classList.toggle('slide');
	document.body.classList.toggle('noScroll');
};

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

/* PUNTERO MOUSE */
document.addEventListener('mousemove', function (event) {
	var pointer = document.getElementById('pointer');
	var container = document.getElementById('pointer__container'); // ID del contenedor
	var containerRect = container.getBoundingClientRect();

	var pointerX =
		event.clientX -
		containerRect.left -
		pointer.offsetWidth / 2 +
		window.pageXOffset;
	var pointerY =
		event.clientY -
		containerRect.top -
		pointer.offsetHeight / 2 +
		window.pageYOffset;

	// Limitar el movimiento horizontal dentro del contenedor
	if (pointerX < 0) {
		pointerX = 0;
	} else if (pointerX > container.offsetWidth - pointer.offsetWidth) {
		pointerX = container.offsetWidth - pointer.offsetWidth;
	}

	// Limitar el movimiento vertical dentro del contenedor
	if (pointerY < 0) {
		pointerY = 0;
	} else if (pointerY > container.offsetHeight - pointer.offsetHeight) {
		pointerY = container.offsetHeight - pointer.offsetHeight;
	}

	pointer.style.left = pointerX + 'px';
	pointer.style.top = pointerY + 'px';
});
