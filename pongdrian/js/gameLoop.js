/**** Game Loop Functions ****/
function gameTick(){
  handleKeys()
  updateGame(CANVAS)
  draw(CANVAS)
}

function handleKeys(){
  //while there are keys in the queue
  while(KEY_QUEUE.length > 0){
    var key = KEY_QUEUE.shift()
    console.log("key: " + key)
    switch (key) {
      case 38:  PLAYER1.vy = -PADDLE_SPEED;  break;
      case 40:  PLAYER1.vy =  PADDLE_SPEED;  break;
      case -38: if (PLAYER1.vy == -PADDLE_SPEED) PLAYER1.vy = 0; break;
      case -40: if (PLAYER1.vy ==  PADDLE_SPEED) PLAYER1.vy = 0; break;
    }
  }
}

function updateGame(canvas){
  // update player position
  PLAYER1.y += 1.0 * PLAYER1.vy / FPS
  if (PLAYER1.y < 0) PLAYER1.y = 0
  if (PLAYER1.y + PLAYER1.height > CANVAS.height) PLAYER1.y = CANVAS.height - PLAYER1.height

  // AI reacts
  if (BALL.y + BALL.height < PLAYER2.y + BUFFER)
    PLAYER2.vy = -PADDLE_SPEED
  else if (BALL.y > PLAYER2.y + PLAYER2.height - BUFFER)
    PLAYER2.vy = PADDLE_SPEED
  else
    PLAYER2.vy = 0
  // update AI position
  PLAYER2.y += 1.0 * PLAYER2.vy / FPS
  if (PLAYER2.y < 0) PLAYER2.y = 0
  if (PLAYER2.y + PLAYER2.height > CANVAS.height) PLAYER2.y = CANVAS.height - PLAYER2.height

  // update ball position
  BALL.x += 1.0 * BALL.vx / FPS
  BALL.y += 1.0 * BALL.vy / FPS

  // ball bounce, top
  if (BALL.y < 0) {
    BALL.y = 0
    BALL.vy = -BALL.vy
  }
  // ball bounce, bottom
  else if (BALL.y + BALL.height > CANVAS.height) {
    BALL.y = CANVAS.height - BALL.height
    BALL.vy = -BALL.vy
  }

  // lose on left or right edge
  if (BALL.x < 0 || BALL.x + BALL.width > CANVAS.width)
    loseGame()

  // bounce off player paddle
  if (BALL.x < PLAYER1.width
   && BALL.y + BALL.height > PLAYER1.y
   && BALL.y < PLAYER1.y + PLAYER1.height) {
    BALL.x = PLAYER1.width
    BALL.vx = -BALL.vx
    if (BALL.y < PLAYER1.y)
      BALL.vy = BALL_SPEED * (BALL.y - PLAYER1.y) / BALL_SIZE
    else if (BALL.y + BALL.height > PLAYER1.y + PLAYER1.height)
      BALL.vy = BALL_SPEED * (BALL.y + BALL.height - PLAYER1.y - PLAYER1.height) / BALL_SIZE
  }

  // bounce off AI paddle
  if (BALL.x + BALL.width > CANVAS.width - PLAYER2.width
   && BALL.y + BALL.height > PLAYER2.y
   && BALL.y < PLAYER2.y + PLAYER2.height) {
    BALL.x = CANVAS.width - PLAYER2.width - BALL.width
    BALL.vx = -BALL.vx
    if (BALL.y < PLAYER2.y)
      BALL.vy = BALL_SPEED * (BALL.y - PLAYER2.y) / BALL_SIZE
    else if (BALL.y + BALL.height > PLAYER2.y + PLAYER2.height)
      BALL.vy = BALL_SPEED * (BALL.y + BALL.height - PLAYER2.y - PLAYER2.height) / BALL_SIZE
  }
}
