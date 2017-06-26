/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globals", function() { return globals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squares", function() { return squares; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diceValues", function() { return diceValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scores", function() { return scores; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "board", function() { return board; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dice", function() { return dice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p1Pieces", function() { return p1Pieces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p2Pieces", function() { return p2Pieces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playArea", function() { return playArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideMove", function() { return hideMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myTurn", function() { return myTurn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasValidMoves", function() { return hasValidMoves; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scorePiles", function() { return scorePiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rollButton", function() { return rollButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchTurn", function() { return switchTurn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return reset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "win", function() { return win; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_main_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_main_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__styles_main_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_animations_css__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_animations_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_animations_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_Board_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_Dice_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_Piece_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_ScorePile_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__getSquare_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__socket_js__ = __webpack_require__(22);
// CSS



// JS







// Code
const playArea = document.querySelector('.play-area'),
    rollButton = document.querySelector('.roll'),
    resetButton = document.querySelector('.reset'),
    connectButton = document.querySelector('.connect'),
    rematchButton = document.querySelector('.rematch'),
    gameoverDisplay = document.querySelector('.gameover'),
    statusText = document.querySelector('.status')

const globals = {
    turn: 'p2',
    roll: 0,
    rolled: false,
    moved: false,
    opponentRematch: false,
    switched: false,
    diceValues: [],
    me: null,
    socket: null
}

let squares = []

let scores = {
    p1: 0,
    p2: 0
}

const board = new __WEBPACK_IMPORTED_MODULE_2__entities_Board_js__["a" /* Board */]()

let dice = []
for (let i = 1; i <= 4; i++) {
    dice.push(new __WEBPACK_IMPORTED_MODULE_3__entities_Dice_js__["a" /* Dice */](i))
}

const p1Pieces = []
for (let i = 0; i < 7; i++) {
    p1Pieces.push(new __WEBPACK_IMPORTED_MODULE_4__entities_Piece_js__["a" /* Piece */]('p1',i))
}

const p2Pieces = []
for (let i = 0; i < 7; i++) {
    p2Pieces.push(new __WEBPACK_IMPORTED_MODULE_4__entities_Piece_js__["a" /* Piece */]('p2',i))
}

const scorePiles = {
    p1: new __WEBPACK_IMPORTED_MODULE_5__entities_ScorePile_js__["a" /* ScorePile */]('p1'),
    p2: new __WEBPACK_IMPORTED_MODULE_5__entities_ScorePile_js__["a" /* ScorePile */]('p2')
}

rollButton.addEventListener('click', () => __WEBPACK_IMPORTED_MODULE_3__entities_Dice_js__["b" /* rollDice */]())
resetButton.addEventListener('click', () => {
    if (globals.socket) {
        globals.socket.disconnect()
        globals.socket = null
    }
    reset()
    status('')
})
connectButton.addEventListener('click', () => {
    const ID = prompt("Enter your opponent's 5 character ID or leave blank to start a game.", '')
    if (ID !== null) __WEBPACK_IMPORTED_MODULE_7__socket_js__["a" /* connect */](ID.toUpperCase())
})
rematchButton.addEventListener('click', () => {
    if (globals.socket) rematch()
})

function switchTurn(reroll) {
    let bool = globals.turn === 'p1'
    if (reroll) {
        bool = !bool
    }
    if (bool) {
        globals.turn = 'p2'
        p2Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p1Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P2 Roll'
        board.p2Display.classList.add('show')
        board.p1Display.classList.remove('show')
    } else {
        globals.turn = 'p1'
        p1Pieces.forEach(piece => piece.elt.classList.add('turn'))
        p2Pieces.forEach(piece => piece.elt.classList.remove('turn'))
        rollButton.textContent = 'P1 Roll'
        board.p2Display.classList.remove('show')
        board.p1Display.classList.add('show')
    }
    globals.rolled = false
    globals.moved = false
    if (globals.socket) {
        if (globals.turn === globals.me) {
            status('Your Turn')
        } else {
            status("Opponent's Turn")
        }
    }
}
switchTurn()

function win(player) {
    let message
    if (globals.socket) {
        if (globals.me === player) {
            message = 'You Win!'
        } else {
            message = 'You Lost'
        }
    } else {
        message = player.toUpperCase() + ' wins!'
    }
    gameoverDisplay.querySelector('h2').textContent = message
    gameoverDisplay.classList.add('fly-in')
    globals.opponentRematch = false
    if (globals.socket) {
        rematchButton.classList.remove('hide')
    } else {
        rematchButton.classList.add('hide')
    }
}

function reset() {
    gameoverDisplay.classList.remove('fly-in')
    globals.turn = 'p2'
    switchTurn()
    scores = {
        p1: 0,
        p2: 0
    }
    p1Pieces.forEach(piece => piece.reset())
    p2Pieces.forEach(piece => piece.reset())
    squares.forEach(square => square.reset())
    if (globals.socket) {
        connectButton.classList.add('hide')
    } else {
        connectButton.classList.remove('hide')
    }
}

function status(text) {
    statusText.textContent = text
    statusText.style.display = 'block'
    statusText.classList.add('show')
    // setTimeout(() => {
    //     statusText.classList.remove('show')
    //     statusText.addEventListener('transitionend', function() {
    //         this.style.display = 'none'
    //     }, {once: true})
    // }, 5000)
}

function hideMove(e,remote) {
    squares.forEach(square => square.elt.classList.remove('select'))
    scorePiles.p1.elt.classList.remove('select')
    scorePiles.p2.elt.classList.remove('select')
    if (globals.socket && !remote) {
        globals.socket.emit('hide-move')
    }
}

function hasValidMoves() {
    let bool = false
    if (globals.turn === 'p1') {
        p1Pieces.forEach(piece => {
            if (__WEBPACK_IMPORTED_MODULE_6__getSquare_js__["a" /* getSquare */](globals.turn,piece.square)) bool = true
        })
    } else {
        p2Pieces.forEach(piece => {
            if (__WEBPACK_IMPORTED_MODULE_6__getSquare_js__["a" /* getSquare */](globals.turn,piece.square)) bool = true
        })
    }
    hideMove('',true)
    return bool
}

function myTurn() {
    if (!globals.socket || (globals.me === globals.turn)) return true
    return false
}

window.addEventListener('keyup', e => {
    if (e.key === ' ') __WEBPACK_IMPORTED_MODULE_3__entities_Dice_js__["b" /* rollDice */]()
})



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getSquare; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);


function getSquare(player, square) {
    let i
    if (!square) {
        square = __WEBPACK_IMPORTED_MODULE_0__game_js__["board"][player + 'start']
        i = 1
    } else {
        i = 0
    }
    while (i < __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].roll) {
        if (!square.next) {
            if (i === roll-1) return __WEBPACK_IMPORTED_MODULE_0__game_js__["scorePiles"][player]
            return null
        }
        if (square.next[player]) {
            square = square.next[player]
        } else {
            square = square.next
        }
        i++
    }
    return square
}



/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rollDice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_game_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_getSquare_js__ = __webpack_require__(1);



function Dice(i) {
    this.elt = document.createElement('div')
    this.elt.classList.add('dice')

    this.elt.style.top = 620 + 'px'
    this.elt.style.left = ((75 * i)-104) + 'px'

    this.pips = []

    this.top = document.createElement('div')
    this.top.style.left = -5 + 'px'
    this.top.style.top = -0.5 + 'px'
    this.top.classList.add('dice-pip')
    this.top.classList.add('top')
    this.elt.appendChild(this.top)

    this.left = document.createElement('div')
    this.left.style.left = -31.7 + 'px'
    this.left.style.top = 45.5 + 'px'
    this.left.classList.add('dice-pip')
    this.left.classList.add('left')
    this.left.classList.add('hidden')
    this.elt.appendChild(this.left)

    this.right = document.createElement('div')
    this.right.style.left = 21.5 + 'px'
    this.right.style.top = 45.5 + 'px'
    this.right.classList.add('dice-pip')
    this.right.classList.add('right')
    this.right.classList.add('hidden')
    this.elt.appendChild(this.right)

    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["board"].elt.appendChild(this.elt)
}

Dice.prototype.roll = function(diceVal) {
    if (diceVal === undefined) diceVal = H.randomInt(0,1)
    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].diceValues.push(diceVal)
    diceStates[diceVal].bind(this)()
    this.elt.classList.add('spin')
    function transitionfunc(e) {
        if (e.srcElement.classList.contains('dice-pip')) return
        this.classList.remove('spin')
        this.removeEventListener('transitionend', transitionfunc)
        if (!__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["hasValidMoves"]() && (__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].roll !== 0)) {
            setRollButtonText('No Moves',true)
        } else {
            setRollButtonText()
        }
    }
    this.elt.addEventListener('transitionend', transitionfunc)
    return diceVal
}

const diceStates = {
    0: function() {
        const zero = [ 
            () => {
                this.top.classList.add('hidden')
                this.left.classList.remove('hidden')
                this.right.classList.remove('hidden')
            },
            () => {
                this.top.classList.add('hidden')
                this.left.classList.add('hidden')
                this.right.classList.remove('hidden')
            },
            () => {
                this.top.classList.add('hidden')
                this.left.classList.remove('hidden')
                this.right.classList.add('hidden')
            }
        ]
        zero[H.randomInt(0,zero.length-1)].bind(this)()
    },
    1: function() {
        const one = [ 
            () => {
                this.top.classList.remove('hidden')
                this.left.classList.remove('hidden')
                this.right.classList.add('hidden')
            },
            () => {
                this.top.classList.remove('hidden')
                this.left.classList.add('hidden')
                this.right.classList.remove('hidden')
            },
            () => {
                this.top.classList.remove('hidden')
                this.left.classList.add('hidden')
                this.right.classList.add('hidden')
            }
        ]
        one[H.randomInt(0,one.length-1)].bind(this)()
    }
}

function rollDice(vals) {
    if (__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].rolled || (!__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["myTurn"]() && !vals)) return
    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].switched = false
    if (!vals) vals = []
    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].diceValues = []
    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].rolled = true
    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].roll = 0
    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["dice"].forEach((die,i) => __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].roll += die.roll(vals[i]))
    if (__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].socket && __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["myTurn"]()) {
        __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].socket.emit('roll', __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].diceValues)
    }
}

