const BN = 150;
var boids = [];

var N, Y, U;    // three letters that we control
var curp, curl; // current point and current letter
var allowDrag;
var apts;

function setup(){
  createCanvas(1200, 600);
  background(0, 77, 102);
  bnx = width/4; bny = height/2;
  np1 = createVector(bnx - 50, bny + 50);
  np2 = createVector(bnx - 50, bny - 50);
  np3 = createVector(bnx + 50, bny + 50);
  np4 = createVector(bnx + 50, bny - 50);
  var nps = [];
  nps.push(np1);
  nps.push(np2);
  nps.push(np3);
  nps.push(np4);

  byx = width/2; byy = height/2;
  yp1 = createVector(byx - 50, byy - 50);
  yp2 = createVector(byx + 50, byy - 50);
  yp3 = createVector(byx, byy + 60);
  yp4 = createVector(byx, byy);
  var yps = [];
  yps.push(yp1);
  yps.push(yp2);
  yps.push(yp3);
  yps.push(yp4);

  bux = 3*width/4; buy = height/2;
  up1 = createVector(bux - 50, buy - 50);
  up2 = createVector(bux - 50, buy + 90);
  up3 = createVector(bux + 50, buy + 90);
  up4 = createVector(bux + 50, buy - 50);
  var ups = [];
  ups.push(up1);
  ups.push(up2);
  ups.push(up3);
  ups.push(up4);

  N = new Curve(nps, createVector(bnx, bny), "N");
  Y = new Curve(yps, createVector(byx, byy), "Y");
  U = new Curve(ups, createVector(bux, buy), "U");

  apts = [];
  apts.push(N);
  apts.push(Y);
  apts.push(U);

  allowDrag = 0;

  // setup for flocking
  for (var i = 0; i < BN; i++) {
    boids.push(new Boid(width/2, height/2));
  }
}

function draw(){
  background(0, 77, 102);
  noFill();

  // flocking
  for (var i = 0; i < boids.length; i++) {
    var b = boids[i];
    b.flock(boids);
    b.cohesion(boids);
    b.update();
    b.checkEdges();
    b.display();
  }

  // NYU
  stroke(255);
  strokeWeight(1);

  for (var p=0; p<apts.length; p++){
    apts[p].display();
  }
}

function mouseMoved(){
  var i, j, ps, p;
  allowDrag = 0;

  for (i=0; i<apts.length; i++){
    ps = apts[i];
    for (j=0; j<ps.ap.length; j++){
      p = ps.ap[j];
      var dist = p5.Vector.dist(createVector(mouseX, mouseY), p);

      if (dist < 5){
        allowDrag = 1;
        curp = p;
        curl = ps;
      }
    }
  }
}

function mouseClicked(){
  for (var i=0; i<apts.length; i++){
    apts[i].under_control = 0;
  }
  if (allowDrag){
    curl.under_control = 1;
  }
}

function mouseDragged(){
  if (allowDrag){

    curp.x = mouseX;
    curp.y = mouseY;
  }
}
