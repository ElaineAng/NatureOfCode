"use strict";

const EARTH_RAD = 150;
const WATER_RAD = 300;
const PLT_X, PLT_Y;

var earth, water, gravity, resistance;
var particles = [];

function setup() {
  createCanvas(600, 600);
  PLT_X = width/2;
  PLT_Y = height/2;
  earth = new Planet(PLT_X, PLT_Y, EARTH_RAD);
  water = new Planet(PLT_X, PLT_Y, WATER_RAD);
  particles.push(new Particle(random(width), random(height)));
  //frameRate(5);
}

function draw() {
  background(0);

  earth.display();
  water.display();
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];

    gravity = createVector(p.pos.x, p.pos.y);
    gravity = p5.Vector.sub(earth.pos, gravity);
    gravity.setMag(5);
    // p.vel.setMag(5);
    // stroke(255, 0, 0);
    // line(p.pos.x, p.pos.y, earth.pos.x, earth.pos.y);

    p.applyForce(gravity);
    //p.applyForce(resistance)
    //p.checkBoundaries();
    p.update();
    p.display();
  }

}

class Planet{
  constructor(x, y, dia){
    this.pos = createVector(x, y);
    this.dia = dia;
    this.cGravity = 1.5;
  }

  update(){

  }

  display(){
    push();
    noFill();
    stroke(0, 0, 255);
    ellipse(this.pos.x, this.pos.y, this.dia);
    pop();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5,5), random(-5,5));
    this.acc = createVector();
    this.dia = 2;
    this.mass = random(5, 10);
  }
  applyForce(f) {
    f.div(this.mass);
    this.acc.add(f);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, this.dia * this.mass, this.dia * this.mass);
    pop();
  }
  checkBoundaries() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }

  // checkPlanet(){
  //   if (p5.Vector.sub(this.pos, ))
  // }
}
