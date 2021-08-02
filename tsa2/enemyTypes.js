

class Enemy_gray extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 5;
    this.speed = 1.2;
    this.damage = 10;
    this.w = 4;
    this.h = 4;
    this.pal = {
      r: 200,
      g: 200,
      b: 200,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("gray", Enemy_gray);
class Enemy_red extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 10;
    this.speed = 1;
    this.damage = 10;
    this.w = 5;
    this.h = 5;
    this.pal = {
      r: 220,
      g: 0,
      b: 0,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 2;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("red", Enemy_red);

class Enemy_yellow extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 4;
    this.speed = 2.2;
    this.damage = 14;
    this.w = 4;
    this.h = 4;
    this.pal = {
      r: 240,
      g: 240,
      b: 0,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("yellow", Enemy_yellow);

class Enemy_blue extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 25;
    this.speed = 1;
    this.damage = 20;
    this.w = 7;
    this.h = 7;
    this.pal = {
      r: 70,
      g: 110,
      b: 255,
    };
    this.loot = [];
    //enemies that spawn on the death of the enemy
    this.spawnsFragmentsOnDeath = true;
    this.fragmentOffsetX = 7;
    this.fragmentOffsetY = 7;
    this.fragmentSpawns = ["blue_small","blue_small","blue_small","blue_small","blue_small","blue_small"];
    this.chestDrops = [];
    this.moneyDrop = 3;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("blue", Enemy_blue);

class Enemy_blue_small extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 3;
    this.speed = 2;
    this.damage = 12;
    this.w = 3;
    this.h = 3;
    this.pal = {
      r: 80,
      g: 120,
      b: 255,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("blue_small", Enemy_blue_small);

class Enemy_pink extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 10;
    this.speed = 0.8;
    this.damage = 10;
    this.w = 4;
    this.h = 4;
    this.pal = {
      r: 235,
      g: 40,
      b: 240,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = true;
    this.fireRate = 120;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    var vectorX = this.x - (player.x + player.w/2);
    var vectorY = this.y - (player.y + player.h/2);
    bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), {
      speed: 6,
      friction: 1,
      acceleration: 0,
      lifeTime: 170,
      size: 4,
      pal: {
        r: 235,
        g: 40,
        b: 240,
      },
      damagesTerrain: true,
      goesThroughTerrain: false,
      destructionLevel: 3,
      damageToTerrain: 5,
      goesThroughEnemies: true,
      damageToEnemies: 0,
      goesThroughPlayer: false,
      damageToPlayer: 15,
      effectOnDeath: "none",
      shakeXOnDeath: 0,
      shakeYOnDeath: 0,
      visual: "circle",
    }));
  }
}
enemyOfColor.set("pink", Enemy_pink);

class Enemy_green extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 15;
    this.speed = 0.8;
    this.damage = 10;
    this.w = 5;
    this.h = 5;
    this.pal = {
      r: 68,
      g: 181,
      b: 48,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 2;
    this.spawnsBullet = true;
    this.fireRate = 240;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    var vectorX = this.x - (player.x + player.w/2);
    var vectorY = this.y - (player.y + player.h/2);
    //big bubble
    bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), {
      speed: 6,
      friction: 0.95,
      acceleration: 0,
      lifeTime: 360,
      size: 72,
      pal: {
        r: 68,
        g: 181,
        b: 58,
      },
      damagesTerrain: false,
      goesThroughTerrain: true,
      destructionLevel: 0,
      damageToTerrain: 0,
      goesThroughEnemies: true,
      damageToEnemies: 0,
      goesThroughPlayer: true,
      damageToPlayer: 0,
      effectOnDeath: "none",
      shakeXOnDeath: 0,
      shakeYOnDeath: 0,
      visual: "circle",
      statusEffect: "weaken",
      statusEffectTimer: 240,
    }));
    //lil bubble
    bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), {
      speed: 6,
      friction: 0.944,
      acceleration: 0,
      lifeTime: 360,
      size: 36,
      pal: {
        r: 88,
        g: 191,
        b: 58,
      },
      damagesTerrain: false,
      goesThroughTerrain: true,
      destructionLevel: 0,
      damageToTerrain: 0,
      goesThroughEnemies: true,
      damageToEnemies: 0,
      goesThroughPlayer: true,
      damageToPlayer: 10,
      effectOnDeath: "none",
      shakeXOnDeath: 0,
      shakeYOnDeath: 0,
      visual: "circle",
      statusEffect: "weaken",
      statusEffectTimer: 360,
    }));
  }
}
enemyOfColor.set("green", Enemy_green);

