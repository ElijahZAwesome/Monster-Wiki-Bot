<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html;
 charset=utf-8" />
  <link rel="icon" href="images/window_icon.png" type="image/x-icon"/>
<link rel="shortcut icon" href="images/window_icon.png" type="image/x-icon"/>
  <link rel="stylesheet" type="text/css" href="./layout.css">
 <title>DDLC</title><script type="text/javascript" src="./scripts/js-vine.js"></script><script type="text/javascript" src="./scripts/jquery.js"></script><script type="text/javascript" src="./scripts/jQueryRotate.js"></script><script type="text/javascript" src="./scripts/game.js"></script><script type="text/javascript" src="./scripts/js.cookie.js"></script><script type="text/javascript" src="./scripts/lineWrapDetector.js"></script><script type="text/javascript">window.addEventListener('keydown',
function(e) {
  if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13) {
    if(e.target.nodeName=='INPUT'&&e.target.type=='text') {
      e.preventDefault();
      return false;
    }
  }
}

,
true);
</script></head><body onload="initMenu();">
  <div id="debug">
  </div>
  <div id="end">
    <div id="endbg">
  </div>
  </div>
  <div id="menuDiv">
    <p id="disclaimer">This game is not affiliated with Team Salvato.<br>Also,
make sure cookies and javascript are not blocked. </p>
    <audio loop id="menubgm" src="audio/dokidokiliteratureclub.ogg" preload="auto"></audio>
    <div id="menuButtons">
      <button class="menubtn" onclick="initNovel(1152, 648);">New Game</button>
      <button class="menubtn" onclick="initNovel(1152, 648);">Load Game</button>
      <button class="menubtn" onclick="initNovel(1152, 648);">Lol</button>
      <button class="menubtn" onclick="initNovel(1152, 648);">Blank</button>
      <button class="menubtn" onclick="initNovel(1152, 648);">Buttons</button>
      <br><br><button class="menubtn" onclick="initNovel(1152, 648);">Return</button>
    </div>
    <div id="menuBGDiv">
      <div id="menubg">
      </div>
      <img id="sector" src="images/sector.png">
      <img id="logo" src="images/logo.png">
    </div><div id="menuChars">
    <img id="menuyuri" src="images/menu_art_y.png">
    <img id="menunatsuki" src="images/menu_art_n.png">
    <img id="menusayori" src="images/menu_art_s.png">
    <img id="menumonika" src="images/menu_art_m.png">
    </div>
  </div>
  <div id="novelDiv" style="visibility: hidden;">
    <div style="position: absolute; left:0; top: 0; z-index:-1">
 <img id="background0" src="./images/empty.png">
    </div>
    <div style="position: absolute; left:0; top: 0; z-index:-1">
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