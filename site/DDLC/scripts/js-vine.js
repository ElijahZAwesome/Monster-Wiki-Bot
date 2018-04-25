/*
    Copyright (C) 2011 by J. David Eisenberg
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See sthe
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
*/
var skip = false;
var refreshIntervalId;
var animatingSay = false;
var isQuickEnding = false;
var shouldOverflow = "hidden";
var isGlitchText = "sayText";
var charFocused = null;
var images = [],
  x = -1;
images[0] = "url('images/noise1.jpg')";
images[1] = "url('images/noise2.jpg')";
images[2] = "url('images/noise3.jpg')";
images[3] = "url('images/noise4.jpg')";
var novel_script;
/*
    A Character is an actor that can speak and be displayed.
    
    name: the name of the character
    escName: the escape() version of name; used as an id="" attribute
    color: text color for this character
    image: an Image object containing the image to display
    imageElement: an <img> element to go into the DOM
    src: the current source attribute
    prevSrc: previous source (in order to detect changes)
    domRef: a reference to the <img> element once inserted into the DOM
    position: where to display the character
    prevPosition: last place displayed (in order to detect changes)
    alpha: transparency (0 = transparent, 1.0 = opaque)
    visibility: either "visible" or "hidden" (as in CSS)
*/

function Character(characterName) {
  this.name = characterName;
  if (characterName == '') {
    characterName = "anon" + novel.anonymous++;
  }
  this.escName = escape(characterName);
  this.color = "#000000";
  this.image = new Image();
  this.imageElement = document.createElement("img");
  this.imageElement.setAttribute("id", this.escName);
  this.src = null;
  this.width = "1.05";
  this.imageElement.setAttribute("style", "width: " + Math.floor(this.width * 100) + "%;");
  this.height = "1.05";
  this.imageElement.setAttribute("style", "height: " + Math.floor(this.height * 100) + "%;");
  this.prevSrc = null;
  this.avatar = "";
  this.zindex = 0;
  this.domRef = null;
  this.position = new Position(0, 0, true);
  this.prevPosition = new Position(0, 0, true);
  this.alpha = 1.0;
  this.visibility = "visible";

  /*
      If a second argument is given, it is an anonymous
      object giving the initial image and position of this
      character.
  */
  if (arguments.length > 1) {
    var obj = arguments[1];
    this.color = obj.color || this.color;
    if (obj.image) {
      this.image.setAttribute("src", novel.imagePath +
        obj.image.replace(/{{(.*?)}}/g, novel_interpolator));
    }
    this.position = obj.position || new Position(0, 0, true);
    //this.image.setAttribute("style", "z-index: " + param.zindex + ";");
  }
}

/*
    If the <img> for this character isn't already in the DOM,
    add it to the tableau, and push it into the novel's array
    of actors that are on the screen.
*/
Character.prototype.display = function(param) {
  var closure = this;
  var displayImage = true;

  /*
      If the parameter is an object, set the character's properties
      to the properties given in the parameter
  */
  if (param && param.constructor == Object) {
    for (var property in param) {
      if (property == "image") {
        if (param.image != null) {
          this.image.src = novel.imagePath +
            param.image.replace(/{{(.*?)}}/g, novel_interpolator);
        } else {
          displayImage = false;
        }
      } else if (property == "zindex") {
        this.zindex = param.zindex;
        this.image.setAttribute("style", "z-index: " + param.zindex + ";");
      } else if (property != "say" || property != "width" || property != "height") {
        this[property] = param[property];
      } else if (property == "width") {
        this.imageElement.setAttribute("style", "width: " + Math.floor(param.width * 100) + "%;");
      } else if (property == "height") {
        this.imageElement.setAttribute("style", "height: " + Math.floor(param.height * 100) + "%;");
      }
    }
  }

  /*
      The image's width and height don't get set immediately if the
      image isn't cached, so wait 30 milliseconds to finish the display.
  */
  novel.paused = true;
  // novel.frame -= 2;   // playNovel will increment this...
  setTimeout(function() {
    return closure.finishDisplay.apply(closure, [param, displayImage]);
  }, 30);
}

Character.prototype.finishDisplay = function(param, displayImage) {
  if (this.image.complete) {
    /*
        Has width, height, or position changed?
        If so, hide this character.
    */
    var pos = this.position;
    var el = this.domRef;
    var xPos = pos.x;
    var yPos = pos.y;
    var changed = false;

    if (this.domRef == null) {
      this.imageElement.style.visibility = 'hidden';
      novel.tableau.appendChild(this.imageElement);
      novel.actors.push(this);
      this.domRef = document.getElementById(this.escName);
      el = this.domRef;
      changed = true;
    } else {
      changed = (!pos.equals(this.prevPosition) ||
        this.image.width != this.domRef.width ||
        this.image.height != this.domRef.height)
    }

    el.src = this.image.src; // load in the new picture

    if (changed && displayImage) {
      /*
          Then set its position, visiblity, and transparency
      */
      if (pos.xRelative) {
        xPos *= novel.width;
      }
      if (pos.yRelative) {
        yPos *= novel.height;
      }
      novel.waitCount = 0;
      xPos -= Math.floor(pos.xAnchor * this.image.width);
      yPos -= Math.floor(pos.yAnchor * this.image.height);
      el.style.position = "absolute";
      if(el.style.visibility == "hidden") {
        if(this.visibility=="visible") {
          $("#" + el.id).finish();
          el.style.left = xPos + 25 + "px";
          el.style.top = yPos + "px";
          $("#" + el.id).css('opacity', 0);
          console.log(el.width + " + " + el.height);
          $("#" + el.id).width($("#" + el.id).width() - 50);
          $("#" + el.id).height($("#" + el.id).height() - 50);
          $("#" + el.id).fadeTo("500", 1);
          /*
          $("#" + el.id).animate({
            left: el.left - 25 + "px"
          }, { duration: 400, queue: false, easing: "linear", complete: function() {
            console.log("animated size");
            console.log(el.width + " + " + el.height);
          }});
          */
          console.log(xPos + " " + yPos);
          $("#" + el.id).animate({
            left: xPos + "px",
            width: el.width + 50,
            height: el.height + 50
          }, { duration: 400, queue: false, easing: "linear", complete: function() {
            console.log("animated size");
            console.log(el.width + " + " + el.height);
            el.style.visibility = "visible";
          }});
        }
      } 
      if(el.style.visibility == "visible") {
        if(this.visibility=="hidden") {
          $("#" + el.id).finish();
          $("#" + el.id).fadeTo("500", 0);
          el.style.left = xPos - 15 + "px";
          el.style.top = yPos + "px";
          console.log("hiding");
          console.log(xPos + " " + yPos);
          var oldWidth = el.width;
          var oldHeight = el.height;
          $("#" + el.id).animate({
            left: xPos + 15 + "px",
            width: el.width - 50,
            height: el.height - 50
          }, { duration: 400, queue: false, easing: "linear", complete: function() {
            console.log("animated size");
            console.log(el.width + " + " + el.height);
            el.style.visibility = "hidden";
            $("#" + el.id).width(oldWidth);
            $("#" + el.id).height(oldHeight);
          }});
        }
      }
      console.log(el.id);
      $("#" + el.id).animate({
        left: xPos + "px",
        top: yPos + "px"
      }, 500, "linear", function() {
        console.log("animated");
      });
      /*el.style.left = xPos + "px";
      el.style.top = yPos + "px";*/
      if(el.style.visibility != "visible") {
        if(this.visibility !="hidden") {
      el.style.visibility = this.visibility;
        }
      }
      el.style.zIndex = this.zindex;
      this.prevPosition = this.position.clone();
    }

    if (displayImage) {
      novel_setAlpha(this.domRef, this.alpha);
    }


    if (param && param.say) {
      this.say(param.say);
      if (param.noPause) {
        playNovel();
      }
    } else {
      playNovel();
    }
  } else {
    /* Image isn't loaded yet; try again in 30 milliseconds */
    novel.waitCount++;
    var closure = this;
    setTimeout(function() {
      return closure.finishDisplay.apply(closure, [param, displayImage]);
    }, 30);
  }
}

