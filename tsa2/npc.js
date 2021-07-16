npcs = [];

class Npc{
  constructor(overWorldX, overWorldY, overWorldW, overWorldH, overWorldSprite){
    this.overWorldX = overWorldX;
    this.overWorldY = overWorldY;
    this.overWorldW = overWorldW;
    this.overWorldH = overWorldH;
    this.overWorldSprite = overWorldSprite;
  }


  draw(){
    image(this.overWorldSprite, this.overWorldX - cam.x + cam.offsetX, this.overWorldY - cam.y + cam.offsetY, this.overWorldW, this.overWorldH);
  }
}

