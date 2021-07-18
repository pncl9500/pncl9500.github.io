//file for all of the functions called in function draw(), not function draw() itself.


function drawMapDivisions(){
  strokeWeight(1);
  noFill();
  stroke(gameMap.liner,gameMap.lineg,gameMap.lineb);

  for (x = 0; x < gameMap.xDivisions; x++){
    for (y = 0; y < gameMap.yDivisions; y++){
      rect(gameMap.x + (gameMap.w/gameMap.xDivisions) * x - cam.x + cam.offsetX, gameMap.y + (gameMap.h/gameMap.yDivisions) * y - cam.y + cam.offsetY, gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions)
    }
  }
}

function drawBullets(){
  for (b = 0; b < bullets.length; b++){
    bullets[b].draw();
    if (bullets[b].deathTimer >= bullets[b].properties.lifeTime){
      bullets[b].doDeathEffect();
      bullets.splice(b, 1)
      b -= 1;
    }
  }
}

//only for debugging. spawners are invisible in game.
function drawSpawners(){
  for (s = 0; s < spawners.length; s++){
    spawners[s].draw();
  }
}

function drawPickups(){
  for (p = 0; p < pickups.length; p++){
    pickups[p].draw();
    if (pickups[p].dead){
      pickups.splice(p,1);
      p -= 1;
    }
  }
}

function drawEnemies(){
  rectMode(CENTER);
  noStroke();
  for (e = 0; e < enemies.length; e++){
    enemies[e].draw();
    if (enemies[e].health <= 0){
      enemies[e].doFragmentSpawns();
      enemies[e].dropLoot();
      enemies[e].dropChests();
      enemies.splice(e,1);
      e -= 1;
    }
  }
  rectMode(CORNER);
}

function drawChests(){
  for (c = 0; c < chests.length; c++){
    chests[c].draw();
    if (chests[c].dead){
      chests.splice(c,1);
      c -= 1;
    }
  }
}

function testForPlayerOverSpawner(){
  for (s = 0; s < spawners.length; s++){
    if (spawners[s].testForPlayer()){
      spawners.splice(s, 1);
      s -= 1;
    }
  }
}

function drawMap(){
  //draw map
  fill(gameMap.r,gameMap.g,gameMap.b);
  rect(gameMap.x - cam.x + cam.offsetX, gameMap.y - cam.y + cam.offsetY, gameMap.w, gameMap.h)
}

function drawNPCs(){
  for (n = 0; n < npcs.length; n++){
    npcs[n].draw();
  }
}

function drawWalls(){
  noStroke();
  //draw walls
  for (w = 0; w < walls.length; w++){
    walls[w].draw();
    if (walls[w].health <= 0){
      cam.shakeX += 8;
      cam.shakeY += 8;
      //spawn enemies if the wall spawns enemies
      walls[w].spawnEnemiesOnDeath();
      walls[w].spawnLootOnDeath();
      walls[w].spawnChestsOnDeath();
      walls.splice(w,1);
      w -= 1;
    }
  }
}

function drawMapOutline(){
  //draw big outline around the whole map
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(gameMap.x - cam.x + cam.offsetX, gameMap.y - cam.y + cam.offsetY, gameMap.w, gameMap.h)
}

function drawPlayer(){
  player.iFrames -= 1;
  //draw player
  noStroke();
  if (player.iFrames < 0 || (floor(player.iFrames/8) % 2) === 0){
    fill(player.r,player.g,player.b);
  rect(player.x - cam.x + cam.offsetX,player.y - cam.y + cam.offsetY,player.w,player.h);
  }
}

function drawPlayerHealthBar(){
  player.healthBarScale = Math.log(Math.log(Math.log(Math.log(player.maxHealth)))) * player.healthBarWidthMultiplier;
  noStroke();
  player.healthBarWidth += (player.health - player.healthBarWidth)/player.healthBarAnimationSmoothing;
  player.healthBarX += (player.x - player.healthBarX)/player.healthBarMovementSmoothing
  player.healthBarY += (player.y - player.healthBarY)/player.healthBarMovementSmoothing
  //black health bar background
  fill(0,0,0);
  rect(player.healthBarX - cam.x + cam.offsetX + player.w/2 - (player.maxHealth * player.healthBarScale)/2,player.healthBarY - player.healthBarYOffset - cam.y + cam.offsetY + player.h/2,player.maxHealth * player.healthBarScale, player.healthBarHeight)
  //red part of health bar
  if (player.healthBarWidth > 0){
    fill(255,0,0);
    rect(player.healthBarX - cam.x + cam.offsetX + player.w/2 - (player.healthBarWidth * player.healthBarScale)/2,player.healthBarY - player.healthBarYOffset - cam.y + cam.offsetY + player.h/2,player.healthBarWidth * player.healthBarScale, player.healthBarHeight)
  }

  if (player.health <= 0){
    //placeholder text
    fill(0);
    text("YOU HAVE BEEN KILLED but can still play the game because you cannot die yet", player.x - 80 - cam.x + cam.offsetX, player.y - 80 - cam.y + cam.offsetY);
  }
}

function drawMousePointer(){
  strokeWeight(1);
  noFill();
  crosshair.x = mouseX/canvasScale;
  crosshair.y = mouseY/canvasScale;

  stroke(crosshair.r, crosshair.g, crosshair.b);
  ellipse(crosshair.x, crosshair.y, crosshair.w, crosshair.h);
}

