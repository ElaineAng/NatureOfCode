"use strict";

class Vehicle {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.vel = createVector(0, random(-10, 10));
    this.acc = createVector();
    this.angle = 0;
    this.maxDesiredVelocity = 5;
    this.maxSteerForce = 0.1;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(1);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  flow(angle) {
    var desired = p5.Vector.fromAngle(angle);
    desired.setMag(this.maxDesiredVelocity);

    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);

    this.applyForce(steer);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(255);
    // triangle(0,0,-1,0.5,-1,-0.5);
    ellipse(0, 0, 0.5, 0.5);
    pop();
  }
}
