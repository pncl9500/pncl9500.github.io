
cam = {
  x: 0,
  y: 0,
  offsetX: 640,
  offsetY: 360,
  smoothing: 10,
  zoom: 1,

  shakeX: 0,
  shakeY: 0,

  damageShakeMultiplier: 0.2,
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
    this.dead = false;
    
  }
  draw(){
    this.deathTimer += 1;
    this.v *= this.properties.friction;
    this.v += this.properties.acceleration;

    //collides with enemies twice for extra collision juice
    for (i = 0; i < 2; i++){
      this.x += Math.cos(this.direction) * this.v * -0.5;
      this.y += Math.sin(this.direction) * this.v * -0.5;
      //collision with enemies
    //the most recent enemy spawn is the one that is hit first
    for (e = enemies.length - 1; e >= 0; e--){
      if (detect2BoxesCollision({
        x: this.x - this.properties.size / 2,
        y: this.y - this.properties.size / 2,
        w: this.properties.size,
        h: this.properties.size},{
          x: enemies[e].x - enemies[e].w/2,
          y: enemies[e].y - enemies[e].h/2,
          w: enemies[e].w,
          h: enemies[e].h,
        })){
        if (enemies[e].state === "active" && this.dead === false){
          if (this.properties.damageToEnemies > 0){
            enemies[e].doDamageAnimation();  
          }
          enemies[e].health -= this.properties.damageToEnemies;
          if (!this.properties.goesThroughEnemies){
            this.dead = true;
            this.deathTimer = this.properties.lifeTime;
          }
        }
      }
    }
    }

    

    //collision with walls
    for (w = 0; w < walls.length; w++){
      if (detect2BoxesCollision({
        x: this.x - this.properties.size / 2,
        y: this.y - this.properties.size / 2,
        w: this.properties.size,
        h: this.properties.size},walls[w])){
        if (!this.properties.goesThroughTerrain){
          this.deathTimer = this.properties.lifeTime;
          this.dead = true;
        }
        if (this.properties.damagesTerrain && walls[w].hardness <= this.properties.destructionLevel){
          walls[w].health -= this.properties.damageToTerrain;
          walls[w].doDamageAnimation();
        }
      }
    }


    //collision with players
    //circle-circle collision because it would be frustrating if the player gets hit by a bomb explosion when they shouldnt due to it being rect-rect
    this.distX = player.x - this.x;
    this.distY = player.y - this.y;
    if (Math.sqrt((this.distX * this.distX) + (this.distY * this.distY)) <= player.w/2 + this.properties.size/2){
      if (!this.properties.goesThroughPlayer){
        this.dead = true;
        this.deathTimer = this.properties.lifeTime;
      }
      if (player.iFrames <= 0 && this.properties.damageToPlayer > 0){
        player.health -= this.properties.damageToPlayer;
        player.iFrames = player.iFramesOnHit;
        cam.shakeX = cam.damageShakeMultiplier * this.properties.damageToPlayer;
        cam.shakeY = cam.damageShakeMultiplier * this.properties.damageToPlayer;
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
    cam.shakeX += this.properties.shakeXOnDeath;
    cam.shakeY += this.properties.shakeYOnDeath;
    switch (this.properties.effectOnDeath) {
      case "makeWall":
        walls.push(new Wall(this.x - this.properties.size/2, this.y - this.properties.size/2, this.properties.size, this.properties.size,{r: 190, g: 180, b: 175},1,20,0.5))
        break;
      case "spawnBullet":
        bullets.push(new Bullet(this.x, this.y, 0, this.properties.spawnedBulletProperties));
        break;
      default:
        break;
    }
  }
}

function preload(){
  //the loadImage thing doesnt work unless it is called in preload
  loadItems();
  loadChests();
  loadStructures();
  loadDialogue();
}

function setup(){
  generateMap("debugArea");
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
  
  enemyQueueTick -= 1;
  if (enemyQueue.length > 0 && enemyQueueTick <= 0){
    enemies.push(enemyQueue[enemyQueue.length - 1]);
    enemyQueue.splice(enemyQueue.length - 1,1)
    enemyQueueTick = enemyQueueTime;
    if (enemyQueue.length >= 30){
      enemyQueueTime /= 1.05;
    }
  }
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

  if (dialogueBox.hidden){
    movePlayer();
  }
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
  drawPickups();
  drawChests();
  
  drawBullets();
  drawNPCs();
  drawPlayer();
  
  drawEnemies();

  for (e = 0; e < enemyFragmentQueue.length; e++){
    enemies.push(enemyFragmentQueue[e])
  }
  enemyFragmentQueue = [];

  drawHoles();
  drawWalls();
  drawMapOutline();
  drawPlayerHealthBar()
  drawInventoryBoxes();
  //idk it works i guess
  //the effect of the weird canvasscale stuff is to make the dialoguebox appear from the npc that spawns it
  //it isn't in keyPressed() because idk
  if (keyIsDown(70)){
    for (n = 0; n < npcs.length; n++){
      if (npcs[n].checkForPlayerInteraction()){
        dialogueBox.points = [
          {x: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, y: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale, targetX: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, targetY: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale},
          {x: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, y: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale, targetX: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, targetY: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale},
          {x: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, y: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale, targetX: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, targetY: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale},
          {x: (npcs[n].x - cam.x + cam.offsetX + npcs[n].w/2)*canvasScale, y: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale, targetX: (npcs[n].x - cam.x + cam.OffsetX + npcs[n].w/2)*canvasScale, targetY: (npcs[n].y - cam.y + cam.offsetY + npcs[n].h/2)*canvasScale},
        ]
        break;
      }
    }
  }
  if (!dialogueBox.hidden){
    drawDialogueBox();
  }
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
  switch (keyCode) {
    case 69:
    case 9:
      toggleInventoryDisplay();
      break;
    case 70:
      for (p = 0; p < pickups.length; p++){
        if (pickups[p].checkForPickup()){
          //the break is to prevent multiple pickups from being picked up at the same time
          break;
        }
      }
      for (c = 0; c < chests.length; c++){
        if (chests[c].checkForOpen()){
          //the break is to prevent multiple chests from being opened at the same time, even though it doesnt actually work :\
          break;
        }
      }
      for (h = 0; h < holes.length; h++){
        if (holes[h].checkForPlayerEnter()){
          //holes dont usually spawn next to eachother, and if two holes were opened at the same time nothing that bad would happen, but just to be safe i put the break here
          break;
        }
      }
      break;
    case 32:
      dialogueBox.timer = 0;
      if (!(dialogueBox.hidden) && (dialogueBox.state === "npcPopup")){
        dialogueBox.state = "lowering";
      }
    default:
      break;
  }


  //1-9 hotkeys
  for (k = 49; k < 57; k++){
    if (keyCode === k && itemData[player.inventory[k - 49]].effectOnLeftClick === "equip"){
      player.selectedInventorySlot = k - 49;
    }
  }
  //0 hotkey
  if (keyCode === 48 && itemData[player.inventory[9]].effectOnLeftClick === "equip"){
    player.selectedInventorySlot = 9;
  }
}

function mouseReleased(){
  switch (mouseButton) {
    case LEFT:
      if (player.hoveredInventorySlot !== false){
        if (itemData[player.inventory[player.hoveredInventorySlot]].effectOnLeftClick === "equip"){
          player.selectedInventorySlot = player.hoveredInventorySlot;
        }
        if (itemData[player.inventory[player.hoveredInventorySlot]].effectOnLeftClick === "consume"){
          switch (itemData[player.inventory[player.hoveredInventorySlot]].consumeEffect) {
            case "increaseHealth":
              player.health = min(player.maxHealth, player.health + itemData[player.inventory[player.hoveredInventorySlot]].consumeEffectAmount)
              player.inventory[player.hoveredInventorySlot] = "none";
              break;
            case "killAllEnemies":
              cam.shakeX = 100;
              cam.shakeY = 100;
              enemies = [];
              spawners = [];
              enemyQueue = [];
              player.inventory[player.hoveredInventorySlot] = "none";
              break;
            case "spawnBullet":
              bullets.push(new Bullet(player.x + player.w/2, player.y + player.w/2, 0, itemData[player.inventory[player.hoveredInventorySlot]].consumeBulletProperties))
              player.inventory[player.hoveredInventorySlot] = "none";
              break;
            case "increasePlayerSpeed":
              player.speed += itemData[player.inventory[player.hoveredInventorySlot]].consumeEffectAmount;
              player.inventory[player.hoveredInventorySlot] = "none";
              break;
            case "teleport":
              generateMap(itemData[player.inventory[player.hoveredInventorySlot]].consumeEffectAmount);
              break;
            case "expandInventory":
              for (i = 0; i < itemData[player.inventory[player.hoveredInventorySlot]].consumeEffectAmount; i++){
                player.inventorySize += 1;
                player.inventory.push("none");
                inventoryBoxes.push(new InventoryBox(player.inventorySize - 1));
              }
              player.inventory[player.hoveredInventorySlot] = "none";
              break;
            default:
              break;
          }
        }
      }
      break;
      case RIGHT:
        if (player.hoveredInventorySlot !== false && itemData[player.inventory[player.hoveredInventorySlot]].droppable){
          pickups.push(new Pickup(player.inventory[player.hoveredInventorySlot], player.x + player.w/2, player.y + player.h/2));
          player.inventory[player.hoveredInventorySlot] = "none";
          break;
        }
    default:
      break;
  }
  
}