itemData = {}

function loadItems(){
  itemData = {
    nothing_gun: {
      inventorySprite: loadImage('textures/items/inventory/nothing_gun.png'),
      name: "Nothing Gun",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
    },
    excavator: {
      inventorySprite: loadImage('textures/items/inventory/excavator.png'),
      name: "Excavator",
      inventoryLeftClickFunctionName: "Left Click: Equip",
      effectOnLeftClick: "equip",
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

