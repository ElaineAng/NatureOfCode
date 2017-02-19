const NUM_OF_CIRCLES = 50;

var circles = [];
var c;

function setup() {
  createCanvas(800, 800);
  background(0);
  for (var i=0; i < NUM_OF_CIRCLES; i++){
    circles.push(new Circle(width / 2, height, 0, -12));
  }
}

function draw() {
  background(0, 30);
  for (var i = 0; i < NUM_OF_CIRCLES; i++){
    circles[i].move();
    circles[i].applyGravity(0.2);
    circles[i].displayNormal();
  }
}

function keyPressed() {
  if (keyCode == 32){
    // console.log("yes");
    for (var i = 0; i < NUM_OF_CIRCLES; i++){
      circles[i].explod();
      //circles[i].displayAfterExp();
    }
  }
}
