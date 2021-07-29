holeSize = 64;

class Wall {
  constructor(
    x,
    y,
    w,
    h,
    pal,
    hardness,
    health,
    bounciness,
    spawnsOnDestruction,
    spawnsOffsetX,
    spawnsOffsetY,
    spawnMagnification,
    loot,
    chestSpawnsOnDestruction,
    isSpawnVoid
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.pal = pal;
    this.hardness = hardness;
    this.health = health;
    this.bounciness = bounciness;
    this.offsetX = 0;
    this.offsetY = 0;

    this.spawnsOffsetX = 0;
    this.spawnsOffsetY = 0;

    this.spawnsOnDestruction = [];
    this.spawnMagnification = 1;
    if (typeof spawnsOnDestruction != "undefined") {
      this.spawnMagnification = spawnMagnification;
      this.spawnsOnDestruction = spawnsOnDestruction;
      this.spawnsOffsetX = spawnsOffsetX;
      this.spawnsOffsetY = spawnsOffsetY;
    }

    this.loot = [];
    if (typeof loot != "undefined") {
      this.loot = loot;
    }

    this.isSpawnVoid = false;
    if (typeof isSpawnVoid != "undefined") {
      this.isSpawnVoid = isSpawnVoid;
    }

    this.chestSpawnsOnDestruction = [];
    if (typeof chestSpawnsOnDestruction != "undefined") {
      this.chestSpawnsOnDestruction = chestSpawnsOnDestruction;
    }
  }

  draw() {
    this.offsetX /= 1.5;
    this.offsetY /= 1.5;
    fill(this.pal.r, this.pal.g, this.pal.b);
    rect(
      this.x - cam.x + cam.offsetX + this.offsetX,
      this.y - cam.y + cam.offsetY + this.offsetY,
      this.w,
      this.h
    );
  }
  doDamageAnimation() {
    this.offsetX = random(-2, 2);
    this.offsetY = random(-2, 2);
  }

  spawnEnemiesOnDeath() {
    for (this.s = 0; this.s < this.spawnsOnDestruction.length; this.s++) {
      enemyFragmentQueue.push(
        getEnemy(
          this.spawnsOnDestruction[this.s],
          this.x +
            random(this.spawnsOffsetX * -1, this.spawnsOffsetX) +
            this.w / 2,
          this.y +
            random(this.spawnsOffsetY * -1, this.spawnsOffsetY) +
            this.h / 2,
          this.spawnMagnification,
          false
        )
      );
    }
  }

  spawnLootOnDeath() {
    for (l = 0; l < this.loot.length; l++) {
      pickups.push(
        new Pickup(this.loot[l], this.x + this.w / 2, this.y + this.h / 2)
      );
    }
  }

  spawnChestsOnDeath() {
    for (c = 0; c < this.chestSpawnsOnDestruction.length; c++) {
      chests.push(
        new Chest(
          this.chestSpawnsOnDestruction[c],
          this.x + this.w / 2 - 16,
          this.y + this.h / 2 - 8
        )
      );
    }
  }
}

walls = [];

holes = [];
class Hole {
  constructor(x, y, area) {
    this.x = x;
    this.y = y;
    this.area = area;
  }

  draw() {
    fill(20, 10, 10);
    noStroke();
    ellipse(
      this.x - cam.x + cam.offsetX,
      this.y - cam.y + cam.offsetY,
      holeSize,
      holeSize
    );
  }

  checkForPlayerEnter() {
    if (
      detect2BoxesCollision(player, {
        x: this.x - holeSize / 2,
        y: this.y - holeSize / 2,
        w: holeSize,
        h: holeSize,
      })
    ) {
      generateMap(this.area);
      return true;
    }
    return false;
  }
}

gameMap = {
  x: 0,
  y: 0,
  w: 3072,
  h: 3072,

  r: 255,
  g: 255,
  b: 255,

  liner: 240,
  lineg: 240,
  lineb: 240,

  xDivisions: 24,
  yDivisions: 24,
};

tiles = [];

