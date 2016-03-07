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
    if(key == ' '){
      spaceKeyPressed()
    }
    if(key == 'p'){
      pKeyPressed()
    }
    if(key == 'r'){
      rKeyPressed()
    }
    if(key == '\r'){
      enterKeyPressed()
    }
  }
}

function updateGame(canvas){
  //See if the player is hitting the obstacle
  if(hitBoxesOverlapping(PLAYER, currentObstacle)){
    console.log('player hit box')
    loseGame()
    //don't update anything else, we're done
    return
  }

  var speedMod = 1.0
  if (rightArrowKeyPressed()) {
    speedMod = SPEEDUP_MOD
  }
  else if (leftArrowKeyPressed()) {
    speedMod = SLOWDOWN_MOD
  }

  //See if the player is jumping over an obstacle
  if(passedOver(PLAYER, currentObstacle)){
    SCORE = SCORE + 1
  }

  //Update player's x  position based on FPS
  PLAYER.x += PLAYER_SPEED * speedMod / FPS
  VIEWPORT_X += PLAYER_SPEED * speedMod / FPS
  
  TREE_X -= PLAYER_SPEED * speedMod / FPS / 2
  if (TREE_X < -TREE_SIZE) {
  	TREE_X += TREE_SPACING
  }

  //calculate the player's new y position and velocity
  PLAYER.y += PLAYER.yVelocity / FPS
  PLAYER.yVelocity -= GRAVITY / FPS
  if (PLAYER.y <= 0) {
    PLAYER.y = 0
    PLAYER.yVelocity = 0
  }

  //Select what walking frame we are on
  //Loop back to the start if we're at the end
  if(PLAYER.walkFrame + speedMod < FRAMES_PER_SPRITE * WALK_CYCLE.length - 1)
    PLAYER.walkFrame += speedMod
  else
    PLAYER.walkFrame = 0

  //Update Obstacle if it has gone off screen
  if(currentObstacle.x + currentObstacle.width < VIEWPORT_X) {
    currentObstacle = getNextObstacle(Math.random())
    currentObstacle.x = PLAYER.x + canvas.width
  }
}
