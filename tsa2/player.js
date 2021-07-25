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
  money: 0,
  moneyCountYOffset: 6,
  friction: 0.8,
  speed: 0.27,
  inventorySize: 8,
  inventory: [
    "pistol",
    "none",
    "none",
    "none",
    "medkit",
    "key",
    "bomb",
    "bomb",
  ],
  selectedInventorySlot: 0,
  inventoryShown: -1,
  hoveredInventorySlot: false,

  statusEffects: {
    //timers for all status effects
    weaken: 0,
    disable: 0,
  },

  firingTick: 0,

  maxHealth: 100,
  health: 100,
  healthBarWidth: 100,
  healthBarAnimationSmoothing: 4,
  healthBarScale: 0.2,
  healthBarWidthMultiplier: 0.25,
  healthBarHeight: 2,
  healthBarYOffset: 14,

  healthBarX: 0,
  healthBarY: 0,
  healthBarMovementSmoothing: 3,

  iFramesOnHit: 60,
  iFrames: 0,
}


function movePlayer(){

  for (const key in player.statusEffects){
    player.statusEffects[key] -= 1;
  }

  player.xv *= player.friction;
  player.yv *= player.friction;

  speedModifier = 1;
  if (player.statusEffects.weaken > 0){
    speedModifier *= 0.5;
  }

  if (floorEffects.includes("protectionShrineBuff")){
    speedModifier *= 0.9;
  }
  //move player
  if (keyIsDown(87)){
    player.yv -= player.speed * speedModifier;
  }
  if (keyIsDown(83)){
    player.yv += player.speed * speedModifier;
  }
  if (keyIsDown(65)){
    player.xv -= player.speed * speedModifier;
  }
  if (keyIsDown(68)){
    player.xv += player.speed * speedModifier;
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