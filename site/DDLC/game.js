/*
    Fill this array with a list of names of images
    to be pre-loaded.
*/
var preload = [
  "club.png", "monhappy.png",
  "monleanworry.png", "natturnawayopeneyes.png",
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
var monika;
var natsuki;
var n; // short for "narrator"
var photo;
var textBlock;

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
    novel.audioPath = "audio/"; // path to your audio directory
    
    // initialize your characters, positions, and text blocks here
    natsuki = new Character("Natsuki", {color: "#fff"});
    monika = new Character("Monika", {color: "#fff"});
    player = new Character("");
    n = new Character("");
    
    leftSide = new Position(0, 0.69, 0, 0.5);
    rightSide = new Position(0.5, 0.69, 0, 0.5);
    
    photo = new Character("");  
    lionText = new TextBlock("myText");
    
    // and put your script commands into this array
    script = [
        label, "start",
        audio, {src: "playwithme", format: ["ogg","wav", "mp3"], action: "play"},
        scene, "club.png",
        player, "I arrive at the Literature Club.",
        monika, {image: "monhappy.png", position: leftSide, width: "0.5", height: "0.5"},
        monika, "\"Hey! Welcome to the literature club!\"",
        natsuki, {position: rightSide, image: "natturnawayopeneyes.png"},
        monika, {image: "monleanworry.png"},
        natsuki, "\"H-Hey.\"",
        monika, "\"Don't worry about Natsuki! Shes just shy.\"",
        natsuki, {position: rightSide},
        natsuki, "\"Am not! I'm just thinking about things.\"",
        monika, "\"Sure.\"",
        
        label, "menu1",
        menu, [
            "So, what would you like to do?",
            "Neither of these choices", [jump, "wild"],
            "Will do anything lol", [jump, "tame"],
        ],
        
        label, "wild",
        scene, "hills2.jpg",
        monika, {position: leftSide},
        natsuki, {position: rightSide},
        photo, {image: "coyote.jpg", position: upperCenter},
        natsuki, "There&rsquo;s a reason this area is called Coyote Valley.",
        monika, "That is one mangy-looking coyote.",
        natsuki, "Not what you expected from seeing the cartoons, is it?",
        natsuki, "But his coloration does help camouflage him in summer.",
        photo, {visibility: "hidden"},
        lionText, {text: "Mountain Lion picture goes here",
            width: 0.5, color: "white", border: "1px solid black",
            backgroundColor: "#800",
            position: new Position(0.25, 0.3), align: "center"},
        monika, "How come all I see is a bunch of words?",
        natsuki, "Do <em>you</em> want to be close enough to a mountain lion to get a picture?",
        monika, "Um, I guess not.",
        lionText, {visibility: "hidden"},
        natsuki, "Mountain lions and coyotes are the two wildest animals out here.",
        jump, "The End",
        
        label, "tame",
        scene, "hills2.jpg",
        monika, {position: leftSide},
        natsuki, {position: rightSide},
        photo, {image: "cat_1988.jpg", position: upperCenter},
        monika, "That&rsquo;s just a housecat!",
        natsuki, "Yes, but there are plenty of them living here.",
        monika, "Did they just wander away from home?",
        natsuki, {image: "sad2.png"},
        natsuki, "Some of them, yes. Others have been dumped in the hills by their owners, who don&rsquo;t want them any more.",
        monika, {image: "angry1.png", say:
        "That&rsquo;s horrible!"},
        natsuki, "I know. I don&rsquo;t see how people can be so heartless.",
        
        photo, {visibility: "hidden"},
        monika, {image: "worried1.png"},
        natsuki, {image: "simple2.png",
        say: "There&rsquo;s another animal you will find in the hills."},
        natsuki, {image: "silence2.png"},
        photo, {image: "deer.jpg", visibility: "visible"},  
        natsuki, "But be quiet, or you&rsquo;ll scare it away.",

        monika, {image: "loving1.png",
        say: "Aww, that&rsquo;s really nice."},
        
        label, "The End",
        scene, {image: "hills1.jpg"},
        monika, {image: "simple1.png", position: leftSide},
        natsuki, {image: "simple2.png", position: rightSide},
        photo, {visibility: "hidden"},
        lionText, {
            width: 0.5, color: "white", border: "1px solid black",
            backgroundColor: "#800",
            position: new Position(0.25, 0.3), align: "center",
            visibility: "visible",
        text: "Gavin and Tyler images by Nicu Buculei, from <a href='http://openclipart.org' style='color:white'>OpenClipart.org</a>"},

        natsuki, "That&rsquo;s it for the tour.",
        monika, "Thanks, Gavin. I really enjoyed it."
    ];
}
