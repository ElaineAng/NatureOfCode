"use strict";
var s, barriers, gravity, has_wind, wind_resistance;
const R = 15;
const TRI = 0;
const CIR = 1;
const ROW = 5;
const COL = 3
const INTVL = 120; //interval
const WIDTH = 1000;
const HEIGHT = 600;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);

  var saw, baw;
  saw = 400; //ship_area_width
  baw = width - saw; //barrier_area_width

  s = new Ship(0, 100, R);
  barriers = [];

  for (var i=0; i<COL; i++){
    barriers.push([]);
    for (var j=0; j<ROW; j++){
      var shape = Math.floor(Math.random() * 2);
      barriers[i].push(new Barrier(shape, saw+(baw/COL)*i, INTVL*j, 2, 20, j));
    }
  }
  gravity = createVector(0, 0.05);
  wind_resistance = createVector(-0.05, 0);
  has_wind = false;
}

function draw() {
  background(0);
  if (!s.isDead() && !s.won()){
    if (!s.isFreeze()){
      s.update();
      s.checkBoundaries();
      s.applyForce(gravity);
      if (has_wind){
        s.applyForce(wind_resistance);
      }
    }
    for(var i=0; i<COL; i++){
      for (var j=0; j<ROW; j++){
        barriers[i][j].update();
        barriers[i][j].cycling();
        s.detectBarrier(barriers[i][j]);
      }
    }

  }
  for (var i=0; i<COL; i++){
    for (var j=0; j<ROW; j++){
      barriers[i][j].display();
    }
  }

  s.display();

  if (s.isDead()){
    fill('rgba(255, 255, 255, 0.5)');
    noStroke();
    rect(0, HEIGHT/2 - 80, WIDTH, 110);
    var death_claim = "Game Over !!";
    textSize(72);
    fill(0, 102, 153);
    text(death_claim, WIDTH/2-200, HEIGHT/2);
  }

  if (s.won()){
    fill('rgba(255, 255, 255, 0.5)');
    noStroke();
    rect(0, HEIGHT/2 - 80, WIDTH, 110);
    var success_claim = "You Win !!";
    textSize(72);
    fill(166, 51, 204);
    text(success_claim, WIDTH/2-180, HEIGHT/2);
  }

  if (has_wind){
    textSize(24);
    fill('rgba(0, 191, 255, 0.5)');
    var wind_text = "The wind is coming...";
    text(wind_text, 20, 40);
  }
}

function keyPressed(){
	// Whitespace
	if (keyCode == 32 && !s.isDead()){
    s.changeState();
	}

	// Right
	if (keyCode == 39 && !s.isDead()){
    if (!s.isFreeze()){
      s.changePos(20, "R");
      s.changeSpeed(1, "R");
    }
	}

	// Left
	if (keyCode == 37 && !s.isDead()){
    if (!s.isFreeze()){
      s.changePos(20, "L");
      s.changeSpeed(1, "L");
    }
	}

	// Up
	if (keyCode == 38 && !s.isDead()){
    if (!s.isFreeze()){
      s.changePos(20, "U");
      s.changeSpeed(2, "U");
    }
	}

  // Down
  if (keyCode == 40 && !s.isDead()){
    if (!s.isFreeze()){
      s.changePos(20, "D");
      s.changeSpeed(2, "D");
    }
  }

  if (keyCode == 87 && !s.isDead()){
    has_wind = ~ has_wind;
  }
}
