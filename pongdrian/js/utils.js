//make the canvas at half resolution
function fixCanvas(){
  CANVAS.width=480
  CANVAS.height=360
  CANVAS.style.width = "480px"
  CANVAS.style.height = "360px"
}

function keyDown(e){
  //If the game is loaded (but not started), start the game
  if(GAME_STATE == "running"){
    KEY_QUEUE.push(e.keyCode)
  }
  return false
}

function keyUp(e){
  if(GAME_STATE == "running"){
    KEY_QUEUE.push(-e.keyCode)
  }
  return false
}

function keyPressed(e){
  if (GAME_STATE != "running" && e.charCode == 32) {  // space bar
    startGame()
  }
  return false
}

function mouseDown(e){
  if (GAME_STATE != "running") {
    startGame()
    return
  }
  if (e.offsetY < PLAYER1.y)
    PLAYER1.vy = -PADDLE_SPEED
  else if (e.offsetY > PLAYER1.y + PLAYER1.height)
    PLAYER1.vy = PADDLE_SPEED
}

function mouseUp(e){
  PLAYER1.vy = 0
}

function touchStart(e){
  if (GAME_STATE != "running") {
    startGame()
    return
  }
  var y = e.touches[0].screenY - 100
  if (y < PLAYER1.y)
    PLAYER1.vy = -PADDLE_SPEED
  else if (y > PLAYER1.y + PLAYER1.height)
    PLAYER1.vy = PADDLE_SPEED
}

function touchEnd(e){
  PLAYER1.vy = 0
}
