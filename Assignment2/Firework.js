"use strict";

class Firework{
  constructor(circle_no, x, y, y_speed_init){
    this.size = circle_no;
    this.x = x;
    this.y = y;
    this.elapsed_time = 0;

    this.blink = false;
    this.showTrace = true;
    this.is_exploded = false;

    this.circles = [];
    for (var i=0; i < NUM_OF_CIRCLES; i++){
      this.circles.push(new Circle(this.x, this.y, y_speed_init));
    }
  }

  prepareForExplod(){
    var c;
    for (var i=0; i<this.circles.length; i++){
      c = this.circles[i];
      var angle = radians(random(0,360));
      var radius = random(0.2,1);
      c.x_speed = radius * Math.cos(angle) * 25;
      c.y_speed = radius * Math.sin(angle) * 25;
      this.is_exploded = true;
    }
  }

  normalDisplay(g){
    var c;
    for (var i=0; i<this.circles.length; i++){
      c = this.circles[i];
      if (this.is_exploded){
        this.elapsed_time += 0.1;
        c.accelerate(0.95);
      }
      c.moveCircle();
      c.applyGravity(g);
      c.drawCircle(c.x, c.y, 255);
    }
  }

  fancyExplode(){
    var c;
    for (var i=0; i<this.circles.length; i++){
      c = this.circles[i];
      c.fancyRotate(this.blink);
    }
  }

  turnOnBlink(){
    this.blink = ~ this.blink;
  }

  lit(g){
    if (this.elapsed_time < 300){
      this.normalDisplay(g);
    }
    else{
      if (this.blink){
        this.showTrace = ~ this.showTrace;
      }
      this.fancyExplode();
    }
  }
}
