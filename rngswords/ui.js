UIscale = 1;
showFps = false;

function getLink(){
  return `https://pncl9500.github.io/rngswords/?seed=${randSeed}`
}


/**
 * Handles the rendering of UI elements.
 */
function drawUI(){
  if (debugMenuActive){
    drawDebug();
  }
  
  if(showFps){
    fill(220);
    anchorUIaroundPoint(UIleft, UItop);
    text(`${round(frameRate())}`, 10, 10);
    pop();
  }

  for (var u = 0; u < UIcontainers.length; u++){
    //UIcontainers[u].drawElements();
  }

  anchorUIaroundPoint(0, 0);
  fill(255, 255, 255);
  text(`sword name: ${swordName}`, 5, 10);
  text(`reload the page if you want a new one`, 5, 25);
  text(`seed: ${randSeed}`, 5, 40);
}

class UIcontainer{
  constructor(anchorRelXpos, anchorRelYpos, elements){
    this.anchorRelXpos = anchorRelXpos;
    this.anchorRelYpos = anchorRelYpos;
    this.elements = elements;
  }
  drawElements(){
    anchorUIaroundPoint(UIleft + UIright * this.anchorRelXpos, UItop + UIbottom * this.anchorRelYpos);
    for (var i = 0; i < this.elements.length; i++){
      this.elements[i].draw(UIleft + UIright * this.anchorRelXpos, UItop + UIbottom * this.anchorRelYpos);
    }
    pop();
  }
  attemptRealDraw(){
    for (var i = 0; i < this.elements.length; i++){
      this.elements[i].attemptRealDraw(UIleft + UIright * this.anchorRelXpos, UItop + UIbottom * this.anchorRelYpos);
    }
  }
}

class UIelement{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(xr, yr){

  }
  collidingWithMouse(xr, yr){
    var screenx = this.x * windowScale * UIscale + xr;
    var screeny = this.y * windowScale * UIscale + yr;
    var screenw = this.w * windowScale * UIscale;
    var screenh = this.h * windowScale * UIscale;
    var l = screenx - screenw * 0.5;
    var r = screenx + screenw * 0.5;
    var t = screeny - screenh * 0.5;
    var b = screeny + screenh * 0.5;
    return mouseX > l && mouseX < r && mouseY > t && mouseY < b;
  }
}

class DebugUIelement extends UIelement{
  constructor(x, y){
    super(x, y, 10, 10);
    this.state = "dormant";
  }
  draw(xr, yr){
    if (this.collidingWithMouse(xr, yr)){
      this.state = "awakened";
      if (ctrlsDown.includes("uiLeftClick")){
        this.state = "aggravated"
      }
      if (ctrlsTapped.includes("uiLeftClick")){
        this.state = "primed"
      }
      if (ctrlsUp.includes("uiLeftClick")){
        this.state = "returning"
      }
    } else {
      this.state = "dormant";
    }
    switch (this.state) {
      case "dormant":
        fill(90,90,90);
        break;
      case "awakened":
        fill(120,120,120);
        break;
      case "primed":
        fill(255,255,0);
        break;
      case "aggravated":
        fill(255,125,0);
        break;
      case "returning":
        fill(125,0,0);
        break;
      default:
        break;
    }
    rect(this.x, this.y, this.w, this.h);
  }

}

UIcontainers = [
  new UIcontainer(0, 0, [
    new DebugUIelement(5, 5),
    new DebugUIelement(5, 25),
    new DebugUIelement(25, 5),
  ]),

  new UIcontainer(1, 0, [
    new DebugUIelement(-5, 5),
    new DebugUIelement(-5, 25),
    new DebugUIelement(-25, 5),
  ]),

  new UIcontainer(0, 1, [
    new DebugUIelement(5, -5),
    new DebugUIelement(5, -25),
    new DebugUIelement(25, -5),
    new DebugUIelement(100, -100),
  ]),

  new UIcontainer(1, 1, [
    new DebugUIelement(-5, -5),
    new DebugUIelement(-5, -25),
    new DebugUIelement(-25, -5),
  ]),
]

/**
 * Does a transformation that causes elements to be drawn around a specified screen position.
 * @constructor
 * @param {number} x - X position in screen coordinates.
 * @param {number} y - Y position in screen coordinates.
 */
function anchorUIaroundPoint(x, y){
  push();
  translate(x, y);
  scale(windowScale * UIscale,windowScale * UIscale);
}

