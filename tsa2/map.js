class Wall{
  constructor(x, y, w, h, pal, hardness, health, bounciness, spawnsOnDestruction, spawnsOffsetX, spawnsOffsetY, spawnMagnification, loot, chestSpawnsOnDestruction){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pal = pal;
    this.hardness = hardness;
    this.health = health;
    this.bounciness = bounciness;
    this.offsetX = 0;
    this.offsetY = 0;

    this.spawnsOffsetX = 0;
    this.spawnsOffsetY = 0;

    this.spawnsOnDestruction = [];
    this.spawnMagnification = 1;
    if (typeof(spawnsOnDestruction) != "undefined"){
      this.spawnMagnification = spawnMagnification;
      this.spawnsOnDestruction = spawnsOnDestruction;
      this.spawnsOffsetX = spawnsOffsetX;
      this.spawnsOffsetY = spawnsOffsetY;
    }

    this.loot = [];
    if (typeof(loot) != "undefined"){
      this.loot = loot;
    }

    this.chestSpawnsOnDestruction = [];
    if (typeof(chestSpawnsOnDestruction) != "undefined"){
      this.chestSpawnsOnDestruction = chestSpawnsOnDestruction;
    }
  }

  draw(){
    this.offsetX /= 1.5;
    this.offsetY /= 1.5;
    fill(this.pal.r, this.pal.g, this.pal.b)
    rect(this.x - cam.x + cam.offsetX + this.offsetX,this.y - cam.y + cam.offsetY + this.offsetY,this.w, this.h);
  }
  doDamageAnimation(){
    this.offsetX = random(-2,2);
    this.offsetY = random(-2,2);
  }

  spawnEnemiesOnDeath(){
    for (this.s = 0; this.s < this.spawnsOnDestruction.length; this.s++){
      enemyFragmentQueue.push(new Enemy(this.spawnsOnDestruction[this.s], this.x + random(this.spawnsOffsetX * -1,this.spawnsOffsetX) + this.w/2, this.y + random(this.spawnsOffsetY * -1,this.spawnsOffsetY) + this.h/2, this.spawnMagnification, false));
    }
  }

  spawnLootOnDeath(){
    for (l = 0; l < this.loot.length; l++){
      pickups.push(new Pickup(this.loot[l],this.x + this.w/2, this.y + this.h/2));
    }
  }

  spawnChestsOnDeath(){
    for (c = 0; c < this.chestSpawnsOnDestruction.length; c++){
      chests.push(new Chest(this.chestSpawnsOnDestruction[c], this.x + this.w/2 - 16, this.y + this.h/2 - 8));
    }
  }
}


walls = [
  
]

gameMap = {
  x: 0,
  y: 0,
  w: 3072,
  h: 3072,

  r: 255,
  g: 255,
  b: 255,

  liner: 240,
  lineg: 240,
  lineb: 240,

  xDivisions: 24,
  yDivisions: 24,

}

tiles = []

function makeWalls(){
  for (h = 0; h < tiles.length; h++){
    for (w = 0; w < tiles[h].length; w++){
      switch (tiles[h][w]) {
        case 0:
          //empty space (normal enemy spawner)
          spawners.push(new Spawner(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions));
          break;
        case 1:
          //normal stone
          walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 125, g: 125, b: 125}, 5, 250, 0.5));
          break;
        case 2:
          //hard stone
          walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 50, g: 50, b: 60}, 10, 1000, 0.2));
          break;
        case 3:
          //geode boss spawner
          walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 100, g: 90, b: 120}, 1, 20, 0.3, ["geode_1"], 0, 0, 1));
          break;
        case 4:
          //nest
          walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 130, g: 130, b: 120}, 1, 10, 0.7, ["yellow","yellow","yellow","yellow","yellow","yellow","yellow","yellow"], 50, 50, 1, [], ["normal"]));
          break;
        case 5:
          //softer stone inside the geode struture
          walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 175, g: 175, b: 185}, 1, 15, 0.5));
          break;
        default:
          break;
      }
    }
  }
}

