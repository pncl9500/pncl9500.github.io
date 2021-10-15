particles = [];

class Particle{
  constructor(x,y,w,h,xv,yv,xfriction,yfriction,xgrav,ygrav,col,lifetime){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xv = xv;
    this.yv = yv;
    this.xfriction = xfriction;
    this.yfriction = yfriction;
    this.xgrav = xgrav;
    this.ygrav = ygrav;
    this.col = col;
    this.lifetime = lifetime;
  }
  doTick(){
    this.draw();
    this.move();
  }
  move(){
    this.x += this.xv;
    this.y += this.yv;
    this.xv += this.xgrav;
    this.yv += this.ygrav;
    this.xv *= this.xfriction;
    this.yv *= this.yfriction;
    this.lifetime -= 1;
  }
  draw(){
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);
  }
  die(){

  }
}

class AdditiveParticle extends Particle{
  constructor(x,y,w,h,xv,yv,xfriction,yfriction,xgrav,ygrav,col,lifetime){
    super(x,y,w,h,xv,yv,xfriction,yfriction,xgrav,ygrav,col,lifetime);
  }
  draw(){
    blendMode(ADD);
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);
    blendMode(BLEND);
  }
}