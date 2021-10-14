




actionIsTspin = false;
actionIsMini = false;

lastSuccessfulAction = "harddrop";

solidificationIsTspin = false;

piecesPlacedTotal = 0;
framesPassedSinceReset = 0;

mostRecentClear = "SINGLE"
mostRecentClearAnimationTimer = 0;

combo = -1;
btb = -1;

perfectClears = 0;
attackSentTotal = 0;
sprintTimerGoing = true;

linesClearedTotal = 0;

dead = false;

garbageMessiness = 0;
garbageQueue = [];
garbageQueueAmount = 0;

apmBotLinesPerAttack = 0;
apmBotFramesPerAttack = 240;
apmBotFrameTimer = 0;

spawnYOffset = -3;
ghostTransparency = 150;

bagLength = 7;
bagSet7 = ["z","l","o","s","i","j","t"];
bag = [];

piecesPlacedInBag = 0;

nextQueue = [];
previews = 5;

holdAvailable = false;

grid = {
  width: 10,
  height: 40,
  visibleHeight: 20,
  tiles: [],
  tileWidth: 16,
  xOffset: 220,
  yOffset: 140,
}

settings = {
  das: 10,
  arr: 2,
  sdf: 4,
}

dasTimer = 0;
arrTimer = 0;
softDropTimer = 0;
dasActive = false;


