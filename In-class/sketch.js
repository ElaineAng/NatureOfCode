
function setup() {
  createCanvas(1200, 600);
  background(0);
  frameRate(5);
}

function draw() {
  background(0);
  for (var i=0; i<1; i++){
    push();
    translate(width/2, height);
    branch(150);
    pop();
  }
  //noLoop();
}

function branch(len){
  strokeWeight(len/10);

  var g = map(len, 255, 50, 0, 150);
  stroke(0, g, 0);
  // stroke(255);
  line(0, 0, 0, -len);

  if (len > 15){
    translate(0, -len);
    var angle = PI/6 * random(0.8, 1.2);
    var newlen = len * 4/5;
    var noiseVal = noise(frameCount * 0.01) * 0.2;
    push();
    rotate(angle + noiseVal);
    branch(newlen);
    pop();

    push();
    rotate(-angle + noiseVal);
    branch(newlen);
    pop();

    // rotate(-PI/6)
  }

}
