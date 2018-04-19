/*
    Fill this array with a list of names of images
    to be pre-loaded.
*/
var preload = [
  "doorbell.png","welcome.png", "welcome2.png"
];

/*
    This section pre-loads your images.
    Don't change it unless you know what you're doing.
*/
var preloadObj = new Array(preload.length);
for (var i = 0; i < preload.length; i++)
{
    preloadObj[i] = new Image();
    preloadObj[i].src = preload[i];
}

/* Declare variables for characters, positions, and text blocks here */
var script; // this variable will hold your script
var chalmers;
var seymour;
var n; // short for "narrator"

var leftSide;
var rightSide;
var upperCenter;
var rightTop;

/*
    This function must exist, and must have this name
*/
function prepareNovel()
{
    novel.imagePath = "images/"; // path to your image directory
    novel.audioPath = ""; // path to your audio directory
    
    // initialize your characters, positions, and text blocks here
    seymour = new Character("Seymour", {color: "rgb(64, 204, 64)"});
    chalmers = new Character("Chalmers", {color: "#ffff00"});
    n = new Character("");
    
    leftSide = new Position(0, .75, 0, 1);
    rightSide = new Position(800, 450, 1, 1);
    upperCenter = new Position(0.5, 0.3, 0.5, 0.5);
    rightTop = new Position(1, 0.1, 1, 0);
    
    // and put your script commands into this array
    script = [
        label, "start",
        scene, "doorbell.png",
        chalmers, "*rings doorbell*",
        scene, "welcome.png",
        chalmers, "Well Seymour, I made it. despite your directions.",
        label, "menu1",
        menu, [
            "How do you greet him?",
            "Welcome!", [jump, "normal"],
            "Rudely", [jump, "rude"],
        ],
      
        label, "normal",
        seymour, "Ah, Superintendent Chalmers, welcome! I hope you're prepared for an unforgettable luncheon!",
        chalmers, "Yeah.",
        scene, "welcome2.png",
        n, "*They leave to the living room & kitchen.*",
        scene, "egads.png",
        seymour, "Oh egads!",
        scene, "ruined.png",
        chalmers, "My roast is ruined!",
        menu, [
            "But what if?",
            "I were to purchase fast food", [],
            "I were to own up to Chalmers", [jump, "honest"],
        ],
        seymour, "I were to purchase fast food and desguise it as my own cooking?",
        seymour, "Hohoho, delightfully devilish, seymour!",
      
        label, "rude",
        seymour, "Oh. Chalmers. Took you long enough.",
        chalmers, "Rude...",
      
        label, "honest",
        seymour, "I were to be honest and inform the Superintendent?",
        
        label, "The End",
        seymour, "oof"
    ];
}
