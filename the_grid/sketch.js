canvasScale = 2;

class Cam{
  /**
 * @constructor
 * @param {number} focusScreenPositionX - The x position on the screen of the camera's focus.
 * @param {number} focusScreenPositionY - The y position on the screen of the camera's focus.
 * @param {number} x - X position of the camera.
 * @param {number} y - Y position of the camera.
 * @param {number} angle - The rotation of the camera in degrees.
 * @param {number} zoom - A multiplier applied to the scale of the canvas.
 * @param {number} targetX - Where the camera will attempt to move towards (X axis).
 * @param {number} targetY - Where the camera will attempt to move towards (Y axis).
 * @param {number} targetAngle - The angle the camera will attempt to rotate to
 * @param {number} targetZoom - The zoom scale the camera will attempt to zoom to
 * @param {number} smoothingX - How smoothly the camera will attempt to center on its focus.
 * @param {number} smoothingY - How smoothly the camera will attempt to center on its focus.
 * @param {number} angleSmoothing - How smoothly the camera will attempt to rotate to reach its targetAngle.
 * @param {number} zoomSmoothing - How smoothly the camera will attempt to zoom to reach its targetZoom.
 */
  constructor(focusScreenPositionX = 0, focusScreenPositionY = 0, x = 0, y = 0, targetX = 0, targetY = 0, targetAngle = 0, targetZoom = 1, angle = 0, zoom = 1, smoothingX = 10, smoothingY = 10, zoomSmoothing = 10, angleSmoothing = 10){
    this.focusScreenPositionX = focusScreenPositionX;
    this.focusScreenPositionY = focusScreenPositionY;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.zoom = zoom;
    this.targetX = targetX;
    this.targetY = targetY;
    this.targetAngle = targetAngle;
    this.targetZoom = targetZoom;
    this.smoothingX = smoothingX;
    this.smoothingY = smoothingY;
    this.angleSmoothing = angleSmoothing;
    this.zoomSmoothing = zoomSmoothing;
  }
  moveFocusScreenPosition(){
    this.focusScreenPositionX = windowWidth/2;
    this.focusScreenPositionY = windowHeight/2;
  }
  moveCameraTowardsFocus(){
    this.x += (this.targetX - this.x) / this.smoothingX;
    this.y += (this.targetY - this.y) / this.smoothingY;
    this.zoom += (this.targetZoom - this.zoom) / this.zoomSmoothing;
    this.angle += (this.targetAngle - this.angle) / this.angleSmoothing;
  }
}


function preload(){
  awesomeImage = loadImage("awesome_image.png")
}

function setup() {
  backgroundColor = color(30,0,50)
  backgroundLineColor = color(50,10,80)
  dotColor = color(220,140,255)
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  cam = new Cam(focusScreenPositionX = windowWidth/2, focusScreenPositionY = windowHeight/2, x = 0, y = 0, targetX = 0, targetY = 0, targetAngle = 0, targetZoom = 1, angle = 0, zoom = 0.3, smoothingX = 10, smoothingY = 10, zoomSmoothing = 10, angleSmoothing = 10)
  windowAspectRatio = windowWidth/windowHeight;
  backgroundLines.lineDistance = windowHeight/backgroundLines.lineCount;
  fillDotGrid();
}



function draw() {
  canvasScale = (windowHeight) / 800 * cam.zoom;
  cam.moveCameraTowardsFocus();
  //cam.focusScreenPositionX = (sin(frameCount/28))/2 * 50 + windowWidth/2;
  //cam.focusScreenPositionY = (cos(frameCount/28))/2 * 50 + windowHeight/2;
  strokeWeight(3)
  background(backgroundColor);
  drawBackgroundLines();
  drawFarBackground();
  drawForeground();
  drawUI();
}

function doCameraTransformation(distance){
  push();
  translate(cam.focusScreenPositionX,cam.focusScreenPositionY);
  scale(canvasScale * distance);
  rotate(cam.angle);
  translate(-cam.x, -cam.y);
}


backgroundLines = {
  lineCount: 20,
  lineDistance: 35,
  lineOffset: 0,
  lineSpeed: 3,
}

function drawBackgroundLines(){
  backgroundLines.lineOffset += backgroundLines.lineSpeed;
  backgroundLines.lineOffset %= backgroundLines.lineDistance
  for (i = 0; i < backgroundLines.lineCount; i++){
    stroke(backgroundLineColor);
    noFill();
    line(0, i*backgroundLines.lineDistance + backgroundLines.lineOffset, windowWidth,i*backgroundLines.lineDistance + backgroundLines.lineOffset)
  }
}

gamePhase = "picking"

