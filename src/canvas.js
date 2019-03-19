let ctx = document.getElementById("balon").getContext("2d");
let canvas = ctx.canvas;

canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

let list = [];
let count = 20;
let mouse = new Mouse(canvas);
let draw = new Draw(ctx);

window.addEventListener("resize", () => {
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
  this.id = id;
  this.v = v;
  this.a = a;
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.rad = Math.random() * Math.PI * 2;
  this.distanceCenter = getRandomRange(canvas.width / 3, canvas.width);

  this.update = () => {
    this.y -= this.a;
    if (this.y + 2 * this.r < 0) {
      this.y = canvas.height + 2 * r;
      this.rad += this.a + 0.05;
      this.x = Math.sin(this.rad) * this.distanceCenter;
      this.v += 1;
      if (this.v >= 3) {
        list.splice(this.id, 1);
      }
    }
    this.draw();
  };

  this.draw = () => {
    draw.fillCircle(this.x, this.y, this.r, this.color);
  };
}

function createList() {
  for (let i = 0; i < count; i++) {
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
  list.forEach(balon => {
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
  this.ctx = ctx;
  this.canvas = canvas;

  this.setText = proporty => {
    for (let option in proporty) {
      this.ctx[option] = proporty[option];
    }
  };

  this.fillText = (text, x, y) => {
    this.ctx.fillText(text, x, y);
  };

  this.strokeText = (text, x, y) => {
    this.ctx.strokeText(text, x, y);
  };

  this.fillCircle = (x, y, radius, color) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (color) this.ctx.fillStyle = color;
    this.ctx.fill();
  };

  this.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
  this.canvas.addEventListener(
    "mousemove",
    function(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }.bind(this)
  );
  this.canvas.addEventListener(
    "mouseleave",
    function(e) {
      this.x = -100;
      this.y = -100;
    }.bind(this)
  );
}
