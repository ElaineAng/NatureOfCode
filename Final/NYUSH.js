const GL = 200;

var N, Y, U;    // three letters that we control
var curp, curl; // current point and current letter
var allowDrag;
var apts;

// for drawing background flow
var t, v;
var RESOLUTION = 20;
var angles = [];
var rows, cols;
const NUM = 50;
var vehicles = [];

function setup(){
  createCanvas(1000, 600);
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

  // background flow
  rows = floor(height/RESOLUTION);
  cols = floor(width/RESOLUTION);

  for (var i=0; i<NUM; i++){
    vehicles.push(new Vehicle(width-20, random(0, height)));
  }
}

function draw(){
  background(0, 77, 102);
  noFill();

  // flow field
  noStroke();
  var index = 0;
  for (var c = 0; c < cols; c++){
    for (var r = 0; r < rows; r++){

      var x = c * RESOLUTION;
      var y = r * RESOLUTION;

      var xfreq = (x + frameCount) * 0.01;
      var yfreq = (y + frameCount) * 0.01;
      var amp = TWO_PI;
      var val = noise(xfreq, yfreq) * amp;

      angles[index] = val;
      // var y = height/2 + val;
      push();
      translate(x, y);
      noFill();

      stroke(200);
      // rect(0, 0, RESOLUTION, RESOLUTION);
      // text(index, 5, 15);
      rotate(val);
      stroke(0);
      // line(0, 0, RESOLUTION/2, 0);
      pop();

      index++;
    }
    var vCenter = createVector(width/2, height/2);
    var vMouse = createVector(mouseX, mouseY);
    var vector = p5.Vector.sub(vMouse, vCenter);

    for (var i=0; i<vehicles.length; i++){
      var v = vehicles[i];
      var j = floor(v.pos.x / RESOLUTION);
      var k = floor(v.pos.y / RESOLUTION);
      noStroke();
      // fill(0, 255, 0);
      //ellipse(j*RESOLUTION, k*RESOLUTION, 10, 10);
      // console.log(angles);
      v.flow(angles[cols * k + j]);
      v.update();
      v.checkEdges();
      v.display();
    }
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
