var pos, vel;
var centerVec, mouseVec;

function setup(){
  createCanvas(600, 600);
  background(0);
  // x = width / 2;
  // y = height / 2;
  // x_spd = 1;
  // y_spd = 1;
  pos = createVector(width/2, height/2);
  centerVec = createVector(width/2, height/2);
  vel = createVector(1, 1);
}

function draw(){
  background(0);
  mouseVec = createVector(mouseX, mouseY);
  vel = p5.Vector.sub(mouseVec, centerVec);
  //vel.limit(50);
  //vel.setMag(50);
  vel.normalize(); //just to get the direction
  vel.mult(50);
  pos.add(vel);
  checkBoundaries();
  noStroke();
  ellipse(pos.x, pos.y, 30, 30);

  translate(width/2, height/2);
  noStroke(255);
  line(0, 0, vel.x, vel.y);
  fill(255);
  text(round(vel.mag()), vel.x+15, vel.y);
}

function checkBoundaries(){
  if (pos.x < 0){
    pos.x = width;
  } else if (pos.x > width){
    pos.x = 0;
  }

  if (pos.y < 0){
    pos.y = height;
  } else if (pos.y > height){
    pos.y = 0;
  }
}
