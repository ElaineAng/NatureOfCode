const R = 1;
const WIDTH = 1200;
const HEIGHT = 600;
const AMP = 15;
const FREQ = 0.005;

const GRAVITY = 0;
const SPRING = 1;

const RED = 0;
const GREEN = 1;
const BLUE = 2;

var num_circle = -1;
var colorScheme = -1;

var drop = false;
var transition = false;
var reset = false;
var random_speed = false;

var trans_comp_count = 0;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);

  circles = [];
  counter = 0;
  for (var i=R; i<width; i+= 2*R){
    circles.push(new Circle(counter, i, 0, R, AMP, FREQ));
    counter += 1;
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
      circles[i].dropMode = false;
      if (transition){
        circles[i].transition();
      }
      if (trans_comp_count >= num_circle){
        transition = false;
      }
      if (!transition){
        circles[i].applyForce(SPRING);
        circles[i].update();
      }
      circles[i].draw();
    }
  }
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
    trans_comp_count = 0;
    random_speed = true;

    if (drop){
      transition = true;
      for (var i=0; i<num_circle; i++){
        circles[i].isTransitioning = true;
      }
    }
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

  // "r"
  if (keyCode == 82){
    colorScheme = RED;
  }

  // "g"
  if (keyCode == 71){
    colorScheme = GREEN;
  }

  if (keyCode == 66){
    colorScheme = BLUE;
  }
}
