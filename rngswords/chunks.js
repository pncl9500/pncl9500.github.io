class Chunk{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.collidableEntities = [];
    this.noncollidableEntities = [];
    this.updatedBefore = false;
  }
  drawDebug(){
    rectMode(CORNER);
    stroke(255,255,255);
    strokeWeight(2);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    rectMode(CENTER);
    for (var e = 0; e < this.collidableEntities.length; e++){
      this.collidableEntities[e].drawDebug();
    }
    for (var e = 0; e < this.noncollidableEntities.length; e++){
      this.noncollidableEntities[e].drawDebug();
    }
  }
  draw(){
    for (var e = 0; e < this.collidableEntities.length; e++){
      entitiesToDraw.push(this.collidableEntities[e]);
      this.collidableEntities[e].updatedThisFrame = false;
    }
    for (var e = 0; e < this.noncollidableEntities.length; e++){
      entitiesToDraw.push(this.noncollidableEntities[e]);
      this.noncollidableEntities[e].updatedThisFrame = false;
    }
  }
  populate(){

  }
  update(){
    if (!this.updatedBefore){
      this.updatedBefore = true;
      this.populate();
    }
    //move collidable entities
    for (var e = 0; e < this.collidableEntities.length; e++){
      if (this.collidableEntities[e].dead){
        this.collidableEntities[e].doDeathEffect();
        this.collidableEntities.splice(e, 1);
        e -= 1;
      } else {
        this.collidableEntities[e].update();
        //after moving the enemy, it might be in a different Chunk, so we have to move it to that Chunk
        if (this.collidableEntities[e].currentChunkX !== this.collidableEntities[e].oldChunkX || this.collidableEntities[e].currentChunkY !== this.collidableEntities[e].oldChunkY){
          //add to new Chunk's array
          chunks[this.collidableEntities[e].currentChunkX][this.collidableEntities[e].currentChunkY].collidableEntities.push(this.collidableEntities[e]);
          //update the enemy's old Chunk with the current Chunk. This has to happen while it still exists in the array, so there's another copy up here
          this.collidableEntities[e].oldChunkX = this.collidableEntities[e].currentChunkX;
          this.collidableEntities[e].oldChunkY = this.collidableEntities[e].currentChunkY;
          //remove from old Chunk's array
          this.collidableEntities.splice(e, 1);
          e -= 1;
        } else {
          //update the enemy's old Chunk with the current Chunk
          this.collidableEntities[e].oldChunkX = this.collidableEntities[e].currentChunkX;
          this.collidableEntities[e].oldChunkY = this.collidableEntities[e].currentChunkY;
        }
      }
    }
    //move noncollidable entities
    for (var e = 0; e < this.noncollidableEntities.length; e++){
      if (this.noncollidableEntities[e].dead){
        this.noncollidableEntities[e].doDeathEffect();
        this.noncollidableEntities.splice(e, 1);
        e -= 1;
      } else {
        this.noncollidableEntities[e].update();
        //after moving the enemy, it might be in a different Chunk, so we have to move it to that Chunk
        if (this.noncollidableEntities[e].currentChunkX !== this.noncollidableEntities[e].oldChunkX || this.noncollidableEntities[e].currentChunkY !== this.noncollidableEntities[e].oldChunkY){
          //add to new Chunk's array
          chunks[this.noncollidableEntities[e].currentChunkX][this.noncollidableEntities[e].currentChunkY].noncollidableEntities.push(this.noncollidableEntities[e]);
          //update the enemy's old Chunk with the current Chunk. This has to happen while it still exists in the array, so there's another copy up here
          this.noncollidableEntities[e].oldChunkX = this.noncollidableEntities[e].currentChunkX;
          this.noncollidableEntities[e].oldChunkY = this.noncollidableEntities[e].currentChunkY;
          //remove from old Chunk's array
          this.noncollidableEntities.splice(e, 1);
          e -= 1;
        } else {
          //update the enemy's old Chunk with the current Chunk
          this.noncollidableEntities[e].oldChunkX = this.noncollidableEntities[e].currentChunkX;
          this.noncollidableEntities[e].oldChunkY = this.noncollidableEntities[e].currentChunkY;
        }
      }
    }
  }
}

chunks = [];
chunkWidth = 512;
chunkHeight = 512;

worldWidth = 64;
worldHeight = 64;

function createChunks(w, h){
  for (var x = 0; x < w; x++){
    row = [];
    for (var y = 0; y < h; y++){
      row.push(new Chunk(x * chunkWidth, y * chunkHeight, chunkWidth, chunkHeight));
    }
    chunks.push(row);
  }
}

/**
 * @param {number} x Any x coordinate.
 * @returns {number} The x coordinate of whichever chunk the input coordinate falls into. Coordinates outside the map's boundaries are constrained to the boundaries.
 */
 function getChunkXof(x){
  return max(0,min(floor(x/chunkWidth), chunks.length - 1));
}

/**
 * @param {number} y Any y coordinate.
 * @returns {number} The y coordinate of whichever chunk the input coordinate falls into. Coordinates outside the map's boundaries are constrained to the boundaries.
 */
function getChunkYof(y){
  return max(0,min(floor(y/chunkHeight), chunks[0].length - 1));
}


function getWindowChunkDimensions(){
  windowChunkWidth = ceil(windowWidth/canvasScale/chunkWidth);
  windowChunkHeight = ceil(windowHeight/canvasScale/chunkHeight);
}

