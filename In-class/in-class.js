var gui = new dat.gui.GUI();

var params = {
  debugMode : false,
  diameter: 200,
  vibrationAmp: 5
}

gui.add(params, "debugMode");
gui.add(params, "diameter").min(100).max(300).step(10);
gui.add(params, "vibrationAmp", 5, 10, 1); //same as above line; 2 interfaces

function setup(){
  createCanvas(500, 600);
  background(0);
}

function draw(){
  background(0, 5);

  va = params.vibrationAmp;
  dia = params.diameter;
  if (!params.debugMode){
    fill(255, 150);
    noStroke();
  } else{
    stroke(255);
    noFill();
  }

  var vX = random(-va, va) + width/2;
  var vY = random(-va, va) + height/2;
  ellipse(vX, vY, dia, dia);
}
