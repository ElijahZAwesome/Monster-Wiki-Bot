<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;
       charset=utf-8" />
<title>DDLC</title>
<style type="text/css">
body {
    text-align: center;
}
  
@font-face {
font-family: "Verily Serif Mono";
src: url("font/VerilySerifMono.otf") format("opentype");
}
  
@font-face {
font-family: "Aller";
src: url("font/Aller_Rg.ttf");
}
  
@font-face {
font-family: "RifficFree-Bold";
src: url("font/RifficFree-Bold.ttf");
}
  
#buttons {
    padding-top: 0%;
    position: absolute;
    padding-left: 40%;
}
  
#background0, #background1 {
    width: 1152px;
    height: 648px;
}  
  
#novelDiv {
    width: 1152px;
    height: 648px;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    text-align: center;
    overflow: hidden;
}
  
#menuDiv {
    width: 1152px;
    height: 648px;
    border: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    text-align: center;
}

#dialogDiv {
    font-family: "Aller";
    color: white;
    text-shadow:
    -1px -1px 0 #161616,
    1px -1px 0 #161616,
    -1px 1px 0 #161616,
    1px 1px 0 #161616;  
    font-size: 24px;
    position: absolute;
    z-index: 100;
    width: 70%;
    height: 150px;
    top: 500px;
    left: 15%;
    background-image: url("images/textbox.png");
    background-size:100%;
    background-repeat: no-repeat;
    color: white;
    padding: 7px;
    text-align: left;
    overflow: visible;
}
  
#nameDiv {
    font-family: "RifficFree-Bold";
    color: white;
    text-shadow:
    -2px -2px 0 #ff60ef,
    2px -2px 0 #ff60ef,
    -2px 2px 0 #ff60ef,
    2px 2px 0 #ff60ef;  
    font-size: 25px;
    position: absolute;
    z-index: 100;
    width: 20%;
    height: 50px;
    top: -40px;
    left: 5%;
    background-image: url("images/namebox.png");
    background-size:100%;
    background-repeat: no-repeat;
    color: white;
    padding: 7px;
    text-align: center;
    overflow: visible;
}
  
#confirm {
    font-family: "RifficFree-Bold";
    color: white;
    text-shadow:
    -2px -2px 0 #ff60ef,
    2px -2px 0 #ff60ef,
    -2px 2px 0 #ff60ef,
    2px 2px 0 #ff60ef;  
    font-size: 25px;
    position: absolute;
    z-index: 100;
    width: 20%;
    height: 50px;
    top: 65%;
    left: 40%;
    background-size:100%;
    background-repeat: no-repeat;
    color: white;
    padding: 7px;
    text-align: center;
    overflow: visible;
    border: none;
    background: none;
}
  
#question {
    font-family: "Aller";
    color: black; 
    font-size: 20px;
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 50px;
    top: 13%;
    left: 0%;
    background-size:100%;
    background-repeat: no-repeat;
    padding: 7px;
    text-align: center;
    overflow: visible;
}
  
#confirm:hover {color:rgba(255,255,255, 0.9);text-shadow:
    -2px -2px 0 #ffb7f7,
    2px -2px 0 #ffb7f7,
    -2px 2px 0 #ffb7f7,
    2px 2px 0 #ffb7f7;  }
  
#sayDiv {
    position: absolute;
    top: 20px;
    left: 4%;
    width: 90%;
}
  
#sayText {
    position: relative;
    top: -20px;
    left: 0
}
  
#yourName {
    background-color: rgba(0,0,0,0);
    border: none;
    text-align: center;
}
  
#buttonDiv {
    font-family: "Aller";
    z-index: 100;
    font-size: 37px;
    position: absolute;
    width: 98.9%;
    height: 80px;
    top: 490px;
    left: 0;
    padding: 7px;
    padding-top: 9%;
    text-align: center;
    border: none;
    background: none;
}
  
.btn {
    font-family: "Aller";
    font-size: 15px;
    border: none;
    background: none;
}

/* On mouse-over */
.btn:hover {color:rgba(255,255,255, 0.9);}
  
#menuBGDiv {
    z-index: -2;
    width: 1152px;
    height: 648px;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    overflow: hidden;
    margin-top: -54.6%;
}  
  
#menuChars {
    width: 1152px;
    height: 648px;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    text-align: center;
    overflow: hidden;
    margin-top: -54.6%;
}
  
#menubg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("images/menu_bg.png");
  background-repeat: repeat;
  background-position: 0 0;
  background-size: auto 200%;
/*adjust s value for speed*/
  animation: menubg 500s linear infinite;
}

