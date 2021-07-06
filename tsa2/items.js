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
      fireRate: 30,
      inaccuracy: 0.1,
      bulletProperties: {
        speed: 8,
        friction: 0.99,
        acceleration: 0,
        lifeTime: 40,
        size: 4,
        pal: {
          r: 0,
          g: 0,
          b: 0,
        },
        damagesTerrain: false,
        goesThroughTerrain: false,
        destructionLevel: 0,
        damageToTerrain: 0,
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

