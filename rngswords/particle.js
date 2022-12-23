

class PrimitiveLineTrailParticle extends Entity{
  constructor(x1, y1, x2, y2, z, lifetime, lineLifetime, s, col, mcv, mcf, mcg, tcv, tcf, tcg, alpha, fadeWait, fadeSpeed){
    super((x1 + x2) * 0.5, (y1 + y2) * 0.5, 50, 50, 0, [new HitboxWrapper(0, 0, new RectHitbox(40, 40))], new RectHitbox(40, 40), 40, []);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2; 
    this.y2 = y2;
    this.z = z;
    this.lifetime = lifetime;
    this.lineLifetime = lineLifetime;
    this.s = s;
    if (random(0,50) < 1){
      this.s *= 1.1;
    }
    this.col = col;
    this.mcv = mcv;
    this.mcf = mcf;
    this.mcg = mcg;
    this.tcv = tcv;
    this.tcf = tcf;
    this.tcg = tcg;
    this.alpha = alpha;
    this.fadeWait = fadeWait;
    this.fadeSpeed = fadeSpeed;

    this.vx2 = 0
    this.vy2 = 0

    this.followStrength = random(0.07, 0.5);
    this.friction = random(0.5, 0.75);
    if (floor(random(0,9)) === 0){
      this.friction += 0.1;
    }

    this.lines = [];

    this.shakiness = random(0, 0.05);
    if (random(0, 3) < 1){
      this.shakiness *= 3;
    }
    if (random(0, 3) < 1){
      this.shakiness *= 3;
    }
    if (random(0, 40) > 1){
      this.shakiness = 0;
    }

    this.redSpeedGlow = 0;
    this.greenSpeedGlow = 0;
    this.blueSpeedGlow = 0;
    if (random(0, 50) < 1){
      this.redSpeedGlow = random(-1, 5);
    }
    if (random(0, 50) < 1){
      this.greenSpeedGlow = random(-1, 5);
    }
    if (random(0, 50) < 1){
      this.blueSpeedGlow = random(-1, 5);
    }

    this.tilter = random(-0.3, 1.9);
    this.tilter = -0.1;
    if (random(0, 3) > 1){
      this.tilter = 0.5;
    }
    if (random(0, 15) > 1){
      this.tilter = (this.tilter - 0.5) / 10 + 0.5;
    }

    this.scraggliness = random(0, 0.1);
    if (random(0, 20 < 1)){
      this.scraggliness *= 1;
    }
    if (random(0, 20 > 1)){
      this.scraggliness = 0;
    }
    this.trailP1StaticFollowStrength = random(-0.05, 0.05);
    this.trailP2StaticFollowStrength = random(-0.05, 0.05);
    if (random(0, 4) > 1){
      this.trailP1StaticFollowStrength *= 0.15;
    }
    if (random(0, 4) > 1){
      this.trailP2StaticFollowStrength *= 0.15;
    }
    // if (random(0, 9) > 1){
    //   this.trailP2StaticFollowStrength = 0;
    // }
    // if (random(0, 9) > 1){
    //   this.trailP1StaticFollowStrength = 0;
    // }
  }
  //no debug draws so it doesnt clog up stuff
  drawDebug(){}
  drawHoveredDebug(){}
  drawSelectedDebug(){}
  draw(){
    //strokeweight of 1 is weird but gaps would appear in between each segment otherwise
    strokeWeight(1);
    for (var i = 0; i < this.lines.length; i++){
      fill(this.lines[i].col.r, this.lines[i].col.g, this.lines[i].col.b, this.lines[i].alpha);
      stroke(this.lines[i].col.r, this.lines[i].col.g, this.lines[i].col.b, this.lines[i].alpha);
      if (!(i + 1 === this.lines.length)){
        quad(this.lines[i].x1, this.lines[i].y1, this.lines[i].x2, this.lines[i].y2, 
          this.lines[i + 1].x2, this.lines[i + 1].y2, this.lines[i + 1].x1, this.lines[i + 1].y1)
      }

      this.lines[i].col.r += this.lines[i].cv.r
      this.lines[i].col.g += this.lines[i].cv.g
      this.lines[i].col.b += this.lines[i].cv.b

      this.lines[i].cv.r += this.tcg.r
      this.lines[i].cv.g += this.tcg.g
      this.lines[i].cv.b += this.tcg.b

      this.lines[i].cv.r *= this.tcf.r
      this.lines[i].cv.g *= this.tcf.g
      this.lines[i].cv.b *= this.tcf.b

      // //move lines together
      this.lines[i].x1 = ((this.lines[i].x1 * (this.tilter + 0.5) + this.lines[i].x2 * (1 + this.tilter - 0.5)) * 0.5) * (1 - this.s) + this.lines[i].x1 * this.s;
      this.lines[i].y1 = ((this.lines[i].y1 * (this.tilter + 0.5) + this.lines[i].y2 * (1 + this.tilter - 0.5)) * 0.5) * (1 - this.s) + this.lines[i].y1 * this.s;
      this.lines[i].x2 = ((this.lines[i].x1 * (this.tilter + 0.5) + this.lines[i].x2 * (1 + this.tilter - 0.5)) * 0.5) * (1 - this.s) + this.lines[i].x2 * this.s;
      this.lines[i].y2 = ((this.lines[i].y1 * (this.tilter + 0.5) + this.lines[i].y2 * (1 + this.tilter - 0.5)) * 0.5) * (1 - this.s) + this.lines[i].y2 * this.s;
      this.lines[i].x1 += random(-this.shakiness, this.shakiness) * (this.lineLifetime - this.lines[i].lifetime);
      this.lines[i].y1 += random(-this.shakiness, this.shakiness) * (this.lineLifetime - this.lines[i].lifetime);
      this.lines[i].x2 += random(-this.shakiness, this.shakiness) * (this.lineLifetime - this.lines[i].lifetime);
      this.lines[i].x2 += random(-this.shakiness, this.shakiness) * (this.lineLifetime - this.lines[i].lifetime);

      //static
      this.lines[i].x1 += (this.lines[i].followPointX - this.lines[i].x1) * this.trailP1StaticFollowStrength * (this.lines[i].lifetime / this.lineLifetime);
      this.lines[i].y1 += (this.lines[i].followPointY - this.lines[i].y1) * this.trailP1StaticFollowStrength * (this.lines[i].lifetime / this.lineLifetime);

      this.lines[i].x2 += (this.lines[i].followPointX - this.lines[i].x2) * this.trailP1StaticFollowStrength * (this.lines[i].lifetime / this.lineLifetime);
      this.lines[i].y2 += (this.lines[i].followPointY - this.lines[i].y2) * this.trailP1StaticFollowStrength * (this.lines[i].lifetime / this.lineLifetime);

      

      this.lines[i].lifetime -= 1;
      this.lines[i].fadeTimer -= 1;
      if (this.lines[i].fadeTimer <= 0){
        this.lines[i].alpha -= this.fadeSpeed;
      }
      if (this.lines[i].lifetime < 1){
        this.lines.splice(i, 1);
        i -= 1;
      }

    }
  }
  doAction(){
    this.targx2 = screenToGameX(mouseX); 
    this.targy2 = screenToGameY(mouseY);
    this.vx2 += (this.targx2 - this.x2) * this.followStrength;
    this.vy2 += (this.targy2 - this.y2) * this.followStrength;
    this.x2 += this.vx2
    this.y2 += this.vy2
    this.vx2 *= this.friction;
    this.vy2 *= this.friction;
    //cam.shakeX += this.vx2;
    //cam.shakeY += this.vy2;
  }
  update(){
    if (this.updatedThisFrame){return;}
    this.updatedThisFrame = true;
    var px1 = this.x1;
    var py1 = this.y1;
    var px2 = this.x2;
    var py2 = this.y2;
    this.doAction();
    var x1scrag = random(0, this.scraggliness);
    var x2scrag = random(0, this.scraggliness);
    var y1scrag = random(0, this.scraggliness);
    var y2scrag = random(0, this.scraggliness);
    this.lines.push({
      x1: px1 * (1 - x2scrag) + px2 * x2scrag,
      y1: py1 * (1 - y2scrag) + py2 * y2scrag,
      x2: px2 * (1 - x1scrag) + px1 * x1scrag,
      y2: py2 * (1 - y1scrag) + py1 * y1scrag,
      followPointX: this.x2, 
      followPointY: this.y2,
      lifetime: this.lineLifetime,
      col: {r: this.col.r + this.redSpeedGlow * sqrt((this.vx2 * this.vx2 + this.vy2 * this.vy2)), g: this.col.g + this.greenSpeedGlow * sqrt((this.vx2 * this.vx2 + this.vy2 * this.vy2)), b: this.col.b + this.blueSpeedGlow * sqrt((this.vx2 * this.vx2 + this.vy2 * this.vy2))},
      cv: {r: this.tcv.r, g: this.tcv.g, b: this.tcv.b},
      alpha: this.alpha,
      fadeTimer: this.fadeWait,
    })
    this.currentChunkX = getChunkXof(this.x);
    this.currentChunkY = getChunkYof(this.y);
  }
}