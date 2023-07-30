setTimeout(() => {
	run();
}, 2000);

function run() {
	var useTween = false;
	var easeTween = '';
	let aw; // instance of ArcWelding

	let cb = document.getElementById('checkbox');

	cb.addEventListener('change', () => {
		useTween = true;
		easeTween = 'Power1.easeInOut';
	});

	if (useTween) {
		aw = new ArcWeldingTw();
	} else {
		aw = new ArcWelding();
	}
	aw.run();

	let btnClear = document.getElementById('clear');
	let btnAgain = document.getElementById('again');
	let btnStop = document.getElementById('stop');
	btnClear.addEventListener('click', () => {
		aw.clearScreen();
	});
	btnAgain.addEventListener('click', () => {
		aw.againDraw();
	});
	btnStop.addEventListener('click', () => {
		aw.stop();
	});
}

class ArcWelding {
	constructor() {
		(this.canvas = document.getElementById('canvas')),
			(this.ctx = canvas.getContext('2d'));
		// full screen dimensions
		this.cw = window.innerWidth;
		this.ch = window.innerHeight;
		// particle collection
		this.particles = [];
		this.weldSeam = [];

		this.mousedown = false;
		// mouse x coordinate,
		this.mx;
		// mouse y coordinate
		this.my;

		this.nextStep;
		// set canvas dimensions
		this.canvas.width = this.cw;
		this.canvas.height = this.ch;
		console.log(this.canvas.width, this.canvas.height);
		this.init();
	}

	init() {
		// mouse event bindings
		// update the mouse coordinates on mousemove
		this.canvas.addEventListener('mousemove', (event) => {
			// this.mx = event.pageX - canvas.offsetLeft;
			// this.my = event.pageY - canvas.offsetTop;
			this.mx = event.clientX;
			this.my = event.clientY;
		});

		// toggle mousedown state and prevent canvas from being selected
		this.canvas.addEventListener('mousedown', (event) => {
			event.preventDefault();
			this.mousedown = true;
		});

		this.canvas.addEventListener('mouseup', (event) => {
			event.preventDefault();
			this.mousedown = false;
		});
	}

	run() {
		let textSvg = document.getElementById('svg1').outerHTML;
		this.paths = Util.extractPathsfromSvg(textSvg);
		this.loop();
		this.writeWord();
	}

	againDraw() {
		console.log('again');
		this.clearScreen();
		let textSvg = document.getElementById('svg1').outerHTML;
		this.paths = Util.extractPathsfromSvg(textSvg);
		this.writeWord();
	}

	clearScreen() {
		console.log('clear');
		this.weldSeam = [];
		this.particles = [];
	}

	//terminar writeWord
	stop() {
		this.clearScreen();
		this.wwLoop = false;
	}

	// create particle group
	createParticles(x, y, ctx) {
		// increase the particle count for a bigger fire,
		//beware of the canvas performance hit with the increased particles though
		let _x = x || this.mx;
		let _y = y || this.my;
		let _ctx = ctx || this.ctx;
		let particleCount = 5; /* cantidad de chispas. default=15 */
		while (particleCount--) {
			this.particles.push(new Particle(_x, _y, _ctx));
		}
	}

	loop() {
		window.requestAnimationFrame(this.loop.bind(this));
		// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
		this.ctx.globalCompositeOperation = 'destination-out';
		// decrease the alpha property to create more prominent trails
		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		this.ctx.fillRect(0, 0, this.cw, this.ch);
		// change the composite operation back to our main mode
		// lighter creates bright highlight points as the fireworks and particles overlap each other
		this.ctx.globalCompositeOperation = 'lighter';

		if (this.mousedown === true) {
			let st = new Stitch(this.mx, this.my, this.ctx);
			this.weldSeam.push(st);
			//console.dir(st);
			this.createParticles();
		}

		// loop over each particle, draw it, update it
		let len = this.particles.length;
		let i = 0;
		for (i = 0; i < len; i++) {
			if (this.particles[i] === undefined) {
				debugger;
			}
			this.particles[i].draw();
			if (!this.particles[i].update(i)) {
				this.particles.splice(i, 1);
				len--;
			}
		}

		this.ctx.globalCompositeOperation = 'destination-over';
		len = this.weldSeam.length;
		for (i = 0; i < len; i++) {
			this.weldSeam[i].update();
			this.weldSeam[i].draw();
		}
		this.ctx.globalCompositeOperation = 'lighter';
	}

	writeWord() {
		this.preparePath();
		this.wwLoop();
	}

	wwLoop() {
		if (this.processingPathStep()) {
			window.requestAnimationFrame(this.wwLoop.bind(this));
		}
	}

	preparePath() {
		let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		if (this.paths.length) {
			path.setAttribute('d', this.paths.shift());
		} else {
			return false;
		}
		this.path = path;
		this.nextStep = Util.iterator();
		return true;
	}

	processingPathStep() {
		let step = this.nextStep();
		if (step > this.path.getTotalLength()) {
			//console.log(this.path.getTotalLength());
			//path.viewBox
			if (!this.preparePath()) return false;
		}
		let point = this.path.getPointAtLength(step);
		let st = new Stitch(point.x, point.y, this.ctx, 5);
		this.weldSeam.push(st);
		//console.dir(st);
		this.createParticles(point.x, point.y, this.ctx);
		return true;
	}
}

