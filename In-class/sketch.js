"use strict";

var sinArray = [];
var cosArray = [];
var sinCosResolution = 360;


function setup() {
  createCanvas(500, 600);
  background(0);

  for (var i=0; i<sinCosResolution; i++){
    var angle = map(i, 0, sinCosResolution, 0, TWO_PI);
    sinArray[i] = sin(angle);
    cosArray[i] = cos(angle);
  }
}


function draw() {
  background(0);

  translate(width/2, height/2);
  var cosValue = mCos(frameCount * 0.1) * 100;
  var sinValue = mSin(frameCount * 0.1) * 100;

  ellipse(cosValue, sinValue, 10, 10);
}

function mSin(radians){
  var index = map(radians % TWO_PI, 0, TWO_PI, 0, sinCosResolution);
  index = int(index);
  return sinArray[index];
}

function mCos(radians){
  var index = map(radians % TWO_PI, 0, TWO_PI, 0, sinCosResolution);
  index = int(index);
  return cosArray[index];
}
