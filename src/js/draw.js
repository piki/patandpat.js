function draw(canvas){
  var context = canvas.getContext("2d")
  //draw background
  context.beginPath()
  context.fillStyle = SCREEN_BACKGROUND
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.closePath()



  //draw player
  var playerImage
  //if the player is not on the ground, use the jumping image
  if(PLAYER.y > 0)
    playerImage = IMAGES.playerJumping.data
  else
    playerImage = WALK_CYCLE[Math.floor(PLAYER.walkFrame / FRAMES_PER_SPRITE)].data
  //player is always drawn in the center of the screen horizontally
  context.drawImage(
      playerImage,
      PLAYER.x - VIEWPORT_X,
      canvas.height - (PLAYER.y + PLAYER.height),
      PLAYER.width,
      PLAYER.height)

  //Draw Obstacles
  context.beginPath()
  context.fillStyle = OBSTACLE_COLOR
  context.fillRect(
      currentObstacle.x - VIEWPORT_X,
      canvas.height - currentObstacle.height - currentObstacle.y, 
      currentObstacle.width, 
      currentObstacle.height)
  context.closePath()

  //what to say when we just lost
  if(GAME_STATE == "lost"){
    context.font = "30px Arial"
    context.fillStyle = "red"
    context.fillText("GAME OVER, Press R", 47, 112)
  }

  //what to say when the game is paused
  if(GAME_STATE == "paused"){
    context.font = "30px Arial"
    context.fillStyle = "green"
    context.fillText("Push P to resume", 80, 30)
  }

  //what to say when the game has just been loaded
  if(GAME_STATE == "loaded"){
    context.font = "20px Arial"
    context.fillStyle = "dimgray"
    context.fillText("Press Enter to Start", 109, 92)
  }

  context.font = "20px Arial"
  context.fillStyle = "dimgray"
  context.fillText(SCORE, 10, 30)
}


