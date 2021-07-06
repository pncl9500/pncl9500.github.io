inventoryBoxes = [];

class InventoryBox{
  constructor(slot){
    this.slot = slot;
    this.x = player.x + player.w/2;
    this.y = player.y + player.h/2;
    this.targetX = player.x;
    this.targetY = player.y;
    this.size = 0;
    this.targetSize = 16;
    this.selectedSize = 0;
    this.targetselectedSize = 0;
    this.smoothing = 10;
    this.offsetY = 40;
    this.gap = 6;
    this.state = "normal";
    this.timer = 10;
    this.padding = 1;
  }

  draw(){
    switch (this.state) {
      case "normal":
        this.centerY = + (player.y + player.h/2 - this.offsetY + player.yv * 3);
        this.centerX = + (player.x + player.w/2 + player.xv * 3);
        this.targetX = this.centerX + this.slot * (this.size + this.gap) - (this.size * (player.inventorySize - 1))/2 - (this.gap * (player.inventorySize - 1))/2;
        this.targetY = this.centerY;
        if (crosshair.x > this.x - this.size/2 - cam.x + cam.offsetX - this.selectedSize/2 &&
            crosshair.x < this.x - this.size/2 - cam.x + cam.offsetX - this.selectedSize/2 + this.size + this.selectedSize &&
            crosshair.y > this.y - this.size/2 - cam.y + cam.offsetY - this.selectedSize/2 &&
            crosshair.y < this.y - this.size/2 - cam.y + cam.offsetY - this.selectedSize/2 + this.size + this.selectedSize){
          this.targetSelectedSize = 3;
          if (mouseIsPressed){
            this.targetSelectedSize += 2;
          }
          player.hoveredInventorySlot = this.slot;
        } else {
          this.targetSelectedSize = 0;
        }
        this.selectedSize += (this.targetSelectedSize - this.selectedSize)/this.smoothing;
        break;
      case "closing":
        this.timer -= 1;
        this.targetX = player.x + player.w/2;
        this.targetY = player.y + player.h/2;
        this.targetSize = 0;
        this.smoothing = this.smoothing/2 + 1;
        this.selectedSize += (this.targetSelectedSize - this.selectedSize)/this.smoothing;
      default:
        break;
    }

    this.size += (this.targetSize - this.size) / this.smoothing;
    this.x += (this.targetX - this.x) / this.smoothing;
    this.y += (this.targetY - this.y) / this.smoothing;
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(this.x - this.size/2 - cam.x + cam.offsetX - this.selectedSize/2, this.y - this.size/2 - cam.y + cam.offsetY - this.selectedSize/2, this.size + this.selectedSize, this.size + this.selectedSize);

    //make image
    if (player.inventory[this.slot] != "none"){
      image(itemData[player.inventory[this.slot]].inventorySprite,this.x - this.size/2 - this.selectedSize- cam.x + cam.offsetX + this.padding, this.y - this.size/2 - this.selectedSize - cam.y + cam.offsetY + this.padding, this.size - this.padding * 2 + this.selectedSize*2, this.size - this.padding * 2 + this.selectedSize*2)
    }
  }
}


function drawInventoryBoxes(){
  //draw inventory stuff
  stroke(0,0,0);
  strokeWeight(1);
  noFill();
  player.hoveredInventorySlot = false;
  for (l = 0; l < inventoryBoxes.length; l++){
    inventoryBoxes[l].draw();
    if (inventoryBoxes[l].timer < 1){
      inventoryBoxes.splice(l,1)
      l -= 1;
    }
  }
}

function toggleInventoryDisplay(){
  player.inventoryShown *= -1;
    if (player.inventoryShown === 1){
      for (i = 0; i < player.inventorySize; i++){
        inventoryBoxes.push(new InventoryBox(i));
      }
    } else { 
      for (i = 0; i < inventoryBoxes.length; i++){
        inventoryBoxes[i].smoothing *= 8;
        inventoryBoxes[i].state = "closing";
      }
    }
}