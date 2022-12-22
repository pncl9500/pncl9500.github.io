canvasScale = 1;
windowScale = 1;

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
  constructor(focusScreenPositionX = 0, focusScreenPositionY = 0, x = 0, y = 0, targetX = 0, targetY = 0, targetAngle = 0, targetZoom = 1, angle = 0, zoom = 1, smoothingX = 1, smoothingY = 1, zoomSmoothing = 1, angleSmoothing = 1){
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
    this.shakeX = 0;
    this.shakeY = 0;
    this.shakeDampeningX = 0.8;
    this.shakeDampeningY = 0.8;
  }
  moveFocusScreenPosition(){
    this.focusScreenPositionX = windowWidth/2;
    this.focusScreenPositionY = windowHeight/2;
  }
  moveCameraTowardsFocus(){
    this.x += (this.targetX - this.x) * this.smoothingX;
    this.y += (this.targetY - this.y) * this.smoothingY;
    this.zoom += (this.targetZoom - this.zoom) * this.zoomSmoothing;
    windowScale = (windowHeight) * 0.00125;
    canvasScale = windowScale * cam.zoom;
    this.angle += (this.targetAngle - this.angle) * this.angleSmoothing;
    this.shakeX *= this.shakeDampeningX;
    this.shakeY *= this.shakeDampeningY;
    getWindowChunkDimensions();
  }
}


function doLayerTransform(distance){
  push();
  translate(cam.focusScreenPositionX,cam.focusScreenPositionY);
  scale(canvasScale * distance);
  rotate(cam.angle);
  translate(-cam.x + random(-cam.shakeX, cam.shakeX), -cam.y + random(-cam.shakeY, cam.shakeY));
}

/**
 * @param {number} x an X coordinate value in screen coordinates
 * @returns {number} an X coordinate value in game coordinates
 */
 function screenToGameX(x){
  return (x - cam.focusScreenPositionX) / canvasScale + cam.x;
}

/**
 * @param {number} y a Y coordinate value in screen coordinates
 * @returns {number} a Y coordinate value in game coordinates
 */
function screenToGameY(y){
  return (y - cam.focusScreenPositionY) / canvasScale + cam.y;
}

/**
 * @param {number} x an X coordinate value in game coordinates
 * @returns {number} an X coordinate value in screen coordinates
 */
 function gameToScreenX(x){
  return canvasScale * (x - cam.x) + cam.focusScreenPositionX;
}

/**
 * @param {number} y an Y coordinate value in game coordinates
 * @returns {number} an Y coordinate value in screen coordinates
 */
 function gameToScreenY(y){
  return canvasScale * (y - cam.y) + cam.focusScreenPositionY;
}