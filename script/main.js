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
	progressBar.style.width = Math.floor((scrolling / max) * 100) + '%'; //width in %

	if (progressBar.style.width == '100%')
		progressBar.style.backgroundColor = 'green';
	else progressBar.style.backgroundColor = 'rgb(250, 164, 4)';
};

/* PUNTERO MOUSE */
document.addEventListener('mousemove', function (event) {
	var pointer = document.getElementById('pointer');
	var scrollX = window.scrollX || window.pageXOffset;
	var scrollY = window.scrollY || window.pageYOffset;
	pointer.style.left = event.clientX + scrollX - pointer.offsetWidth / 2 + 'px';
	pointer.style.top = event.clientY + scrollY - pointer.offsetHeight / 2 + 'px';
});