function makeWalls() {
  for (h = 0; h < tiles.length; h++) {
    for (w = 0; w < tiles[h].length; w++) {
      switch (tiles[h][w]) {
        case 0:
          //empty space (normal enemy spawner)
          spawners.push(
            new Spawner(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions
            )
          );
          break;
        case 1:
          //normal stone
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 125, g: 125, b: 125 },
              5,
              250,
              0.5
            )
          );
          break;
        case 2:
          //hard stone
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 3:
          //geode boss spawner
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 100, g: 90, b: 120 },
              1,
              20,
              0.3,
              ["geode_1"],
              0,
              0,
              1
            )
          );
          break;
        case 4:
          //nest
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 130, g: 130, b: 120 },
              1,
              10,
              0.7,
              [
                "yellow",
                "yellow",
                "yellow",
                "yellow",
                "yellow",
                "yellow",
                "yellow",
                "yellow",
              ],
              50,
              50,
              1,
              [],
              ["normal"]
            )
          );
          break;
        case 5:
          //softer stone inside the geode struture
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 175, g: 175, b: 185 },
              1,
              15,
              0.5
            )
          );
          break;
        case 6:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2 +
                gameMap.h / gameMap.yDivisions / 4,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 7:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 8:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions +
                gameMap.w / gameMap.xDivisions / 2,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 9:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions +
                gameMap.h / gameMap.yDivisions / 2,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions +
                gameMap.h / gameMap.yDivisions / 4,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2 +
                gameMap.h / gameMap.yDivisions / 4,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 10:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions +
                gameMap.h / gameMap.yDivisions / 2,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 11:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions +
                gameMap.w / gameMap.xDivisions / 2,
              (h * gameMap.h) / gameMap.yDivisions +
                gameMap.h / gameMap.yDivisions / 2,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 12:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions +
                gameMap.w / gameMap.xDivisions / 2,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2 +
                gameMap.h / gameMap.yDivisions / 4,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 13:
          //hard stone [shop wall thing]
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions +
                gameMap.h / gameMap.yDivisions / 2,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions / 2,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions +
                gameMap.w / gameMap.xDivisions / 2,
              (h * gameMap.h) / gameMap.yDivisions +
                gameMap.h / gameMap.yDivisions / 4,
              gameMap.w / gameMap.xDivisions / 2,
              gameMap.h / gameMap.yDivisions / 2 +
                gameMap.h / gameMap.yDivisions / 4,
              { r: 50, g: 50, b: 60 },
              10,
              1000,
              0.2
            )
          );
          break;
        case 14:
          //desert portal stone
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 120, g: 90, b: 0 },
              10,
              500,
              0.5
            )
          );
          break;
        case 15:
          //spawn void (a wall that the player cannot spawn in, but there is still an enemy spawner)
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 120, g: 90, b: 0 },
              10,
              500,
              0.5,
              [],
              50,
              50,
              1,
              [],
              [],
              true
            )
          );
          spawners.push(
            new Spawner(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions
            )
          );
          break;
        case 16:
          //desert nest thing
          walls.push(
            new Wall(
              (w * gameMap.w) / gameMap.xDivisions,
              (h * gameMap.h) / gameMap.yDivisions,
              gameMap.w / gameMap.xDivisions,
              gameMap.h / gameMap.yDivisions,
              { r: 120, g: 90, b: 0 },
              8,
              10,
              0.5,
              ["pink", "pink", "pink", "pink", "pink"],
              50,
              50,
              1,
              [],
              []
            )
          );
          break;
        default:
          break;
      }
    }
  }
}

function removeSpawnersNearPlayer() {
  for (g = 0; g < spawners.length; g++) {
    if (detect2BoxesCollision(player, spawners[g])) {
      spawners.splice(g, 1);
      g -= 1;
    }
  }
}

function removeSpawnVoids() {
  for (w = 0; w < walls.length; w++) {
    if (walls[w].isSpawnVoid) {
      walls.splice(w, 1);
      w--;
    }
  }
}

function repositionPlayer() {
  leniency = 0;
  centerOfMap = {
    x: gameMap.w / 2 - player.w / 2 + gameMap.x,
    y: gameMap.h / 2 - player.h / 2 + gameMap.y,
  };

  playerStuckInBox = true;

  while (playerStuckInBox) {
    player.x = random(centerOfMap.x + leniency * -1, centerOfMap.x + leniency);
    player.y = random(centerOfMap.y + leniency * -1, centerOfMap.y + leniency);
    removeSpawnersNearPlayer();
    leniency += 5;
    playerStuckInBox = false;
    for (b = 0; b < walls.length; b++) {
      if (detect2BoxesCollision(player, walls[b])) {
        playerStuckInBox = true;
      }
    }
  }
  removeSpawnersNearPlayer();

  removeSpawnVoids();
}

