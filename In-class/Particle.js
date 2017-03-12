"use strict";

const C_GRAVITY = 5;

class Particle {
  constructor(x, y, m, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.rad = 3 * this.mass;
    this.color = color(255);
  }
  applyForce(f) {
    f.div(this.mass);
    this.acc.add(f);
  }

  applyAttraction(other) {
    var distance = this.pos.dist(other.pos); // distance
    var magnitude = (C_GRAVITY * this.mass * other.mass)/(distance * distance); // gravity
    var force = p5.Vector.sub(other.pos, this.pos);
    force.normalize();
    force.mult(magnitude);
    this.applyForce(force);
}

  checkCollision(other) {
    var distance = this.pos.dist(other.pos);
    var force;
    if (distance < this.rad + other.rad){
      force = p5.Vector.sub(other.pos, this.pos);

      // other.vel.mult(0);
      this.applyForce(force.mult(-1));
      this.vel.mult(0);
      //other.applyForce(force.mult(-1));
    }

  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, 100);
    ellipse(0, 0, this.rad * 2, this.rad * 2);
    pop();
  }
}
