/**
 * Rotates the next elements to be drawn. Use pop(); after drawing to undo the transformation.
 * @constructor
 * @param {string} centerX - X position of the center of rotation.
 * @param {string} centerY - Y position of the center of rotation.
 * @param {string} angle - Angle to rotate by.
 */
function rotateElement(centerX, centerY, angle){
  push();
  translate(centerX,centerY);
  rotate(angle);
  translate(-centerX,-centerY);
}

/**
 * Scales the next elements to be drawn. Use pop(); after drawing to undo the transformation.
 * @constructor
 * @param {string} centerX - X position to be scaled around.
 * @param {string} centerY - Y position to be scaled around.
 * @param {string} scaleFactorX - Horizontal scale factor.
 * @param {string} scaleFactorY - Vertical scale factor.
 */
function scaleElement(centerX, centerY, scaleFactorX, scaleFactorY){
  push();
  translate(centerX,centerY);
  scale(scaleFactorX,scaleFactorY);
  translate(-centerX,-centerY);
}