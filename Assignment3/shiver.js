const DEBUG_MODE = false;
var p, mouseVec, ps, i;

function setup(){
  createCanvas(1200, 600);
  background(0);
  ps = [];
  for (i=0; i<100; i++){
    p = new Particle(random(0, 800), random(0,600), random(5, 30));
    ps.push(p);
  }

  if (DEBUG_MODE){
    frameRate(10);
  }
}

function draw(){

  background(0);
  mouseVec = createVector(mouseX, mouseY);
  for (i=0; i<ps.length; i++){
    ps[i].acc = p5.Vector.sub(mouseVec, ps[i].pos);
    ps[i].acc.setMag(7-ps[i].radius/5);
    ps[i].vel.setMag(32-ps[i].radius);
    ps[i].update();
    ps[i].display();
  }
}
