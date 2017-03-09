"use strict";



class Particle{
  constructor(x, y, r, m){
    this.hit = false;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.mass = m;
  }

  setSpeed(x, y){
    this.vel.x = x;
    this.vel.y = y;
  }

  checkEdges(){
    if (this.pos.x < 0){
      this.pos.x = width;
    } else if (this.pos.x > width){
      this.pos.x = 0;
    }

    if (this.pos.y < 0){
      this.pos.y = height;
    }else if (this.pos.y > height){
      this.pos.y = 0;
    }
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f){
    f.div(this.mass);
    this.acc.add(f);
  }

  applyAttraction(other){
    var force = p5.Vector.sub(other.pos, this.pos);
    var distance = this.pos.dist(other.pos);
    var G = 9.8;
    force.normalize();
    force.mult(G * this.mass * other.mass / (distance * distance));
    this.acc.add(force);
  }

  detectBoundary(other){
    var dist = this.pos.dist(other.pos);
    if (dist < (this.r * this.mass/2 + other.r*other.mass/2)){
      this.hit = true;
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      other.vel = createVector(0, 0);
      other.acc = createVector(0, 0);
    }

  }
  display(){
    push();
      translate(this.pos.x, this.pos.y);
      fill(255, 100)
      stroke(255);
      ellipse(0, 0, this.r * this.mass, this.r*this.mass);
      // if (DEBUG_MODE){
      //   stroke(255, 0, 0);
      //   line(0, 0, this.vel.x, this.vel.y);
      // }
    pop();
  }
}