function setRollButtonText(text,changeTurn) {
    if (text) {
        __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["rollButton"].textContent = text
    } else {
        __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["rollButton"].textContent = __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].roll
    }
    if (((__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].roll === 0) || changeTurn) && !__WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].switched) {
        __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["globals"].switched = true
        setTimeout(() => { __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["switchTurn"]() },1500)
    }
}



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./main.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "* {\n    margin: 0;\n    padding: 0;\n    font-family: Monaco, monospace;\n}\nbody {\n    background: mintcream;\n}\n.play-area {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n.piece {\n    position: absolute;\n    width: 50px;\n    height: 50px;\n    border-radius: 200px;\n    border: 1px solid rgba(0,0,0,0.2);\n    box-shadow: 1px -1px 1px rgba(0,0,0,0.5);\n    z-index: 4;\n}\n    .p1 {\n        background: steelblue;\n    }\n    .p2 {\n        background: moccasin;\n    }\n.pip {\n    position: absolute;\n    width: 7px;\n    height: 7px;\n    border-radius: 20px;\n    box-shadow: 1px -1px 1px rgba(0,0,0,0.2) inset;\n}\n    .p1 .pip {\n        background: gold;\n    }\n    .p2 .pip {\n        background: steelblue;\n    }\n.board {\n    position: relative;\n    width: 225px;\n    height: 600px;\n    margin: 40px auto 0;\n}\n.square {\n    position: absolute;\n    width: 74px;\n    height: 74px;\n    background: rgba(0,200,255,0.5);\n    background-size: 75px auto;\n    border: 1px solid slategray;\n}\n.score-pile {\n    position: absolute;\n    width: 75px;\n    height: 150px;\n}\n.button {\n    display: inline-block;\n    margin: 100px 20px 0;\n    width: 100px;\n    height: 50px;\n    text-align: center;\n    line-height: 50px;\n    border: 1px solid rgba(0,0,0,0.5);\n    user-select: none;\n}\n    .roll {\n        background: rgba(0,230,30,0.5);\n    }\n    .reset {\n        background: rgba(230,0,30,0.5);\n    }\n    .connect {\n        background: rgba(0,30,230,0.5);\n    }\n    .rematch {\n        margin: 20px auto 0;\n        background: rgba(230,0,30,0.8);\n        color: snow;\n    }\n.button-container {\n    text-align: center;\n}\n.safe {\n    background-image: url(" + __webpack_require__(7) + ");\n    background-color: rgba(0,230,30,0.5);\n}\n\n.dice {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 0 30px 52px 30px;\n    border-color: transparent transparent #424242 transparent;\n}\n    .dice-pip {\n        position: absolute;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        border-width: 0 5px 8.7px 5px;\n        border-color: transparent transparent #bbbbbb transparent;\n    }\n    .dice-pip.top {\n        transform: rotate(0deg)\n    }\n    .dice-pip.left {\n        transform: rotate(-120deg)\n    }\n    .dice-pip.right {\n        transform: rotate(120deg)\n    }\n\n.gameover {\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    top: 35%;\n    transition: 1s ease transform;\n    transform: translateY(-1000px);\n    z-index: 20;\n    cursor: default;\n    user-select: none;\n}\n    .gameover h2 {\n        font-size: 100px;\n        color: rgba(0,250,50,1);\n        text-shadow: 0 0 5px black;\n    }\n\n.square:nth-of-type(9) {\n    background-image: url(" + __webpack_require__(8) + ");\n}\n\n.square:nth-of-type(1),\n.square:nth-of-type(3),\n.square:nth-of-type(5),\n.square:nth-of-type(7),\n.square:nth-of-type(15) {\n    background-image: url(" + __webpack_require__(9) + ");\n}\n\n.square:nth-of-type(2),\n.square:nth-of-type(6),\n.square:nth-of-type(10),\n.square:nth-of-type(13),\n.square:nth-of-type(16) {\n    background-image: url(" + __webpack_require__(10) + ");\n}\n\n.square:nth-of-type(11),\n.square:nth-of-type(14) {\n    background-image: url(" + __webpack_require__(11) + ");\n}\n\n.square:nth-of-type(17),\n.square:nth-of-type(19) {\n    background-image: url(" + __webpack_require__(12) + ");\n}\n\n.p1-display, .p2-display {\n    position: absolute;\n    top: 10px;\n    font-size: 30px;\n    text-shadow: 0 0 1px rgba(0,0,0,1);\n    user-select: none;\n    cursor: default;\n    width: 50px;\n    height: 50px;\n    line-height: 50px;\n    text-align: center;\n    border-radius: 100px;\n    transition: 0.75s ease background;\n}\n\n.p1-display {\n    left: -155px;\n    color: steelblue;\n}\n    .p1-display.show {\n        background: gold;\n    }\n\n.p2-display {\n    left: 330px;\n    color: moccasin;\n}\n    .p2-display.show {\n        background: steelblue;\n    }\n\n.status {\n    display: none;\n    opacity: 0;\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    top: 10px;\n    transition: 0.5s ease opacity;\n}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "940af5bcc9792eda22150e73c72d9d6f.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1836292ef36ed574e6cd91340d28b2d9.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "23c4fc1fec8dc74d5a052156e671963e.png";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c82ff925b7859dcba6637f3cb38d37a7.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "898b32fc178c295445b4e58bd1eecfc8.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "af97b24560f38d0d248508a081e4d86a.png";

