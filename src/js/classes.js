/**** Classes ****/
function Player(){
  this.x = 0
  this.y = 0
  this.yVelocity = 0
  this.width = 56
  this.height = 100
  this.walkFrame = 0
}

function Obstacle(x, y, width, height){
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

