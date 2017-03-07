"use strict";

class Particle{
  constructor(x, y, r){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.radius = r;
    this.r = random(128, 256);
    this.g = random(128, 256);
    this.b = random(128, 256);
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  display(){
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.pos.x, this.pos.y, this.radius);
    if (DEBUG_MODE){
      stroke(255, 0, 0);
      line(0, 0, this.vel.x, this.vel.y);
    }

  }
}
