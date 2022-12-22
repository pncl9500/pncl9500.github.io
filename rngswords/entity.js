class Entity{
  /**
  * @constructor A thing that moves maybe and interacts with other stuff
  * @param {number} x - X position of entity
  * @param {number} y - Y position of entity
  * @param {number} w - Width of the entity (unrelated to bounding box)
  * @param {number} h - Width of the entity (unrelated to bounding box)
  * @param {number} d - Rotation of entity in degrees
  * @param {Array} hboxWrappers - An array of hitboxwrappers that contain the hitboxes of the thing
  * @param {Hitbox} boundingbox - A hitbox that surrounds the entire entity
  */
  constructor(x, y, w, h, d, hboxWrappers, boundingbox, z, tags = []){
    //whether the entity should be sorted into the collidable entity array or the noncollidable entity array.
    //collidable entities are gotten by getColliders() while noncollidable entities are not.
    this.collidable = true;
    //whether the entity should be saved to the map file
    this.saved = true;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.d = d;
    this.z = z;
    this.tags = tags;
    this.boundingbox = boundingbox;
    //When this is true, the entity will be removed from whatever chunk it is in.
    this.dead = false;
    if (hboxWrappers.length !== undefined){
      this.hboxWrappers = hboxWrappers;
    } else {
      this.hboxWrappers = [hboxWrappers];
    }
    this.updatedThisFrame = false;
    this.currentChunkX = getChunkXof(this.x);
    this.currentChunkY = getChunkYof(this.y);
    //Array of other entities that are colliding with the entity.
    //Calling getColliders() will fill the array with the entities it collides with.
    this.colliders = [];
  }
  /**
  * @constructor Called when the entity dies.
  */
  doDeathEffect(){};
  
  /**
  * @constructor Checks for a collision between two entites
  * @param {Entity} ent - The other entity to check for collision with
  * @returns {boolean} If the entities collided or not
  */
  collidesWith(ent){
    //update the bounding box of both entities in the collision check.
    this.updateBoundingBox();
    ent.updateBoundingBox();
    //if the bounding boxes of the entities don't collide, don't check further
    if (!this.boundingbox.collidesWith(ent.boundingbox)){
      return false;
    }
    //update the other hitboxes of both entities in the collision check.
    this.updateHitboxes();
    ent.updateHitboxes();

    //Check each individual hitbox against the hitboxes of the other entities
    //todo: make this more efficient
    for(var h = 0; h < this.hboxWrappers.length; h++){
      for(var o = 0; o < ent.hboxWrappers.length; o++){
        if (this.hboxWrappers[h].hbox.collidesWith(ent.hboxWrappers[o].hbox)){
          return true;
        }
      }  
    }
    return false;
  }
  /**
  * @constructor - Draws an outline around the entity and outlines around all of its hitboxes and its bounding box.
  */
  drawDebug(){
    //update the hitboxes and bounding box so they are in the accurate positions to be drawn.
    this.updateHitboxes();
    this.updateBoundingBox();
    noFill();
    stroke(255,255,255);
    strokeWeight(2);
    //draw a white line from the entity's center indicating what direction it is facing.
    line(this.x, this.y, this.x + cos(this.d) * 10, this.y + sin(this.d) * 10);
    ellipse(this.x, this.y, 20, 20)
    //draw a white rectangle around the entity. (not dependent on its bounding box, instead dependent on the x/y/w/h values of the entity.)
    rect(this.x, this.y, this.w, this.h);
    //draw the hitboxes of the entity.
    for (var h = 0; h < this.hboxWrappers.length; h++){
      this.hboxWrappers[h].hbox.drawDebug();
    }
    //draw the bounding box of the entity.
    this.boundingbox.drawDebug();
  }
  /**
  * @constructor - Draws a cyan outline around the entity.
  */
  drawSelectedDebug(){
    this.boundingbox.drawSelectedDebug();
  }
  /**
  * @constructor - Draws a green outline around the entity.
  */
   drawHoveredDebug(){
    this.boundingbox.drawHoveredDebug();
  }
  /**
  * @constructor - Moves the bounding box of the entity to the center of the entity.
  */
  updateBoundingBox(){
    this.boundingbox.x = this.x;
    this.boundingbox.y = this.y;
  }
  /**
  * @constructor - Moves the hboxWrappers of the entity to match up with the entity's position and rotation. DOES NOT MOVE THE BOUNDING BOX use updateBoundingBox instead
  */
  updateHitboxes(){
    for (var h = 0; h < this.hboxWrappers.length; h++){
      this.hboxWrappers[h].move(this.x, this.y, this.d);
    }
  }
  /**
  * @constructor - Called every frame.
  */
  update(){
    //Due to how chunks are updated in order, certain entities may update twice. 
    //This check here prevents the entity from moving twice.
    if (this.updatedThisFrame){return;}
    this.updatedThisFrame = true;
    this.doAction();
    //update the entity's chunk position.
    this.currentChunkX = getChunkXof(this.x);
    this.currentChunkY = getChunkYof(this.y);
  }
  /**
  * @constructor - Gets everything that is colliding with an entity, and puts them into the entity's colliders array.
  * @param {String} filter - Causes the check to only get entities that have a certain tag. The String supplied will be the tag. 
  */
  getColliders(filter = false){
    this.colliders = [];
    if (filter === false){
      for (var x = max(this.currentChunkX - 1, 0); x < min(this.currentChunkX + 2, chunks.length); x++){
        for (var y = max(this.currentChunkY - 1, 0); y < min(this.currentChunkY + 2, chunks[0].length); y++){
          for (var e = 0; e < chunks[x][y].collidableEntities.length; e++){
            if (this.collidesWith(chunks[x][y].collidableEntities[e]) && chunks[x][y].collidableEntities[e] !== this){
              this.colliders.push(chunks[x][y].collidableEntities[e]);
            }
          }
        }
      }
      for (var e = 0; e < globalEntities.length; e++){
        if (this.collidesWith(globalEntities[e]) && globalEntities[e] !== this){
          this.colliders.push(globalEntities[e]);
        }
      }
    } else {
      for (var x = max(this.currentChunkX - 1, 0); x < min(this.currentChunkX + 2, chunks.length); x++){
        for (var y = max(this.currentChunkY - 1, 0); y < min(this.currentChunkY + 2, chunks[0].length); y++){
          for (var e = 0; e < chunks[x][y].collidableEntities.length; e++){
            if (chunks[x][y].collidableEntities[e].tags.includes(filter) && this.collidesWith(chunks[x][y].collidableEntities[e]) && chunks[x][y].collidableEntities[e] !== this){
              this.colliders.push(chunks[x][y].collidableEntities[e]);
            }
          }
        }
      }
      for (var e = 0; e < globalEntities.length; e++){
        if (globalEntities[e].tags.includes(filter) && this.collidesWith(globalEntities[e]) && globalEntities[e] !== this){
          this.colliders.push(globalEntities[e]);
        }
      }
    }
  }
  /**
  * @constructor Called once per frame. Essentially another update function for the entity
  */
  doAction(){

  }
  /**
  * @constructor Called once per frame after the entity is updated.
  */
  draw(){
    
  }
  /**
  * @constructor Gets information about the entity to display when its selected in debug mode.
  * @returns {Array} Array of strings based on values of the entity.
  */
   getInfo(){
    var info = [];
    info.push(`classname: ${this.constructor.name}`)
    info.push(this.getPropertyInfo("x", 100));
    info.push(this.getPropertyInfo("y", 100));
    info.push(this.getPropertyInfo("w", 100));
    info.push(this.getPropertyInfo("h", 100));
    info.push(this.getPropertyInfo("d", 100));
    info.push(this.getPropertyInfo("z"));
    info = info.concat(this.getPropertyInfo("tags"));
    return info;
  }
  /**
  * @constructor Gets a string of information about a property of the entity for when its selected in debug mode.
  * @returns {String} Information about a property of the entity
  */
  getPropertyInfo(prop, roundingValue = 0){
    var rnd = roundingValue;
    switch (typeof this[prop]) {
      case "number":
        //dont round numbers if roundingValue is 0
        if (rnd === 0){
          return `${prop}: ${this[prop]}`;
        } else {
          return `${prop}: ${(round(this[prop] * rnd)) / rnd}`;
        }
      case "string":
        //string
        return `${prop}: ${this[prop]}`;
      default:
        //array
        if (this[prop].length !== undefined){
          return [`${prop}:`].concat(this[prop])
        }
        break;
    }
  }
}




