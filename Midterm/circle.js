"use strict"
class Circle{
  constructor(x, y, r, amp, freq){
    this.eq = createVector(x, HEIGHT/2);
    this.pos = createVector(x, HEIGHT/2 + sin(x*freq*2*PI)*amp);
    this.xBackup = x;
    this.vel = createVector(3, 0);
    this.vxBackup = this.vel.x;
    this.acc = createVector(0, 0);
    this.r = r;
    this.k = 0.001;
    this.f = 0;
    this.amp = amp;
    this.freq = freq;
    this.dropMode = false;
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (! this.dropMode){
      if (this.pos.x > width){
        this.pos.x = this.pos.x % width ;
      }
      if (this.pos.x < 0){
        this.pos.x = width + (this.pos.x % width);
      }
    }
  }

  updateAmp(vy){
    this.vel.y = vy;
  }

  draw(){
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }

  applyForce(f){
    if (f == SPRING){
      this.eq.x = this.pos.x;
      this.f = p5.Vector.sub(this.eq, this.pos);
      this.acc.add(this.f.mult(this.k));

    }else if (f == GRAVITY){
      this.f = createVector(0, 0.5);
      this.acc.mult(0);
      this.acc.add(this.f);
    }

  }

  setSize(){
    this.r = this.r*2;
  }

  checkBoundary(){
    if (this.pos.x > width || this.pos.x < 0){
      this.vel.x *= -1;
    }
    if (this.pos.y > height-this.r || this.pos.y < 0){
      this.pos.y = height-this.r;
      this.vel.y *= -1;
    }
  }

  random_speed(){
    this.dropMode = true;
    this.vel = createVector(0, random(-10, 10));

  }
  reset(){
    this.pos = createVector(this.xBackup, HEIGHT/2 + sin(this.xBackup*this.freq*2*PI)*this.amp);
    this.vel = createVector(this.vxBackup, 0);
    this.acc.mult(0);
  }
}
