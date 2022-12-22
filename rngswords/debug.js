//Press F1 to enable the debug menu.
//Press F2 to enable freecam.

debugMenuActive = false;
freecamActive = false;
freecamSpeed = 10;
freecamZoomspeed = 0.01;
minFreecamZoom = 0.03;
debugValue = 0;

gamePaused = false;

hoveredEntity = null;
mostRecentHoveredEntity = null;
selectedEntities = [];
draggedEntity = null;

selectedEntityRelativeXvalues = [];
selectedEntityRelativeYvalues = [];

debugMoveAnchorX = 0;
debugMoveAnchorY = 0;
oldDebugMoveAnchorX = 0;
oldDebugMoveAnchorY = 0;
snappedEntityPositionX = 0;
snappedEntityPositionY = 0;

gridSnapEnabled = true;
gridSnapDistance = 4;
gridSnapOffsetX = 0;
gridSnapOffsetY = 0;



function drawDebug(){
  getHoveredEntity();

  handleBoxDragging();
  handleEntitySelection(); 

  handleEntityDragging();

  drawEntityDebug();
  drawMousePointerDebug();
  drawTopLeftDebug();
  drawBottomLeftDebug();
  drawTopRightDebug();

  handleFreecamControls();
}

boxX1 = 0;
boxY1 = 0;
boxX2 = 0;
boxY2 = 0;
boxSelectionActive = false;
function handleBoxDragging(){
  //down
  if (ctrlsTapped.includes("debugClick") && hoveredEntity === null){
    boxX1 = screenToGameX(mouseX);
    boxY1 = screenToGameY(mouseY);
    boxX2 = screenToGameX(mouseX);
    boxY2 = screenToGameY(mouseY);
    boxSelectionActive = true;
  }
  if (boxSelectionActive){
    //get the position of the second point of the selection box.
    //the first point's values are obtained when the player clicks.
    boxX2 = screenToGameX(mouseX);
    boxY2 = screenToGameY(mouseY);
    x1 = boxX1;
    y1 = boxY1;
    x2 = boxX2;
    y2 = boxY2;
    //if x1 is greater than x2, we have to swap x1 and x2. 
    if (x1 > x2){
      t = x1;
      x1 = x2;
      x2 = t;
    }
    //if y1 is greater than y2, we have to swap y1 and y2.
    if (y1 > y2){
      t = y1;
      y1 = y2;
      y2 = t;
    }
    //get the width of the box.
    w = x2 - x1;
    h = y2 - y1;
    //the position of the mousepointerentity will be changed to the average point of the selection box.
    mousePointerEntity.x = (x1 + x2) / 2;
    mousePointerEntity.y = (y1 + y2) / 2;
    //change its w and h as well (not necessary but its weird if we dont)
    mousePointerEntity.w = w;
    mousePointerEntity.h = h;
    //change the hitboxes of the entity to reflect its altered size
    mousePointerEntity.hboxWrappers = [new HitboxWrapper(0, 0, new RectHitbox(w, h))];
    //as well as the bounding box
    mousePointerEntity.boundingbox = new RectHitbox(w, h);
    //update the hitboxes and bounding boxes
    mousePointerEntity.updateHitboxes();
    mousePointerEntity.updateBoundingBox();
  }
  //up
  if (ctrlsUp.includes("debugClick") && hoveredEntity === null){
    boxSelectionActive = false;
    mousePointerEntity.getColliders();
    if (!ctrlsDown.includes("debugMultiselect")){
      selectedEntities = [];
    }
    for (var c = 0; c < mousePointerEntity.colliders.length; c++){
      selectedEntities.push(mousePointerEntity.colliders[c]);
    }
  }
}

/**
 * Handles player drag inputs to move selected entities.
 */
