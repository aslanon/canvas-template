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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ctx = document.getElementById("balon").getContext("2d");
var canvas = ctx.canvas;

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

var list = [];
var count = 20;
var mouse = new Mouse(canvas);
var draw = new Draw(ctx);

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/**
 *
 * @param {Number} id -> index
 * @param {Number} a -> acceleration
 * @param {Number} x,y -> position axis
 * @param {Number} r -> radius
 * @param {String} color -> fill color
 * @param {Number} v -> visit number
 */
function Object(id, a, x, y, r, color, v) {
  var _this = this;

  this.id = id;
  this.v = v;
  this.a = a;
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.rad = Math.random() * Math.PI * 2;
  this.distanceCenter = getRandomRange(canvas.width / 3, canvas.width);

  this.update = function () {
    _this.y -= _this.a;
    if (_this.y + 2 * _this.r < 0) {
      _this.y = canvas.height + 2 * r;
      _this.rad += _this.a + 0.05;
      _this.x = Math.sin(_this.rad) * _this.distanceCenter;
      _this.v += 1;
      if (_this.v >= 3) {
        list.splice(_this.id, 1);
      }
    }
    _this.draw();
  };

  this.draw = function () {
    draw.fillCircle(_this.x, _this.y, _this.r, _this.color);
  };
}

function createList() {
  for (var i = 0; i < count; i++) {
    var id = i;
    var a = getRandomRange(5, 10);
    var r = getRandomRange(25, 40);
    var y = canvas.height + 2 * r;
    var x = getRandomRange(0 + 2 * r, canvas.width - 2 * r);
    var c = "rgba(255,0,0,.5)";
    list.push(new Object(id, a, x, y, r, c, 0));
  }
}

function init() {
  createList();
}

init();
frame();

/*
 * Animation Frames
 */
function frame() {
  draw.clear();
  requestAnimationFrame(frame);
  list.forEach(function (balon) {
    balon.update();
  });
  // console.log(list.length);
}

/**
 * Canvas Draw Object
 *
 * Prototypes:
 * - setText			-> setup text property
 * - fillText		-> drawing text on canvas with fill property
 * - strokeText	-> drawing text on canvas with stroke color property
 * - fillCircle	-> drawing circle on canvas with fill color property
 * - clear				-> to clean the canvas
 *
 * @param {Object} ctx
 */
function Draw(ctx) {
  var _this2 = this;

  this.ctx = ctx;
  this.canvas = canvas;

  this.setText = function (proporty) {
    for (var option in proporty) {
      _this2.ctx[option] = proporty[option];
    }
  };

  this.fillText = function (text, x, y) {
    _this2.ctx.fillText(text, x, y);
  };

  this.strokeText = function (text, x, y) {
    _this2.ctx.strokeText(text, x, y);
  };

  this.fillCircle = function (x, y, radius, color) {
    _this2.ctx.beginPath();
    _this2.ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (color) _this2.ctx.fillStyle = color;
    _this2.ctx.fill();
  };

  this.clear = function () {
    _this2.ctx.clearRect(0, 0, _this2.canvas.width, _this2.canvas.height);
  };
}

/**
 * Random range genarator
 * @param {Number} min, max
 */
function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Distance function from mouse position
 * @param {Number} x, y, mX, My
 */
function distanceFromMouse(x, y, mX, mY) {
  return Math.sqrt(Math.pow(Math.pow(x - mX, 2) + y - mY, 2));
}

/**
 * Mouse position event
 * @param {Object} canvas
 */
function Mouse(canvas) {
  this.x = 0;
  this.y = 0;
  this.canvas = canvas;
  this.canvas.addEventListener("mousemove", function (e) {
    this.x = e.offsetX;
    this.y = e.offsetY;
  }.bind(this));
  this.canvas.addEventListener("mouseleave", function (e) {
    this.x = -100;
    this.y = -100;
  }.bind(this));
}

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map