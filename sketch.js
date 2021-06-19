//camera
camX = 0
camY = 0
camOffsetX = 320
camOffsetY = 180




//heroes like that magmax or euclid guy
heroes = {}
class Hero {
  constructor(name, r, g, b, skill1, skill2, special){
    //color palette of the hero
    this.pal = {}
    this.pal.r = r;
    this.pal.g = g;
    this.pal.b = b;
    //string used for printing the hero's name out
    this.name = name;
    //a string thats the the skill of the hero
    this.skill1 = skill1;
    this.skill2 = skill2;
    //special would be like cent's weird movement or something
    //cent's property is "stepMovement"
    this.special = special;
  }
}

//swaps the hero
function changeHero(to){
  player.hero = to;
  playerColor = color(heroes[to].pal.r,heroes[to].pal.g,heroes[to].pal.b);
}

//heroes
heroes.magmax = new Hero("Magmax",252, 13, 27,"flow","harden");
heroes.rime = new Hero("Rime",54, 63, 251,"warp","paralysis");
heroes.morfe = new Hero("Morfe",34, 219, 39,"reverse","minimize");
heroes.aurora = new Hero("Aurora",253, 127, 35,"distort","energize");
heroes.necro = new Hero("Necro",252, 40, 252,"resurrection","reanimate");
heroes.brute = new Hero("Brute",154, 88, 19,"stomp","vigor");
heroes.nexus = new Hero("Nexus",61, 254, 199,"barrier","stream");
heroes.shade = new Hero("Shade",129, 101, 101,"night","vengeance");
heroes.euclid = new Hero("Euclid",94, 78, 101,"blackhole","orbit");
heroes.chrono = new Hero("Chrono",26, 177, 114,"backtrack","rewind");
heroes.reaper = new Hero("Reaper",66, 74, 88,"atonement","depart");
heroes.rameses = new Hero("Rameses",152, 154, 79,"bandages","latch");
heroes.jolt = new Hero("Jolt",225, 223, 48,"spark","charge");
heroes.ghoul = new Hero("Ghoul",187, 215, 216,"shriek","shadow");
heroes.cent = new Hero("Cent",128, 126, 131,"fusion","mortar", "stepMovement");
heroes.jotunn = new Hero("Jotunn",96, 174, 252,"decay","shatter");
heroes.candy = new Hero("Candy",253, 130, 189,"sugarrush","sweettooth");
heroes.mirage = new Hero("Mirage",6, 27, 159,"shift","obscure");
heroes.boldrock = new Hero("Boldrock",177, 142, 81,"crumble","earthquake");
heroes.test = new Hero("Test",255, 255, 255,"energyDrain1","energyDrain2");

//map tiles.
//AREA TELEPORT AND LEVELTELEPORT IS ONLY FOR TELEPORTS BETWEEN LEVELS NOT TELEPORT
class MapTile{
  constructor(x, y, w, h, type, tpoffsetX, tpoffsetY, enemies, pelletCount, r, g, b, levelTeleport, areaTeleport){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.tpoffsetX = tpoffsetX;
    this.tpoffsetY = tpoffsetY;
    this.enemies = enemies;
    this.pelletCount = pelletCount;
    this.pal = {}
    this.pal.r = r;
    this.pal.g = g;
    this.pal.b = b;
    this.levelTeleport = levelTeleport;
    this.areaTeleport = areaTeleport;
  }
}

world = {
  safe_shore:[
    //safe shore 1 (0)
    {
      name: "Safe Shore: Area 1",
      visited: false,
      tiles:[
        new MapTile(-4, -7, 8, 15, "safezone", 0, 0, [], 0, 195, 195, 195),
        new MapTile(4, -7, 80, 15, "normal", 0, 0, [], 25, 255, 255, 255),
        new MapTile(84, -7, 8, 15, "safezone", 0, 0, [], 0, 195, 195, 195),
        new MapTile(92, -7, 2, 15, "teleport", 12, 0, [], 0, 254, 242, 118),
      ],
    },
    //safe shore 2 (1)
    {
      name: "Safe Shore: Area 2",
      visited: false,
      tiles:[
        new MapTile(100, -7, 2, 15, "teleport", -12, 0, [], 0, 254, 242, 118),
        new MapTile(102, -7, 8, 15, "safezone", 0, 0, [], 0, 195, 195, 195),
        new MapTile(110, -7, 80, 15, "normal", 0, 0, [{type: "normal", count: 6, size: 20, speed: 6}], 25, 255, 255, 255),
        new MapTile(190, -7, 8, 15, "safezone", 0, 0, [], 0, 195, 195, 195),
      ],
    }
  ]
}

