

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




cam = {
  x: 0,
  y: 0,
  offsetX: 640,
  offsetY: 360,
  smoothing: 10,
  zoom: 1,

  shakeX: 0,
  shakeY: 0,
}



crosshair = {
  x: 0,
  y: 0,
  r: 255,
  g: 80,
  b: 30,
  w: 5,
  h: 5,
  textOffsetX: -2,
  textOffsetY: -24,
  spaceInBetweenText: 4,
}

function detect2BoxesCollision(rect1, rect2){
  return (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y);
}

function preload(){
  loadItems();
}

function setup(){
  document.addEventListener('contextmenu', event => event.preventDefault());
  noCursor();
  createCanvas(windowWidth, windowHeight);

  generateMap();
}

function draw(){
  
  canvasScale = windowWidth/640;

  scale(canvasScale);


  background(0,0,0);


  noStroke();

  movePlayer();

  


  cam.zoom = 1 + (abs(player.xv) + abs(player.yv))/20
  
  cam.x += (player.x - cam.x + player.w/2 + crosshair.x) / cam.smoothing;
  cam.y += (player.y - cam.y + player.h/2 + crosshair.y) / cam.smoothing;

  cam.shakeX /= 2;
  cam.shakeY /= 2;

  cam.x += random(cam.shakeX * -1, cam.shakeX);
  cam.y += random(cam.shakeY * -1, cam.shakeY);


  player.xv *= player.friction;
  player.yv *= player.friction;

  

  drawMap();
  drawMapDivisions();
  drawWalls();
  drawMapOutline();
  drawPlayer();
  drawInventoryBoxes();
  drawMousePointer();
  drawMousePointerText();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fullscreen(true);
}


function keyPressed(){
  if (keyCode === 9){
    toggleInventoryDisplay();
  }
}

function mouseReleased(){
  if (player.hoveredInventorySlot !== false){
    if (itemData[player.inventory[player.hoveredInventorySlot]].effectOnLeftClick === "equip"){
      player.selectedInventorySlot = player.hoveredInventorySlot;
    }
  }
}