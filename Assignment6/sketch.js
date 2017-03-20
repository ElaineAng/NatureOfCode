const R = 0.5 ;
const WIDTH = 800;
const HEIGHT = 600;
const AMP = 100;
const FREQ = 0.05;

var num_circle;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);

  num_circle = WIDTH/(R*2);
  circles = [];
  for (var i=R; i<WIDTH; i+= 2*R){
    circles.push(new Circle(i, 0, R, AMP, FREQ));
  }
}

function draw() {
  background(0);
  for (var i=0; i<num_circle; i++){
    circles[i].applyForce();
    circles[i].update();
    circles[i].draw();
  }
}

function keyPressed(){
  // "-"
  if (keyCode == 189){
    for (var i=0; i<num_circle; i++){
      circles[i].updateAmp(circles[i].amp * 0.8);
    }
  }

  // "+"
  if (keyCode == 187){
    for (var i=0; i<num_circle; i++){
      circles[i].updateAmp(circles[i].amp / 0.8);
    }

  }
}
