/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );






/**
 * pathLoader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
  
  'use strict';

  function PathLoader( el ) {
    this.el = el;
    // clear stroke
    this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
  }

  PathLoader.prototype._draw = function( val ) {
    this.el.style.strokeDashoffset = this.el.getTotalLength() * ( 1 - val );
  }

  PathLoader.prototype.setProgress = function( val, callback ) {
    this._draw(val);
    if( callback && typeof callback === 'function' ) {
      // give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
      setTimeout( callback, 200 );
    }
  }

  PathLoader.prototype.setProgressFn = function( fn ) {
    if( typeof fn === 'function' ) { fn( this ); }
  }

  // add to global namespace
  window.PathLoader = PathLoader;

})( window );







/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

  var support = { animations : Modernizr.cssanimations },
    container = document.getElementById( 'ip-container' ),
    header = container.querySelector( 'header.ip-header' ),
    loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
    animEndEventNames = { 
      'WebkitAnimation' : 'webkitAnimationEnd', 
      'OAnimation' : 'oAnimationEnd', 
      'msAnimation' : 'MSAnimationEnd', 
      'animation' : 'animationend' 
    },
    // animation end event name
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

  function init() {
    var onEndInitialAnimation = function() {
      if( support.animations ) {
        this.removeEventListener( animEndEventName, onEndInitialAnimation );
      }

      startLoading();
    };

    // disable scrolling
    window.addEventListener( 'scroll', noscroll );

    // initial animation
    classie.add( container, 'loading' );

    if( support.animations ) {
      container.addEventListener( animEndEventName, onEndInitialAnimation );
    }
    else {
      onEndInitialAnimation();
    }
  }

  function startLoading() {
    // simulate loading something..
    var simulationFn = function(instance) {
      var progress = 0,
        interval = setInterval( function() {
          progress = Math.min( progress + Math.random() * 0.1, 1 );

          instance.setProgress( progress );

          // reached the end
          if( progress === 1 ) {
            classie.remove( container, 'loading' );
            classie.add( container, 'loaded' );
            clearInterval( interval );

            var onEndHeaderAnimation = function(ev) {
              if( support.animations ) {
                if( ev.target !== header ) return;
                this.removeEventListener( animEndEventName, onEndHeaderAnimation );
              }

              classie.add( document.body, 'layout-switch' );
              window.removeEventListener( 'scroll', noscroll );
            };

            if( support.animations ) {
              header.addEventListener( animEndEventName, onEndHeaderAnimation );
            }
            else {
              onEndHeaderAnimation();
            }
          }
        }, 80 );
    };

    loader.setProgressFn( simulationFn );
  }
  
  function noscroll() {
    window.scrollTo( 0, 0 );
  }

  init();

})();

;(function(){
    var ink, d, x, y;
    $(".ui-wave").click(function(e){
        if($(this).find(".ink").length === 0){
            $(this).prepend("<span class='ink'></span>");
        }

        ink = $(this).find(".ink");
        ink.removeClass("wave-animate");

        if(!ink.height() && !ink.width()){
            d = Math.max($(this).outerWidth(), $(this).outerHeight());
            ink.css({height: d, width: d});
        }
          
        x = e.pageX - $(this).offset().left - ink.width()/2;
        y = e.pageY - $(this).offset().top - ink.height()/2;

        ink.css({top: y+'px', left: x+'px'}).addClass("wave-animate");
    });

    var showRight = $( '#showRight' ),
        hideRight = $( '#hideRight' ),
        menuRight = $( '#cbp-spmenu' );

    showRight.on('click', function(event) {
        showRight.toggleClass( 'active' );
        menuRight.toggleClass( 'cbp-spmenu-open' );

        event.preventDefault();
    });

    hideRight.on('click', function(event) {
        hideRight.toggleClass( 'active' );
        menuRight.toggleClass('cbp-spmenu-open' );

        event.preventDefault();
    });

}).call(this);


;(function(){
    "use strict";
    var App;

    App = {
        init: function() {
            App.setCopyRight();
            App.setFixedNavbar();
            App.setHeroHeight();
            App.smoothScroll();
            App.stellar();
            App.wow();
        },
        setCopyRight: function() {
            var date, year;
            date = new Date();
            year = date.getFullYear();
            $("#copyright").text(year);
        },
        setFixedNavbar: function() {
            var $win, $header;
            var h = window.innerHeight - 80;
            $win = $(window);
            $header = $('#header')
            $win.on('scroll', function() {
                if ($win.scrollTop() > h) {
                    $header.addClass('navbar-fixed-top');
                } else {
                    $header.removeClass('navbar-fixed-top');
                }
            })
        },
        setHeroHeight: function() {
            var h = window.innerHeight;
            $('#hero').css('height', h );
        },
        smoothScroll: function() {
            $(".navbar-nav a").smoothScroll();
            $(".navbar-nav-mobile a").smoothScroll();
        },
        stellar: function() {
            $(window).stellar({
                horizontalOffset: 0,
                responsive: true
            });
        },
        wow: function() {
            new WOW().init();
        }
    }

    App.init();
    $(window).resize(App.setHeroHeight);
}).call(this);

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-cssanimations-shiv-cssclasses-prefixed-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.cssanimations=function(){return D("animationName")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,e.prefixed=function(a,b,c){return b?D(a,b,c):D(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(t){function e(t){return t.replace(/(:|\.|\/)/g,"\\$1")}var i="1.5.5",n={},o={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0},s=function(e){var i=[],n=!1,o=e.dir&&"left"===e.dir?"scrollLeft":"scrollTop";return this.each(function(){if(this!==document&&this!==window){var e=t(this);e[o]()>0?i.push(this):(e[o](1),n=e[o]()>0,n&&i.push(this),e[o](0))}}),i.length||this.each(function(){"BODY"===this.nodeName&&(i=[this])}),"first"===e.el&&i.length>1&&(i=[i[0]]),i};t.fn.extend({scrollable:function(t){var e=s.call(this,{dir:t});return this.pushStack(e)},firstScrollable:function(t){var e=s.call(this,{el:"first",dir:t});return this.pushStack(e)},smoothScroll:function(i,n){if(i=i||{},"options"===i)return n?this.each(function(){var e=t(this),i=t.extend(e.data("ssOpts")||{},n);t(this).data("ssOpts",i)}):this.first().data("ssOpts");var o=t.extend({},t.fn.smoothScroll.defaults,i),s=t.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(i){var n=this,r=t(this),l=t.extend({},o,r.data("ssOpts")||{}),a=o.exclude,f=l.excludeWithin,c=0,h=0,u=!0,p={},d=location.hostname===n.hostname||!n.hostname,g=l.scrollTarget||t.smoothScroll.filterPath(n.pathname)===s,m=e(n.hash);if(l.scrollTarget||d&&g&&m){for(;u&&a.length>c;)r.is(e(a[c++]))&&(u=!1);for(;u&&f.length>h;)r.closest(f[h++]).length&&(u=!1)}else u=!1;u&&(l.preventDefault&&i.preventDefault(),t.extend(p,l,{scrollTarget:l.scrollTarget||m,link:n}),t.smoothScroll(p))}),this}}),t.smoothScroll=function(e,i){if("options"===e&&"object"==typeof i)return t.extend(n,i);var o,s,r,l,a,f=0,c="offset",h="scrollTop",u={},p={};"number"==typeof e?(o=t.extend({link:null},t.fn.smoothScroll.defaults,n),r=e):(o=t.extend({link:null},t.fn.smoothScroll.defaults,e||{},n),o.scrollElement&&(c="position","static"===o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),h="left"===o.direction?"scrollLeft":h,o.scrollElement?(s=o.scrollElement,/^(?:HTML|BODY)$/.test(s[0].nodeName)||(f=s[h]())):s=t("html, body").firstScrollable(o.direction),o.beforeScroll.call(s,o),r="number"==typeof e?e:i||t(o.scrollTarget)[c]()&&t(o.scrollTarget)[c]()[o.direction]||0,u[h]=r+f+o.offset,l=o.speed,"auto"===l&&(a=u[h]-s.scrollTop(),0>a&&(a*=-1),l=a/o.autoCoefficient),p={duration:l,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(p.step=o.step),s.length?s.stop().animate(u,p):o.afterScroll.call(o.link,o)},t.smoothScroll.version=i,t.smoothScroll.filterPath=function(t){return t=t||"",t.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},t.fn.smoothScroll.defaults=o}),function(t,e,i,n){function o(e,i){this.element=e,this.options=t.extend({},r,i),this._defaults=r,this._name=s,this.init()}var s="stellar",r={scrollProperty:"scroll",positionProperty:"position",horizontalScrolling:!0,verticalScrolling:!0,horizontalOffset:0,verticalOffset:0,responsive:!1,parallaxBackgrounds:!0,parallaxElements:!0,hideDistantElements:!0,hideElement:function(t){t.hide()},showElement:function(t){t.show()}},l={scroll:{getLeft:function(t){return t.scrollLeft()},setLeft:function(t,e){t.scrollLeft(e)},getTop:function(t){return t.scrollTop()},setTop:function(t,e){t.scrollTop(e)}},position:{getLeft:function(t){return-1*parseInt(t.css("left"),10)},getTop:function(t){return-1*parseInt(t.css("top"),10)}},margin:{getLeft:function(t){return-1*parseInt(t.css("margin-left"),10)},getTop:function(t){return-1*parseInt(t.css("margin-top"),10)}},transform:{getLeft:function(t){var e=getComputedStyle(t[0])[c];return"none"!==e?-1*parseInt(e.match(/(-?[0-9]+)/g)[4],10):0},getTop:function(t){var e=getComputedStyle(t[0])[c];return"none"!==e?-1*parseInt(e.match(/(-?[0-9]+)/g)[5],10):0}}},a={position:{setLeft:function(t,e){t.css("left",e)},setTop:function(t,e){t.css("top",e)}},transform:{setPosition:function(t,e,i,n,o){t[0].style[c]="translate3d("+(e-i)+"px, "+(n-o)+"px, 0)"}}},f=function(){var e,i=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,n=t("script")[0].style,o="";for(e in n)if(i.test(e)){o=e.match(i)[0];break}return"WebkitOpacity"in n&&(o="Webkit"),"KhtmlOpacity"in n&&(o="Khtml"),function(t){return o+(o.length>0?t.charAt(0).toUpperCase()+t.slice(1):t)}}(),c=f("transform"),h=t("<div />",{style:"background:#fff"}).css("background-position-x")!==n,u=h?function(t,e,i){t.css({"background-position-x":e,"background-position-y":i})}:function(t,e,i){t.css("background-position",e+" "+i)},p=h?function(t){return[t.css("background-position-x"),t.css("background-position-y")]}:function(t){return t.css("background-position").split(" ")},d=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){setTimeout(t,1e3/60)};o.prototype={init:function(){this.options.name=s+"_"+Math.floor(1e9*Math.random()),this._defineElements(),this._defineGetters(),this._defineSetters(),this._handleWindowLoadAndResize(),this._detectViewport(),this.refresh({firstLoad:!0}),"scroll"===this.options.scrollProperty?this._handleScrollEvent():this._startAnimationLoop()},_defineElements:function(){this.element===i.body&&(this.element=e),this.$scrollElement=t(this.element),this.$element=this.element===e?t("body"):this.$scrollElement,this.$viewportElement=this.options.viewportElement!==n?t(this.options.viewportElement):this.$scrollElement[0]===e||"scroll"===this.options.scrollProperty?this.$scrollElement:this.$scrollElement.parent()},_defineGetters:function(){var t=this,e=l[t.options.scrollProperty];this._getScrollLeft=function(){return e.getLeft(t.$scrollElement)},this._getScrollTop=function(){return e.getTop(t.$scrollElement)}},_defineSetters:function(){var e=this,i=l[e.options.scrollProperty],n=a[e.options.positionProperty],o=i.setLeft,s=i.setTop;this._setScrollLeft="function"==typeof o?function(t){o(e.$scrollElement,t)}:t.noop,this._setScrollTop="function"==typeof s?function(t){s(e.$scrollElement,t)}:t.noop,this._setPosition=n.setPosition||function(t,i,o,s,r){e.options.horizontalScrolling&&n.setLeft(t,i,o),e.options.verticalScrolling&&n.setTop(t,s,r)}},_handleWindowLoadAndResize:function(){var i=this,n=t(e);i.options.responsive&&n.bind("load."+this.name,function(){i.refresh()}),n.bind("resize."+this.name,function(){i._detectViewport(),i.options.responsive&&i.refresh()})},refresh:function(i){var n=this,o=n._getScrollLeft(),s=n._getScrollTop();(!i||!i.firstLoad)&&this._reset(),this._setScrollLeft(0),this._setScrollTop(0),this._setOffsets(),this._findParticles(),this._findBackgrounds(),i&&i.firstLoad&&/WebKit/.test(navigator.userAgent)&&t(e).load(function(){var t=n._getScrollLeft(),e=n._getScrollTop();n._setScrollLeft(t+1),n._setScrollTop(e+1),n._setScrollLeft(t),n._setScrollTop(e)}),this._setScrollLeft(o),this._setScrollTop(s)},_detectViewport:function(){var t=this.$viewportElement.offset(),e=null!==t&&t!==n;this.viewportWidth=this.$viewportElement.width(),this.viewportHeight=this.$viewportElement.height(),this.viewportOffsetTop=e?t.top:0,this.viewportOffsetLeft=e?t.left:0},_findParticles:function(){var e=this;this._getScrollLeft(),this._getScrollTop();if(this.particles!==n)for(var i=this.particles.length-1;i>=0;i--)this.particles[i].$element.data("stellar-elementIsActive",n);this.particles=[],this.options.parallaxElements&&this.$element.find("[data-stellar-ratio]").each(function(i){var o,s,r,l,a,f,c,h,u,p=t(this),d=0,g=0,m=0,v=0;if(p.data("stellar-elementIsActive")){if(p.data("stellar-elementIsActive")!==this)return}else p.data("stellar-elementIsActive",this);e.options.showElement(p),p.data("stellar-startingLeft")?(p.css("left",p.data("stellar-startingLeft")),p.css("top",p.data("stellar-startingTop"))):(p.data("stellar-startingLeft",p.css("left")),p.data("stellar-startingTop",p.css("top"))),r=p.position().left,l=p.position().top,a="auto"===p.css("margin-left")?0:parseInt(p.css("margin-left"),10),f="auto"===p.css("margin-top")?0:parseInt(p.css("margin-top"),10),h=p.offset().left-a,u=p.offset().top-f,p.parents().each(function(){var e=t(this);return e.data("stellar-offset-parent")===!0?(d=m,g=v,c=e,!1):(m+=e.position().left,void(v+=e.position().top))}),o=p.data("stellar-horizontal-offset")!==n?p.data("stellar-horizontal-offset"):c!==n&&c.data("stellar-horizontal-offset")!==n?c.data("stellar-horizontal-offset"):e.horizontalOffset,s=p.data("stellar-vertical-offset")!==n?p.data("stellar-vertical-offset"):c!==n&&c.data("stellar-vertical-offset")!==n?c.data("stellar-vertical-offset"):e.verticalOffset,e.particles.push({$element:p,$offsetParent:c,isFixed:"fixed"===p.css("position"),horizontalOffset:o,verticalOffset:s,startingPositionLeft:r,startingPositionTop:l,startingOffsetLeft:h,startingOffsetTop:u,parentOffsetLeft:d,parentOffsetTop:g,stellarRatio:p.data("stellar-ratio")!==n?p.data("stellar-ratio"):1,width:p.outerWidth(!0),height:p.outerHeight(!0),isHidden:!1})})},_findBackgrounds:function(){var e,i=this,o=this._getScrollLeft(),s=this._getScrollTop();this.backgrounds=[],this.options.parallaxBackgrounds&&(e=this.$element.find("[data-stellar-background-ratio]"),this.$element.data("stellar-background-ratio")&&(e=e.add(this.$element)),e.each(function(){var e,r,l,a,f,c,h,d=t(this),g=p(d),m=0,v=0,y=0,b=0;if(d.data("stellar-backgroundIsActive")){if(d.data("stellar-backgroundIsActive")!==this)return}else d.data("stellar-backgroundIsActive",this);d.data("stellar-backgroundStartingLeft")?u(d,d.data("stellar-backgroundStartingLeft"),d.data("stellar-backgroundStartingTop")):(d.data("stellar-backgroundStartingLeft",g[0]),d.data("stellar-backgroundStartingTop",g[1])),l="auto"===d.css("margin-left")?0:parseInt(d.css("margin-left"),10),a="auto"===d.css("margin-top")?0:parseInt(d.css("margin-top"),10),f=d.offset().left-l-o,c=d.offset().top-a-s,d.parents().each(function(){var e=t(this);return e.data("stellar-offset-parent")===!0?(m=y,v=b,h=e,!1):(y+=e.position().left,void(b+=e.position().top))}),e=d.data("stellar-horizontal-offset")!==n?d.data("stellar-horizontal-offset"):h!==n&&h.data("stellar-horizontal-offset")!==n?h.data("stellar-horizontal-offset"):i.horizontalOffset,r=d.data("stellar-vertical-offset")!==n?d.data("stellar-vertical-offset"):h!==n&&h.data("stellar-vertical-offset")!==n?h.data("stellar-vertical-offset"):i.verticalOffset,i.backgrounds.push({$element:d,$offsetParent:h,isFixed:"fixed"===d.css("background-attachment"),horizontalOffset:e,verticalOffset:r,startingValueLeft:g[0],startingValueTop:g[1],startingBackgroundPositionLeft:isNaN(parseInt(g[0],10))?0:parseInt(g[0],10),startingBackgroundPositionTop:isNaN(parseInt(g[1],10))?0:parseInt(g[1],10),startingPositionLeft:d.position().left,startingPositionTop:d.position().top,startingOffsetLeft:f,startingOffsetTop:c,parentOffsetLeft:m,parentOffsetTop:v,stellarRatio:d.data("stellar-background-ratio")===n?1:d.data("stellar-background-ratio")})}))},_reset:function(){var t,e,i,n,o;for(o=this.particles.length-1;o>=0;o--)t=this.particles[o],e=t.$element.data("stellar-startingLeft"),i=t.$element.data("stellar-startingTop"),this._setPosition(t.$element,e,e,i,i),this.options.showElement(t.$element),t.$element.data("stellar-startingLeft",null).data("stellar-elementIsActive",null).data("stellar-backgroundIsActive",null);for(o=this.backgrounds.length-1;o>=0;o--)n=this.backgrounds[o],n.$element.data("stellar-backgroundStartingLeft",null).data("stellar-backgroundStartingTop",null),u(n.$element,n.startingValueLeft,n.startingValueTop)},destroy:function(){this._reset(),this.$scrollElement.unbind("resize."+this.name).unbind("scroll."+this.name),this._animationLoop=t.noop,t(e).unbind("load."+this.name).unbind("resize."+this.name)},_setOffsets:function(){var i=this,n=t(e);n.unbind("resize.horizontal-"+this.name).unbind("resize.vertical-"+this.name),"function"==typeof this.options.horizontalOffset?(this.horizontalOffset=this.options.horizontalOffset(),n.bind("resize.horizontal-"+this.name,function(){i.horizontalOffset=i.options.horizontalOffset()})):this.horizontalOffset=this.options.horizontalOffset,"function"==typeof this.options.verticalOffset?(this.verticalOffset=this.options.verticalOffset(),n.bind("resize.vertical-"+this.name,function(){i.verticalOffset=i.options.verticalOffset()})):this.verticalOffset=this.options.verticalOffset},_repositionElements:function(){var t,e,i,n,o,s,r,l,a,f,c=this._getScrollLeft(),h=this._getScrollTop(),p=!0,d=!0;if(this.currentScrollLeft!==c||this.currentScrollTop!==h||this.currentWidth!==this.viewportWidth||this.currentHeight!==this.viewportHeight){for(this.currentScrollLeft=c,this.currentScrollTop=h,this.currentWidth=this.viewportWidth,this.currentHeight=this.viewportHeight,f=this.particles.length-1;f>=0;f--)t=this.particles[f],e=t.isFixed?1:0,this.options.horizontalScrolling?(s=(c+t.horizontalOffset+this.viewportOffsetLeft+t.startingPositionLeft-t.startingOffsetLeft+t.parentOffsetLeft)*-(t.stellarRatio+e-1)+t.startingPositionLeft,l=s-t.startingPositionLeft+t.startingOffsetLeft):(s=t.startingPositionLeft,l=t.startingOffsetLeft),this.options.verticalScrolling?(r=(h+t.verticalOffset+this.viewportOffsetTop+t.startingPositionTop-t.startingOffsetTop+t.parentOffsetTop)*-(t.stellarRatio+e-1)+t.startingPositionTop,a=r-t.startingPositionTop+t.startingOffsetTop):(r=t.startingPositionTop,a=t.startingOffsetTop),this.options.hideDistantElements&&(d=!this.options.horizontalScrolling||l+t.width>(t.isFixed?0:c)&&l<(t.isFixed?0:c)+this.viewportWidth+this.viewportOffsetLeft,p=!this.options.verticalScrolling||a+t.height>(t.isFixed?0:h)&&a<(t.isFixed?0:h)+this.viewportHeight+this.viewportOffsetTop),d&&p?(t.isHidden&&(this.options.showElement(t.$element),t.isHidden=!1),this._setPosition(t.$element,s,t.startingPositionLeft,r,t.startingPositionTop)):t.isHidden||(this.options.hideElement(t.$element),t.isHidden=!0);for(f=this.backgrounds.length-1;f>=0;f--)i=this.backgrounds[f],e=i.isFixed?0:1,n=this.options.horizontalScrolling?(c+i.horizontalOffset-this.viewportOffsetLeft-i.startingOffsetLeft+i.parentOffsetLeft-i.startingBackgroundPositionLeft)*(e-i.stellarRatio)+"px":i.startingValueLeft,o=this.options.verticalScrolling?(h+i.verticalOffset-this.viewportOffsetTop-i.startingOffsetTop+i.parentOffsetTop-i.startingBackgroundPositionTop)*(e-i.stellarRatio)+"px":i.startingValueTop,u(i.$element,n,o)}},_handleScrollEvent:function(){var t=this,e=!1,i=function(){t._repositionElements(),e=!1},n=function(){e||(d(i),e=!0)};this.$scrollElement.bind("scroll."+this.name,n),n()},_startAnimationLoop:function(){var t=this;this._animationLoop=function(){d(t._animationLoop),t._repositionElements()},this._animationLoop()}},t.fn[s]=function(e){var i=arguments;return e===n||"object"==typeof e?this.each(function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new o(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var n=t.data(this,"plugin_"+s);n instanceof o&&"function"==typeof n[e]&&n[e].apply(n,Array.prototype.slice.call(i,1)),"destroy"===e&&t.data(this,"plugin_"+s,null)}):void 0},t[s]=function(i){var n=t(e);return n.stellar.apply(n,Array.prototype.slice.call(arguments,0))},t[s].scrollProperty=l,t[s].positionProperty=a,e.Stellar=o}(jQuery,this,document),function(){var t,e,i,n,o,s=function(t,e){return function(){return t.apply(e,arguments)}},r=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};e=function(){function t(){}return t.prototype.extend=function(t,e){var i,n;for(i in e)n=e[i],null==t[i]&&(t[i]=n);return t},t.prototype.isMobile=function(t){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)},t.prototype.addEvent=function(t,e,i){return null!=t.addEventListener?t.addEventListener(e,i,!1):null!=t.attachEvent?t.attachEvent("on"+e,i):t[e]=i},t.prototype.removeEvent=function(t,e,i){return null!=t.removeEventListener?t.removeEventListener(e,i,!1):null!=t.detachEvent?t.detachEvent("on"+e,i):delete t[e]},t.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},t}(),i=this.WeakMap||this.MozWeakMap||(i=function(){function t(){this.keys=[],this.values=[]}return t.prototype.get=function(t){var e,i,n,o,s;for(s=this.keys,e=n=0,o=s.length;o>n;e=++n)if(i=s[e],i===t)return this.values[e]},t.prototype.set=function(t,e){var i,n,o,s,r;for(r=this.keys,i=o=0,s=r.length;s>o;i=++o)if(n=r[i],n===t)return void(this.values[i]=e);return this.keys.push(t),this.values.push(e)},t}()),t=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(t=function(){function t(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return t.notSupported=!0,t.prototype.observe=function(){},t}()),n=this.getComputedStyle||function(t){return this.getPropertyValue=function(e){var i;return"float"===e&&(e="styleFloat"),o.test(e)&&e.replace(o,function(t,e){return e.toUpperCase()}),(null!=(i=t.currentStyle)?i[e]:void 0)||null},this},o=/(\-([a-z]){1})/g,this.WOW=function(){function o(t){null==t&&(t={}),this.scrollCallback=s(this.scrollCallback,this),this.scrollHandler=s(this.scrollHandler,this),this.start=s(this.start,this),this.scrolled=!0,this.config=this.util().extend(t,this.defaults),this.animationNameCache=new i}return o.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},o.prototype.init=function(){var t;return this.element=window.document.documentElement,"interactive"===(t=document.readyState)||"complete"===t?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},o.prototype.start=function(){var e,i,n,o;if(this.stopped=!1,this.boxes=function(){var t,i,n,o;for(n=this.element.querySelectorAll("."+this.config.boxClass),o=[],t=0,i=n.length;i>t;t++)e=n[t],o.push(e);return o}.call(this),this.all=function(){var t,i,n,o;for(n=this.boxes,o=[],t=0,i=n.length;i>t;t++)e=n[t],o.push(e);return o}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(o=this.boxes,i=0,n=o.length;n>i;i++)e=o[i],this.applyStyle(e,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new t(function(t){return function(e){var i,n,o,s,r;for(r=[],o=0,s=e.length;s>o;o++)n=e[o],r.push(function(){var t,e,o,s;for(o=n.addedNodes||[],s=[],t=0,e=o.length;e>t;t++)i=o[t],s.push(this.doSync(i));return s}.call(t));return r}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},o.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},o.prototype.sync=function(){return t.notSupported?this.doSync(this.element):void 0},o.prototype.doSync=function(t){var e,i,n,o,s;if(null==t&&(t=this.element),1===t.nodeType){for(t=t.parentNode||t,o=t.querySelectorAll("."+this.config.boxClass),s=[],i=0,n=o.length;n>i;i++)e=o[i],r.call(this.all,e)<0?(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),s.push(this.scrolled=!0)):s.push(void 0);return s}},o.prototype.show=function(t){return this.applyStyle(t),t.className=""+t.className+" "+this.config.animateClass,null!=this.config.callback?this.config.callback(t):void 0},o.prototype.applyStyle=function(t,e){var i,n,o;return n=t.getAttribute("data-wow-duration"),i=t.getAttribute("data-wow-delay"),o=t.getAttribute("data-wow-iteration"),this.animate(function(s){return function(){return s.customStyle(t,e,n,i,o)}}(this))},o.prototype.animate=function(){return"requestAnimationFrame"in window?function(t){return window.requestAnimationFrame(t)}:function(t){return t()}}(),o.prototype.resetStyle=function(){var t,e,i,n,o;for(n=this.boxes,o=[],e=0,i=n.length;i>e;e++)t=n[e],o.push(t.style.visibility="visible");return o},o.prototype.customStyle=function(t,e,i,n,o){return e&&this.cacheAnimationName(t),t.style.visibility=e?"hidden":"visible",i&&this.vendorSet(t.style,{animationDuration:i}),n&&this.vendorSet(t.style,{animationDelay:n}),o&&this.vendorSet(t.style,{animationIterationCount:o}),this.vendorSet(t.style,{animationName:e?"none":this.cachedAnimationName(t)}),t},o.prototype.vendors=["moz","webkit"],o.prototype.vendorSet=function(t,e){var i,n,o,s;s=[];for(i in e)n=e[i],t[""+i]=n,s.push(function(){var e,s,r,l;for(r=this.vendors,l=[],e=0,s=r.length;s>e;e++)o=r[e],l.push(t[""+o+i.charAt(0).toUpperCase()+i.substr(1)]=n);return l}.call(this));return s},o.prototype.vendorCSS=function(t,e){var i,o,s,r,l,a;for(o=n(t),i=o.getPropertyCSSValue(e),a=this.vendors,r=0,l=a.length;l>r;r++)s=a[r],i=i||o.getPropertyCSSValue("-"+s+"-"+e);return i},o.prototype.animationName=function(t){var e;try{e=this.vendorCSS(t,"animation-name").cssText}catch(i){e=n(t).getPropertyValue("animation-name")}return"none"===e?"":e},o.prototype.cacheAnimationName=function(t){return this.animationNameCache.set(t,this.animationName(t))},o.prototype.cachedAnimationName=function(t){return this.animationNameCache.get(t)},o.prototype.scrollHandler=function(){return this.scrolled=!0},o.prototype.scrollCallback=function(){var t;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var e,i,n,o;for(n=this.boxes,o=[],e=0,i=n.length;i>e;e++)t=n[e],t&&(this.isVisible(t)?this.show(t):o.push(t));return o}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},o.prototype.offsetTop=function(t){for(var e;void 0===t.offsetTop;)t=t.parentNode;for(e=t.offsetTop;t=t.offsetParent;)e+=t.offsetTop;return e},o.prototype.isVisible=function(t){var e,i,n,o,s;return i=t.getAttribute("data-wow-offset")||this.config.offset,s=window.pageYOffset,o=s+Math.min(this.element.clientHeight,this.util().innerHeight())-i,n=this.offsetTop(t),e=n+t.clientHeight,o>=n&&e>=s},o.prototype.util=function(){return null!=this._util?this._util:this._util=new e},o.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},o}()}.call(this);