/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./animations.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./animations.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".piece {\n    transition: 0.4s ease top, 0.4s ease left;\n}\n    .piece.turn {\n        cursor: pointer;\n    }\n.select {\n    filter: brightness(1.6);\n}\n.score-pile {\n    transition: 0.2s ease background;\n}\n.score-pile.select {\n    background: rgba(255,255,0,0.5);\n}\n.square {\n    transition: 0.2s ease filter;\n}\n.button {\n    transition: 0.2s ease box-shadow;\n    cursor: pointer;\n}\n.button:hover {\n    box-shadow: 0px 0px 3px rgba(0,0,0,0.5) inset;\n}\n.dice-pip {\n    transition: 0.1s linear opacity;\n}\n.dice-pip.hidden {\n    opacity: 0;\n}\n.dice.spin {\n    transition: 1s ease-out transform;\n    transform-origin: 50% 70%;\n    transform: rotate(1080deg);\n}\n.fly-in {\n    transform: translateY(0);\n}\n.status.show {\n    opacity: 1;\n}\n.hide {\n    display: none;\n}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_constructLL_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_game_js__ = __webpack_require__(0);



function Board() {
    this.p1start = null
    this.p2start = null

    this.elt = document.createElement('div')
    this.elt.classList.add('board')

    __WEBPACK_IMPORTED_MODULE_0__setup_constructLL_js__["a" /* constructLL */].bind(this)()

    this.p1Display = document.createElement('div')
    const p1Text = document.createElement('p')
    this.p1Display.appendChild(p1Text)
    p1Text.textContent = 'P1'
    this.p1Display.classList.add('p1-display')
    
    this.p2Display = document.createElement('div')
    const p2Text = document.createElement('p')
    this.p2Display.appendChild(p2Text)
    p2Text.textContent = 'P2'
    this.p2Display.classList.add('p2-display')

    this.elt.appendChild(this.p1Display)
    this.elt.appendChild(this.p2Display)

    __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["playArea"].appendChild(this.elt)
}



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return constructLL; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__ = __webpack_require__(18);


