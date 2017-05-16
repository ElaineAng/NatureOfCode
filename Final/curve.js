"use strict";
/*
 * N: 4 control points, an area for movement
 * Y: 3 control points, 1 point for location, an area for movement
 * U: 4 control points, an area for movement
 */
class Curve{
  constructor(ctrl_pts, pos, letter){
    this.ap = [];       // stands for all_points
    this.pos = pos;     // position for this curve
    this.np = ctrl_pts.length;      // #points
    this.letter = letter;
    if (ctrl_pts){
      for (var i=0; i<this.np; i++){
        var p = ctrl_pts[i];
        this.ap.push(p.copy());
      }
    }
    this.cur_point;
    this.under_control = 0;
  }

  normalMode(){
    stroke(0, 77, 102);
    strokeWeight(1);
  }

  controlMode(){
    stroke(0, 0, 102);
    strokeWeight(0.5);
    noFill();
  }
  display(){

    if (this.letter == "N"){
      this.normalMode();
      for (var i=0; i<this.ap.length-1; i++){
        this.fill(this.ap[i], this.ap[i+1], 20);
      }
      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length; i++){
          ellipse(this.ap[i].x, this.ap[i].y, 5, 5);
        }
      }
    } else if (this.letter == "Y"){
      this.normalMode();
      this.fill(this.ap[0], this.ap[3], 20);
      this.fill(this.ap[1], this.ap[3], 20);
      this.fill(this.ap[3], this.ap[2], 20);

      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length-1; i++){
          ellipse(this.ap[i].x, this.ap[i].y, 5, 5);
        }
      }
    } else if (this.letter == "U"){
      this.normalMode();
      var steps = 20;
      var bp = [];
      for (var i=0; i<=steps; i++){
        var t = i/steps;
        var x = bezierPoint(this.ap[0].x, this.ap[1].x, this.ap[2].x, this.ap[3].x, t);
        var y = bezierPoint(this.ap[0].y, this.ap[1].y, this.ap[2].y, this.ap[3].y, t);
        bp.push(createVector(x,y));
      }
      for (var i=0; i<bp.length-1; i++){
        this.fill(bp[i], bp[i+1], 5);
      }
      // bezier(this.ap[0].x, this.ap[0].y, this.ap[1].x, this.ap[1].y,
        // this.ap[2].x, this.ap[2].y, this.ap[3].x, this.ap[3].y);

      if (this.under_control){
        this.controlMode();
        line(this.ap[0].x, this.ap[0].y, this.ap[1].x, this.ap[1].y);
        line(this.ap[2].x, this.ap[2].y, this.ap[3].x, this.ap[3].y);
        for (var i=0; i<this.ap.length; i++){
          ellipse(this.ap[i].x, this.ap[i].y, 5, 5);
        }
      }
    }
  }

  update(){
    if (this.under_control){

    }
  }

  fill(p1, p2, steps){
    // line(p1.x, p1.y, p2.x, p2.y);
    var dirVec = p5.Vector.sub(p2, p1);
    var r = dirVec.mag() / (2 * steps);
    push()
    // fill(random(150, 250), random(150, 250), random(150, 250));
    translate(p1.x, p1.y);
    rotate(dirVec.heading());
    for (var j=0; j<steps; j++){
      var cx = r*(2*j+1);
      // line(cx, 0, cx*1.2, -5);
      // line(cx, 0, cx*1.2, 5);
      ellipse(cx, 5*noise(cx, sin(cx)), 5, 5);
      // triangle()
    }
    pop()
  }
}
