const HD = 100;
const NUM = 30;

var t, v;
var RESOLUTION = 20;
var angles = [];
var rows, cols;

var vehicles = [];

var start = false;

function setup(){
  createCanvas(800, 600);

  rows = floor(height/RESOLUTION);
  cols = floor(width/RESOLUTION);

  noStroke();
  var hb = 204;
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

function draw(){

  if (start){
    var index = 0;
    for (var c = 0; c < cols; c++){
      for (var r = 0; r < rows; r++){

        var x = c * RESOLUTION;
        var y = r * RESOLUTION;

        var xfreq = (x + frameCount) * 0.5;
        var yfreq = (y + frameCount) * 0.5;
        var amp = TWO_PI * 1.6;
        var val = noise(xfreq, yfreq) * amp;

        angles[index] = val;

        push();
        translate(x, y);
        noFill();

        stroke(200);
        rotate(val);
        stroke(0);
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
      v.flow(angles[cols * k + j]);
      if (!v.froze){
        v.update();
      }
      v.display();
      if (v.lifeSpan < v.age){
        v.freeze();
      }
      v.decreaseR();
    }
  }
}

function mousePressed(){
  for (var i=0; i<NUM; i++){
    vehicles.push(new Vehicle(mouseX, mouseY, 3));
  }
  start = true;
}
