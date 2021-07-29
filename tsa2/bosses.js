bosses = [];

class Boss{
  constructor(x, y){
    this.x = x;
    this.x = y;
    this.angle = 180;
    
  }

  doDamageAnimation(){
    //die if health is 0 or lower
    if (this.health < 1){
      this.dead = true;
      this.doDeathSpawns();
    }
  }

  updateHitBox(){
    this.hitbox = {
      x: this.x + this.hitboxReduction/2,
      y: this.y + this.hitboxReduction/2,
      w: this.w - this.hitboxReduction,
      h: this.h - this.hitboxReduction,
    }
  }

  draw(){

    angleMode(DEGREES);
    //make collision box thing idk
    this.updateHitBox();
    this.doAction();

    
    //this.angle += Math.sin(frameCount/10) * 20;
    //this.hitboxReduction += Math.sin(frameCount/50) * 0.5;
    //i do not know why this happens, but imageMode corner and imageMode center behave like the opposite of eachother
    //when rendering bosses
    imageMode(CORNER);
    translate((this.x - cam.x + cam.offsetX + this.w/2), (this.y - cam.y + cam.offsetY) + this.h/2);
    rotate(this.angle);
    translate((this.x - cam.x + cam.offsetX + this.w/2) * -1, (this.y - cam.y + cam.offsetY + this.h/2) * -1);
    image(bossSprites[this.bossType][this.sprite], this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
    translate((this.x - cam.x + cam.offsetX + this.w/2), (this.y - cam.y + cam.offsetY + this.h/2));
    rotate(this.angle * -1);
    translate((this.x - cam.x + cam.offsetX + this.w/2) * -1, (this.y - cam.y + cam.offsetY + this.h/2) * -1);
    angleMode(RADIANS);


    rectMode(CORNER)
    //same weird rectMode even though it isn't even translated by the boss renderer wtf
    //draw the bounding box (debug)
    // stroke(255,0,0)
    // strokeWeight(2);
    // noFill();
    // rect(this.hitbox.x - cam.x + cam.offsetX, this.hitbox.y - cam.y + cam.offsetY, this.hitbox.w, this.hitbox.h);
    // line(this.hitbox.x - cam.x + cam.offsetX + this.w/2 - this.hitboxReduction/2, this.hitbox.y - cam.y + cam.offsetY + this.h/2 - this.hitboxReduction/2, player.x - cam.x + cam.offsetX + player.w/2, player.y - cam.y + cam.offsetY + player.h/2)

    //collide with player and do damage
    if (player.iFrames <= 0 && detect2BoxesCollision(this.hitbox, player)){
      doDamageToPlayer(this.contactDamage);
    }


  }

  pointTowardsPlayer(offset){
    this.vectorX = (this.hitbox.x + this.w/2 - this.hitboxReduction/2) - (player.x + player.w/2);
    this.vectorY = (this.hitbox.y + this.h/2 - this.hitboxReduction/2) - (player.y + player.h/2);
    this.angle = (Math.atan2(this.vectorY, this.vectorX)) * 180/Math.PI - 90;
    this.angle += offset;
  }

}

function loadBossSprites(){
  bossSprites = {
    sewerMutant: {
      idle: loadImage("textures/bosses/sewermutant/idle.png")
    }
  }
}

class Boss_SewerMutant extends Boss{
  constructor(x, y){
    super(x, y);
    this.x = x;
    this.y = y;
    this.w = 72;
    this.h = 72;
    this.contactDamage = Math.ceil(max(1, Math.log(player.maxHealth)*5 + 10));
    this.maxHealth = 300;
    this.health = this.maxHealth;
    this.dead = false;
    //a number that maxes the hitbox of the boss smaller. more number is more small
    this.hitboxReduction = 16;
    this.hitbox = {
      x: this.x + this.hitboxReduction/2,
      y: this.y + this.hitboxReduction/2,
      w: this.w - this.hitboxReduction,
      h: this.h - this.hitboxReduction,
    }
    this.bossType = "sewerMutant";
    this.sprite = "idle";

    this.state = "waiting";
    this.stateTimer = 0;

    this.xv = 0;
    this.yv = 0;
    this.previousAttack = 0;
  }


