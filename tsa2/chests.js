
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
  }

  checkForOpen(){
    if (detect2BoxesCollision(this, player) && this.dead === false){
      this.spawnChestLoot();
      this.dead = true;
    }
  }

  spawnChestLoot(){
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


function loadChests(){


  
  //chests = [new Chest("blank",0,0)];
  chests = [];
  chestData = {
    blank: {
      sprite: loadImage('textures/chests/blank.png'),
      lootItemCount: 10,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 5},
        {item: "smg", weight: 1},
      ]
    },
    normal: {
      sprite: loadImage('textures/chests/chest_normal.png'),
      lootItemCount: 1,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 3},
        {item: "medkit", weight: 2},
        {item: "key", weight: 1},
      ]
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
      ]
    },
    great: {
      sprite: loadImage('textures/chests/chest_great.png'),
      lootItemCount: 10,
      loot: [
        {item: "none", weight: 0},
        {item: "bomb", weight: 3},
        {item: "medkit", weight: 2},
        {item: "key", weight: 1},
      ]
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
      ]
    },
    geode: {
      sprite: loadImage('textures/chests/chest_geode.png'),
      lootItemCount: 14,
      loot: [
        {item: "none", weight: 0},
        {item: "transportation_cannon", weight: 1,},
        {item: "gun_gun", weight: 1,},
        {item: "solidifier", weight: 1,},
        {item: "excavator", weight: 1,},
        {item: "kill", weight: 1,},
        {item: "nothing_gun", weight: 1,},
        {item: "smg", weight: 1,},
      ]
    },
  }
}