function handleEntityDragging(){
  //Player drags the mouse in debug mode.
  debugMoveAnchorX = screenToGameX(mouseX);
  debugMoveAnchorY = screenToGameY(mouseY);
  //!(debugMoveAnchorX === oldDebugMoveAnchorX && debugMoveAnchorY === oldDebugMoveAnchorY) causes the entity to not be dragged
  //if the mouse isn't being moved.
  //completely disable all dragging if shift is held because its weird
  if (!ctrlsDown.includes("debugMultiselect")){
    if (ctrlsDown.includes("debugClick") && !(debugMoveAnchorX === oldDebugMoveAnchorX && debugMoveAnchorY === oldDebugMoveAnchorY)){
      if (!gridSnapEnabled){
        for (s = 0; s < selectedEntities.length; s++){
          selectedEntities[s].x += debugMoveAnchorX - oldDebugMoveAnchorX;
          selectedEntities[s].y += debugMoveAnchorY - oldDebugMoveAnchorY;
        }
      } else {
        if (selectedEntities.length !== 0 && mostRecentHoveredEntity !== null){
          //if the grid snap distance is small we snap it based on whatever place it would normally be at without snapping
          if (gridSnapDistance * 2 < mostRecentHoveredEntity.w){
            snappedEntityPositionX += debugMoveAnchorX - oldDebugMoveAnchorX;
            snappedEntityPositionY += debugMoveAnchorY - oldDebugMoveAnchorY;
            mostRecentHoveredEntity.x = round((snappedEntityPositionX + gridSnapOffsetX) / gridSnapDistance)*gridSnapDistance - gridSnapOffsetX;
            mostRecentHoveredEntity.y = round((snappedEntityPositionY + gridSnapOffsetY) / gridSnapDistance)*gridSnapDistance - gridSnapOffsetY;
          } else {
            //if the grid snap distance is large then we put the entity into whatever tile the mouse is on
            mostRecentHoveredEntity.x = round((screenToGameX(mouseX) + gridSnapOffsetX) / gridSnapDistance)*gridSnapDistance - gridSnapOffsetX;
            mostRecentHoveredEntity.y = round((screenToGameY(mouseY) + gridSnapOffsetY) / gridSnapDistance)*gridSnapDistance - gridSnapOffsetY;
          }
        }
        for (var e = 0; e < selectedEntities.length; e++){
          selectedEntities[e].x = mostRecentHoveredEntity.x + selectedEntityRelativeXvalues[e];
          selectedEntities[e].y = mostRecentHoveredEntity.y + selectedEntityRelativeYvalues[e];
        }
      }
    }
  }
  oldDebugMoveAnchorX = screenToGameX(mouseX);
  oldDebugMoveAnchorY = screenToGameY(mouseY);
}


/**
 * Handles player click inputs to determine which entities should be selected.
 */
function handleEntitySelection(){
  //Player clicks the mouse in debug mode.
  if (ctrlsTapped.includes("debugClick")){
    if (hoveredEntity !== null){
      draggedEntity = hoveredEntity;
      mostRecentHoveredEntity = hoveredEntity;
      //snappedEntityPositionX = screenToGameX(mouseX);
      //snappedEntityPositionY = screenToGameY(mouseY);
      snappedEntityPositionX = hoveredEntity.x;
      snappedEntityPositionY = hoveredEntity.y;
      //If they're hovering over an entity, select that entity.
      //If shift isn't being held, select only that entity while deselecting all others.
      //If they're hovering over an already selected entity, deselect it.
      if (ctrlsDown.includes("debugMultiselect")){
        if (!selectedEntities.includes(hoveredEntity)){
          selectedEntities.push(hoveredEntity);
        } else {
          selectedEntities.splice(selectedEntities.indexOf(hoveredEntity), 1);
        }
      } else {
        //If the hovered entity is selected, don't deselect everything else.
        //
        if (!selectedEntities.includes(hoveredEntity)){
          selectedEntities = [hoveredEntity];
        }
        //make the newly selected entity the snapping anchor point.
      } 
      //get values of all entities relative to the dragged entity.
      selectedEntityRelativeXvalues = [];
      selectedEntityRelativeYvalues = [];
      for (var e = 0; e < selectedEntities.length; e++){
        selectedEntityRelativeXvalues.push(selectedEntities[e].x - snappedEntityPositionX);
        selectedEntityRelativeYvalues.push(selectedEntities[e].y - snappedEntityPositionY);
      }
    } else {
      //If they're hovering over nothing, deselect everything, unless shift is held.
      if (!ctrlsDown.includes("debugMultiselect")){
        selectedEntities = [];
      } 
    }
  }
}

