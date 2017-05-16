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
    stroke(153, 153, 255);
    strokeWeight(20);
  }

  controlMode(){
    stroke(0);
    strokeWeight(1);
    noFill();
  }
  display(){

    if (this.letter == "N"){
      this.normalMode();
      for (var i=0; i<this.ap.length-1; i++){
        line(this.ap[i].x, this.ap[i].y, this.ap[i+1].x, this.ap[i+1].y);
      }
      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length; i++){
          ellipse(this.ap[i].x, this.ap[i].y, 5, 5);
        }
      }
    } else if (this.letter == "Y"){
      this.normalMode();
      line(this.ap[0].x, this.ap[0].y, this.ap[3].x, this.ap[3].y);
      line(this.ap[1].x, this.ap[1].y, this.ap[3].x, this.ap[3].y);
      line(this.ap[3].x, this.ap[3].y, this.ap[2].x, this.ap[2].y);
      if (this.under_control){
        this.controlMode();
        for (var i=0; i<this.ap.length-1; i++){
          ellipse(this.ap[i].x, this.ap[i].y, 5, 5);
        }
      }
    } else if (this.letter == "U"){
      this.normalMode();
      bezier(this.ap[0].x, this.ap[0].y, this.ap[1].x, this.ap[1].y,
        this.ap[2].x, this.ap[2].y, this.ap[3].x, this.ap[3].y);

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
}
