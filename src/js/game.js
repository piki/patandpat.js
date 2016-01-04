/**** Game Status Functions ****/
function loadGame(){
  window.addEventListener("keypress", keyPressed, false);
  CANVAS = document.getElementById("game-screen");
  fixCanvas();
  CANVAS.width=400;
  CANVAS.height=225;
  CANVAS.style.width = 800;
  CANVAS.style.height = 450;
  resetGame();
}

function startGame(){
  GAME_STATE = "started";
  console.log("starting game");
  GAME_LOOP = window.setInterval(gameTick, 1000/FPS);
}

function resetGame(){
  GAME_STATE = "loaded";
  PLAYER = new Player();
  KEY_QUEUE = [];
  OBSTACLE_LIST = [];
  currentObstacle = new Obstacle(200, 0, 10, 30);
  draw(CANVAS);
}

function pauseGame(){
  GAME_STATE = "paused";
  window.clearInterval(GAME_LOOP);
  console.log("game paused");
}

function loseGame(){
  GAME_STATE = "lost";
  window.clearInterval(GAME_LOOP);
  draw(CANVAS);
  console.log("ending game");
}

loadImages(function(n) { console.info(n) }, loadGame)
