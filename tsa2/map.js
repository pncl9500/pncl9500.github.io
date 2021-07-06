class Wall{
  constructor(x, y, w, h, pal, hardness, health, bounciness){
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
  }

  draw(){
    this.offsetX /= 1.5
    this.offsetY /= 1.5
    fill(this.pal.r, this.pal.g, this.pal.b)
    rect(this.x - cam.x + cam.offsetX + this.offsetX,this.y - cam.y + cam.offsetY + this.offsetY,this.w, this.h);
  }
  doDamageAnimation(){
    this.offsetX = random(-2,2);
    this.offsetY = random(-2,2);
  }
}


walls = [
  
]

gameMap = {
  x: 0,
  y: 0,
  w: 4096,
  h: 4096,

  r: 255,
  g: 255,
  b: 255,

  liner: 240,
  lineg: 240,
  lineb: 240,

  xDivisions: 32,
  yDivisions: 32,

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

  //300 tiles will have 5 hardness
  for (i = 0; i < 300; i++){
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

  //41 tiles will have 10 hardness and be darker
  for (i = 0; i < 41; i++){
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

  makeWalls();
  repositionPlayer();
}



