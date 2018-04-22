/*
    Fill this array with a list of names of images
    to be pre-loaded.
*/
var preload = [
  "images/club.png", "images/monhappy.png", "images/residential.png", "images/sayorifrantic.png", "images/namebox.png", "images/textbox.png",
  "images/monleanworry.png", "images/natturnawayopeneyes.png", "images/sayorifrowneyfinger.png", "images/sayorinormal.png", "images/sayoriclosedeyessmile.png",
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
var inputArea;

/*
    This function must exist, and must have this name
*/
function prepareNovel()
{
  inputArea = new Input('yourName',
{
    position: new Position(0.2, 0.5),
    width: 0.5,
    text: "",
    text2: "Please enter your name"
});
    novel.imagePath = "images/"; // path to your image directory
    novel.audioPath = "audio/"; // path to your audio directory
    
    // initialize your characters, positions, and text blocks here
    natsuki = new Character("???", {color: "#fff"});
    monika = new Character("???", {color: "#fff"});
    sayori = new Character("???", {color: "#fff"});
    n = new Character("");
    player = new Character("???", {color: "#fff"});
    
    leftSide = new Position(0, 0.69, 0, 0.5);
    rightSide = new Position(0.5, 0.69, 0, 0.5);
    middle = new Position(0.20, 0.69, 0, 0.5);
    
    photo = new Character("");  
    lionText = new TextBlock("myText");
    
    // and put your script commands into this array
    script = [
        label, "start",
        audio, {src: "playwithme", format: ["ogg","wav", "mp3"], action: "play"},
        scene, "residential.png",
        inputArea, "",
        jsCall,  { fcn: setPlayerName },
        setVars, { playerName: novel.userVar.yourName},
        sayori, "\"Heeeeeeeyyy!!\"",
        n, "I see an annoying girl running toward me from the distance, waving her arms in the air like she's totally oblivious to any attention she might draw to herself.",
        n, "That girl is Sayori, my neighbor and good friend since we were children.",
        n, "You know, the kind of friend you'd never see yourself making today, but it just kind of works out because you've known each other for so long?",
        n, "We used to walk to school together on days like this, but starting around high school she would oversleep more and more frequently, and I would get tired of waiting up.",
        n, "But if she's going to chase after me like this, I almost feel better off running away.",
        n, "However, I just sigh and idle in front of the crosswalk and let Sayori catch up to me.",
        jsCall,  { fcn: setSayoriName },
        sayori, {image: "sayorifrantic.png", position: middle, width: "0.5", height: "0.5"},
        sayori, "\"Haaahhh...haaahhh...\"",
        sayori, "\"I overslept again!\"",
        sayori, "\"But I caught you this time!\"",
        player, "\"Maybe, but only because I decided to stop and wait for you.\"",
        sayori, {image: "sayorifrowneyfinger.png"},
        sayori, "\"Eeehhhhh, you say that like you were thinking about ignoring me!\"",
        sayori, "\"That's mean, {{novel.userVar.yourName}}!\"",
        player, "\"Well, if people stare at you for acting weird then I don't want them to think we're a couple or something.\"",
        sayori, {image: "sayorinormal.png"},
        sayori, "\"Fine, fine\"",
        sayori, "\"But you did wait for me, after all.\"",
        sayori, "\"I guess you don't have it in you to be mean even if you want to~\"",
        player, "\"Whatever you say, Sayori...\"",
        sayori, {image: "sayoriclosedeyessmile.png"},
        sayori, "\"Ehehe~\""
    ];
}

function setPlayerName() {
  novel.userVar.playerName = novel.userVar.yourName;
  player.name = novel.userVar.yourName;
}

function setSayoriName() {
  sayori.name = "Sayori";
}
