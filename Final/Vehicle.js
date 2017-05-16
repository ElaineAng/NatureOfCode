"use strict";

class Vehicle {
  constructor(x, y, r) {
    this.pos = createVector(x,y);
    this.vel = createVector(random(-10, 10), random(-2, 2));
    this.acc = createVector();
    this.angle = 0;
    this.maxDesiredVelocity = 5;
    this.maxSteerForce = 0.1;

    this.r = r;
    this.froze = false;
    this.lifeSpan = 500;
    this.age = 0;
  }
  update() {
    if (! this.froze){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.vel.limit(1);
      this.acc.mult(0);
      this.angle = this.vel.heading();
      this.age += 1;
    }
  }
  flow(angle) {
    if (! this.froze){
      var desired = p5.Vector.fromAngle(angle);
      desired.setMag(this.maxDesiredVelocity);

      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxSteerForce);
      this.applyForce(steer);
    }
  }
  applyForce(force) {
    this.acc.add(force);
  }

  freeze(){
    this.acc = 0;
    this.vel = 0;
    this.froze = true;
  }
  decreaseR(){
    this.r *= 0.995;
  }
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    noStroke();
    fill(51, 66, 36);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}