function constructLL() {
    // Construct the linked list board

    // Player 1 starting area
    const s1p1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p1')
    s1p1.elt.style.left = 0 + 'px'
    s1p1.elt.style.top = 225 + 'px'
    const s2p1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p1')
    s2p1.elt.style.left = 0 + 'px'
    s2p1.elt.style.top = 150 + 'px'
    s1p1.next = s2p1
    const s3p1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p1')
    s3p1.elt.style.left = 0 + 'px'
    s3p1.elt.style.top = 75 + 'px'
    s2p1.next = s3p1
    const s4p1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p1',true)
    s4p1.elt.style.left = 0 + 'px'
    s4p1.elt.style.top = 0 + 'px'
    s3p1.next = s4p1
    this.p1start = s1p1

    // Player 2 starting area
    const s1p2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p2')
    s1p2.elt.style.left = 150 + 'px'
    s1p2.elt.style.top = 225 + 'px'
    const s2p2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p2')
    s2p2.elt.style.left = 150 + 'px'
    s2p2.elt.style.top = 150 + 'px'
    s1p2.next = s2p2
    const s3p2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p2')
    s3p2.elt.style.left = 150 + 'px'
    s3p2.elt.style.top = 75 + 'px'
    s2p2.next = s3p2
    const s4p2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p2',true)
    s4p2.elt.style.left = 150 + 'px'
    s4p2.elt.style.top = 0 + 'px'
    s3p2.next = s4p2
    this.p2start = s1p2

    // War zone
    const w1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w1.elt.style.left = 75 + 'px'
    w1.elt.style.top = 0 + 'px'
    s4p1.next = w1
    s4p2.next = w1
    const w2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w2.elt.style.left = 75 + 'px'
    w2.elt.style.top = 75 + 'px'
    w1.next = w2
    const w3 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w3.elt.style.left = 75 + 'px'
    w3.elt.style.top = 150 + 'px'
    w2.next = w3
    const w4 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war',true)
    w4.elt.style.left = 75 + 'px'
    w4.elt.style.top = 225 + 'px'
    w3.next = w4
    const w5 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w5.elt.style.left = 75 + 'px'
    w5.elt.style.top = 300 + 'px'
    w4.next = w5
    const w6 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w6.elt.style.left = 75 + 'px'
    w6.elt.style.top = 375 + 'px'
    w5.next = w6
    const w7 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w7.elt.style.left = 75 + 'px'
    w7.elt.style.top = 450 + 'px'
    w6.next = w7
    const w8 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'war')
    w8.elt.style.left = 75 + 'px'
    w8.elt.style.top = 525 + 'px'
    w7.next = w8
    w8.next = {}

    // Ending zones
    const e1p1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p1')
    e1p1.elt.style.left = 0 + 'px'
    e1p1.elt.style.top = 525 + 'px'
    const e2p1 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p1',true)
    e2p1.elt.style.left = 0 + 'px'
    e2p1.elt.style.top = 450 + 'px'
    e1p1.next = e2p1

    const e1p2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p2')
    e1p2.elt.style.left = 150 + 'px'
    e1p2.elt.style.top = 525 + 'px'
    const e2p2 = new __WEBPACK_IMPORTED_MODULE_0__entities_Square_js__["a" /* Square */](this,'p2',true)
    e2p2.elt.style.left = 150 + 'px'
    e2p2.elt.style.top = 450 + 'px'
    e1p2.next = e2p2

    w8.next['p1'] = e1p1
    w8.next['p2'] = e1p2
}



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Square; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_game_js__ = __webpack_require__(0);