pelletPalettes = [
  //purple
  {r: 156, g: 72, b:222},
  //purple dark
  {r: 116, g: 53, b:176},
  //orange
  {r: 255, g: 140, b:77},
  //orange dark
  {r: 230, g: 110, b:62},
  //green
  {r: 66, g: 201, b:89},
  //green dark
  {r: 52, g: 168, b:85},
  //blue
  {r: 64, g: 157, b:214},
  //blue dark
  {r: 54, g: 122, b:194},
]


//pellets - those things that give you xp to upgrade.
//pellets and enemies are created when an area is loaded.
pellets = [];
class Pellet{
  constructor(minX, minY, maxX, maxY){
    this.width = 10;
    this.height = 10;

    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;

    //pellet pallete! funny name
    this.pelletPalette = floor(random(0, 8));

    this.r = pelletPalettes[this.pelletPalette].r;
    this.g = pelletPalettes[this.pelletPalette].g;
    this.b = pelletPalettes[this.pelletPalette].b;

    this.x = random(minX + this.width/2, maxX - this.width/2);
    this.y = random(minY + this.height/2, maxY - this.height/2);
  }

  //relocate the pellet to a random area.
  respawn(){
    this.x = random(this.minX + this.width/2, this.maxX - this.width/2);
    this.y = random(this.minY + this.height/2, this.maxY - this.height/2);
  }
}

enemies = [];
class Enemy{
  constructor(type, speed, size, minX, minY, maxX, maxY, direction, x, y, pattern){
    this.type = type;
    this.speed = speed;
    this.size = size;
    //DIRECTION IS IN DEGREES
    //direction, x, and y are random and unspecified, UNLESS the unit is a frost giant, or other unit that is meant to stay still.
    this.direction = direction;
    this.minX = minX;
    this.minY = minY;
    this.maxX = maxX;
    this.maxY = maxY;
    if (x === "randomized"){
      this.x = random(minX, maxX);
    } else {
      this.x = x;
    }

    if (y === "randomized"){
      this.y = random(minY, maxY);
    } else {
      this.y = y;
    }
    
    
    //bullet pattern of frost giants.
    this.pattern = pattern;

    this.pal = {
      r: 158,
      g: 158,
      b: 158,
    }

    this.immune = false;

    //movemovmeomveomveomve
    this.movementPattern = "normal";

    //for getting frozen via skills and stuff.
    this.freezeTimer = 0;
    this.slowTimer = 0;
  }

  draw(){
    if (options.enemyOutlines === 1){
      stroke(0,0,0)
    }
    fill(this.pal.r,this.pal.g,this.pal.b);
    ellipse(this.x + camOffsetX + camX, this.y + camOffsetY + camY, this.size, this.size);
    noStroke();
  }

  move(){
    this.freezeTimer -= 1;
    if (!(this.freezeTimer > 0)){
      switch (this.movementPattern) { 
        case "normal":
          //angles to radians
          this.x += Math.cos(this.direction * (Math.PI/180)) * this.speed/6;
          this.y += Math.sin(this.direction * (Math.PI/180)) * this.speed/6;
          //bounce off of walls
          if (this.x > this.maxX - this.size/2){
            this.x = this.maxX - this.size/2;
            this.direction = (this.direction + 90) * -1 % 360 + 90 * -1 % 360;
          }
          if (this.x < this.minX + this.size/2){
            this.x = this.minX + this.size/2;
            this.direction = (this.direction + 90) * -1 % 360 + 90 * -1 % 360;
          }
          if (this.y > this.maxY - this.size/2){
            this.y = this.maxY - this.size/2;
            this.direction = this.direction * -1 % 360;
          }
          if (this.y < this.minY + this.size/2){
            this.y = this.minY + this.size/2;
            this.direction = this.direction * -1 % 360;
          }
          
          break;
        default:
          break;
      }
    }
    

    //test for collision with player
    if (Math.sqrt((this.x - player.x) * (this.x - player.x) + (this.y - player.y) * (this.y - player.y)) < player.w/2 + this.size/2){
      if (player.dead === false){
        player.dead = true;
        player.deathTick = 0;
        player.deathTimer = deathTimerLengths[player.area];
      }
    }
  }
}