/*
    A convenience method; parameter is either true or false
    to show or hide a character
*/
Character.prototype.show = function(visible) {
  if (this.domRef) {
    this.domRef.style.visibility = (visible) ? "visible" : "hidden";
  }
}

/*
    Set the transparency. If the picture is completely opaque,
    we must remove the style information, as IE blurs the picture
    even when alpha is 100.
*/
Character.prototype.setAlpha = function(alpha) {
  novel_setAlpha(this, alpha);
}

/*
    Show the character's name (if any) and the
    given string in the <div id="dialog"> area.
    
    Anything in {{ }} is interpolated.
*/
Character.prototype.say = function(str) {
  var htmlStr = "";
  var interpolatedString = str;
  clearDialog();
  if (this.avatar != "") {
    htmlStr += '<img src="' +
      novel.imagePath +
      this.avatar.replace(/{{(.*?)}}/g, novel_interpolator) +
      '" class="avatar"/>';
  }
  if (this.name != "") {
    htmlStr += '<div id="nameDiv"><span style="color: ' + this.color + '">' +
      this.name + '</span></div>';
  }
  if (str.indexOf("{{") >= 0) {
    str = str.replace(/{{(.*?)}}/g, novel_interpolator);
  }
  htmlStr += "<div id='sayDiv'><p id='" + isGlitchText + "' style='overflow: " + shouldOverflow;
  if(shouldOverflow == "visible") {
    htmlStr += "; white-space:nowrap";
  }
  htmlStr += ";'>" + str;
  htmlStr += "</p></div><div id='ctc'></div>"
  novel.dialog.innerHTML = htmlStr;
  novel.paused = true;
  if(shouldOverflow == "hidden"){
    replaceWithSpan();
    animateSay1();
  }
  // novel.paused = (arguments.length == 1) ? true : (!arguments[1]);     
}

/*
    The novel tells the characters to do some action. If
    the parameter is a string, then the character is speaking;
    if it's an object, then the character is being displayed.
*/
Character.prototype.doAction = function(param) {
  if (param == null || param == "" || param.constructor == Object) {
    this.display(param);
  } else if (param.constructor == String) {
    this.say(param);
  }
}


/* ============================================== */
/*
    A TextBlock is a block of text that can be displayed.
    
    name: the name for this text block
    escName: the escape() of the name; used as an id="" attribute
    color: text color for this block
    backgroundColor: background color for this block
    div: a <div class="textClass"> element that holds the text
    domRef: a reference to the <div> once inserted into the DOM
    position: where to display this text block
    align: text alignment, as in CSS
    border: a border specification as in CSS
    font: the font to use to display the text
    width: % of width of the window; range from 0 to 1.0
    visibility: "visible" or "hidden", as in CSS
    text: actually, an HTML string to display inside the text area
*/
function TextBlock(textName) {
  if (textName == '') {
    textName = "anon" + novel.anonymous++;
  }
  this.escName = escape(textName);
  this.color = "#000000";
  this.div = document.createElement("div");
  this.div.setAttribute("id", this.escName);
  this.div.setAttribute("class", "textClass");
  this.div.setAttribute("className", "textClass");
  this.domRef = null;
  this.position = new Position(0, 0, true);
  this.align = "left";
  this.font = '20px "Verily Serif Mono", Helvetica, Arial, sans-serif';
  this.width = 1.0; // decimal percentage
  this.visibility = "visible";
  this.text = "";
  this.text2 = "";

  /*
      If given a second parameter, use its fields
      to set the TextBlock's fields
  */
  if (arguments.length > 1) {
    var param = arguments[1];
    for (var property in param) {
      this[property] = param[property];
    }
  }
}

/*
    Convenience method to set the HTML within a text block
*/
TextBlock.prototype.setText = function(html) {
  this.domRef.innerHTML = html;
}

/*
    Set the transparency. If the picture is completely opaque,
    we must remove the style information, as IE blurs the picture
    even when alpha is 100.
*/
TextBlock.prototype.setAlpha = function(alpha) {
  novel_setAlpha(this, alpha);
}

/*
    Display the text block on the screen
*/
TextBlock.prototype.display = function(param) {
  /*
      If the <div> isn't in the DOM yet, insert it,
      and add it to the list of actors in the tableau.
  */
  if (this.domRef == null) {
    novel.tableau.appendChild(this.div);
    novel.actors.push(this);
  }
  this.domRef = document.getElementById(this.escName);

  novel_textEntity_display(this, param);
}

function novel_textEntity_display(obj, param) {
  /*
      Hide the text, then look at the parameter and take
      appropriate action depending upon its type
  */
  var el = obj.domRef;
  var xPos;
  var yPos;

  el.style.visibility = "hidden";
  if (param != null) {
    if (param.constructor == Position) {
      obj.position = param;
    } else if (param.constructor == String) {
      obj.text = param;
    } else if (param.constructor == Object) {
      for (var propertyName in param) {
        obj[propertyName] = param[propertyName];
      }
    }
  }
  // set the text
  el.innerHTML = obj.text.replace(/{{(.*?)}}/g,
    novel_interpolator);

  xPos = obj.position.x;
  yPos = obj.position.y;

  // and its position and attributes
  if (obj.position.xRelative) {
    xPos *= novel.width;
  }
  if (obj.position.yRelative) {
    yPos *= novel.height;
  }
  if (obj.color) {
    el.style.color = obj.color;
  }
  if (obj.backgroundColor) {
    el.style.backgroundColor = obj.backgroundColor;
  }
  if (obj.font) {
    el.style.font = obj.font;
  }
  if (obj.border) {
    el.style.border = obj.border;
  }
  if (obj.padding) {
    el.style.padding = obj.padding;
  }
  if (!obj.visibility) {
    obj.visibility = "visible";
  }
  el.style.position = "absolute";
  el.style.visibility = obj.visibility; // then reveal (if visible)
}

/*
    A convenience method; parameter is either true or false
    to show or hide a text block
*/
TextBlock.prototype.show = function(visible) {
  if (this.domRef) {
    this.domRef.style.visibility = (visible) ? "visible" : "hidden";
  }
}

