/**** Game Status Functions ****/
function loadGame(){
  window.addEventListener("keypress", keyPressed, false)
  window.addEventListener("keydown", keyDown, false)
  window.addEventListener("keyup", keyUp, false)
  window.addEventListener("touchstart", touchStart, false)
  window.addEventListener("touchend", touchEnd, false)
  CANVAS = document.getElementById("game-screen")
  fixCanvas()
  CANVAS.addEventListener("mousedown", mouseDown, false)
  CANVAS.addEventListener("mouseup", mouseUp, false)
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
  PLAYER = new Player("piki", Math.random()*WORLD_W, Math.random()*WORLD_H, "red")
  FOOD = []
  for (var i=0; i<FOOD_COUNT; i++) {
    FOOD.push(new Food())
  }
  AI = []
  for (var i=0; i<AI_NAMES.length; i++) {
    var ai = new Player(AI_NAMES[i], Math.random()*WORLD_W, Math.random()*WORLD_H, "purple") 
    ai.reset()
    AI.push(ai)
  }
  KEY_QUEUE = []
  draw(CANVAS)
}

function loseGame(){
  resetGame()
}

loadGame()
