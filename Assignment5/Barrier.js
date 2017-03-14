"use strict";

class Barrier{
  constructor(shape, x, y, y_speed, r, seq){
    this.shape = shape; // TRI for triangle, CIR for circle
    this.r = r;
    this.pos = createVector(x, y);
    this.vel = createVector(0, y_speed);
    this.seq = seq; //sequence number
  }

  display(){
    if (this.shape == TRI){
      var x1 = this.pos.x - this.r;
      var y1 = this.pos.y;
      var x2 = this.pos.x + this.r/2;
      var y2 = this.pos.y - Math.sqrt(3)/2 * this.r;
      var x3 = x2;
      var y3 = this.pos.y + Math.sqrt(3)/2 * this.r;
      fill(255, 0, 0);
      triangle(x1, y1, x2, y2, x3, y3);
    } else if (this.shape == CIR){
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.r*2);
    } else{
      Console.log("whatttt");
    }
  }

  update(){
    this.pos.add(this.vel);
  }

  cycling(){
    if (this.pos.y >= HEIGHT+100 - INTVL * (ROW-this.seq)){
      this.vel.mult(-1);
    }else if(this.pos.y <= INTVL * this.seq){
      this.vel.mult(-1);
    }
  }

  getShape(){
    return this.shape;
  }
}
