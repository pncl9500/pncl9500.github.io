

function setupSkills(){

  skills = {
    //here i have paralysis a the first in the list as a tutorial type thing, to explain what each thing does in the skill codes.
    //internal name of the skill.
    paralysis: {
      interruptedOnDeath: true,
      usableWhileDead: false,
      //energy cost is the cost of the thing.
      energyCost: 15,
      //cooldown is the cooldown, in frames.
      //paralysis doesn't really have one.
      //to apply the cooldown, you will need to use the "addCooldown" effect.
      cooldown: 1,
      //if the cooldown cools down over time. Most of the skills do. Ones that don't cool down over time include necro's self revive.
      cooldownDecreasesOverTime: true,
      //if the cooldown cools down through the use of pellets. One pellet is worth one frame.
      pelletsDecreaseCooldown: false,
      //The first example, paralysis, has an updown pattern type.
      //the patternType is when the effects happen. List of patternTypes:
      //updown
      //updown has two effect groups: upEffects, and downEffects.
      //upeffects happen the first time the ability button is tapped, and downeffects happen the second time it is tapped.
      //example: paralysis. the field appears on first tap, then disappears on second tap, along with the freeze.
      //effect groups are an array of effects.
      patternType: "updown",
        //true means the player needs the energy cost to use the up effects.
        //false means the player can activate the up effects without energy.
        needEnergyForUp: true,

        //up effects happen the first time the player presses the ability button.
        upEffects: [
          {
            //fields. note that here, the field doesn't actually do anything.
            effect: "makeField",
            //the name of the field in order to remove it.
            fieldName: "freezeField",
            //the color of the field.
            color: rimeFieldColor,
            //radius of field. one grid space is 16 units.
            size: [130,150,170,190,210],
            //where does the effect come from? this is that.
            //playerPosition = where the player is.
            //stickToPlayer = where the player is, and where they will be in the future.
            //triggerPosition = where the effect was triggered from, if used inside a trigger or timer.
            //if you want to have the effect come from another effect, like a bullet or something, you'll have to use triggers/timers.
            x: "stickToPlayer",
            y: "stickToPlayer",
          },
        ],

        //down effects happen the second time the player presses the ability button.
        downEffects: [
          {
            effect: "freezeEnemies",
            //use arrays in place of another value to have the value change when the skill is levelled up.
            //how big the radius of the freeze is.
            size: [130,150,170,190,210],
            //duration of the freeze, in frames.
            duration: 120,
            //if the override is true, the freeze will override any other freezes or slows.
            override: true,
            x: "playerPosition",
            y: "playerPosition",
          },
          {
            //where the energy is reduced.
            effect: "reduceEnergy",
            
          },
          {
            //removes the cosmetic cyan field.
            effect: "killField",
            //name of field to remove.
            fieldName: "freezeField"
          },
          //here is where i would have a cooldown... but paralysis doesn't have one.
        ],
        //interrupt effects are called in an updown when the player dies while the ability is up, as well as setting the ability to down.
        interruptEffects: [
          {
            //removes the cosmetic cyan field.
            effect: "killField",
            //name of field to remove.
            fieldName: "freezeField"
          },
        ],
        //Some updowns automatically down after a certain number of time.
        //Not this one, so it's false.
        //false = the updown doesn't automatically down after being upped.
        autoDown: false,
        //one of the effects is to trigger a group of effects! that effect has a parameter which is the group ID.
        //that ID is which group in here will be triggered.
        //paralysis doesn't do any of this, however. 
        extraEffectGroups: [

        ]
    },

    warp:{
      usableWhileDead: false,
      energyCost: 5,
      cooldown: 18,
      patternType: "instant",
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
      effects: [
        {
          effect: "movePlayer",
          moveType: "directional",
          distance: [40, 50, 60, 70, 80],
        },
        {
          effect: "reduceEnergy",
        },
        {
          effect: "cooldown",
        }
      ]
    },

    energyDrain1: {
      usableWhileDead: false,
      energyCost: [1,2,3,4,5],
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
      patternType: "instant",
        effects: [
          {
            effect: "reduceEnergy",
          },
          {
            effect: "cooldown",
          }
        ],
        autoDown: false,
        extraEffectGroups: [

        ]
    },

    energyDrain2: {
      usableWhileDead: false,
      energyCost: 10,
      cooldown: [480, 240, 120, 60, 30],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
      patternType: "updown",
        needEnergyForUp: true,
        upEffects: [
        ],
        downEffects: [
          {
            effect: "reduceEnergy",
          },
          {
            effect: "cooldown",
          }
        ],
        autoDown: false,
        extraEffectGroups: [

        ]
    },
    //placeholders for now, so the game doesn't immediately crash.
    flow: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    harden:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    reverse: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    minimize:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    distort: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    energize:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    resurrection: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    reanimate:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    stomp: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    vigor:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    barrier: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    stream:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    night: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    vengeance:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    blackhole: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    orbit:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    backtrack: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    rewind:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    atonement: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    depart:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    bandages: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    latch:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    spark: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    charge:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    shriek: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    shadow:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    fusion: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    mortar:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    decay: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    shatter:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    sugarrush: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    sweettooth:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    shift: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    obscure:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    crumble: {
      usableWhileDead: false,
      cooldown: 100,
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },
    earthquake:{
      usableWhileDead: false,
      cooldown: [240,120,60,30,15],
      cooldownDecreasesOverTime: true,
      pelletsDecreaseCooldown: false,
    },

  }

}



