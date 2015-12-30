/**** Globals ****/
var PLAYER;
var GAME_STATE;
var KEY_QUEUE;
var OBSTACLE_LIST;
var GAME_LOOP;


/**** Settings ****/
var FPS = 10;
var SCREEN_BACKGROUND = "#FFFFFF";
var OBSTACLE_COLOR = "red";
var DEFAULT_MOVEMENT = 5;
var PLAYER_OFFSET = 80;


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
  this.width = 20;
  this.height = 30;
  this.walkFrame = 0;
}

function KeyQueue(){
  this.queue = [];
}

function ObstacleList(){
  this.list = [
    new Obstacle(50, 0, 5, 5)
  ];
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
  GAME_STATE = new GameState();
  PLAYER = new Player();
  KEY_QUEUE = new KeyQueue();
  OBSTACLE_LIST = new ObstacleList();
  loadImages(function(n) { console.info(n) }, startGame)
}

function startGame(){
  console.log("starting game...");
  GAME_LOOP = window.setInterval(gameTick, 1000/FPS);
}

function endGame(){
  console.log("ending game...");
}


/**** Game Loop Functions ****/
function gameTick(){
  console.log("game tick...");
  handleKeys();
  updateGame();
  draw();
}

function handleKeys(){
}

function updateGame(){
  //Update player
  PLAYER.x += DEFAULT_MOVEMENT;

  //Select what walking frame we are on
  //Loop back to the start if we're at the end
  if(PLAYER.walkFrame < WALK_CYCLE.length - 1)
    PLAYER.walkFrame++;
  else
    PLAYER.walkFrame = 0;
  

  
}


var currentObstacle = {
  x: 200
}
function draw(){
  var canvas = document.getElementById("game-screen");
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

loadGame();
