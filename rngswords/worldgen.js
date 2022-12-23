function generateMap(){
  //randomSeed(saveFile[2]);
  ents = []
  //256
  for (var i = 0; i < 1024; i++){
    ents.push(new Wall(random(0, 32768), random(0, 32768), random(128, 512), random(128,512), {r: random(16, 255), g: random(16, 255), b: random(16, 255)}))
  }
  //globalEntities.push(new PhysicsEntity(0, 0, 8, 8))
  //sortEntitiesInChunks(ents);
  //globalEntities.push(new PrimitiveLineTrailParticle(0, 0, 0, 50, 80, 99999, 64, 0.9, {r: 255, g: 255, b: 255}, {r: 0, g: 0, b: 0}, {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, {r: 0, g: 0, b: -14}, {r: 1, g: 1, b: 1}, {r: -0.1, g: -0.4, b: 0}))
  //globalEntities.push(new PrimitiveLineTrailParticle(0, 0, 0, 0, 80, 99999, 64, 0.86, {r: 255, g: 255, b: 255}, {r: 0, g: 0, b: 0}, {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, {r: -7, g: -14, b: 0}, {r: 1, g: 1, b: 1}, {r: -0.1, g: -0.6, b: -0.1}, 255, 50, 8))

  globalEntities.push(new PrimitiveLineTrailParticle(0, 0, 0, 0, 80, 99999, 256, random(0.8,0.95), {r: random(0,255), g: random(0,255), b: random(0,255)}, {r: 0, g: 0, b: 0}, {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, {r: random(-8, 6), g: random(-8, 6), b: random(-8, 6)}, {r: 1, g: 1, b: 1}, {r: random(-0.5, 0.2), g: random(-0.5, 0.2), b: random(-0.5, 0.2)}, 255, floor(random(20,80)), floor(random(1,16))))
  if (random(0, 60) < 1){
    globalEntities.push(new PrimitiveLineTrailParticle(0, 0, 0, 0, 80, 99999, 256, random(0.8,0.95), {r: random(0,255) * random(0, 1), g: random(0,255) * random(0, 1), b: random(0,255) * random(0, 1)}, {r: 0, g: 0, b: 0}, {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, {r: random(-8, 6), g: random(-8, 6), b: random(-8, 6)}, {r: 1, g: 1, b: 1}, {r: random(-0.5, 0.2), g: random(-0.5, 0.2), b: random(-0.5, 0.2)}, 255, floor(random(20,80)), floor(random(1,16))))
    while (random(0, 8) < 1){
      globalEntities.push(new PrimitiveLineTrailParticle(0, 0, 0, 0, 80, 99999, 256, random(0.8,0.95), {r: random(0,255) * random(0, 1), g: random(0,255) * random(0, 1), b: random(0,255) * random(0, 1)}, {r: 0, g: 0, b: 0}, {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, {r: random(-8, 6), g: random(-8, 6), b: random(-8, 6)}, {r: random(0,1), g: random(0,1), b: random(0,1)}, {r: random(-0.5, 0.2), g: random(-0.5, 0.2), b: random(-0.5, 0.2)}, 255, floor(random(20,80)), floor(random(1,16))))
    }
  }
}
