var seed = Math.random() * 1000;
var k = 0.8515,
	l = 0.65;
var th = 0,
	seg = 0.02;
var r;
let angle;
let colors1 = "#FFF07C-#80FF72-#7EE8FA-#EEC0C6-#E58C8A"
	.split("-")
	.map((a) => "#" + a);
let colors2 = "deFbE4-f7f9fb-02906c-eafc70-02b08c"
	.split("-")
	.map((a) => "#" + a + "00");
let colorbg = "05250d".split("-").map((a) => "#" + a);
let colorbg2 = "05270d20".split("-").map((a) => "#" + a);

function setup() {
	let mySize = min(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	// pixelDensity(5);
	background(colorbg);
	r = mySize;
	angle = random(TAU);
	let filter = new makeFilter();
}

function makeFilter() {
	randomSeed(seed);
	// noiseのフィルターをつくる
	colorMode(HSB, 360, 100, 100, 100);
	drawingContext.shadowColor = color(8, 4, 5, 10);
	overAllTexture = createGraphics(windowWidth, windowHeight);
	overAllTexture.loadPixels();
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			overAllTexture.set(
				i,
				j,
				color(90, 90, 90, noise(i / 3, j / 3, (i * j) / 100) * random(1))
			);
		}
	}
	overAllTexture.updatePixels();
}


function draw() {
	randomSeed(seed);
	background(colorbg2);
	var T = (1 - k) / k;
	noFill();
	push();
	translate(width / 2, height / 2);

	for (let i = 0; i < 30; i += random(1)) {
		k = random(0.75, 0.8515);
		l = random(0.45, 0.65);
		strokeWeight(random(20));
		stroke(random(colors1));
		push();
		rotate(random(TAU) + angle);
		rectMode(CENTER);
		rect(random(-i * 10, i * 10) + r * ((1 - k) * cos(th) + l * k * cos(T * th)),
			random(-i * 10, i * 10) + r * ((1 - k) * sin(th) - l * k * sin(T * th)),
			random(-r / 4, r / 4),
			random(-r / 2, r / 2),
			random(1, 10));
		pop();
	}
	pop();
	th += seg;
	angle += TAU/random(360,300);
	image(overAllTexture, 0, 0);
	if (r > 0) {
		r -= 0.25;
	} else if (r <= 0) {
		r = 0;
		noLoop();
	}
}

function keyTyped() {
	if (key === "s" || key === "S") {
		//noLoop();
		saveCanvas("Spirograph_20211223_2", "png");
	}
}