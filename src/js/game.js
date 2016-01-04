/**** Game Status Functions ****/
function loadGame(){
  window.addEventListener("keypress", keyPressed, false)
  CANVAS = document.getElementById("game-screen")
  fixCanvas()
  resetGame()
}

function startGame(){
  GAME_STATE = "running"
  GAME_LOOP = window.setInterval(gameTick, 1000/FPS)
  console.log("game started")
}

function resetGame(){
  GAME_STATE = "loaded"
  PLAYER = new Player()
  KEY_QUEUE = []
  OBSTACLE_LIST = []
  currentObstacle = new Obstacle(400, 0, 30, 60)
  draw(CANVAS)
}

function pauseGame(){
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
  startGame()
}

function loseGame(){
  GAME_STATE = "lost"
  //Stop the game loop
  window.clearInterval(GAME_LOOP)
  draw(CANVAS)
  console.log("ending game")
}

loadImages(function(n) { console.info(n) }, loadGame)
