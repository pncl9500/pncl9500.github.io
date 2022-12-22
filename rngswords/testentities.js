class TestEntity extends Entity{
  constructor(x, y, w, h){
    super(x, y, w, h, 0, [new HitboxWrapper(0, 0, new RectHitbox(w, h))], new RectHitbox(w, h), 0, []);
  }
  draw(){
    this.getColliders();
    noStroke();
    fill(50, 50, 50)
    rect(this.x, this.y, this.w, this.h);
  }
  doAction(){
    if (ctrlsDown.includes("nextSelectedEntity")){
      makeParticleFirespark(this.x, this.y, 1);
    }
  }
}

class Wall extends Entity{
  constructor(x, y, w, h, col){
    super(x, y, w, h, 0, [new HitboxWrapper(0, 0, new RectHitbox(w, h))], new RectHitbox(w, h), 0, ["wall"]);
    this.col = {r: 50, g: 50, b: 50};
  }
  draw(){
    fill(this.col.r, this.col.g, this.col.b);
    rect(this.x, this.y, this.w, this.h);
  }
}

//BLOOD
class PhysicsEntity extends Entity{
  constructor(x, y, w, h){
    super(x, y, w, h, 0, [new HitboxWrapper(0, 0, new RectHitbox(w, h))], new RectHitbox(w, h), 0, []);
    this.x = saveFile[0];
    this.y = saveFile[1];
    this.xv = 0;
    this.yv = 0;
    this.xf = 0.985;
    this.yf = 0.985;
    this.pxf = 0.78;
    this.pyf = 0.78;
    this.buddy = new TrailParticle(this.x, this.y, 16, 16, 120, 50, {r: 125, g: 0, b: 255}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 0, 0, 0, {r: 0, g: 0, b: 0},  {r: 1, g: 1, b: 1},  {r: 0, g: 0, b: 0}, 1, false);
    this.shakiness = 2;
    this.tailshakiness = 4;
    this.dashTailShakiness = 14;
    this.dashCameraShake = 20;
    this.cameraShakeEffectMagnitude = 0.05;
    this.tilt = 5;
    this.speed = 1;
    this.powerslideSpeedMultiplier = 3.5;
    this.turnaroundSpeedMultiplier = 1.5;
    this.dashVelocity = 70;
    this.powerslidingDashVelocityMultipier = 1.2;
    //this.diagonalBoostMultiplier = 0.01;
  }
  draw(){
    saveFile[0] = round(this.x);
    saveFile[1] = round(this.y);
    this.shake = this.shakiness + (abs(this.xv) + abs(this.yv)) / 150;
    this.tailshake = this.tailshakiness + (abs(this.xv) + abs(this.yv)) / 2.25;
    this.buddy.x = this.x + random(-this.shake, this.shake);
    this.buddy.y = this.y + random(-this.shake, this.shake);
    //replenish buddy
    this.buddy.lifetime = 50;
    for (var i = 0; i < this.buddy.segments.length; i++){
      this.buddy.segments[i].x += random(-this.tailshake, this.tailshake);
      this.buddy.segments[i].y += random(-this.tailshake, this.tailshake);
    }
    this.buddy.draw();
    //fill(255,80,75);
    fill(200,90,255);
    noStroke();
    ellipse(this.buddy.x, this.buddy.y, this.w, this.h);
    if (!debugMenuActive){
      cam.shakeX += (abs(this.xv) + abs(this.yv)) * this.cameraShakeEffectMagnitude;
      cam.shakeY += (abs(this.xv) + abs(this.yv)) * this.cameraShakeEffectMagnitude;
      cam.targetZoom = 0.6 / (((abs(this.xv) + abs(this.yv)) * 0.008) + 1);
    }
  }
  getInfo(){
    var info = [];
    info.push(`classname: ${this.constructor.name}`)
    info.push(this.getPropertyInfo("x", 100));
    info.push(this.getPropertyInfo("y", 100));
    info.push(this.getPropertyInfo("w", 100));
    info.push(this.getPropertyInfo("h", 100));
    info.push(this.getPropertyInfo("d", 100));
    info.push(this.getPropertyInfo("z"));
    info = info.concat(this.getPropertyInfo("tags"));
    info = info.concat(this.getPropertyInfo("colliders"));
    return info;
  }
  doAction(){
    this.buddy.update();
    this.buddy.doAction();
    if (ctrlsDown.includes("freecamDown")){
      this.yv += this.speed * ctrlsDown.includes("powerSlide") ? this.powerslideSpeedMultiplier : 1 * this.yv < 0 ? this.turnaroundSpeedMultiplier : 1; 
    }
    if (ctrlsDown.includes("freecamLeft")){
      this.xv -= this.speed * ctrlsDown.includes("powerSlide") ? this.powerslideSpeedMultiplier : 1 * this.xv > 0 ? this.turnaroundSpeedMultiplier : 1;
      cam.targetAngle = -this.tilt;
    }
    if (ctrlsDown.includes("freecamRight")){
      this.xv += this.speed * ctrlsDown.includes("powerSlide") ? this.powerslideSpeedMultiplier : 1 * this.xv < 0 ? this.turnaroundSpeedMultiplier : 1;
      cam.targetAngle = this.tilt;
    }
    if (ctrlsDown.includes("freecamLeft") && ctrlsDown.includes("freecamRight") || !(ctrlsDown.includes("freecamLeft") || ctrlsDown.includes("freecamRight"))){
      cam.targetAngle = 0;
    }
    if (ctrlsDown.includes("freecamUp")){
      this.yv -= this.speed * ctrlsDown.includes("powerSlide") ? this.powerslideSpeedMultiplier : 1 * this.yv > 0 ? this.turnaroundSpeedMultiplier : 1;
    }
    if (ctrlsDown.includes("powerSlide")){
      this.xv *= this.pxf;
      this.yv *= this.pyf;
    } else {
      this.xv *= this.xf;
      this.yv *= this.yf;
    }

    if (ctrlsTapped.includes("dash")){
      cam.shakeX += (random(-this.dashCameraShake, this.dashCameraShake));
      cam.shakeY += (random(-this.dashCameraShake, this.dashCameraShake));
      for (var i = 0; i < this.buddy.segments.length; i++){
        this.buddy.segments[i].x += random(-this.dashTailShakiness * i, this.dashTailShakiness * i);
        this.buddy.segments[i].y += random(-this.dashTailShakiness * i, this.dashTailShakiness * i);
      }
      if (ctrlsDown.includes("freecamDown")){
        this.yv = this.dashVelocity * (ctrlsDown.includes("powerSlide") ? this.powerslidingDashVelocityMultipier : 1);
        if (!(ctrlsDown.includes("freecamLeft") || ctrlsDown.includes("freecamRight"))){
          this.xv = 0;
        }
      }
      if (ctrlsDown.includes("freecamLeft")){
        this.xv = -this.dashVelocity * (ctrlsDown.includes("powerSlide") ? this.powerslidingDashVelocityMultipier : 1);
        if (!(ctrlsDown.includes("freecamUp") || ctrlsDown.includes("freecamDown"))){
          this.yv = 0;
        }
      }
      if (ctrlsDown.includes("freecamRight")){
        this.xv = this.dashVelocity * (ctrlsDown.includes("powerSlide") ? this.powerslidingDashVelocityMultipier : 1);
        if (!(ctrlsDown.includes("freecamUp") || ctrlsDown.includes("freecamDown"))){
          this.yv = 0;
        }
      }
      if (ctrlsDown.includes("freecamUp")){
        this.yv = -this.dashVelocity * (ctrlsDown.includes("powerSlide") ? this.powerslidingDashVelocityMultipier : 1);
        if (!(ctrlsDown.includes("freecamLeft") || ctrlsDown.includes("freecamRight"))){
          this.xv = 0;
        }
      }
    }
    
    this.x += this.xv;
    this.getColliders("wall");
    // for (var w = 0; w < this.colliders.length; w++){
    //   this.colliders[w].col = {r: 125, g: 0, b: 0};
    //   this.colliders[w].tags.splice(this.colliders[w].tags.indexOf("collidesWithPlayer"), 1)
    //   makeParticleRectangularBloodExplosion(this.colliders[w].x, this.colliders[w].y, this.colliders[w].w,this.colliders[w].h, 0.001);
    //   this.colliders.splice(w, 1);
    //   w -= 1;
    //   cam.shakeX += 5;
    //   cam.shakeY += 5;
    // }
    if (this.xv > 0){
      for (var w = 0; w < this.colliders.length; w++){
        var wall = this.colliders[w];
        while (this.collidesWith(wall)){
          this.x -= 0.1;
        }
        
      }
    } else {
      for (var w = 0; w < this.colliders.length; w++){
        var wall = this.colliders[w];
        while (this.collidesWith(wall)){
          this.x += 0.1;
        }
        
      }
    }
    if (this.colliders.length > 0){
      //this.yv *= (this.xv * this.diagonalBoostMultiplier + 1);
      this.xv = 0;
    }


    this.y += this.yv;
    this.getColliders("wall");
    // for (var w = 0; w < this.colliders.length; w++){
    //   this.colliders[w].col = {r: 125, g: 0, b: 0};
    //   this.colliders[w].tags.splice(this.colliders[w].tags.indexOf("collidesWithPlayer"), 1)
    //   makeParticleRectangularBloodExplosion(this.colliders[w].x, this.colliders[w].y, this.colliders[w].w,this.colliders[w].h, 0.001);
    //   this.colliders.splice(w, 1);
    //   w -= 1;
    //   cam.shakeX += 5;
    //   cam.shakeY += 5;
    // }
    if (this.yv > 0){
      for (var w = 0; w < this.colliders.length; w++){
        var wall = this.colliders[w];
        while (this.collidesWith(wall)){
          this.y -= 0.1;
        }
        
      }
    } else {
      for (var w = 0; w < this.colliders.length; w++){
        var wall = this.colliders[w];
        while (this.collidesWith(wall)){
          this.y += 0.1;
        }
        
      }
    }
    if (this.colliders.length > 0){
      //this.xv *= (this.yv * this.diagonalBoostMultiplier + 1);
      this.yv = 0;
    }





    if (!debugMenuActive){
      cam.targetX = this.x + this.xv;
      cam.targetY = this.y + this.yv;
    }


  }
}