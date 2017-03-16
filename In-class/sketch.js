function setup() {
  createCanvas(500, 600);
  background(0);
}


function draw() {
  var freq = frameCount * 0.05;
  var amp = 100;
  var sinValue = sin(freq) * amp;

  var x = frameCount % width;
  var y = height/2 + sinValue;
  noStroke();
  fill(255);
  ellipse(x,y,3,3);

  stroke(100);
  line(0, height/2, width, height/2);
}
