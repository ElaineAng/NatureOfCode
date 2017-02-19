const g = 15;
const WIDTH = 800;
const HEIGHT = 600;
const d = 40;
const r = d/2;
const FR = 50;
const OFFSET_X = 1.5;
const OFFSET_Y = 10;

var myBall;

class Ball {
	constructor(radius, x, y, x_speed, y_speed){
		this.r = radius;
		this.x = x;
		this.y = y;
		this.x_speed = x_speed;
		this.y_speed = y_speed;
		this.freeze = false;
		this.yStop = false;
	}

	draw(){
		ellipse (this.x, this.y, this.r * 2, this.r * 2);
	}

	setRadius(r){
		this.r = r;
	}

	setX(s_x){
		this.x += s_x;
	}

	setY(s_y){
		this.y += s_y;
	}

	setXSpeed(sx){
		this.x_speed = sx;
	}

	setYSpeed(sy){
		this.y_speed = sy;
	}

	isYStop(){
		return this.yStop;
	}

	stopY(){
		this.yStop = true;
		this.setYSpeed(0);
	}

	stopX(){
        if(Math.abs(this.x_speed) > 0.01){
            var tempS = Math.abs(this.x_speed)/this.x_speed;
            this.setXSpeed(this.x_speed - (tempS)*0.01);
        }
        else{
            this.setXSpeed(0);
        }
	}

	reactivate(){
		this.yStop = false;
	}

	isFreeze(){
		return this.freeze;
	}

	changeState(){
		this.freeze = ~ this.freeze;
	}

}

function setup() {
	createCanvas(WIDTH, HEIGHT);
	noStroke();
	frameRate(FR);
  	background(0);
  	myBall = new Ball(r, r, r, 3, 0);
}

function draw() {
	background(0, 0, 0, 150);

	if (!myBall.isFreeze()){

        if (!myBall.isYStop()){
            myBall.setYSpeed(myBall.y_speed + g/FR);
        }
        else {
        	myBall.setYSpeed(0);
        	myBall.stopX();
		}
        myBall.setX(myBall.x_speed);
        myBall.setY(myBall.y_speed);

	}

	myBall.draw();

	// x touch border
  	if (myBall.x >= WIDTH - myBall.r || myBall.x <= myBall.r){
  		myBall.setXSpeed(0 - myBall.x_speed);
  	}

  	// y touch bottom border
  	if (myBall.y >= HEIGHT - myBall.r){

  		if (Math.abs(myBall.y_speed) > 1){
            var tempS = Math.abs(myBall.y_speed)/myBall.y_speed;
            myBall.setYSpeed(0 - tempS * 0.9 * myBall.y_speed);
		}
		else {
            myBall.setYSpeed(-0.9 * myBall.y_speed);
        }

        // OMFG
        if (myBall.y_speed > 0 - g/FR){
            myBall.stopY();
		}
        //console.log(myBall.y_speed);
  	}

	// y touch top border
  	if (myBall.y <= myBall.r){
  		myBall.setYSpeed(0 - myBall.y_speed);
	}
}

function keyPressed(){
	// Whitespace
	if (keyCode == 32){
		myBall.changeState();
	}

	// Right
	if (keyCode == 39){
		myBall.setXSpeed(myBall.x_speed + OFFSET_X);
	}

	// Left
	if (keyCode == 37){
		myBall.setXSpeed(myBall.x_speed - OFFSET_X);
	}

	// Up
	if (keyCode == 38){
		myBall.reactivate();
		myBall.setYSpeed(myBall.y_speed - OFFSET_Y);
	}

	// "a": increase the ball size
	if (keyCode == 65){
		if (myBall.r <= r * 2){
            myBall.setRadius(1.1 * myBall.r);
		}

	}

	// "d": decrease the ball size
	if (keyCode == 68){
		if (myBall.r >= r/2){
            myBall.setRadius(myBall.r / 1.1);
		}
	}
}