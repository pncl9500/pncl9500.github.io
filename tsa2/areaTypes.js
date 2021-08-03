//enemy spawns for each area are in spawns.js

areaTypes = {
  sewer1: {
    generationType: "lines",
    structures:[
      {structure: "sewer_chest_container_1", count: 1, chance:1},
      {structure: "sewer_chest_container_2", count: 1, chance:1},
      {structure: "sewer_chest_container_3", count: 1, chance:1},
      {structure: "sewer_chest_container_4", count: 1, chance:1},
      {structure: "shrine_generator", count: 1, chance: 1},
      {structure: "shop", count: 1, chance: 1},
    ],
    mapPal: {
      r: 69,
      g: 99,
      b: 64,
      liner: 54,
      lineg: 84,
      lineb: 49,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "sewer2",
    chestCostMultiplier: 1,
  },
  sewer2: {
    generationType: "lines",
    structures:[
      {structure: "sewer_chest_container_1", count: 1, chance:1},
      {structure: "sewer_chest_container_2", count: 1, chance:1},
      {structure: "sewer_chest_container_3", count: 1, chance:1},
      {structure: "sewer_chest_container_4", count: 1, chance:1},
      {structure: "shrine_generator", count: 1, chance: 1},
      {structure: "shop", count: 1, chance: 1},
    ],
    mapPal: {
      r: 69,
      g: 99,
      b: 64,
      liner: 54,
      lineg: 84,
      lineb: 49,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "sewer3",
    chestCostMultiplier: 1.33,
  },
  sewer3: {
    generationType: "lines",
    structures:[
      {structure: "sewer_chest_container_1", count: 1, chance:1},
      {structure: "sewer_chest_container_2", count: 1, chance:1},
      {structure: "sewer_chest_container_3", count: 1, chance:1},
      {structure: "sewer_chest_container_4", count: 1, chance:1},
      {structure: "shrine_generator", count: 1, chance: 1},
      {structure: "shop", count: 1, chance: 1},
    ],
    mapPal: {
      r: 69,
      g: 99,
      b: 64,
      liner: 54,
      lineg: 84,
      lineb: 49,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "sewer4",
    chestCostMultiplier: 1.66,
  },
  sewer4: {
    generationType: "none",
    structures:[
      {structure: "bossArena_1", count: 1, chance:1},
    ],
    mapPal: {
      r: 69,
      g: 99,
      b: 64,
      liner: 54,
      lineg: 84,
      lineb: 49,
    },
    w: 5120,
    h: 5120,
    xDivisions: 32,
    yDivisions: 32,
    hasHole: false,
    chestCostMultiplier: 1,
  },
  cave1: {
    generationType: "cave",
    structures:[
      {structure: "shrine_generator", count: 1, chance: 1},      
      {structure: "shop", count: 1, chance: 1},
    ],
    mapPal: {
      r: 80,
      g: 80,
      b: 80,
      liner: 65,
      lineg: 65,
      lineb: 65,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "cave2",
    chestCostMultiplier: 2,
  },
  cave2: {
    generationType: "cave",
    structures:[
      {structure: "shrine_generator", count: 1, chance: 1},
      {structure: "geode", count: 1, chance: 1},
      {structure: "shop", count: 1, chance: 1},
    ],
    mapPal: {
      r: 80,
      g: 80,
      b: 80,
      liner: 65,
      lineg: 65,
      lineb: 65,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "cave3",
    chestCostMultiplier: 2.5,
  },
  cave3: {
    generationType: "cave",
    structures:[
      {structure: "shrine_generator", count: 1, chance: 1},
      {structure: "shop", count: 1, chance: 1},
      {structure: "supernest", count: 1, chance: 1},
    ],
    mapPal: {
      r: 80,
      g: 80,
      b: 80,
      liner: 65,
      lineg: 65,
      lineb: 65,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "cave4",
    chestCostMultiplier: 3,
  },
  cave4: {
    generationType: "none",
    structures:[
      {structure: "bossArena_2", count: 1, chance:1},
    ],
    mapPal: {
      r: 80,
      g: 80,
      b: 80,
      liner: 65,
      lineg: 65,
      lineb: 65,
    },
    w: 5120,
    h: 5120,
    xDivisions: 32,
    yDivisions: 32,
    hasHole: false,
    chestCostMultiplier: 1,
  },
  debugArea: {
    generationType: "random",
    structures:[
      {structure: "donut", count: 1, chance: 1},
      {structure: "among", count: 1, chance: 0.1},
      {structure: "shop", count: 1, chance: 1},
      {structure: "geode", count: 1, chance: 1},
    ],
    mapPal: {
      r: 255,
      g: 255,
      b: 255,
      liner: 240,
      lineg: 240,
      lineb: 240,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "sewer1",
    chestCostMultiplier: 4.5,
  },
  library: {
    generationType: "none",
    structures:[
      
    ],
    mapPal: {
      r: 110,
      g: 55,
      b: 0,
      liner: 200,
      lineg: 70,
      lineb: 0,
    },
    w: 1536,
    h: 1536,
    xDivisions: 12,
    yDivisions: 12,
    hasHole: false,
    chestCostMultiplier: 1,
  },
  blackMarket: {
    generationType: "lines",
    structures:[
      {structure: "shop", count: 24, chance: 1},
      {structure: "desertPortal", count: 1, chance: 1},
    ],
    mapPal: {
      r: 170,
      g: 170,
      b: 170,
      liner: 155,
      lineg: 155,
      lineb: 155,
    },
    w: 3072,
    h: 3072,
    xDivisions: 24,
    yDivisions: 24,
    hasHole: true,
    holeArea: "sewer1",
    chestCostMultiplier: 2.5,
  },
  desert: {
    generationType: "random",
    structures:[
      {structure: "shop", count: 1, chance: 1},
      {structure: "geode", count: 2, chance: 1},
      {structure: "pyramid", count: 1, chance: 1},
      {structure: "shrine_generator", count: 1, chance: 1},
      {structure: "returnPortal", count: 1, chance: 1},
    ],
    mapPal: {
      r: 219,
      g: 212,
      b: 136,
      liner: 204,
      lineg: 197,
      lineb: 121,
    },
    w: 8192,
    h: 8192,
    xDivisions: 64,
    yDivisions: 64,
    hasHole: true,
    holeArea: "blackMarket",
    chestCostMultiplier: 3.5,
  },
};