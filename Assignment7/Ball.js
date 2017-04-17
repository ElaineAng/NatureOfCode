"use strict";

class Ball{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();

    this.mass = 20
    this.rad = this.mass;
    this.cDamping = 0.98;
    this.isDragging = false;
  }

  display(){
    push();
    stroke(255);
    fill(200);
    ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);
    pop();
  }

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.vel.mult(this.cDamping);
  }

  applyForce(force){
    force.div(this.mass);
    this.acc.add(force);
  }

  checkWall(){
    if (this.pos.y < WALL + this.rad){
      this.vel.y = - this.vel.y;
      this.pos.y = WALL + this.rad;
    }
  }

  drag(){
    var distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (mouseIsPressed && distance < this.rad){
      this.isDragging = true;
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    } else{
      this.isDragging = false;
    }
  }
}
