var pos, vel;
var centerVec, mouseVec;

function setup(){
  createCanvas(600, 600);
  centerVec = createVector(width/2, height/2);
  background(0);
}

function draw(){
  //background(0);
  translate(width/2, height/2);
  mouseVec = createVector(random(100, 200), random(200, 400));
  var vector = p5.Vector.sub(mouseVec, centerVec);

  var vecFromAngle = p5.Vector.fromAngle(random(PI))
  vecFromAngle.mult(random(100, 300));


  stroke(255);
  line(0, 0, vecFromAngle.x, vecFromAngle.y);
  //line(0, 0, vector.x, vector.y);

  noStroke();
  fill(255);
  ellipse(vecFromAngle.x, vecFromAngle.y, 10, 10);
}