class Enemy_purple extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 15;
    this.speed = 1;
    this.damage = 10;
    this.w = 5;
    this.h = 5;
    this.pal = {
      r: 140,
      g: 90,
      b: 255,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 2;
    this.spawnsBullet = true;
    this.fireRate = 240;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    var vectorX = this.x - (player.x + player.w/2);
    var vectorY = this.y - (player.y + player.h/2);
    bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), {
      speed: 0,
      friction: 0,
      acceleration: 0,
      lifeTime: 10,
      size: 160,
      pal: {
        r: 205,
        g: 158,
        b: 255,
      },
      damagesTerrain: false,
      goesThroughTerrain: true,
      destructionLevel: 0,
      damageToTerrain: 0,
      goesThroughEnemies: true,
      damageToEnemies: 0,
      goesThroughPlayer: true,
      damageToPlayer: 0,
      effectOnDeath: "none",
      shakeXOnDeath: 0,
      shakeYOnDeath: 0,
      visual: "circle",
      statusEffect: "disable",
      statusEffectTimer: 120,
    }));
  }
}
enemyOfColor.set("purple", Enemy_purple);

class Enemy_tan extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 8;
    this.speed = 1.1;
    this.damage = 10;
    this.w = 4;
    this.h = 4;
    this.pal = {
      r: 235,
      g: 200,
      b: 140,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = true;
    this.fireRate = 240;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    var vectorX = this.x - (player.x + player.w/2);
    var vectorY = this.y - (player.y + player.h/2);
    for (i = -2; i < 3; i++){
      bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX) + i * 0.15, {
        speed: 3,
        friction: 1,
        acceleration: 0,
        lifeTime: 170,
        size: 5,
        pal: {
          r: 160,
          g: 110,
          b: 60,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 3,
        damageToTerrain: 5,
        goesThroughEnemies: true,
        damageToEnemies: 0,
        goesThroughPlayer: false,
        damageToPlayer: 15,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      }));
    }
  }
}
enemyOfColor.set("tan", Enemy_tan);

class Enemy_navy extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 5;
    this.speed = 0;
    this.damage = 12;
    this.w = 4;
    this.h = 4;
    this.pal = {
      r: 0,
      g: 50,
      b: 120,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    //doesn't actually spawn a bullet
    this.spawnsBullet = true;
    this.fireRate = 60;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    this.direction = Math.atan2(player.y + player.h/2 - this.y, player.x + player.w/2 - this.x);
    this.speed = 0.9;
  }

  move(){
    this.speed *= 0.96;
    //this.direction = Math.atan2(player.y + player.h/2 - this.y, player.x + player.w/2 - this.x);
    //collision with walls (X)
    this.x += cos(this.direction) * this.speed * enemySpeedMagnitude;
    for (w = 0; w < walls.length; w++){
      if (detect2BoxesCollision({x: this.x - this.w/2, y: this.y - this.h/2, w: this.w, h: this.h}, walls[w])){
        this.x -= cos(this.direction) * this.speed * enemySpeedMagnitude;
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
      doDamageToPlayer(this.damage);
    }
  }
}
enemyOfColor.set("navy", Enemy_navy);

class Enemy_mustard extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 28;
    this.speed = 0.8;
    this.damage = 12;
    this.w = 12;
    this.h = 12;
    this.pal = {
      r: 160,
      g: 160,
      b: 20,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 2;
    this.spawnsBullet = true;
    this.fireRate = 240;
    this.enemiesSpawned = 0;
    this.spawnsFragmentsOnDeath = true;
    this.fragmentOffsetX = 8;
    this.fragmentOffsetY = 8;
    this.fragmentSpawns = ["yellow","yellow","yellow"];

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    if (this.enemiesSpawned < 20){
      this.enemiesSpawned += 1;
      enemyFragmentQueue.push(new Enemy_yellow(this.x, this.y, 0.8, false));
    }
    
  }
}
enemyOfColor.set("mustard", Enemy_mustard);



