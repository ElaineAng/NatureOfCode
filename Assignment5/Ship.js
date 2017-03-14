"use strict";

class Ship {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0.1);
    this.acc = createVector(0, 0);
    this.r = r;
    this.show = true;
		this.freeze = false;
    this.die = false;
    this.win = false;
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display(){
    noStroke();
    fill(0, 128, 255);
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }

  applyForce(force){
    this.acc.add(force);
  }

  stop(){
     this.show = true;
  }

  isFreeze(){
    return this.freeze;
  }

  changeState(){
    this.freeze = ~ this.freeze;
  }

  checkBoundaries() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.success();
    }

    if (this.pos.y <= 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = -this.vel.y;
    }
  }

  changeSpeed(v, d){
    var ds = createVector(0, 0);
    if (d == "U"){
      ds.add(0, -1*v);
    }else if (d == "D"){
      ds.add(0, v);
    }else if (d == "R"){
      ds.add(v, 0);
    }else if (d == "L"){
      ds.add(-1*v, 0);
    }
    this.vel.add(ds);
  }

  changePos(p, d){
    var dp = createVector(0, 0); //delta_position;
    if (d == "L"){
      dp.add(-1*p, 0);
    }else if (d == "R"){
      dp.add(p, 0);
    }else if (d == "U"){
      dp.add(0, -1*p);
    }else if (d == "D"){
      dp.add(0, p);
    }
    this.pos.add(dp);
  }

  bouceBack(){
    this.vel.mult(-1);
  }

  killed(){
    this.changeState();
    this.die = true;
  }

  success(){
    this.win = true;
    this.vel.mult(0);
    this.acc.mult(0);
  }

  won(){
    return this.win;
  }

  isDead(){
    return this.die;
  }

  detectBarrier(b){
    var distv = p5.Vector.sub(this.pos, b.pos);
    var bshape = b.getShape();

    if (bshape == TRI){
      if (distv.mag() <= (this.r + b.r - 5)){
        this.killed();
      }
    } else if (bshape == CIR){
      if (distv.mag() <= (this.r + b.r)){
        this.pos = p5.Vector.add(b.pos, distv.normalize().mult(b.r+this.r));
        this.bouceBack();
      }
    }
  }
}