function unloadArea(){
  pellets = [];
  enemies = [];
}

function loadArea(){
  for (l = 0; l < world[player.level][player.area].tiles.length; l++){
    //load the pellets
    for (p = 0; p < world[player.level][player.area].tiles[l].pelletCount; p++){
      pellets.push(new Pellet(world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16))
    }
    //load the enemies
    //get groups of enemies
    for (g = 0; g < world[player.level][player.area].tiles[l].enemies.length; g++){
      //load the enemies that are in the group
      for (e = 0; e < world[player.level][player.area].tiles[l].enemies[g].count; e++){
        enemies.push(new Enemy(world[player.level][player.area].tiles[l].enemies[g].type, world[player.level][player.area].tiles[l].enemies[g].speed, world[player.level][player.area].tiles[l].enemies[g].size,
          world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16,
          random(1,360), "randomized", "randomized"));
      }
    }
  }
}

//the amount of time the player is dead for, based on the area that they are on.
deathTimerLengths = [
  10,
  15,
  15,
  20,
  20,
  20,
  25,
  25,
  30,
  30,
  60
]


player = {
  x: 0,
  y: 0,
  w: 16,
  h: 16,
  hero: "magmax",
  speed: 5,
  energy: 30,
  maxEnergy: 30,
  regen: 5,
  mouseControls: -1,
  skill1level: 0,
  skill2level: 0,
  level: "safe_shore",
  area: 0,

  skill1cooldown: 0,
  skill2cooldown: 0,

  skill1updownToggle: "down",
  skill2updownToggle: "down",
  
  upgradeLevel: 1,
  upgradePoints: 0,
  upgradeProgress: 0,
  upgradeProgressNeeded: 4,
  
  regenTimer: 0,

  dead: false,
  //increments every frame.
  deathTick: 0,
  deathTimer: 10,

  deathCount: 0,

  respawnPointX: 0,
  respawnPointY: 0,
};



