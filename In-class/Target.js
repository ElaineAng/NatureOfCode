"use strict";

class Target{
  constructor(x, y){
    this.pos = createVector(x, y);
    this.rad = 10;
  }
  display(){
    push();

    stroke(255);
    fill(100);
    ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2);

    pop();
  }

  move(){
    t.pos.x = frameCount%width;
    t.pos.y = 100 * sin(frameCount / 50) + height/2;

  }
}
