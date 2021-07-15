//list of enemies that spawn in spawners. Every spawner triggered will increase the difficulty of the area, meaning harder things will spawn.
spawns = {
  //spawns in the debug level (only level for now)
  debugArea: [
  [],
  [],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  [],
  ["gray"],
  ["gray"],
  ["gray"],
  ["gray"],
  ["gray"],
  ["gray"],
  ["gray"],
  ["gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "gray", "gray"],
  ["gray", "red"],
  ["gray", "red"],
  ["gray", "red"],
  ["gray", "red"],
  ["gray", "red"],
  ["gray", "red"],
  ["gray", "red"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "gray"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "red", "gray", "red"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "gray", "yellow", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "gray"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["gray", "yellow", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "red", "red", "red"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["red", "yellow", "red", "yellow"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "gray", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["gray", "red", "red", "blue"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["blue", "red", "red", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["red", "blue", "yellow", "red"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["gray", "blue", "blue", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "gray", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "red", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "gray", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "gray"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "red", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "red", "blue", "yellow", "blue", "yellow"],
  ["gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray","gray"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ["blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue","blue", "yellow", "blue", "blue", "blue", "yellow", "blue", "yellow", "blue", "blue"],
  ],

  //spawns in the black market
  blackMarket: [
    ["red"],
    ["red", "red"],
    ["red", "red", "red"],
    ["red", "red", "red", "red"],
    ["red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
    ["red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red"],
  ],
  //spawns in the desert
  desert: [
    ["gray"],
    ["yellow"],
    ["gray", "gray"],
    ["yellow", "gray"],
    ["yellow", "yellow"],
    ["pink", "yellow"],
    ["pink", "pink"],
    ["gray", "gray", "gray"],
    ["yellow", "gray", "gray"],
    ["yellow", "yellow", "gray"],
    ["yellow", "yellow", "yellow"],
    ["pink", "yellow", "yellow"],
    ["pink", "pink", "yellow"],
    ["pink", "pink", "pink"],
    ["gray", "gray", "gray", "gray"],
    ["yellow", "gray", "gray", "gray"],
    ["yellow", "yellow", "gray", "gray"],
    ["yellow", "yellow", "yellow", "gray"],
    ["yellow", "yellow", "yellow", "yellow"],
    ["pink", "yellow", "yellow", "yellow"],
    ["pink", "pink", "yellow", "yellow"],
    ["pink", "pink", "pink", "yellow"],
    ["pink", "pink", "pink", "pink"],
    ["gray", "gray", "gray", "gray", "gray"],
    ["yellow", "gray", "gray", "gray", "gray"],
    ["yellow", "yellow", "gray", "gray", "gray"],
    ["yellow", "yellow", "yellow", "gray", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "yellow"],
    ["pink", "pink", "pink", "pink", "pink"],
    ["gray", "gray", "gray", "gray", "gray", "gray"],
    ["yellow", "gray", "gray", "gray", "gray", "gray"],
    ["yellow", "yellow", "gray", "gray", "gray", "gray"],
    ["yellow", "yellow", "yellow", "gray", "gray", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "gray", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink"],
    ["gray", "gray", "gray", "gray", "gray", "gray", "gray"],
    ["yellow", "gray", "gray", "gray", "gray", "gray", "gray"],
    ["yellow", "yellow", "gray", "gray", "gray", "gray", "gray"],
    ["yellow", "yellow", "yellow", "gray", "gray", "gray", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "gray", "gray", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "gray", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "gray"],
    ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
    ["pink", "pink", "pink", "pink", "pink", "pink", "pink", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"],
  ]
}