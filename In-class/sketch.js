"use strict";
var p, touchGround, gravity;

function setup() {
  createCanvas(1000, 600);
  background(0);
  touchGround = false;
  p = new Particle(width/2, height/2);
  gravity = createVector(0, 1);
}

function draw() {
  background(0);
  p.update();
  p.checkBoundaries();

  p.display();

}


class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display(){
    push();
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, 30, 30);
    pop();
  }

  applyForce(force){
    this.acc.add(force);
  }
  checkBoundaries() {
    touchGround = false;
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    } else{
      this.applyForce(gravity);
    }
  }
}
