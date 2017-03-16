function setup() {
  createCanvas(500, 600);
  background(0);
}


function draw() {
  var resolution = 2;
  for (var y=0; y<height; y+=resolution){
    for (var x=0; x<width; x+=resolution){
      // var freq = (x + y*0.1 + frameCount) * 0.05;
      var freq1 = (frameCount+x) * 0.02;
      var freq2 = (frameCount+y) * 0.01;
      var amp = 1;
      var noiseValue = noise(freq1, freq2) * amp;
      var white = map(noiseValue, 0, 1, 0, 255);

      noStroke();
      fill(white);
      rect(x, y, resolution, resolution);
    }
  }
  //noLoop();
}