class Enemy_geode_1 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 100;
    this.speed = 0.8;
    this.damage = 30;
    this.w = 32;
    this.h = 32;
    this.pal = {
      r: 40,
      g: 40,
      b: 40,
    };
    this.loot = ["inventorycrystal"];
    this.chestDrops = [];
    this.moneyDrop = 0;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = true;
    this.fragmentOffsetX = 0;
    this.fragmentOffsetY = 0;
    this.fragmentSpawns = ["geode_2"];

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("geode_1", Enemy_geode_1);

class Enemy_geode_2 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 70;
    this.speed = 1.2;
    this.damage = 30;
    this.w = 24;
    this.h = 24;
    this.pal = {
      r: 110,
      g: 110,
      b: 110,
    };
    this.loot = ["inventorycrystal"];
    this.chestDrops = [];
    this.moneyDrop = 0;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = true;
    this.fragmentOffsetX = 0;
    this.fragmentOffsetY = 0;
    this.fragmentSpawns = ["geode_3"];

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("geode_2", Enemy_geode_2);

class Enemy_geode_3 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 40;
    this.speed = 2;
    this.damage = 25;
    this.w = 16;
    this.h = 16;
    this.pal = {
      r: 180,
      g: 180,
      b: 180,
    };
    this.loot = ["inventorycrystal"];
    this.chestDrops = [];
    this.moneyDrop = 0;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = true;
    this.fragmentOffsetX = 0;
    this.fragmentOffsetY = 0;
    this.fragmentSpawns = ["geode_4"];

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("geode_3", Enemy_geode_3);

class Enemy_geode_4 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 15;
    this.speed = 4.8;
    this.damage = 16;
    this.w = 8;
    this.h = 8;
    this.pal = {
      r: 195,
      g: 100,
      b: 255,
    };
    this.loot = ["inventorycrystal"];
    this.chestDrops = ["geode"];
    this.moneyDrop = 50;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
enemyOfColor.set("geode_4", Enemy_geode_4);

class Enemy_dijon extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 175;
    this.speed = 3;
    this.damage = 10;
    this.w = 24;
    this.h = 24;
    this.pal = {
      r: 225,
      g: 200,
      b: 115,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 50;
    this.spawnsBullet = true;
    this.spawnsFragmentsOnDeath = false;
    this.fireRate = 60;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    this.rng = floor(random(0, 3));
    switch (this.rng) {
      case 0:
        enemyFragmentQueue.push(new Enemy_yellow(this.x, this.y, 0.8, false));
        break;
      case 1:
        enemyFragmentQueue.push(new Enemy_mustard(this.x, this.y, 0.6, false));
        break;
      case 2:
        enemyFragmentQueue.push(new Enemy_navy(this.x, this.y, 0.8, false));
        break;
      default:
        break;
    }
  }
}
enemyOfColor.set("dijon", Enemy_dijon);


class Enemy_orange extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 4;
    this.speed = 2.3;
    this.damage = 10;
    this.w = 4;
    this.h = 4;
    this.pal = {
      //OK SO LISTEN i know that it seems like "ooh whoever wrote this code thought that 255 divided by 2 is
      //125 BUT ITS NOT TRUE i just ROUNDED 127.5 DOWN TO 125 BECAUSE IT LOOKS NICER
      r: 255,
      g: 125,
      b: 0,
    };
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = true;
    this.fireRate = 6;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    var vectorX = this.x - (player.x + player.w/2);
    var vectorY = this.y - (player.y + player.h/2);
    bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), {
      speed: 0,
      friction: 1,
      acceleration: 0,
      lifeTime: 340,
      size: 6,
      pal: {
        r: 255,
        g: 125,
        b: 0,
      },
      damagesTerrain: false,
      goesThroughTerrain: true,
      destructionLevel: 3,
      damageToTerrain: 5,
      goesThroughEnemies: true,
      damageToEnemies: 0,
      goesThroughPlayer: true,
      damageToPlayer: 10,
      effectOnDeath: "none",
      shakeXOnDeath: 0,
      shakeYOnDeath: 0,
      visual: "circle",
    }));
  }
}
enemyOfColor.set("orange", Enemy_orange);