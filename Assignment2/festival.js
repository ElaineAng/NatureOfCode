const NUM_OF_CIRCLES = 100;
const Y_SPEED_INIT = -12;
const G = 0.2;

var start, firework;

function setup() {
  createCanvas(1200, 600);
  background(0);
  start = false;
}

function draw() {

  if (start){
    if (firework.showTrace){
        background(0, 30);
    }
    else{
      background(0);
    }
    firework.lit(G);
  }
}

function keyPressed() {
  if (start){
    if (keyCode == 32){
      firework.prepareForExplod();
    }

    if (keyCode == 66){
      firework.turnOnBlink();
    }
  }
}

function mousePressed(){
  firework = new Firework(NUM_OF_CIRCLES, mouseX, mouseY, Y_SPEED_INIT);
  start = true;
}
