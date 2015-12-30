/**** Globals ****/
var player;
var gameState;
var keyQueue;
var obstacleList;
var gameLoopId;

/**** Settings ****/
var frameLength = 500;


/**** Classes ****/
function GameState(){
  this.isLoss = false;
}

function Player(){
  this.x = 0;
  this.y = 0;
}

function KeyQueue(){
  this.queue = [];
}

function ObstacleList(){
  this.list = [
    new Obstacle(50, 0, 5, 5)
  ];
}

function Obstacle(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}


/**** Control Functions ****/
function initGame(){
  gameState = new GameState();
  player = new Player();
  keyQueue = new KeyQueue();
  obstacleList = new ObstacleList();
  gameLoopId = window.setInterval(gameTick, frameLength);
}


/**** Game Loop Functions ****/
function gameTick(){
  handleKeys();
  updateState();
  draw();
}

function handleKeys(){
}

function updateState(){
}

function draw(){
}