/*
    At this moment, the only action a text block can
    take is to display itself.
*/
TextBlock.prototype.doAction = function(param) {
  this.display(param);
}

/*
    A Input is a block of text that can be displayed.
    
    name: the name for this text block
    escName: the escape() of the name; used as an id="" attribute
    color: text color for this block
    backgroundColor: background color for this block
    inputElement: a <input type="text" class="textClass"> element that holds the text
    domRef: a reference to the <div> once inserted into the DOM
    position: where to display this text block
    align: text alignment, as in CSS
    border: a border specification as in CSS
    font: the font to use to display the text
    width: % of width of the window; range from 0 to 1.0
    visibility: "visible" or "hidden", as in CSS
    text: initial value of text field
*/
function Input(textName) {
  if (textName == '') {
    textName = "anon" + novel.anonymous++;
  }
  this.escName = escape(textName);
  this.color = "#000000";
  this.containerDiv = document.createElement('div');
  this.containerDiv.setAttribute("id", "inputDiv");
  this.inputElement = document.createElement("input");
  this.inputElement.setAttribute("type", "text");
  this.inputElement.setAttribute("id", this.escName);
  this.inputElement.setAttribute("class", "textClass");
  this.inputElement.setAttribute("style", "");
  this.inputElement.setAttribute("className", "textClass");
  this.inputElement.setAttribute("maxlength", "16");
  this.confirmElement = document.createElement('button');
  this.confirmElement.setAttribute("id", "confirm");
  this.confirmElement.setAttribute("onclick", "novel_inputChange()");
  this.confirmElement.innerHTML = "OK";
  this.containerDiv.appendChild(this.inputElement);
  this.containerDiv.appendChild(this.confirmElement);
  this.domRef = null;
  this.position = new Position(0, 0, true);
  this.align = "left";
  this.font = '20px "Aller"';
  this.width = 1.0; // decimal percentage
  this.visibility = "visible";
  this.text = "";
  this.text2 = "";
  this.questionElement = document.createElement('span');
  this.questionElement.setAttribute("id", "question");
  this.questionElement.innerHTML = this.text2;
  this.containerDiv.appendChild(this.questionElement);

  /*
      If given a second parameter, use its fields
      to set the Input's fields
  */
  if (arguments.length > 1) {
    var param = arguments[1];
    for (var property in param) {
      this[property] = param[property];
    }
  }
}

/*
    Convenience method to set the initial value of the input field
*/
Input.prototype.setValue = function(txt) {
  this.domRef.value = txt;
}

/*
    Set the transparency.
*/
Input.prototype.setAlpha = function(alpha) {
  novel_setAlpha(this, alpha);
}

/*
    Display the text block on the screen
*/
Input.prototype.display = function(param) {
  /*
      If the <input> isn't in the DOM yet, insert it,
      and add it to the list of actors in the tableau.
  */
  if (this.domRef == null) {
    novel.tableau.appendChild(this.containerDiv);
    novel.actors.push(this);
  }
  this.domRef = document.getElementById(this.escName);
  this.questionElement.innerHTML = this.text2;
  this.domRef.value = this.text;
  this.domRef.focus();

  novel_textEntity_display(this, param);
  novel.paused = true;
  novel.ignoreClicks = true;
}

/*
    A convenience method; parameter is either true or false
    to show or hide a text block
*/
Input.prototype.show = function(visible) {
  this.domRef.style.visibility = (visible) ? "visible" : "hidden";
}

/*
    At this moment, the only action a text block can
    take is to display itself.
*/
Input.prototype.doAction = function(param) {
  this.display(param);
}

function novel_inputChange(evt) {
  var inputObj;
  var str;
  var actor;
  if (!evt) {
    evt = window.event;
  }
  inputObj = document.getElementById("yourName");
  console.log("evt.target not found");
  str = inputObj.value;
  if (str == "") {
    return;
  }
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  novel.userVar[inputObj.id] = str;

  evt.cancelBubble = true;
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  novel.ignoreClicks = false;
  actor = novel.actors.pop();
  inputObj = actor.domRef;
  if (inputObj != null) {
    inputObj.parentNode.parentNode.removeChild(inputObj.parentNode);
  }
  actor.domRef = null;
  playNovel();
}

/* ============================================== */
/*
    A MenuItem is an actor, but unlike a Character
    or a TextBlock, it doesn't have methods; instead,
    the menu function handles everything associated
    with menus.
*/
function MenuItem(n, text, label) {
  this.domRef = document.createElement("div");
  this.domRef.setAttribute("id", "menuItem" + n);
  this.domRef.setAttribute("class", "menuItem");
  this.domRef.setAttribute("className", "menuItem");
  this.text = text;
  this.label = label;
}

/* ============================================== */
/*
    A Position specifies an item's screen position
    (x, y); whether the coordinates are absolute (pixels)
    or relative (decimal percent in range 0-1.0).
    
    xAnchor and yAnchor are used to offset the "top left"
    point of an image.
    
    Presume an image that is 200 x 150 would ordinarily
    be displayed with its upper left corner at (300, 400).
    If xAnchor is .2 and yAnchor is .5, then the image
    will display at the upper left coordinate
    of (300 - (200 * .2), 400 - (150 * .5)), or (260, 325).
*/
function Position(x, y) {
  this.x = x
  this.y = y
  this.xRelative = (x <= 1.0);
  this.yRelative = (y <= 1.0);
  this.xAnchor = (arguments.length >= 3) ? arguments[2] : 0;
  this.yAnchor = (arguments.length >= 4) ? arguments[3] : 0;
}

/*
    Compare two Position objects for equality; returns
    true or false
*/
Position.prototype.equals = function(other) {
  return (this.x == other.x && this.y == other.y &&
    this.relative == other.relative &&
    this.xAnchor == other.xAnchor && this.yAnchor == other.yAnchor);
}

/*
    Creates a duplicate of a Position; needed to make sure
    that the current and previous positions of a Character
    are two separate objects.
*/
Position.prototype.clone = function() {
  var newPos = new Position(this.x, this.y, this.relative);
  newPos.xAnchor = this.xAnchor;
  newPos.yAnchor = this.yAnchor;
  return newPos;
}

/* =========================================================== */

/*
    These are the functions for driving the novel.
    Even though there is only one novel, I create an object for it
    to avoid polluting the variables namespace. Further than it
    already is polluted, that is.
    
    frame: the current frame that is onscreen
    tableau: the <div id="novel"> (Name comes from card games)
    dialog: the <div id="dialog"> where characters "speak"
    audio: the <div id="audio"> (if any, for music)
    audioLoop: a boolean telling whether audio is looped or not
    paused: awaiting a click. We need this because JavaScript can't
        wait() or sleep().
    history: keeps track of path through novel (not used yet)
    historyPos: position in history (not used yet)
    ignoreClicks: is a menu or input on screen? (If so, ignore clicks in tableau/dialog)
    labels: associative array of all labels defined in the script
    subs: associative array of all subroutines defined in the script
    callStack: keep track of call statements (to "subroutines" in script)
    anonymous: how many un-named text blocks or actors have we created?
    actors: the list of characters and textblocks currently in the tableau
    userVar: "variables" defined in the script (associative array)
    scriptStack: current script stack; used in menus
    ifStack: keeps track of whether you are in then or else part of nested if
    backgroundImage: background image array; in order to fade/dissolve
        background, it has to be an image rather than a background CSS style
    pendingBackgroundImage: this is the background image that is waiting to load
    activeBG: which background is active (0 or 1)?
    bgAlpha: the transparency of the backgroundImage (0=transparent, 1=opaque)
    waitCount: # of times waiting to complete picture loading (used for
        debugging)
    pauseTimer: a timer for the pause command
    mappedImage: which image (if any) has an imageMap attached to it
    lastClick: used to ensure at least 1/4 second between clicks
*/

