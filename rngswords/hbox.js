 /**
 * @constructor - A shape that is used to check for collisions with other hitboxes. Do not use for hitboxes use the extended classes CircleHitbox and RectHitbox kthxbye
 * @param {number} x - The x position of the center of the box
 * @param {number} y - The y position of the center of the box
 * @param {number} w - The width of the box
 * @param {number} h - The height of the box
 * @param {string} shape - The shape of the box (rectangle or circle)
 */

class Hitbox{
  constructor(x, y, w, h, shape){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shape = shape;
  }
  /**
  * @constructor - Checks for a collision between two circles
  * @param {CircleHitbox} c1 - The first circle
  * @param {CircleHitbox} c2 - The second circle
  */
  ccCollision(c1, c2){
    var dist = sqrt((c1.x - c2.x) * (c1.x - c2.x) + (c1.y - c2.y) * (c1.y - c2.y));
    return dist <= c1.r * 0.5 + c2.r * 0.5;
  }
  /**
  * @constructor - Checks for a collision between a circle and a rectangle
  * @param {CircleHitbox} c - The circle
  * @param {RectHitbox} r - The rectangle
  */
  crCollision(c, r){
    var edgeX = c.x;
    var edgeY = c.y;
    if (c.x < r.x - r.w * 0.5){
      edgeX = r.x - r.w * 0.5;
    }
    if (c.x > r.x + r.w * 0.5){
      edgeX = r.x + r.w * 0.5;
    }
    if (c.y < r.y - r.h * 0.5){
      edgeY = r.y - r.h * 0.5;
    }
    if (c.y > r.y + r.h * 0.5){
      edgeY = r.y + r.h * 0.5;
    }
    var distX = c.x - edgeX;
    var distY = c.y - edgeY;
    return sqrt((distX * distX) + (distY * distY)) < c.r * 0.5;
  }
  /**
  * @constructor - Checks for a collision between two rectangles
  * @param {RectHitbox} r1 - The first rectangle
  * @param {RectHitbox} r2 - The second rectangle
  */
  rrCollision(r1, r2){
    var halfw1 = r1.w * 0.5;
    var halfh1 = r1.h * 0.5;
    var halfw2 = r2.w * 0.5;
    var halfh2 = r2.h * 0.5;
    return (r1.x - halfw1 < r2.x + halfw2 &&
      r1.x + halfw1 > r2.x - halfw2 &&
      r1.y - halfh1 < r2.y + halfh2 &&
      r1.y + halfh1 > r2.y - halfh2);
  }
  /**
  * @constructor - Checks for a collision a polygon and a circle
  * @param {PolyHitbox} p - The polygon
  * @param {CircleHitbox} c - The circle
  */
  pcCollision(p, c) {
    var vertices = p.pts;
    var cx = c.x;
    var cy = c.y;
    var r = c.r * 0.5;

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

      // check for collision between the circle and
      // a line formed between the two vertices
      var collision = lineCircle(vc.x,vc.y, vn.x,vn.y, cx,cy,r);
      if (collision) return true;
    }
  
    // the above algorithm only checks if the circle
    // is touching the edges of the polygon – in most
    // cases this is enough, but you can un-comment the
    // following code to also test if the center of the
    // circle is inside the polygon
  
    var centerInside = polygonPoint(vertices, cx,cy);
    if (centerInside) return true;
  
