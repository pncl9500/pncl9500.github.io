//file for all of the functions called in function draw(), not function draw() itself.


function drawMapDivisions(){
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

function testForPlayerOverSpawner(){
  for (s = 0; s < spawners.length; s++){
    spawners[s].testForPlayer();
  }
}

function drawMap(){
  //draw map
  fill(gameMap.r,gameMap.g,gameMap.b);
  rect(gameMap.x - cam.x + cam.offsetX, gameMap.y - cam.y + cam.offsetY, gameMap.w, gameMap.h)
}

function drawWalls(){
  noStroke();
  //draw walls
  for (w = 0; w < walls.length; w++){
    walls[w].draw();
    if (walls[w].health <= 0){
      cam.shakeX += 4 * walls[w].hardness;
      cam.shakeY += 4 * walls[w].hardness;
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
  //draw player
  noStroke();
  fill(player.r,player.g,player.b);
  rect(player.x - cam.x + cam.offsetX,player.y - cam.y + cam.offsetY,player.w,player.h);
}

function drawMousePointer(){
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
  }
}