function Novel() {
  this.frame = 0;
  this.tableau = null;
  this.dialog = null;
  this.audio = null;
  this.audioLoop = true;
  this.paused = false;
  this.history = new Array();
  this.historyPos = 0;
  this.ignoreClicks = false;
  this.labels = new Array();
  this.subs = new Array();
  this.callStack = new Array();
  this.anonymous = 0;
  this.actors = new Array(); // who is on screen right now?
  this.userVar = new Object();
  this.ifLevel = 0;
  this.ifStack = new Array();
  this.scriptStack = new Array();
  this.backgroundImage = new Array(2);
  this.pendingBackgroundImage;
  this.activeBG = 0;
  this.bgAlpha = 1.0;
  this.waitCount = 0;
  this.pauseTimer = null;
  this.mappedImage = null;
  this.lastClick = new Date().getTime();
}

/*
    In order to avoid binding problems with "this",
    the remaining functions are globals. Functions that
    the scripts call directly aren't prefixed; functions
    that are internal begin with novel_, again to avoid
    polluting the namespace. Further.
*/

/*
    This method interpolates {{...}} expressions
    in strings.
*/
function novel_interpolator(str, p1, offset, s) {
  return eval(p1);
}

/*
    Remove all menu items from the tableau
*/
function novel_clearMenuItems() {
  var actor;
  var domObject;
  var i;
  if (novel) {
    i = 0;
    while (i < novel.actors.length) {
      if (novel.actors[i].constructor == MenuItem) {
        domObject = novel.actors[i].domRef;
        if (domObject != null) {
          domObject.parentNode.removeChild(domObject);
        }
        novel.actors[i].domRef = null;
        novel.actors.splice(i, 1);
      } else {
        i++;
      }
    }
  }
}

/*
    When user clicks a menu item, it invokes the novel_menuJump
    function. This function attaches the appropriate onclick.
*/
function novel_addOnClick(el, value) {
  el.onclick = function(e) {
    novel_menuJump.apply(window, [value, e]);
    return false;
  };
}

/*
    Handle a click on a menu item. Stop event propagation
    so that the tableau doesn't intercept the event. 
    Set novel_script to the menu's script, and the frame
    to the first command in that script. Then
    start playing the novel.
*/
function novel_menuJump(menuScript, evt) {
  if (!evt) {
    evt = window.event;
  }
  evt.cancelBubble = true;
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  novel_clearMenuItems();
  novel.dialog.style.textAlign = "left";
  novel.ignoreClicks = false;
  novel_pushScript();
  novel_script = menuScript;
  novel.frame = 0;
  playNovel();
}

/*
    Fade out the background image by decreasing
    its alpha by 10% every 0.1 seconds. When totally
    transparent, swap to the new background image source,
    and start fading in.
*/
function novel_fadeBgOut(targetAlpha) {
  var bg = document.getElementById("background" + novel.activeBG);
  novel.bgAlpha -= 0.1;
  bg.style.filter = "alpha(opacity=" + Math.floor(novel.bgAlpha * 100) + ")";
  bg.style.opacity = novel.bgAlpha;
  if (novel.bgAlpha > 0) {
    setTimeout("novel_fadeBgOut(" + targetAlpha + ")", 100);
  } else {
    bg.src = novel.imagePath + novel.backgroundImage[novel.activeBG];
    novel.pendingBackgroundImage = bg;
    novel.paused = true;
    setTimeout('novel_finishLoadingBackground("fade", ' + targetAlpha + ')', 30);
  }
}

/*
    Fade in the background image by increasing
    its alpha by 10% every 0.1 seconds. When totally
    opaque, restart playing the novel.
*/
function novel_fadeBgIn(targetAlpha) {
  var bg = document.getElementById("background" + novel.activeBG);
  novel.bgAlpha += 0.1;
  if (novel.bgAlpha < targetAlpha) {
    bg.style.filter = "alpha(opacity=" +
      Math.floor(novel.bgAlpha * 100) + ")";
    bg.style.opacity = novel.bgAlpha;
    setTimeout("novel_fadeBgIn(" + targetAlpha + ")", 100);
  } else {
    novel_setAlpha(bg, targetAlpha);
    novel.bgAlpha = targetAlpha;
    playNovel();
  }
}

/*
    Dissolve between background images by altering each one's
    alpha by 10% every 0.1 seconds. When one is totally
    transparent, the other will be totally opaque.
*/
function novel_dissolveIn(targetAlpha, n) {
  var bgA = document.getElementById("background" + novel.activeBG);
  var bgB = document.getElementById("background" + (1 - novel.activeBG));
  n++;
  novel_setAlpha(bgA, novel.bgAlpha * (10 - n) / 10);
  novel_setAlpha(bgB, targetAlpha * n / 10);
  if (n < 10) {
    setTimeout("novel_dissolveIn(" + targetAlpha + "," + n + ")", 100);
  } else {
    novel_setAlpha(bgA, 0);
    novel_setAlpha(bgB, targetAlpha);
    novel.activeBG = 1 - novel.activeBG;
    novel.bgAlpha = targetAlpha;
    playNovel();
  }
}

/*
    Create the associative array of the labels and
    their frame numbers in the main script. Only the
    main script labels are scanned; labels in
    menus or if statements are ignored.
*/
function novel_collectLabels() {
  for (var i = 0; i < novel_script.length; i += 2) {
    if (novel_script[i] == label) {
      novel.labels[novel_script[i + 1]] = i;
    } else if (novel_script[i] == sub) {
      novel.subs[novel_script[i + 1]] = i;
    }
  }
}

/*
    Save a reference to the script array
    and the frame
*/
function novel_pushScript() {
  novel.scriptStack.push(novel_script);
  novel.scriptStack.push(novel.frame);
}

/*
    Restore the script array and frame.
*/
function novel_popScript() {
  if (novel.scriptStack.length > 0) {
    novel.frame = novel.scriptStack.pop() + 2;
    novel_script = novel.scriptStack.pop();
  }
}

/*
    Set the transparency. If the picture is completely opaque,
    we must remove the style information, as IE blurs the picture
    even when alpha is 100.
*/
function novel_setAlpha(domRef, alpha) {
  if (alpha != 1.0) {
    domRef.style.filter = "alpha(opacity=" +
      Math.floor(alpha * 100) + ")";
    domRef.style.opacity = alpha;
  } else {
    domRef.style.filter = null;
    domRef.style.opacity = null;
  }
}

