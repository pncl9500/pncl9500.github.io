

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
    image(chestData[this.type].sprite,this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
    if (chestData[this.type].cost !== 0){
      noStroke();
      textSize(6);
      fill(0);
      text(Math.ceil(chestData[this.type].cost * areaTypes[currentLevel].chestCostMultiplier), this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY - 6);
    }
  }

  checkForOpen(){
    if (detect2BoxesCollision(this, player) && this.dead === false && player.money >= chestData[this.type].cost){
      this.spawnChestLoot();
      this.dead = true;
      player.money -= Math.ceil(chestData[this.type].cost * areaTypes[currentLevel].chestCostMultiplier);
    }
  }

  spawnChestLoot(){
    if (chestData[this.type].lootItemCount === "static"){
      for (l = 1; l < chestData[this.type].loot.length; l++){
        //static cannot have specials because imimm not adding it yet ::::FDS:AF:DSA
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
        this.selectedItem = "none";
        this.selectedItem = this.pickTable[floor(random(0, this.pickTable.length))];
        if (typeof(this.selectedItem.special) == "undefined"){
          this.selectedItem.special = false;
        }
        if (this.selectedItem.special){
          switch (this.selectedItem.item) {
            case "reroll3":
              for (i = 0; i < 3; i++){
                this.spawnChestLoot();
              }
              break;
            case "reroll10":
              for (i = 0; i < 10; i++){
                this.spawnChestLoot();
              }
              break;
            case "randomitem":
              var randomItem = itemPools.randomPool[floor(random(0, itemPools.randomPool.length))];
              console.log(randomItem);
              console.log(itemPools);
              console.log(itemPools.randomPool);
              pickups.push(new Pickup(randomItem,this.x + this.w/2, this.y + this.h/2));
              break;
            default:
              break;
          }
        } else {
          console.log(this.selectedItem.item);
          pickups.push(new Pickup(this.selectedItem.item,this.x + this.w/2, this.y + this.h/2));
        }
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
      //important chests are not converted by shattered shrine.
      important: false,
    },
    normal: {
      sprite: loadImage('textures/chests/chest_normal.png'),
      lootItemCount: 3,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 16},
        {item: "medkit", weight: 12},
        {item: "key", weight: 8},
        {item: "energydrink", weight: 4},
        {item: "smg", weight: 1},
      ],
      cost: 0,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    normal_locked: {
      sprite: loadImage('textures/chests/chest_normal_locked.png'),
      lootItemCount: 3,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 16},
        {item: "medkit", weight: 12},
        {item: "key", weight: 8},
        {item: "energydrink", weight: 4},
        {item: "smg", weight: 1},
      ],
      cost: 0,
      needsKey: true,
      //important chests are not converted by shattered shrine.
      important: false,
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
      cost: 15,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    case_weapon: {
      sprite: loadImage('textures/chests/case_weapon.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "smg", weight: 10},
        {item: "sniper", weight: 4},
        {item: "grenadelauncher", weight: 2},
        {item: "minigun", weight: 1},
      ],
      cost: 30,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    case_omega: {
      sprite: loadImage('textures/chests/case_omega.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "transportation_cannon", weight: 1},
      ],
      cost: 2500,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
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
      //important chests are not converted by shattered shrine.
      important: false,
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
      //important chests are not converted by shattered shrine.
      important: true,
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
      //important chests are not converted by shattered shrine.
      important: true,
    },
    geode: {
      sprite: loadImage('textures/chests/chest_geode.png'),
      lootItemCount: "static",
      loot: [
        {item: "none"},
        {item: "solidifier"},
        {item: "kill"},
        {item: "nothing_gun"}
      ],
      cost: 0,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    case_back: {
      sprite: loadImage('textures/chests/case_back.png'),
      lootItemCount: "static",
      loot: [
        {item: "none"},
        {item: "blackmarketteleport"},
        {item: "teleportBack"},
      ],
      cost: 0,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: true,
    },
    sewer_loot: {
      sprite: loadImage('textures/chests/chest_sewerloot.png'),
      lootItemCount: 2,
      loot: [
        {item: "none", weight: 0},
        {item: "key", weight: 20},
        {item: "bomb", weight: 30},
        {item: "medkit", weight: 30},
        {item: "energydrink", weight: 10},
        {item: "smg", weight: 10},
        {item: "sniper", weight: 2},
        {item: "minigun", weight: 1},
      ],
      cost: 0,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    chest_great: {
      sprite: loadImage('textures/chests/chest_great.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "reroll3", weight: 10, special: true},
        {item: "reroll10", weight: 1, special: true},
        {item: "randomitem", weight: 10, special: true},
      ],
      cost: 0,
      needsKey: false,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    chest_great_locked: {
      sprite: loadImage('textures/chests/chest_great_locked.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "reroll3", weight: 10, special: true},
        {item: "reroll10", weight: 1, special: true},
        {item: "randomitem", weight: 20, special: true},
      ],
      cost: 0,
      needsKey: true,
      //important chests are not converted by shattered shrine.
      important: false,
    },
    chest_blood: {
      sprite: loadImage('textures/chests/chest_blood.png'),
      lootItemCount: 2,
      loot: [
        {item: "none", weight: 0},
        {item: "smg", weight: 1},
        {item: "sniper", weight: 15},
        {item: "grenadelauncher", weight: 15},
        {item: "minigun", weight: 15},
        {item: "bomb", weight: 7},
      ],
      cost: 0,
      needsKey: true,
      //important chests are not converted by shattered shrine.
      important: false,
    }
  };
}