//the piece in slot 0 is the active piece.
//the piece in slot 1 is the hold piece.
//2 and beyond are next piece previews.
pieces = [];
class Piece {
  constructor(type, x, y){
    this.y = y;
    this.x = x;
    
    this.type = type;
    this.direction = 0;
    if (this.type === null){
      return;
    }
    this.color = pieceData[type].color;
    this.tiles = pieceData[type].tiles[0];
    this.latestKick = 0;
  }
  draw(){
    if (this.type === null){
      return;
    }
    for (var y = 0; y < this.tiles.length; y++){
      for (var x = 0; x < this.tiles[y].length; x++){
        if (this.tiles[y][x] !== 0){
          fill(tileColors.get(this.color));
          rect((x + this.x)*grid.tileWidth + grid.xOffset, ((y + this.y) - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset, grid.tileWidth, grid.tileWidth);
        }
      }
    }
  }
  drawGhost(){
    if (this.type === null){
      return;
    }
    this.preGhostY = this.y;
    snapShift(0,1);
    tileColors.get(this.color).setAlpha(ghostTransparency);
    this.draw();
    tileColors.get(this.color).setAlpha(255);
    this.y = this.preGhostY;
  }
  tileCollidesWithTile(px, py, offx, offy){
    if (this.type === null){
      return;
    }
    if (this.tiles[py - offy][px - offx] !== 0 && 
      (this.y + py < 1 || this.y + py > grid.height - 1 || grid.tiles[this.y + py][this.x + px] !== 0)){
      return true;
    }
    return false;
  }
  pieceCollidesWithTile(offx,offy){
    if (this.type === null){
      return;
    }
    for (var py = 0; py < this.tiles.length; py++){
      for (var px = 0; px < this.tiles[py].length; px++){
        //do not do collision check if the piece does not have a tile in that spot.
        if (this.tileCollidesWithTile(px + offx,py + offy, offx, offy)){
          return true;
        }
      }
    }
    return false;
  }
  shift(x, y){
    if (this.type === null){
      return;
    }
    this.x += x;
    this.y += y;
    if (this.pieceCollidesWithTile(0,0)){
      this.x -= x;
      this.y -= y;
      return false;
    }
    return true;
  }
  //do not have rotation be negative because then the piece's rotation will go into negative and then death.
  //in order to get a negative rotation, just do 3 or something.
  rotate(rotation){
    if (this.type === null){
      return;
    }
    this.rot1 = this.direction;
    this.direction += rotation;
    this.direction %= 4;
    this.rot2 = this.direction;
    this.tiles = pieceData[this.type].tiles[this.direction];

    this.kickTable = pieceData[this.type].kicks[this.rot1][this.rot2];

    for (var k = 0; k < this.kickTable.length; k++){
      if (!this.pieceCollidesWithTile(this.kickTable[k][0],this.kickTable[k][1] * -1)){
        this.x += this.kickTable[k][0];
        this.y += this.kickTable[k][1] * -1;
        this.latestKick = k;
        lastSuccessfulAction = "rotate";
        return true;
      }
    }

    this.direction += rotation * 3;
    this.direction %= 4;
    this.tiles = pieceData[this.type].tiles[this.direction];
    return false;
  }
  //turn the piece object into blocks in the grid tiles
  solidify(){
    if (this.type === "t"){
      var a = false;
      var b = false;
      var c = false;
      var d = false;
      if (this.y + 2 > grid.height - 1){
        c = true;
        d = true;
      }
      if (this.x + 2 > grid.width - 1){
        b = true;
        c = true;
      }
      if (this.y < 0){
        a = true;
        b = true;
      }
      if (this.x < 0){
        a = true;
        d = true;
      }
      if (a || grid.tiles[this.y][this.x]){
        a = true;
      }
      if (b || grid.tiles[this.y][this.x + 2]){
        b = true;
      }
      if (c || grid.tiles[this.y + 2][this.x + 2]){
        c = true;
      }
      if (d || grid.tiles[this.y + 2][this.x]){
        d = true;
      }
      var cornerCount = a + b + c + d;
      if (lastSuccessfulAction === "rotate" && cornerCount >= 3){
        actionIsTspin = true;
        actionIsMini = false;
        if (((this.latestKick === 4 && this.rot1 === 0) && this.rot2 === 1) ||
            ((this.latestKick === 4 && this.rot1 === 0) && this.rot2 === 3) ||
            ((this.latestKick === 4 && this.rot1 === 2) && this.rot2 === 1) ||
            ((this.latestKick === 4 && this.rot1 === 2) && this.rot2 === 3)){
          actionIsMini = false;
        } else {
          if (pieceData.t.miniTiles[this.direction].includes("a")){
            if (a === false){
              actionIsMini = true;
            }
          }
          if (pieceData.t.miniTiles[this.direction].includes("b")){
            if (b === false){
              actionIsMini = true;
            }
          }
          if (pieceData.t.miniTiles[this.direction].includes("c")){
            if (c === false){
              actionIsMini = true;
            }
          }
          if (pieceData.t.miniTiles[this.direction].includes("d")){
            if (d === false){
              actionIsMini = true;
            }
          }
        }
        
      }
    }


    if (this.type === null){
      return;
    }
    for (var yy = 0; yy < this.tiles.length; yy++){
      for (var xx = 0; xx < this.tiles[0].length; xx++){
        if (this.tiles[yy][xx] != 0){
          grid.tiles[yy + this.y][xx + this.x] = this.color;
        }
      }
    }
    lastSuccessfulAction = "harddrop"
  }
}



function getTileColors(){
  tileColors = new Map();
  tileColors.set(0, color(0,0,0));
  tileColors.set(1, color(213,22,59));
  tileColors.set(2, color(225,91,29));
  tileColors.set(3, color(225,158,37));
  tileColors.set(4, color(92,175,31));
  tileColors.set(5, color(32,156,213));
  tileColors.set(6, color(36,70,195));
  tileColors.set(7, color(173,46,137));
  tileColors.set(8, color(200,200,200));
}



function makeGrid(){
  for (y = 0; y < grid.height; y++){
    gridRow = [];
    for (x = 0; x < grid.width; x++){
      gridRow.push(0);
    }
    grid.tiles.push(gridRow);
  }
}

holdPieceUIPositionX = -5;
holdPieceUIPositionY = grid.height - grid.visibleHeight;

nextPieceUIPositionX = grid.width + 1
nextPieceUIPositionY = grid.height - grid.visibleHeight
nextPieceUIDistance = 3;

function setup() {
  randomizeGarbageHole()

  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
  }, false);
  createCanvas(600, 600);
  makeGrid();
  getTileColors();
  getClearTypes();
  getTspinClearTypes();
  getTspinMiniClearTypes();
  
  pieces[0] = 0;
  pieces.push(new Piece(null, holdPieceUIPositionX, holdPieceUIPositionX));

  fillNextQueue();

  for (i = 0; i < previews; i++){
    pieces.push(new Piece(nextQueue[i], nextPieceUIPositionX, nextPieceUIPositionY + nextPieceUIDistance * i));
  }
  spawnNewPiece(nextQueue[0],true);

}

