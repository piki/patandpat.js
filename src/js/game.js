/**** Game Status Functions ****/
function loadGame(){
  HIGH_SCORE = 0
  window.addEventListener("keypress", keyPressed, false)
  CANVAS = document.getElementById("game-screen")
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
  SCORE = 0
}

function resetGame(){
  window.clearInterval(GAME_LOOP)
  GAME_STATE = "loaded"
  PLAYER = new Player()
  KEY_QUEUE = []
  VIEWPORT_X = 0
  currentObstacle = new Obstacle(400, 0, 30, 60)
  draw(CANVAS)
}

function pauseGame(){
  if(GAME_STATE == "paused")
    return
  GAME_STATE = "paused"
  window.clearInterval(GAME_LOOP)
  console.log("game paused")
}

function togglePause(){
  if(GAME_STATE == "paused")
    startGame()
  else if(GAME_STATE == "running")
    pauseGame()
}

function unpauseGame(){
  if(GAME_STATE == "paused")
    startGame()
}

function loseGame(){
  GAME_STATE = "lost"
  //Stop the game loop
  window.clearInterval(GAME_LOOP)
  draw(CANVAS)
  console.log("ending game")

  if(SCORE > HIGH_SCORE){
    HIGH_SCORE = SCORE
  }
}

loadImages(function(n) { console.info(n) }, loadGame)
