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
        side: "right",
        text: "shopkeeper text lolololololol",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_neutral.png"),
      },
      {
        side: "left",
        text: "ok",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/player/player_neutral.png"),
      },
      {
        side: "left",
        text: `What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`,
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/player/player_happy.png"),
      },
      {
        side: "left",
        text: "small text",
        textSize: 12,
        image: loadImage("textures/npcs/dialogue/player/player_angry.png"),
      },
      {
        side: "right",
        text: "large text",
        textSize: 90,
        image: loadImage("textures/npcs/dialogue/player/player_happy3.png"),
      },
      {
        side: "right",
        text: "i fucking love air-conditioning",
        textSize: 24,
        image: loadImage("textures/npcs/dialogue/shopkeeper/shopkeeper_pensive.png"),
      },
    ]
  }
}
