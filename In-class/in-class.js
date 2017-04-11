"use strict";
const PAD = 50;
var particles = [];

function setup(){
  createCanvas(500, 600);
}

function draw(){

  background(0);
  particles.push(new Particle(width/2, height/2));

  for (var i=0; i<particles.length; i++){
    var p = particles[i];
    p.update();
    p.display();
    p.checkOutOfCanvas();
    if (p.isDone){
      particles.splice(i, 1);
    }
  }

  if (particles.length > 300){
    particles.splice(0, 1);
  }
  stroke(255, 0, 0);
  line(PAD, PAD, width-PAD, PAD);
  line(width-PAD, PAD, width-PAD, height-PAD);
  line(PAD, height-PAD, width-PAD, height-PAD);
  line(PAD, PAD, PAD, height-PAD);
}
