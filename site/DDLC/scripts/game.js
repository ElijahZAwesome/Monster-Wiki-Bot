/*
    Fill this array with a list of names of images
    to be pre-loaded.
*/
var preload = [
  "images/wipeleft.png", "images/club.png", "images/class.png", "images/corridor.png", "images/sayoriveryhappy.png", "images/noise1.png", "images/noise2.png", "images/noise3.png", "images/noise4.png", "images/sayoriveryworryhandsup.png", "images/sayoriworrymouthclosedhandsdown.png", "images/monhappy.png", "images/residential.png", "images/sayorifrantic.png", "images/namebox.png", "images/textbox.png", "images/sayoriworrymouthclosed.png", "images/sayoriworryhandsdown.png", "images/monikanormal.png", "images/yurionehandmouthclosedeyesclosed.png",
  "images/monikaleanworry.png", "images/sayoririghthanduphappy.png", "images/sayoriopensmilehandsdown.png", "images/natsukiarmcrosslooktosidemouthclosed.png", "images/natsukiturnawayopeneyes.png", "images/natsukislightmouthonehip.png", "images/sayorifrowneyfinger.png", "images/sayorinormal.png", "images/sayoriclosedeyessmile.png", "images/sayorihappyonehandup.png", "images/sayorilookleftshy.png", "images/sayoriveryhappyeyesclosedhandsup.png", "images/sayorifrowneyfingerlookleft.png", "images/sayorinervousfingerlookleft.png", "images/yurinormal.png", "images/natsukislightmouthhip.png", "images/monikahappymouthclosedarmsdown.png",
];

