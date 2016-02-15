/**** Game Status Functions ****/
function loadGame(){
  window.addEventListener("keydown", keyDown, false)
  window.addEventListener("keyup", keyUp, false)
  CANVAS = document.getElementById("game-screen")
  fixCanvas()
  draw(CANVAS)
}

function startGame(){
  GAME_LOOP = window.setInterval(gameTick, 1000/FPS)
  console.log("game started")
}

function stopGame(){
  window.clearInterval(GAME_LOOP)
  draw(CANVAS)
}

loadGame()
