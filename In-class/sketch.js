function setup() {
  createCanvas(500, 600);
  background(0);
}


function draw() {
  var freq = frameCount * 0.01;
  var amp = 80;
  var noiseValue = (noise(freq)-0.5) * amp;

  var x = frameCount % width;
  var y = height/2 + noiseValue;
  noStroke();
  fill(255);
  ellipse(x,y,3,3);

  stroke(100);
  line(0, height/2, width, height/2);
}
