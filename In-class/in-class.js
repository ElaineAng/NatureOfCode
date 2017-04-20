var t, v;

function setup(){
  createCanvas(800, 600);
  v = new Vehicle(width/2, height/2);
  t = new Target(random(width), random(height));
  background(0);
}

function draw(){
  background(0, 10);

  t.display();
  //t.move();
  //var target = createVector(mouseX, mouseY);
  v.seek(t.pos);
  v.checkArrive(t);
  v.update();
  v.display();
}

function keyPressed(){
  t = new Target(random(width), random(height));
}
