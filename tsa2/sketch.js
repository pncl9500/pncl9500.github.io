
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

bullets = [];
class Bullet{
  constructor(x, y, direction, properties){
    this.x = x;
    this.y = y;
    this.properties = properties;
    this.v = this.properties.speed;
    this.direction = direction;
    this.deathTimer = 0;
    
  }
  draw(){
    this.deathTimer += 1;
    this.v *= this.properties.friction;
    this.v += this.properties.acceleration;
    this.x += Math.cos(this.direction) * this.v * -1;
    this.y += Math.sin(this.direction) * this.v * -1;

    //collision with walls
    for (w = 0; w < walls.length; w++){
      if (detect2BoxesCollision({
        x: this.x - this.properties.size / 1.5,
        y: this.y - this.properties.size / 1.5,
        w: this.properties.size * 1.5,
        h: this.properties.size * 1.5},walls[w])){
        if (!this.properties.goesThroughTerrain){
          this.deathTimer = this.properties.lifeTime;
        }
        if (this.properties.damagesTerrain && walls[w].hardness <= this.properties.destructionLevel){
          walls[w].health -= this.properties.damageToTerrain;
          walls[w].doDamageAnimation();
        }
      }
    }

    switch (this.properties.visual) {
      case "circle":
        fill(this.properties.pal.r,this.properties.pal.g,this.properties.pal.b);
        noStroke();
        ellipse(this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.properties.size, this.properties.size);
        break;
      default:
        break;
    }
  }

  doDeathEffect(){
    switch (this.properties.effectOnDeath) {
      case "makeWall":
        walls.push(new Wall(this.x - this.properties.size/2, this.y - this.properties.size/2, this.properties.size, this.properties.size,{r: 190, g: 180, b: 175},1,20,0.5))
        console.log(walls)
        break;
      default:
        break;
    }
  }
}

function preload(){
  loadItems();
}

function setup(){
  generateMap();
  document.addEventListener('contextmenu', event => event.preventDefault());
  noCursor();
  createCanvas(windowWidth, windowHeight);
}



function fireSelectedGun(){  
  if (player.firingTick <= 0 && player.hoveredInventorySlot === false){
    player.firingTick = itemData[player.inventory[player.selectedInventorySlot]].fireRate;
    vectorX = (player.x - cam.x + cam.offsetX) - crosshair.x;
    vectorY = (player.y - cam.y + cam.offsetY) - crosshair.y;
    
    inaccuracy = random(itemData[player.inventory[player.selectedInventorySlot]].inaccuracy * -1, itemData[player.inventory[player.selectedInventorySlot]].inaccuracy);

    bullets.push(new Bullet(player.x + player.w/2, player.y + player.h/2, Math.atan2(vectorY, vectorX) + inaccuracy, itemData[player.inventory[player.selectedInventorySlot]].bulletProperties));
    //do recoil
    player.xv += Math.cos(Math.atan2(vectorY, vectorX) + inaccuracy) * itemData[player.inventory[player.selectedInventorySlot]].recoil;
    player.yv += Math.sin(Math.atan2(vectorY, vectorX) + inaccuracy) * itemData[player.inventory[player.selectedInventorySlot]].recoil;
  }
}

function draw(){

  player.firingTick -= 1;

  if (mouseIsPressed){
    if (mouseButton === LEFT){
      if (itemData[player.inventory[player.selectedInventorySlot]].effectOnUse === "shoot" && itemData[player.inventory[player.selectedInventorySlot]].firePattern === "automatic"){
        fireSelectedGun();
      }
    }
  }
  
  canvasScale = windowWidth/640;

  scale(canvasScale);


  background(0,0,0);


  noStroke();

  movePlayer();
  //if the player is on top of a spawner, it activates
  testForPlayerOverSpawner();
  


  cam.zoom = 1 + (abs(player.xv) + abs(player.yv))/20
  
  cam.x += (player.x - cam.x + player.w/2 + crosshair.x) / cam.smoothing;
  cam.y += (player.y - cam.y + player.h/2 + crosshair.y) / cam.smoothing;

  cam.shakeX /= 1.2;
  cam.shakeY /= 1.2;

  cam.x += random(cam.shakeX * -1, cam.shakeX);
  cam.y += random(cam.shakeY * -1, cam.shakeY);



  

  drawMap();
  drawMapDivisions();
  drawBullets();
  drawPlayer();
  drawWalls();
  drawMapOutline();
  drawInventoryBoxes();
  drawMousePointer();
  drawMousePointerText();
  //only for debugging. these are invisible in game
  //drawSpawners();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fullscreen(true);
  if (mouseButton === LEFT){
    if (itemData[player.inventory[player.selectedInventorySlot]].effectOnUse === "shoot" && itemData[player.inventory[player.selectedInventorySlot]].firePattern === "semiautomatic"){
      fireSelectedGun();
    }
  }
}


function keyPressed(){
  if (keyCode === 69 || keyCode === 9){
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