keyBinds = {
  uiLeftClick: [0],
  uiRightClick: [1],

  powerSlide: [16],
  dash: [68],


  //debug stuff
  debugMenu: [112],
  enableFreeCam: [113],
  previousSelectedEntity: [219],
  nextSelectedEntity: [221],
  debugPause: [80],
  frameSkip: [220],
  
  freecamUp: [38],
  freecamDown: [40],
  freecamLeft: [37],
  freecamRight: [39],
  freecamZoomin: [187],
  freecamZoomout: [189],
  freecamFaster: [190],
  freecamSlower: [188],
  freecamResetCameraZoom: [191],

  debugClick: [0],
  debugMultiselect: [16],
}



//every key that is currently held down. this include mouse presses, which are 0 for left, 1 for right, and 2 for center.
globalKeysDown = [];
//every key that was tapped on the current frame.
globalKeysTapped = [];
//every key that was released on the current frame.
globalKeysReleased = [];


ctrlsDown = [];
ctrlsTapped = [];
ctrlsUp = [];


function getInputs(){
  ctrlsDown = [];
  ctrlsTapped = [];
  ctrlsUp = [];
  for (var bind in keyBinds) {
    if (keyBinds.hasOwnProperty(bind)) {
      for (var i = 0; i < keyBinds[bind].length; i++){
        if (globalKeysTapped.includes(keyBinds[bind][i])){
          ctrlsTapped.push(bind);
        }
        if (globalKeysReleased.includes(keyBinds[bind][i])){
          ctrlsUp.push(bind);
        }
        if (globalKeysDown.includes(keyBinds[bind][i])){
          ctrlsDown.push(bind);
        }
      }
    }
  }
}

function keyPressed() {
  //push the key pressed into the list of keys down
  globalKeysDown.push(keyCode);
  globalKeysTapped.push(keyCode);
}

function mousePressed() {
  switch (mouseButton) {
    case LEFT:
      globalKeysDown.push(0);
      globalKeysTapped.push(0);
      break;
    case RIGHT:
      globalKeysDown.push(1);
      globalKeysTapped.push(1);
      break;
    case CENTER:
      globalKeysDown.push(2);
      globalKeysTapped.push(2);
      break;
    default:
      break;
  }
}

function mouseReleased() {
  if (globalKeysDown.includes(0)){
    globalKeysReleased.push(0);
  }
  if (globalKeysDown.includes(1)){
    globalKeysReleased.push(1);
  }
  if (globalKeysDown.includes(2)){
    globalKeysReleased.push(2);
  }
  //remove ALL held mouse buttons
  globalKeysDown = globalKeysDown.filter(key => key > 2);
}

function keyReleased() {
    //remove the key released from the list of keys down
  globalKeysDown = globalKeysDown.filter(key => key !== keyCode);
  globalKeysReleased.push(keyCode);
}


function resetInputs(){
  globalKeysTapped = [];
  globalKeysReleased = [];
}