//file for all of the functions called in function draw(), not function draw() itself.


function drawMapDivisions(){
  strokeWeight(1);
  noFill();
  stroke(gameMap.liner,gameMap.lineg,gameMap.lineb);

  for (x = max(0,floor(player.x/(gameMap.w/gameMap.xDivisions)) - 7); x < min(gameMap.xDivisions, floor(player.x/(gameMap.w/gameMap.xDivisions)) + 7); x++){
    for (y = max(0,floor(player.y/(gameMap.h/gameMap.yDivisions)) - 5); y < min(gameMap.xDivisions, floor(player.y/(gameMap.h/gameMap.yDivisions)) + 5); y++){
      rect(gameMap.x + (gameMap.w/gameMap.xDivisions) * x - cam.x + cam.offsetX, gameMap.y + (gameMap.h/gameMap.yDivisions) * y - cam.y + cam.offsetY, gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions)
    }
  }

  // for (x = 0; x < gameMap.xDivisions; x++){
  //   for (y = 0; y < gameMap.yDivisions; y++){
  //     rect((gameMap.x + (gameMap.w/gameMap.xDivisions) * x - cam.x + cam.offsetX) / 2, (gameMap.y + (gameMap.h/gameMap.yDivisions) * y - cam.y + cam.offsetY) / 2, gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions)
  //   }
  // }
}

function drawBullets(){
  fill(0,255,255);
  for (b = 0; b < bullets.length; b++){
    bullets[b].draw();
    if (bullets[b].deathTimer >= bullets[b].properties.lifeTime){
      bullets[b].doDeathEffect();
      bullets.splice(b, 1)
      b -= 1;
    }
  }
}

function drawBosses(){
  for (bb = 0; bb < bosses.length; bb++){
    bosses[bb].draw();
    if (bosses[bb].dead){
      bosses.splice(bb, 1);
      bb -= 1;
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

// function sortEnemiesByDistanceFromPlayer(){
//   closeEnemies = [];
//   for (let e = 0; e < enemies.length; e++){
//     if ((Math.pow(enemies[e].x - player.x, 2) + Math.pow(enemies[e].y - player.y, 2)) < 400){
//       closeEnemies.push(enemies[e]);
//     }
//   }
// }

function drawEnemies(){
  rectMode(CENTER);
  noStroke();
  for (let e = 0; e < enemies.length; e++){
    //if ((Math.abs(enemies[e].x - player.x) + Math.abs(enemies[e].y - player.y)) < 800){
      enemies[e].draw();
      if (enemies[e].health <= 0){
        enemies[e].doFragmentSpawns();
        enemies[e].dropLoot();
        enemies[e].dropChests();
        //enemies.splice(e,1);
        enemies.splice(e, 1);
        e -= 1;
      }
    //}
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
    if ((Math.abs(walls[w].x - player.x) + Math.abs(walls[w].y - player.y)) < 1250){
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
  player.healthBarScale = player.maxHealth * player.healthBarWidthMultiplier;
  noStroke();
  player.healthBarWidth += (player.health - player.healthBarWidth)/player.healthBarAnimationSmoothing;
  player.healthBarX += (player.x - player.healthBarX)/player.healthBarMovementSmoothing
  player.healthBarY += (player.y - player.healthBarY)/player.healthBarMovementSmoothing
  //black health bar background
  fill(0,0,0);
  rect(player.healthBarX - cam.x + cam.offsetX + player.w/2 - (player.healthBarScale)/2,player.healthBarY - player.healthBarYOffset - cam.y + cam.offsetY + player.h/2,max(player.healthBarScale, 1), player.healthBarHeight)
  if (player.health < 1){
    //this is here because for some reason if you had 0 health 1 pixel of red would appear
    player.healthBarWidth = 0;
  }
  //red part of health bar
  if (player.healthBarWidth > 0){
    fill(255,0,0);
    rect(player.healthBarX - cam.x + cam.offsetX + player.w/2 - (player.healthBarWidth / player.maxHealth * player.healthBarScale)/2,player.healthBarY - player.healthBarYOffset - cam.y + cam.offsetY + player.h/2,max(player.healthBarWidth / player.maxHealth * player.healthBarScale, 1), player.healthBarHeight)
  }

  if (player.health <= 0){
    //placeholder text
    textSize(6);
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
  //the dialogue box is completely independent from the rest of the things drawn.
  scale(1/canvasScale);
  drawDialoguePortrait();
  
  scale(canvasScale);
}

function drawDialoguePortrait(){
  drawNpc = false;
  drawText = false;

  switch (dialogueBox.state) {
    case "dialogueBoxExpanding":
      drawText = false;
      dialogueBox.npc.targetY = 10 + windowHeight*0.7 + windowHeight/12;
      if (dialogueBox.timer > 30){
        dialogueBox.timer = 0;
        dialogueBox.state = "npcPopup";
      }
      break;
    case "npcPopup":
      drawNpc = true;
      drawText = true;
      dialogueBox.npc.targetY = 10 + windowHeight*0.7 - windowHeight/10;
      text()
      break;
    case "lowering":
      drawNpc = true;
      dialogueBox.npc.targetY = 10 + windowHeight*0.7 + windowHeight/10;
      if (dialogueBox.timer > 10){
        dialogueBox.timer = 0;
        dialogueBox.charactersDrawn = 0,
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
      dialogueBox.points[0].targetY = windowHeight + 5;
      dialogueBox.points[1].targetX = 10;
      dialogueBox.points[1].targetY = windowHeight + 5;
      dialogueBox.points[2].targetX = 10;
      dialogueBox.points[2].targetY = windowHeight + 5;
      dialogueBox.points[3].targetX = windowWidth - 10;
      dialogueBox.points[3].targetY = windowHeight + 5;
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
  stroke(0);
  strokeWeight(4);
  fill(255);
  quad(dialogueBox.points[0].x,dialogueBox.points[0].y,dialogueBox.points[1].x,dialogueBox.points[1].y,dialogueBox.points[2].x,dialogueBox.points[2].y,dialogueBox.points[3].x,dialogueBox.points[3].y);
  if (drawText){
    dialogueBox.charactersDrawn += 1;
    fill(0);
    noStroke();
    textSize(dialogueBox.dialogue[dialogueBox.dialogueStep].textSize);
    rectMode(CORNERS);
    text((dialogueBox.dialogue[dialogueBox.dialogueStep].text).substr(0,min(dialogueBox.charactersDrawn,dialogueBox.dialogue[dialogueBox.dialogueStep].text.length)), dialogueBox.points[1].x + dialogueBox.textPadding,dialogueBox.points[1].y + dialogueBox.textPadding,dialogueBox.points[3].x - dialogueBox.textPadding * 2,dialogueBox.points[3].y - dialogueBox.textPadding);
    rectMode(CORNER);
  }
}

function drawHoles(){
  for(h = 0; h < holes.length; h++){
    holes[h].draw();
  }
}

function drawShrines(){
  for (s = 0; s < shrines.length; s++){
    shrines[s].draw();
  }
}