function novel_handleClick(evt) {
  var now = new Date().getTime();
  var ok;
  if (!evt) {
    evt = window.event;
  }
  evt.cancelBubble = true;
  if (evt.stopPropagation) {
    evt.stopPropagation();
  }
  /*
      Don't allow two clicks within 1/4 second of each other
  */
  ok = (now - novel.lastClick > 10);
  novel.lastClick = now;
  if (ok) {
    playNovel();
  }
}

function novel_disableSelection(target) {
  if (target.onselectstart) {
    target.onselectstart = function() {
      return false;
    }; // IE
  } else if (target.style.MozUserSelect) {
    target.style.MozUserSelect = "none"; // firefox
  } else {
    target.onmousedown = function() {
      return false
    }; // everyone else
  }
  target.style.cursor = "default"
}
/*
    Take all actors off the tableau, and set their
    DOM references to null
*/
function clearTableau() {
  var actor;
  var domObject;
  if (novel) {
    while (novel.actors.length > 0) {
      actor = novel.actors.pop();
      domObject = actor.domRef;
      if (domObject != null) {
        domObject.parentNode.removeChild(domObject);
      }
      actor.domRef = null;
    }
  }
}

/*
    imageMap attaches a map ID to a character;
    if the map ID exists, then the novel
    pauses for input. If you set the screenActive
    property, then the rest of the screen will still respond
    to clicks; otherwise, the imagemap is modal.
*/
function imagemap(param) {
  if (param.mapId) {
    param.character.domRef.setAttribute("usemap", '#' + param.mapId);
    novel.paused = true;
    novel.ignoreClicks = !(param.screenActive);
    novel.mappedImage = param.character.domRef;
  }
}

function show(param) {
  if (param.constructor == Character ||
    param.constructor == TextBlock) {
    param.display(null);
    param.show(true);
  }
}

function hide(param) {
  if (param.constructor == Character ||
    param.constructor == TextBlock) {
    param.show(false);
  }
}

function remove(param) {
  var i;
  var foundPos = -1;

  if (param.constructor == Character ||
    param.constructor == TextBlock) {
    for (i = 0; i < novel.actors.length && foundPos < 0; i++) {
      if (novel.actors[i] == param) {
        foundPos = i;
      }
    }
    if (foundPos >= 0) {
      if (param.domRef) {
        param.domRef.parentNode.removeChild(param.domRef);
      }
      param.domRef = null;
      novel.actors.splice(foundPos, 1);
    }
  }

}

function stopAudio() {
  if (novel.audio && novel.audio.src) {
    novel.audio.src = null;
  }
}

/*
    Clear the <div id="dialog">
*/
function clearDialog() {
  novel.dialog.innerHTML = "";
}

/*
    Set the visibility of the dialog to the given value
*/
function showDialog(status) {
  novel.dialog.style.visibility = status;
}

/*
    Set the dialog to the first item in the MenuArray; the
    remaining entries are pairs of item labels and scripts,
    which are associated with individual MenuItem objects.
*/
function menu(menuArray) {
  if (skip === true) {
    skip = false;
  }
  novel.ignoreClicks = true;
  novel.dialog.innerHTML =
    menuArray[0].replace(/{{(.*?)}}/g, novel_interpolator);
  novel.dialog.style.textAlign = "center";
  var div = document.createElement('div');
  div.id = 'menuButtons';
  for (var i = 1; i < menuArray.length; i += 2) {
    var mItem = new MenuItem((i - 1) / 2, menuArray[i], menuArray[i + 1]);
    var el = mItem.domRef;
    novel_addOnClick(el, menuArray[i + 1]);
    el.innerHTML = menuArray[i].replace(/{{(.*?)}}/g, novel_interpolator);
    div.appendChild(el);
    novel.tableau.appendChild(div);
    novel.actors.push(mItem);
  }
  novel.paused = true;
}

/*
    All jumps go back to the main script, so pop off all the
    information in the script stack.
*/
function jump(label) {
  while (novel.scriptStack.length > 0) {
    novel.frame = novel.scriptStack.pop();
    novel_script = novel.scriptStack.pop();
  }
  label = label.replace(/{{(.*?)}}/g, novel_interpolator);
  novel.frame = novel.labels[label];
  /*
      Since this function is called from playNovel() and
      it adds 2 to the frame count, subtract 2 so that
      we jump to the correct point in the script.
  */
  novel.frame -= 2;
}

/*
    Use this when you want to jump to a label in a novel based
    on an imagemap click. This will also de-activate the image map.
*/
function novel_mapJump(label) {
  jump(label); // gets us to the correct place for a call from playNovel
  novel.frame += 2; // but we're calling it when playNovel isn't active

  if (novel.mappedImage) {
    novel.mappedImage.removeAttribute("usemap");
    novel.mappedImage = null;
  }

  /*
      We need to both return false and call playNovel(). We can't
      do both, so we'll set up a timer for 10 msec to call playNovel(),
      and then we'll return false
  */
  novel.ignoreClicks = false;
  setTimeout('playNovel()', 10);
  return false;
}

/*
    Change the background without clearing the tableau or dialog.
*/
function background(param) {
  novel_changeBackground(param, false);
}

/*
    Set up a new scene. First, clear the tableau and dialog.
*/
function scene(param) {
  novel_changeBackground(param, true);
}

function countLines() {
  if(isGlitchText=="glitchText") {
    var ps = document.getElementById('glitchText');
  } else if (isGlitchText=="sayText") {
    var ps = document.getElementById('sayText');
  }
  var lines = lineWrapDetector.getLines(ps);
  return lines.length;
}

function replaceWithSpan() {
  if(isGlitchText == "glitchText") {
    var ps = document.getElementById('glitchText');
  }
  else if (isGlitchText == "sayText") {
    var ps = document.getElementById('sayText');
  }
  var ctc = document.getElementById('ctc');
  var lines = lineWrapDetector.getLines(ps);
  var finishedLines = "";
  var finalHTML = "<span id='saySpan1'>";
  var line1 = "";
  ctc.style.visibility = "hidden";
  lines[0].forEach(function(arrayItem) {
    line1 += " " + arrayItem.innerText;
  });
  line1 = line1.replace(" ", "");
  finishedLines += line1;
  console.log(line1);
  finalHTML += line1 + "</span>";
  if (countLines() >= 2) {
    var line2 = "";
    lines[1].forEach(function(arrayItem) {
      line2 += " " + arrayItem.innerText;
    });
    line2 = line2.replace(" ", "");
    finishedLines += " " + line2;
    console.log(line2);
    finalHTML += "<span id='saySpan2'>" + line2 + "</span>";
  }
  if (countLines() == 3) {
    var line3 = "";
    lines[2].forEach(function(arrayItem) {
      line3 += " " + arrayItem.innerText;
    });
    line3 = line3.replace(" ", "");
    finishedLines += " " + line3;
    console.log(line3);
    finalHTML += "<span id='saySpan3'>" + line3 + "</span>";
  }
  console.log(finishedLines);
  ps.innerHTML = finalHTML;
}

