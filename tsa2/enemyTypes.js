enemyData = {
  gray: {
    health: 6,
    speed: 1.2,
    damage: 10,
    w: 4,
    h: 4,
    pal: {
      r: 200,
      g: 200,
      b: 200,
    }
  },
  red: {
    health: 16,
    speed: 1,
    damage: 10,
    w: 5,
    h: 5,
    pal: {
      r: 220,
      g: 0,
      b: 0,
    }
  },
  yellow: {
    health: 5,
    speed: 2.2,
    damage: 14,
    w: 4,
    h: 4,
    pal: {
      r: 240,
      g: 240,
      b: 0,
    }
  },
  blue: {
    health: 28,
    speed: 1,
    damage: 20,
    w: 7,
    h: 7,
    pal: {
      r: 40,
      g: 80,
      b: 255,
    },
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 7,
    fragmentOffsetY: 7,
    fragmentSpawns: ["blue_small","blue_small","blue_small","blue_small","blue_small","blue_small"]
  },
  blue_small: {
    health: 5,
    speed: 2,
    damage: 12,
    w: 3,
    h: 3,
    pal: {
      r: 55,
      g: 95,
      b: 255,
    }
  },
  pink: {
    health: 16,
    speed: 0.4,
    damage: 10,
    w: 4,
    h: 4,
    pal: {
      r: 235,
      g: 40,
      b: 240,
    }
  },
  green: {
    health: 26,
    speed: 0.8,
    damage: 10,
    w: 5,
    h: 5,
    pal: {
      r: 58,
      g: 171,
      b: 48,
    }
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
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 0,
    fragmentOffsetY: 0,
    fragmentSpawns: ["geode_2"]
  },
  geode_2: {
    health: 30,
    speed: 1.1,
    damage: 30,
    w: 24,
    h: 24,
    pal: {
      r: 110,
      g: 110,
      b: 110,
    },
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 0,
    fragmentOffsetY: 0,
    fragmentSpawns: ["geode_3"]
  },
  geode_3: {
    health: 20,
    speed: 1.7,
    damage: 25,
    w: 16,
    h: 16,
    pal: {
      r: 180,
      g: 180,
      b: 180,
    },
    //enemies that spawn on the death of the enemy
    spawnsFragmentsOnDeath: true,
    fragmentOffsetX: 0,
    fragmentOffsetY: 0,
    fragmentSpawns: ["geode_4"]
  },
  geode_4: {
    health: 5,
    speed: 4,
    damage: 16,
    w: 8,
    h: 8,
    pal: {
      r: 195,
      g: 100,
      b: 255,
    },
  }
}