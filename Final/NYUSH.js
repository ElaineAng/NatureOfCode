const BN = 20;
const SZ = 50;
const GL = 200;
const STEPS = 15;
var boids = [];

var N, Y, U, S, H;    // five letters that we control
var curp, curl; // current point and current letter
var curt; //current torch;
var allowDragLetter, allowDragTorch, allowRelease;
var apts;

var torch, bund;

var gui = new dat.gui.GUI();

var params = {
  debugMode: false,
  background: 220,
}
gui.add(params, "background").min(10).max(360);

function setup(){
  createCanvas(1200, 600);
  // background(153, 221, 255);
  bgc();
  bnx = width/2-200; bny = height/4;
  np1 = createVector(bnx - SZ, bny + SZ);
  np2 = createVector(bnx - SZ, bny - SZ);
  np3 = createVector(bnx + SZ, bny + SZ);
  np4 = createVector(bnx + SZ, bny - SZ);
  var nps = [np1, np2, np3, np4];

  byx = bnx+SZ*3; byy = height/4;
  yp1 = createVector(byx - SZ, byy - SZ);
  yp2 = createVector(byx + SZ, byy - SZ);
  yp3 = createVector(byx, byy + SZ*1.2);
  yp4 = createVector(byx, byy);
  var yps = [yp1, yp2, yp3, yp4];

  bux = byx+SZ*3; buy = height/4;
  up1 = createVector(bux - SZ, buy - SZ);
  up2 = createVector(bux - SZ, buy + SZ*2);
  up3 = createVector(bux + SZ, buy + SZ*2);
  up4 = createVector(bux + SZ, buy - SZ);
  var ups = [up1, up2, up3, up4];

  bsx = bux+SZ*3; bsy = height/4;
  sp1 = createVector(bsx + SZ, bsy - SZ);
  sp2 = createVector(bsx - 2.5*SZ, bsy - SZ);
  sp3 = createVector(bsx + 2.5*SZ, bsy + SZ);
  sp4 = createVector(bsx - SZ, bsy + SZ);
  var sps = [sp1, sp2, sp3, sp4];

  bhx = bsx+SZ*3; bhy = height/4;
  hp1 = createVector(bhx-SZ, bhy-SZ);
  hp2 = createVector(bhx-SZ, bhy);
  hp3 = createVector(bhx-SZ, bhy+SZ);
  hp4 = createVector(bhx+SZ, bhy-SZ);
  hp5 = createVector(bhx+SZ, bhy);
  hp6 = createVector(bhx+SZ, bhy+SZ);
  var hps = [hp1, hp2, hp3, hp4, hp5, hp6];

  N = new Curve(nps, createVector(bnx, bny), "N");
  Y = new Curve(yps, createVector(byx, byy), "Y");
  U = new Curve(ups, createVector(bux, buy), "U");
  S = new Curve(sps, createVector(bsx, bsy), "S");
  H = new Curve(hps, createVector(bhx, bhy), "H");
  apts = [N, Y, U, S, H];

  allowDragLetter = false;
  allowDragTorch = false;
  allowRelease = false;

  torch = loadImage("torch3.png");
  bund = loadImage("bund3.png");

  // setup for flocking
  for (var i = 0; i < BN; i++) {
    boids.push(new Boid(i));
  }
}

function draw(){
  bgc();
  image(bund, 0, height-630, width, bund.height*(width/bund.width));
  // background(153, 221, 255);
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
  var i, j, ps, p, t;
  allowDragLetter = false;
  allowDragTorch = false;
  allowRelease = false;
  for (i=0; i<apts.length; i++){
    ps = apts[i];
    for (j=0; j<ps.ap.length; j++){
      p = ps.ap[j];
      var dist = p5.Vector.dist(createVector(mouseX, mouseY), p);

      if (dist < 10){
        allowDragLetter = true;
        curp = p;
        curl = ps;
      }
    }
  }

  for (i=0; i<boids.length; i++){
    t = boids[i]
    var dist = p5.Vector.dist(createVector(mouseX, mouseY), t.pos);

    if (dist < t.sizeCoef*torch.width && dist < t.sizeCoef*torch.height){
      allowDragTorch = true;
      allowRelease = true;
      curt = t;
    }
  }

  // if (allowRelease && keyPressed && keyCode == 32){
  //   curt.allowMove = true;
  // }
}


function keyPressed(){
  if (keyCode == 68){
    if (allowRelease){
      curt.allowMove = true;
    }
  }
}
function mouseClicked(){
  for (var i=0; i<apts.length; i++){
    apts[i].under_control = false;
  }
  if (allowDragLetter){
    curl.under_control = true;
  }

  // for (var i=0; i<boids.length; i++){
  //   boids[i].allowMove = true;
  // }
  if (allowDragTorch){
    if (curt.allowMove){
      curt.allowMove = false;
    }

  }
}

function mouseDragged(){
  if (allowDragLetter){
    curp.x = mouseX;
    curp.y = mouseY;
  }

  if (allowDragTorch){
    curt.pos.x = mouseX;
    curt.pos.y = mouseY;
  }
}

function bgc(){
  noStroke();
  var hb = params.background;
  var sect = height/GL;
  var sb = 60;
  var lb = 60;
  colorMode(HSL, 360, 100, 100);

  for (var i=0; i<GL; i++){
    var h = hb;
    var s = sb + i * (100-sb)/GL;
    var l = lb + i * (100-lb)/GL;
    fill(color(h, s, l));
    // var y1 = height-(i+1)*sect;
    var y1 = i*sect;
    rect(0, y1, width, sect);
  }

  colorMode(RGB);
}
