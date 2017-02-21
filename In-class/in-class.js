function setup(){
  createCanvas(600, 600);

  var vector1 = createVector(10, 5);
  var vector2 = createVector(2, 3);
  //var newVector = createVector(0, 0);
  var newVector = p5.Vector.add(vector1, vector2)

  // surprise!!!
  // newVector = vector1.add(vector)
  // newVector.x = -5
  // console.log (vector1.x)
  // Yahhhh its -5 ... - -

}

function draw(){
  noLoop();
}
