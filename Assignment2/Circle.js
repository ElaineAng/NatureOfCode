"use strict";

class Circle{
  constructor(x, y, xspd, yspd) {
    this.x = x;
    this.y = y;
    this.dia = random(5, 10);
    this.xspeed = xspd;
    this.yspeed = yspd;
    this.distance = 0;
    this.isExploded = false;
  }

  move(){
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  reduceSpeed(amt){
    this.xspeed *= amt;
    this.yspeed *= amt;
  }

  displayNormal(){
    if (this.isExploded){
      this.reduceSpeed(0.9);
    }
    push();
      fill(255);
      noStroke();
      ellipse(this.x, this.y, this.dia, this.dia);
    pop();
  }

  applyGravity(g){
    this.yspeed += g;
  }

  explod(){
    this.xspeed = random (-1, 1) * 20;
    this.yspeed = random (-1, 1) * 20;
    this.isExploded = true;
  }

  displayAfterExp(){
    this.distance += 0.2;
    var angle;
    for (angle = 0; angle < 360; angle+=60){
      // i for angle
      push();
      translate(this.x, this.y);
      rotate(frameCount * 0.02);
      rotate(radians(angle));
      fill(255 - this.distance * 2);
      noStroke();
      ellipse(0, 0+this.distance, this.dia, this.dia);
      pop();
    }
  }
}
