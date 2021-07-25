

enemies = [];
enemyQueue = [];
enemyQueueTick = 20;
enemyQueueTime = 35;

//enemies created on enemy death so weird stuff doesnt happen
enemyFragmentQueue = [];

spawnersTriggered = 0;
currentLevel = "debugArea";

enemySpawnDistance = 80;
enemySpeedMagnitude = 10;

class Enemy{
  constructor(type, x, y, magnification, doSpawnAnimation){


    if (typeof(doSpawnAnimation) != "undefined"){
      this.doSpawnAnimation = doSpawnAnimation;
    } else {
      this.doSpawnAnimation = true;
    }


    this.type = type;


    this.spawnPointX = x;
    this.spawnPointY = y;
    this.x = x;
    this.y = y;
    this.magnification = magnification;

    this.health = floor(enemyData[this.type].health * this.magnification);
    this.damage = floor(enemyData[this.type].damage * this.magnification/5);
    this.speed = 0;

    this.targetSpeed = enemyData[this.type].speed
    this.speedSmoothing = 20;

    this.targetW = enemyData[this.type].w;
    this.targetH = enemyData[this.type].h;
    this.w = 1500;
    this.h = 1500;
    
    this.spawnAnimationSmoothing = 10;

    this.direction = 0;


    this.pal = enemyData[this.type].pal;
    this.alpha = -1500;
    this.targetAlpha = 255;

    this.strokeWeight = 15;
    this.targetStrokeWeight = 0;

    this.state = "spawning";
    this.spawnTimer = 85;
    
    this.damageAnimationLength = 5;
    this.damageAnimationTick = 0;

    if (!this.doSpawnAnimation){
      this.w = this.targetW;
      this.h = this.targetH;
      this.state = "active";
      this.spawnTimer = 0;
      this.strokeWeight = this.targetStrokeWeight;
    }

    this.bulletTimer = 0;
  }
  

  draw(){
    this.bulletTimer -= 1;
    this.damageAnimationTick -= 1;
    //drawn in center rectmode because i do not like corner mode anymore
    switch (this.state) {
      case "spawning":
        
        this.w += (this.targetW - this.w) / this.spawnAnimationSmoothing;
        this.h += (this.targetH - this.h) / this.spawnAnimationSmoothing;
      
        this.alpha += (this.targetAlpha - this.alpha)/(this.spawnAnimationSmoothing * 1.5);
        this.strokeWeight += (this.targetStrokeWeight - this.strokeWeight)/(this.spawnAnimationSmoothing * 1.5);

        this.fillColor = color(this.pal.r, this.pal.g, this.pal.b);
        this.fillColor.setAlpha(this.alpha)

        fill(this.fillColor);

        strokeWeight(this.strokeWeight);
        stroke(this.pal.r, this.pal.g, this.pal.b);
        rect(this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
        this.spawnTimer -= 1;
        if (this.spawnTimer <= 0){
          this.state = "active";
          this.w = this.targetW;
          this.h = this.targetH;
        }
        break;
      case "active":
        noStroke();
        this.speed = (this.targetSpeed - this.speed) / this.speedSmoothing;
        fill(this.pal.r, this.pal.g, this.pal.b);
        if (this.damageAnimationTick > 0){
          fill(240,240,240);
        }
        rect(this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
        this.direction = Math.atan2(player.y + player.h/2 - this.y, player.x + player.w/2 - this.x);
        //collision with walls (X)
        this.x += cos(this.direction) * this.speed * enemySpeedMagnitude;
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision({x: this.x - this.w/2, y: this.y - this.h/2, w: this.w, h: this.h}, walls[w])){
            this.x -= cos(this.direction) * this.speed * enemySpeedMagnitude;;
          }
        }

        this.y += sin(this.direction) * this.speed * enemySpeedMagnitude;

        //collision with walls (Y)
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision({x: this.x - this.w/2, y: this.y - this.h/2, w: this.w, h: this.h}, walls[w])){
            this.y -= sin(this.direction) * this.speed * enemySpeedMagnitude;
          }
        }