/**
 * Finds which entity the player is hovering over with the mouse.
 */
function getHoveredEntity(){
  //if the player is doing a box selection, the hovered entity will be null,
  //and the mousePointerEntity's position will not be updated so it can be
  //changed to a box.
  if (!boxSelectionActive){
    mousePointerEntity.x = screenToGameX(mouseX);
    mousePointerEntity.y = screenToGameY(mouseY);
    mousePointerEntity.hboxWrappers = [new HitboxWrapper(0, 0, new RectHitbox(1, 1))];
    mousePointerEntity.boundingbox = new RectHitbox(1, 1);
    mousePointerEntity.updatedThisFrame = false;
    mousePointerEntity.update();
    hoveredEntity = null;
    mousePointerEntity.getColliders();
    if (mousePointerEntity.colliders.length > 0){
      hoveredEntity = mousePointerEntity.colliders[0];
    }
  } else {
    hoveredEntity = null;
  }
}

/**
 * Draws bounding boxes and hitboxes around all entities, as well as boxes around chunks.
 */
function drawEntityDebug(){
  doLayerTransform(1);
  mousePointerEntity.drawHoveredDebug();
  debugValue = 0;
  for (x = max(0, getChunkYof(cam.x) - floor(windowChunkWidth / 2) - 1); x <= min(chunks.length - 1, getChunkYof(cam.x) + floor(windowChunkWidth / 2) + 1); x++){
    for (y = max(0, getChunkXof(cam.y) - floor(windowChunkHeight / 2) - 1); y <= min(chunks[0].length - 1, getChunkXof(cam.y) + floor(windowChunkHeight / 2) + 1); y++){
      chunks[x][y].drawDebug();
    }
  }
  for (g = 0; g < globalEntities.length; g++){
    globalEntities[g].drawDebug();
  }
  if (hoveredEntity !== null){
    hoveredEntity.drawHoveredDebug();
  }
  for (s = 0; s < selectedEntities.length; s++){
    selectedEntities[s].drawSelectedDebug();
  }
  pop();
}

/**
 * Draws the debug values near the mouse pointer.
 */
function drawMousePointerDebug(){
  //Mouse pointer debug
  noFill();
  stroke(0,255,0);
  strokeWeight(1);
  line(mouseX - 10, mouseY, mouseX + 10, mouseY);
  line(mouseX, mouseY - 10, mouseX, mouseY + 10);
  noStroke();
  fill(0,255,0);
  textSize(10);
  text(`screen: (${mouseX}, ${mouseY})`, mouseX + 5, mouseY - 5);
  text(`relscreen: (${mouseX - windowWidth * 0.5}, ${mouseY - windowHeight * 0.5})`, mouseX + 5, mouseY - 15);
  text(`game: (${round(screenToGameX(mouseX))}, ${round(screenToGameY(mouseY))})`, mouseX + 5, mouseY + 5);
  text(`chunk: (${round(getChunkXof(screenToGameX(mouseX)))}, ${getChunkYof(round(screenToGameY(mouseY)))})`, mouseX + 5, mouseY + 15);
}

/**
 * Draws the debug values near the top left of the screen.
 */
function drawTopLeftDebug(){
  //Top Left Debug
  //anchorUIaroundPoint(UIleft, UItop);
  //text(`fps - ${round(frameRate())}`, 10, 10);
  if (freecamActive){
    text(`Freecam active - ${freecamSpeed} cam speed`, 10, 20);
  }
  text(`Cam: (${round(cam.x * 1000)/1000},${round(cam.y * 1000)/1000}), ${round(cam.zoom * 100) / 100} zoom`, 10, 30);
  text(`debugValue: ${debugValue}`, 10, 60);
  pop();
}

