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

var obstacleHitbox = { x:0, y:0, width:0, height:0 }

function updateGame(canvas){
  //See if the player is hitting the obstacle
  obstacleHitbox.x = currentObstacle.x - PLAYER_OFFSET
  obstacleHitbox.y = currentObstacle.y
  obstacleHitbox.width = currentObstacle.width
  obstacleHitbox.height = currentObstacle.height

  //don't update anything else, we're done
  if(hitBoxesOverlapping(PLAYER, obstacleHitbox)){
    console.log('player hit box')
    loseGame()
    return
  }

  //Update player's x  position based on FPS
  PLAYER.x += PLAYER_SPEED / FPS

  //calculate the player's new y position and velocity
  PLAYER.y += PLAYER.yVelocity / FPS
  PLAYER.yVelocity -= GRAVITY / FPS
  if (PLAYER.y <= 0) {
    PLAYER.y = 0
    PLAYER.yVelocity = 0
  }

  //Select what walking frame we are on
  //Loop back to the start if we're at the end
  if(PLAYER.walkFrame < FRAMES_PER_SPRITE * WALK_CYCLE.length - 1)
    PLAYER.walkFrame++
  else
    PLAYER.walkFrame = 0

  //Update Obstacle if it has gone off screen
  if(currentObstacle.x - PLAYER.x + 30  < 0)
    currentObstacle.x = PLAYER.x + canvas.width

}

