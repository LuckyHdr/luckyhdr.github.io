/** @license
 * DHTML Snowstorm! JavaScript-based Snow for web pages
 * --------------------------------------------------------
 * Version 1.0.0
 * Copyright (c) 2012, Mike_TDX. All rights reserved.
 */

/*global window, document, navigator, clearInterval, setInterval */
/*jslint white: false, onevar: true, plusplus: false, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */

var snowStorm = (function(window, document) {

  // --- common properties ---

  this.autoStart = true;          // Whether the snow should start automatically or not.
  this.flakesMax = 640;           // Limit total amount of snow made (falling + sticking)
  this.flakesMaxActive = 80;      // Limit amount of snow falling at once (less = lower CPU use)
  this.animationInterval = 40;    // Theoretical "miliseconds per frame" measurement. 20 = fast + smooth, but high CPU use. 50 = more conservative, but slower
  this.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
  this.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
  this.followMouse = true;        // Snow movement can respond to the user's mouse
  this.snowColor = '#FFFFFF';        // Don't eat (or use?) yellow snow.
  this.snowCharacter = '•';  // • = bullet, · is square on some systems etc.
  this.snowStick = true;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
  this.targetElement = null;      // element which snow will be appended to (null = document.body) - can be an element ID eg. 'myDiv', or a DOM node reference
  this.useMeltEffect = true;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
  this.useTwinkleEffect = false;  // Allow snow to randomly "flicker" in and out of view while falling
  this.usePositionFixed = false;  // true = snow does not shift vertically when scrolling. May increase CPU load, disabled by default - if enabled, used only where supported

  // --- less-used bits ---

  this.freezeOnBlur = true;       // Only snow when the window is in focus (foreground.) Saves CPU.
  this.flakeLeftOffset = 0;       // Left margin/gutter space on edge of container (eg. browser window.) Bump up these values if seeing horizontal scrollbars.
  this.flakeRightOffset = 0;      // Right margin/gutter space on edge of container
  this.flakeWidth = 8;            // Max pixel width reserved for snow element
  this.flakeHeight = 8;           // Max pixel height reserved for snow element
  this.vMaxX = 5;                 // Maximum X velocity range for snow
  this.vMaxY = 4;                 // Maximum Y velocity range for snow
  this.zIndex = 0;                // CSS stacking order applied to each snowflake

  // --- End of user section ---

  var s = this, storm = this, i,
  // UA sniffing and backCompat rendering mode checks for fixed position, etc.
  isIE = navigator.userAgent.match(/msie/i),
  isIE6 = navigator.userAgent.match(/msie 6/i),
  isWin98 = navigator.appVersion.match(/windows 98/i),
  isMobile = navigator.userAgent.match(/mobile|opera m(ob|in)/i),
  isBackCompatIE = (isIE &amp;&amp; document.compatMode === 'BackCompat'),
  noFixed = (isMobile || isBackCompatIE || isIE6),
  screenX = null, screenX2 = null, screenY = null, scrollY = null, vRndX = null, vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6,
  fixedForEverything = false,
  opacitySupported = (function(){
    try {
      document.createElement('div').style.opacity = '0.5';
    } catch(e) {
      return false;
    }
    return true;
  }()),
  didInit = false,
  docFrag = document.createDocumentFragment();

  this.timers = [];
  this.flakes = [];
  this.disabled = false;
  this.active = false;
  this.meltFrameCount = 20;
  this.meltFrames = [];

  this.events = (function() {

    var old = (!window.addEventListener &amp;&amp; window.attachEvent), slice = Array.prototype.slice,
    evt = {
      add: (old?'attachEvent':'addEventListener'),
      remove: (old?'detachEvent':'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len &gt; 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function addEvent() {
      apply(getArgs(arguments), 'add');
    }

    function removeEvent() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      add: addEvent,
      remove: removeEvent
    };

  }());

  function rnd(n,min) {
    if (isNaN(min)) {
      min = 0;
    }
    return (Math.random()*n)+min;
  }

  function plusMinus(n) {
    return (parseInt(rnd(2),10)===1?n*-1:n);
  }

  this.randomizeWind = function() {
    var i;
    vRndX = plusMinus(rnd(s.vMaxX,0.2));
    vRndY = rnd(s.vMaxY,0.2);
    if (this.flakes) {
      for (i=0; i<this.flakes.length; i++)="" {="" if="" (this.flakes[i].active)="" this.flakes[i].setvelocities();="" }="" };="" this.scrollhandler="function()" var="" i;="" "attach"="" snowflakes="" to="" bottom="" of="" window="" no="" absolute="" value="" was="" given="" scrolly="(s.flakeBottom?0:parseInt(window.scrollY||document.documentElement.scrollTop||document.body.scrollTop,10));" (isnan(scrolly))="" netscape="" 6="" scroll="" fix="" (!fixedforeverything="" &&="" !s.flakebottom="" s.flakes)="" for="" (i="s.flakes.length;" i--;)="" (s.flakes[i].active="==" 0)="" s.flakes[i].stick();="" this.resizehandler="function()" (window.innerwidth="" ||="" window.innerheight)="" screenx="window.innerWidth-16-s.flakeRightOffset;" screeny="(s.flakeBottom?s.flakeBottom:window.innerHeight);" else="" screenx2="parseInt(screenX/2,10);" this.resizehandleralt="function()" this.freeze="function()" pause="" animation="" (!s.disabled)="" s.disabled="1;" return="" false;="" clearinterval(s.timers[i]);="" this.resume="function()" (s.disabled)="" s.timerinit();="" this.togglesnow="function()" (!s.flakes.length)="" first="" run="" s.start();="" s.active="!s.active;" (s.active)="" s.show();="" s.resume();="" s.stop();="" s.freeze();="" this.stop="function()" this.freeze();="" this.flakes[i].o.style.display="none" ;="" s.events.remove(window,'scroll',s.scrollhandler);="" s.events.remove(window,'resize',s.resizehandler);="" (s.freezeonblur)="" (isie)="" s.events.remove(document,'focusout',s.freeze);="" s.events.remove(document,'focusin',s.resume);="" s.events.remove(window,'blur',s.freeze);="" s.events.remove(window,'focus',s.resume);="" this.show="function()" this.snowflake="function(parent,type,x,y)" s="this," storm="parent;" this.type="type;" this.x="x||parseInt(rnd(screenX-20),10);" this.y="(!isNaN(y)?y:-rnd(screenY)-12);" this.vx="null;" this.vy="null;" this.vamptypes="[1,1.2,1.4,1.6,1.8];" "amplification"="" vx="" vy="" (based="" on="" flake="" size="" type)="" this.vamp="this.vAmpTypes[this.type];" this.melting="false;" this.meltframecount="storm.meltFrameCount;" this.meltframes="storm.meltFrames;" this.meltframe="0;" this.twinkleframe="0;" this.active="1;" this.fontsize="(10+(this.type/5)*10);" this.o="document.createElement('div');" this.o.innerhtml="storm.snowCharacter;" this.o.style.color="storm.snowColor;" this.o.style.position="(fixedForEverything?'fixed':'absolute');" this.o.style.width="storm.flakeWidth+'px';" this.o.style.height="storm.flakeHeight+'px';" this.o.style.fontfamily="arial,verdana" this.o.style.cursor="default" this.o.style.overflow="hidden" this.o.style.fontweight="normal" this.o.style.zindex="storm.zIndex;" docfrag.appendchild(this.o);="" this.refresh="function()" (isnan(s.x)="" isnan(s.y))="" safety="" check="" s.o.style.left="s.x+'px';" s.o.style.top="s.y+'px';" this.stick="function()" (nofixed="" (storm.targetelement="" !="=" document.documentelement="" storm.targetelement="" document.body))="" (storm.flakebottom)="" s.o.style.display="none" s.o.style.bottom="0px" s.o.style.position="fixed" this.vcheck="function()" (s.vx="">=0 &amp;&amp; s.vX&lt;0.2) {
        s.vX = 0.2;
      } else if (s.vX&lt;0 &amp;&amp; s.vX&gt;-0.2) {
        s.vX = -0.2;
      }
      if (s.vY&gt;=0 &amp;&amp; s.vY&lt;0.2) {
        s.vY = 0.2;
      }
    };

    this.move = function() {
      var vX = s.vX*windOffset, yDiff;
      s.x += vX;
      s.y += (s.vY*s.vAmp);
      if (s.x &gt;= screenX || screenX-s.x &lt; storm.flakeWidth) { // X-axis scroll check
        s.x = 0;
      } else if (vX &lt; 0 &amp;&amp; s.x-storm.flakeLeftOffset &lt; -storm.flakeWidth) {
        s.x = screenX-storm.flakeWidth-1; // flakeWidth;
      }
      s.refresh();
      yDiff = screenY+scrollY-s.y;
      if (yDiff<storm.flakeheight) {="" s.active="0;" if="" (storm.snowstick)="" s.stick();="" }="" else="" s.recycle();="" (storm.usemelteffect="" &&="" s.type="" <="" 3="" !s.melting="" math.random()="">0.998) {
          // ~1/1000 chance of melting mid-air, with each frame
          s.melting = true;
          s.melt();
          // only incrementally melt one frame
          // s.melting = false;
        }
        if (storm.useTwinkleEffect) {
          if (!s.twinkleFrame) {
            if (Math.random()&gt;0.9) {
              s.twinkleFrame = parseInt(Math.random()*20,10);
            }
          } else {
            s.twinkleFrame--;
            s.o.style.visibility = (s.twinkleFrame &amp;&amp; s.twinkleFrame%2===0?'hidden':'visible');
          }
        }
      }
    };

    this.animate = function() {
      // main animation loop
      // move, check status, die etc.
      s.move();
    };

    this.setVelocities = function() {
      s.vX = vRndX+rnd(storm.vMaxX*0.12,0.1);
      s.vY = vRndY+rnd(storm.vMaxY*0.12,0.1);
    };

    this.setOpacity = function(o,opacity) {
      if (!opacitySupported) {
        return false;
      }
      o.style.opacity = opacity;
    };

    this.melt = function() {
      if (!storm.useMeltEffect || !s.melting) {
        s.recycle();
      } else {
        if (s.meltFrame &lt; s.meltFrameCount) {
          s.setOpacity(s.o,s.meltFrames[s.meltFrame]);
          s.o.style.fontSize = s.fontSize-(s.fontSize*(s.meltFrame/s.meltFrameCount))+'px';
          s.o.style.lineHeight = storm.flakeHeight+2+(storm.flakeHeight*0.75*(s.meltFrame/s.meltFrameCount))+'px';
          s.meltFrame++;
        } else {
          s.recycle();
        }
      }
    };

    this.recycle = function() {
      s.o.style.display = 'none';
      s.o.style.position = (fixedForEverything?'fixed':'absolute');
      s.o.style.bottom = 'auto';
      s.setVelocities();
      s.vCheck();
      s.meltFrame = 0;
      s.melting = false;
      s.setOpacity(s.o,1);
      s.o.style.padding = '0px';
      s.o.style.margin = '0px';
      s.o.style.fontSize = s.fontSize+'px';
      s.o.style.lineHeight = (storm.flakeHeight+2)+'px';
      s.o.style.textAlign = 'center';
      s.o.style.verticalAlign = 'baseline';
      s.x = parseInt(rnd(screenX-storm.flakeWidth-20),10);
      s.y = parseInt(rnd(screenY)*-1,10)-storm.flakeHeight;
      s.refresh();
      s.o.style.display = 'block';
      s.active = 1;
    };

    this.recycle(); // set up x/y coords etc.
    this.refresh();

  };

  this.snow = function() {
    var active = 0, used = 0, waiting = 0, flake = null, i;
    for (i=s.flakes.length; i--;) {
      if (s.flakes[i].active === 1) {
        s.flakes[i].move();
        active++;
      } else if (s.flakes[i].active === 0) {
        used++;
      } else {
        waiting++;
      }
      if (s.flakes[i].melting) {
        s.flakes[i].melt();
      }
    }
    if (active<s.flakesmaxactive) {="" flake="s.flakes[parseInt(rnd(s.flakes.length),10)];" if="" (flake.active="==" 0)="" flake.melting="true;" }="" };="" this.mousemove="function(e)" (!s.followmouse)="" return="" true;="" var="" x="parseInt(e.clientX,10);" (x<screenx2)="" windoffset="-windMultiplier+(x/screenX2*windMultiplier);" else="" -="screenX2;" this.createsnow="function(limit,allowInactive)" i;="" for="" (i="0;" i<limit;="" i++)="" s.flakes[s.flakes.length]="new" s.snowflake(s,parseint(rnd(flaketypes),10));="" (allowinactive="" ||="" i="">s.flakesMaxActive) {
        s.flakes[s.flakes.length-1].active = -1;
      }
    }
    storm.targetElement.appendChild(docFrag);
  };

  this.timerInit = function() {
    s.timers = (!isWin98?[setInterval(s.snow,s.animationInterval)]:[setInterval(s.snow,s.animationInterval*3),setInterval(s.snow,s.animationInterval)]);
  };

  this.init = function() {
    var i;
    for (i=0; i</s.flakesmaxactive)></storm.flakeheight)></this.flakes.length;>