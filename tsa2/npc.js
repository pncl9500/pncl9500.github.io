npcs = [];

dialogueBox = {
  hidden: true,
  points: [
    {x: 0, y: 0, targetX: 0, targetY: 0},
    {x: 0, y: 0, targetX: 0, targetY: 0},
    {x: 0, y: 0, targetX: 0, targetY: 0},
    {x: 0, y: 0, targetX: 0, targetY: 0},
  ],
  smoothing: 8,
}
class Npc{
  constructor(x, y, w, h, overWorldSprite, dialogue){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.overWorldSprite = overWorldSprite;
    this.dialogue = dialogue;
  }


  draw(){
    image(this.overWorldSprite, this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
  }

  checkForPlayerInteraction(){
    if (detect2BoxesCollision(this, player) && (dialogueBox.hidden)){
      dialogueBox.hidden = false;
      return true;
    }
    return false;
  }
}



function loadDialogue(){
  dialogue = {
    text_shopkeeper: [
      {
        side: "right",
        text: "i fucking love air-conditioning",
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_neutral.png"),
      }
    ]
  }
}
