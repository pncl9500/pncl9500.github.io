shrines = [];
shrineSize = 72;

class Shrine{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }
  draw(){
    image(shrineSprites[this.sprite], this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w ,this.h);
  }
}

class Shrine_blood extends Shrine{

  constructor(x, y){
    super(x, y);
    this.sprite = "shrine_blood";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player, this)){
      player.maxHealth = Math.ceil(player.maxHealth/2);
      player.health = min(player.health, player.maxHealth);
      console.log(player.health)
      console.log(player.maxHealth)
      return true;
    }
    return false;
  }
}

class Shrine_life extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_life";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      player.maxHealth = Math.ceil(player.maxHealth*1.5);
      player.health = Math.ceil(player.health*1.5);
      player.money = Math.floor(player.money/2);
      return true;
    }
    return false;
  }
}

class Shrine_wealth extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_wealth";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      //will do later
      player.money = Math.ceil(player.money*2);
      if (player.inventorySize !== 1){
        if (player.inventory[player.inventorySize - 1] !== "none"){
          pickups.push(new Pickup(player.inventory[player.inventorySize - 1], player.x + player.w/2, player.y + player.h/2))
        }
        player.inventorySize -= 1;
        player.selectedInventorySlot = min(player.selectedInventorySlot, player.inventorySize - 1);
        player.inventory.pop();
        inventoryBoxes.pop();
      }
      return true;
    }
    return false;
  }
}

class Shrine_protection extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_protection";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      //will do later
      return true;
    }
    return false;
  }
}

class Shrine_rage extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_rage";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      //will do later
      return true;
    }
    return false;
  }
}

class Shrine_crystal extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_crystal";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      player.health = 1;
      pickups.push(new Pickup("inventorycrystal", player.x + player.w/2, player.y + player.h/2))
      return true;
    }
    return false;
  }
}

class Shrine_emptiness extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_emptiness";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      if (player.inventoryShown){
        for (b = player.inventorySize; b < player.inventorySize * 2 - 1; b++){
          inventoryBoxes.push(new InventoryBox(b));
        }
      }
      player.inventorySize *= 2;
      player.inventory = [];
      for (i = 0; i < player.inventorySize; i++){
        player.inventory.push("none");
      }
      pickups = [];
      player.inventory[0] = "nothing_gun";
      return true;
    }
    return false;
  }
}

class Shrine_shattered extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_shattered";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      //will do later
      return true;
    }
    return false;
  }
}

class Shrine_unstable extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_unstable";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      //will do later
      return true;
    }
    return false;
  }
}

class Shrine_absolute extends Shrine{
  constructor(x,y){
    super(x, y);
    this.sprite = "shrine_absolute";
    this.x = x;
    this.y = y;
    this.w = shrineSize;
    this.h = shrineSize;
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(player,this)){
      //will do later
      return true;
    }
    return false;
  }
}

function loadShrineSprites(){
  shrineSprites = {
    shrine_blood: loadImage("textures/objects/shrines/shrine_blood.png"),
    shrine_life: loadImage("textures/objects/shrines/shrine_life.png"),
    shrine_wealth: loadImage("textures/objects/shrines/shrine_wealth.png"),
    shrine_protection: loadImage("textures/objects/shrines/shrine_protection.png"),
    shrine_rage: loadImage("textures/objects/shrines/shrine_rage.png"),
    shrine_crystal: loadImage("textures/objects/shrines/shrine_crystal.png"),
    shrine_emptiness: loadImage("textures/objects/shrines/shrine_emptiness.png"),
    shrine_shattered: loadImage("textures/objects/shrines/shrine_shattered.png"),
    shrine_unstable: loadImage("textures/objects/shrines/shrine_unstable.png"),
    shrine_absolute: loadImage("textures/objects/shrines/shrine_absolute.png"),
  }  
}

//shrine effects
//shrine_blood - halves max health, but spawns a blood chest
//shrine_life - increases max health by 50%, but halves money
//shrine_wealth - doubles money, but removes 1 inventory slot
//shrine_protection - halves damage to player by 50% for current floor, but you are 10% slower.
//shrine_rage - increases damage per shot by 1 for current floor, but damage to player is increased by 2x.
//shrine_crystal - spawns an inventory crystal, but sets health to 1

//special shrines
//shrine_emptiness - rarer than other shrines. removes all pickups and inventory items, but doubles inventory space, as well as giving the player a nothing gun.
//shrine_shattered - rarer than other shrines. converts all chests on the current floor to random shrines, except important ones like the excavator and teleport chests.
//shrine_unstable - rarer than other shrines. repeats all shrine effects activated this game twice.
//shrine_absolute - rarer than other shrines. spawns a strong enemy that goes through walls on the player every 2 seconds, but the player does 8x damage. for the whole game, obviously.