function generateMap(areaType) {
  floorEffects = [];
  validHoleSpot = false;
  while (!validHoleSpot) {
    enemyQueueTime = 35;
    currentLevel = areaType;
    spawnersTriggered = 0;
    enemyQueue = [];
    walls = [];
    chests = [];
    enemies = [];
    spawners = [];
    pickups = [];
    tiles = [];
    npcs = [];
    holes = [];
    shrines = [];
    gameMap.r = areaTypes[areaType].mapPal.r;
    gameMap.g = areaTypes[areaType].mapPal.g;
    gameMap.b = areaTypes[areaType].mapPal.b;

    gameMap.liner = areaTypes[areaType].mapPal.liner;
    gameMap.lineg = areaTypes[areaType].mapPal.lineg;
    gameMap.lineb = areaTypes[areaType].mapPal.lineb;

    gameMap.xDivisions = areaTypes[areaType].xDivisions;
    gameMap.yDivisions = areaTypes[areaType].yDivisions;
    gameMap.w = areaTypes[areaType].w;
    gameMap.h = areaTypes[areaType].h;

    for (h = 0; h < gameMap.yDivisions; h++) {
      column = [];
      for (w = 0; w < gameMap.xDivisions; w++) {
        column.push(0);
      }
      tiles.push(column);
    }

    switch (areaTypes[areaType].generationType) {
      case "random":
        //145 tiles will have 5 hardness
        for (i = 0; i < 145; i++) {
          tilesOverlapping = true;
          while (tilesOverlapping === true) {
            tileXpos = floor(random(0, gameMap.xDivisions));
            tileYpos = floor(random(0, gameMap.yDivisions));
            if (tiles[tileXpos][tileYpos] === 1) {
              tilesOverlapping = true;
            } else {
              tilesOverlapping = false;
              tiles[tileXpos][tileYpos] = 1;
            }
          }
        }

        //10 tiles will have 10 hardness and be darker
        for (i = 0; i < 10; i++) {
          tilesOverlapping = true;
          while (tilesOverlapping === true) {
            tileXpos = floor(random(0, gameMap.xDivisions));
            tileYpos = floor(random(0, gameMap.yDivisions));
            if (tiles[tileXpos][tileYpos] >= 1) {
              tilesOverlapping = true;
            } else {
              tilesOverlapping = false;
              tiles[tileXpos][tileYpos] = 2;
            }
          }
        }

        //5 tiles will have 1 hardness and spawn yellow enemies
        for (i = 0; i < 5; i++) {
          tilesOverlapping = true;
          while (tilesOverlapping === true) {
            tileXpos = floor(random(0, gameMap.xDivisions));
            tileYpos = floor(random(0, gameMap.yDivisions));
            if (tiles[tileXpos][tileYpos] === 1) {
              tilesOverlapping = true;
            } else {
              tilesOverlapping = false;
              tiles[tileXpos][tileYpos] = 4;
            }
          }
        }
        break;
      case "lines":
        //fill with horizontal lines every 2
        for (y = 0; y < tiles.length; y+= 2){
          for (x = 0; x < tiles[y].length; x++){
            tiles[y][x] = 1;
          }
          //randomly skip or add an extra line
          if (floor(random(1,5)) === 1){
            y -= 1
          }
          if (floor(random(1,3)) === 1){
            y += 1
          }
        }
        //make random vertical lines of nothing
        for (i = 0; i < 18; i++){
          x = floor(random(0,gameMap.xDivisions));
          start = floor(random(0,gameMap.yDivisions));
          for (y = start; y < tiles.length && y < start + random(2,8); y++){
            tiles[y][x] = 0;
          }
        }
        //make random vertical lines of something
        for (i = 0; i < 12; i++){
          x = floor(random(0,gameMap.xDivisions));
          start = floor(random(0,gameMap.yDivisions));
          for (y = start; y < tiles.length && y < start + random(2,8); y++){
            tiles[y][x] = 1;
          }
        }
        //random gaps
        for (i = 0; i < 30; i++){
          x = floor(random(0,gameMap.xDivisions));
          y = floor(random(0,gameMap.yDivisions));
          tiles[y][x] = 0;
        }
        //add 5 hives (nests) (tiles that spawn a bunch of yellow enemies)
        for (h = 0; h < 5; h++){
          h--;
          validHiveSpot = false;
          while (!validHiveSpot) {
            hiveX = floor(random(0, tiles[0].length));
            hiveY = floor(random(0, tiles.length));
            if (tiles[hiveY][hiveX] === 1){
              validHiveSpot = true;
              tiles[hiveY][hiveX] = 4
            }
          }
          h++;
        }
        break;
      default:
        break;
    }

    //spawn structures
    for (s = 0; s < areaTypes[areaType].structures.length; s++) {
      if (random(0, 1) < areaTypes[areaType].structures[s].chance) {
        for (p = 0; p < areaTypes[areaType].structures[s].count; p++) {
          spawnStructure(areaTypes[areaType].structures[s].structure);
        }
      }
    }

    makeWalls();
    repositionPlayer();

    //map generator tries to place a hole, with 500 tries. if it runs out of tries.
    //a valid hole spot is at least half a map width away from the player, and accessible by the player without a bomb.
    //if the area does not have a hole then it does not attempt to make one.
    if (areaTypes[areaType].hasHole) {
      for (i = 0; i < 500; i++) {
        holePositionX = floor(random((0, tiles.length)));
        holePositionY = floor(random(0, tiles[0].length));
        holeInPlayerRange = false;
        floodFillTiles = [];
        for (y = 0; y < tiles.length; y++) {
          row = [];
          for (x = 0; x < tiles.length; x++) {
            row.push(min(1, tiles[y][x]));
          }
          floodFillTiles.push(row);
        }
        playerTilePosX = floor(player.x / (gameMap.w / gameMap.xDivisions));
        playerTilePosY = floor(player.y / (gameMap.w / gameMap.yDivisions));
        floodFill(playerTilePosX, playerTilePosY);
        if (floodFillTiles[holePositionY][holePositionX] === 2) {
          holeInPlayerRange = true;
        }

        if (
          holeInPlayerRange &&
          Math.sqrt(
            Math.pow(
              player.x -
                (holePositionX * gameMap.w) / gameMap.xDivisions +
                gameMap.w / gameMap.xDivisions / 2,
              2
            ) +
              Math.pow(
                player.y -
                  (holePositionY * gameMap.h) / gameMap.yDivisions +
                  gameMap.h / gameMap.yDivisions / 2,
                2
              )
          ) >
            gameMap.w / 1.8
        ) {
          holes.push(
            new Hole(
              holePositionX * (gameMap.w / gameMap.xDivisions) +
                gameMap.w / gameMap.xDivisions / 2,
              holePositionY * (gameMap.h / gameMap.yDivisions) +
                gameMap.w / gameMap.xDivisions / 2,
              areaTypes[areaType].holeArea
            )
          );
          validHoleSpot = true;
          break;
        }
      }
    } else {
      validHoleSpot = true;
      //safety net in case it generates a hole for some reason
      holes = [];
    }
  }
}

