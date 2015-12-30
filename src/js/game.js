/**** Globals ****/
var PLAYER;
var GAME_STATE;
var KEY_QUEUE;
var OBSTACLE_LIST;
var GAME_LOOP;
var GAME_STATE;
var CANVAS;


/**** Settings ****/
var FPS = 30;
var SCREEN_BACKGROUND = "#FFFFFF";
var OBSTACLE_COLOR = "red";
var DEFAULT_MOVEMENT = 5;
var PLAYER_OFFSET = 80;
var GRAVITY = 12 * 9.8;
var PLAYER_JUMP = 100;
var JUMP_MOD = 3.0;


/**** Resources ****/
var IMAGES = {
  playerStanding: { src: "images/player-standing.png"},
  playerWalking1: { src: "images/player-walking-1.png"},
  playerWalking2: { src: "images/player-walking-2.png"},
  playerWalking3: { src: "images/player-walking-3.png"},
  playerWalking4: { src: "images/player-walking-4.png"},
  playerWalking5: { src: "images/player-walking-5.png"},
  playerWalking6: { src: "images/player-walking-6.png"},
  playerJumping:  { src: "images/player-jumping.png"},
};
var WALK_CYCLE = [
  IMAGES.playerWalking1,
  IMAGES.playerWalking2,
  IMAGES.playerWalking3,
  IMAGES.playerWalking4,
  IMAGES.playerWalking5,
  IMAGES.playerWalking6
];


/**** Classes ****/
function GameState(){
  this.isLoss = false;
}

function Player(){
  this.x = 0;
  this.y = 0;
  this.yVelocity = 0;
  this.width = 20;
  this.height = 30;
  this.walkFrame = 0;
}

function Obstacle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}


/**** Utility Functions ****/
function loadImages(progress, finished) {
  var loaded = 0
  var imageCount = 0
  for (var key in IMAGES) {
    if (!IMAGES.hasOwnProperty(key)) continue;
    imageCount++;
    console.info("loading "+key);
    IMAGES[key].data = new Image();
    IMAGES[key].data.addEventListener("load", function() {
      loaded++;
      console.info("loaded "+key+" "+loaded+"/"+imageCount);
      if (loaded == imageCount) {
        if (finished != null) { finished() }
      }
      else {
        if (progress != null) { progress(loaded * 1.0 / imageCount) }
      }
    })
    IMAGES[key].data.src = IMAGES[key].src
  }
}


/**** Control Functions ****/
function loadGame(){
  GAME_STATE = "loaded";
  PLAYER = new Player();
  KEY_QUEUE = [];
  OBSTACLE_LIST = [];
  window.addEventListener("keypress", keyPressed, false);
  CANVAS = document.getElementById("game-screen");
  draw(CANVAS);
}

function startGame(){
  GAME_STATE = "started";
  console.log("starting game...");
  GAME_LOOP = window.setInterval(gameTick, 1000/FPS);
}


function pauseGame(){
  GAME_STATE = "paused";
  console.log("game paused");
}

function loseGame(){
  GAME_STATE = "lost";
  console.log("ending game...");
}



/**** Event Functions ****/

function keyPressed(event){
  //get the key that was pressed
  var key = String.fromCharCode(event.keyCode || event.charCode);

  //If the game is loaded (but not started), start the game
  if(GAME_STATE == "loaded"){
    if(key == ' ')
      startGame();
  } else {
    KEY_QUEUE.push(key);
  }
}

function spacePressed(){
  if(PLAYER.y == 0)
    PLAYER.yVelocity = PLAYER_JUMP;

}

/**** Game Loop Functions ****/
function gameTick(){
  console.log("game tick...");
  handleKeys();
  updateGame(CANVAS);
  draw(CANVAS);
}

function handleKeys(){
  //while there are keys in the queue
  while(KEY_QUEUE.length > 0){
    var key = KEY_QUEUE.shift();
    if(key == ' ')
      spacePressed();
  }
}

function updateGame(canvas){
  //Update player
  PLAYER.x += DEFAULT_MOVEMENT;

  PLAYER.y += PLAYER.yVelocity / FPS;
  PLAYER.yVelocity -= GRAVITY / FPS;
  if (PLAYER.y <= 0) {
    PLAYER.y = 0;
    PLAYER.yVelocity = 0;
  }

  //Select what walking frame we are on
  //Loop back to the start if we're at the end
  if(PLAYER.walkFrame < WALK_CYCLE.length - 1)
    PLAYER.walkFrame++;
  else
    PLAYER.walkFrame = 0;

  //Update Obstacle if it has gone off screen
  if(currentObstacle.x - PLAYER.x + 30  < 0)
    currentObstacle.x = PLAYER.x + canvas.width ; 
  
}


var currentObstacle = {
  x: 200
}

function draw(canvas){
  var context = canvas.getContext("2d");
  //draw background
  context.beginPath();
  context.fillStyle = SCREEN_BACKGROUND;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.closePath();

  //draw player
  var playerImage;
  //if the player is not on the ground, use the jumping image
  if(PLAYER.y > 0)
    playerImage = IMAGES.playerJumping.data;
  else
    playerImage = WALK_CYCLE[PLAYER.walkFrame].data
  //player is always drawn in the center of the screen horizontally
  context.drawImage(
      playerImage,
      PLAYER_OFFSET,
      canvas.height - (PLAYER.y + PLAYER.height),
      PLAYER.width,
      PLAYER.height);

  //Draw Obstacles
  var obstacleHeight = 30;
  var obstacleWidth = 30;
  context.beginPath();
  context.fillStyle = OBSTACLE_COLOR;
  context.fillRect(
      currentObstacle.x - PLAYER.x, 
      canvas.height - obstacleHeight, 
      obstacleWidth, 
      obstacleHeight);
  context.closePath();

}

loadImages(function(n) { console.info(n) }, loadGame)
