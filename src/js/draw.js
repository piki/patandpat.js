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
      PLAYER_OFFSET,
      canvas.height - (PLAYER.y + PLAYER.height),
      PLAYER.width,
      PLAYER.height)

  //Draw Obstacles
  context.beginPath()
  context.fillStyle = OBSTACLE_COLOR
  context.fillRect(
      currentObstacle.x - PLAYER.x, 
      canvas.height - currentObstacle.height - currentObstacle.y, 
      currentObstacle.width, 
      currentObstacle.height)
  context.closePath()



  //check to see if the game has been lost
  if(GAME_STATE == "lost"){
    context.beginPath()
    var str = "GAME OVER"
    context.font = "30px Arial"
    context.fillStyle = "rgb(255,0,0)"
    context.strokeStyle = "rgb(255,0,0)"
    var dimensions = context.measureText(str)
    context.fillText(
        str, 
        canvas.width/2 - dimensions.width/2, 
        canvas.height/2)
    context.closePath()
  }
  
  //check to see if the game has been loaded
  if(GAME_STATE == "loaded"){
    context.beginPath()
    var str = "Press Spacebar To Start"
    context.font = "20px Lucida Console"
    context.fillStyle = "#2f2f2f"
    context.strokeStyle = "rgb(255,0,0)"
    var dimensions = context.measureText(str)
    context.fillText(
        str, 
        canvas.width/2 - dimensions.width/2, 
        canvas.height/2)
    context.closePath()
  }
}


