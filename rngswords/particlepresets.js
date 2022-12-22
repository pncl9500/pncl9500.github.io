function makeParticleExplosion(x, y, meatiness){
  for (var i = 0; i < meatiness; i++){
    var fric = random(0.85, 0.9)
    var val = random(25,90)
    var smokeSize = random(24,64);
    sortEntitiesInChunks([new CircleParticle(x, y, smokeSize, smokeSize, 0, 11, 128, {r: val, g: val, b: val}, random(-13, 13), random(-13,13), fric, fric, 0, 0, 2, 2, 0.98, 0.98, 0, 0, 255, random(-2, -8), 0, 1, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: 0})]);
    var smokeSize = random(24,64);
    sortEntitiesInChunks([new CircleParticle(x, y, smokeSize, smokeSize, 0, 11, 128, {r: val, g: val, b: val}, random(-13, 13), random(-13,13), fric, fric, 0, 0, 2, 2, 0.98, 0.98, 0, 0, 255, random(-2, -8), 0, 1, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: 0})]);
  }
  makeParticleFirespark(x, y, meatiness);
}

function makeParticleFirespark(x, y, meatiness){
  for (var i = 0; i < meatiness; i++){
    var fric = random(0.9, 0.99)
    sortEntitiesInChunks([new TrailParticle(x, y, 16, 1, 12, random(24,48), {r: 60, g: random(0,30), b: 0}, random(-12, 12), random(-12, 12), fric, fric, 0, 0, 0, 1, 0, 255, -8, 0, 1, {r: 0, g: 0, b: 0}, {r: 0, g: 1, b: 0}, {r: 0, g: -0.08, b: 0}, -2, true)]);
    sortEntitiesInChunks([new TrailParticle(x, y, 8, 16, 12, random(24,48), {r: 60, g: random(0,30), b: 0}, random(-12, 12), random(-12, 12), fric, fric, 0, 0, 0, 1, 0, 255, -8, 0, 1, {r: 0, g: 0, b: 0}, {r: 0, g: 1, b: 0}, {r: 0, g: -0.08, b: 0}, 2, true)]);
  }
}

function makeParticleRectangularBloodExplosion(x, y, w, h, meatinessMultiplier){
  // fric = 1;
  // meatiness = ceil(w * h * meatinessMultiplier);
  // for (var i = 0; i < meatiness; i++){
  //   sortEntitiesInChunks([new TrailParticle(x + random(-w * 0.5, w * 0.5), y + random(-h * 0.5, h * 0.5), 16, 16, 250, 24, {r: random(125,255), g: 0, b: 0}, random(-5, 5), random(3, -12), 1, 1, 0, 0.6, 0, 1, 0, 255, 0, 0, 1, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: 0}, 1, false)]);
  // }
}