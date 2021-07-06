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
  }

  draw(){
    fill(this.pal.r, this.pal.g, this.pal.b)
    rect(this.x - cam.x + cam.offsetX,this.y - cam.y + cam.offsetY,this.w, this.h);
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
      if (tiles[h][w] === 1){
        walls.push(new Wall(w*gameMap.w/gameMap.xDivisions, h*gameMap.h/gameMap.yDivisions,gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions,{r: 125, g: 125, b: 125}, 5, 100, 0.5));
      }
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
    leniency += 5;
    playerStuckInBox = false;
    for (b = 0; b < walls.length; b++){
      if (detect2BoxesCollision(player,walls[b])){
        playerStuckInBox = true;
      }
    }
  }
}

function generateMap(){
  for (h = 0; h < gameMap.yDivisions; h++){
    column = []
    for (w = 0; w < gameMap.xDivisions; w++){
      column.push(floor(random(0,3)))
    }
    tiles.push(column);
  }

  makeWalls();
  repositionPlayer();
}