function floodFill(x, y) {
  if (floodFillTiles[y][x] !== 0) {
    return;
  }
  floodFillTiles[y][x] = 2;
  if (x > 0) {
    floodFill(x - 1, y);
  }
  if (y > 0) {
    floodFill(x, y - 1);
  }
  if (x < floodFillTiles[0].length - 1) {
    floodFill(x + 1, y);
  }
  if (y < floodFillTiles.length - 1) {
    floodFill(x, y + 1);
  }
}

function spawnStructure(structureType) {
  structureHeight = structures[structureType].tiles[0].length;
  structureWidth = structures[structureType].tiles.length;

  structureX = floor(random(0, tiles.length - structureWidth));
  structureY = floor(random(0, tiles.length - structureHeight));

  for (x = 0; x < structureWidth; x++) {
    for (y = 0; y < structureHeight; y++) {
      tiles[x + structureX][y + structureY] =
        structures[structureType].tiles[x][y];
    }
  }

  //spawn chests and stuff
  for (c = 0; c < structures[structureType].chests.length; c++) {
    //i think the structure's X and Y is fliped for some reason idk why
    //rare chest
    if (
      structures[structureType].chests[c].hasRareChestVariation &&
      random(0, 1) <= structures[structureType].chests[c].rareChestChance
    ) {
      chests.push(
        new Chest(
          structures[structureType].chests[c].rareChest,
          (structureY + structures[structureType].chests[c].x) *
            (gameMap.h / gameMap.yDivisions) -
            16,
          (structureX + structures[structureType].chests[c].y) *
            (gameMap.w / gameMap.xDivisions) -
            8
        )
      );
    } else {
      chests.push(
        new Chest(
          structures[structureType].chests[c].chestType,
          (structureY + structures[structureType].chests[c].x) *
            (gameMap.h / gameMap.yDivisions) -
            16,
          (structureX + structures[structureType].chests[c].y) *
            (gameMap.w / gameMap.xDivisions) -
            8
        )
      );
    }
  }

  //spawn npcs
  for (n = 0; n < structures[structureType].npcs.length; n++) {
    npcs.push(
      new Npc(
        (structureY + structures[structureType].npcs[n].x) *
          (gameMap.h / gameMap.yDivisions) -
          structures[structureType].npcs[n].w / 2,
        (structureX + structures[structureType].npcs[n].y) *
          (gameMap.w / gameMap.xDivisions) -
          structures[structureType].npcs[n].h / 2,
        structures[structureType].npcs[n].w,
        structures[structureType].npcs[n].h,
        structures[structureType].npcs[n].sprite,
        dialogue[structures[structureType].npcs[n].dialogue]
      )
    );
  }

  //spawn shrines
  //needs to be H because S is used for structures
  for (h = 0; h < structures[structureType].shrines.length; h++){
    if (structures[structureType].shrines[h].spawnRandomShrine){
      makeRandomShrine((structureY + structures[structureType].shrines[h].x) *
      (gameMap.h / gameMap.yDivisions) -
      shrineSize / 2,
    (structureX + structures[structureType].shrines[h].y) *
      (gameMap.w / gameMap.xDivisions) -
      shrineSize / 2,)
    } else {
      //there is no case where the game does not get a random shrine for now so i will be lazy and not add this.
    }
  }

  //spawn bosses
  if (typeof(structures[structureType].bosses) != "undefined"){
    for (b = 0; b < structures[structureType].bosses.length; b++){
      switch (structures[structureType].bosses[b].type) {
        case "sewer_mutant":
          bosses.push(new Boss_SewerMutant((structureY + structures[structureType].bosses[b].x) *
          (gameMap.h / gameMap.yDivisions) -
          shrineSize / 2,
        (structureX + structures[structureType].bosses[b].y) *
          (gameMap.w / gameMap.xDivisions) -
          shrineSize / 2));
          break;
      
        default:
          break;
      }
    }
  }
}