    // otherwise, after all that, return false
    return false;
  }
  /**
  * @constructor - Checks for a collision a polygon and a rectangle
  * @param {PolyHitbox} p - The polygon
  * @param {RectHitbox} r - The rectangle
  */
  prCollision(p, r){
    var vertices = p.pts;
    var rx = r.x - r.w * 0.5;
    var ry = r.y - r.h * 0.5;
    var rw = r.w;
    var rh = r.h;
    // go through each of the vertices, plus the next
    // vertex in the list
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

      // check against all four sides of the rectangle
      var collision = lineRect(vc.x,vc.y,vn.x,vn.y, rx,ry,rw,rh);
      if (collision) {
        return true;
      };

    }
    // optional: test if the rectangle is INSIDE the polygon
    // note that this iterates all sides of the polygon
    // again, so only use this if you need to
    var inside = polygonPoint(vertices, rx,ry);
    if (inside) {
      return true;
    };

    return false;
  }
  /**
  * @constructor - Checks for a collision between two polygons
  * @param {PolyHitbox} poly1 - First polygon
  * @param {PolyHitbox} poly2 - Second polygon
  */
  ppCollision(poly1, poly2){
    var p1 = poly1.pts;
    var p2 = poly2.pts;
    // go through each of the vertices, plus the next
    // vertex in the list
    var next = 0;
    for (var current=0; current<p1.length; current++) {

      // get next vertex in list
      // if we've hit the end, wrap around to 0
      var next = current+1;
      if (next == p1.length){
        next = 0;
      }

      // get the PVectors at our current position
      // this makes our if statement a little cleaner
      var vc = p1[current];    // c for "current"
      var vn = p1[next];       // n for "next"

      // now we can use these two points (a line) to compare
      // to the other polygon's vertices using polyLine()
      var collision = polyLine(p2, vc.x,vc.y,vn.x,vn.y); 
      if (collision) return true;

      //causes weird shit to happen so its disabled
      // optional: check if the 2nd polygon is INSIDE the first
      // collision = polyPoint(p1, p2[0].x, p2[0].y);
      // if (collision) return true;
    }

    return false;
  }
}

 /**
 * @constructor - A circle that is used to check for collisions with other hitboxes
 * @param {number} x - The x position of the center of the circle
 * @param {number} y - The y position of the center of the circle
 * @param {number} r - The width/height of the circle
 */

class CircleHitbox extends Hitbox{
  constructor(r){
    super(0, 0, r, r, "circle");
    this.r = r;
  }
  /**
  * @constructor - Draws the circle hitbox
  */
   drawDebug(){
    strokeWeight(2);
    noFill();
    stroke(150);
    ellipse(this.x, this.y, this.r, this.r);
  }
  /**
  * @constructor - Draws a cyan outline around the hitbox
  */
   drawSelectedDebug(){
    strokeWeight(2);

    stroke(0,255,255);
    ellipse(this.x, this.y, this.r, this.r);
  }
  /**
  * @constructor - Draws a green outline around the hitbox
  */
   drawHoveredDebug(){
    strokeWeight(2);

    stroke(0,255,0);
    ellipse(this.x, this.y, this.r, this.r);
  }
   /**
  * @constructor - Checks for a collision with another hitbox and returns true if they collide.
  * @param {Hitbox} hb - The other hitbox to check collision with
  */
  collidesWith(hb){
    switch (hb.shape) {
      case "circle": 
      //return false early if their bounding boxes dont collide to save on resources
      if (!this.rrCollision(this, hb)){ return false; }
      return this.ccCollision(this, hb);
      case "rect": return this.crCollision(this, hb);
      case "polygon": 
      if (!this.rrCollision(this, hb)){ return false; }
      return this.pcCollision(hb, this);
      default: return false;
    }
  }
}

 /**
 * @constructor - A rectangle that is used to check for collisions with other hitboxes
 * @param {number} w - The width of the box
 * @param {number} h - The height of the box
 */

