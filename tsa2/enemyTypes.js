enemyData = {
  gray: {
    health: 5,
    speed: 1.2,
    damage: 10,
    w: 4,
    h: 4,
    pal: {
      r: 200,
      g: 200,
      b: 200,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 1,
  },
  red: {
    health: 10,
    speed: 1,
    damage: 10,
    w: 5,
    h: 5,
    pal: {
      r: 220,
      g: 0,
      b: 0,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 2,
  },
  yellow: {
    health: 4,
    speed: 2.2,
    damage: 14,
    w: 4,
    h: 4,
    pal: {
      r: 240,
      g: 240,
      b: 0,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 1,
  },
  blue: {
    health: 25,
    speed: 1,
    damage: 20,
    w: 7,
    h: 7,
    pal: {
      r: 40,
      g: 80,
      b: 255,
    },
    loot: [],
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 7,
    fragmentOffsetY: 7,
    fragmentSpawns: ["blue_small","blue_small","blue_small","blue_small","blue_small","blue_small"],
    chestDrops: [],
    moneyDrop: 3,
  },
  blue_small: {
    health: 3,
    speed: 2,
    damage: 12,
    w: 3,
    h: 3,
    pal: {
      r: 55,
      g: 95,
      b: 255,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 1,
  },
  pink: {
    health: 10,
    speed: 0.8,
    damage: 10,
    w: 4,
    h: 4,
    pal: {
      r: 235,
      g: 40,
      b: 240,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 1,
    spawnsBullet: true,
    fireRate: 120,
    bulletProperties: {
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
    },
  },
  green: {
    health: 15,
    speed: 0.8,
    damage: 10,
    w: 5,
    h: 5,
    pal: {
      r: 58,
      g: 171,
      b: 48,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 2,
    spawnsBullet: true,
    fireRate: 360,
    bulletProperties: {
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
    },
  },
  purple: {
    health: 15,
    speed: 1,
    damage: 10,
    w: 5,
    h: 5,
    pal: {
      r: 123,
      g: 33,
      b: 219,
    },
    loot: [],
    chestDrops: [],
    moneyDrop: 2,
    spawnsBullet: true,
    fireRate: 240,
    bulletProperties: {
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
    },
  },
  geode_1: {
    health: 40,
    speed: 0.8,
    damage: 30,
    w: 32,
    h: 32,
    pal: {
      r: 40,
      g: 40,
      b: 40,
    },
    loot: ["inventorycrystal"],
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 0,
    fragmentOffsetY: 0,
    fragmentSpawns: ["geode_2"],
    chestDrops: [],
    moneyDrop: 0,
  },
  geode_2: {
    health: 30,
    speed: 1.2,
    damage: 30,
    w: 24,
    h: 24,
    pal: {
      r: 110,
      g: 110,
      b: 110,
    },
    loot: ["inventorycrystal"],
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 0,
    fragmentOffsetY: 0,
    fragmentSpawns: ["geode_3"],
    chestDrops: [],
    moneyDrop: 0,
  },
  geode_3: {
    health: 25,
    speed: 2,
    damage: 25,
    w: 16,
    h: 16,
    pal: {
      r: 180,
      g: 180,
      b: 180,
    },
    loot: ["inventorycrystal"],
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 0,
    fragmentOffsetY: 0,
    fragmentSpawns: ["geode_4"],
    chestDrops: [],
    moneyDrop: 0,
  },
  geode_4: {
    health: 10,
    speed: 4.7,
    damage: 16,
    w: 8,
    h: 8,
    pal: {
      r: 195,
      g: 100,
      b: 255,
    },
    loot: ["inventorycrystal"],
    chestDrops: ["geode"],
    moneyDrop: 50,
  }
}