/**** Game Loop Functions ****/
function gameTick(){
  handleKeys();
  updateGame(CANVAS);
  draw(CANVAS);
}

function handleKeys(){
  //while there are keys in the queue
  while(KEY_QUEUE.length > 0){
    var key = KEY_QUEUE.shift();
    if(key == ' ')
      spaceKeyPressed();
  }
}

function updateGame(canvas){

  //See if the player is hitting the obstacle
  obstacleHitbox = {
    x: currentObstacle.x - PLAYER_OFFSET,
    y: currentObstacle.y,
    width: currentObstacle.width,
    height: currentObstacle.height
  };

  //don't update anything else, we're done
  if(hitBoxesOverlapping(PLAYER, obstacleHitbox)){
    console.log('player hit box');
    loseGame();
    return;
  }

  //Update player's x  position based on FPS
  PLAYER.x += PLAYER_SPEED / FPS;

  //calculate the player's new y position and velocity
  PLAYER.y += PLAYER.yVelocity / FPS;
  PLAYER.yVelocity -= GRAVITY / FPS;
  if (PLAYER.y <= 0) {
    PLAYER.y = 0;
    PLAYER.yVelocity = 0;
  }

  //Select what walking frame we are on
  //Loop back to the start if we're at the end
  if(PLAYER.walkFrame < WALK_CYCLE.length - 1)
    PLAYER.walkFrame++;
  else
    PLAYER.walkFrame = 0;

  //Update Obstacle if it has gone off screen
  if(currentObstacle.x - PLAYER.x + 30  < 0)
    currentObstacle.x = PLAYER.x + canvas.width ; 

}

