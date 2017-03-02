"use strict";
var p, gravity;
const R = 30;

function setup() {
  createCanvas(1000, 600);
  background(0);
  p = new Particle(0, 100, R);
  gravity = createVector(0, 5);
  frameRate(5);
}

function draw() {
  // background(0);
  if (p.show){
    stroke(255, 0, 0);
    line(0, 100, width, 100);
    line(0, height - 150, width, height - 150);
    p.update();
    p.display();
    p.checkBoundaries();
    if (!p.touchGround){
      p.applyForce(gravity);
    }
    p.touchGround = false;
  }
}


class Particle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(3, 0.5);
    this.acc = createVector(0, 0);
    this.r = r;
    this.show = true;
    this.touchGround = false;
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.mult(0);
  }

  display(){
    push();
    translate(this.pos.x, this.pos.y);
    fill(255);
    ellipse(0, 0, this.r, this.r);
    stroke(255, 0, 0)
    line(0, 0, this.vel.x, this.vel.y);
    pop();
  }

  applyForce(force){
    this.acc.add(force);
  }

  stop(){
     this.show = false;
  }
  checkBoundaries() {

    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      stop()
      // this.pos.x = width;
      // this.vel.x = -this.vel.x;
    }
    // y

    if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - 150) {
      //this.pos.y = height - 150;
      this.vel.y = -this.vel.y;
      this.touchGround = true;
    }
  }
}
