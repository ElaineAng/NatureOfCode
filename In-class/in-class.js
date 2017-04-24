var t, v;
var RESOLUTION = 20;
var angles = [];
var rows, cols;
const NUM = 50;
var vehicles = [];

function setup(){
  createCanvas(700, 500);
  background(0);
  rows = floor(height/RESOLUTION);
  cols = floor(width/RESOLUTION);

  for (var i=0; i<NUM; i++){
    vehicles.push(new Vehicle(width-20, random(0, height)));
  }
}

function draw(){
  background(0, 5);
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
