const WIDTH = 1200;
const HEIGHT = 600;
const FREQ = 0.005;
const AMP = 15;
// const R = 1;

const GRAVITY = 0;
const SPRING = 1;

const RED = 0;
const GREEN = 1;
const BLUE = 2;
const WHITE = 3;

var num_circle = -1;
var colorScheme = -1;

var drop = false;
var transition = false;
var reset = false;
var random_speed = false;

var debug_init = false;
var num_circle_debug = -1;

var trans_comp_count = 0;

var R, R_saved, circles_normal, circles_debug, circles;

var gui = new dat.gui.GUI();

var params = {
  debugMode: false,
  radius: 10,
}

gui.add(params, "debugMode");
gui.add(params, "radius").min(10).max(100).step(10);

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  R = 1;
  circles_normal = [];
  circles = [];
  var counter = 0;
  for (var i=R; i<width; i+= 2*R){
    circles_normal.push(new Circle(counter, i, 0, R, AMP, FREQ));
    counter += 1;
  }
  num_circle_normal = circles_normal.length;
  num_circle = num_circle_normal;
  circles = circles_normal;
}

function draw() {
  if (params.debugMode){
    frameRate(10);
    background(0);
    R = params.radius;
    if (R != R_saved){
      debug_init = false;
      circles = [];
    }
    if (!debug_init){
      var counter = 0;
      circles_debug = [];
      for (var i = R; i<width; i+= 2*R){
        circles_debug.push(new Circle(counter, i, 0, R, AMP, FREQ));
        counter += 1;
      }
      num_circle_debug = circles_debug.length;
      circles = circles_debug;
      num_circle = num_circle_debug;
      debug_init = true;
      console.log("init!!!!");
    }
  } else{
    circles = circles_normal;
    num_circle = circles_normal.length;
    frameRate(60);
  }

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
  R_saved = R;
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

  // "b"
  if (keyCode == 66){
    colorScheme = BLUE;
  }

  // "w"
  if (keyCode == 87){
    colorScheme = WHITE;
  }
}
