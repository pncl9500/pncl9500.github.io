patternTimer = -1;
pattern = null;

patterns = [
  //rain
  {
    weight: 5,
    wallList: [
      {s: 0, b: 0, l: 40},
      {s: 2, b: 0, l: 40},
      {s: 4, b: 0, l: 40},
      {s: 1, b: 15, l: 40},
      {s: 3, b: 15, l: 40},
      {s: 5, b: 15, l: 40},
      {s: 0, b: 30, l: 40},
      {s: 2, b: 30, l: 40},
      {s: 4, b: 30, l: 40},
      {s: 1, b: 45, l: 40},
      {s: 3, b: 45, l: 40},
      {s: 5, b: 45, l: 40},
      {s: 0, b: 60, l: 40},
      {s: 2, b: 60, l: 40},
      {s: 4, b: 60, l: 40},
    ],
    end: 90,
    minDrought: 2,
  },
  //5gate
  {
    weight: 10,
    wallList: [
      {s: 0, b: 0, l: 40},{s: 1, b: 0, l: 40},{s: 2, b: 0, l: 40},{s: 3, b: 0, l: 40},{s: 4, b: 0, l: 40},
      {s: 0, b: 30, l: 40},{s: 1, b: 30, l: 40},{s: 3, b: 30, l: 40},{s: 4, b: 30, l: 40},{s: 5, b: 30, l: 40},
      {s: 0, b: 60, l: 40},{s: 1, b: 60, l: 40},{s: 2, b: 60, l: 40},{s: 3, b: 60, l: 40},{s: 4, b: 60, l: 40},
      {s: 0, b: 90, l: 40},{s: 1, b: 90, l: 40},{s: 3, b: 90, l: 40},{s: 4, b: 90, l: 40},{s: 5, b: 90, l: 40},
    ],
    end: 120,
    minDrought: 0,
  },
  //spiral
  {
    weight: 4,
    wallList: [
      {s: 0, b: 0, l: 80},{s: 3, b: 0, l: 80},{s: 1, b: 0, l: 80},{s: 4, b: 0, l: 80},
      {s: 1, b: 5, l: 80},{s: 4, b: 5, l: 80},
      {s: 2, b: 10, l: 80},{s: 5, b: 10, l: 80},
      {s: 0, b: 15, l: 80},{s: 3, b: 15, l: 80},
      {s: 1, b: 20, l: 80},{s: 4, b: 20, l: 80},
      {s: 2, b: 25, l: 80},{s: 5, b: 25, l: 80},
      {s: 0, b: 30, l: 80},{s: 3, b: 30, l: 80},
      {s: 1, b: 35, l: 80},{s: 4, b: 35, l: 80},
      {s: 2, b: 40, l: 80},{s: 5, b: 40, l: 80},
      {s: 0, b: 45, l: 80},{s: 3, b: 45, l: 80},
    ],
    end: 70,
    minDrought: 3,
  },
  //hard brackets
  {
    weight: 5,
    wallList: [
      {s: 0, b: 0, l: 40},{s: 3, b: 0, l: 40},{s: 1, b: 0, l: 40},{s: 4, b: 0, l: 40},
      {s: 1, b: 15, l: 40},{s: 4, b: 15, l: 40},{s: 2, b: 15, l: 40},{s: 5, b: 15, l: 40},
      {s: 2, b: 30, l: 40},{s: 5, b: 30, l: 40},{s: 0, b: 30, l: 40},{s: 3, b: 30, l: 40},
      {s: 1, b: 45, l: 40},{s: 4, b: 45, l: 40},{s: 2, b: 45, l: 40},{s: 5, b: 45, l: 40},
      {s: 0, b: 60, l: 40},{s: 3, b: 60, l: 40},{s: 1, b: 60, l: 40},{s: 4, b: 60, l: 40},
      {s: 2, b: 75, l: 40},{s: 5, b: 75, l: 40},{s: 0, b: 75, l: 40},{s: 3, b: 75, l: 40},
    ],
    end: 100,
    minDrought: 3,
  },



]

wallEntrancePoint = 1000;

recentPatterns = [0, 1, 2, 3]

function handlePatterns(){
  if (pattern === null){
    patternTimer = -1;
    pattern = selectPattern();
    recentPatterns.splice(0, 1);
  } else {
    if (patternTimer > patterns[pattern].end){
      recentPatterns.push(pattern);
      pattern = null;
      randoff = floor(random(0, centerSides));
    } else {
      for (w = 0; w < patterns[pattern].wallList.length; w++){
        if (patternTimer === patterns[pattern].wallList[w].b){
          walls.push(new Wall((patterns[pattern].wallList[w].s + randoff) % centerSides, wallEntrancePoint, wallEntrancePoint + patterns[pattern].wallList[w].l))
        }
      }
    }
  }
  patternTimer += 1;
}

function selectPattern(){
  validPattern = false;
  while (!validPattern){
    pt = floor(random(0, patterns.length));
    minDrought = patterns[pt].minDrought;
    validPattern = true;
    for (i = recentPatterns.length - 1; i > recentPatterns.length - 1 - minDrought; i--){
      if (recentPatterns[i] === pt){
        validPattern = false;
      }
    }
  }
  return pt;
}