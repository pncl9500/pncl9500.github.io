

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

player = {
  x: 0,
  y: 0,
  xv: 0,
  yv: 0,
  w: 4,
  h: 4,
  r: 0,
  g: 0,
  b: 0,
  friction: 0.8,
  speed: 0.3,
  inventorySize: 8,
  inventory: [
    "excavator",
    "medkit",
    "key",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  selectedInventorySlot: 0,
  inventoryShown: -1,
}

crosshair = {
  x: 0,
  y: 0,
  r: 255,
  g: 80,
  b: 30,
  w: 5,
  h: 5,
}

function detect2BoxesCollision(rect1, rect2){
  return (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y);
}

function preload(){
  loadImages();
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

  //move player
  if (keyIsDown(87)){
    player.yv -= player.speed;
  }
  if (keyIsDown(83)){
    player.yv += player.speed;
  }
  if (keyIsDown(65)){
    player.xv -= player.speed;
  }
  if (keyIsDown(68)){
    player.xv += player.speed;
  }
  player.x += player.xv;

  //collision with walls (X)
  for (w = 0; w < walls.length; w++){
    if (detect2BoxesCollision(player, walls[w])){
      player.x -= player.xv;
      player.xv *= walls[w].bounciness * -1
      //player.xv = 0;
    }
  }

  player.y += player.yv;

  //collision with walls (Y)
  for (w = 0; w < walls.length; w++){
    if (detect2BoxesCollision(player, walls[w])){
      player.y -= player.yv;
      player.yv *= walls[w].bounciness * -1
      //player.yv = 0;
    }
  }
  

  //collision with map boundaries
  if (player.x < gameMap.x){
    player.xv = 0;
    player.x = gameMap.x;
  }
  if (player.x > gameMap.x + gameMap.w - player.w){
    player.xv = 0;
    player.x = gameMap.x + gameMap.w - player.w;
  }
  if (player.y < gameMap.y){
    player.yv = 0;
    player.y = gameMap.y;
  }
  if (player.y > gameMap.y + gameMap.h - player.h){
    player.yv = 0;
    player.y = gameMap.y + gameMap.h - player.h;
  }

  


  cam.zoom = 1 + (abs(player.xv) + abs(player.yv))/20
  
  cam.x += (player.x - cam.x + player.w/2 + crosshair.x) / cam.smoothing;
  cam.y += (player.y - cam.y + player.h/2 + crosshair.y) / cam.smoothing;

  cam.shakeX /= 2;
  cam.shakeY /= 2;

  cam.x += random(cam.shakeX * -1, cam.shakeX);
  cam.y += random(cam.shakeY * -1, cam.shakeY);


  player.xv *= player.friction;
  player.yv *= player.friction;

  

  //draw map
  fill(gameMap.r,gameMap.g,gameMap.b);
  rect(gameMap.x - cam.x + cam.offsetX, gameMap.y - cam.y + cam.offsetY, gameMap.w, gameMap.h)

  noFill();
  stroke(gameMap.liner,gameMap.lineg,gameMap.lineb);

  for (x = 0; x < gameMap.xDivisions; x++){
    for (y = 0; y < gameMap.yDivisions; y++){
      rect(gameMap.x + (gameMap.w/gameMap.xDivisions) * x - cam.x + cam.offsetX, gameMap.y + (gameMap.h/gameMap.yDivisions) * y - cam.y + cam.offsetY, gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions)
    }
  }


  noStroke();
  //draw walls
  for (w = 0; w < walls.length; w++){
    walls[w].draw();
  }

  //draw big outline around the whole map
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(gameMap.x - cam.x + cam.offsetX, gameMap.y - cam.y + cam.offsetY, gameMap.w, gameMap.h)

  //draw player
  fill(player.r,player.g,player.b);
  rect(player.x - cam.x + cam.offsetX,player.y - cam.y + cam.offsetY,player.w,player.h);

  //draw inventory stuff
  stroke(0,0,0);
  strokeWeight(1);
  noFill();
  for (l = 0; l < inventoryBoxes.length; l++){
    inventoryBoxes[l].draw();
    if (inventoryBoxes[l].timer < 1){
      inventoryBoxes.splice(l,1)
      l -= 1;
    }
  }

  //draw mouse pointer
  crosshair.x = mouseX/canvasScale;
  crosshair.y = mouseY/canvasScale;

  stroke(crosshair.r, crosshair.g, crosshair.b);
  ellipse(crosshair.x, crosshair.y, crosshair.w, crosshair.h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fullscreen(true);
}





inventoryBoxes = [];

class InventoryBox{
  constructor(slot){
    this.slot = slot;
    this.x = player.x + player.w/2;
    this.y = player.y + player.h/2;
    this.targetX = player.x;
    this.targetY = player.y;
    this.size = 0;
    this.targetSize = 16;
    this.smoothing = 10;
    this.offsetY = 40;
    this.gap = 6;
    this.state = "normal";
    this.timer = 10;
    this.padding = 1;
  }

  draw(){
    switch (this.state) {
      case "normal":
        this.centerY = + (player.y + player.h/2 - this.offsetY + player.yv * 3);
        this.centerX = + (player.x + player.w/2 + player.xv * 3);
        this.targetX = this.centerX + this.slot * (this.size + this.gap) - (this.size * (player.inventorySize - 1))/2 - (this.gap * (player.inventorySize - 1))/2;
        this.targetY = this.centerY;
        break;
      case "closing":
        this.timer -= 1;
        this.targetX = player.x + player.w/2;
        this.targetY = player.y + player.h/2;
        this.targetSize = 0;
        this.smoothing = this.smoothing/2 + 1;
      default:
        break;
    }

    this.size += (this.targetSize - this.size) / this.smoothing;
    this.x += (this.targetX - this.x) / this.smoothing;
    this.y += (this.targetY - this.y) / this.smoothing;
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(this.x - this.size/2 - cam.x + cam.offsetX, this.y - this.size/2 - cam.y + cam.offsetY, this.size, this.size);

    //make image
    if (player.inventory[this.slot] != "none"){
      image(itemImages[player.inventory[this.slot]],this.x - this.size/2 - cam.x + cam.offsetX + this.padding, this.y - this.size/2 - cam.y + cam.offsetY + this.padding, this.size - this.padding * 2, this.size - this.padding * 2)
    }
  }
}

function keyPressed(){
  if (keyCode === 9){
    player.inventoryShown *= -1;
    if (player.inventoryShown === 1){
      for (i = 0; i < player.inventorySize; i++){
        inventoryBoxes.push(new InventoryBox(i));
      }
    } else { 
      for (i = 0; i < inventoryBoxes.length; i++){
        inventoryBoxes[i].smoothing *= 8;
        inventoryBoxes[i].state = "closing";
      }
    }
  }
}