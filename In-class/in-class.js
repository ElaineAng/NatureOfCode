var t, v;
var RESOLUTION = 50;
var angles = [];
var rows, cols;

var vehicles = [];

function setup(){
  createCanvas(700, 500);
  background(255);
  rows = floor(width/RESOLUTION);
  cols = floor(height/RESOLUTION);

  vehicles.push(new Vehicle(width/2, height/2));
}

function draw(){
  background(255);
  noStroke();

  var index = 0;
  for (var c = 0; c < cols; c++){
    for (var r = 0; r < rows; r++){

      var x = r * RESOLUTION;
      var y = c * RESOLUTION;

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
      rect(0, 0, RESOLUTION, RESOLUTION);
      text(index, 5, 15);
      rotate(val);
      stroke(0);
      line(0, 0, RESOLUTION/2, 0);
      pop();

      index++;
    }
  }

  for (var i=0; i<vehicles.length; i++){
    var v = vehicles[i];
    v.display();
  }
}