function removeSpawnersNearPlayer(){
  for (g = 0; g < spawners.length; g++){
    if (detect2BoxesCollision(player, spawners[g])){
      spawners.splice(g, 1)
      g -= 1;
    }
  }
}

function repositionPlayer(){
  leniency = 0;
  centerOfMap = {
    x: gameMap.w/2 - player.w/2 + gameMap.x,
    y: gameMap.h/2 - player.h/2 + gameMap.y
  }

  playerStuckInBox = true;

  while (playerStuckInBox) {
    player.x = random(centerOfMap.x + leniency * -1,centerOfMap.x + leniency)
    player.y = random(centerOfMap.y + leniency * -1,centerOfMap.y + leniency)
    removeSpawnersNearPlayer();
    leniency += 5;
    playerStuckInBox = false;
    for (b = 0; b < walls.length; b++){
      if (detect2BoxesCollision(player,walls[b])){
        playerStuckInBox = true;
      }
    }
  }
  removeSpawnersNearPlayer();
}

function generateMap(){
  for (h = 0; h < gameMap.yDivisions; h++){
    column = []
    for (w = 0; w < gameMap.xDivisions; w++){
      column.push(0)
    }
    tiles.push(column);
  }

  //145 tiles will have 5 hardness
  for (i = 0; i < 145; i++){
    tilesOverlapping = true;
    while (tilesOverlapping === true){
      tileXpos = floor(random(0,gameMap.xDivisions));
      tileYpos = floor(random(0,gameMap.yDivisions));
      if (tiles[tileXpos][tileYpos] === 1){
        tilesOverlapping = true;
      } else {
        tilesOverlapping = false;
        tiles[tileXpos][tileYpos] = 1;
      }
    }
  }


  //10 tiles will have 10 hardness and be darker
  for (i = 0; i < 10; i++){
    tilesOverlapping = true;
    while (tilesOverlapping === true){
      tileXpos = floor(random(0,gameMap.xDivisions));
      tileYpos = floor(random(0,gameMap.yDivisions));
      if (tiles[tileXpos][tileYpos] >= 1){
        tilesOverlapping = true;
      } else {
        tilesOverlapping = false;
        tiles[tileXpos][tileYpos] = 2;
      }
    }
  }

  //1 tile will have 1 hardness and spawn the geode boss
    // tilesOverlapping = true;
    // while (tilesOverlapping === true){
    //   tileXpos = floor(random(0,gameMap.xDivisions));
    //   tileYpos = floor(random(0,gameMap.yDivisions));
    //   if (tiles[tileXpos][tileYpos] >= 1){
    //     tilesOverlapping = true;
    //   } else {
    //     tilesOverlapping = false;
    //     tiles[tileXpos][tileYpos] = 3;
    //   }
    // }

  //5 tiles will have 1 hardness and spawn yellow enemies
  for (i = 0; i < 5; i++){
    tilesOverlapping = true;
    while (tilesOverlapping === true){
      tileXpos = floor(random(0,gameMap.xDivisions));
      tileYpos = floor(random(0,gameMap.yDivisions));
      if (tiles[tileXpos][tileYpos] === 1){
        tilesOverlapping = true;
      } else {
        tilesOverlapping = false;
        tiles[tileXpos][tileYpos] = 4;
      }
    }
  }


  //spawn structures
  spawnStructure("donut");
  spawnStructure("donut");
  if (floor(random(0,11)) === 0){
    //10% chance for the among us imposter to appear
    spawnStructure("among");
  }

  spawnStructure("geode");

  makeWalls();
  repositionPlayer();
}

function spawnStructure(structureType){
  structureWidth = structures[structureType].tiles[0].length;
  structureHeight = structures[structureType].tiles.length;

  structureX = floor(random(0,tiles.length - structureWidth));
  structureY = floor(random(0,tiles.length - structureWidth));

  for (x = 0; x < structureWidth; x++){
    for (y = 0; y < structureHeight; y++){
      tiles[x + structureX][y + structureY] = structures[structureType].tiles[x][y];
    }
  }
}