function doPlayerInput(){
  if (player.mouseControls === 1){
    
    speedModifier = 0.25
    
    //get vector
    mouseMovement = {
      x: (mouseX - 320 + player.x - player.x),
      y: (mouseY - 180 + player.y - player.y),
    };
    //turn vector into SPEEEEDS
    //mouseMovementAngle = atan2(mouseMovement.y,mouseMovement.x);
    if (mouseMovement.x/player.speed > player.speed){
      mouseMovement.x = player.speed;
    }
    if (mouseMovement.y/player.speed > player.speed){
      mouseMovement.y = player.speed;
    }
    player.x += mouseMovement.x * speedModifier;
    player.y += mouseMovement.y * speedModifier;
  } else {
    speedModifier = 0.25
    if (keyIsDown(16)){
      speedModifier *= 0.5
    }
    if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && options.mikeyMode === -1){
      player.x -= player.speed * speedModifier;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || options.mikeyMode === 1){
      player.x += player.speed * speedModifier;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)){
      player.y -= player.speed * speedModifier;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
      player.y += player.speed * speedModifier;
    }
    //loop through all map tiles in the current area, and get the corners of all
    //of them in order to do collision detection.
    minXboundary = 99999;
    maxXboundary = -99999;
    minYboundary = 99999;
    maxYboundary = -99999;
    for (t = 0; t < world[player.level][player.area].tiles.length; t++){
      if (world[player.level][player.area].tiles[t].x < minXboundary){
        minXboundary = world[player.level][player.area].tiles[t].x
      }
      if (world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w > maxXboundary){
        maxXboundary = world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w
      }
      if (world[player.level][player.area].tiles[t].y < minXboundary){
        minYboundary = world[player.level][player.area].tiles[t].y
      }
      if (world[player.level][player.area].tiles[t].y + world[player.level][player.area].tiles[t].h > maxYboundary){
        maxYboundary = world[player.level][player.area].tiles[t].y + world[player.level][player.area].tiles[t].h
      }
    }
    if (player.x - player.w/2 < minXboundary * 16){
      player.x = minXboundary * 16 + player.w/2;
    }

    if (player.x + player.w/2 > maxXboundary * 16){
      player.x = maxXboundary * 16 - player.w/2;
    }
    
    if (player.y - player.h/2 < minYboundary * 16){
      player.y = minYboundary * 16 + player.h/2;
    }

    if (player.y + player.h/2 > maxYboundary * 16){
      player.y = maxYboundary * 16 - player.h/2;
    }
    
    
    //attempt to push the player outside of any frozen fjord ice tiles.
    //currently extremely buggy. needs the fixes...
    for (t = 0; t < world[player.level][player.area].tiles.length; t++){
      if (world[player.level][player.area].tiles[t].type === "iceblock"){
        if (player.x > world[player.level][player.area].tiles[t].x * 16 - player.w/2 && player.x < (world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w) * 16 + player.w/2){
          
          //top wall
          if ((player.y > world[player.level][player.area].tiles[t].y * 16 - player.h/2) && (player.y <= (world[player.level][player.area].tiles[t].y + player.y > world[player.level][player.area].tiles[t].h) * 16 - player.h)){
            player.y = (world[player.level][player.area].tiles[t].y * 16 - player.h/2)
          }
          
          
          // //bottom wall
          if (player.y >= world[player.level][player.area].tiles[t].y * 16 && (player.y < (world[player.level][player.area].tiles[t].y + world[player.level][player.area].tiles[t].h) * 16 + player.h/2)){
            player.y = (world[player.level][player.area].tiles[t].y + world[player.level][player.area].tiles[t].h) * 16 + player.h/2
          }
          //player.x = world[player.level][player.area].tiles[t].x * 16 - player.w/2;
        }
        
        
        
        
        if (player.y > world[player.level][player.area].tiles[t].y * 16 - player.h/2 && player.y < (world[player.level][player.area].tiles[t].y + world[player.level][player.area].tiles[t].h) * 16 + player.h/2){
          
          //left wall
          if (player.x > world[player.level][player.area].tiles[t].x * 16 - player.w/2 && player.x <= (world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w) * 16  - player.w/2){
            player.x = world[player.level][player.area].tiles[t].x * 16 - player.w/2
          }
          
          
          // //right wall
          if (player.x >= world[player.level][player.area].tiles[t].x * 16 && (player.x < (world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w) * 16 + player.w/2)){
            player.x = (world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w) * 16 + player.w/2
          }
          //player.x = world[player.level][player.area].tiles[t].x * 16 - player.w/2;
        }
      }
    }
    
    
    
    //move the camera
    camX = player.x * -1
    camY = player.y * -1
  }
}

function checkForTeleport(){
  //is the player in a teleport zone? if they are, do the teleporting between areas.
  for (t = 0; t < world[player.level][player.area].tiles.length; t++){
    if (world[player.level][player.area].tiles[t].type === "teleport"){
      if (player.x > world[player.level][player.area].tiles[t].x * 16 - player.w/2 &&
          player.x < (world[player.level][player.area].tiles[t].x + world[player.level][player.area].tiles[t].w) * 16 + player.w/2 &&
          player.y > world[player.level][player.area].tiles[t].y * 16 - player.h/2 &&
          player.y < (world[player.level][player.area].tiles[t].y + world[player.level][player.area].tiles[t].h) * 16 + player.h/2){
            player.x += world[player.level][player.area].tiles[t].tpoffsetX * 16;
            player.y += world[player.level][player.area].tiles[t].tpoffsetY * 16;
            //color changes are just for debug
            // world[player.level][player.area].tiles[t].pal.r = random(255);
            // world[player.level][player.area].tiles[t].pal.g = random(255);
            // world[player.level][player.area].tiles[t].pal.b = random(255);
            
            //check if the teleport zone leads to another area, and send the player there
            for (a = 0; a < world[player.level].length; a++){
              for (at = 0; at < world[player.level][a].tiles.length; at++){
                if (player.x > world[player.level][a].tiles[at].x * 16 - player.w/2 &&
                    player.x < (world[player.level][a].tiles[at].x + world[player.level][a].tiles[at].w) * 16 + player.w/2 &&
                    player.y > world[player.level][a].tiles[at].y * 16 - player.h/2 &&
                    player.y < (world[player.level][a].tiles[at].y + world[player.level][a].tiles[at].h) * 16 + player.h/2){
                      unloadArea();
                      player.area = a
                      loadArea();

                      player.respawnPointX = player.x
                      player.respawnPointY = player.y
                }
              }
            }
      }
    }
  }
}


