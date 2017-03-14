function setup() {
  createCanvas(500, 600);
  background(0);
}


function draw() {
  background(0);
  drawCircle(-frameCount*2, 100);
}

function drawCircle(angle, distance){
  var x = cos(radians(angle)) * distance;
  var y = cos(radians(angle)) * distance;
  // var vector = p5.Vector.fromAngle(radians(angle));
  // vector.mult(distance);

  push();
  translate(width/2, height/2);
  rotate(radians(angle));
  ellipse(vector.x, vector.y, 50, 50);
  pop();
}