function animateSay1() {
  novel.paused = true;
  animatingSay = true;
  $("#saySpan1").animate({
    width: '100%'
  }, 2000, "linear", function() {
    if (countLines() >= 2) {
      animateSay2();
    }
    if (countLines() == 1) {
      finishSay();
    }
  });
}

function animateSay2() {
  $("#saySpan2").animate({
    width: '100%'
  }, 2000, "linear", function() {
    if (countLines() >= 3) {
      animateSay3();
    }
    if (countLines() == 2) {
      finishSay();
    }
  });
}

function animateSay3() {
  $("#saySpan3").animate({
    width: '100%'
  }, 2000, "linear", function() {
    finishSay();
  });
}

function finishSay() {
  animatingSay = false;
  $("#saySpan1").finish();
  if (countLines() >= 2) {
    $("#saySpan2").finish();
  }
  if (countLines() >= 3) {
    $("#saySpan3").finish();
  }
  var ctc = document.getElementById('ctc');
  ctc.style.visibility = "visible";
  ctcLoop();
}

function ctcLoop() {
  $('#ctc').animate({
    left: '780px'
  }, 1500, function() {
    $('#ctc').animate({
      left: '790px'
    }, 1500, function() {
      ctcLoop();
    })
  })
}

function hideDialogue() {
  document.getElementById('dialogueDiv').style.visibility = "hidden";
}

function quickEnding() {
  Cookies.set("quick", "now everyone can be happy.");
  window.open('','_parent','');
  window.close();
}

function quickEnding2() {
  console.log("rip");
  $("#menuDiv").remove();
  document.getElementById('endbg').style.width = "1152px";
  document.getElementById('endbg').style.height = "648px";
  document.getElementById('endbg').style.opacity = 0.3;
  var preloadN = ["images/noise1.jpg", "images/noise2.jpg", "images/noise3.jpg", "images/noise4.jpg", "images/happy.png"];
  var preloadNoise = new Array(preload.length);
  for (var i = 0; i < preloadN.length; i++) {
    preloadNoise[i] = new Image();
    preloadNoise[i].src = preloadN[i];
  }
  $("#endbg").fadeTo("4000", 1);
  setTimeout(function() {
    noiseLoop();
    startSHangEarly();
    $("#endbg").fadeTo("100", 0.3);
  }, 5000);
}

function displayNextImage() {
  x = (x === images.length - 1) ? 0 : x + 1;
  document.getElementById("endbg").style.backgroundImage = images[x];
}

function displayPreviousImage() {
  x = (x <= 0) ? images.length - 1 : x - 1;
  document.getElementById("endbg").style.backgroundImage = images[x];
}

function noiseLoop() {
  setInterval(displayNextImage, 200);
}

function sKillEarlyAnimLoop() {
  /*$('#s_kill_early').animate({
    left: '160px'
  }, { duration: 15000, queue: false, complete: function() {
    $('#s_kill_early').animate({
      left: '150px'
    }, { duration: 15000, queue: false, complete: function() {
      sKillEarlyAnimLoop();
    }})
  }});*/
  $('#s_kill_early').animate({
    top: '-5px'
  }, { duration: 10000, queue: false, complete: function() {
    $('#s_kill_early').animate({
      top: '0px'
    }, { duration: 10000, queue: false, complete: function() {
      sKillEarlyAnimLoop();
    }})
  }});
}

function rotateKillLeft() {
  console.log("rotate left");
  $("#s_kill_early").rotate({
      duration:25000,
      angle: -2,
      animateTo:2,
      callback: function() {rotateKillRight();},
  });
}

function rotateKillRight() {
  console.log("rotate right");
  $("#s_kill_early").rotate({
      duration:25000,
      angle: 0,
      animateTo:-2,
      callback: function() {rotateKillLeft();},
  });
}

function startSHangEarly() {
  document.getElementById("end").innerHTML = "<div id='endbg'></div><img id='endText' src='images/happy.png'><img id='s_kill_early' src='images/s_kill_early.png'>";
  document.getElementById('endbg').style.width = "1152px";
  document.getElementById('endbg').style.height = "648px";
  document.getElementById('endbg').style.opacity = 0.3;
  rotateKillRight();
  sKillEarlyAnimLoop();
  $("#endText").css("opacity", 0);
  setTimeout(function() {
    $("#endText").fadeTo("2000", 1);
  }, 600000);
}



/*
    If the parameter was a string, it's the name of a background
    image. If the parameter is an object, the image property is
    the background file name and the effect property tells how you
    want to display the background. clearAll is a boolean telling
    whether to clear the tableau and dialog or not.
*/
function novel_changeBackground(param, clearAll) {
  var fileName;
  var effect;
  var targetAlpha = 1.0;
  var bg;

  if (clearAll) {
    clearTableau();
    clearDialog();
  }
  fileName = novel.backgroundImage[novel.activeBG];
  if (typeof param == "string") {
    fileName = param;
    effect = "";
  } else if (param != null) {
    if (param.image) {
      fileName = param.image;
    }
    effect = (param.effect) ? param.effect : "";

    if (param.alpha) {
      targetAlpha = param.alpha;
    }
  }

  fileName = fileName.replace(/{{(.*?)}}/g, novel_interpolator);
  if (!effect) {
    novel.backgroundImage[novel.activeBG] = fileName;
    bg = document.getElementById("background" + novel.activeBG);
    bg.src = novel.imagePath + fileName;
    novel.pendingBackgroundImage = bg;
    novel.paused = true;
  } else if (effect == "fade") {
    novel.backgroundImage[novel.activeBG] = fileName;
    novel.paused = true;
    novel_fadeBgOut(targetAlpha);
  } else if (effect == "dissolve") {
    novel.backgroundImage[1 - novel.activeBG] = fileName;
    novel.pendingBackgroundImage = document.getElementById("background" + (1 - novel.activeBG));
    novel.pendingBackgroundImage.src =
      novel.imagePath + fileName;
    novel.paused = true;
  }
  if (effect != "fade") {
    setTimeout('novel_finishLoadingBackground("' + effect + '", ' + targetAlpha + ')', 30);
  }
}

/*
    Complete loading the background
*/
function novel_finishLoadingBackground(effect, targetAlpha) {
  if (novel.pendingBackgroundImage && novel.pendingBackgroundImage.complete) {
    if (!effect) {
      novel_setAlpha(novel.pendingBackgroundImage, targetAlpha);
      novel.bgAlpha = targetAlpha;
      playNovel();
    } else if (effect == "fade") {
      novel_fadeBgIn(targetAlpha);
    } else if (effect == "dissolve") {
      novel_dissolveIn(targetAlpha, 0);
    }
    novel.pendingBackgroundImage = null;
  } else {
    setTimeout('novel_finishLoadingBackground("' + effect + '", ' + targetAlpha + ')', 30);
  }
}

/*
    Go through script to find an else that matches the current level
    of nested if statements (or a matching level endIf) and return
    that frame number.
*/
function novel_findMatchingElse() {
  var currLevel = novel.ifLevel;
  var f = novel.frame + 2;
  var item = novel_script[f];
  while (!((item == elsePart || item == endIf) && currLevel == novel.ifLevel) &&
    f < novel_script.length) {
    if (item == ifStatement) {
      currLevel++;
    } else if (item == endIf) {
      currLevel--;
    }
    f += 2;
    item = novel_script[f];
  }
  return f;
}