class Dot{
  constructor(x, y){
    this.tileX = x;
    this.tileY = y;
    this.x = this.tileX * dots.dotDistance - dots.dotDistance * dots.gridWidth * 0.5 + dots.dotDistance * 0.5;
    this.y = this.tileY * dots.dotDistance - dots.dotDistance * dots.gridWidth * 0.5 + dots.dotDistance;
    this.xv = 0;
    this.yv = 0;
    this.friction = 0.95;
    this.targetX = this.x;
    this.targetY = this.y;
  }
  draw(){
    this.xv += (this.targetX - this.x) * dots.movementSmoothing;
    this.yv += (this.targetY - this.y) * dots.movementSmoothing;
    this.x += this.xv;
    this.y += this.yv;
    this.xv *= this.friction;
    this.yv *= this.friction;
    fill(dotColor);
    noStroke();
    ellipse(this.x, this.y, dots.dotSize, dots.dotSize);
    // stroke(dotColor);
    // for (var yy = 0; yy < dots.gridHeight; yy++){
    //   for (var xx = 0; xx < dots.gridWidth; xx++){
    //     if ((dots.grid[yy][xx].x - this.x) ** 2 + (dots.grid[yy][xx].y - this.y) ** 2 < dots.connectionDistance){
    //     line(this.x, this.y, dots.grid[yy][xx].x, dots.grid[yy][xx].y);
    //     }
    //   }
    // }
  }
}

dots = {
  gridWidth: 8,
  gridHeight: 6,
  dotSize: 12,
  dotDistance: 90,
  movementSmoothing: 0.25,
  grid: [],
  connectionDistance: 50000,
}

aweomseImageTransparency = 100;

function drawFarBackground(){
  aweomseImageTransparency -= 3;
  if (aweomseImageTransparency < 1){
    aweomseImageTransparency = 100;
  }
  doCameraTransformation(0.5);
  console.log(aweomseImageTransparency);
  tint(255, aweomseImageTransparency);
  image(awesomeImage, -5000, 3000, 250, 250)
  pop();
}

function drawForeground(){
  doCameraTransformation(1);
  for (y = 0; y < dots.gridHeight; y++){
    for (x = 0; x < dots.gridWidth; x++){
      dots.grid[y][x].draw();
    }
  }
  //ellipse(convertedX(mouseX), convertedY(mouseY), 25, 25)
  pop();
}

function fillDotGrid(){
  for (y = 0; y < dots.gridHeight; y++){
    gridRow = [];
    for (x = 0; x < dots.gridWidth; x++){
      gridRow.push(new Dot(x, y))
    }
    dots.grid.push(gridRow);
  }
}







function drawUI(){
  stroke(dotColor);
  strokeWeight(1);
  noFill();
  ellipse(mouseX, mouseY, 10, 10)
  //drawDebugCameraElements();
}

function convertedX(x){
  return (x - cam.focusScreenPositionX) / canvasScale + cam.x;
}

function convertedY(y){
  return (y - cam.focusScreenPositionY) / canvasScale + cam.y;
}

function doCameraTransformation(distance){
  push();
  translate(cam.focusScreenPositionX,cam.focusScreenPositionY);
  scale(canvasScale * distance);
  rotate(cam.angle);
  translate(-cam.x, -cam.y);
}






function drawDebugCameraElements(){
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(cam.focusScreenPositionX, cam.focusScreenPositionY, 30, 30);
  rect(mouseX, mouseY, 30, 30);
  strokeWeight(1);
  line(0,0,windowWidth,windowHeight);
  line(windowWidth,0,0,windowHeight);
}


function rotateElement(centerX, centerY, angle){
  push();
  translate(centerX,centerY);
  rotate(angle);
  translate(-centerX,-centerY);
}

function scaleElement(centerX, centerY, scaleFactorX, scaleFactorY){
  push();
  translate(centerX,centerY);
  scale(scaleFactorX,scaleFactorY);
  translate(-centerX,-centerY);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspectRatio = windowWidth/windowHeight;
  backgroundLines.lineDistance = windowHeight/backgroundLines.lineCount;
  //set the current camera's focus to the center of the screen.
  cam.moveFocusScreenPosition();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      cam.targetX -= 100;
      break;
      case RIGHT_ARROW:
        cam.targetX += 100;
      break;
      case UP_ARROW:
        cam.targetY -= 100;
      break;
      case DOWN_ARROW:
        cam.targetY += 100;
      break;
      case 87:
        cam.targetZoom += 0.25;
        cam.targetZoom = min(3, cam.targetZoom);
      break;
      case 83:
        cam.targetZoom -= 0.25;
        cam.targetZoom = max(0.25, cam.targetZoom);
        break;
    default:
      break;
  }

  
}

function mousePressed(){  
  for (y = 0; y < dots.gridHeight; y++){
    for (x = 0; x < dots.gridWidth; x++){
      distanceToMouseX = dots.grid[y][x].x - convertedX(mouseX);
      distanceToMouseY = dots.grid[y][x].y - convertedY(mouseY);
      pureDistance = sqrt(distanceToMouseX ** 2 + distanceToMouseY ** 2);
      v = createVector(distanceToMouseX, distanceToMouseY);
      v.normalize();
      dots.grid[y][x].xv += max(0,-((pureDistance ** 2)/2500) + 20) * v.x
      dots.grid[y][x].yv += max(0,-((pureDistance ** 2)/2500) + 20) * v.y
    }
  }
}