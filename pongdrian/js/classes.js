/**** Classes ****/
function Paddle(isLeft){
  this.x = isLeft ? 0 : CANVAS.width - PADDLE_W
  this.y = CANVAS.height/2 - PADDLE_H/2
  this.vy = 0
  this.width = PADDLE_W
  this.height = PADDLE_H
}

function Ball() {
  this.x = (1.0/3 + Math.random()/3) * (CANVAS.width - BALL_SIZE)
  this.y = Math.floor(Math.random() * (CANVAS.height - BALL_SIZE))
  this.vx = Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED 
  this.vy = (2 * Math.random() - 1) * BALL_SPEED
  this.width = BALL_SIZE
  this.height = BALL_SIZE
}

