dead = false;



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
  das: 4,
  arr: 0,
  sdf: 0,
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
    if (this.type === null){
      return;
    }
    logGrid(grid.tiles);
    logGrid(this.tiles);
    for (var yy = 0; yy < this.tiles.length; yy++){
      for (var xx = 0; xx < this.tiles[0].length; xx++){
        if (this.tiles[yy][xx] != 0){
          grid.tiles[yy + this.y][xx + this.x] = this.color;
        }
      }
    }
    logGrid(this.tiles);
    logGrid(grid.tiles);
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
  tileColors.set(8, color(160,200,190));
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
  createCanvas(600, 600);
  makeGrid();
  getTileColors();
  
  pieces[0] = 0;
  pieces.push(new Piece(null, holdPieceUIPositionX, holdPieceUIPositionX));

  fillNextQueue();

  for (i = 0; i < previews; i++){
    pieces.push(new Piece(nextQueue[i], nextPieceUIPositionX, nextPieceUIPositionY + nextPieceUIDistance * i));
  }
  spawnNewPiece(nextQueue[0],true);
}

function draw() {
  background(0);
  fill(255);
  if (!dead){
    handleHeldControls();
  }
  drawGrid();
  drawPieces();
  if (menuOpen){
    drawMenuButtons();
  }
  if (controlToRebind){
    fill(255);
    text(`Press any key to rebind control: ${controlToRebind}`, 120, 30);
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
    pieces = [0]
    pieces.push(new Piece(null, holdPieceUIPositionX, holdPieceUIPositionX));

    fillNextQueue();

    console.log(nextQueue);
    for (i = 0; i < previews; i++){
      console.log(nextQueue[i]);
      pieces.push(new Piece(nextQueue[i], nextPieceUIPositionX, nextPieceUIPositionY + nextPieceUIDistance * i));
    }
    spawnNewPiece(nextQueue[0],true);
    getTileColors();
  }
  if (!dead){
    switch (keyCode){
      case controlSettings.left:
        pieces[0].shift(-1,0);
        dasTimer = 0;
        arrTimer = 0;
        dasActive = false;
        break;
      case controlSettings.right:
        pieces[0].shift(1,0);
        dasTimer = 0;
        arrTimer = 0;
        dasActive = false;
        break;
      case controlSettings.hardDrop:
        doHardDrop();
        break;
      case controlSettings.softDrop:
        pieces[0].shift(0,1);
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
      if (settings.arr === 0){
        snapShift(1, 0)
      } else {
        pieces[0].shift(1,0);
      }
    }
  }
  if (keyIsDown(controlSettings.softDrop)){
    softDropTimer += 1;
    if (softDropTimer >= settings.sdf){
      if (settings.sdf === 0){
        snapShift(0,1)
      } else {
        pieces[0].shift(0,1);
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

  snapShift(0, 1)
  solidifyActivePiece();
  spawnNewPiece(nextQueue[0], true);
}

function solidifyActivePiece(){
  piecesPlacedInBag += 1;
  pieces[0].solidify();
  deleteActivePiece();
  checkForLineClears();

}

function snapShift(x, y){
  while (pieces[0].shift(x,y)){}
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
  for (y = grid.height - 1; y >= 0; y--){
    tilesFilledInRow = 0;
    for (x = 0; x < grid.width; x++){
      if (grid.tiles[y][x] > 0){
        tilesFilledInRow += 1;
      }
      if (tilesFilledInRow >= grid.width){
        moveDownRows(y);
        y++;
      }
    }
  }
}

function moveDownRows(above){
  for (h = above; h >= 1; h--){
    for (j = 0; j < grid.tiles[h].length; j++){
      grid.tiles[h][j] = grid.tiles[h - 1][j];
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