function Square(board,type,safe) {
    this.type = type
    this.safe = !!safe

    this.piece = null

    this.elt = document.createElement('div')
    this.elt.classList.add('square')
    this.elt.classList.add(this.type)

    if (this.safe) {
        this.elt.classList.add('safe')
    }

    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["squares"].push(this)

    board.elt.appendChild(this.elt)
}

Square.prototype.add = function(piece) {
    this.setPiecePosition(piece)
    if (piece.square) {
        piece.square.reset()
    }
    if (this.piece) {
        this.piece.reset()
    }
    this.piece = piece
    this.piece.square = this
    this.piece.currentSquare = this
    this.piece.elt.addEventListener('transitionend', (() => {
        this.piece.elt.style.zIndex = 4
    }).bind(this), {once:true})
}

Square.prototype.setPiecePosition = function(piece) {
    piece.elt.style.left = (this.elt.offsetLeft + piece.offset) + 'px'
    piece.elt.style.top = (this.elt.offsetTop + piece.offset) + 'px'
}

Square.prototype.reset = function() {
    this.piece = null
}



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Piece; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_pips_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_game_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setup_getSquare_js__ = __webpack_require__(1);




function Piece(player,i) {
    this.offset = 12

    this.player = player

    this.scored = false

    this.currentSquare = null

    this.elt = document.createElement('div')
    this.elt.classList.add('piece')
    this.elt.classList.add(this.player)

    for (let i = 0; i < 5; i++) {
        const pip = document.createElement('div'),
            loc = __WEBPACK_IMPORTED_MODULE_0__setup_pips_js__["a" /* pipLocations */][i]
        pip.classList.add('pip')
        pip.style.left = loc.x + 'px'
        pip.style.top = loc.y + 'px'
        this.elt.appendChild(pip)
    }

    this.elt.addEventListener('click', this.move.bind(this))

    this.elt.addEventListener('mouseover', this.showMove.bind(this))

    this.elt.addEventListener('mouseout', __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["hideMove"])

    if (this.player === 'p1') {
        this.leftStart = -this.offset-75
    } else {
        this.leftStart = this.offset+250
    }
    this.topStart = this.offset*i

    this.elt.style.left = this.leftStart + 'px'
    this.elt.style.top = this.topStart + 'px'

    this.square = null

    __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["board"].elt.appendChild(this.elt)
}

