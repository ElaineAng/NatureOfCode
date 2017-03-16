function setup() {
  createCanvas(500, 600);
  background(0);
}


function draw() {
  background(0);
  var centerVector = createVector(width/2, height/2);
  var mouseVector = createVector(mouseX, mouseY);
  stroke(255);
  line (centerVector.x, centerVector.y, mouseVector.x, mouseVector.y);

  var vector = p5.Vector.sub(mouseVector, centerVector);
  var angle = vector.heading();

  fill(255);
  noStroke();
  text(round(degrees(angle)), mouseVector.x, mouseVector.y);


  translate(width/2, height/2);
  rotate(angle);
  fill(255, 0, 0);
  noStroke();
  triangle(0, 0, -30, -10, -30, 10);
}
