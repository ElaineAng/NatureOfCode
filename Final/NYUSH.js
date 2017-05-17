const BN = 20;
const SZ = 60;
const GL = 200;
var boids = [];

var N, Y, U;    // three letters that we control
var curp, curl; // current point and current letter
var allowDrag;
var apts;

var img;
function setup(){
  createCanvas(1200, 600);
  // background(0, 77, 102);
  bgc();
  bnx = width/4; bny = height/4;
  np1 = createVector(bnx - SZ, bny + SZ);
  np2 = createVector(bnx - SZ, bny - SZ);
  np3 = createVector(bnx + SZ, bny + SZ);
  np4 = createVector(bnx + SZ, bny - SZ);
  var nps = [];
  nps.push(np1);
  nps.push(np2);
  nps.push(np3);
  nps.push(np4);

  byx = width/2; byy = height/4;
  yp1 = createVector(byx - SZ, byy - SZ);
  yp2 = createVector(byx + SZ, byy - SZ);
  yp3 = createVector(byx, byy + SZ*1.2);
  yp4 = createVector(byx, byy);
  var yps = [];
  yps.push(yp1);
  yps.push(yp2);
  yps.push(yp3);
  yps.push(yp4);

  bux = 3*width/4; buy = height/4;
  up1 = createVector(bux - SZ, buy - SZ);
  up2 = createVector(bux - SZ, buy + SZ*2);
  up3 = createVector(bux + SZ, buy + SZ*2);
  up4 = createVector(bux + SZ, buy - SZ);
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

  img = loadImage("torch.png");
}

function draw(){
  bgc();
  // background(0, 77, 102);
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

      if (dist < 10){
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

function bgc(){
  noStroke();
  var hb = 260;
  var sect = height/GL;
  var sb = 30;
  var lb = 30;
  colorMode(HSL, 360, 100, 100);

  for (var i=0; i<GL; i++){
    var h = hb;
    var s = sb + i * (100-sb)/GL;
    var l = lb + i * (100-lb)/GL;
    fill(color(h, s, l));
    var y1 = height-(i+1)*sect;
    rect(0, y1, width, sect);
  }

  colorMode(RGB);
}
