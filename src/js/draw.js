function draw(canvas){
  var context = canvas.getContext("2d")
  //draw background
  context.drawImage(IMAGES.hills.data, 0, 0, canvas.width, canvas.height)
  
  for (var x = TREE_X; x < canvas.width; x += TREE_SPACING) {
    context.drawImage(IMAGES.tree.data, x, canvas.height-TREE_SIZE, TREE_SIZE, TREE_SIZE)
  }

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
    context.fillStyle = "black"
    context.fillText("Press Enter to Start", 59, 92)
    context.fillText("High scores:", 272, 40)
    for (var i=0; i<HIGH_SCORES.length; i++) {
      context.fillText(HIGH_SCORES[i], 317, 60+20*i)
    }

    context.font = "32px Arial"
    context.fillStyle = "red"
    context.fillText("JUMP, RABBIT!", 22, 50)
  }

  //draw the score if the game is running
  if(GAME_STATE == "running" || GAME_STATE == "paused" || GAME_STATE == "lost"){
    context.font = "30px Courier"
    context.fillStyle = "black"
    context.fillText(SCORE, 8, 30)
  }
}


