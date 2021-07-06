
//a tile that spawns enemies when the player walks over it.
spawners = [];
class Spawner{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.triggered = false;
  }

  draw(){
    //only for debugging. spawners are invisible in game.
    var c = color(255,0,0)
    if (this.triggered === true){
      var c = color(0,0,255)
    }
    c.setAlpha(50)
    fill(c);
    noStroke();
    rect(this.x - cam.x + cam.offsetX, this.y - cam.y + cam.offsetY, this.w, this.h);
  }

  testForPlayer(){
    if (detect2BoxesCollision(player, this)){
      this.triggered = true;
    }
  }
}