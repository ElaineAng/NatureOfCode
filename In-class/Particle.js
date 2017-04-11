"use strict";

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.acc = createVector(0, 0);
    this.rad = random(2, 5);
    this.color = color(255);
    this.lifeSpan = 1;
    this.lifeDecrease = 0.01;
    this.isDone = false;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.lifeSpan -= this.lifeDecrease;

    if (this.lifeSpan < 0){
      this.lifeSpan = 0;
      this.isDone = true;
    }
    //this.vel.mult(0.98);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, this.rad * 2 * this.lifeSpan, this.rad * 2 * this.lifeSpan);
    pop();
  }

  checkOutOfCanvas() {
    if (this.pos.x < PAD || this.pos.x > width-PAD){
      this.isDone = true;
    }
    if (this.pos.y < PAD || this.pos.y > height-PAD){
      this.isDone = true;
    }
  }
}
