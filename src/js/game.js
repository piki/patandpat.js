/**** Globals ****/
var player;
var gameState;
var keyQueue;
var obstacleList;
var gameLoopId;


/**** Settings ****/
var frameLength = 500;
var canvasSize = {
  width: 800,
  height: 450
};
var colors = {
  screenBackground: "#FFFFFF",
  player: "red"
};


/**** Resources ****/
var images = {
  playerStanding: { src: "images/player-standing.png"} 
};


/**** Classes ****/
function GameState(){
  this.isLoss = false;
}

function Player(){
  this.x = 0;
  this.y = 0;
  this.width = 40;
  this.height = 60;
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
  for (var key in images) {
    if (!images.hasOwnProperty(key)) continue;
    imageCount++;
    console.info("loading "+key);
    images[key].data = new Image();
    images[key].data.addEventListener("load", function() {
      loaded++;
      console.info("loaded "+key+" "+loaded+"/"+imageCount);
      if (loaded == imageCount) {
        if (finished != null) { finished() }
      }
      else {
        if (progress != null) { progress(loaded * 1.0 / imageCount) }
      }
    })
    images[key].data.src = images[key].src
  }
}


/**** Control Functions ****/
function loadGame(){
  gameState = new GameState();
  player = new Player();
  keyQueue = new KeyQueue();
  obstacleList = new ObstacleList();
  loadImages(function(n) { console.info(n) }, startGame)
}

function startGame(){
  console.log("starting game...");
  gameLoopId = window.setInterval(gameTick, frameLength);
}

function endGame(){
  console.log("ending game...");
}


/**** Game Loop Functions ****/
function gameTick(){
  console.log("game tick...");
  handleKeys();
  updateState();
  draw();
}

function handleKeys(){
}

function updateState(){
}

function draw(){
  var canvas = document.getElementById("game-screen");
  var context = canvas.getContext("2d");

  //draw background
  context.beginPath();
  context.fillStyle = colors.screenBackground;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.closePath();

  //draw player
  context.drawImage(
      images["playerStanding"].data,
      player.x,
      canvas.height - (player.y + player.height),
      player.width,
      player.height);
}

loadGame();
