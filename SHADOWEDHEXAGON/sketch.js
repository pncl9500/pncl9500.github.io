playerDistance = 75;
playerAngle = 0;
playerTurnSpeed = 12;
cameraTurnSpeed = 3;
cameraInvertDuration = 250;
cameraInvertTimer = 0;
playerWidth = 5;
playerLength = 13;
playerVisualOffset = -5;
pinwheelSwapDuration = 60;
pinwheelSwapTimer = 0;
pinwheelSwapped = true;
centerSides = 6;
centerRadius = 45;
centerStrokeWidth = 5;
wallSpeed = 13;
timer = 0;
highScore = 0;
pulseTimer = 0;
pulseDuration = 35;
centerTargetRadius = 45;



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
  angleMode(DEGREES);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  cam = new Cam(focusScreenPositionX = windowWidth/2, focusScreenPositionY = windowHeight/2, x = 0, y = 0, targetX = 0, targetY = 0, targetAngle = 0, targetZoom = 1, angle = 0, zoom = 1, smoothingX = 1, smoothingY = 1, zoomSmoothing = 1, angleSmoothing = 1)
  windowAspectRatio = windowWidth/windowHeight;
  backgroundColor = color(10, 0, 40);
  foregroundColor = color(150, 125, 255);
  pinwheelColor = color(30, 0, 90);
  randoff = floor(random(0, centerSides));
}

function draw() {
  pulseTimer += 1;
  if (pulseTimer >= pulseDuration){
    pulseTimer = 0;
    centerRadius = 55;
  }
  centerRadius += (centerTargetRadius - centerRadius) / 15
  timer += 1;
  if (timer > highScore){
    highScore = timer;
  }
  handlePatterns();
  canvasScale = (windowHeight) / 800 * cam.zoom;
  cam.targetAngle += cameraTurnSpeed;
  cam.moveCameraTowardsFocus();
  cameraInvertTimer += 1;
  if (cameraInvertTimer >= cameraInvertDuration){
    cameraTurnSpeed *= -1;
    cameraInvertTimer = 0;
  }
  pinwheelSwapTimer += 1;
  if (pinwheelSwapTimer >= pinwheelSwapDuration){
    pinwheelSwapped = !pinwheelSwapped;
    pinwheelSwapTimer = 0;
  }
  //cam.focusScreenPositionX = (sin(frameCount/28))/2 * 50 + windowWidth/2;
  //cam.focusScreenPositionY = (cos(frameCount/28))/2 * 50 + windowHeight/2;
  if (keyIsDown(LEFT_ARROW)){
    playerAngle -= playerTurnSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)){
    playerAngle += playerTurnSpeed;
  }
  background(backgroundColor);
  
  drawElements();

  drawUI();

  if (timer > 0 && timer < 100){
    backgroundColor = color(10, 0, 40);
    foregroundColor = color(150, 125, 255);
    pinwheelColor = color(30, 0, 90);
  }
  if (timer > 3600 && timer < 3700){
    backgroundColor = color(255, 255, 255);
    pinwheelColor = color(255, 245, 210);
    foregroundColor = color(255, 131, 48);
  }
}



horizontalScale = 1;
verticalScale = 0.8;

function doCameraTransformation(distance){
  verticalScale = 1 + (sin(frameCount/50) - 1)*0.125;
  push();
  translate(cam.focusScreenPositionX,cam.focusScreenPositionY);
  rotate(frameCount/10);
  scale(canvasScale * distance * horizontalScale, canvasScale * distance * verticalScale);
  rotate(cam.angle);
  translate(-cam.x, -cam.y);
}



function drawElements(){
  noStroke();
  doCameraTransformation(1);
  drawPinwheel();
  drawCenter();
  drawWalls();
  drawPlayer();
  pop();
}

function drawWalls(){
  for (i = 0; i < walls.length; i++){
    walls[i].draw();
    if (walls[i].dead){
      walls.splice(i, 1);
      i -= 1;
    }
  }
  if (playerDead){
    walls = [];
    playerDead = false;
    recentPatterns = [0, 1, 2, 3]
  }
}

function drawPinwheel(){
  if (centerSides % 2 === 1){

  } else {
    fill(pinwheelColor);
    for (i = 0; i < centerSides; i++){
      if (i % 2 === 1 * pinwheelSwapped){
        drawQuad(i, centerRadius, 3000);
      }
    }
  }
}

function drawQuad(seg, start, end){
  angle1 = (seg) * (360/centerSides);
  angle2 = (seg + 1) * (360/centerSides);
  quad(
    start * cos(angle1), start * sin(angle1),
    start * cos(angle2), start * sin(angle2),
    end * cos(angle2), end * sin(angle2),
    end * cos(angle1), end * sin(angle1),
  );
}








function drawCenter(){
  stroke(foregroundColor);
  strokeWeight(centerStrokeWidth);
  angleArray = [];
  for (i = 0; i < centerSides; i++){
    angleArray.push(i * 360/centerSides);
  }
  for (i = 0; i < centerSides - 1; i++){
    line(centerRadius * cos(angleArray[i]), centerRadius * sin(angleArray[i]), centerRadius * cos(angleArray[i + 1]), centerRadius * sin(angleArray[i + 1]));
  }
  line(centerRadius * cos(angleArray[0]), centerRadius * sin(angleArray[0]), centerRadius * cos(angleArray[angleArray.length - 1]), centerRadius * sin(angleArray[angleArray.length - 1]));
  noStroke();
}

function drawPlayer(){
  rotateElement(0, 0, playerAngle);
  fill(foregroundColor);
  triangle(
    playerDistance + playerVisualOffset, playerWidth,
    playerDistance + playerVisualOffset, -playerWidth,
    playerDistance + playerVisualOffset + playerLength, 0, 
  );
  pop();  
}

function drawUI(){
  fill(255);
  textSize(22);
  text(`time: ${round(timer/60*100)/100}`, 10,25);
  text(`best: ${round(highScore/60*100)/100}`, 10,45);
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

