const DEBUG_MODE = false;
var p, mouseVec, ps, i;

function setup(){
  createCanvas(800, 600);
  background(0);
  ps = [];
  for (i=0; i<10; i++){
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
    ps[i].acc.mult(random(0.001, 0.004));

    //ps[i].vel.mult(random(0.9, 1));
    ps[i].update();
    ps[i].display();

  }

}