function setup() {

  
  rimeFieldColor = color(0,245,255);
  rimeFieldColor.setAlpha(40);
  setupSkills();

  changeHero("magmax")
  createCanvas(640, 360);
  loadArea();
  addHeroButtons();

  //the color of the grid lines
  gridColor = color(0,0,0);
  gridColor.setAlpha(20);

}

function draw() {

  //cool down the cooldowns
  if (skills[heroes[player.hero].skill1].cooldownDecreasesOverTime){
    player.skill1cooldown -= 1;
  }

  if (skills[heroes[player.hero].skill2].cooldownDecreasesOverTime){
    player.skill2cooldown -= 1;
  }

  //cheats
  if (options.noCooldowns === 1){
    player.skill1cooldown = 0;
    player.skill2cooldown = 0;
  }


  if (options.invincibility === 1){
    player.dead = false;
  }
  
  
  background(35,35,55);
  
  
  
  //player input time
  if (!(player.dead)){
    doPlayerInput();
  }

  //regenerate the player's energy based on their regen stat.
  //remember that player.regen is actually 5 times what it says in the in-game UI.
  player.regenTimer += 1 * player.regen/5;
  if (player.regenTimer > 60){
    player.regenTimer -= 60;
    if (player.energy < player.maxEnergy){
      player.energy += 1; 
    }
  }

  //draw the tiles of the current level.
  for (i = 0; i < world[player.level][player.area].tiles.length; i++){
    noStroke();
    fill(world[player.level][player.area].tiles[i].pal.r,world[player.level][player.area].tiles[i].pal.g,world[player.level][player.area].tiles[i].pal.b);
    rect(world[player.level][player.area].tiles[i].x * 16 + camX + camOffsetX,world[player.level][player.area].tiles[i].y * 16 + camY + camOffsetY,world[player.level][player.area].tiles[i].w * 16,world[player.level][player.area].tiles[i].h * 16)
  }

  //if grid lines are on, draw the grid lines of the tile, but above the tiles themselves.
  if (options.gridLines === 1){
    stroke(gridColor);
    noFill();
    for (i = 0; i < world[player.level][player.area].tiles.length; i++){
      for (x = 0; x < world[player.level][player.area].tiles[i].w; x++){
        for (y = 0; y < world[player.level][player.area].tiles[i].h; y++){
          rect((world[player.level][player.area].tiles[i].x + x) * 16 + camX + camOffsetX,(world[player.level][player.area].tiles[i].y + y) * 16 + camY + camOffsetY,16,16)
        }
      }
    }
  }
  noStroke();

  //draw pellets
  for (p = 0; p < pellets.length; p++){
    fill(pellets[p].r,pellets[p].g,pellets[p].b);
    ellipse(pellets[p].x + camX + camOffsetX, pellets[p].y + camY + camOffsetY, pellets[p].width,pellets[p].height);
    //if the pellet collides with a player, add the XP, and then relocate the pellet somewhere else.
    if (Math.sqrt((pellets[p].x - player.x) * (pellets[p].x - player.x) + (pellets[p].y - player.y) * (pellets[p].y - player.y)) < player.w/2 + pellets[p].width/2){
      pellets[p].respawn();
      player.upgradeProgress += 1;
      if (skills[heroes[player.hero].skill1].pelletsDecreaseCooldown){
        player.skill1cooldown -= 1;
      }
    
      if (skills[heroes[player.hero].skill1].pelletsDecreaseCooldown){
        player.skill2cooldown -= 1;
      }
      if (player.upgradeProgress >= player.upgradeProgressNeeded){
        //XP requirement for level up increases by 4 every level
        if (player.upgradeLevel < 100 || options.levelCap === -1){
          player.upgradeProgress = player.upgradeProgress % player.upgradeProgressNeeded;
          player.upgradeProgressNeeded += 4;
          player.upgradePoints += 1;
          player.upgradeLevel += 1;
        } else {
          player.upgradeProgress = min(player.upgradeProgress, player.upgradeProgressNeeded);
        }
      }
    }
  }

  
  //player draw time
  noStroke();
  if (player.dead){
    if (options.autoRespawn === 1){
      player.x = player.respawnPointX;
      player.y = player.respawnPointY;
      player.dead = false;
      player.deathTimer = 1;
      player.deathTick = 0;
      player.deathCount += 1;
    }
    //if the player's death timer is -1, they respawn at the last point they entered a teleport zone in and death counter goes up by 1.
    if (player.deathTimer < 0){
      player.x = player.respawnPointX;
      player.y = player.respawnPointY;
      player.dead = false;
      player.deathTimer = 1;
      player.deathTick = 0;
      player.deathCount += 1;
    }
    playerColor.setAlpha(80);
    fill (255,0,0)
    //reduce the player's death timer and then draw it on top of them.
    player.deathTick += 1;
    if (player.deathTick >= 59){
      player.deathTick = 0;
      player.deathTimer -= 1;
    }
    if (player.deathTimer < 10){
      text(max(player.deathTimer,0), player.x + camX + camOffsetX - 3, player.y + camY + camOffsetY + 4);
    } else {
      text(max(player.deathTimer,0), player.x + camX + camOffsetX - 7, player.y + camY + camOffsetY + 4);
    }
  } else {
    playerColor.setAlpha(255);
  }
  fill(playerColor);
  ellipse(player.x + camX + camOffsetX, player.y + camY + camOffsetY, player.w, player.h);

  //draw fields.
  for (f = 0; f < fields.length; f++){
    fields[f].draw();
  }

  
  //draw enemies
    for (e = 0; e < enemies.length; e++){
      enemies[e].move();
      if (options.drawEnemies === 1){
        enemies[e].draw();
      }
    }
  
  //draw the upgrade menu UI
  if (options.upgradeMenuHidden === -1){
    fill(0,0,0)
    rect(-320 + camOffsetX,100 + camOffsetY,170,80)

    //draw the two bars representing the cooldowns for the player's skills.
    
    if (player.skill1cooldown < 1){
      fill(heroes[player.hero].pal.r / 3,heroes[player.hero].pal.g / 3,heroes[player.hero].pal.b / 3);
    } else {
      fill(heroes[player.hero].pal.r / 4,heroes[player.hero].pal.g / 4,heroes[player.hero].pal.b / 4);
    }
    rect(-320 + camOffsetX,152 + camOffsetY,map(player.skill1cooldown, getSkillValue(skills[heroes[player.hero].skill1].cooldown, 1, true),0,0,170, true),13)

    if (player.skill2cooldown < 1){
      fill(heroes[player.hero].pal.r / 3,heroes[player.hero].pal.g / 3,heroes[player.hero].pal.b / 3);
    } else {
      fill(heroes[player.hero].pal.r / 4,heroes[player.hero].pal.g / 4,heroes[player.hero].pal.b / 4);
    }
    rect(-320 + camOffsetX,164 + camOffsetY,map(player.skill2cooldown, getSkillValue(skills[heroes[player.hero].skill2].cooldown, 2, true),0,0,170, true),13)

    fill(heroes[player.hero].pal.r + 50,heroes[player.hero].pal.g + 50,heroes[player.hero].pal.b + 50);
    text(`Lvl.${player.upgradeLevel} ${heroes[player.hero].name}`, -320 + camOffsetX,110 + camOffsetY)
    text(`1 - speed: ${player.speed}`, -320 + camOffsetX,123 + camOffsetY)
    text(`2 - energy: ${player.energy}/${player.maxEnergy}`, -320 + camOffsetX,136 + camOffsetY)
    text(`3 - regen: ${player.regen/5}`, -320 + camOffsetX,149 + camOffsetY)
    text(`4 - ${heroes[player.hero].skill1}: ${player.skill1level}`, -320 + camOffsetX,162 + camOffsetY)
    text(`5 - ${heroes[player.hero].skill2}: ${player.skill2level}`, -320 + camOffsetX,175 + camOffsetY)
    
    //the level up bar
    fill(0,0,0);
    rect(-320 + camOffsetX,94 + camOffsetY,170,6);
    fill(heroes[player.hero].pal.r + 50,heroes[player.hero].pal.g + 50,heroes[player.hero].pal.b + 50);
    rect(-320 + camOffsetX,94 + camOffsetY,map(player.upgradeProgress, 0, player.upgradeProgressNeeded, 0, 170),6);
    
    //upgrade point counter
    if (player.upgradePoints > 0) {
      fill(255,255,0)
      text(`${player.upgradePoints}`, -175 + camOffsetX,110 + camOffsetY) 
    }
    
    
    //draw area counter
    fill(80,80,120)
    text(`${world[player.level][player.area].name}`, -315 + camOffsetX,-160 + camOffsetY)
    text(`Death count: ${player.deathCount}`, -315 + camOffsetX,-140 + camOffsetY)
  }

  //draw the experiment menu UI
  if (options.optionsMenuHidden === -1){
    drawOptionsMenu();
  }

  checkForTeleport();
  
//   //draw the debug line!
//   stroke(255,0,0)
//   line(player.x,player.y,mouseX - 320 + player.x,mouseY - 180 + player.y);
  
//   //draw the debug square!
//   rect(20, 20, 20, 20)
}