function draw() {
  mostRecentClearAnimationTimer -= 1;
  if (piecesPlacedTotal > 0 && !dead){
    framesPassedSinceReset += 1;
  }
  apmBotFrameTimer += 1;
  if (apmBotFrameTimer >= apmBotFramesPerAttack){
    apmBotFrameTimer = 0;
    garbageQueue.push(apmBotLinesPerAttack);
    garbageQueueAmount += apmBotLinesPerAttack;
  }
  background(0);
  fill(255);
  if (!dead){
    handleHeldControls();
  }
  drawGrid();
  drawGarbageMeter();
  drawStats();
  drawPieces();
  
  if (menuOpen){
    textSize(12);
    drawMenuButtons();
    if (controlToRebind){
      fill(255);
      text(`Press any key to rebind control: ${controlToRebind}`, 120, 30);
    }
    if (handlingCountersDrawn){
      fill(255);
      text(`Current DAS ${settings.das}`, 120, 30);
      text(`Current ARR ${settings.arr}`, 120, 50);
      text(`Current SDF ${settings.sdf}`, 120, 70);
      text(`All are in frames`, 120, 90);
    }
  }
  
}

function drawStats(){
  fill(255);
  textSize(14);
  pps = piecesPlacedTotal/(framesPassedSinceReset/60);
  lpm = linesClearedTotal/(framesPassedSinceReset/60/60);
  apm = attackSentTotal/(framesPassedSinceReset/60/60);
  app = attackSentTotal/piecesPlacedTotal;
  if (isNaN(pps)){
    pps = 0;
    lpm = 0;
    apm = 0;
    app = 0;
  }
  minutes = floor(framesPassedSinceReset/60/60)
  seconds = framesPassedSinceReset/60 % 60;
  text(`p - ${piecesPlacedTotal}`,grid.xOffset - grid.tileWidth/2 - 140, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 110)
  text(`pps - ${floor(pps*100)/100}`,grid.xOffset - grid.tileWidth/2 - 80, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 110)
  text(`a - ${attackSentTotal}`,grid.xOffset - grid.tileWidth/2 - 140, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 94)
  text(`apm - ${floor(apm*100)/100}`,grid.xOffset - grid.tileWidth/2 - 80, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 94)
  text(`l - ${linesClearedTotal}`,grid.xOffset - grid.tileWidth/2 - 140, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 78)
  text(`lpm - ${floor(lpm*100)/100}`,grid.xOffset - grid.tileWidth/2 - 80, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 78)
  text(`app - ${floor(app*100)/100}`,grid.xOffset - grid.tileWidth/2 - 80, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 62)
  text(`${minutes}:${(floor(seconds).toString().length === 1) ? `0` : ``}${floor(seconds*1000)/1000}`,grid.xOffset - grid.tileWidth/2 - 80, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset);
  if (linesClearedTotal >= 40){
    text(`40L time - ${sprintMinutes}:${(floor(sprintSeconds).toString().length === 1) ? `0` : ``}${floor(sprintSeconds*1000)/1000}`,grid.xOffset - grid.tileWidth/2 - 80, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset + 16);
  }
  text(`PCs - ${perfectClears}`,grid.xOffset - grid.tileWidth/2 - 100, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 200)
  textSize(20);
  text(`btb - ${max(btb,0)}`,grid.xOffset - grid.tileWidth/2 - 100, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 240)
  text(`combo - ${max(combo,0)}`,grid.xOffset - grid.tileWidth/2 - 100, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 220)
  if (mostRecentClearAnimationTimer > 0){
    text(mostRecentClear,grid.xOffset - grid.tileWidth/2 - 155, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - 150)
  }
}

