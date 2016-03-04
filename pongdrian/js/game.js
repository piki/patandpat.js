/**** Game Status Functions ****/
function loadGame(){
  window.addEventListener("keypress", keyPressed, false)
  window.addEventListener("keydown", keyDown, false)
  window.addEventListener("keyup", keyUp, false)
  window.addEventListener("touchstart", touchStart, false)
  window.addEventListener("touchend", touchEnd, false)
  CANVAS = document.getElementById("game-screen")
  CANVAS.addEventListener("mousedown", mouseDown, false)
  CANVAS.addEventListener("mouseup", mouseUp, false)
  fixCanvas()
  resetGame()
}

function startGame(){
  if(GAME_STATE == "running")
    return
  GAME_STATE = "running"
  KEY_QUEUE = []
  GAME_LOOP = window.setInterval(gameTick, 1000/FPS)
  console.log("game started")
}

function resetGame(){
  window.clearInterval(GAME_LOOP)
  GAME_STATE = "loaded"
  PLAYER1 = new Paddle(true)
  PLAYER2 = new Paddle(false)
  BALL = new Ball()
  KEY_QUEUE = []
  draw(CANVAS)
}

function loseGame(){
  resetGame()
}

loadGame()
