"use strict";

class Boid {
  constructor(i) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1,1),random(-1,1));
    this.acc = createVector();

    this.maxSpeed = 2; // max speed;
    this.maxSteerForce = 0.01; // max steering force
    this.separateDist = 150;
    this.neighbourDist = 20;

    this.sepaCoef = 0.5;
    this.neighbourCoef = 1;

    this.sizeCoef = 0.2+(i/4*0.05);
    this.allowMove = true;
    this.angle = 0;

    this.w = this.sizeCoef * torch.width;
    this.h = this.sizeCoef * torch.height;
  }
  update() {
    if (this.allowMove){
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed); //***
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.angle = this.vel.heading();
    }
  }
  applyForce(force) {
    this.acc.add(force);
  }

  flock(others){
    var target = createVector(mouseX, mouseY);
    var seekForce = this.seek(target);
    var sepaForce = this.separate(others);

    sepaForce.mult(this.sepaCoef);

    // this.applyForce(seekForce);
    this.applyForce(sepaForce);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteerForce);

    return steer;
  }

  separate(others){
      // var
      var vector = createVector();
      var count = 0;

      // sum, for loop
      for (var i=0; i<others.length; i++){
        var other = others[i];
        var distance = this.pos.dist(other.pos);

        if (distance > 0 && distance < this.separateDist){
          var diff = p5.Vector.sub(this.pos, other.pos);
          diff.normalize();
          diff.div(distance);

          vector.add(diff);
          count++;
        }
      }

      if (count > 0){
        vector.div(count); // average
      }

      if (vector.mag() > 0){
        vector.setMag(this.maxSpeed);
        vector.sub(this.vel);
        vector.limit(this.maxSteerForce);
      }
      return vector;
  }

  cohesion(others){
    var position = createVector();
    var count = 0;

    for (var i=0; i<others.length; i++){
      var other = others[i];
      var distance = this.pos.dist(other.pos);

      if (distance > 0 && distance < this.neighbourDist){
        position.add(other.pos);
        count++;
      }
    }

    if (count > 0){
      position.div(count);
      return this.seek(position);
    }

    return position;
  }

  checkEdges() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = height;
      // this.vel.mult(-1);

    } else if (this.pos.y > height) {
      this.pos.y = 0;
      // this.vel.mult(-1);
    }
  }
  display() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    var w = this.sizeCoef*torch.width;
    var h = this.sizeCoef*torch.height
    image(torch, 0-w/2, 0-h/2, w, h);
    // fill(255);
    // ellipse(0, 0, 10, 10);
    pop();
  }
}
