class Snake {

  constructor(scl) {
    this.scl = scl;
    this.tail = [];
    this.head = {
      velX : 0,
      velY : 0,
      x : floor((width/this.scl)/2),
      y : floor((height/this.scl)/2),
    }
    
    this.food = {};
    this.updated = true;
    this.resetFood();
    
  }
  
  resetFood() {
    let val = this.pickLocation();
    
    this.food = {
      x : val[0],
      y : val[1],
      color : [random(100,255), random(100,255), random(100,255)]
    };
  }
  
  checkAvailable(x, y) {
    let foodDistance;
    foodDistance = dist(x, y, this.head.x, this.head.y);
    if(foodDistance < 1) return false;
    for(let i=0;i<this.tail.length;i++) {
      foodDistance = dist(x, y, this.tail[i].x, this.tail[i].y);
      if(foodDistance < 1) return false;
    }
    return true;
  }
  
  pickLocation() {    
    let x = floor(random(this.scl, width-this.scl)/this.scl);
    let y = floor(random(this.scl, height-this.scl)/this.scl);
    while(!this.checkAvailable(x, y)) {
      x = floor(random(this.scl, width-this.scl)/this.scl);
      y = floor(random(this.scl, height-this.scl)/this.scl);
    }
    return [x, y];
  }
  
  handleEvent(key) {
    if(key == LEFT_ARROW) {
      if(this.head.velX === 1 || !this.updated) return;
      this.head.velY = 0;
      this.head.velX = -1;
      this.updated = false;
    } 
    if(key == RIGHT_ARROW) {
      if(this.head.velX === -1 || !this.updated) return;
      this.head.velY = 0;
      this.head.velX = 1; 
      this.updated = false;     
    } 
    if(key == UP_ARROW) {
      if(this.head.velY === 1 || !this.updated) return;
      this.head.velY = -1;
      this.head.velX = 0;    
      this.updated = false; 
    } 
    if(key == DOWN_ARROW) {
      if(this.head.velY === -1 || !this.updated) return;
      this.head.velY = 1;
      this.head.velX = 0;   
      this.updated = false;    
    }
  }
  
  showHead() {
    fill(255);
    noStroke();
    rect(this.head.x*this.scl, this.head.y*this.scl,
        this.scl, this.scl);
  }
  
  moveHead() {
    let val = [this.head.x, this.head.y, [this.head.velX,
              this.head.velY]];
    this.head.x += this.head.velX;
    this.head.y += this.head.velY;
    // testing.
    if(this.head.x < 0) this.head.x = width/this.scl;
    if(this.head.x > width/this.scl) this.head.x = 0;
    if(this.head.y < 0) this.head.y = height/this.scl-1;
    if(this.head.y > (height/this.scl)-1) this.head.y = 0;

    this.head.x = floor(this.head.x);
    this.head.y = floor(this.head.y);
    
    this.updated = true;
    return val;
  }
  
  append() {
    let block, newPointX, newPointY, lastVel;
    let x, y;
    if(this.tail.length === 0) {
      x = this.head.x;
      y = this.head.y;
      lastVel = [this.head.velX, this.head.velY];
    } else {
      lastVel = this.tail[this.tail.length-1].velocity;
      x = this.tail[this.tail.length-1].x;
      y = this.tail[this.tail.length-1].y;
    }
    
    if(lastVel[0] === 0) {
      //moving vertically
      newPointX = x;
      if(lastVel[1] > 0) newPointY = y - 1;
      else newPointY = y + 1;
    } else {
      //moving horizontally.
      newPointY = y;
      if(x > 0) newPointX = x - 1;
      else newPointX = x + 1;
    }
    
    block = new Block(newPointX, newPointY, this.scl);
    this.tail.push(block);
    //insert @ the start.
    
  }
  
  move() {
    let val = this.moveHead();
    let temp;
    //shift positions down the tail.
    for(let i=0;i<this.tail.length;i++) {
      let block = this.tail[i];
      temp = [block.x, block.y, block.velocity];
      block.x = val[0];
      block.y = val[1];
      block.velocity = val[2];
      val = temp;
    }
    
    let foodDistance = dist(this.head.x, this.head.y,
                           this.food.x, this.food.y);
    if(foodDistance < 1) {
      this.append();
      this.resetFood();
    }
    
    if(this.checkDeath()) this.resetGame();
    
  }
  
  checkDeath() {
    let d;
    let x = this.head.x;
    let y = this.head.y;
    for(let i=2;i<this.tail.length;i++) {
      let block = this.tail[i];
      if(x===block.x && y === block.y){
        alert('Your score: '+(this.tail.length+1));
        return true;
      }
    }
    return false;
  }
  
  resetGame() {
    this.tail = [];
    this.head = {
      velX : 0,
      velY : 0,
      x : floor((width/this.scl)/2),
      y : floor((height/this.scl)/2),
    }
    
    this.food = {};
    this.resetFood();
    this.updated = true;
  }
  
  show() {
    fill(255);
    this.showHead();
    for(let i=0;i<this.tail.length;i++) {
      this.tail[i].show();
    }
    
    //show food.
    fill(this.food.color);
    rect(this.food.x*this.scl, this.food.y*this.scl, this.scl, this.scl);
    
  }
  
}
