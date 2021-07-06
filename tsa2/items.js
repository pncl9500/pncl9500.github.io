itemData = {}

function loadItems(){
  itemData = {
    excavator: {
      inventorySprite: loadImage('textures/items/inventory/excavator.png'),
      overworldSprite: loadImage('textures/items/overworld/excavator.png'),
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

