itemData = {}

function loadItems(){
  itemData = {
    excavator: {
      inventorySprite: loadImage('textures/items/excavator.png'),
      name: "Excavator",
      inventoryLeftClickFunctionName: "Left Click: Equip",
    },
    medkit: {
      inventorySprite: loadImage('textures/items/medkit.png'),
      inventoryLeftClickFunctionName: "Left Click: Consume",
      name: "Medkit"
    },
    key: {
      inventorySprite: loadImage('textures/items/key.png'),
      inventoryLeftClickFunctionName: "",
      name: "Key"
    },
  }  
}