function makeRandomShrine(x,y){
  shrineRNG = floor(random(0,6));
  // if (random(0,100) <= 0.05){
  //   shrineRNG = 9
  //   //0.05% chance for absolute shrine (kinda)
  // }
  if (random(0,100) <= 0.5){
    shrineRNG = 8
    //0.5% chance for unstable shrine (kinda)
  }
  if (random(0,100) <= 2){
    shrineRNG = 7
    //2% chance for shattered shrine (kinda)
  }
  if (random(0,100) <= 5){
    shrineRNG = 6
    //5% chance for shrine of emptiness (yes)
  }
  switch (shrineRNG) {
    case 0:
      shrines.push(new Shrine_blood(x,y));
      break;
    case 1:
      shrines.push(new Shrine_life(x,y));
      break;
    case 2:
      shrines.push(new Shrine_wealth(x,y));
      break;
    case 3:
      shrines.push(new Shrine_protection(x,y));
      break;
    case 4:
      shrines.push(new Shrine_rage(x,y));
      break;
    case 5:
      shrines.push(new Shrine_crystal(x,y));
      break;
    case 6:
      shrines.push(new Shrine_emptiness(x,y));
      break;
    case 7:
      shrines.push(new Shrine_shattered(x,y));
      break;
    case 8:
      shrines.push(new Shrine_unstable(x,y));
      break;
    case 9:
      shrines.push(new Shrine_absolute(x,y));
      break;
    default:
      break;
  }
}