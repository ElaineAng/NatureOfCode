"use strict";

class Spring{
  constructor(x, y, len){
    this.anchor = createVector(x, y);
    this.len = len;

    this.k = 0.2;
  }

  display(b){
    push();
    translate(this.anchor.x, this.anchor.y);
    stroke(255);
    strokeWeight(2);
    var vec = p5.Vector.sub(b.pos, this.anchor);
    var length = vec.mag() - b.rad;
    var top = vec.copy().setMag(CONN_LEN);
    var bottom = vec.copy().setMag(length-CONN_LEN);

    var temp_a_len = (length - 2 * CONN_LEN) / SECTION / 2;
    var temp_a_vec = vec.copy().setMag(temp_a_len+CONN_LEN);

    var temp_b_len = Math.sqrt(SEC_LEN*SEC_LEN-temp_a_len*temp_a_len);
    var temp_b_vec = temp_a_vec.copy().rotate(PI/2).setMag(temp_b_len);
    line(0, 0, top.x, top.y);
    var temp_vec_last = top.copy();
    for (var i=0; i<SECTION; i++){
      var temp_vec = p5.Vector.add(temp_a_vec.setMag(temp_a_len*(2*i+1)+CONN_LEN),
      temp_b_vec.mult(-1));
      line(temp_vec_last.x, temp_vec_last.y, temp_vec.x, temp_vec.y);
      temp_vec_last = temp_vec.copy();
    }
    line(temp_vec.x, temp_vec.y, bottom.x, bottom.y);
    line(bottom.x, bottom.y, vec.x, vec.y);

    pop();
  }

  connect(b){
    var vector = p5.Vector.sub(b.pos, this.anchor);
    var distance = vector.mag();
    var direction = vector.copy().normalize();

    //force
    var stretch = distance - this.len;
    var force = direction.copy();

    // hooke's law
    force.mult(-1 * this.k * stretch);
    b.applyForce(force);
  }
}
