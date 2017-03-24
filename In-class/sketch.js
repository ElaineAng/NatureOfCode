"use strict";

var p;
function setup() {
  createCanvas(500, 600);
  background(0);

  p = new Pendulum(10, 10, 100);
}


function draw() {
  background(0);
  p.display();
}

class Pendulum{
  constructor(x, y, len){
    this.origin = createVector(x, y);
    this.armLength = len;
    this.ball = createVector();
    this.ballMass = 50;

    this.angle = 0;
    this.aVel = 0;
    this.aAcc = 0;

    this.damping = 0.98;
  }

  updateBallPosition(){
      this.ball.x = cos(this.angle) * this.armLength;
      this.ball.y = sin(this.angle) * this.armLength;

  }

  display(){
    push();
    translate(this.origin.x, this.origin.y);

    // arm
    stroke(255);
    strokeWeight(3);
    line(0, 0, this.ball.x, this.ball.y);

    //anchor (origin)
    fill (255);
    noStroke(0);
    rectMode(CENTER);
    rect(0, 0, 20, 20);

    ellipse(this.ball.x, this.ball.y, this.ball.mass, this.ball.mass);
    pop();
  }
}