@keyframes menubg {
  from {
    background-position: 0 0;
  }
/*use negative width if you want it to flow right to left else and positive for left to right*/
  to {
    background-position: -10000px -10000px;
  }
}
  
#logo {
    width: 25%;
    height: auto;
    z-index: 100;
    position: absolute;
    margin-top: -40px;
    margin-left: -480px;
}
  
#sector {
    width: auto;
    height: 100%;
    left: 0px;
    z-index: 90;
    position: absolute;
}
  
.menubtn {
    display: block; /* Make the buttons appear below each other */
    font-family: "RifficFree-Bold";
    color: white;
    text-shadow:
    -2px -2px 0 #ff60ef,
    2px -2px 0 #ff60ef,
    -2px 2px 0 #ff60ef,
    2px 2px 0 #ff60ef;  
    font-size: 25px;
    position: relative;
    z-index: 100;
    width: 13%;
    height: 45px;
    top: 65%;
    left: 40%;
    background-size:100%;
    background-repeat: no-repeat;
    color: white;
    padding: 7px;
    text-align: left;
    overflow: visible;
    border: none;
    background: none;
    line-height: 1px;
}

/* On mouse-over */
.menubtn:hover {color:rgba(255,255,255, 0.9);text-shadow:
    -2px -2px 0 #ffb7f7,
    2px -2px 0 #ffb7f7,
    -2px 2px 0 #ffb7f7,
    2px 2px 0 #ffb7f7;  }
  
#menuButtons {
    margin-top: 28%;
    margin-left: -60%;
    text-align: left;
}
  
#menuyuri {
    position: absolute;
    height: 570px;
    width: auto;
    top: 2%;
    left: 40%;
}
  
#menunatsuki {
    position: absolute;
    height: 570px;
    width: auto;
    top: 7%;
    left: 54%;
}
  
#menusayori {
    position: absolute;
    height: 690px;
    width: auto;
    top: 16%;
    left: 32%;
}
  
#menumonika {
    position: absolute;
    height: 1000px;
    width: auto;
    top: 11%;
    left: 59%;
}
  
#inputDiv {
    background-image: url('images/frame.png');
    width: 25%;
    height: 30%;
    font-family: "Aller";
    font-size: 18px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 30%;
    left: 35%;
}
  
.textClass {
    position: absolute;
    width: 100%;
    top: 40%;
    left: 0px;
}

.menuItem {
    background-image: url('images/frame.png');
    width: 25%;
    margin: 0.5em auto;
    padding: 0.5em 3em;
    background-color: #db1900;
    position: relative;
    text-align: center;
    color: black;
    font-family: "Aller";
    font-size: 18px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

div.menuItem:hover {
    background-color: #ff8c00;
}

</style>

<script type="text/javascript" src="./js-vine.js"></script>
<script type="text/javascript" src="./jquery.js"></script>
<script type="text/javascript" src="./game.js"></script>
<script type="text/javascript">
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);
</script>
</head>

<body>
<div id="debug"></div>
<div id="menuDiv">
  <div id="menuButtons">
    <button class="menubtn" onclick="initNovel(1152, 648);">New Game</button>
    <button class="menubtn" onclick="initNovel(1152, 648);">Load Game</button>
    <button class="menubtn" onclick="initNovel(1152, 648);">Lol</button>
    <button class="menubtn" onclick="initNovel(1152, 648);">Blank</button>
    <button class="menubtn" onclick="initNovel(1152, 648);">Buttons</button><br><br>
    <button class="menubtn" onclick="initNovel(1152, 648);">Return</button>
  </div>
  <div id="menuBGDiv">
    <div id="menubg"></div>
    <img id="sector" src="images/sector.png">
    <img id="logo" src="images/logo.png">
  </div>
  <div id="menuChars">
    <img id="menuyuri" src="images/menu_art_y.png">
    <img id="menunatsuki" src="images/menu_art_n.png">
    <img id="menusayori" src="images/menu_art_s.png">
    <img id="menumonika" src="images/menu_art_m.png">
  </div>
</div>
<div id="novelDiv" style="visibility: hidden;">
    <div style="position: absolute;
        left:0; top: 0; z-index:-1">
        <img id="background0" src="./images/empty.png">
    </div>
    <div style="position: absolute;
        left:0; top: 0; z-index:-1">
        <img id="background1" src="./images/empty.png">
    </div>
    <div id="dialogDiv">
    </div>
  <div id="buttonDiv">
    <button class="btn" onclick="initNovel(1152, 648)">Restart</button>
    <button class="btn" onclick="toggleSkip()">Skip</button>
    <button class="btn" onclick="fullscreen()">Fullscreen(unstable!)</button>
    </div>
</div>

</body>
</html>