function intteruptSkill(skillName, skillSlot){
  switch (skillSlot){
    case 1:
      player.skill1updownToggle = "down"
      for (e = 0; e < skills[skillName].interruptEffects.length; e++){
        doEffect(skills[skillName].interruptEffects[e], skillName, skillSlot);
      }
      break;
    case 2:
      player.skill2updownToggle = "down"
      for (e = 0; e < skills[skillName].interruptEffects.length; e++){
        doEffect(skills[skillName].interruptEffects[e], skillName, skillSlot);
      }
      break;
  }
}

function attemptSkillActivation(skillName, skillSlot){
  switch (skills[skillName].patternType) {
    case "updown":
      switch (skillSlot) {
        case 1:
          if (player.skill1updownToggle === "down"){
            if (skills[skillName].needEnergyForUp === false || (player.energy >= getSkillValue(skills[skillName].energyCost, 1, false))){
              player.skill1updownToggle = "up"
              for (e = 0; e < skills[skillName].upEffects.length; e++){
                doEffect(skills[skillName].upEffects[e], skillName, skillSlot);
              }
              return;
            }
          }
          if (player.skill1updownToggle === "up"){
            if (player.energy >= skills[skillName].energyCost){
              player.skill1updownToggle = "down"
              for (e = 0; e < skills[skillName].downEffects.length; e++){
                doEffect(skills[skillName].downEffects[e], skillName, skillSlot);
              }
              return;
            }
          }
          break;
        case 2:
          if (player.skill2updownToggle === "down"){
            if (skills[skillName].needEnergyForUp === false || (player.energy >= getSkillValue(skills[skillName].energyCost, 2, false))){
              player.skill2updownToggle = "up"
              for (e = 0; e < skills[skillName].upEffects.length; e++){
                //THERE MAY BE PROBLEMS HERE. BECAUSE OF e. e MIGHT BE CHANGED IN doEffect() FUCKING UP THE LOOP
                doEffect(skills[skillName].upEffects[e], skillName, skillSlot);
              }
              return;
            }
          }
          if (player.skill2updownToggle === "up"){
            if (player.energy >= getSkillValue(skills[skillName].energyCost, 2, false)){
              player.skill2updownToggle = "down"
              for (e = 0; e < skills[skillName].downEffects.length; e++){
                doEffect(skills[skillName].downEffects[e], skillName, skillSlot);
              }
              return;
            }
          }
          break;
      }
      break;
    case "instant":
      switch (skillSlot) {
        case 1:
          if (player.energy >= getSkillValue(skills[skillName].energyCost, 1, false)){
            for (e = 0; e < skills[skillName].effects.length; e++){
              doEffect(skills[skillName].effects[e], skillName, skillSlot);
            }
            return;
          }
          break;
        case 2:
          if (player.energy >= getSkillValue(skills[skillName].energyCost, 2, false)){
            for (e = 0; e < skills[skillName].effects.length; e++){
              doEffect(skills[skillName].effects[e], skillName, skillSlot);
            }
            return;
          }
          break;
      }
      break;
    default:
      break;
  }

}

