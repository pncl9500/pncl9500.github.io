



function setup(){
  document.addEventListener('contextmenu', event => event.preventDefault());
  noCursor();
  createCanvas(windowWidth, windowHeight);
  player.x = gameMap.w/2 - player.w/2 + gameMap.x;
  player.y = gameMap.h/2 - player.h/2 + gameMap.y;
}

gameMap = {
  x: 0,
  y: 0,
  w: 768,
  h: 768,

  r: 255,
  g: 255,
  b: 255,

  liner: 240,
  lineg: 240,
  lineb: 240,

  xDivisions: 4,
  yDivisions: 4,
}



cam = {
  x: 0,
  y: 0,
  offsetX: 640,
  offsetY: 360,
  smoothing: 10,
  zoom: 1,

  shakeX: 0,
  shakeY: 0,
}

player = {
  x: 0,
  y: 0,
  xv: 0,
  yv: 0,
  w: 4,
  h: 4,
  r: 0,
  g: 0,
  b: 0,
  friction: 0.8,
  speed: 0.3,
}

crosshair = {
  x: 0,
  y: 0,
  r: 255,
  g: 80,
  b: 30,
  w: 5,
  h: 5,
}

function detect2BoxesCollision(rect1, rect2){
  return (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y);
}


function draw(){
  canvasScale = windowWidth/640;

scale(canvasScale);


  background(0,0,0);


  noStroke();

  //move player
  if (keyIsDown(87)){
    player.yv -= player.speed;
  }
  if (keyIsDown(83)){
    player.yv += player.speed;
  }
  if (keyIsDown(65)){
    player.xv -= player.speed;
  }
  if (keyIsDown(68)){
    player.xv += player.speed;
  }
  player.x += player.xv;
  player.y += player.yv;

  if (player.x < gameMap.x - 1){
    player.x = gameMap.x - 1;
  }
  if (player.x > gameMap.x + gameMap.w - player.w + 1){
    player.x = gameMap.x + gameMap.w - player.w + 1;
  }
  if (player.y < gameMap.y - 1){
    player.y = gameMap.y - 1;
  }
  if (player.y > gameMap.y + gameMap.h - player.h + 1){
    player.y = gameMap.y + gameMap.h - player.h + 1;
  }


  cam.zoom = 1 + (abs(player.xv) + abs(player.yv))/20

  




  
  cam.x += (player.x - cam.x + player.w/2 + crosshair.x) / cam.smoothing;
  cam.y += (player.y - cam.y + player.h/2 + crosshair.y) / cam.smoothing;

  cam.shakeX /= 2;
  cam.shakeY /= 2;

  cam.x += random(cam.shakeX * -1, cam.shakeX);
  cam.y += random(cam.shakeY * -1, cam.shakeY);


  player.xv *= player.friction;
  player.yv *= player.friction;

  //draw map
  fill(gameMap.r,gameMap.g,gameMap.b);
  rect(gameMap.x - cam.x + cam.offsetX, gameMap.y - cam.y + cam.offsetY, gameMap.w, gameMap.h)

  noFill();
  stroke(gameMap.liner,gameMap.lineg,gameMap.lineb);

  for (x = 0; x < gameMap.xDivisions; x++){
    for (y = 0; y < gameMap.yDivisions; y++){
      rect(gameMap.x + (gameMap.w/gameMap.xDivisions) * x - cam.x + cam.offsetX, gameMap.y + (gameMap.h/gameMap.yDivisions) * y - cam.y + cam.offsetY, gameMap.w/gameMap.xDivisions,gameMap.h/gameMap.yDivisions)
    }
  }

  noStroke();

  //draw player
  fill(player.r,player.g,player.b);
  rect(player.x - cam.x + cam.offsetX,player.y - cam.y + cam.offsetY,player.w,player.h);

  //draw mouse pointer
  crosshair.x = mouseX/canvasScale;
  crosshair.y = mouseY/canvasScale;

  stroke(crosshair.r, crosshair.g, crosshair.b);
  strokeWeight(1);
  noFill();
  ellipse(crosshair.x, crosshair.y, crosshair.w, crosshair.h);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  fullscreen(true);
}