        //collision with player
        if (player.iFrames <= 0 && detect2BoxesCollision({x: this.x - this.w/2, y: this.y - this.h/2, w: this.w, h: this.h}, player)){
          player.health -= enemyData[this.type].damage * (1 + (floorEffects.includes("rageShrineBuff"))) / (1 + floorEffects.includes("protectionShrineBuff"));
          player.iFrames = player.iFramesOnHit;
          cam.shakeX = cam.damageShakeMultiplier * enemyData[this.type].damage;
          cam.shakeY = cam.damageShakeMultiplier * enemyData[this.type].damage;
        }

        //shoot bullet
        if (enemyData[this.type].spawnsBullet && this.bulletTimer <= 0){
          var vectorX = this.x - (player.x + player.w/2);
          var vectorY = this.y - (player.y + player.h/2);
          this.bulletTimer = enemyData[this.type].fireRate;
          bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), enemyData[this.type].bulletProperties))
        }
        break;
      default:
        break;
    }
  }

  doDamageAnimation(){
    this.damageAnimationTick = this.damageAnimationLength;
  }

  doFragmentSpawns(){
    if (enemyData[this.type].spawnsFragmentsOnDeath){
      for (this.f = 0; this.f < enemyData[this.type].fragmentSpawns.length; this.f++){
        enemyFragmentQueue.push(new Enemy(enemyData[this.type].fragmentSpawns[this.f], this.x + random(enemyData[this.type].fragmentOffsetX * -1,enemyData[this.type].fragmentOffsetX), this.y + random(enemyData[this.type].fragmentOffsetY * -1,enemyData[this.type].fragmentOffsetY), this.magnification, false));
      }
    }
  }

  dropLoot(){
    player.money += enemyData[this.type].moneyDrop;
    for (l = 0; l < enemyData[this.type].loot.length; l++){
      pickups.push(new Pickup(enemyData[this.type].loot[l],this.x, this.y));
    }
  }

  dropChests(){
    for (c = 0; c < enemyData[this.type].chestDrops.length; c++){
      chests.push(new Chest(enemyData[this.type].chestDrops[c], this.x - 16, this.y - 8))
    }
  }
}

function getEnemySpawnPosition(){
  

  enemyStuckInBox = true;
  
  while (enemyStuckInBox) {
    enemyStuckInBox = false;
    angle = random(0,6.28318);
    enemySpawnOffsetX = cos(angle) * enemySpawnDistance;
    enemySpawnOffsetY = sin(angle) * enemySpawnDistance;
    //hitbox for enemy spawning is 32x32
    for (b = 0; b < walls.length; b++){
      if (detect2BoxesCollision({x: player.x + enemySpawnOffsetX - 16, y: player.y + enemySpawnOffsetY - 16, w: 32, h: 32},walls[b])){
        enemyStuckInBox = true;
      }
    }
  }
}

function spawnEnemiesAroundPlayer(spawn){

  if (typeof(spawns[currentLevel][spawn]) != "undefined"){
    for (e = 0; e < spawns[currentLevel][spawn].length; e++){
      enemySpawnOffsetX = 0;
      enemySpawnOffsetY = 0;
      getEnemySpawnPosition();
      enemyQueue.push(new Enemy(spawns[currentLevel][spawn][e], player.x + enemySpawnOffsetX, player.y + enemySpawnOffsetY, 1))
    }
  } else {
    for (e = 0; e < spawns[currentLevel][spawns[currentLevel].length - 1].length; e++){
      enemySpawnOffsetX = 0;
      enemySpawnOffsetY = 0;
      getEnemySpawnPosition();
      enemyQueue.push(new Enemy(spawns[currentLevel][spawns[currentLevel].length - 1][e], player.x + enemySpawnOffsetX, player.y + enemySpawnOffsetY, 1))
    }
  }
  
}



//a tile that spawns enemies when the player walks over it.
spawners = [];
class Spawner{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.triggered = false;
  }

  draw(){
    //only for debugging. spawners are invisible in game.
    var c = color(255,0,0)
    if (this.triggered === true){
      var c = color(0,0,255)
    }
    c.setAlpha(50)
    fill(c);
    noStroke();
    rect(this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
  }

  testForPlayer(){
    if (detect2BoxesCollision(player, this)){
      if (!this.triggered){
        spawnEnemiesAroundPlayer(spawnersTriggered);
      }
      spawnersTriggered += 1;
      this.triggered = true;
      return true;
    }
    return false;
  }
}