//funky fields and their funniness
fields = [];
class Field{
  constructor(name, palette, size, x, y){
    this.name = name;
    this.palette = palette;
    this.size = size;
    if (x === "playerPosition"){
      this.x = player.x;
    }
    if (y === "playerPosition"){
      this.y = player.y;
    }
    this.xAssignment = x
    this.yAssignment = y 
  }

  draw(){
    if (this.xAssignment === "stickToPlayer"){
      this.x = player.x;
    }
    if (this.yAssignment === "stickToPlayer"){
      this.y = player.y;
    }
    fill(this.palette);
    ellipse(this.x + camOffsetX + camX, this.y + camOffsetY + camY, this.size, this.size);
  }
}

//effects and what they do.
function doEffect(effectProperties, skillName, skillSlot){
  switch (effectProperties.effect) {
    case "reduceEnergy":
      player.energy -= getSkillValue(skills[skillName].energyCost, skillSlot);
      break;
    case "cooldown":
      switch (skillSlot) {
        case 1:
          player.skill1cooldown = getSkillValue(skills[skillName].cooldown, skillSlot);
          break;
        case 2:
          player.skill2cooldown = getSkillValue(skills[skillName].cooldown, skillSlot);
          break;
      }
      break;
    case "makeField":
      fields.push(new Field(effectProperties.fieldName, effectProperties.color, getSkillValue(effectProperties.size, skillSlot, false), effectProperties.x, effectProperties.y));
      break;
    case "killField":
      for (f = 0; f < fields.length; f++){
        if (fields[f].name === effectProperties.fieldName){
          fields.splice(f, 1);
          f -= 1;
        }
      }
      break;
    case "freezeEnemies":
      effectX = 0;
      effectY = 0;
      //get the origin point of the freeze.
      switch (effectProperties.x) {
        case "playerPosition":
          effectX = player.x;
          break;
        case "stickToPlayer":
          effectX = player.x;
        default:
          effectX = effectProperties.x;
          break;
      }
      switch (effectProperties.y) {
        case "playerPosition":
        case "stickToPlayer":
          effectY = player.y;
          break;
        default:
          effectY = effectProperties.y;
          break;
      }
      for (n = 0; n < enemies.length; n++){
        if ((!(enemies[n].immune)) && (Math.sqrt((enemies[n].x - effectX) * (enemies[n].x - effectX) + (enemies[n].y - effectY) * (enemies[n].y - effectY)) < getSkillValue(effectProperties.size, skillSlot, false)/2 + enemies[n].size/2)){
          if (effectProperties.override || enemies[n].freezeTimer < 1){
            enemies[n].freezeTimer = getSkillValue(effectProperties.duration, skillSlot, false);
          }
        }
      }
      break;
    case "movePlayer":
      if (effectProperties.moveType = "directional"){
        player.x += player.skillDirectionX * getSkillValue(effectProperties.distance,skillSlot,false);
        player.y += player.skillDirectionY * getSkillValue(effectProperties.distance,skillSlot,false);
      }
      break;
    default:
      break;
  }
}

//turn an array based value
//example would be
//radius: [110/120/130/140/150]
//into 
function getSkillValue(value, skillSlot, forceValue){
  if (forceValue){
    if (skillSlot === 1){
      if (player.skill1level === 0){
        return 10;
      }
    }
    if (skillSlot === 2){
      if (player.skill2level === 0){
        return 10;
      }
    }
  }

  if (Array.isArray(value)){
    if (skillSlot === 1){
      return value[player.skill1level - 1];
    }
    if (skillSlot === 2){
      return value[player.skill2level - 1];
    }
  } else {
    return value;
  }
}
