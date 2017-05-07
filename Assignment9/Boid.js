"use strict";

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector();

    this.maxSpeed = 3; // max speed;
    this.maxSteerForce = 0.02; // max steering force
    this.separateDist = 50;
    this.neighbourDist = 50;
  }
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); //***
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
  }
  applyForce(force) {
    this.acc.add(force);
  }

  flock(others, c, r){
    var target = createVector(mouseX, mouseY);
    var seekForce = this.seek(target);
    var sepaForce = this.separate(others);
    var coheForce = this.cohesion(others);

    sepaForce.mult(5);

    if (p5.Vector.dist(target, c) < r){
      this.applyForce(seekForce);
    }
    this.applyForce(sepaForce);
    this.applyForce(coheForce);
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

  checkEdges(c, r) {
    var distance = p5.Vector.dist(c, this.pos);
    var direction = p5.Vector.sub(this.pos, c);
    direction.setMag(r);
    if ( distance > r){
      // this.vel.mult(-1);
      this.pos.x = c.x - direction.x;
      this.pos.y = c.y - direction.y;
      this.vel.mult(1.5);
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(0);
    triangle(0, 0, -20, 8, -20, -8);
    pop();
  }
}
