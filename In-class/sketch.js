
function setup() {
  createCanvas(500, 600);
}


function draw() {
  background(255);

  var freq = frameCount * 0.01;
  var amp = TWO_PI;
  var val = noise(freq) * amp;
  translate(width/2, height/2);
  rotate(val);
  stroke(0);
  line(0, 0, 200, 0);
}