class ArcWeldingTw extends ArcWelding {
	constructor() {
		super();
		this.totalLenghtAllPath = 0;
		this.curPath = 0;
		this.offset = 0; // length of already traversed paths
		this.helper = { progress: 0 };
		this.helper.update = () => {
			console.log('helper.update');
			this.processingPathStep();
		};
	}

	run() {
		let svg = document.getElementById('c');
		this.paths = [];
		for (let i = 0; i < svg.children.length; i++) {
			this.paths.push(svg.children[i]);
			this.totalLenghtAllPath += this.paths[i].getTotalLength();
		}
		console.log(this.totalLenghtAllPath);

		this.tw = TweenLite.to(this.helper, 25, {
			progress: this.totalLenghtAllPath,
			ease: Power2.easeOut,
		});
		this.tw.eventCallback('onUpdate', this.helper.update.bind(this));

		this.loop();
		this.writeWord();
	}

	writeWord() {
		this.nextStep = Util.iterator();
		this.curPath = this.paths[this.nextStep()];
		// this.getPath();
	}

	// getPath(){

	//     if(!this.curPath){
	//         return false;
	//     }
	//     return true;
	// }

	getPoint() {
		let localProgress = this.helper.progress - this.offset;
		if (localProgress > this.curPath.getTotalLength()) {
			this.offset += this.curPath.getTotalLength();
			this.curPath = this.paths[this.nextStep()];
			if (!this.curPath) {
				return false;
			}
			return this.getPoint();
		}
		return this.curPath.getPointAtLength(localProgress);
	}

	processingPathStep() {
		let point = this.getPoint();
		let st = new Stitch(point.x, point.y, this.ctx, 5);
		this.weldSeam.push(st);
		//console.dir(st);
		this.createParticles(point.x, point.y, this.ctx);
		return true;
	}
}

class Particle {
	constructor(x, y, ctx) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;

		let hue = 33;

		this.coordinates = [];
		this.coordinateCount = 5;
		while (this.coordinateCount--) {
			this.coordinates.push([this.x, this.y]);
		}
		// random angle in all direction
		this.angle = Util.random(0, Math.PI * 2);
		this.speed = Util.random(1, 10);
		//will slow the particle down
		this.friction = 0.93;
		this.gravity = 3;
		// hue in the range of red-yellow
		this.hue = Util.random(hue - 15, hue + 15);
		this.brightness = Util.random(50, 80);
		this.alpha = 1;
		this.lineW = Util.random(1, 3);
		// speed fade outs
		this.decay = Util.random(0.01, 0.06);
	}

	update(index) {
		this.coordinates.pop();

		this.coordinates.unshift([this.x, this.y]);

		this.speed *= this.friction;

		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed + this.gravity;
		// fade out the particle
		this.alpha -= this.decay;

		if (this.alpha <= this.decay) {
			return false;
		}
		return true;
	}

	draw() {
		this.ctx.beginPath();

		let len = this.coordinates.length - 1;
		this.ctx.moveTo(this.coordinates[len][0], this.coordinates[len][1]);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.strokeStyle =
			'hsla(' +
			this.hue +
			', 100%, ' +
			this.brightness +
			'%, ' +
			this.alpha +
			')';
		this.ctx.lineWidth = this.lineW;
		this.ctx.stroke();
	}
}

class Stitch {
	constructor(x, y, ctx, radius) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.radius = radius || 7; /* grosor de puntada */
		// temperature in degrees Celsius
		this.dC = 0.4;
		this.hue = 33;
		this.brightness = 100;
		this.saturation = 100;
		this.draw();
	}

	update() {
		if (this.hue > 0) {
			this.hue -= this.dC;
		}
		if (this.brightness > 60) {
			this.brightness -= this.dC;
		}
		if (this.saturation > 0) {
			this.saturation -= this.dC;
		}
	}

	draw() {
		let grt = this.ctx.createRadialGradient(
			this.x,
			this.y,
			0,
			this.x,
			this.y,
			this.radius
		);

		grt.addColorStop(
			0.0,
			'hsla(' +
				this.hue +
				',' +
				this.saturation +
				'%, ' +
				this.brightness +
				'%, ' +
				1 +
				')'
		);
		grt.addColorStop(
			1.0,
			'hsla(' +
				this.hue +
				',' +
				this.saturation +
				'%, ' +
				(this.brightness - 30) +
				'%, ' +
				1 +
				')'
		);

		this.ctx.beginPath();
		this.ctx.fill();
		this.ctx.fillStyle = grt;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}

let Util = {
	// get a random number within a range
	random: function (min, max) {
		return Math.random() * (max - min) + min;
	},

	iterator: function () {
		let step = 0;
		return function () {
			return step++;
		};
	},

	extractPathsfromSvg: function (svg) {
		let results = svg.match(/<path\b([\s\S]*?)><\/path>/g);
		let paths = [];
		let len = results.length;
		for (let i = 0; i < len; i++) {
			let str = results[i];
			let data = str.match(/[^\w]d="([\s\S]*?)"/);
			paths.push(data[1]);
		}
		return paths;
	},
};