Piece.prototype.showMove = function(e, remote) {
    if (!__WEBPACK_IMPORTED_MODULE_1__setup_game_js__["myTurn"]() && !remote && __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].socket) return
    __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["squares"].forEach(square => square.elt.classList.remove('select'))
    __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["scorePiles"].p1.elt.classList.remove('select')
    __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["scorePiles"].p2.elt.classList.remove('select')
    const square = __WEBPACK_IMPORTED_MODULE_2__setup_getSquare_js__["a" /* getSquare */](this.player,this.square)
    if (this.cannotMoveTo(square)) return
    if (__WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].socket && __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["myTurn"]()) {
        let idx
        if (this.player === 'p1') {
            idx = __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["p1Pieces"].indexOf(this)
        } else {
            idx = __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["p2Pieces"].indexOf(this)
        }
        __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].socket.emit('show-move', idx)
    }
    if (!square.piece ||
        ((square.piece.player !== this.player) && !square.safe)) {
        square.elt.classList.add('select')
    }
}

Piece.prototype.move = function(e, remote) {
    const square = __WEBPACK_IMPORTED_MODULE_2__setup_getSquare_js__["a" /* getSquare */](this.player,this.square)
    if (this.cannotMoveTo(square)) return
    __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].moved = true
    if (__WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].socket && __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["myTurn"]() && !remote) {
        let idx
        if (this.player === 'p1') {
            idx = __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["p1Pieces"].indexOf(this)
        } else {
            idx = __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["p2Pieces"].indexOf(this)
        }
        __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].socket.emit('move', idx)
    }
    this.elt.style.zIndex = 5
    if (!this.currentSquare) {
        this.currentSquare = {next: __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["board"][this.player + 'start']}
    }
    this.traverse(square)
}

