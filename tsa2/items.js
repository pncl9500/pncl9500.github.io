

itemData = {}

//effectonleftclick is what happens when you click on it in the inventory not on overworld

function loadItems(){
  itemData = {
    none: {
      inventorySprite: loadImage('textures/items/inventory/nothing_gun.png'),
      name: "None",
      effectOnLeftClick: "none",
      effectOnUse: "nothing",
      droppable: false,
    },
    pistol: {
      inventorySprite: loadImage('textures/items/inventory/pistol.png'),
      name: "Pistol",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "semiautomatic",
      fireRate: 20,
      inaccuracy: 0.06,
      recoil: 0.7,
      bulletProperties: {
        speed: 7,
        friction: 0.99,
        acceleration: 0,
        lifeTime: 55,
        size: 4,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 1,
        damageToTerrain: 2,
        goesThroughEnemies: false,
        damageToEnemies: 1,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    grenadelauncher: {
      inventorySprite: loadImage('textures/items/inventory/grenadelauncher.png'),
      name: "Grenade Launcher",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "semiautomatic",
      fireRate: 60,
      inaccuracy: 0.06,
      recoil: 0.9,
      bulletProperties: {
        speed: 8,
        friction: 0.97,
        acceleration: 0,
        lifeTime: 45,
        size: 7,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 1,
        damageToTerrain: 2,
        goesThroughEnemies: false,
        damageToEnemies: 1,
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
          size: 64,
          pal: {
            r: 255,
            g: 125,
            b: 0,
          },
          damagesTerrain: true,
          goesThroughTerrain: true,
          destructionLevel: 6,
          damageToTerrain: 40,
          goesThroughEnemies: true,
          damageToEnemies: 3,
          goesThroughPlayer: true,
          damageToPlayer: 35,
          effectOnDeath: "none",
          shakeXOnDeath: 0,
          shakeYOnDeath: 0,
          visual: "circle",
        },
        visual: "circle",
      },
      droppable: true,
    },
    sniper: {
      inventorySprite: loadImage('textures/items/inventory/sniper.png'),
      name: "Sniper Rifle",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "semiautomatic",
      fireRate: 80,
      inaccuracy: 0.002,
      recoil: 1.1,
      bulletProperties: {
        speed: 13,
        friction: 0.993,
        acceleration: 0,
        lifeTime: 80,
        size: 6,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 3,
        damageToTerrain: 5,
        goesThroughEnemies: false,
        damageToEnemies: 24,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    smg: {
      inventorySprite: loadImage('textures/items/inventory/smg.png'),
      name: "SMG",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "automatic",
      fireRate: 9,
      inaccuracy: 0.1,
      recoil: 0.6,
      bulletProperties: {
        speed: 7.5,
        friction: 0.99,
        acceleration: 0,
        lifeTime: 50,
        size: 4,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 1,
        damageToTerrain: 2,
        goesThroughEnemies: false,
        damageToEnemies: 1,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    minigun: {
      inventorySprite: loadImage('textures/items/inventory/minigun.png'),
      name: "Minigun",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "automatic",
      fireRate: 0,
      inaccuracy: 0.05,
      recoil: 0.5,
      bulletProperties: {
        speed: 9,
        friction: 0.99,
        acceleration: 0,
        lifeTime: 90,
        size: 3.5,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 2,
        damageToTerrain: 2,
        goesThroughEnemies: false,
        damageToEnemies: 3,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    nothing_gun: {
      inventorySprite: loadImage('textures/items/inventory/nothing_gun.png'),
      name: "Nothing Gun",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "semiautomatic",
      fireRate: 10,
      inaccuracy: 0.1,
      recoil: 1,
      bulletProperties: {
        speed: 6,
        friction: 0.99,
        acceleration: 0,
        lifeTime: 40,
        size: 4,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 1,
        damageToTerrain: 2,
        goesThroughEnemies: false,
        damageToEnemies: 1,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    excavator: {
      inventorySprite: loadImage('textures/items/inventory/excavator.png'),
      name: "Excavator",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "automatic",
      recoil: 0.2,
      fireRate: 1,
      inaccuracy: 0.3,
      bulletProperties: {
        speed: 7,
        friction: 0.96,
        acceleration: 0,
        lifeTime: 20,
        size: 10,
        pal: {
          r: 0,
          g: 0,
          b: 255,
        },
        damagesTerrain: true,
        goesThroughTerrain: false,
        destructionLevel: 8,
        damageToTerrain: 5,
        goesThroughEnemies: false,
        damageToEnemies: 1,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    solidifier: {
      inventorySprite: loadImage('textures/items/inventory/solidifier.png'),
      name: "Solidifier",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "semiautomatic",
      fireRate: 10,
      inaccuracy: 0,
      recoil: 3,
      bulletProperties: {
        speed: 5,
        friction: 0.97,
        acceleration: 0,
        lifeTime: 30,
        size: 16,
        pal: {
          r: 255,
          g: 80,
          b: 5,
        },
        damagesTerrain: false,
        goesThroughTerrain: false,
        destructionLevel: 0,
        damageToTerrain: 0,
        goesThroughEnemies: false,
        damageToEnemies: 0,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        effectOnDeath: "makeWall",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        visual: "circle",
      },
      droppable: true,
    },
    transportation_cannon:{
      inventorySprite: loadImage('textures/items/inventory/transportation_cannon.png'),
      name: "Omega Static Vortex Launcher",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "automatic",
      fireRate: 1,
      inaccuracy: 0,
      recoil: -5,
      bulletProperties: {
        speed: 0,
        friction: 1,
        acceleration: 0,
        lifeTime: 32,
        size: 256,
        pal: {
          r: 40,
          g: 0,
          b: 120,
        },
        damagesTerrain: true,
        goesThroughTerrain: true,
        destructionLevel: 100,
        damageToTerrain: 1000,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        goesThroughEnemies: true,
        damageToEnemies: 250,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        visual: "circle",
      },
      droppable: true,
    },
    gun_gun: {
      inventorySprite: loadImage('textures/items/inventory/gun_gun.png'),
      name: "THE HYPERDRIVE",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
      effectOnUse: "shoot",
      firePattern: "automatic",
      fireRate: 0,
      inaccuracy: 0,
      recoil: 3,
      bulletProperties: {
        speed: 0,
        friction: 1,
        acceleration: 0.4,
        lifeTime: 60,
        size: 4,
        pal: {
          r: 235,
          g: 0,
          b: 255,
        },
        damagesTerrain: false,
        goesThroughTerrain: true,
        destructionLevel: 0,
        damageToTerrain: 0,
        effectOnDeath: "none",
        shakeXOnDeath: 0,
        shakeYOnDeath: 0,
        goesThroughEnemies: false,
        damageToEnemies: 0,
        goesThroughPlayer: true,
        damageToPlayer: 0,
        visual: "circle",
      },
      droppable: true,
    },
    medkit: {
      inventorySprite: loadImage('textures/items/inventory/medkit.png'),
      inventoryLeftClickFunctionName: "Left Click: Consume",
      name: "Medkit",
      effectOnLeftClick: "consume",
      consumeEffect: "increaseHealth",
      consumeEffectAmount: 100,
      droppable: true,
    },
    key: {
      inventorySprite: loadImage('textures/items/inventory/key.png'),
      inventoryLeftClickFunctionName: "",
      name: "Key",
      effectOnLeftClick: "none",
      droppable: true,
    },
    kill: {
      inventorySprite: loadImage('textures/items/inventory/kill.png'),
      inventoryLeftClickFunctionName: "Left Click: Consume",
      name: "Kill All Enemies",
      effectOnLeftClick: "consume",
      consumeEffect: "killAllEnemies",
      droppable: true,
    },
    blackmarketteleport: {
      inventorySprite: loadImage('textures/items/inventory/blackmarketteleport.png'),
      inventoryLeftClickFunctionName: "Left Click: Consume",
      name: "Teleport To Black Market",
      effectOnLeftClick: "consume",
      consumeEffect: "blackMarketTeleport",
      droppable: true,
    },
    inventorycrystal: {
      inventorySprite: loadImage('textures/items/inventory/inventorycrystal.png'),
      inventoryLeftClickFunctionName: "Left Click: Consume",
      name: "Inventory Crystal",
      effectOnLeftClick: "consume",
      consumeEffect: "expandInventory",
      consumeEffectAmount: 1,
      droppable: true,
    },
    bomb: {
      inventorySprite: loadImage('textures/items/inventory/bomb.png'),
      inventoryLeftClickFunctionName: "Left Click: Deploy",
      name: "Bomb",
      effectOnLeftClick: "consume",
      consumeEffect: "spawnBullet",
      consumeBulletProperties: {
        speed: 0,
        friction: 0,
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
          size: 192,
          pal: {
            r: 255,
            g: 125,
            b: 0,
          },
          damagesTerrain: true,
          goesThroughTerrain: true,
          destructionLevel: 8,
          damageToTerrain: 50,
          goesThroughEnemies: true,
          damageToEnemies: 5,
          goesThroughPlayer: true,
          damageToPlayer: 50,
          effectOnDeath: "none",
          shakeXOnDeath: 0,
          shakeYOnDeath: 0,
          visual: "circle",
        },
        visual: "circle"
      },
      droppable: true,
    },
  }  
}