//swap between mouse and keyboard when the player clicks
function mouseClicked() {
  //i cant figure out how to do mouse controls
  //player.mouseControls *= -1

  for (b = 0; b < buttons.length; b++){
    switch (buttons[b].shape) {
      case "rect":
          if (mouseX >= buttons[b].x + camOffsetX &&
            mouseX <= buttons[b].x + camOffsetX + buttons[b].w &&
            mouseY >= buttons[b].y + camOffsetY &&
            mouseY <= buttons[b].y + camOffsetY + buttons[b].h){
              if (options.optionsMenuHidden === -1 && buttons[b].tab === options.optionsMenuTab){
                buttons[b].testClick();
                return;
              }
          }
        break;
      case "circle":
        if (Math.sqrt(Math.pow(mouseX - (buttons[b].x + camOffsetX), 2)+Math.pow(mouseY - (buttons[b].y + camOffsetY),2) < buttons[b].w)){
          if (options.optionsMenuHidden === -1 && buttons[b].tab === options.optionsMenuTab){
            buttons[b].testClick();
            return;
          }
        }
      default:
        break;
    }
    
  }
}

function keyPressed() {
  switch (keyCode){
    //H toggles the upgrade menu.
    case 72:
      options.upgradeMenuHidden *= -1;
      break;
    //ESC toggles the experiment menu.
    case 27:
      options.optionsMenuHidden *= -1;
      break;
    //R respawns the player immediately
    case 82:
      player.x = player.respawnPointX;
      player.y = player.respawnPointY;
      player.dead = false;
      player.deathTimer = 1;
      player.deathTick = 0;
      player.deathCount += 1;
      break;
    //1-5 upgrade player stats.
    case 49:
      if (((player.upgradePoints > 0) && player.speed < 17) || options.statCap === -1){
        player.speed += 0.5;
        player.upgradePoints -= 1;
      }
      break;
    case 50:
      if (((player.upgradePoints > 0) && player.maxEnergy < 300) || options.statCap === -1){
        player.maxEnergy += 5;
        player.upgradePoints -= 1;
      }
      break;
    case 51:
      if (((player.upgradePoints > 0) && player.regen < 35) || options.statCap === -1){
        player.regen += 1;
        player.upgradePoints -= 1;
      }
      break;
    case 52:
      if (((player.upgradePoints > 0) && player.skill1level < 5)){
        player.skill1level += 1;
        player.upgradePoints -= 1;
      }
      break;
    case 53:
      if (((player.upgradePoints > 0) && player.skill2level < 5)){
        player.skill2level += 1;
        player.upgradePoints -= 1;
      }
      break;
    //JK/ZX attempt to do a skill.
    case 74:
    case 90:
      if (player.skill1level > 0 && player.skill1cooldown < 1 && (player.dead === false || skills[heroes[player.hero].skill1].usableWhileDead)){
        attemptSkillActivation(heroes[player.hero].skill1, 1);
      }
      break;
    case 88:
    case 75:
      if (player.skill2level > 0 && player.skill2cooldown < 1 && (player.dead === false || skills[heroes[player.hero].skill2].usableWhileDead)){
        attemptSkillActivation(heroes[player.hero].skill2, 2);
      }
      break;
  }
}

