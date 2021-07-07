class Wall{
  constructor(x, y, w, h, pal, hardness, health, bounciness, spawnsOnDestruction, spawnsOffsetX, spawnsOffsetY, spawnMagnification){
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
      if (tiles[h][w] === 0){
        spawners.push(new Spawner(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions));
      }
      if (tiles[h][w] === 1){
        walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 125, g: 125, b: 125}, 5, 250, 0.5));
      }
      if (tiles[h][w] === 2){
        walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 50, g: 50, b: 60}, 10, 1000, 0.2));
      }
      if (tiles[h][w] === 3){
        walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 100, g: 90, b: 120}, 1, 20, 0.3, ["geode_1"], 0, 0, 1));
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

  //150 tiles will have 5 hardness
  for (i = 0; i < 150; i++){
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
    tilesOverlapping = true;
    while (tilesOverlapping === true){
      tileXpos = floor(random(0,gameMap.xDivisions));
      tileYpos = floor(random(0,gameMap.yDivisions));
      if (tiles[tileXpos][tileYpos] >= 1){
        tilesOverlapping = true;
      } else {
        tilesOverlapping = false;
        tiles[tileXpos][tileYpos] = 3;
      }
    }

  makeWalls();
  repositionPlayer();
}