/**
 * @param {array} entities The array of entities to put into the array of chunks.
 * @returns {void} Takes an array of entities, and puts them into the array of chunks. Which chunk they are put into depends on position.
 */
function sortEntitiesInChunks(entities){
  for (var w = 0; w < entities.length; w++){
    if (entities[w].collidable){
      chunks[getChunkXof(entities[w].x)][getChunkYof(entities[w].y)].collidableEntities.push(entities[w]);
    } else {
      chunks[getChunkXof(entities[w].x)][getChunkYof(entities[w].y)].noncollidableEntities.push(entities[w]);
    }
  }
}

//The array of entities independent to chunks (always loaded)
globalEntities = [];

//Indiscriminate collider entity.
//Same as normal entities but they collide with noncollidable entities as well as collidable ones
//Just used for the mouse pointer entity in debug mode for now so you can drag around particles and stuff
class IndiscColliderEntity extends Entity{
  constructor(x, y, w, h, d, hboxWrappers, boundingbox, z, tags = []){
    super(x, y, w, h, d, hboxWrappers, boundingbox, z, tags = []);
  }
  getColliders(filter = false){
    this.colliders = [];
    if (filter === false){
      for (var x = max(this.currentChunkX - 1, 0); x < min(this.currentChunkX + 2, chunks.length); x++){
        for (var y = max(this.currentChunkY - 1, 0); y < min(this.currentChunkY + 2, chunks[0].length); y++){
          for (var e = 0; e < chunks[x][y].collidableEntities.length; e++){
            if (this.collidesWith(chunks[x][y].collidableEntities[e]) && chunks[x][y].collidableEntities[e] !== this){
              this.colliders.push(chunks[x][y].collidableEntities[e]);
            }
          }
          for (var e = 0; e < chunks[x][y].noncollidableEntities.length; e++){
            if (this.collidesWith(chunks[x][y].noncollidableEntities[e]) && chunks[x][y].noncollidableEntities[e] !== this){
              this.colliders.push(chunks[x][y].noncollidableEntities[e]);
            }
          }
        }
      }
      for (var e = 0; e < globalEntities.length; e++){
        if (this.collidesWith(globalEntities[e]) && globalEntities[e] !== this){
          this.colliders.push(globalEntities[e]);
        }
      }
    } else {
      for (var x = max(this.currentChunkX - 1, 0); x < min(this.currentChunkX + 2, chunks.length); x++){
        for (var y = max(this.currentChunkY - 1, 0); y < min(this.currentChunkY + 2, chunks[0].length); y++){
          for (var e = 0; e < chunks[x][y].collidableEntities.length; e++){
            if (chunks[x][y].collidableEntities[e].tags.includes(filter) && this.collidesWith(chunks[x][y].collidableEntities[e]) && chunks[x][y].collidableEntities[e] !== this){
              this.colliders.push(chunks[x][y].collidableEntities[e]);
            }
            if (chunks[x][y].noncollidableEntities[e].tags.includes(filter) && this.collidesWith(chunks[x][y].noncollidableEntities[e]) && chunks[x][y].noncollidableEntities[e] !== this){
              this.colliders.push(chunks[x][y].noncollidableEntities[e]);
            }
          }
        }
      }
      for (var e = 0; e < globalEntities.length; e++){
        if (globalEntities[e].tags.includes(filter) && this.collidesWith(globalEntities[e]) && globalEntities[e] !== this){
          this.colliders.push(globalEntities[e]);
        }
      }
    }
  }
}