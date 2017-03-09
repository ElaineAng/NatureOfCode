"use strict";


var p1, p2;

function setup() {
  createCanvas(500, 600);
  background(0);

  p1 = new Particle(100, height/2, 5, 5);
  p2 = new Particle(width/2, height/2, 5, 15);
  p1.setSpeed(10, 0);
}

function draw() {
  background(0);

  p1.checkEdges();
  if (!p1.hit){
    p1.applyAttraction(p2);
  }

  p1.update();
  p1.display();

  p2.checkEdges();
  if (!p2.hit){
    p2.applyAttraction(p1);
  }

  p2.update();
  p2.display();

  p1.detectBoundary(p2);
  p2.detectBoundary(p1);

}
