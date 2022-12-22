swordName = "";
function generateName(){
  hasThePrefix = floor(random(0, 3)) === 0

  if (hasThePrefix){
    swordName = "the ";
  }

  swordName = swordName.concat(firstWordList[floor(random(0, firstWordList.length - 1))])
  swordName = swordName.concat(secondWordList[floor(random(0, secondWordList.length - 1))])

  if (!hasThePrefix && floor(random(0, 3)) === 0){
    swordName = swordName.concat(` the ${titleList[floor(random(0, titleList.length - 1))]}`)
  }

  if (floor(random(0, 3))){
    swordName = swordName.concat(` of ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
    if (floor(random(0, 4))){
      swordName = swordName.concat(` and ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
    } else {
      if (floor(random(0,7)) === 0){
        swordName = swordName.concat(`, ${inheritorList[floor(random(0, inheritorList.length - 1))]}`) 
        while(random(0,1.5) < 1){
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
"blue",
"purple",
"fruit",
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
"dema",
"nox",
"aurora",
"sloom",
"butt",
"fart",
"ultra",
"glog",
"chain",
"sludge",
"clunch",
"poison",
"lightning",
"thunder",
"fire",
"flame",
"water",
"ocean",
"venom",
"sharp",
"power",
"blink",
"ravage",
"destroy",
"explode",
"crayon",
"implode",
"ix",
"earth",
"nix",
"terra",
"swift",
"ogre",
"auto",
"killer",
"love",
"chemical",
"random",
"unstoppa",
"bat",
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
"salt",
"griffin",
"america",
"rick",
"duck",
"honey",
"crystal",
"void",
"solar",
"elf",
"",
"",
"",
"",
"",
"",
]

secondWordList = [
"blade",
"knife",
"killer",
"kill",
"abyss",
"burger",
"blood",
"butcher",
"taur",
"danger",
"saber",
"beater",
"smoker",
"keep",
"est",
"slicer",
"slayer",
"guide",
"powder",
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
"bubble",
"nuker",
"nuke",
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
"pisser",
"flare",
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
"",
"",
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
  "an awful day",
  "a wonderful day",
  "bees",
  "millions",
  "fire",
  "caves",
  "the iterators",
  "your computer",
  "houses",
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
       
       
       
       
       
       
       
       
       

       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       