class RectHitbox extends Hitbox{
  constructor(w, h){
    super(0, 0, w, h, "rect");
  }
  /**
  * @constructor - Draws an outline around the hitbox 
  */
   drawDebug(){
    strokeWeight(2);
    stroke(150);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }
  /**
  * @constructor - Draws a cyan outline around the hitbox 
  */
   drawSelectedDebug(){
    strokeWeight(2);
    stroke(0,255,255);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }
  /**
  * @constructor - Draws a green outline around the hitbox 
  */
   drawHoveredDebug(){
    strokeWeight(2);
    stroke(0,255,0);
    noFill();
    rect(this.x, this.y, this.w, this.h);
  }
  /**
  * @constructor - Checks for a collision with another hitbox and returns true if they collide.
  * @param {Hitbox} hb - The other hitbox to check collision with
  */
  collidesWith(hb){
    switch (hb.shape) {
      case "circle": 
      //return false early if their bounding boxes dont collide to save on resources
      //if (!this.rrCollision(this, hb)){ return false; }
      return this.crCollision(hb, this);
      case "rect": return this.rrCollision(this, hb);
      case "polygon": 
      if (!this.rrCollision(this, hb)){ return false; }
      return this.prCollision(hb, this);
      default: return false;
    }
  }
}

 /**
 * @constructor - A polygon that is used to check for collisions with other hitboxes
 * @param {number} x - The x position of the center of the rectangle
 * @param {number} y - The y position of the center of the rectangle
 * @param {number} w - The width of the box
 * @param {number} h - The height of the box
 */

  class PolyHitbox extends Hitbox{
    constructor(x, y, pts){
      super(0, 0, 0, 0, "polygon");
      this.pts = pts;
      this.relPts = [];
      for (var p = 0; p < pts.length; p++){
        this.relPts.push({x: pts[p].x, y: pts[p].y})
      }
      this.parentX = x;
      this.parentY = y;
      this.movePoints(0);
    }
    movePoints(d){
      for (var p = 0; p < this.pts.length; p++){
        this.pts[p].x = this.parentX + cos(d) * this.relPts[p].x + cos(d - 90) * this.relPts[p].y * -1;
        this.pts[p].y = this.parentY + sin(d) * this.relPts[p].x + sin(d - 90) * this.relPts[p].y * -1;
      }
      this.minX = null;
      this.maxX = null;
      this.minY = null;
      this.maxY = null;
      for (var p = 0; p < this.pts.length; p++){
        if (this.minX === null || this.pts[p].x < this.minX){
          this.minX = this.pts[p].x;
        }
        if (this.maxX === null || this.pts[p].x > this.maxX){
          this.maxX = this.pts[p].x;
        }
        if (this.minY === null || this.pts[p].y < this.minY){
          this.minY = this.pts[p].y;
        }
        if (this.maxY === null || this.pts[p].y > this.maxY){
          this.maxY = this.pts[p].y;
        }
      }
      this.w = this.maxX - this.minX;
      this.h = this.maxY - this.minY;
      this.x = (this.maxX + this.minX) * 0.5;
      this.y = (this.maxY + this.minY) * 0.5;
    }
    /**
    * @constructor - Draws an outline around the hitbox 
    */
     drawDebug(){
      strokeWeight(2);
      noFill();
      stroke(150);
      for (var p = 0; p < this.pts.length - 1; p++){
        line(this.pts[p].x, this.pts[p].y, this.pts[p+1].x, this.pts[p+1].y);
      }
      line(this.pts[this.pts.length - 1].x, this.pts[this.pts.length - 1].y, this.pts[0].x, this.pts[0].y);
    }
    /**
    * @constructor - Draws a cyan outline around the hitbox 
    */
     drawSelectedDebug(){
      strokeWeight(2);
      noFill();
      stroke(0,255,255);
      for (var p = 0; p < this.pts.length - 1; p++){
        line(this.pts[p].x, this.pts[p].y, this.pts[p+1].x, this.pts[p+1].y);
      }
      line(this.pts[this.pts.length - 1].x, this.pts[this.pts.length - 1].y, this.pts[0].x, this.pts[0].y);
    }
    /**
    * @constructor - Draws a green outline around the hitbox 
    */
     drawHoveredDebug(){
      strokeWeight(2);
      noFill();
      stroke(0,255,0);
      for (var p = 0; p < this.pts.length - 1; p++){
        line(this.pts[p].x, this.pts[p].y, this.pts[p+1].x, this.pts[p+1].y);
      }
      line(this.pts[this.pts.length - 1].x, this.pts[this.pts.length - 1].y, this.pts[0].x, this.pts[0].y);
    }
    /**
    * @constructor - Checks for a collision with another hitbox and returns true if they collide.
    * @param {Hitbox} hb - The other hitbox to check collision with
    */
    collidesWith(hb){
      switch (hb.shape) {
        case "circle": 
        //return false early if their bounding boxes dont collide to save on resources
        if (!this.rrCollision(this, hb)){ return false; }
        return this.pcCollision(this, hb);
        case "rect": return this.prCollision(this, hb);
        case "polygon": 
        if (!this.rrCollision(this, hb)){ return false; }
        return this.ppCollision(this, hb);
        default: return false;
      }
    }
  }


 /**
 * @constructor - A wrapper that contains a hitbox. Used by entities to move their hitboxes
 * @param {number} x - The forward from the center of the entity
 * @param {number} y - The sideways offset from the center of the entity
 * @param {number} hbox - The hitbox that the wrapper wraps around
 */
class HitboxWrapper{
  constructor(x, y, hbox){
    this.x = x;
    this.y = y;
    this.hbox = hbox;
  }
  move(x, y, d){
    if (this.hbox.shape === "polygon"){
      this.hbox.parentX = x + cos(d) * this.x + cos(d - 90) * this.y;
      this.hbox.parentY = y + sin(d) * this.x + sin(d - 90) * this.y;
      this.hbox.movePoints(d);
    } else {
      this.hbox.x = x + cos(d) * this.x + cos(d - 90) * this.y;
      this.hbox.y = y + sin(d) * this.x + sin(d - 90) * this.y;
    }
  }
}



