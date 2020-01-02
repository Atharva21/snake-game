let snake;

function setup() {
  createCanvas(400, 400);
  snake = new Snake(10);
  frameRate(10);
}

function draw() {
  background(0);
  snake.move();
  snake.show();
}

function keyPressed() {
  snake.handleEvent(keyCode);
}