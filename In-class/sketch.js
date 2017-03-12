var particles = [];


function setup() {
  createCanvas(800, 500);
  background(0);

  // particles.push(new Particle(100, height / 2, random(1, 15))); // (x,y,mass)
  // particles.push(new Particle(700, height / 2, random(1, 15))); // (x,y,mass)
  // particles[0].vel.x = random(1,5);
  // particles[1].vel.x = -random(1,5);

  for (var i = 0; i < 5; i++){
    particles.push(new Particle(random(width), random(height), random(1,10), i, 0));
  }
}


function draw() {
  background(0);

  for (var a = 0; a < particles.length; a++) {
    for (var b = 0; b < particles.length; b++){
      if (b != a){
        particles[a].applyAttraction(particles[b]);
        particles[a].checkCollision(particles[b]);
      }
    }

    // check the collision!

    particles[a].update();
    particles[a].checkEdges();
    particles[a].display();
  }
}
