/**** Game Status Functions ****/
function loadGame(){
  window.addEventListener("keypress", keyPressed, false)
  window.addEventListener("keydown", keyDown, false)
  window.addEventListener("keyup", keyUp, false)
  CANVAS = document.getElementById("game-screen")
  fixCanvas()
  loadScores()
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
  SCORE = 0
  PLAYER = new Player()
  KEY_QUEUE = []
  VIEWPORT_X = 0
  SPEEDUP = 1.0
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
  crashSound.play()

  HIGH_SCORES.push(SCORE)
  HIGH_SCORES.sort(REVERSE_NUMERICAL)
  if (HIGH_SCORES.length > 5) {
    HIGH_SCORES.pop()
  }
  saveScores()
}

loadImages(function(n) { console.info(n) }, loadGame)
