npcs = [];

dialogueBox = {
  hidden: true,
  points: [
    {x: 0, y: 0, targetX: 0, targetY: 0},
    {x: 0, y: 0, targetX: 0, targetY: 0},
    {x: 0, y: 0, targetX: 0, targetY: 0},
    {x: 0, y: 0, targetX: 0, targetY: 0},
  ],
  smoothing: 0,
  dialogue: {},
  dialogueStep: 0,
  npc: {
    x: 0,
    y: 0,
    targetY: 0,
    yv: 0,
    smoothing: 3,
    friction: 0.55,
    w: 256,
    h: 256,
  },
  timer: 0,
  charactersDrawn: 0,
  state: "dialogueBoxExpanding",
  textPadding: 10,
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
      dialogueBox.dialogue = this.dialogue;
      dialogueBox.timer= 0;
      dialogueBox.dialogueStep = 0;
      dialogueBox.state= "dialogueBoxExpanding";
      dialogueBox.npc.y = 10 + windowHeight*0.7 + windowHeight/12;
      return true;
    }
    return false;
  }
}





function loadDialogue(){
  dialogue = {
    text_shopkeeper: [
      {
        side: "left",
        text: "hi",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/player/player_neutral.png"),
      },
      {
        side: "right",
        text: "hello welcome to the shop",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_neutral.png"),
      },
      {
        side: "right",
        text: "the chest on the left contains a random weapon",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_neutral.png"),
      },
      {
        side: "right",
        text: "the chest on the right contains 4 useful supplies",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_neutral.png"),
      },
      {
        side: "left",
        text: "ok",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/player/player_neutral.png"),
      },
    ],
    text_shopkeeper_notenoughmoney: [
      {
        side: "right",
        text: "You don't have enough money to buy that.",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_pensive.png"),
      },
    ]
  }
}
