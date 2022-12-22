swordName = "";
function generateName(){
  hasThePrefix = floor(random(0, 3)) === 0

  if (hasThePrefix){
    swordName = "the ";
  }

  if (floor(random(0, 3)) === 0){
    if (floor(random(0, prefixList.length)) < 1 && !hasThePrefix){
      swordName = swordName.concat(`that `)
    } else {
      swordName = swordName.concat(`${prefixList[floor(random(0, prefixList.length - 1))]} `)
      if (floor(random(0, 16)) === 0){
        swordName = swordName.concat(`and ${prefixList[floor(random(0, prefixList.length - 1))]} `)
      }
    }
  }
 

  var remove = "none";
  if (random(0, 27) < 1){
    var remove = "first";
    if (random(0, 8) < 1){
      remove = "second";
    }
  }
  if (!(remove === "first")){
    swordName = swordName.concat(firstWordList[floor(random(0, firstWordList.length - 1))])
  }
  if (!(remove === "second")){
    swordName = swordName.concat(secondWordList[floor(random(0, secondWordList.length - 1))])
  }
  if (random(0, 15) < 1){
    swordName = swordName.concat(secondWordList[floor(random(0, secondWordList.length - 1))])
  }

  if (!hasThePrefix && floor(random(0, 3)) === 0){
    swordName = swordName.concat(` the ${titleList[floor(random(0, titleList.length - 1))]}`)
  }


  if (random(0, 2.5) < 1){
    swordName = swordName.concat(` of ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
    if (random(0, 7) < 1){
      swordName = swordName.concat(` and ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
    } else {
      if (floor(random(0,8)) === 0){
        swordName = swordName.concat(`, ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
        while(random(0,2.5) < 1){
          swordName = swordName.concat(`, ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
        }
        if (random(0,100) < 1){
          swordName = swordName.concat(` and you!`) 
        } else {
          swordName = swordName.concat(` and ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
        }
      }
    }
  }
}

firstWordList = [
"blood",
"kill",
"murder",
"red",
"orange",
"yellow",
"green",
"ichor",
"blue",
"purple",
"fruit",
"glock",
"heavy",
"strong",
"killing",
"fool",
"fight",
"monster",
"dragon",
"god",
"sword",
"goblin",
"evil",
"heaven",
"extendo",
"figgle",
"extempo",
"sand",
"tempo",
"dema",
"de",
"nox",
"aurora",
"sloom",
"butt",
"fart",
"hole",
"wire",
"ultra",
"warp",
"war",
"fortress",
"unstoppa",
"glog",
"chain",
"sludge",
"clunch",
"poison",
"lightning",
"thunder",
"fire",
"flame",
"coochie",
"wrinkle",
"water",
"ocean",
"venom",
"sharp",
"power",
"blink",
"ravage",
"destroy",
"explode",
"ito",
"crayon",
"implode",
"ix",
"earth",
"nix",
"smog",
"terra",
"swift",
"ogre",
"auto",
"exo",
"killer",
"love",
"chemical",
"random",
"unstoppa",
"bat",
"jumbo",
"quero",
"gargantua",
"weed",
"wind",
"piss",
"volcano",
"phase",
"glimmer",
"shimmer",
"scrimblo",
"jolt",
"flare",
"jet",
"laser",
"plasma",
"gloopo",
"wacky",
"mega",
"fall",
"giga",
"super",
"wonder",
"sketch",
"pencil",
"vapor",
"ice",
"rock",
"stone",
"nut",
"zombie",
"skele",
"exploder",
"stick",
"cannon",
"slayer",
"reaper",
"awesome",
"destructo",
"dark",
"shadow",
"shiver",
"forest",
"inferno",
"gold",
"xan",
"silver",
"diamond",
"toxic",
"toxin",
"angel",
"angle",
"chasm",
"canyon",
"reflecto",
"astro",
"soul",
"butcher",
"berserk",
"rage",
"knife",
"hero",
"villain",
"omega",
"abyss",
"steel",
"veggie",
"iron",
"burst",
"micro",
"nano",
"gun",
"revenge",
"death",
"peace",
"pace",
"excali",
"excalibur",
"big",
"small",
"fuck",
"ass",
"shit",
"snipe",
"pain",
"shart",
"glass",
"cold",
"storm",
"gamma",
"radio",
"urani",
"geo",
"chrono",
"photo",
"danger",
"phyto",
"doom",
"hell",
"giant",
"wyvern",
"sled",
"keen",
"para",
"gnome",
"ghost",
"phantom",
"spectre",
"specter",
"hachi",
"dry",
"brave",
"scrunkly",
"scrunkle",
"tin",
"wiggle",
"dawn",
"break",
"grand",
"might",
"galaxy",
"triple",
"quadruple",
"crypto",
"toon",
"squid",
"sewer",
"mutant",
"paint",
"bloon",
"penis",
"meth",
"crack",
"pebble",
"cock",
"dick",
"bone",
"rock",
"roll",
"rust",
"forge",
"rot",
"dong",
"wizard",
"core",
"quantum",
"mist",
"sun",
"moon",
"tan",
"greg",
"good",
"dust",
"mino",
"space",
"pee",
"miro",
"matter",
"gene",
"raw",
"salt",
"griffin",
"america",
"rick",
"polter",
"duck",
"honey",
"air",
"crystal",
"void",
"solar",
"elf",
]

secondWordList = [
"blade",
"knife",
"killer",
"gust",
"kill",
"abyss",
"burger",
"fryer",
"blood",
"butcher",
"taur",
"danger",
"capitator",
"pitator",
"dog",
"saber",
"table",
"anger",
"bird",
"glock",
"beater",
"deleter",
"smoker",
"keep",
"cruncher",
"lock",
"est",
"slicer",
"fly",
"slayer",
"guide",
"powder",
"throngler",
"fool",
"berserk",
"griffin",
"edge",
"rage",
"volcano",
"soul",
"nose",
"burst",
"bob",
"blob",
"bubble",
"nuker",
"nuke",
"scroll",
"tal",
"sloom",
"breaker",
"buster",
"heater",
"puncher",
"tricker",
"honey",
"slasher",
"sword",
"axe",
"ax",
"hole",
"pulse",
"grit",
"brand",
"hand",
"dagger",
"death",
"beam",
"laser",
"boom",
"keeper",
"maker",
"heroin",
"shatter",
"bloom",
"gloom",
"ibur",
"burn",
"fuck",
"ass",
"bitch",
"shit",
"finger",
"thrower",
"bringer",
"back",
"toilet",
"shart",
"mast",
"spear",
"foil",
"vapor",
"steel",
"synthesis",
"slinger",
"number",
"piss",
"weed",
"plant",
"spin",
"born",
"flame",
"chemical",
"heart",
"hart",
"wolf",
"reaper",
"reap",
"shitter",
"eye",
"pisser",
"flare",
"charge",
"light",
"neck",
"fade",
"wave",
"um",
"y",
"thytum",
"net",
"blast",
"ghost",
"spectre",
"specter",
"mangler",
"phantom",
"spectrum",
"blaster",
"face",
"bottoms",
"flight",
"vault",
"slam",
"defender",
"knight",
"shield",
"night",
"day",
"break",
"dawn",
"might",
"man",
"wiggler",
"glow",
"galaxy",
"lateral",
"fight",
"box",
"melt",
"hack",
"thaw",
"growl",
"grim",
"pox",
"wonder",
"drought",
"law",
"horn",
"door",
"life",
"power",
"er",
"velocity",
"ation",
"mutant",
"fucker",
"soft",
"penis",
"stopper",
"heaven",
"hell",
"shell",
"crack",
"meth",
"cock",
"dick",
"crusher",
"smasher",
"dong",
"melter",
"popper",
"stairs",
"rock",
"roll",
"spiral",
"forge",
"fizz",
"music",
"song",
"theme",
"rot",
"long",
"core",
"haunt",
"dream",
"wizard",
"sin",
"meat",
"mist",
"dust",
"salt",
"blower",
"sucker",
"cyclone",
"us",
"crystal",
"rust",
"eater",
"consumer",
"nut",
"void",
"launcher",
"cheese",
"matic",
"omatic",
"dirt",
"sharpener",
]

titleList = [
"ineffable",
"toucher",
"unfathomable",
"breaker",
"unholy",
"holy",
"saint",
"dong",
"unresolved",
"final",
"ultimate",
"creative",
"uncreative",
"storm",
"inevitable",
"unending",
"real",
"insane",
"sharted",
"zooted",
"crazy",
"high",
"low",
"hellish",
"aurora",
"demonic",
"powerful",
"legendary",
"pure",
"mythical",
"wacky",
"legend",
"wonderful",
"masterful",
"crafted",
"forged",
"first",
"second",
"third",
"three-hundred-and-fifteenth",
"funny",
"weapon",
"musical",
"long",
"bonkers",
"entitled",
"redditor",
"possessed",
"alive",
"haunted",
"swift",
"fast",
"slow",
"sluggish",
"slayer",
"obliterator",
"deconstructor",
"destroyer",
"reconstructor",
"constructor",
"dreamer",
"nightmare",
"enchanted",
"red",
"orange",
"yellow",
"green",
"blue",
"purple",
"juicy",
"fruit",
"crumbly",
"old",
"wise",
"wizard",
"beheld",
"unholdable",
"unbreakable",
"sinner",
"huge",
"nautral",
"magical",
"godly",
"unreal",
"quantum",
"wave",
"one",
"chosen one",
"beloved",
"dead",
"reaper",
"killer",
"insane",
"goopy",
"attuned",
"sharpened",
"forged",
"reverberator",
"fixer",
"duke",
"arbiter",
"hopeful",
"hope",
"cool",
"great",
"shitty",
"crappy",
"broken",
"birthday boy",
"sword",
"asshole",
"warrior",
"glorious",
"impostor",
"magnum opus",
"crystal",
"vulgar",
"vessel",
"witch",
"alchemist",
"echo",
"endless",
"splendid",
"defender",
"racist",
"frog",
"noob",
"pro",
"launcher",
"gnome launcher",
"hedgehog",
"holy",
"duelist",
"accelerator",
"decelerator",
"car",
"truck",
"sampo",
"ogre",
"pilgrim",
"concoction",
"penis",
"levitating",
"levitatable",
"enchantable",
"oil",
"sun",
"moon",
"wet",
"unstable",
"stable",
"shitpost",
"durable",
"shocking",
"interesting",
"concentrated",
"keeper",
"poison",
"flexible",
"bendable",
"channeled",
"channeler",
"alive",
"guide",
"quick-witted",
"case study",
"breaker",
"awful",
"deity",
"hasty",
"ascended",
"game",
"sequel",
"deluxe",
"formula",
"catalyst",
"fair",
"collector",
"unending",
"relentless",
"just",
"crunch",
"unknown",
"corrupted",
"chemical",
"eugenicist",
"movie",
"sexy",
"decapitator",
"berserk",
"repelled",
"beautiful",
"splendid",
"edgy",
"tear",
"warper",
"color",
"refined",
"forbidden",
"gloopy",
"mean",
"demon",
"rusted",
]
       
       
inheritorList = [
  "dragons",
  "warriors",
  "the village",
  "deities",
  "summer",
  "dimensions",
  "geometry",
  "treasures",
  "the forbidden",
  "winter",
  "spring",
  "funny dogs",
  "funny cats",
  "videos",
  "pestilence",
  "death",
  "famine",
  "sky",
  "rust",
  "conquest",
  "war",
  "realms",
  "celestial realms",
  "autumn",
  "leaves",
  "the unending human spirit",
  "demons",
  "rizz",
  "the rot",
  "hell",
  "cubes",
  "your mom",
  "heaven",
  "archangels",
  "the crunch",
  "dubstep",
  "farms",
  "your ass",
  "my ass",
  "the outskirts",
  "the city",
  "the ruins",
  "ruin",
  "racism",
  "angels",
  "nerds",
  "formulas",
  "the unknown",
  "gamers",
  "aliens",
  "lasers",
  "keeps",
  "strongholds",
  "pronouns",
  "mushrooms",
  "dongs",
  "bullshit",
  "whatever the fuck",
  "fungus",
  "judgement",
  "doom",
  "sloom",
  "sludge",
  "presidents",
  "swamps",
  "trees",
  "willows",
  "valleys",
  "galaxies",
  "telescopes",
  "mercury",
  "venus",
  "jupiter",
  "neptune",
  "mars",
  "saturn",
  "pluto",
  "towers",
  "fortresses",
  "the fortress",
  "cliffs",
  "mountains",
  "reality warpers",
  "babylon",
  "mystery",
  "zeus",
  "athena",
  "cookies",
  "trigrams",
  "mana",
  "codes",
  "analysis",
  "magic",
  "fantasy",
  "forests",
  "keepers",
  "heroin",
  "legends",
  "mist",
  "wonder",
  "ambrosia",
  "ichor",
  "creators",
  "brass",
  "instruments",
  "jacks",
  "queens",
  "kings",
  "hearts",
  "spades",
  "clubs",
  "diamonds",
  "metal",
  "blood",
  "worms",
  "volcanoes",
  "god",
  "arbiters",
  "glory",
  "piss drawers",
  "books",
  "libraries",
  "impostors",
  "us",
  "our work",
  "walls",
  "many",
  "brickwork",
  "pyramids",
  "vapor",
  "wizards",
  "witches",
  "giants",
  "beans",
  "geckos",
  "lizards",
  "dumbasses",
  "great ones",
  "the gods",
  "magnesia",
  "the salt",
  "our matter",
  "hermes",
  "despair",
  "apollo",
  "medusa",
  "goblets",
  "the challenges",
  "the ascended",
  "ascension",
  "the stars",
  "the earth",
  "the work",
  "earth",
  "gold",
  "silver",
  "crystals",
  "that double word shit",
  "yendor",
  "knowledge",
  "stones",
  "the philosophers",
  "gnomes",
  "three living blocks",
  "eight living blocks",
  "enlightenment",
  "alchemists",
  "fluid",
  "the void",
  "witches",
  "echoes",
  "penises",
  "secrets",
  "hallways",
  "clocks",
  "time",
  "wind",
  "the legend",
  "fairy tales",
  "the broken",
  "worlds",
  "broken worlds",
  "the world",
  "zippers",
  "shit",
  "ass",
  "toilets",
  "stories",
  "hope",
  "grass",
  "power",
  "glowing",
  "hopes",
  "dreams",
  "nightmares",
  "swords",
  "blades",
  "phantoms",
  "shitposts",
  "ghosts",
  "voids",
  "hedgehogs",
  "hyperbolic paraboloids",
  "horses",
  "legend",
  "victory",
  "creatures",
  "horrors",
  "death",
  "redditors",
  "the endless",
  "old gods",
  "our country",
  "plentitudes",
  "crowdfunding",
  "plenty",
  "penitence",
  "forgiveness",
  "penis",
  "sloppy toppy",
  "the aurora",
  "dogshit",
  "thousands of cuts",
  "an awful day",
  "regeneration",
  "ardor",
  "a wonderful day",
  "bees",
  "millions",
  "fire",
  "caves",
  "the iterators",
  "your computer",
  "houses",
  "the sender",
  "decay",
  "mold",
  "moss",
  "judgement",
  "what we have done",
  "what we must do",
  "what we have achieved",
  "what we seek",
  "what we have seen",
  "what we are afraid of",
  "what we deserve",
  "what we require",
  "what we were given",
]
       
prefixList = [
  "unfathomable",
  "greasy",
  "silly",
  "wet",
  "shitty",
  "shoddy",
  "tiny",
  "shadow",
  "crappy",
  "ephemeral",
  "impending",
  "inevitable",
  "immortal",
  "double-sided",
  "mortal",
  "hunky",
  "broad",
  "shimmering",
  "bloody",
  "electronic",
  "great",
  "unstoppable",
  "masterful",
  "swift",
  "decapitating",
  "sloomed",
  "wonderful",
  "insane",
  "unreasonable",
  "berserk",
  "dead man's",
  "dead",
  "skeleton",
  "ethereal",
  "unperceptable",
  "pirate",
  "invisible",
  "impressive",
  "flaming",
  "electrified",
  "venomous",
  "poisonous",
  "dripping",
  "treacherous",
  "unacceptable",
  "irradiated",
  "radioactive",
  "reinforced",
  "regenerated",
  "moldy",
  "vvizard",
  "mossy",
  "regenerating",
  "infinite",
  "reinvented",
  "concept of",
  "heavenly",
  "holy",
  "unholy",
  "channeled",
  "concentrated",
  "shit",
  "penis",
  "fuck",
  "ass",
  "demon",
  "kitchen",
  "DIY",
  "assembled",
  "endless",
  "collected",
  "sought-after",
  "legendary",
  "rotting",
  "juicy",
  "tired",
  "unbreakable",
  "fragile",
  "ritual",
  "breakable",
  "curved",
  "malleable",
  "false",
  "true",
  "evolved",
  "exciting",
  "frugal",
  "fleeting",
  "decaying",
  "fungal",
  "chosen",
  "important",
]
       
       
       
       
       
       
       

       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       