function render(){
  background(0);
  fill(255);
  noStroke();
  drawForeground();
  // fill(0, 0, 0, 32);
  // for (var i = 0; i < 22; i++){
  //   triangle(random(-600 + sin(frameCount * 0.3) * 65, windowWidth + 600 + sin(frameCount * 0.5) * 95), random(-600 + sin(frameCount * 1) * 140, windowHeight + 600 + sin(frameCount * 0.4) * 600),random(-600 + sin(frameCount * 0.5) * 44, windowWidth + 600 + sin(frameCount * 1.2) * 80), random(-600 + cos(frameCount * 1.2) * 50, windowHeight + 600 + sin(frameCount * 0.9) * 70),random(-600 + cos(frameCount * 1.2) * 120, windowWidth + 600 + sin(frameCount * 1.125) * 40), random(-600 + sin(frameCount * 1.22) * 65, windowHeight + 600 + cos(frameCount * 0.95) * 120))
  // }
  drawUI();
}

function drawForeground(){
  doLayerTransform(1);
  entitiesToDraw = [];
  
  //add every global entity to the entitiesToDraw array
  for (var g = 0; g < globalEntities.length; g++){
    entitiesToDraw.push(globalEntities[g]);
    globalEntities[g].updatedThisFrame = false;
  }
  //go through all the chunks and add the entities in them to the entitiesToDraw array
  for (x = max(0, getChunkYof(cam.x) - floor(windowChunkWidth / 2) - 1); x <= min(chunks.length - 1, getChunkYof(cam.x) + floor(windowChunkWidth / 2) + 1); x++){
    for (y = max(0, getChunkXof(cam.y) - floor(windowChunkHeight / 2) - 1); y <= min(chunks[0].length - 1, getChunkXof(cam.y) + floor(windowChunkHeight / 2) + 1); y++){
      chunks[x][y].draw();
    }
  }
  //sort every entity by their z value, so the ones with the higher z values are drawn on top
  entitiesToDraw.sort((a, b) => (a.z > b.z) ? 1 : -1);
  //draw the entities
  for (e = 0; e < entitiesToDraw.length; e++){
    entitiesToDraw[e].draw();
  }
  pop();
}