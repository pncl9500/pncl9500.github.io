

options = {
  optionsMenuHidden: 1,
  upgradeMenuHidden: -1,
  optionsMenuTab: "main",
  enemyOutlines: 1,
  gridLines: 1,
  invincibility: -1,
  noCooldowns: -1,
  drawEnemies: 1,
  autoRespawn: -1,
  levelCap: 1,
  statCap: 1,
  mikeyMode: -1,
}

class Button{
  constructor(x,y,w,h,text,tab,clickAction,clickParam,shape,r,g,b){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.tab = tab;
    this.clickAction = clickAction;
    this.clickParam = clickParam;
    this.shape = shape;
    this.pal = {
      r: r,
      g: g,
      b: b,
    }
  }

  draw(){

    //if the mouse is touching the button, draw it a bit lighter than normal
    switch (this.shape) {
      case "rect":
        if ((mouseX) >= (this.x + camOffsetX) * canvasScale &&
          (mouseX) <= (this.x + camOffsetX + this.w) * canvasScale &&
          (mouseY) >= (this.y + camOffsetY) * canvasScale &&
          (mouseY) <= (this.y + camOffsetY + this.h) * canvasScale){
          fill(this.pal.r + 30, this.pal.g + 30, this.pal.b + 30);
        } else {
          fill(this.pal.r, this.pal.g, this.pal.b);
        }
        rect(this.x + camOffsetX, this.y + camOffsetY, this.w, this.h);
        break;
      case "circle":
        if (Math.sqrt(Math.pow((mouseX) - ((this.x + camOffsetX) * canvasScale), 2)+Math.pow((mouseY) - ((this.y + camOffsetY) * canvasScale),2) < this.w)){
          fill(this.pal.r + 30, this.pal.g + 30, this.pal.b + 30);
        } else {
          fill(this.pal.r, this.pal.g, this.pal.b);
        }
        ellipse(this.x + camOffsetX, this.y + camOffsetY, this.w, this.h);
        break;
      default:
        break;
    }

    fill(0,0,0);
    text(this.text, this.x + camOffsetX, this.y + camOffsetY + 10);
  }
  testClick(){
    //happens when the player clicks on the button.
      switch (this.clickAction) {
        case "changeTab":
          options.optionsMenuTab = this.clickParam;
          break;
        case "changeHero":
          player.hero = this.clickParam;
          changeHero(player.hero);
          break;
        case "toggleEnemyOutlines":
          options.enemyOutlines *= -1;
          break;
        case "toggleGrid":
          options.gridLines *= -1;
          break;
        case "max":
          player.upgradePoints = 500;
          break;
        case "speed":
          player.speed *= 2;
          break;
        case "invincible":
          options.invincibility *= -1;
          break;
        case "reset":
          player.speed = 5;
          player.energy = 30;
          player.maxEnergy = 30;
          player.regen = 5;
          player.skill1level = 0;
          player.skill2level = 0;
          break;
        case "zerostats":
          player.speed = 0;
          player.energy = 0;
          player.maxEnergy = 0;
          player.regen = 0;
          player.skill1level = 0;
          player.skill2level = 0;
          break;
        case "respawn":
          player.x = player.respawnPointX;
          player.y = player.respawnPointY;
          player.dead = false;
          player.deathTimer = 1;
          player.deathTick = 0;
          player.deathCount += 1;
          break;
        case "setspawn":
          player.respawnPointX = player.x;
          player.respawnPointY = player.y;
          break;
        case "reloadlevel":
          unloadArea();
          loadArea();
          break;
        case "flipspeed":
          player.speed *= -1;
          break;
        case "regenup":
          player.regen = 300;
          player.maxEnergy = 10000;
          player.energy = 10000;
          break;
        case "bigplayer":
          player.w += 10;
          player.h += 10;
          break;
        case "smallplayer":
          player.w *= 0.8;
          player.h *= 0.8;
          break;
        case "normalplayer":
          player.w = 16;
          player.h = 16;
          break;
        case "nocooldown":
          options.noCooldowns *= -1;
          break;
        case "amplify":
          loadArea();
          loadArea();
          loadArea();
          loadArea();
          loadArea();
          break;
        case "killall":
          unloadArea();
          break;
        case "squeeze":
          for (var tile = 0; tile < world[player.level][player.area].tiles.length; tile++){
            world[player.level][player.area].tiles[tile].h -= 1;
          }
          break;
        case "expand":
          for (var tile = 0; tile < world[player.level][player.area].tiles.length; tile++){
            world[player.level][player.area].tiles[tile].h += 1;
          }
          break;
        case "hardify":
          unloadArea();
          //load the level, but with more enemies and enemy speed
          for (l = 0; l < world[player.level][player.area].tiles.length; l++){
            //load the pellets
            for (p = 0; p < world[player.level][player.area].tiles[l].pelletCount; p++){
              pellets.push(new Pellet(world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16))
            }
            //load the enemies
            //get groups of enemies
            for (g = 0; g < world[player.level][player.area].tiles[l].enemies.length; g++){
              //load the enemies that are in the group
              for (e = 0; e < Math.ceil(world[player.level][player.area].tiles[l].enemies[g].count * 1.25); e++){
                enemies.push(new Enemy(world[player.level][player.area].tiles[l].enemies[g].type, world[player.level][player.area].tiles[l].enemies[g].speed * 1.5, world[player.level][player.area].tiles[l].enemies[g].size,
                  world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16,
                  random(1,360), "randomized", "randomized"));
              }
            }
          }
          break;
        case "impossiblify":
            unloadArea();
            //load the level, but with way more enemies and enemy speed
            for (l = 0; l < world[player.level][player.area].tiles.length; l++){
              //load the pellets
              for (p = 0; p < world[player.level][player.area].tiles[l].pelletCount; p++){
                pellets.push(new Pellet(world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16))
              }
              //load the enemies
              //get groups of enemies
              for (g = 0; g < world[player.level][player.area].tiles[l].enemies.length; g++){
                //load the enemies that are in the group
                for (e = 0; e < Math.ceil(world[player.level][player.area].tiles[l].enemies[g].count * 5); e++){
                  enemies.push(new Enemy(world[player.level][player.area].tiles[l].enemies[g].type, world[player.level][player.area].tiles[l].enemies[g].speed * 2.5, world[player.level][player.area].tiles[l].enemies[g].size * 1.5,
                    world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16,
                    random(1,360), "randomized", "randomized"));
                }
              }
            }
            break;
        case "easify":
          unloadArea();
            //load the level, but with way more enemies and enemy speed
            for (l = 0; l < world[player.level][player.area].tiles.length; l++){
              //load the pellets
              for (p = 0; p < world[player.level][player.area].tiles[l].pelletCount; p++){
                pellets.push(new Pellet(world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16))
              }
              //load the enemies
              //get groups of enemies
              for (g = 0; g < world[player.level][player.area].tiles[l].enemies.length; g++){
                //load the enemies that are in the group
                for (e = 0; e < Math.ceil(world[player.level][player.area].tiles[l].enemies[g].count * 0.5); e++){
                  enemies.push(new Enemy(world[player.level][player.area].tiles[l].enemies[g].type, world[player.level][player.area].tiles[l].enemies[g].speed * 0.6, world[player.level][player.area].tiles[l].enemies[g].size * 0.8,
                    world[player.level][player.area].tiles[l].x * 16,world[player.level][player.area].tiles[l].y * 16,(world[player.level][player.area].tiles[l].x+world[player.level][player.area].tiles[l].w) * 16,(world[player.level][player.area].tiles[l].y+world[player.level][player.area].tiles[l].h) * 16,
                    random(1,360), "randomized", "randomized"));
                }
              }
            }
            break;
          case "randomizecolors":
            for (l = 0; l < world[player.level][player.area].tiles.length; l++){
              world[player.level][player.area].tiles[l].pal.r = random(60,255);
              world[player.level][player.area].tiles[l].pal.g = random(60,255);
              world[player.level][player.area].tiles[l].pal.b = random(60,255);
            }
            break;
        case "invisibleenemies":
          options.drawEnemies *= -1;
          break;
          case "autoRespawn":
            options.autoRespawn *= -1;
            break;
        case "noLevelCap":
          options.levelCap *= -1;
          break;
        case "noStatCap":
          options.statCap *= -1;
          break;
        case "freezeEnemies":
          for (e = 0; e < enemies.length; e++){
            enemies[e].speed = 0;
          }
          break;
        case "mikeymode":
          options.mikeyMode *= -1;
          player.hero = "jolt";
          changeHero("jolt");
          break;
        default:
          break;

      }
  }
  
}

