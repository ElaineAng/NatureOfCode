"use strict";

class Particle{
  constructor(x, y, r){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(1, 0);
    this.r = r;
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  display(){
    push();
      translate(this.pos.x, this.pos.y);
      stroke(255);
      ellipse(0, 0, this.r, this.r);
      if (DEBUG_MODE){
        stroke(255, 0, 0);
        line(0, 0, this.vel.x, this.vel.y);
      }
    pop();
  }
}
