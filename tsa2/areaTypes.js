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
    holeArea: "blackMarket",
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
  },
  library: {
    generationType: "none",
    structures:[
      
    ],
    mapPal: {
      r: 130,
      g: 80,
      b: 60,
      liner: 115,
      lineg: 65,
      lineb: 45,
    },
    w: 1536,
    h: 256,
    xDivisions: 12,
    yDivisions: 2,
    hasHole: false,
  },
  blackMarket: {
    generationType: "random",
    structures:[
      {structure: "shop", count: 12, chance: 1},
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
    hasHole: false,
  },
  desert: {
    generationType: "random",
    structures:[
      {structure: "shop", count: 1, chance: 1},
      {structure: "geode", count: 2, chance: 1},
      {structure: "pyramid", count: 1, chance: 1},
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
    hasHole: false,
  },
}