  doAction(){
    this.stateTimer += 1;
    switch (this.state) {
      case "waiting":
        this.sprite = "idle"
        this.vectorX = (this.hitbox.x + this.w/2 - this.hitboxReduction/2) - (player.x + player.w/2);
        this.vectorY = (this.hitbox.y + this.h/2 - this.hitboxReduction/2) - (player.y + player.h/2);
        this.pointTowardsPlayer(0);
        if (Math.sqrt((Math.pow(this.vectorX, 2)) + Math.pow(this.vectorY, 2)) < 240 || this.health < this.maxHealth){
          this.state = "waitScream";
          this.stateTimer = 0;
        }
        break;
      case "waitScream":
        if (this.stateTimer > 80){
          this.state = "pause";
          this.stateTimer = 0;
        }
        break;
      case "pause":
        if (this.stateTimer > 40){
          this.pointTowardsPlayer(0);
          this.xv = -30 * Math.cos((this.angle + 90) * Math.PI/180);
          this.yv = -30 * Math.sin((this.angle + 90) * Math.PI/180);
          this.attack = floor(random(0,5))
          while (this.attack === this.previousAttack) {
            this.attack = floor(random(0,5));
          }
          switch (this.attack) {
            case 0:
              this.state = "summon"
              break;
            case 1:
              this.state = "rush"
              break;
            case 2:
              this.state = "fireball"
              break;
            case 3:
              this.state = "spray"
              break;
            case 4:
              this.state = "bomb"
              break;
            default:
              break;
          }
          this.previousAttack = this.attack;
          this.stateTimer = 0;
        }
        break;
      case "bomb":
        this.pointTowardsPlayer(0);
        if (this.stateTimer > 50){
          
          this.state = "pause";
          this.stateTimer = 0;
          bullets.push(new Bullet(this.x + this.w/2, this.y + this.h/2, (this.angle + 90) * Math.PI/180,{
            speed: 5,
            friction: 0.98,
            acceleration: 0,
            lifeTime: 240,
            size: 8,
            pal: {
              r: 8,
              g: 8,
              b: 12,
            },
            damagesTerrain: false,
            goesThroughTerrain: true,
            destructionLevel: 0,
            damageToTerrain: 0,
            goesThroughEnemies: true,
            damageToEnemies: 0,
            goesThroughPlayer: true,
            damageToPlayer: 0,
            effectOnDeath: "spawnBullet",
            shakeXOnDeath: 10,
            shakeYOnDeath: 10,
            spawnedBulletProperties: {
              speed: 0,
              friction: 0,
              acceleration: 0,
              lifeTime: 8,
              size: 160,
              pal: {
                r: 125,
                g: 255,
                b: 0,
              },
              damagesTerrain: true,
              goesThroughTerrain: true,
              destructionLevel: 6,
              damageToTerrain: 50,
              goesThroughEnemies: true,
              damageToEnemies: 0,
              goesThroughPlayer: true,
              damageToPlayer: this.contactDamage * 2,
              effectOnDeath: "none",
              shakeXOnDeath: 0,
              shakeYOnDeath: 0,
              visual: "circle",
            },
            visual: "circle"
          }))
          console.log(bullets[bullets.length - 1]);
        }
        break;
      case "summon":
        if (this.stateTimer > 40){
          enemyQueue.push(new Enemy_green(this.x + this.w/2, this.y + this.h/2, 0.5, false))
          this.state = "pause";
          this.stateTimer = 0;
        }
        break;
      case "rush":
        if (this.stateTimer > 30){
          this.xv = -30 * Math.cos((this.angle + 90) * Math.PI/180);
          this.yv = -30 * Math.sin((this.angle + 90) * Math.PI/180);
          this.state = "rushMovement";
          this.stateTimer = 0;
        }
        break;
      case "rushMovement":
        this.xv *= 0.9;
        this.x += this.xv;
        this.updateHitBox();
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision(this.hitbox, walls[w])){
            this.x -= this.xv;
            this.updateHitBox();
            this.xv *= -1;
          }
        }
        this.yv *= 0.9;
        this.y += this.yv;
        this.updateHitBox();
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision(this.hitbox, walls[w])){
            this.y -= this.yv;
            this.updateHitBox();
            this.yv *= -1;
          }
        }
        if (this.stateTimer > 50){
          this.state = "pause";
          this.stateTimer = 0;
        }
        break;
      case "fireball":
        this.pointTowardsPlayer(0);
        if (this.stateTimer > 7){
          this.state = "shootFireballs";
          this.stateTimer = 0;
        }
        break;
      case "shootFireballs":
        this.pointTowardsPlayer(0);
        if (this.stateTimer % 20 === 1){
          for (var i = -1; i < 2; i++){
            bullets.push(new Bullet(this.x + this.w/2, this.y + this.h/2, (this.angle + 90 + i*20) * Math.PI/180,{
              speed: 6,
              friction: 1,
              acceleration: 0.2,
              lifeTime: 240,
              size: 24,
              pal: {
                r: 200,
                g: 255,
                b: 0,
              },
              damagesTerrain: true,
              goesThroughTerrain: true,
              destructionLevel: 3,
              damageToTerrain: 5,
              goesThroughEnemies: true,
              damageToEnemies: 0,
              lifeTimeLossOnEnemyContact: 0,
              goesThroughPlayer: true,
              damageToPlayer: this.contactDamage,
              effectOnDeath: "none",
              shakeXOnDeath: 0,
              shakeYOnDeath: 0,
              visual: "circle",
            }))
          }
        }
          
        if (this.stateTimer > 60){
          this.state = "pause";
          this.stateTimer = 0;
        }
        break;
      case "spray":
        this.pointTowardsPlayer(0);
        if (this.stateTimer > 10){
          this.state = "shootSpray";
          this.stateTimer = 0;
          this.xv = 0;
          this.yv = 0;
        }
        break;
      case "shootSpray":
        this.pointTowardsPlayer(0);
        if (this.stateTimer % 4 === 1){
          bullets.push(new Bullet(this.x + this.w/2, this.y + this.h/2, (this.angle + random(-20,20) + 90) * Math.PI/180,{
            speed: random(8,20),
            friction: 0.91,
            acceleration: 0,
            lifeTime: 60,
            size: 30,
            pal: {
              r: 60,
              g: 190,
              b: 0,
            },
            damagesTerrain: true,
            goesThroughTerrain: true,
            destructionLevel: 3,
            damageToTerrain: 5,
            goesThroughEnemies: true,
            damageToEnemies: 0,
            lifeTimeLossOnEnemyContact: 0,
            goesThroughPlayer: true,
            damageToPlayer: 0,
            effectOnDeath: "none",
            statusEffect: "weaken",
            statusEffectTimer: 140,
            shakeXOnDeath: 0,
            shakeYOnDeath: 0,
            visual: "circle",
          }));
        }
        this.xv += -0.05 * Math.cos((this.angle + 90) * Math.PI/180);
        this.yv += -0.05 * Math.sin((this.angle + 90) * Math.PI/180);
        this.xv *= 0.98;
        this.yv *= 0.98;
        this.x += this.xv;
        this.updateHitBox();
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision(this.hitbox, walls[w])){
            this.x -= this.xv;
            this.updateHitBox();
            this.xv *= -1;
          }
        }
        this.yv *= 0.992;
        this.y += this.yv;
        this.updateHitBox();
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision(this.hitbox, walls[w])){
            this.y -= this.yv;
            this.updateHitBox();
            this.yv *= -1;
          }
        }
        if (this.stateTimer > 120){
          this.state = "sprayGlide";
          this.stateTimer = 0;
        }
        break;
      case "sprayGlide":
        this.xv *= 0.97;
        this.yv *= 0.97;
        this.x += this.xv;
        this.updateHitBox();
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision(this.hitbox, walls[w])){
            this.x -= this.xv;
            this.updateHitBox();
            this.xv *= -1;
          }
        }
        this.yv *= 0.992;
        this.y += this.yv;
        this.updateHitBox();
        for (w = 0; w < walls.length; w++){
          if (detect2BoxesCollision(this.hitbox, walls[w])){
            this.y -= this.yv;
            this.updateHitBox();
            this.yv *= -1;
          }
        }
        if (this.stateTimer > 60){
          this.state = "pause";
          this.stateTimer = 0;
        }
        break;
      default:
        break;
    }
  }

  doDeathSpawns(){
    player.money += 25;
    holes.push(new Hole(gameMap.w/2, gameMap.h/2 - 160, "blackMarket"));
    cam.shakeX += 30;
    cam.shakeY += 30;
  }
}