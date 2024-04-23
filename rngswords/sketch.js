
function setup() {
  document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
  randSeed = floor(random(0, 999999999999));
  //separate url into each parameter
  var urlParams = window.location.search.split("?");
  //remove empty first parameter
  urlParams.shift();
  for (var i = 0; i < urlParams.length; i++){
    //split each parameter into its key and value
    var pair = urlParams[i].split("=");
    var param = pair[0];
    var val = pair[1];
    //do stuff with each parameter
    switch (param) {
      case "seed":
        randSeed = val;
        break;
      default:
        break;
    }
  }
  //randSeed = 0;
  randomSeed(randSeed);

  generateName();
  //doCookieStuff();
  frameRate(60);
  //disable right click menu
  window.addEventListener('contextmenu', function (e) {e.preventDefault(); }, false);

  angleMode(DEGREES);
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  cam = new Cam(focusScreenPositionX = windowWidth/2, focusScreenPositionY = windowHeight/2, x = 0, y = 0, targetX = 0, targetY = 0, targetAngle = 0, targetZoom = 1, angle = 0, zoom = 1, smoothingX = 0.95, smoothingY = 0.95, zoomSmoothing = 0.05, angleSmoothing = 0.05)
  windowAspectRatio = windowWidth/windowHeight;
  createChunks(worldWidth, worldHeight);

  getWindowChunkDimensions();
  generateMap();

  UIright = windowWidth;
  UIleft = 0;
  UIbottom = windowHeight;
  UItop = 0;

  mousePointerEntity = new IndiscColliderEntity(0, 0, 1, 1, 0, [new HitboxWrapper(0, 0, new RectHitbox(1, 1))], new RectHitbox(1, 1), 0, []);
  background(0, 0, 0);
}



function draw() {
  canvasScale = windowHeight * 0.00125 * cam.zoom;
  cam.moveCameraTowardsFocus();
  getInputs();
  if (ctrlsTapped.includes("debugMenu")){
    debugMenuActive = !debugMenuActive;
  }
  if (debugMenuActive){
    if (ctrlsTapped.includes("debugPause")){
      gamePaused = !gamePaused; 
    }
    if (ctrlsTapped.includes("frameSkip")){
      tick();
    }
  }
  if (ctrlsTapped.includes("enableFreeCam")){
    freecamActive = !freecamActive;
  }

  if (!gamePaused){
    tick();
  }
  render();

  resetInputs();
}

/**
 * Calls the update function of every entity within chunks
 * @constructor
 */
function updateChunks(){
  for (x = max(0, getChunkYof(cam.x) - floor(windowChunkWidth / 2) - 1); x <= min(chunks.length - 1, getChunkYof(cam.x) + floor(windowChunkWidth / 2) + 1); x++){
    for (y = max(0, getChunkXof(cam.y) - floor(windowChunkHeight / 2) - 1); y <= min(chunks[0].length - 1, getChunkXof(cam.y) + floor(windowChunkHeight / 2) + 1); y++){
      chunks[x][y].update(); 
    }
  }
}



/**
 * Called whenever the window is resized.
 * @constructor
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspectRatio = windowWidth/windowHeight;
  getWindowChunkDimensions();
  //set the current camera's focus to the center of the screen.
  cam.moveFocusScreenPosition();
  //refresh the UI variables
  UIright = windowWidth;
  UIleft = 0;
  UIbottom = windowHeight;
  UItop = 0;
}