function setup(){
  createCanvas(600, 600);

}

function draw(){
  background(0)

  var vector1 = createVector(width/2, height/2);
  var vector2 = createVector(mouseX, mouseY);

  var newVector = p5.Vector.sub(vector2, vector1);
  //console.log( newVector.mag());

  ellipse(vector1.x, vector1.y, 10, 10);
  ellipse(vector2.x, vector2.y, 10, 10);

  translate(width/2, height/2);
  stroke(255);
  line(0, 0, newVector.x, newVector.y);
}
