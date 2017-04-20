"use strict";

class Vehicle{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.angle = 0;
    this.found = false;
  }
  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0)

    this.angle = this.vel.heading();
    this.maxSpeed = 5;
    this.maxForce = 1;
  }

  seek(target){
    if (!this.found){
      var desired = p5.Vector.sub(target, this.pos);
      desired.normalize();
      desired.mult(this.maxSpeed);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  applyForce(force){
    this.acc.add(force);
  }

  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle)
    stroke(255);
    fill(200);

    triangle(0, 0, -20, -8, -20, 8);
    pop();
  }

  checkArrive(t){
    if (p5.Vector.sub(this.pos, t.pos).mag() < 5){

      this.found = true;
    }
  }
}