function drawMousePointerText(){
  if (player.hoveredInventorySlot !== false && player.inventory[player.hoveredInventorySlot] !== "none"){
    fill(0,0,0);
    noStroke();
    textSize(4);
    text(itemData[player.inventory[player.hoveredInventorySlot]].name,crosshair.x + crosshair.textOffsetX, crosshair.y + crosshair.textOffsetY)
    text(itemData[player.inventory[player.hoveredInventorySlot]].inventoryLeftClickFunctionName,crosshair.x + crosshair.textOffsetX, crosshair.y + crosshair.textOffsetY + crosshair.spaceInBetweenText)
    if (itemData[player.inventory[player.hoveredInventorySlot]].inventoryLeftClickFunctionName === ""){
      text("Right Click: Drop",crosshair.x + crosshair.textOffsetX, crosshair.y + crosshair.textOffsetY + crosshair.spaceInBetweenText)
    } else {
      text("Right Click: Drop",crosshair.x + crosshair.textOffsetX, crosshair.y + crosshair.textOffsetY + crosshair.spaceInBetweenText * 2)
    }
  }
}

function drawDialogueBox(){
  dialogueBox.timer += 1;
  
  if (dialogueBox.state !== "ending"){
    dialogueBox.smoothing = 8;
    dialogueBox.points[0].targetX = windowWidth - 10;
    dialogueBox.points[0].targetY = 10 + windowHeight*0.7;
    dialogueBox.points[1].targetX = 10;
    dialogueBox.points[1].targetY = 10 + windowHeight*0.7;
    dialogueBox.points[2].targetX = 10;
    dialogueBox.points[2].targetY = windowHeight - 10;
    dialogueBox.points[3].targetX = windowWidth - 10;
    dialogueBox.points[3].targetY = windowHeight - 10;
  }
  for (p = 0; p < dialogueBox.points.length; p++){
    dialogueBox.points[p].x += (dialogueBox.points[p].targetX - dialogueBox.points[p].x)/dialogueBox.smoothing
    dialogueBox.points[p].y += (dialogueBox.points[p].targetY - dialogueBox.points[p].y)/dialogueBox.smoothing
  }
  stroke(0);
  strokeWeight(4);
  fill(255);
  //the dialogue box is completely independent from the rest of the things drawn.
  scale(1/canvasScale);
  drawDialoguePortrait();
  quad(dialogueBox.points[0].x,dialogueBox.points[0].y,dialogueBox.points[1].x,dialogueBox.points[1].y,dialogueBox.points[2].x,dialogueBox.points[2].y,dialogueBox.points[3].x,dialogueBox.points[3].y);
  scale(canvasScale);
}

function drawDialoguePortrait(){
  drawNpc = false;

  switch (dialogueBox.state) {
    case "dialogueBoxExpanding":
      
      dialogueBox.npc.targetY = 10 + windowHeight*0.7 + windowHeight/12;
      drawNpc = false;
      if (dialogueBox.timer > 30){
        dialogueBox.timer = 0;
        dialogueBox.state = "npcPopup";
      }
      break;
    case "npcPopup":
      drawNpc = true;
      dialogueBox.npc.targetY = 10 + windowHeight*0.7 - windowHeight/10;
      break;
    case "lowering":
      drawNpc = true;
      dialogueBox.npc.targetY = 10 + windowHeight*0.7 + windowHeight/12;
      if (dialogueBox.timer > 10){
        dialogueBox.timer = 0;
        dialogueBox.state = "npcPopup";
        dialogueBox.dialogueStep += 1;
        if (dialogueBox.dialogueStep >= dialogueBox.dialogue.length){
          dialogueBox.dialogueStep = 0;
          dialogueBox.state = "ending";
        }
      }
    case "ending":
      dialogueBox.smoothing = 4;
      dialogueBox.points[0].targetX = windowWidth - 10;
      dialogueBox.points[0].targetY = windowHeight + 10;
      dialogueBox.points[1].targetX = 10;
      dialogueBox.points[1].targetY = windowHeight + 10;
      dialogueBox.points[2].targetX = 10;
      dialogueBox.points[2].targetY = windowHeight + 10;
      dialogueBox.points[3].targetX = windowWidth - 10;
      dialogueBox.points[3].targetY = windowHeight + 10;
      if (dialogueBox.timer > 40){
        dialogueBox.hidden = true;
      }
      break;
    default:
      break;
  }

  dialogueBox.npc.x = windowWidth/5
  if (dialogueBox.dialogue[dialogueBox.dialogueStep].side === "right"){
    dialogueBox.npc.x = windowWidth - windowWidth/5
  }

  

  dialogueBox.npc.yv += (dialogueBox.npc.targetY - dialogueBox.npc.y)/dialogueBox.npc.smoothing;
  dialogueBox.npc.yv *= dialogueBox.npc.friction;
  dialogueBox.npc.y += dialogueBox.npc.yv;

  dialogueBox.npc.w = windowHeight/4
  dialogueBox.npc.h = windowHeight/4


  if (drawNpc){
    image(dialogueBox.dialogue[dialogueBox.dialogueStep].image, dialogueBox.npc.x - dialogueBox.npc.w/2, dialogueBox.npc.y - dialogueBox.npc.h/2, dialogueBox.npc.w, dialogueBox.npc.h);
  }
}