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
}

#dialogDiv {
    font-family: "Aller";
    color: white;
    text-shadow:
    -1px -1px 0 #161616,
    1px -1px 0 #161616,
    -1px 1px 0 #161616,
    1px 1px 0 #161616;  
    font-size: 25px;
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
  
#sayText {
    top: 100px !important;
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
  
#menuButtons {
    margin-top: 20%;
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
<script type="text/javascript" src="./game.js"></script>
</head>

<body onload="initNovel(1152, 648);">
<div id="debug"></div>
<div id="novelDiv">
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
