
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