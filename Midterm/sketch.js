const R = 1 ;
const WIDTH = 1200;
const HEIGHT = 600;
const AMP = 15;
const FREQ = 0.005;

const GRAVITY = 0;
const SPRING = 1;

var num_circle;
var drop = false;
var reset = false;
var random_speed = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);


  circles = [];
  for (var i=R; i<width; i+= 2*R){
    circles.push(new Circle(i, 0, R, AMP, FREQ));
  }
  num_circle = circles.length;
}

function draw() {
  if (drop){
    background(0);
    for (var i=0; i<num_circle; i++){
      if (random_speed){
        circles[i].random_speed();
      }
      circles[i].applyForce(GRAVITY);
      circles[i].checkBoundary();
      circles[i].update();
      circles[i].draw();
    }
    random_speed = false;
  } else{
    background(0, 10);
    for (var i=0; i<num_circle; i++){
      if (reset){
        circles[i].reset();
      }
      circles[i].dropMode = false;
      circles[i].applyForce(SPRING);
      circles[i].update();
      circles[i].draw();
    }
    reset = false;
  }
  // circles[frameCount%num_circle].setSize();
}

function keyPressed(){
  // down
  if (keyCode == 40){
    for (var i=0; i<num_circle; i++){
      circles[i].updateAmp(circles[i].vel.y * 0.5);
    }
  }

  // up
  if (keyCode == 38){
    for (var i=0; i<num_circle; i++){
      circles[i].updateAmp(circles[i].vel.y / 0.5);
    }
  }

  // whitespace
  if (keyCode == 32){
    reset = true;
    random_speed = true;
    drop = ~ drop;
    background(0);
  }

  // left
  if (keyCode == 37){
    for (var i=0; i<num_circle; i++){
      circles[i].vel.x = -1 * Math.abs(circles[i].vel.x);
    }
  }

  // right
  if (keyCode == 39){
    for (var i=0; i<num_circle; i++){
      circles[i].vel.x = Math.abs(circles[i].vel.x);
    }
  }
}
