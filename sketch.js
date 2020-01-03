let snake;

alert('Use Arrow keys <- -> to start playing!!');

function setup() {
  createCanvas(windowWidth, windowHeight);
  snake = new Snake(50);
  frameRate(12);
}

function draw() {
  background(0);
  snake.move();
  snake.show();
}

function keyPressed() {
  // if(!gameBegun) gameBegun = true;
  snake.handleEvent(keyCode);
}