/**
 * Draws the debug values near the bottom left of the screen.
 */
function drawBottomLeftDebug(){
  //Bottom Left Debug
  anchorUIaroundPoint(UIleft, UIbottom);
  text(`globalKeysDown: ${globalKeysDown}`, 10, -30);
  text(`globalKeysTapped: ${globalKeysTapped}`, 10, -20);
  text(`globalKeysReleased: ${globalKeysReleased}`, 10, -10);
  text(`ctrlsDown: ${ctrlsDown}`, 10, -60);
  text(`ctrlsTapped: ${ctrlsTapped}`, 10, -50);
  text(`ctrlsUp: ${ctrlsUp}`, 10, -40);
  pop();
}

selectedEntityIDtoGetInfo = 0;

/**
 * Draws the debug values near the top right of the screen.
 */
function drawTopRightDebug(){
  topRightEntityHoffset = 150;
  fill(0,255,255)

  //if nothing is selected, reset the entity ID to display info of so it always displays
  //the info of the first entity selected.
  if (selectedEntities.length === 0){
    selectedEntityIDtoGetInfo = 0;
  }
  //if the control to look at the previous selected entity is tapped, look at that one.
  if (ctrlsTapped.includes("previousSelectedEntity")){
    selectedEntityIDtoGetInfo -= 1;
    if (selectedEntityIDtoGetInfo < 0){
      selectedEntityIDtoGetInfo = selectedEntities.length - 1;
    }
  }
  //same with next
  if (ctrlsTapped.includes("nextSelectedEntity")){
    selectedEntityIDtoGetInfo += 1;
  } 
  //%= it so we dont go over the amount of selected entities
  selectedEntityIDtoGetInfo %= max(1, selectedEntities.length);
  
  //time to draw the stuff
  anchorUIaroundPoint(UIright, UItop);

  text(`${selectedEntities.length} selected`, -topRightEntityHoffset, 10)
  //check that we have something selected
  if (selectedEntities.length > 0){
    text(`selecting entity ${selectedEntityIDtoGetInfo + 1} (${selectedEntityIDtoGetInfo})`, -topRightEntityHoffset, 20)
    //get the info of the entity the player wants to look at the info of
    inf = selectedEntities[selectedEntityIDtoGetInfo].getInfo();
    //draw it
    for (var i = 0; i < inf.length; i++){
      text(inf[i], -topRightEntityHoffset, 30 + 10*i);
    }
  }

  pop();
  if (selectedEntities.length > 0){
    //draw a line between the textbox and the thing we are looking at 
    strokeWeight(1);
    stroke(0,255,255);
    line(windowWidth, 0, gameToScreenX(selectedEntities[selectedEntityIDtoGetInfo].x), gameToScreenY(selectedEntities[selectedEntityIDtoGetInfo].y))
  }
}

/**
 * When freecam is enabled, changes camera parameters depending on what keys are down.
 */
function handleFreecamControls(){
  if (freecamActive){
    if (ctrlsDown.includes("freecamRight")){
      cam.targetX += freecamSpeed;
    }
    if (ctrlsDown.includes("freecamLeft")){
      cam.targetX -= freecamSpeed;
    }
    if (ctrlsDown.includes("freecamUp")){
      cam.targetY -= freecamSpeed;
    }
    if (ctrlsDown.includes("freecamDown")){
      cam.targetY += freecamSpeed;
    }
    if (ctrlsDown.includes("freecamZoomin")){
      cam.targetZoom += freecamZoomspeed;
    }
    if (ctrlsDown.includes("freecamZoomout")){
      cam.targetZoom -= freecamZoomspeed;
      if (cam.targetZoom < minFreecamZoom){
        cam.targetZoom = minFreecamZoom;
      }
    }
    if (ctrlsTapped.includes("freecamFaster")){
      freecamSpeed *= 2;
    }
    if (ctrlsTapped.includes("freecamSlower")){
      freecamSpeed *= 0.5;
    }
    if (ctrlsTapped.includes("freecamResetCameraZoom")){
      cam.targetZoom = 1;
    }
  }
}
