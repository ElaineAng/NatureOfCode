var bal, spr;
const WALL = 30;

function setup(){
  createCanvas(500, 600);
  bal = new Ball(width/2 + random(-100, 100), WALL+250);
  spr = new Spring(width/2, WALL, 200);
}

function draw(){
  background(0);

  stroke(255);
  strokeWeight(3);
  line(width/2 - 100, WALL, width/2+100, WALL);


  if (!bal.isDragging){
    spr.connect(bal);
    var gravity = createVector(0, 2);
    bal.applyForce(gravity);
  }
  bal.checkWall();
  bal.update();

  bal.drag();

  spr.display(bal);
  bal.display();
}
