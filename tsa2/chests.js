

class Chest{
  constructor(type, x, y){
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 16;
    this.dead = false;
  }

  draw(){
    image(chestData[this.type].sprite,this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h)
    if (chestData[this.type].cost !== 0){
      noStroke();
      textSize(6);
      fill(0);
      text(chestData[this.type].cost, this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY - 6)
    }
  }

  checkForOpen(){
    if (detect2BoxesCollision(this, player) && this.dead === false && player.money >= chestData[this.type].cost){
      this.spawnChestLoot();
      this.dead = true;
      player.money -= chestData[this.type].cost;
    }
  }

  spawnChestLoot(){
    if (chestData[this.type].lootItemCount === "static"){
      for (l = 1; l < chestData[this.type].loot.length; l++){
        pickups.push(new Pickup(chestData[this.type].loot[l].item,this.x + this.w/2, this.y + this.h/2));
      }
    } else {
      this.pickTable = [];
      for (l = 0; l < chestData[this.type].loot.length; l++){
        for (p = 0; p < chestData[this.type].loot[l].weight; p++){
          this.pickTable.push(chestData[this.type].loot[l]);
        }
      }
      for (l = 0; l < chestData[this.type].lootItemCount; l++){
        this.selectedItem = "none"
        this.selectedItem = this.pickTable[floor(random(0, this.pickTable.length))].item;
        pickups.push(new Pickup(this.selectedItem,this.x + this.w/2, this.y + this.h/2))
      }
    }
    
  }
}


function loadChests(){


  
  //chests = [new Chest("blank",0,0)];
  //the none at the start of the loot table is required for the game to function so dont make a chest without it
  //if the lootitemcount is static then one of every possible loot thing will be dropped from the chest
  chests = [];
  chestData = {
    blank: {
      sprite: loadImage('textures/chests/blank.png'),
      lootItemCount: 10,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 5},
        {item: "smg", weight: 1},
      ],
      cost: 0,
      needsKey: false,
    },
    normal: {
      sprite: loadImage('textures/chests/chest_normal.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 3},
        {item: "medkit", weight: 2},
        {item: "key", weight: 1},
      ],
      cost: 0,
      needsKey: false,
    },
    normal_locked: {
      sprite: loadImage('textures/chests/chest_normal_locked.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 30},
        {item: "medkit", weight: 20},
        {item: "smg", weight: 5},
        {item: "key", weight: 1},
      ],
      cost: 0,
      needsKey: true,
    },
    great: {
      sprite: loadImage('textures/chests/chest_great.png'),
      lootItemCount: 10,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 3},
        {item: "medkit", weight: 2},
        {item: "key", weight: 1},
      ],
      cost: 0,
      needsKey: false,
    },
    great_locked: {
      sprite: loadImage('textures/chests/chest_great_locked.png'),
      lootItemCount: 10,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 30},
        {item: "medkit", weight: 20},
        {item: "smg", weight: 5},
        {item: "key", weight: 1},
      ],
      cost: 0,
      needsKey: true,
    },
    case_supply: {
      sprite: loadImage('textures/chests/case_supply.png'),
      lootItemCount: 4,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 3},
        {item: "medkit", weight: 3},
        {item: "key", weight: 3},
        {item: "energydrink", weight: 1},
      ],
      cost: 25,
      needsKey: false,
    },
    case_weapon: {
      sprite: loadImage('textures/chests/case_weapon.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "smg", weight: 9},
        {item: "sniper", weight: 7},
        {item: "grenadelauncher", weight: 3},
        {item: "minigun", weight: 1},
      ],
      cost: 50,
      needsKey: false,
    },
    case_omega: {
      sprite: loadImage('textures/chests/case_omega.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "transportation_cannon", weight: 1},
      ],
      cost: 1000,
      needsKey: false,
    },
    case_gungun: {
      sprite: loadImage('textures/chests/case_gungun.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "gun_gun", weight: 1},
      ],
      cost: 100,
      needsKey: false,
    },
    case_desertTeleport: {
      sprite: loadImage('textures/chests/case_desertTeleport.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "desertTeleport", weight: 1},
      ],
      cost: 50,
      needsKey: false,
    },
    case_excavator: {
      sprite: loadImage('textures/chests/case_excavator.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "excavator", weight: 1},
      ],
      cost: 0,
      needsKey: false,
    },
    geode: {
      sprite: loadImage('textures/chests/chest_geode.png'),
      lootItemCount: "static",
      loot: [
        {item: "none"},
        {item: "solidifier"},
        {item: "kill"},
        {item: "nothing_gun"},
        {item: "blackmarketteleport"},
        {item: "inventorycrystal"},
        {item: "inventorycrystal"},
        {item: "inventorycrystal"},
        {item: "inventorycrystal"},
      ],
      cost: 0,
      needsKey: false,
    },
    case_back: {
      sprite: loadImage('textures/chests/case_back.png'),
      lootItemCount: "static",
      loot: [
        {item: "none"},
        {item: "teleportBack"},
      ],
      cost: 0,
      needsKey: false,
    }
  }
}