/*
    This section pre-loads your images.
    Don't change it unless you know what you're doing.
*/
var preloadObj = new Array(preload.length);
var amountLoaded = 0;
for (var i = 0; i < preload.length; i++) {
  preloadObj[i] = new Image();
  preloadObj[i].src = preload[i];
  preloadObj[i].onload = function() {
    console.log("asset loaded.");
    amountLoaded++;
  };
  if(amountLoaded == preload.length) {
    gameLoaded = true;
  }
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
function prepareNovel() {
  novel.imagePath = "images/"; // path to your image directory
  novel.audioPath = "audio/"; // path to your audio directory

  // initialize your characters, positions, and text blocks here
  natsuki = new Character("Natsuki", {
    color: "#fff",
    position: new Position(0.2, 0.69, 0, 0.5)
  });
  monika = new Character("Monika", {
    color: "#fff",
    position: new Position(0.2, 0.69, 0, 0.5)
  });
  yuri = new Character("Yuri", {
    color: "#fff",
    position: new Position(0.2, 0.69, 0, 0.5)
  });
  sayori = new Character("Sayori", {
    color: "#fff",
    position: new Position(0.2, 0.69, 0, 0.5)
  });
  n = new Character("");
  player = new Character("MC", {
    color: "#fff"
  });
  player.name = playerName;

  offScreenLeft = new Position(-0.5, 0.69, 0, 0.5);
  farLeftSide = new Position(-0.1, 0.69, 0, 0.5);
  leftSide = new Position(0, 0.69, 0, 0.5);
  leftSideDown = new Position(0, 0.70, 0, 0.5);
  middle = new Position(0.20, 0.69, 0, 0.5);
  middleDown = new Position(0.20, 0.70, 0, 0.5);
  middleUp = new Position(0.20, 0.68, 0, 0.5);
  rightSide = new Position(0.5, 0.69, 0, 0.5);
  farRightSide = new Position(0.5, 0.69, 0, 0.5);
  rightSideDown = new Position(0.5, 0.70, 0, 0.5);

  // and put your script commands into this array
  script = [
    label, "start",
    ifStatement, "isQuickEnding == true",
    jump, "Quick",
    endIf, "",
    audio, {
      src: "playwithme",
      format: ["ogg", "wav", "mp3"],
      action: "play",
      loop: true
    },
    scene, "residential.png",
    jsCall, {
      fcn: setCharName,
      params: [sayori, "???"]
    },
    sayori, "\"Heeeeeeeyyy!!\"",
    n, "I see an annoying girl running toward me from the distance, waving her arms in the air like she's totally oblivious to any attention she might draw to herself.",
    n, "That girl is Sayori, my neighbor and good friend since we were children.",
    n, "You know, the kind of friend you'd never see yourself making today, but it just kind of works out because you've known each other for so long?",
    n, "We used to walk to school together on days like this, but starting around high school she would oversleep more and more frequently, and I would get tired of waiting up.",
    n, "But if she's going to chase after me like this, I almost feel better off running away.",
    n, "However, I just sigh and idle in front of the crosswalk and let Sayori catch up to me.",
    jsCall, {
      fcn: setCharName,
      params: [sayori, "Sayori"]
    },
    sayori, {image: "sayorifrantic.png", position: middle, zindex: "1"},
    sayori, "\"Haaahhh...haaahhh...\"",
    sayori, "\"I overslept again!\"",
    sayori, "\"But I caught you this time!\"",
    player, "\"Maybe, but only because I decided to stop and wait for you.\"",
    sayori, {image: "sayorifrowneyfinger.png", position: middleDown},
    sayori, "\"Eeehhhhh, you say that like you were thinking about ignoring me!\"",
    sayori, "\"That's mean, {{playerName}}!\"",
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
    sayori, "\"By the way, {{playerName}}...\"",
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
    background, {image: "class.png", effect: 'wiperight'},
    n, "The school day is as ordinary as ever, and it's over before I know it.",
    n, "After I pack up my things, I stare blankly at the wall, looking for an ounce of motivation.",
    player, "\"Clubs...\"",
    n, "Sayori wants me to check out some clubs.",
    n, "I guess I have no choice but to start with the anime club...",
    sayori, "\"Hellooo?\"",
    sayori, {image: "sayoriworrymouthclosedhandsdown.png", position: middle, zindex: "1", visibility: "visible"},
    player, "\"Sayori...?\"",
    n, "Sayori must have come into the classroom while I was spacing out.",
    n, "I look around and realize that I'm the only one left in the classroom.",
    sayori, {image: "sayorinormal.png"},
    sayori, "\"I thought I'd catch you coming out of the classroom, but I saw you just sitting here and spacing out, so I came in.\"",
    sayori, "\"Honestly, you're even worse than me sometimes... I'm impressed!\"",
    player, "\"You don't need to wait up for me if it's going to make you late to your own club.\"",
    sayori, {image: "sayorilookleftshy.png"},
    sayori, "\"Well, I thought you might need some encouragement, so I thought, you know...\"",
    player, "\"Know what?\"",
    sayori, {image: "sayorinormal.png"},
    sayori, "\"Well, that you could come to my club!\"",
    player, "\"Sayori...\"",
    sayori, {image: "sayoriveryhappyeyesclosedhandsup.png"},
    player, "\"...There is no way I'm going to your club.\"",
    sayori, {image: "sayorifrowneyfingerlookleft.png", position: middleDown},
    sayori, "\"Eeeehhhhh?! Meanie!\"",
    n, "Sayori is vice president of the Literature Club.",
    n, "Not that I was ever aware that she had any interest in literature.",
    n, "In fact, I'm 99\% sure she only did it because she thought it would be fun to help start a new club.",
    n, "Since she was the first one to show interest after the one who proposed the club, she inherited the title \"Vice President\".",
    n, "That said, my interest in literature is guaranteed to be even less.",
    player, "\"Yeah. I'm going to the anime club.\"",
    sayori, {image: "sayoriworrymouthclosedhandsdown.png", position: middle},
    sayori, "\"C'mon, please?\"",
    player, "\"Why do you care so much, anyway?\"",
    sayori, {image: "sayorinervousfingerlookleft.png"},
    sayori, "\"Well...\"",
    sayori, "\"I kind of told the club yesterday I would bring in a new member...\"",
    sayori, "\"And Natsuki made cupcakes and everything...\"",
    sayori, "\"Ehehe...\"",
    player, "\"Don't make promises you can't keep!\"",
    n, "I can't tell if Sayori is really that much of an airhead, or if she's so cunning as to have planned all of this out.",
    n, "I let out a long sigh.",
    player, "\"Fine... I'll stop by for a cupcake, okay?\"",
    sayori, {image: "sayoriveryhappyeyesclosedhandsup.png", position: middleUp},
    sayori, {position: middle},
    sayori, "\"Yes! Let's go~!\"",
    sayori, {visibility: "hidden"},
    background, {image: "corridor.png", effect: 'wiperight'},
    audio, {
      action: "stop",
    },
    n, "And thus, today marks the day I sold my soul for a cupcake.",
    n, "I dejectedly follow Sayori across the school and upstairs - a section of the school I rarely visit, being generally used for third-year classes and activities.",
    n, "Sayori, full of energy, swings open the classroom door.",
    sayori, {image: "sayorihappybothhandsup.png", position: offScreenLeft, visibility: "visible"},
    background, {image: "club.png", effect: 'wiperight'},
    audio, {
      src: "dokidoki2",
      format: ["ogg", "wav", "mp3"],
      action: "play",
      loop: true
    },
    pause, 100,
    sayori, {image: "sayorihappybothhandsup.png", position: farLeftSide, visibility: "visible"},
    sayori, "\"Everyone! The new member is here~!\"",
    player, "\"I told you, don't call me a 'new member--'\"",
    sayori, {image: "sayorihappybothhandsup.png", position: offScreenLeft, visibility: "visible"},
    n, "Eh? I glance around the room.",
    jsCall, {
      fcn: setCharName,
      params: [yuri, "Girl 1"]
    },
    yuri, {image: "yurinormal.png", position: middle, zindex: "1", visibility: "visible"},
    yuri, "\"Welcome to the Literature Club. It's a pleasure meeting you.\"",
    yuri, "\"Sayori always says nice things about you.\"",
    yuri, {position: rightSide, zindex: "2"},
    jsCall, {
      fcn: setCharName,
      params: [natsuki, "Girl 2"]
    },
    natsuki, {image: "natsukislightmouthhip.png", position: leftSide, zindex: "3", visibility: "visible"},
    natsuki, "\"Seriously? You brought a boy?\"",
    natsuki, "\"Way to kill the atmosphere.\"",
    yuri, {position: farRightSide, zindex: "2"},
    natsuki, {position: middle, zindex: "2"},
    jsCall, {
      fcn: setCharName,
      params: [monika, "Girl 3"]
    },
    monika, {image: "monikahappymouthclosedarmsdown.png", position: farLeftSide, zindex: "2", visibility: "visible"},
    monika, "\"Ah, {{playerName}}! What a nice surprise!\"",
    monika, "\"Welcome to the club!\"",
    monika, {image: "monikanormal.png"},
    player, "\"...\"",
    n, "All words escape me in this situation.",
    n, "This club...",
    n, "{{allowOverflow()}}<i>...is full of incredibly cute girls!!</i>",
    natsuki, {image: "natsukislightmouthonehip.png"},
    yuri, {visibility: "hidden"},
    monika, {visibility: "hidden"},
    natsuki, "{{disallowOverflow()}}\"What are you looking at?\"",
    natsuki, "\"If you want to say something, say it.\"",
    player, "\"S-Sorry...\"",
    yuri, {image: "yurionehandmouthclosedeyesclosed.png", visibility: "visible"},
    yuri, "\"Natsuki...\"",
    jsCall, {
      fcn: setCharName,
      params: [natsuki, "Natsuki"]
    },
    focusChar, "Natsuki",
    natsuki, {image: "natsukiarmcrosslooktosidemouthclosed.png"},
    natsuki, "\"Hmph.\"",
    focusChar, "none",
    n, "The girl with the sour attitude, whose name is apparently Natsuki, is one I don't recognize.",
    n, "Her small figure makes me think she's probably a first-year.",
    n, "She is also the one who made cupcakes, according to Sayori.",
    sayori, {image: "sayoririghthanduphappy.png", position: farLeftSide, visibility: "visible"},
    sayori, "\"You can just ignore her when she gets moody~\"",
    n, "Sayori says that quietly into my ear, then turns back toward the other girls.",
    sayori, {image: "sayoriopensmilehandsdown.png"},
    sayori, "\"Anyway! This is Natsuki, always full of energy.\"",
    focusChar, "Yuri",
    yuri, "\"D-Dont say things like that...\"",
    
    label, "Quick",
    audio, {
      src: "playwithme",
      format: ["ogg", "wav", "mp3"],
      action: "play"
    },
    scene, "residential.png",
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
    jsCall, {
      fcn: quickEnding
    },
  ];
}

function setCharName(char, nameToChange) {
  char.name = nameToChange;
}