/*
    Go through script to find an endIf that matches the current level
    of nested if statements and return
    that frame number.
*/
function novel_findMatchingEndIf() {
  var currLevel = novel.ifLevel;
  var f = novel.frame + 2;
  var item = novel_script[f];
  while (!(item == endIf && currLevel == novel.ifLevel) && f < novel_script.length) {
    if (item == ifStatement) {
      currLevel++;
    } else if (item == endIf) {
      currLevel--;
    }
    f += 2;
    item = novel_script[f];
  }
  return f;
}

/*
    This is the listener function that is invoked
    when audio has ended; it implements looping
*/
function novel_audioLoop() {
  novel.audio.currentTime = 0;
  novel.audio.play();
}

/*
    Call a subroutine; a section of the script with the given
    label.
*/
function call(label) {
  if (typeof novel.subs[label] != 'undefined') {
    novel.callStack.push(novel.frame);
    novel.frame = novel.subs[label];
  }
}

/*
    Return from a subroutine call
*/
function endSub() {
  if (novel.callStack.length != 0) {
    novel.frame = novel.callStack.pop();
  }
}

/*
    Set a user variable or variables; the parameter
    is either a string containing JavaScript to evaluate
    or it is an object whose properties are inserted into
    novel.userVar.  If you use the second form, then
    when you refer to a variable in an interpolated string,
    you must qualify it with novel.userVar.
*/
function setVars(param) {
  if (typeof param == "string") {
    eval(param);
  } else if (typeof param == "object") {
    for (var property in param) {
      novel.userVar[property] = param[property];
    }
  }
}

/*
    The label and sub functions don't do anything; they are just
    there so we can use label without quotemarks in the script.
*/
function label(str) {
  // do nothing
}

function sub(str) {
  // do nothing
}

/*
    Play the audio with the given filename. The default
    action is to NOT loop the sound indefinitely.
    
    If given an object, the src property gives the filename
    and the loop property (boolean) tells whether to loop or not.
    
    If the parameter is null, sound is stopped.
*/

function audio(param) {
  var audioSource;
  var action = null;
  var mimeType = {
    "wav": "audio/wav",
    "ogg": 'audio/ogg;codecs="vorbis"',
    "mp3": "audio/mpeg"
  };
  var suffix = "";

  if (novel.audio) {
    // stopAudio();
    if (param != null) {
      if (param.constructor == String) {
        audioSource = param;
        novel.audio.src = novel.audioPath + audioSource;
        novel.audioLoop = false;
      } else if (param.constructor == Object) {
        if (param.src) {
          audioSource = param.src;
          // look for a playable format
          if (param.format) {
            for (var i = 0; i < param.format.length && suffix == ""; i++) {
              if (novel.audio.canPlayType(mimeType[param.format[i]]) != "") {
                suffix = param.format[i];
              }
            }
          }
          if (suffix != "") {
            audioSource = audioSource + "." + suffix;
            novel.audio.src = novel.audioPath + audioSource;
            novel.audioLoop = false;
          } else {
            novel.audio.src = "";
          }
        }
        if (param.loop != null) {
          novel.audioLoop = param.loop;
        }
        if (param.action) {
          action = param.action;
        }
      }
      if (novel.audioLoop) {
        if (novel.audio.addEventListener) {
          novel.audio.addEventListener('ended', novel_audioLoop, false);
        } else if (novel.audio.attachEvent) {
          novel.audio.attachEvent('onended', novel_audioLoop);
        }
      } else {
        if (novel.audio.removeEventListener) {
          novel.audio.removeEventListener('ended', novel_audioLoop,
            false);
        } else if (novel.audio.detachEvent) {
          novel.audio.detachEvent('onended', novel_audioLoop);
        }
      }
      action = action.replace(/{{(.*?)}}/g, novel_interpolator);
      if (action == "stop") {
        novel.audio.src = null;
      } else if (action == "rewind") {
        novel.audio.currentTime = 0;
      } else if (action == "pause") {
        novel.audio.pause();
      } else if (action == "play") {
        novel.audio.play();
      }
      // novel.audio.play();
    }
  }
}

function pause(param) {
  if (param) {
    novel.pauseTimer = window.setTimeout(novel_unPause, parseInt(param, 10));
  }
  novel.paused = true;
}

function novel_unPause() {
  playNovel();
}

function skipToLine(line) {
  for(var i=0; i < line * 2; i++){
    playNovel();
  }
}

/*
    Handle an if statement. The parameter is a
    condition to test (a string to be evaluated)
*/
function ifStatement(param) {
  var ok = eval(param);
  if (ok) {
    novel.ifStack.push(0); // 0 == "then" part
  } else {
    novel.frame = novel_findMatchingElse();
    if (novel_script[novel.frame] == elsePart) {
      novel.ifStack.push(1);
    }
  }
  novel.ifLevel = novel.ifStack.length;
}

function elsePart() {
  novel.frame = novel_findMatchingEndIf();
}

function endIf() {
  if (novel.ifLevel > 0) {
    novel.ifLevel--;
    novel.ifStack.pop();
  }
}

/*
    Call an author-defined JavaScript function.
    jsInfo.fcn is the function name;
    jsInfo.params is an array of parameters
*/
function jsCall(jsInfo) {
  jsInfo.fcn.apply(window, jsInfo.params);
}

function pause(duration) {
  novel.paused = true;
  setTimeout(function() {
    playNovel()
  }, duration);
}

function checkForQuickEnding() {
  if (Cookies.get('quick')) {
    quickEnding2();
  }
  if (Cookies.get('firstrun')) {
    if (!Cookies.get('Sayori')) {
      isQuickEnding = true;
    }
    if (!Cookies.get('Monika')) {
      quickEnding2();
    }
  }
}

function initMenu() {
  initCookies();
  document.getElementById('menubgm').play();
  checkForQuickEnding();
  warnBadBrowser();
}

function initCookies() {
  if (Cookies.get('quick')) {
    quickEnding2();
  }
  if (Cookies.get('firstrun')) {
    if (!Cookies.get('Sayori')) {
      isQuickEnding = true;
    }
    if (!Cookies.get('Monika')) {
      isQuickEnding = true;
    }
  }
  if (!Cookies.get('firstrun')) {
    Cookies.set('firstrun', 'firstrun');
    Cookies.set('Sayori', 'Happy thoughts');
    Cookies.set('Natsuki', 'Dad');
    Cookies.set('Yuri', 'Universe');
    Cookies.set('Monika', 'Everyone');
  }
}

function warnBadBrowser() {
  // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
  if(!isChrome) {
    alert("HOL' UP!\nFAM THIS SITE AINT FINNA WORK IF U BE ON ANYTHIN OTHER THAN CHROME! \n\nHere is the browsers that have been tested:\n\nChrome: Working, main browser\nSafari: Not working, strange jquery bugs\nAll others: untested.\n\nIf you don't care and want to continue anyway, select continue.");
  }
  else {
    console.log("is chrome");
  }
}

