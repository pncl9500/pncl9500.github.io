

itemData = {}

//effectonleftclick is what happens when you click on it in the inventory not on overworld

function loadItems(){
  itemData = {
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
        effectOnDeath: "none",
        visual: "circle",
      }
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
        effectOnDeath: "none",
        visual: "circle",
      }
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
        effectOnDeath: "makeWall",
        visual: "circle",
      }
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
        goesThroughEnemies: true,
        damageToEnemies: 250,
        visual: "circle",
      }
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
        goesThroughEnemies: false,
        damageToEnemies: 0,
        visual: "circle",
      }
    },
    medkit: {
      inventorySprite: loadImage('textures/items/inventory/medkit.png'),
      inventoryLeftClickFunctionName: "Left Click: Consume",
      name: "Medkit",
      effectOnLeftClick: "consume",
    },
    key: {
      inventorySprite: loadImage('textures/items/inventory/key.png'),
      inventoryLeftClickFunctionName: "",
      name: "Key",
      effectOnLeftClick: "none",
    },
  }  
}

