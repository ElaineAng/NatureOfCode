"use strict"
class Circle{
  constructor(x, y, r, amp, freq){
    this.eq = createVector(x, HEIGHT/2);
    this.pos = createVector(x, HEIGHT/2 + sin(x*freq)*amp);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.k = 0.001;
    this.f = 0;
    this.amp = amp;
    this.freq = freq;
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  updateAmp(amp){
    this.vel.mult(0);
    this.acc.mult(0);
    this.amp = amp;
    this.newPos();
  }

  newPos(){
    this.pos = createVector(this.pos.x, HEIGHT/2 + sin(this.pos.x*this.freq)*this.amp);
  }
  
  draw(){
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }

  applyForce(){
      this.f = p5.Vector.sub(this.eq, this.pos);
      this.acc.add(this.f.mult(this.k));
  }
}