/*
    Initialize the novel object; the parameters w and h are
    the width and height of the <div id="novel">.
    The prepareNovel() function is provided by the script author;
    it sets up characters and text blocks. Always start the novel
    at the label "start".
*/
function initNovel(w, h) {
  if (Cookies.get('quick')) {
    quickEnding2();
  }
  if (Cookies.get('firstrun')) {
    if (!Cookies.get('Sayori')) {
      isQuickEnding = true;
    }
    if (!Cookies.get('Monika')) {
      isQuickEnding = true;
    }
  }
  if (!Cookies.get('firstrun')) {
    Cookies.set('firstrun', 'firstrun');
    Cookies.set('Sayori', 'Happy thoughts');
    Cookies.set('Natsuki', 'Dad');
    Cookies.set('Yuri', 'Universe');
    Cookies.set('Monika', 'Everyone');
  }
  if ((typeof novel != 'undefined')) {
    if (novel.tableau) {
      clearTableau();
    }
    if (novel.dialog) {
      clearDialog();
    }
    stopAudio();
  }
  novel_disableSelection(document.body);
  novel = new Novel();
  document.getElementById("menuDiv").innerHTML = "";
  document.getElementById("menuDiv").id = "menuDivDisabled";
  novel.tableau = document.getElementById("novelDiv");
  novel.tableau.style.visibility = "visible";
  novel.dialog = document.getElementById("dialogDiv");
  if (novel.tableau.addEventListener) {
    novel.tableau.addEventListener('click', novel_handleClick, false);
    novel.dialog.addEventListener('click', novel_handleClick, false);
  } else if (novel.tableau.attachEvent) {
    novel.tableau.attachEvent('onclick', novel_handleClick);
    novel.dialog.attachEvent('onclick', novel_handleClick);
  }
  if (!!(document.createElement('audio').canPlayType)) {
    novel.audio = new Audio();
  } else {
    novel.audio = null;
  }
  novel.width = w;
  novel.height = h;
  prepareNovel();
  novel_setAlpha(document.getElementById("background0"), 1);
  novel_setAlpha(document.getElementById("background1"), 0);
  novel_script = script;
  novel_collectLabels();
  novel.frame = novel.labels["start"];
  playNovel();
}

function fullscreen() {
  document.getElementById('novelDiv').setAttribute("style", 'position: absolute; margin-top: -10px; margin-left: -10px; border: none; width: 100%; height: 100%; background-size: 100% 100%;');
  document.getElementById("background0").setAttribute("style", 'width: 100%; height: 100%');
  document.getElementById("background1").setAttribute("style", 'width: 100%; height: 100%');
}

function toggleSkip() {
  if (skip === true) {
    skip = false;
    clearTimeout(refreshIntervalId);
    console.log("disable skip");
    return;
  }
  if (skip === false) {
    skip = true;
    playNovel();
    console.log("skipped");
    refreshIntervalId = setTimeout(playNovel, 300);
    console.log("enable skip, " + refreshIntervalId);
  }
}

function directWriteName(name) {
  var htmlStr = "";
  if (this.name != "") {
    htmlStr += '<div id="nameDiv"><span style="color: ' + this.color + '">' +
      name + '</span></div>';
  }
  if (str.indexOf("{{") >= 0) {
    str = str.replace(/{{(.*?)}}/g, novel_interpolator);
  }
  htmlStr += "<div id='sayDiv'><p id='" + isGlitchText + "'>";
  htmlStr += "<span id='directText1' style='display: block; overflow: visible; width: 200%;'></span><span id='directText2' style='display: block; overflow: visible; width: 200%;'></span><span id='directText3' style='display: block; overflow: visible; width: 200%;'></span></p></div><div id='ctc'></div>";
  novel.dialog.innerHTML = htmlStr;
  novel.paused = true;
}

function directWriteLine1(str) {
  $('#directText1').html = str;
}

function directWriteLine2(str) {
  $('#directText2').html = str;
}

function directWriteLine3(str) {
  $('#directText3').html = str;
}

function glitchGen(amount) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž";

  for (var i = 0; i < amount; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function allowOverflow() {
  shouldOverflow = "visible";
  return "";
}

function disallowOverflow() {
  shouldOverflow = "hidden";
  return "";
}

function enableGlitch() {
  isGlitchText = "glitchText";
  return "";
}

function disableGlitch() {
  isGlitchText = "sayText";
  return "";
}

function focusChar(char) {
  console.log("focused");
  if(char != "none") {
    el = document.getElementById(char);
    var oPos = $("#" + el.id).position();
    var newX = 10;
          $("#" + el.id).animate({
            left: oPos.left - newX,
            width: el.width + 10,
            height: el.height + 10
          }, { duration: 400, queue: false, easing: "linear", complete: function() {
            console.log("animated size");
            console.log(el.width + " + " + el.height);
       }});
    charFocused = char;
    return;
  }
  if(char=="none") {
    if(charFocused != null || charFocused != "none") {
      el = document.getElementById(charFocused);
      var oPos = $("#" + el.id).position();
      var newX = 10;
      $("#" + el.id).animate({
            left: oPos.left + newX,
            width: el.width - 10,
            height: el.height - 10
       }, { duration: 400, queue: false, easing: "linear", complete: function() {
            console.log("animated size");
            console.log(el.width + " + " + el.height);
       }});
      charFocused = char;
      return;
    }
  }
}

/*
    Play the novel. If you aren't in the menu, paused, or at the
    end of the novel, grab the next entry in novel_script. If it's
    a Character or a TextBlock, invoke its doAction() function, using
    the next item in the novel_script as its parameter.
    
    If the entry is a function, then invoke that function with the next
    item in the novel_script as its parameter.
    
    If none of the above, it's an error. Give an alert.
*/
function playNovel() {
  if (animatingSay === true) {
    finishSay();
    return;
  }
  var obj;
  if (novel.pauseTimer != null) {
    window.clearTimeout(novel.pauseTimer);
    novel.pauseTimer = null;
  }
  novel.paused = false;

  /*
  novel.history.push(novel.frame);
  novel.historyPos++;
  */
  while (!novel.ignoreClicks && novel.frame < novel_script.length && !novel.paused) {
    obj = novel_script[novel.frame];
    //document.getElementById("debug").innerHTML = "frame: " + novel.frame + " " + obj + "/" + novel_script[novel.frame +1];
    if (obj.constructor == Character || obj.constructor == TextBlock ||
      obj.constructor == Input) {
      obj.doAction(novel_script[novel.frame + 1]);
      novel.frame += 2;
    } else if (typeof(obj) == "function") {
      novel_script[novel.frame].apply(window, [novel_script[novel.frame + 1]]);
      novel.frame += 2;
    } else {
      alert("Frame " + novel.frame + "\nUnknown: " +
        obj + "\n" + typeof(obj));
      novel.frame += 2;
    }
    /*
        If at the end of a script,
        pop it off the script stack.
    */
    if (novel.frame >= novel_script.length) {
      novel_popScript();
    }
    if (skip === true) {
      refreshIntervalId = setTimeout(playNovel, 300);
      console.log("enable skip, " + refreshIntervalId);
    }
  }
}