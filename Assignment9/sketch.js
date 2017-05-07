var boids = [];
var c;

const r = 300;

function setup() {
  createCanvas(1200, 600);
  for (var i = 0; i < 50; i++) {
    boids.push(new Boid(width/2, height/2));
  }
  c = createVector(width/2, height/2);
  background(0);
}

function draw() {
  background(0);
  noStroke();
  fill(23, 86, 253);
  ellipse(c.x, c.y, r * 2, r * 2);
  for (var i = 0; i < boids.length; i++) {
    var b = boids[i];
    b.flock(boids, c, r);
    b.update();
    b.checkEdges(c, r);
    b.display();
  }

}

function mouseDragged(){
  c = createVector(mouseX, mouseY);
}
