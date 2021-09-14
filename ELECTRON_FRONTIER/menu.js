

menuOpen = false;
menuButtonTextPaddingX = 2;
menuButtonTextPaddingY = 12;

menuPaddingX = 7;
menuPaddingY = 7;
verticalSpaceBetweenMenuButtons = 4;

menuButtonWidth = 100;
menuButtonHeight = 16;

controlToRebind = null;

menuButtons = [];
class MenuButton{
  constructor(x, y, w, h, text){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
  }
  draw(){
    rect(this.x, this.y, this.w, this.h);
    text(this.text, this.x + menuButtonTextPaddingX, this.y + menuButtonTextPaddingY);
  }
  checkForClick(){
    if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h){
      this.doClickFunction();
      return true;
    }
    return false;
  }

  doClickFunction(){}
}

controlSettings = {
  left: 37,
  right: 39,
  softDrop: 40,
  hardDrop: 32,
  rotCW: 88,
  rotCCW: 90,
  rot180: 65,
  hold: 67,
  reset: 82,
}

class EditControlsButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Edit Controls"}
  doClickFunction(){
    menuButtons = [new BackButton(menuPaddingX,menuPaddingY,menuButtonWidth,menuButtonHeight),
    new ControlButtonLeft(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 1,menuButtonWidth,menuButtonHeight),
    new ControlButtonRight(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 2,menuButtonWidth,menuButtonHeight),
    new ControlButtonSoftDrop(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 3,menuButtonWidth,menuButtonHeight),
    new ControlButtonHardDrop(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 4,menuButtonWidth,menuButtonHeight),
    new ControlButtonCWrot(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 5,menuButtonWidth,menuButtonHeight),
    new ControlButtonCCWrot(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 6,menuButtonWidth,menuButtonHeight),
    new ControlButton180rot(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 7,menuButtonWidth,menuButtonHeight),
    new ControlButtonHold(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 8,menuButtonWidth,menuButtonHeight),
    new ControlButtonReset(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 9,menuButtonWidth,menuButtonHeight),
    new ControlSetGuideline(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 10,menuButtonWidth,menuButtonHeight),
    new ControlSetWASD(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 11,menuButtonWidth,menuButtonHeight),
    new ControlSetPNCL(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 12,menuButtonWidth,menuButtonHeight),];
  }
}

class EditHandlingButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Edit Handling"}
  doClickFunction(){
    menuButtons = [new BackButton(menuPaddingX,menuPaddingY,menuButtonWidth,menuButtonHeight),
    new dasUpButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 1,menuButtonWidth,menuButtonHeight),
    new dasDownButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 2,menuButtonWidth,menuButtonHeight),
    new arrUpButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 3,menuButtonWidth,menuButtonHeight),
    new arrDownButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 4,menuButtonWidth,menuButtonHeight),
    new sdfUpButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 5,menuButtonWidth,menuButtonHeight),
    new sdfDownButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 6,menuButtonWidth,menuButtonHeight)];
    handlingCountersDrawn = true;
  }
}

class dasUpButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "+das"}
  doClickFunction(){
    settings.das += 1;
  }
}

class dasDownButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "-das"}
  doClickFunction(){
    settings.das -= 1;
  }
}

class arrUpButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "+arr"}
  doClickFunction(){
    settings.arr += 1;
  }
}

class arrDownButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "-arr"}
  doClickFunction(){
    settings.arr -= 1;
  }
}

class sdfUpButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "+sdf"}
  doClickFunction(){
    settings.sdf += 1;
  }
}

class sdfDownButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "-sdf"}
  doClickFunction(){
    settings.sdf -= 1;
  }
}

class BackButton extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Back"}
  doClickFunction(){
    resetMenuButtons();
  }
}

class ControlButtonLeft extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind left"}
  doClickFunction(){
    controlToRebind = "left";
  }
}

class ControlButtonRight extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind right"}
  doClickFunction(){
    controlToRebind = "right";
  }
}

class ControlButtonSoftDrop extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind SD"}
  doClickFunction(){
    controlToRebind = "softDrop";
  }
}

class ControlButtonHardDrop extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind HD"}
  doClickFunction(){
    controlToRebind = "hardDrop";
  }
}

class ControlButtonCWrot extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind CW"}
  doClickFunction(){
    controlToRebind = "cw";
  }
}

class ControlButtonCCWrot extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind CCW"}
  doClickFunction(){
    controlToRebind = "ccw";
  }
}

class ControlButton180rot extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind 180"}
  doClickFunction(){
    controlToRebind = "180";
  }
}

class ControlButtonHold extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind HOLD"}
  doClickFunction(){
    controlToRebind = "hold";
  }
}

class ControlButtonReset extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Bind RESET"}
  doClickFunction(){
    controlToRebind = "reset";
  }
}

class ControlSetGuideline extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Set all guideline"}
  doClickFunction(){
    controlSettings = {
      left: 37,
      right: 39,
      softDrop: 40,
      hardDrop: 32,
      rotCW: 88,
      rotCCW: 90,
      rot180: 65,
      hold: 67,
      reset: 82,
    }
  }
}

class ControlSetWASD extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Set all WASD"}
  doClickFunction(){
    controlSettings = {
      left: 65,
      right: 68,
      softDrop: 87,
      hardDrop: 83,
      rotCW: 39,
      rotCCW: 37,
      rot180: 38,
      hold: 16,
      reset: 82,
    }
  }
}

class ControlSetPNCL extends MenuButton{constructor(x, y, w, h){super(x, y, w, h); this.text = "Set all PNCL"}
  doClickFunction(){
    controlSettings = {
      left: 65,
      right: 68,
      softDrop: 83,
      hardDrop: 87,
      rotCW: 75,
      rotCCW: 76,
      rot180: 77,
      hold: 186,
      reset: 82,
    }
  }
}


resetMenuButtons();

function resetMenuButtons(){
  handlingCountersDrawn = false;
  menuButtons = [new EditControlsButton(menuPaddingX,menuPaddingY,menuButtonWidth,menuButtonHeight),
    new EditHandlingButton(menuPaddingX,menuPaddingY + (verticalSpaceBetweenMenuButtons + menuButtonHeight) * 1,menuButtonWidth,menuButtonHeight)];
}