<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;
       charset=utf-8" />
<title>Steamed Hams</title>
<style type="text/css">
body {
    text-align: center;
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
    font-family: "Deja Vu Sans", Helvetica, Arial, sans-serif;
    font-size: 37px;
    position: absolute;
    width: 98.9%;
    height: 185px;
    top: 450px;
    left: 0;
    background-color: #3d372c;
    color: white;
    padding: 7px;
    text-align: left;
    filter: alpha(opacity=75);
    opacity: 0.75;
}
  
#buttonDiv {
    font-family: "Deja Vu Sans", Helvetica, Arial, sans-serif;
    z-index: 100;
    font-size: 37px;
    position: absolute;
    width: 98.9%;
    height: 80px;
    top: 450px;
    left: 0;
    padding: 7px;
    padding-top: 9%;
    text-align: center;
}

.menuItem {
    width: 75%;
    margin: 0.5em auto;
    padding: 0.5em 3em;
    background-color: #db1900;
    position: relative;
    text-align: center;
    color: white;
    font-family: "Deja Vu Sans", Helvetica, Arial, sans-serif;
    font-size: 18px;
    -moz-border-radius: 15px;
    border-radius: 15px;
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
  <p id="buttons">
    <input type="button" value="Restart the Novel"
        onclick="initNovel(1152, 648)"/>
  <input type="button" value="Enable skipping"
        onclick="toggleSkip()"/>
</p>
    </div>
</div>

</body>
</html>
