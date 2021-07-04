


function setup(){
  createCanvas(windowWidth, windowWidth/640 * 360);
}

tileTypes = {
  wall: {
    r: 75,
    g: 75,
    b: 75,
    wall: true,
  },
  air: {
    r: 255,
    g: 255,
    b: 255,
    wall: false,
  }
}

tileMap = [["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","air","wall","air","air","air","air","air","air","wall"],
      ["wall","air","air","air","air","air","air","air","air","wall"],
      ["wall","wall","wall","wall","wall","wall","wall","wall","wall","wall"],]

cam = {
  x: 0,
  y: 0,
  offsetX: 320,
  offsetY: 180,
  smoothing: 10,
  zoom: 1,

  shakeX: 0,
  shakeY: 0,
}

player = {
  x: 52,
  y: 52,
  xv: 0,
  yv: 0,
  w: 8,
  h: 8,
  r: 0,
  g: 0,
  b: 0,
  friction: 0.8,
  speed: 0.4,
}

function detect2BoxesCollision(rect1, rect2){
  console.log(rect2);
  return (rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y);
}


function draw(){

  noStroke();

  canvasScale = windowWidth/640;

  scale(canvasScale);


  background(0,0,0);

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


  cam.zoom = 1 + (abs(player.xv) + abs(player.yv))/20

  

  cam.x += 320;
  cam.y += 180;

  cam.x -= 320;
  cam.y -= 180;


  
  cam.x += (player.x - cam.x + player.w/2) / cam.smoothing;
  cam.y += (player.y - cam.y + player.h/2) / cam.smoothing;

  cam.shakeX /= 2;
  cam.shakeY /= 2;

  cam.x += random(cam.shakeX * -1, cam.shakeX);
  cam.y += random(cam.shakeY * -1, cam.shakeY);
  


  //draw tiles and collide player X stuff
  for (y = 0; y < tileMap.length; y++){
    for (x = 0; x < tileMap[y].length; x++){
      fill(tileTypes[tileMap[y][x]].r,tileTypes[tileMap[y][x]].g,tileTypes[tileMap[y][x]].b);
      rect(x * 16 - cam.x + cam.offsetX, y * 16 - cam.y + cam.offsetY, 16, 16);
      if (tileTypes[tileMap[y][x]].wall){
        if (detect2BoxesCollision({x: x*16, y: y*16, w: 16, h: 16}, {x: player.x, y: player.y, w: player.w, h: player.h})){
          player.x -= player.xv
          player.xv = 0;
        }
      }
    }
  }

  player.y += player.yv;

  //Y stuff
  for (y = 0; y < tileMap.length; y++){
    for (x = 0; x < tileMap[y].length; x++){
      if (tileTypes[tileMap[y][x]].wall){
        if (detect2BoxesCollision({x: x*16, y: y*16, w: 16, h: 16}, {x: player.x, y: player.y, w: player.w, h: player.h})){
          player.y -= player.yv
          player.yv = 0;
        }
      }
    }
  }

  player.xv *= player.friction;
  player.yv *= player.friction;

  //draw player
  fill(player.r,player.g,player.b);
  rect(player.x - cam.x + cam.offsetX,player.y - cam.y + cam.offsetY,player.w,player.h);
}

function windowResized() {
  resizeCanvas(windowWidth, canvasScale * 360);
}
