var v;

function setup() {
  createCanvas(500, 600);
  v = new Vehicle(width/2, height/2);

}

function draw() {
  background(255);

  var vCenter = createVector(width/2, height/2);
  var vMouse = createVector(mouseX, mouseY);
  var vector = p5.Vector.sub(vMouse, vCenter);

  push();
  translate(width/2, height/2);
  stroke(0);
  line(0, 0, vector.x, vector.y);
  pop();

  v.flow(vector.heading());
  v.update();
  v.checkEdges();
  v.display();

}
