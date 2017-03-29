"use strict"
class Circle{
  constructor(id, x, y, r, amp, freq){
    this.id = id;
    this.eq = createVector(x, HEIGHT/2);
    this.pos = createVector(x, HEIGHT/2 + sin(x*freq*2*PI)*amp);
    this.vel = createVector(2, 0);
    this.acc = createVector(0, 0);
    this.r = r;

    this.k = 0.001;
    this.f = 0;

    this.dropMode = false;
    this.isTransitioning = false;

    this.vxBackup = this.vel.x;
    this.xBackup = this.pos.x;
    this.yBackup = this.pos.y;

    this.colorSet = false;
    this.rgb = 0;
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

  draw(){
    noStroke();
    if (!this.colorSet){
      if (this.id < num_circle/2){
        this.rgb = map(this.id, 0, num_circle/2, 64, 192);
      }else{
        this.rgb = map(this.id, num_circle/2, num_circle, 192, 64);
      }
      this.colorSet = true;
    }
    if (colorScheme == RED){
      fill(255, this.rgb, this.rgb);
    }else if(colorScheme == GREEN){
      fill(this.rgb, 255, this.rgb);
    }else if (colorScheme == BLUE){
      fill(this.rgb, this.rgb, 255);
    }

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
    this.vel = createVector(0, random(-12, 12));

  }
  transition(){

    if (this.isTransitioning){
      this.pos.x = lerp(this.pos.x, this.xBackup, 0.1);
      this.pos.y = lerp(this.pos.y, this.yBackup, 0.1);
      this.vel.x = lerp(this.vel.x, this.vxBackup, 0.1);

      this.vel.y = 0;

      if (Math.abs(this.pos.x - this.xBackup) < 0.01
       && Math.abs(this.pos.y - this.yBackup) < 0.01
       && Math.abs(this.vel.x - this.vxBackup) < 0.01){
          this.isTransitioning = false;
          this.acc = createVector(0, 0);
          this.pos = createVector(this.xBackup, this.yBackup);
          this.vel = createVector(this.vxBackup, 0);
          trans_comp_count += 1;
      }
    }
  }

  updateAmp(vy){
    this.vel.y = vy;
  }

}
