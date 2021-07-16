function loadStructures(){
  structures = {
    donut: {
      tiles: [
        [2,2,2],
        [2,0,2],
        [2,2,2],
      ],
      chests: [],
      npcs: []
    },
    among: {
      tiles:[
        [0,2,2,2,0],
        [2,2,1,1,0],
        [2,2,2,2,0],
        [0,2,2,2,0],
        [0,2,0,2,0],
      ],
      chests: [],
      npcs: []
    },
    geode: {
      tiles: [
        [0,0,1,0,0],
        [0,1,5,1,0],
        [1,5,3,5,1],
        [0,1,5,1,0],
        [0,0,1,0,0],
      ],
      chests: [],
      npcs: []
    },
    shop: {
      tiles: [
        [6,7,8,12],
        [9,10,11,13],
      ],
      chests: [
        {
          chestType: "case_weapon",
          x: 1.3,
          y: 1,
          hasRareChestVariation: true,
          rareChestChance: 0.05,
          rareChest: "case_omega",
        },
        {
          chestType: "case_supply",
          x: 2.7,
          y: 1,
          hasRareChestVariation: true,
          rareChestChance: 0.05,
          rareChest: "case_gungun",
        }
      ],
      npcs: [
        {
          x: 2,
          y: 1,
          w: 64,
          h: 64,
          sprite: loadImage('textures/npcs/overworld/shopkeeper.png')
        },
      ]
    },
    desertPortal: {
      tiles: [
        [0,14,0,14,0],
        [14,14,0,14,14],
        [0,0,0,0,0],
        [14,14,0,14,14],
        [0,14,0,14,0],
      ],
      chests: [
        {
          chestType: "case_desertTeleport",
          x: 2.5,
          y: 2.5,
          hasRareChestVariation: false,
        }
      ],
      npcs: []
    },
    pyramid: {
      tiles: [
        [15,14,14,14,14,14,14,14,14,14],
        [15,14,15,15,14,14,14,15,15,14],
        [15,14,14,15,15,15,14,15,14,14],
        [15,14,15,15,14,15,14,15,14,14],
        [15,15,15,14,15,15,15,15,14,14],
        [15,14,15,14,15,14,14,14,15,14],
        [15,14,15,14,15,15,15,14,15,14],
        [15,14,15,15,15,14,15,15,15,14],
        [15,14,14,14,14,14,14,14,14,14],
      ],
      chests: [
        {
          chestType: "case_excavator",
          x: 8.5,
          y: 1.5,
          hasRareChestVariation: false,
        }
      ],
      npcs: []
    },
    returnPortal: {
      tiles: [
        [16,16,16],
        [16,15,16],
        [16,16,16],
      ],
      chests: [
        {
          chestType: "case_back",
          x: 1.5,
          y: 1.5,
          hasRareChestVariation: false,
        }
      ],
      npcs: []
    }
  }
}
