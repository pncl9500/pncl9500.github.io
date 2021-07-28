floorEffects = [

]

shrines = [];
shrineSize = 72;

previousShrinesTriggered = [];

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
      chests.push(new Chest("chest_blood",player.x - player.w/2 - 16, player.y - 40))
      previousShrinesTriggered.push(new Shrine_blood(0,0))
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
      previousShrinesTriggered.push(new Shrine_life(0,0))
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
        previousShrinesTriggered.push(new Shrine_wealth(0,0))
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
      floorEffects.push("protectionShrineBuff");
      previousShrinesTriggered.push(new Shrine_protection(0,0))
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
      floorEffects.push("rageShrineBuff");
      previousShrinesTriggered.push(new Shrine_rage(0,0))
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
      previousShrinesTriggered.push(new Shrine_crystal(0,0))
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
      if (player.inventoryShown === 1){
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
      previousShrinesTriggered.push(new Shrine_emptiness(0,0))
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
      for (c = 0; c < chests.length; c++){
        if (!chestData[chests[c].type].important){
          makeRandomShrine(chests[c].x + 16 - shrineSize/2, chests[c].y + 8 - shrineSize/2);
          chests.splice(c, 1);
          c -= 1;
        }
      }
      for (p = 0; p < pickups.length; p++){
        makeRandomShrine(pickups[p].x - shrineSize/2, pickups[p].y - shrineSize/2);
        pickups.splice(p, 1);
        p -= 1;
      }
      previousShrinesTriggered.push(new Shrine_unstable(0,0))
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
      g = 0;
      for (var r = 0; r < previousShrinesTriggered.length - g; r++){
        //shrine effects only trigger if the player is standing on it so this moves it to the player
        previousShrinesTriggered[r].x = player.x - 1;
        previousShrinesTriggered[r].y = player.y - 1;
        previousShrinesTriggered[r].checkForPlayerInteraction();
        //checkforplayerinteraction adds stuff to the previousShrinesTriggered array so the g is there to stop that
        g += 1;
      }
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
      previousShrinesTriggered.push(new Shrine_absolute(0,0))
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
