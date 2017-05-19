"use strict";
/*
 * N, Y, U, S: 4 control points
 * H: 6 control points
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
    this.under_control = false;
  }

  normalMode(){
    stroke(0, 77, 102);
    strokeWeight(1);
  }

  controlMode(){
    stroke(0);
    strokeWeight(1);
    noFill();
  }

  drawControlPoints(p){
    rect(p.x-2, p.y-2, 5, 5);
  }

  display(){

    if (this.letter == "N"){
      this.normalMode();
      for (var i=0; i<this.ap.length-1; i++){
        this.fillPattern(this.ap[i], this.ap[i+1], STEPS);
      }
      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length; i++){
          this.drawControlPoints(this.ap[i]);
        }
      }
    } else if (this.letter == "Y"){
      this.normalMode();
      this.fillPattern(this.ap[0], this.ap[3], STEPS);
      this.fillPattern(this.ap[1], this.ap[3], STEPS);
      this.fillPattern(this.ap[3], this.ap[2], STEPS);

      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length; i++){
          this.drawControlPoints(this.ap[i]);
        }
      }
    } else if (this.letter == "U" || this.letter == "S"){
      this.normalMode();
      var bp = [];
      for (var i=0; i<=STEPS; i++){
        var t = i/STEPS;
        var x = bezierPoint(this.ap[0].x, this.ap[1].x, this.ap[2].x, this.ap[3].x, t);
        var y = bezierPoint(this.ap[0].y, this.ap[1].y, this.ap[2].y, this.ap[3].y, t);
        bp.push(createVector(x,y));
      }
      for (var i=0; i<bp.length-1; i++){
        this.fillPattern(bp[i], bp[i+1], 5);
      }
      // bezier(this.ap[0].x, this.ap[0].y, this.ap[1].x, this.ap[1].y,
        // this.ap[2].x, this.ap[2].y, this.ap[3].x, this.ap[3].y);

      if (this.under_control){
        this.controlMode();
        line(this.ap[0].x, this.ap[0].y, this.ap[1].x, this.ap[1].y);
        line(this.ap[2].x, this.ap[2].y, this.ap[3].x, this.ap[3].y);
        for (var i=0; i<this.ap.length; i++){
          this.drawControlPoints(this.ap[i]);
        }
      }
    } else if (this.letter == "H"){
      this.normalMode();
      this.fillPattern(this.ap[0], this.ap[1], STEPS);
      this.fillPattern(this.ap[1], this.ap[2], STEPS);
      this.fillPattern(this.ap[3], this.ap[4], STEPS);
      this.fillPattern(this.ap[4], this.ap[5], STEPS);
      this.fillPattern(this.ap[1], this.ap[4], STEPS);
      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length; i++){
          this.drawControlPoints(this.ap[i]);
        }
      }
    }
  }

  fillPattern(p1, p2, steps){
    // line(p1.x, p1.y, p2.x, p2.y);
    var dirVec = p5.Vector.sub(p2, p1);
    var r = dirVec.mag() / (2 * steps);
    push()

    translate(p1.x, p1.y);
    rotate(dirVec.heading());
    for (var j=0; j<steps; j++){
      var cx = r*(2*j+1);

      fill('rgba(87, 6, 140 ,0.5)');
      noStroke();
      ellipse(cx, sin(cx), 20, 2*r);
    }
    pop()
  }
}
