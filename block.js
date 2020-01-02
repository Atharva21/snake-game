class Block {

  constructor(x, y, scl) {
    this.x = x;
    this.y = y;
    this.scl = scl;
    this.velocity = [0, 0];
  }
  
  show() {
    fill(255);
    noStroke();
    rect(this.x*this.scl, this.y*this.scl, this.scl, this.scl);
  }
    
}