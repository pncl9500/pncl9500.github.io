walls = [];


class Wall{
  constructor(segment, start, end){
    this.segment = segment;
    this.start = start;
    this.end = end;
    this.dead = false;
    this.startPassingPlayer = false;;
    this.oldStart = start;
  }
  draw(){
    this.start -= wallSpeed;
    this.end -= wallSpeed;
    this.start = max(this.start, centerRadius);
    this.end = max(this.end, centerRadius);
    if (this.start === this.end){
      this.dead = true;
    }
    this.doPlayerCollisions();
    fill(foregroundColor);
    drawQuad(this.segment, this.start, this.end);
    this.oldStart = this.start;
  }
  doPlayerCollisions(){
    if (this.collidingWithPlayer()){
      if (this.lineCollisionWithPlayer()){
        killPlayer();
      } else {
        var angle1 = ((this.segment) * (360/centerSides));
        var angle2 = ((this.segment + 1) * (360/centerSides) + 0.01);
        console.log(`oldangle1: ${angle1}`)
        console.log(`oldangle2: ${angle2}`)
        angle1 = angle1 - 360 * floor((angle1/360));
        angle2 = angle2 - 360 * floor((angle2/360));
        var pa = playerAngle - 360 * floor((playerAngle/360));
        if (round(angle2) === 0){
          angle2 = 360;
        }
        console.log(`angle1: ${angle1}`)
        console.log(`angle2: ${angle2}`)
        console.log(`center: ${(angle1 + angle2) / 2}`)
        console.log(`pa: ${pa}`)
        if (keyIsDown(LEFT_ARROW) && pa > (angle1 + angle2) / 2){
          playerAngle = angle2;
        }
        if (keyIsDown(RIGHT_ARROW) && pa < (angle1 + angle2) / 2){
          playerAngle = angle1;
        }
      }
    }
  }
  collidingWithPlayer() {
    var angle1 = (this.segment) * (360/centerSides) - 3;
    var angle2 = (this.segment + 1) * (360/centerSides) + 3;
    var vertices = [
      {x: this.start * cos(angle1), y: this.start * sin(angle1)},
      {x: this.start * cos(angle2), y: this.start * sin(angle2)},
      {x: this.end * cos(angle2), y: this.end * sin(angle2)},
      {x: this.end * cos(angle1), y: this.end * sin(angle1)},
    ]
    var px = playerDistance * cos(playerAngle);
    var py = playerDistance * sin(playerAngle);

    var collision = false;
  
    // go through each of the vertices, plus
    // the next vertex in the list
    var next = 0;
    for (var current=0; current<vertices.length; current++) {
  
      // get next vertex in list
      // if we've hit the end, wrap around to 0
      next = current+1;
      if (next == vertices.length) next = 0;
  
      // get the PVectors at our current position
      // this makes our if statement a little cleaner
      var vc = vertices[current];    // c for "current"
      var vn = vertices[next];       // n for "next"
  
      // compare position, flip 'collision' variable
      // back and forth
      if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
           (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
              collision = !collision;
      }
    }
    return collision;
  }
  lineCollisionWithPlayer() {
    var angle1 = (this.segment) * (360/centerSides) - 3;
    var angle2 = (this.segment + 1) * (360/centerSides) + 3;
    var x1 = this.start * cos(angle1);
    var y1 = this.start * sin(angle1);
    var x2 = this.start * cos(angle2);
    var y2 = this.start * sin(angle2);
    var px = playerDistance * cos(playerAngle);
    var py = playerDistance * sin(playerAngle);
    // get distance from the point to the two ends of the line
    var d1 = dist(px,py, x1,y1);
    var d2 = dist(px,py, x2,y2);
  
    // get the length of the line
    var lineLen = dist(x1,y1, x2,y2);
  
    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = wallSpeed;    // higher # = less accurate
  
    // if the two distances are equal to the line's 
    // length, the point is on the line!
    // note we use the buffer here to give a range, 
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  }
}

playerDead = false;
function killPlayer(){
  playerDead = true;
  patternTimer = -1;
  pattern = null;
  timer = 0;
}