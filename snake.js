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
    this.resetFood();
    
  }
  
  resetFood() {
    let val = this.pickLocation();
    
    this.food = {
      x : val[0],
      y : val[1]
    };
  }
  
  checkAvailable(x, y) {
      if(this.head.x === x && this.head.y === y) return false;
      for(let i=0;i<this.tail.length;i++) {
        if(this.tail[i].x === x && this.tail[i].y === y) return false;
      }
      return true;
  }
  
  pickLocation() {    
    let x = floor(random(width/this.scl));
    let y = floor(random(height/this.scl));
    while(!this.checkAvailable(x, y)) {
      x = random(this.scl);
      y = random(this.scl);
    }
    return [x, y];
  }
  
  handleEvent(key) {
    if(key == LEFT_ARROW) {
      if(this.head.velX === 1) return;
      this.head.velY = 0;
      this.head.velX = -1;
    } 
    if(key == RIGHT_ARROW) {
      if(this.head.velX === -1) return;
      this.head.velY = 0;
      this.head.velX = 1;      
    } 
    if(key == UP_ARROW) {
      if(this.head.velY === 1) return;
      this.head.velY = -1;
      this.head.velX = 0;     
    } 
    if(key == DOWN_ARROW) {
      if(this.head.velY === -1) return;
      this.head.velY = 1;
      this.head.velX = 0;       
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
    if(this.head.x < 0) this.head.x = width/this.scl-1;
    if(this.head.x >= width/this.scl) this.head.x = 0;
    if(this.head.y < 0) this.head.y = height/this.scl-1;
    if(this.head.y >= height/this.scl) this.head.y = 0;
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
  }
  
  show() {
    fill(255);
    this.showHead();
    for(let i=0;i<this.tail.length;i++) {
      this.tail[i].show();
    }
    
    //show food.
    fill(255, 0, 200);
    rect(this.food.x*this.scl, this.food.y*this.scl, this.scl, this.scl);
    
  }
  
}