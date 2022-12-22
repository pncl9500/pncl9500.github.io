/**
 * Called every frame before drawing.
 * @constructor
 */
function tick(){
  //Update all global entities.
  for (var g = 0; g < globalEntities.length; g++){
    globalEntities[g].update();
  }
  //Update all chunks.
  updateChunks();
}