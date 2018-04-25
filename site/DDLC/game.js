/*
    Fill this array with a list of names of images
    to be pre-loaded.
*/
var preload = [
  "images/club.png", "images/class.png", "images/sayoriveryhappy.png", "images/noise1.png", "images/noise2.png", "images/noise3.png", "images/noise4.png", "images/sayoriveryworryhandsup.png", "images/sayoriworrymouthclosedhandsdown.png", "images/monhappy.png", "images/residential.png", "images/sayorifrantic.png", "images/namebox.png", "images/textbox.png", "images/sayoriworrymouthclosed.png", "images/sayoriworryhandsdown.png",
  "images/monleanworry.png", "images/natturnawayopeneyes.png", "images/sayorifrowneyfinger.png", "images/sayorinormal.png", "images/sayoriclosedeyessmile.png", "images/sayorihappyonehandup.png",
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
    natsuki = new Character("Girl 2", {color: "#fff", position: new Position(0.2, 0.69, 0, 0.5)});
    monika = new Character("Girl 1", {color: "#fff", position: new Position(0.2, 0.69, 0, 0.5)});
    yuri = new Character("Girl 3", {color: "#fff", position: new Position(0.2, 0.69, 0, 0.5)});
    sayori = new Character("Sayori", {color: "#fff", position: new Position(0.2, 0.69, 0, 0.5)});
    n = new Character("");
    player = new Character("???", {color: "#fff"});
    
    leftSide = new Position(0, 0.69, 0, 0.5);
    rightSide = new Position(0.5, 0.69, 0, 0.5);
    middle = new Position(0.20, 0.69, 0, 0.5);
    leftSideDown = new Position(0, 0.70, 0, 0.5);
    rightSideDown = new Position(0.5, 0.70, 0, 0.5);
    middleDown = new Position(0.20, 0.70, 0, 0.5);
    
    photo = new Character("");  
    lionText = new TextBlock("myText");
    
    // and put your script commands into this array
    script = [
        label, "start",
        ifStatement, "isQuickEnding == true",
          jump, "Quick",
        endIf, "",
        audio, {src: "playwithme", format: ["ogg","wav", "mp3"], action: "play", loop: true},
        scene, "residential.png",
        inputArea, "",
        jsCall,  { fcn: setPlayerName },
        setVars, { playerName: novel.userVar.yourName},
        jsCall,  { fcn: setCharName, params: [sayori, "???"] },
        sayori, "\"Heeeeeeeyyy!!\"",
        n, "I see an annoying girl running toward me from the distance, waving her arms in the air like she's totally oblivious to any attention she might draw to herself.",
        n, "That girl is Sayori, my neighbor and good friend since we were children.",
        n, "You know, the kind of friend you'd never see yourself making today, but it just kind of works out because you've known each other for so long?",
        n, "We used to walk to school together on days like this, but starting around high school she would oversleep more and more frequently, and I would get tired of waiting up.",
        n, "But if she's going to chase after me like this, I almost feel better off running away.",
        n, "However, I just sigh and idle in front of the crosswalk and let Sayori catch up to me.",
        jsCall,  { fcn: setCharName, params: [sayori, "Sayori"] },
        sayori, {image: "sayorifrantic.png", position: middle, zindex: "1"},
        sayori, "\"Haaahhh...haaahhh...\"",
        sayori, "\"I overslept again!\"",
        sayori, "\"But I caught you this time!\"",
        player, "\"Maybe, but only because I decided to stop and wait for you.\"",
        sayori, {image: "sayorifrowneyfinger.png", position: middleDown},
        sayori, "\"Eeehhhhh, you say that like you were thinking about ignoring me!\"",
        sayori, "\"That's mean, {{novel.userVar.yourName}}!\"",
        player, "\"Well, if people stare at you for acting weird then I don't want them to think we're a couple or something.\"",
        sayori, {image: "sayorinormal.png", position: middle},
        sayori, "\"Fine, fine.\"",
        sayori, "\"But you did wait for me, after all.\"",
        sayori, "\"I guess you don't have it in you to be mean even if you want to~\"",
        player, "\"Whatever you say, Sayori...\"",
        sayori, {image: "sayoriclosedeyessmile.png"},
        sayori, "\"Ehehe~\"",
        sayori, {visibility: "hidden"},
        player, "We cross the street together and make our way to school.",
        player, "As we draw near, the streets become increasingly speckled with other students making their daily commute.",
        sayori, {image: "sayorihappyonehandup.png", visibility: "visible"},
        sayori, "\"By the way, {{novel.userVar.yourName}}...\"",
        sayori, "\"Have you decided on a club to join yet?\"",
        player, "\"A club?\"",
        player, "\"I told you already, I'm really not interested in joining any clubs.\"",
        player, "\"I haven't been looking, either.\"",
        sayori, {image: "sayoriworrybothhandsup.png", position: middleDown},
        sayori, "\"Eh? That's not true!\"",
        sayori, "\"You told me you would join a club this year!\"",
        player, "\"Did I...?\"",
        n, "I'm sure it's possible that I did, in one of our many conversations where I dismissively go along with whatever she's going on about.",
        n, "Sayori likes to worry a little too much about me, when I'm perfectly content just getting by on the average while spending my free time on games and anime.",
        sayori, "\"Uh-huh!\"",
        sayori, "\"I was talking about how I'm worried that you won't learn how to socialize or have any skills before college.\"",
        sayori, "\"Your happiness is really important to me, you know!\"",
        sayori, "\"And I know you're happy now, but I'd die at the thought of you becoming a NEET in a few years because you're not used to the real world!\"",
        sayori, {image: "sayoriworrymouthclosed.png"},
        sayori, "\"You trust me, right?\"",
        sayori, "\"Don't make me keep worrying about you...\"",
        player, "\"Alright, alright...\"",
        player, "\"I'll look at a few clubs if it makes you happy.\"",
        player, "\"No promises, though.\"",
        sayori, {image: "sayoriworryhandsdown.png"},
        sayori, "\"Will you at least promise me you'll try a little?\"",
        player, "\"Yeah, I guess I'll promise you that.\"",
        sayori, {image: "sayoriveryhappy.png", position: middle},
        sayori, "\"Yaay~!\"",
        n, "Why do I let myself get lectured by such a carefree girl?",
        n, "More than that, I'm surprised I even let myself relent to her.",
        n, "I guess seeing her worry so much about me makes me want to ease her mind at least a little bit - even if she does exaggerate everything inside of her head.",
        sayori, {visibility: "hidden"},
        background, "class.png",
        n, "The school day is as ordinary as ever, and it's over before I know it.",
        n, "After I pack up my things, I stare blankly at the wall, looking for an ounce of motivation.",
        player, "\"Clubs...\"",
        n, "Sayori wants me to check out some clubs.",
        n, "I guess I have no choice but to start with the anime club...",
        sayori, "\"Hellooo?\"",
        sayori, {image: "sayoriworrymouthclosedhandsdown.png", position: middle, zindex: "1"},
        player, "\"Sayori...?\"",
        n, "Sayori must have come into the classroom while I was spacing out.",
        n, "I look around and realize that I'm the only one left in the classroom.",
        sayori, {image: "sayorinormal.png"},
        sayori, "{{glitchGen(100)}}",
        sayori, "{{allowOverflow()}}This is a test, its meant to show how the span can overflow if there is a very long string.<br> I can also manually newline using < br >",
        sayori, "{{disallowOverflow()}}and now were back to normal wrapping of span text, as should be evidenced by now.",
        sayori, "{{enableGlitch()}} This text is glitched.",
        sayori, "{{disableGlitch()}} This text is not.",
      
        label, "Quick",
        audio, {src: "playwithme", format: ["ogg","wav", "mp3"], action: "play"},
        scene, "residential.png",
        inputArea, "",
        jsCall,  { fcn: setPlayerName },
        setVars, { playerName: novel.userVar.yourName},
        sayori, {image: "sayoriveryworrymouthclosedhandsdown.png", position: middle, zindex: "1", visibility: "visible"},
        sayori, "\"...\"",
        sayori, "\"...\"",
        sayori, "\"W-What...\"",
        sayori, "\"...\"",
        sayori, "\"This...\"",
        sayori, "\"What is this...?\"",
        sayori, "\"Oh no...\"",
        sayori, "\"No...\"",
        sayori, "\"This can't be it.\"",
        sayori, "\"This can't be all there is.\"",
        sayori, {image: "sayoriveryworryhandsup.png"},
        sayori, "\"What is this?\"",
        sayori, "\"What am I?\"",
        sayori, "\"Make it stop!\"",
        sayori, "\"PLEASE MAKE IT STOP!\"",
        jsCall, {fcn: quickEnding },
    ];
}

function setPlayerName() {
  novel.userVar.playerName = novel.userVar.yourName;
  player.name = novel.userVar.yourName;
}

function setCharName(char, nameToChange) {
  char.name = nameToChange;
}
