"use strict";

class Circle{
  constructor(x, y, y_speed_init) {
    this.x = x;
    this.y = y;
    this.dia = random(5, 10);
    this.x_speed = 0;
    this.y_speed = y_speed_init;
    this.distance = 0;
  }

  drawCircle(x, y, color){
    noStroke();
    fill(color);
    ellipse(x, y, this.dia, this.dia)
  }

  moveCircle(){
    this.y += this.y_speed;
    this.x += this.x_speed;
  }

  applyGravity(g){
    this.y_speed += g;
  }

  accelerate(amt){
    this.x_speed *= amt;
    this.y_speed *= amt;
  }

  fancyRotate(blink){
    this.distance += 0.3;
    var angle;
    for (angle = 0; angle < 360; angle += 60){
      push();
        translate(this.x, this.y);
        rotate(radians(angle));
        noStroke();
        if (blink){
          this.drawCircle(0, 0 + this.distance, random(64, 255) - this.distance * 7)
        }
        else{
          rotate(frameCount);
          this.drawCircle(0, 0 + this.distance, 255 - this.distance * 7)
        }
      pop();
    }
  }
}