Piece.prototype.reset = function() {
    this.elt.style.left = this.leftStart + 'px'
    this.elt.style.top = this.topStart + 'px'
    this.square = null
    this.currentSquare = null
}

Piece.prototype.cannotMoveTo = function(square) {
    if ((__WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].roll === 0) || !square || this.scored || __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].moved) return true
    if ((this.player === __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].turn) && __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["globals"].rolled) {
        if (square.piece) {
            if (square.piece.player !== this.player) {
                if (!square.safe) {
                    return false
                }
            }
            return true
        }
        return false
    }
    return true
}

Piece.prototype.traverse = function(target) {
    if (!this.currentSquare.next) {
        __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["scorePiles"][this.player].add(this)
        __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["switchTurn"](this.square.safe)
        return
    }
    if (target === this.currentSquare.next) {
        this.currentSquare.next.add(this)
        __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["switchTurn"](this.square.safe)
        return
    }
    if (this.currentSquare.next[this.player]) {
        if (target === this.currentSquare.next[this.player]) {
            this.currentSquare.next[this.player].add(this)
            __WEBPACK_IMPORTED_MODULE_1__setup_game_js__["switchTurn"](this.square.safe)
            return
        } else {
            this.currentSquare = this.currentSquare.next[this.player]
        }
    } else {
        this.currentSquare = this.currentSquare.next
    }
    setTimeout((() => {
        this.currentSquare.setPiecePosition(this)
        this.elt.addEventListener('transitionend', this.traverse.bind(this, target), {once:true})
    }).bind(this),0)
}



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const pipLocations = [
    {x: 10, y:10},
    {x: 10, y:35},
    {x: 22, y:22},
    {x: 33, y:10},
    {x: 33, y:35}
]
/* harmony export (immutable) */ __webpack_exports__["a"] = pipLocations;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScorePile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_game_js__ = __webpack_require__(0);


