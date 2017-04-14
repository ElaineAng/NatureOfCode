var bal, spr;


function setup(){
  createCanvas(500, 600);
  bal = new Ball(width/2 + 150, height/2+250);
  spr = new Spring(width/2, height/2, 100);
}

function draw(){
  background(0);
  spr.connect(bal);


  var gravity = createVector(0, 2);
  bal.applyForce(gravity);

  bal.update();
  bal.drag(); 

  spr.display(bal);
  bal.display();
}
