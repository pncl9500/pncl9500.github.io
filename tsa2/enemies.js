

enemies = [];
enemyQueue = [];
enemyQueueTick = 20;
enemyQueueTime = 35;

spawnersTriggered = 0;
currentLevel = 0;

enemySpawnDistance = 120;

class Enemy{
  constructor(type, x, y, magnification){
    this.type = type;
    this.spawnPointX = x;
    this.spawnPointY = y;
    this.x = x;
    this.y = y;
    this.magnification = magnification;

    this.health = floor(enemyData[this.type].health * this.magnification);
    this.damage = floor(enemyData[this.type].damage * this.magnification/5);
    this.speed = enemyData[this.type].speed;
    this.targetW = enemyData[this.type].w;
    this.targetH = enemyData[this.type].h;
    this.w = 1500;
    this.h = 1500;
    this.spawnAnimationSmoothing = 10;


    this.pal = enemyData[this.type].pal;
    this.alpha = -1500;
    this.targetAlpha = 255;

    this.strokeWeight = 15;
    this.targetStrokeWeight = 0;

    this.state = "spawning";
    this.spawnTimer = 80;
    
    
  }

  draw(){
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
        fill(this.pal.r, this.pal.g, this.pal.b);
        rect(this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
        break;
      default:
        break;
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
    for (b = 0; b < walls.length; b++){
      if (detect2BoxesCollision({x: player.x + enemySpawnOffsetX - 12, y: player.y + enemySpawnOffsetY - 12, w: 24, h: 24},walls[b])){
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

