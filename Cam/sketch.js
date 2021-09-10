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


function setup() {
  fogColor = color('rgba(255, 255, 255, 0)');
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  cam = new Cam(focusScreenPositionX = windowWidth/2, focusScreenPositionY = windowHeight/2, x = 200, y = 100, targetX = 200, targetY = 100, targetAngle = 0, targetZoom = 1, angle = 500, zoom = 0.3, smoothingX = 10, smoothingY = 10, zoomSmoothing = 10, angleSmoothing = 10)
  windowAspectRatio = windowWidth/windowHeight;
}

function draw() {
  canvasScale = (windowHeight) / 800 * cam.zoom;
  cam.moveCameraTowardsFocus();
  //cam.focusScreenPositionX = (sin(frameCount/28))/2 * 50 + windowWidth/2;
  //cam.focusScreenPositionY = (cos(frameCount/28))/2 * 50 + windowHeight/2;
  background(200);
  
  drawParallaxDistantbackground();
  drawFog();
  drawParallaxFarbackground();
  drawFog();
  drawParallaxBackground();
  drawFog();
  drawParallaxFarmidground();
  drawParallaxMidground();
  drawFog();
  drawParallaxClosemidground();
  drawParallaxFarSubforeground();
  drawParallaxSubforeground();
  drawParallaxForeground();

  drawUI();
}



function drawFog(){
  noStroke();
  fill(255,255,255,90);
  rectMode(CORNER);
  rect(0,0,windowWidth, windowHeight);
  rectMode(CENTER);
}

function doCameraTransformation(distance){
  push();
  translate(cam.focusScreenPositionX,cam.focusScreenPositionY);
  scale(canvasScale * distance);
  rotate(cam.angle);
  translate(-cam.x, -cam.y);
}

function drawParallaxForeground(){
  doCameraTransformation(1);
  drawRobert();
  pop();
}

function drawParallaxSubforeground(){
  doCameraTransformation(0.95);
  drawRobert();
  pop();
}

function drawParallaxFarSubforeground(){
  doCameraTransformation(0.9);
  drawRobert();
  pop();
}

function drawParallaxClosemidground(){
  doCameraTransformation(0.8);
  drawRobert();
  pop();
}

function drawParallaxMidground(){
  doCameraTransformation(0.65);
  drawRobert();
  pop();
}

function drawParallaxFarmidground(){
  doCameraTransformation(0.5);
  drawRobert();
  pop();
}

function drawParallaxBackground(){
  doCameraTransformation(0.25);
  drawRobert();
  pop();
}

function drawParallaxFarbackground(){
  doCameraTransformation(0.125);
  drawRobert();
  pop();
}

function drawParallaxDistantbackground(){
  doCameraTransformation(0.0625);
  drawRobert();
  pop();
}






function drawUI(){
  //drawDebugCameraElements();
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

function drawRobert(){
  stroke(0);
  rectMode(CENTER);
  fill(255,0,0);
  rect(200,100,90,90);
  rect(300,100,90,90);
  rect(400,100,90,90);
  rotateElement(500,100,frameCount * 2);
  rect(500,100,90,90);
  pop();
  scaleElement(600,100,sin(frameCount)/3 + 1,sin(frameCount)/5 + 1);
  rect(600,100,90,90);
  pop();
  rect(0,0,10,10);
  rect(500,100,10,10);
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
      case 81:
        cam.targetAngle -= 15;
      break;
      case 69:
        cam.targetAngle += 15;
      break;
      case 87:
        cam.targetZoom += 0.25;
      break;
      case 83:
        cam.targetZoom -= 0.25;
        break;
    default:
      break;
  }

  
}