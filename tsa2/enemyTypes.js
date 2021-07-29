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
    },
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
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
    },
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 2;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}

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
    },
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}

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
      r: 40,
      g: 80,
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
      r: 55,
      g: 95,
      b: 255,
    },
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 1;
    this.spawnsBullet = false;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}

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
    },
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
    }))
  }
}

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
    },
    this.loot = [];
    this.chestDrops = [];
    this.moneyDrop = 2;
    this.spawnsBullet = true;
    this.fireRate = 360;

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    var vectorX = this.x - (player.x + player.w/2);
    var vectorY = this.y - (player.y + player.h/2);
    bullets.push(new Bullet(this.x, this.y, Math.atan2(vectorY, vectorX), {
      speed: 6,
      friction: 0.95,
      acceleration: 0,
      lifeTime: 360,
      size: 48,
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
    }))
  }
}

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
      r: 123,
      g: 33,
      b: 219,
    },
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
    }))
  }
}

class Enemy_geode_1 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 40;
    this.speed = 0.8;
    this.damage = 30;
    this.w = 32;
    this.h = 32;
    this.pal = {
      r: 40,
      g: 40,
      b: 40,
    },
    this.loot = ["inventorycrystal"];
    this.chestDrops = [];
    this.moneyDrop = 0;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = true,
    this.fragmentOffsetX = 0,
    this.fragmentOffsetY = 0,
    this.fragmentSpawns = ["geode_2"],

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}

class Enemy_geode_2 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 30;
    this.speed = 1.2;
    this.damage = 30;
    this.w = 24;
    this.h = 24;
    this.pal = {
      r: 110,
      g: 110,
      b: 110,
    },
    this.loot = ["inventorycrystal"];
    this.chestDrops = [];
    this.moneyDrop = 0;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = true,
    this.fragmentOffsetX = 0,
    this.fragmentOffsetY = 0,
    this.fragmentSpawns = ["geode_3"],

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}

class Enemy_geode_3 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 25;
    this.speed = 2;
    this.damage = 25;
    this.w = 16;
    this.h = 16;
    this.pal = {
      r: 180,
      g: 180,
      b: 180,
    },
    this.loot = ["inventorycrystal"];
    this.chestDrops = [];
    this.moneyDrop = 0;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = true,
    this.fragmentOffsetX = 0,
    this.fragmentOffsetY = 0,
    this.fragmentSpawns = ["geode_4"],

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}

class Enemy_geode_4 extends Enemy {
  constructor(x, y, magnification, doSpawnAnimation){
    super(x, y, magnification, doSpawnAnimation);
    //enemy specific stuff
    this.health = 10;
    this.speed = 4.7;
    this.damage = 16;
    this.w = 8;
    this.h = 8;
    this.pal = {
      r: 195,
      g: 100,
      b: 255,
    },
    this.loot = ["inventorycrystal"];
    this.chestDrops = ["geode"];
    this.moneyDrop = 50;
    this.spawnsBullet = false;
    this.spawnsFragmentsOnDeath = false,

    this.setAttributes(x, y, magnification, doSpawnAnimation);
  }

  doBulletSpawn(){
    
  }
}