function drawMenuButtons(){
  stroke(255);
  strokeWeight(1);
  noFill();
  for (b = 0; b < menuButtons.length; b++){
    menuButtons[b].draw();
  }
}

function drawPieces(){
  noStroke();
  for (p = 0; p < pieces.length; p++){
    pieces[p].draw();
  }
  pieces[0].drawGhost();
}

function drawGrid() {
  for (y = 0; y < grid.height; y++){
    for (x = 0; x < grid.width; x++){
      if (y > grid.height - (grid.visibleHeight + 1) && grid.tiles[y][x] === 0){
        stroke(80);
        strokeWeight(0.5);
      } else {
        noStroke();
      }
      fill(tileColors.get(grid.tiles[y][x]));
      rect(x*grid.tileWidth + grid.xOffset, (y - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset, grid.tileWidth, grid.tileWidth);
    }
  }
}

function drawGarbageMeter(){
  fill(255,0,0);
  rect(grid.xOffset - grid.tileWidth/2, (grid.height - (grid.height - grid.visibleHeight)) * grid.tileWidth + grid.yOffset - garbageQueueAmount * grid.tileWidth, grid.tileWidth/2, garbageQueueAmount * grid.tileWidth);
}


function keyPressed(){
  if (controlToRebind){
    switch (controlToRebind) {
      //how do i make gooder?
      case "right":
        controlSettings.right = keyCode;
        break;
      case "left":
        controlSettings.left = keyCode;
        break;
      case "hardDrop":
        controlSettings.hardDrop = keyCode;
        break;
      case "softDrop":
        controlSettings.softDrop = keyCode;
        break;
      case "cw":
        controlSettings.rotCW = keyCode;
        break;
      case "ccw":
        controlSettings.rotCCW = keyCode;
        break;
      case "180":
        controlSettings.rot180 = keyCode;
        break;
      case "hold":
        controlSettings.hold = keyCode;
        break;
      case "reset":
        controlSettings.reset = keyCode;
        break;
      default:
        break;
    }
    controlToRebind = null;
  }
  if (keyCode === 27){
    menuOpen = !menuOpen;
  }
  if (keyCode === controlSettings.reset){

    actionIsMini = false;
    actionIsTspin = false;
    combo = -1;
    btb = -1;
    perfectClears = 0;
    linesClearedTotal = 0;

    sprintTimerGoing = true;
    sprintMinutes = 0;
    sprintSeconds = 0;

    lastSuccessfulAction = "harddrop";

    attackSentTotal = 0;

    framesPassedSinceReset = 0;
    piecesPlacedTotal = 0;
    apmBotFrameTimer = 0;

    garbageQueue = [];
    garbageQueueAmount = 0;
    bag = [];

    piecesPlacedInBag = 0;
    holdAvailable = false;
    dasTimer = 0;
    arrTimer = 0;
    softDropTimer = 0;
    dasActive = false;
    piecesPlacedInBag = 0;
    dead = false;
    grid.tiles = [];
    makeGrid();
    nextQueue = [];
    pieces = [0];
    pieces.push(new Piece(null, holdPieceUIPositionX, holdPieceUIPositionX));

    fillNextQueue();

    for (i = 0; i < previews; i++){
      pieces.push(new Piece(nextQueue[i], nextPieceUIPositionX, nextPieceUIPositionY + nextPieceUIDistance * i));
    }
    spawnNewPiece(nextQueue[0],true);
    getTileColors();
  }
  if (!dead){
    switch (keyCode){
      case controlSettings.left:
        oldpieces0x = pieces[0].x;
        oldpieces0y = pieces[0].y;
        pieces[0].shift(-1,0);
        if ((oldpieces0x != pieces[0].x) || (oldpieces0y != pieces[0].y)){
          lastSuccessfulAction = "shift";
        }
        dasTimer = 0;
        arrTimer = 0;
        dasActive = false;
        break;
      case controlSettings.right:
        oldpieces0x = pieces[0].x;
        oldpieces0y = pieces[0].y;
        pieces[0].shift(1,0);
        if ((oldpieces0x != pieces[0].x) || (oldpieces0y != pieces[0].y)){
          lastSuccessfulAction = "shift";
        }
        dasTimer = 0;
        arrTimer = 0;
        dasActive = false;
        break;
      case controlSettings.hardDrop:
        doHardDrop();
        break;
      case controlSettings.softDrop:
        oldpieces0x = pieces[0].x;
        oldpieces0y = pieces[0].y;
        pieces[0].shift(0,1);
        if ((oldpieces0x != pieces[0].x) || (oldpieces0y != pieces[0].y)){
          lastSuccessfulAction = "softdrop";
        }
        break;
      case controlSettings.rotCW:
        pieces[0].rotate(1);
        break;
      case controlSettings.rotCCW:
        pieces[0].rotate(3);
        break;
      case controlSettings.rot180:
        pieces[0].rotate(2);
        break;
      case controlSettings.hold:
        //hold
        if (!holdAvailable){
          break;
        }
        lastSuccessfulAction = "hold";
        holdAvailable = false;
        if (pieces[1].type === null){
          pieces[1] = new Piece(pieces[0].type, holdPieceUIPositionX, holdPieceUIPositionY);
          deleteActivePiece();
          spawnNewPiece(nextQueue[0], true);
        } else {
          holdPieceType = pieces[1].type;
          pieces[1] = new Piece(pieces[0].type, holdPieceUIPositionX, holdPieceUIPositionY);
          deleteActivePiece();
          spawnNewPiece(holdPieceType, false);
        }
        break;
    }
  }
}




function addGarbage(amount){
  for (a = grid.height - amount; a < grid.height; a++){
    if (random(0,1) < garbageMessiness){
      randomizeGarbageHole()
    }
    for (w = 0; w < grid.width; w++){
      if (w === nextGarbageHole){
        grid.tiles[a][w] = 0;
      } else {
        grid.tiles[a][w] = 8;
      }
    }
  }
  randomizeGarbageHole()
}

function randomizeGarbageHole(){
  nextGarbageHole = floor(random(0,grid.width));
}

function handleHeldControls(){
  if (keyIsDown(controlSettings.left)){
    dasTimer += 1;
    arrTimer += 1;
    if (dasTimer > settings.das){
      dasActive = true;
    }
    if (dasActive === true && arrTimer >= settings.arr){
      arrTimer = 0;
      if (settings.arr === 0){
        snapShift(-1, 0)
      } else {
        pieces[0].shift(-1,0);
      }
    }
  }
  
  if (keyIsDown(controlSettings.right)){
    dasTimer += 1;
    arrTimer += 1;
    if (dasTimer >= settings.das){
      dasActive = true;
    }
    if (dasActive === true && arrTimer >= settings.arr){
      arrTimer = 0;
      oldpieces0x = pieces[0].x;
      oldpieces0y = pieces[0].y;
      if (settings.arr === 0){
        snapShift(1, 0)
      } else {
        pieces[0].shift(1,0);
      }
      if ((oldpieces0x != pieces[0].x) || (oldpieces0y != pieces[0].y)){
        lastSuccessfulAction = "shift";
      }
    }
  }
  if (keyIsDown(controlSettings.softDrop)){
    softDropTimer += 1;
    if (softDropTimer >= settings.sdf){
      oldpieces0x = pieces[0].x;
      oldpieces0y = pieces[0].y;
      if (settings.sdf === 0){
        snapShift(0,1)
      } else {
        softDropTimer = 0;
        pieces[0].shift(0,1);
      }
      if ((oldpieces0x != pieces[0].x) || (oldpieces0y != pieces[0].y)){
        lastSuccessfulAction = "softdrop";
      }
    }
  }
}

function logGrid(saidGrid){
  logChamp = ``;
  for (yh = 0; yh < saidGrid.length; yh++){
    logGridRow = ``;
    for (xw = 0; xw < saidGrid[0].length; xw++){
      logGridRow += String(saidGrid[yh][xw]);
    }
    logChamp += logGridRow;
    logChamp += `
`
  }
}

function doHardDrop(){
  oldpieces0x = pieces[0].x;
  oldpieces0y = pieces[0].y;
  snapShift(0, 1)
  if ((oldpieces0x != pieces[0].x) || (oldpieces0y != pieces[0].y)){
    lastSuccessfulAction = "harddrop";
  }
  solidifyActivePiece();
  spawnNewPiece(nextQueue[0], true);
}

function solidifyActivePiece(){
  solidificationIsTspin = false;
  piecesPlacedTotal += 1;
  piecesPlacedInBag += 1;
  pieces[0].solidify();
  deleteActivePiece();
  if (!checkForLineClears()){
    combo = -1;
    solidifyGarbageMeter();
  } else {
    combo += 1;
  }
}

function solidifyGarbageMeter(){
  garbageQueueAmount = 0;
  for (g = 0; g < garbageQueue.length; g++){
    moveUpRows(garbageQueue[g]);
    addGarbage(garbageQueue[g]);
  }
  garbageQueue = [];
}

function snapShift(x, y){
  while (pieces[0].shift(x,y)){
    
  }
}

function spawnNewPiece(type, cyclePieces){
  pieces[0] = new Piece(type, floor(grid.width/2) - 2, grid.height - grid.visibleHeight + spawnYOffset);
  if (!pieces[0].shift(0,0)){
    dead = true;
    tileColors.set(1,color(100));
    tileColors.set(2,color(125));
    tileColors.set(3,color(200));
    tileColors.set(4,color(150));
    tileColors.set(5,color(175));
    tileColors.set(6,color(50));
    tileColors.set(7,color(75));
    tileColors.set(8,color(255));
    pieces[0] = new Piece(null, null, null)
  }
  if (cyclePieces){
    holdAvailable = true;
    nextQueue.splice(0,1);
    fillNextQueue();
    refreshPreviews();
  }
}

function fillNextQueue(){
  if (piecesPlacedInBag % bagLength === 0){
    while (nextQueue.length < previews + bagLength){
      for (e = 0; e < bagSet7.length; e++){
        bag.push(bagSet7[e]);
      }
      while (bag.length > 0) {
        selectedPieceFromBag = floor(random(0,bag.length));
        nextQueue.push(bag[selectedPieceFromBag]);
        bag.splice(selectedPieceFromBag,1);
      }
    }
    piecesPlacedInBag = 0;
  }
  
}

function refreshPreviews(){
  for (p = 0; p < previews; p++){
    pieces[p + 2].type = nextQueue[p];
    pieces[p + 2].color = pieceData[pieces[p + 2].type].color;
    pieces[p + 2].tiles = pieceData[pieces[p + 2].type].tiles[0];
  }
}

function deleteActivePiece(){
  pieces[0] = new Piece(null, null, null);
}

function checkForLineClears(){
  lineCleared = false;
  linesCleared = 0;
  for (y = grid.height - 1; y >= 0; y--){
    tilesFilledInRow = 0;
    for (x = 0; x < grid.width; x++){
      if (grid.tiles[y][x] > 0){
        tilesFilledInRow += 1;
      }
      if (tilesFilledInRow >= grid.width){
        linesCleared += 1;
        linesClearedTotal += 1;
        lineCleared = true
        moveDownRows(y);
        y++;
      }
    }
  }
  if (linesCleared !== 0){
    if (linesCleared >= 4 || actionIsTspin){
      btb += 1;
    } else {
      btb = -1;
    }
  }

  if (btb < 1){
    btbLevel = 0;
  } else if (btb < 3){
    btbLevel = 1;
  } else {
    btbLevel = 2;
  }
  btbLevel = `level${btbLevel}`;
  attackSentThisPiece = 0;
  if (actionIsTspin){
    if (actionIsMini){
      if (typeof(tSpinMiniClearTypes.get(linesCleared)) != "undefined"){
        mostRecentClearAnimationTimer = 160;
        mostRecentClear = tSpinMiniClearTypes.get(linesCleared);
        attackSentThisPiece += attackTable[btbLevel].tspinminis[linesCleared][min(combo + 1,attackTable[btbLevel].tspinminis[linesCleared].length - 1)];
      }
    } else {
      if (typeof(tSpinClearTypes.get(linesCleared)) != "undefined"){
        mostRecentClearAnimationTimer = 160;
        mostRecentClear = tSpinClearTypes.get(linesCleared);
        attackSentThisPiece += attackTable[btbLevel].tspins[linesCleared][min(combo + 1,attackTable[btbLevel].tspins[linesCleared].length - 1)];
      }
    }
    
  } else {
    if (typeof(clearTypes.get(linesCleared)) != "undefined"){
      mostRecentClearAnimationTimer = 160;
      mostRecentClear = clearTypes.get(linesCleared);
      attackSentThisPiece += attackTable[btbLevel].clears[linesCleared][min(combo + 1,attackTable[btbLevel].clears[linesCleared].length - 1)];
    }
  }
  attackSentTotal += attackSentThisPiece;
  while (attackSentThisPiece > 0){
    garbageQueue[0] -= 1;
    garbageQueueAmount -= 1;
    attackSentThisPiece -= 1;
    if (garbageQueue[0] <= 1){
      garbageQueue.splice(0,1)
    }
  }
  if (garbageQueueAmount < 0){
    garbageQueueAmount = 0;
  }

  actionIsTspin = false;
  //check for pc
  pcHappened = true;
  for (h = 0; h < grid.height; h++){
    for (w = 0; w < grid.width; w++){
      if (grid.tiles[h][w] !== 0){
        pcHappened = false;
      }
    }
  }
  perfectClears += pcHappened;
  attackSentTotal += pcHappened * attackTable.pcDamage;
  if (sprintTimerGoing && linesClearedTotal >= 40){
    sprintTimerGoing = false;
    sprintMinutes = floor(framesPassedSinceReset/60/60)
    sprintSeconds = framesPassedSinceReset/60 % 60;
  }



  return lineCleared;
}



function getClearTypes(){
  clearTypes = new Map();
  clearTypes.set(1, "SINGLE");
  clearTypes.set(2, "DOUBLE");
  clearTypes.set(3, "TRIPLE");
  clearTypes.set(4, "QUAD");
}

function getTspinClearTypes(){
  tSpinClearTypes = new Map();
  tSpinClearTypes.set(1, "T-SPIN SINGLE");
  tSpinClearTypes.set(2, "T-SPIN DOUBLE");
  tSpinClearTypes.set(3, "T-SPIN TRIPLE");
}

function getTspinMiniClearTypes(){
  tSpinMiniClearTypes = new Map();
  tSpinMiniClearTypes.set(1, "T-MINI SINGLE");
  tSpinMiniClearTypes.set(2, "T-MINI DOUBLE");
}



function moveDownRows(above){
  for (h = above; h >= 1; h--){
    for (j = 0; j < grid.tiles[h].length; j++){
      grid.tiles[h][j] = grid.tiles[h - 1][j];
    }
  }
}

function moveUpRows(amount){
  for (a = 0; a < amount; a++){
    for (h = 0; h < grid.height; h++){
      for (j = 0; j < grid.tiles[h].length; j++){
        if (h + 1 >= grid.height){
          grid.tiles[h][j] = 0;
        } else {
          grid.tiles[h][j] = grid.tiles[h + 1][j];
        }
      }
    }
  }
}


function mouseClicked(){
  if (menuOpen){
    for (m = 0; m < menuButtons.length; m++){
      if (menuButtons[m].checkForClick()){
        return;
      }
    }
  }
}