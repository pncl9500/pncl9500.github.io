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
  speed: 0.4,
  inventorySize: 8,
  inventory: [
    "nothing_gun",
    "excavator",
    "solidifier",
    "medkit",
    "key",
    "none",
    "none",
    "none",
  ],
  selectedInventorySlot: 0,
  inventoryShown: -1,
  hoveredInventorySlot: false,

  firingTick: 0,
}


function movePlayer(){

  player.xv *= player.friction;
  player.yv *= player.friction;

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
}