function ScorePile(player) {
    this.player = player

    if (this.player === 'p1') {
        this.left = 0
    } else {
        this.left = 150
    }
    this.top = 300

    this.elt = document.createElement('div')
    this.elt.classList.add('score-pile')
    this.elt.style.left = this.left + 'px'
    this.elt.style.top = this.top + 'px'

    __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["board"].elt.appendChild(this.elt)
}

ScorePile.prototype.add = function(piece) {
    piece.scored = true
    piece.elt.style.left = (this.left + piece.offset) + 'px'
    piece.elt.style.top = (piece.topStart + this.top + 10) + 'px'
    if (piece.square) {
        piece.square.reset()
    }
    piece.square = this
    scores[piece.player]++
    if (scores[piece.player] >= 7) {
        __WEBPACK_IMPORTED_MODULE_0__setup_game_js__["win"](piece.player)
    }
}



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_Dice_js__ = __webpack_require__(4);



function connect(opponent) {
    __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].socket = io()
    const socket = __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].socket

    let ID

    socket.on('connection', id => {
        __WEBPACK_IMPORTED_MODULE_0__game_js__["status"](`Connected! ID: ${id}`)
        ID = id
    })
    socket.emit('challenge', opponent)
    
    socket.on('start', res => {
        __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me = res.me
        __WEBPACK_IMPORTED_MODULE_0__game_js__["reset"]()
        if (__WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me === 'p2') {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["status"]("Game Started: Opponent's Turn")
        } else {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["status"]("Game Started: Your Turn")
        }
    })

    socket.on('roll', vals => {
        __WEBPACK_IMPORTED_MODULE_1__entities_Dice_js__["b" /* rollDice */](vals)
    })

    socket.on('move', pieceIdx => {
        if (__WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me === 'p2') {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["p1Pieces"][pieceIdx].move('',true)
        } else {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["p2Pieces"][pieceIdx].move('',true)
        }
    })

    socket.on('show-move', pieceIdx => {
        if (__WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me === 'p2') {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["p1Pieces"][pieceIdx].showMove('',true)
        } else {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["p2Pieces"][pieceIdx].showMove('',true)
        }
    })

    socket.on('hide-move', () => __WEBPACK_IMPORTED_MODULE_0__game_js__["hideMove"]('',true))

    socket.on('rematch', () => {
        __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].opponentRematch = true
        __WEBPACK_IMPORTED_MODULE_0__game_js__["status"]('Your opponent wants a rematch.')
    })

    socket.on('accept-rematch', () => {
        __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].opponentRematch = true
        rematch(true)
    })

    socket.on('opponent-disconnect', () => {
        __WEBPACK_IMPORTED_MODULE_0__game_js__["status"]('Your opponent has disconnected.')
        if (socket) {
            socket.disconnect()
            __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].socket = null
        }
        __WEBPACK_IMPORTED_MODULE_0__game_js__["reset"]()
    })
}

function rematch(remote) {
    if (__WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].opponentRematch) {
        __WEBPACK_IMPORTED_MODULE_0__game_js__["reset"]()
        if (__WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me === 'p2') {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me = 'p1'
            __WEBPACK_IMPORTED_MODULE_0__game_js__["status"]("Game Started: Your Turn")
        } else {
            __WEBPACK_IMPORTED_MODULE_0__game_js__["globals"].me = 'p2'
            __WEBPACK_IMPORTED_MODULE_0__game_js__["status"]("Game Started: Opponent's Turn")
        }
        if (!remote) socket.emit('accept-rematch')
    } else {
        socket.emit('rematch')
    }
}



/***/ })
/******/ ]);