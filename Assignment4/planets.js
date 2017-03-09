"use strict";

const EARTH_RAD = 150;
const WATER_RAD = 300;

var PLT_X, PLT_Y;
var earth, water, gravity, resistance, distance;
var particles = [];

function setup() {
  createCanvas(800, 600);
  background(0);
  PLT_X = width/2;
  PLT_Y = height/2;
  earth = new Planet(PLT_X, PLT_Y, EARTH_RAD);
  water = new Planet(PLT_X, PLT_Y, WATER_RAD);
  particles.push(new Particle(random(width), random(height-PLT_Y-WATER_RAD)));
  //frameRate(5);
}

function draw() {
  background(0);

  earth.display();
  water.display();
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];


    gravity = p5.Vector.sub(earth.pos, p.pos);
    gravity.setMag(5);

    resistance = p5.Vector.sub(earth.pos, p.pos);
    resistance.setMag(3);

    distance = p5.Vector.sub(p.pos, earth.pos).mag();

    // stroke(255, 0, 0);
    // line(p.pos.x, p.pos.y, earth.pos.x, earth.pos.y);

    p.applyForce(gravity);
    p.slowInWater(distance, resistance);
    p.stopAtEarth(distance);

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

  display(){
    noFill();
    stroke(0, 0, 255);
    ellipse(this.pos.x, this.pos.y, this.dia);
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

  slowInWater(distance, resistance){
    if ((distance > EARTH_RAD/2) && (distance < WATER_RAD/2)){
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.applyForce(resistance);
    }
  }

  stopAtEarth(distance){
    if (distance < EARTH_RAD/2){
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
    }
  }
}