buttons = [
  //main menu
  new Button(120,-180,100,20,"Vanilla Options","main","changeTab","vanilla","rect",125,125,125),
  new Button(220,-180,100,20,"Hero select","main","changeTab","heroselect","rect",125,125,125),
  new Button(120,-160,100,20,"Hax","main","changeTab","cheats","rect",125,125,125),

  //vanilla options
  new Button(120,-180,100,20,"Back","vanilla","changeTab","main","rect",125,125,125),
  new Button(220,-180,100,20,"Toggle outlines","vanilla","toggleEnemyOutlines","","rect",125,125,125),
  //new Button(120,-160,100,20,"[WIP]Mouse movement","vanilla","toggleMouseMovement","","rect",125,125,125),
  //new Button(220,-160,100,20,"[WIP]Toggle mouse","vanilla","toggleToggleMouseMovement","","rect",125,125,125),
  new Button(120,-140,100,20,"Toggle grid","vanilla","toggleGrid","","rect",125,125,125),

  //hacks options
  new Button(120,-180,100,20,"Back","cheats","changeTab","main","rect",125,125,125),
  new Button(220,-180,100,20,"Max","cheats","max","","rect",125,125,125),
  new Button(120,-160,100,20,"Omegaspeed","cheats","speed","","rect",125,125,125),
  new Button(220,-160,100,20,"Toggle invincibility","cheats","invincible","","rect",125,125,125),
  new Button(120,-140,100,20,"Reset stats","cheats","reset","","rect",125,125,125),
  new Button(220,-140,100,20,"Delete stats","cheats","zerostats","","rect",125,125,125),
  new Button(120,-120,100,20,"Respawn","cheats","respawn","","rect",125,125,125),
  new Button(220,-120,100,20,"Set spawn","cheats","setspawn","","rect",125,125,125),
  new Button(120,-100,100,20,"Reload area","cheats","reloadlevel","","rect",125,125,125),
  new Button(220,-100,100,20,"Drunk mode","cheats","flipspeed","","rect",125,125,125),
  new Button(120,-80,100,20,"Infinite energy","cheats","regenup","","rect",125,125,125),
  new Button(220,-80,100,20,"Big","cheats","bigplayer","","rect",125,125,125),
  new Button(120,-60,100,20,"Reset size","cheats","normalplayer","","rect",125,125,125),
  new Button(220,-60,100,20,"Small","cheats","smallplayer","","rect",125,125,125),
  new Button(120,-40,100,20,"No cooldown","cheats","nocooldown","","rect",125,125,125),
  new Button(220,-40,100,20,"AMPLIFY","cheats","amplify","","rect",125,125,125),
  new Button(120,-20,100,20,"Kill area","cheats","killall","","rect",125,125,125),
  new Button(220,-20,100,20,"Squeeze area","cheats","squeeze","","rect",125,125,125),
  new Button(120,0,100,20,"Expand area","cheats","expand","","rect",125,125,125),
  new Button(220,0,100,20,"Hard level","cheats","hardify","","rect",125,125,125),
  new Button(120,20,100,20,"Impossible level","cheats","impossiblify","","rect",125,125,125),
  new Button(220,20,100,20,"Easy level","cheats","easify","","rect",125,125,125),
  new Button(120,40,100,20,"Rainbow mode","cheats","randomizecolors","","rect",125,125,125),
  new Button(220,40,100,20,"Invisible mode","cheats","invisibleenemies","","rect",125,125,125),
  new Button(120,60,100,20,"Auto respawn","cheats","autoRespawn","","rect",125,125,125),
  new Button(220,60,100,20,"No level cap","cheats","noLevelCap","","rect",125,125,125),
  new Button(120,80,100,20,"No stat caps","cheats","noStatCap","","rect",125,125,125),
  new Button(220,80,100,20,"Freeze enemies","cheats","freezeEnemies","","rect",125,125,125),
  new Button(120,100,100,20,"Mikey mode","cheats","mikeymode","","rect",125,125,125),

  //hero select back button
  new Button(120,-180,100,20,"Back","heroselect","changeTab","main","rect",125,125,125),
]

//add buttons based on heroes in the hero select screen.
function addHeroButtons(){
  for (c = 0; c < Object.keys(heroes).length; c++){
    buttons.push(new Button(125,-155 + c*10,10,10,"","heroselect","changeHero",Object.keys(heroes)[c],"circle",heroes[Object.keys(heroes)[c]].pal.r,heroes[Object.keys(heroes)[c]].pal.g,heroes[Object.keys(heroes)[c]].pal.b))
  }
}


function drawOptionsMenu(){
  fill(0,0,0)
  rect(120 + camOffsetX,-180 + camOffsetY,200,360)  
  for (b = 0; b < buttons.length; b++){
    if (buttons[b].tab === options.optionsMenuTab){
      buttons[b].draw();
    }
  }
}
