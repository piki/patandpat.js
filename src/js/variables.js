/**** Globals ****/
var PLAYER;
var GAME_STATE;
var KEY_QUEUE;
var OBSTACLE_LIST;
var GAME_LOOP;
var GAME_STATE;
var CANVAS;
var currentObstacle;


/**** Settings ****/
var FPS = 15;
var SCREEN_BACKGROUND = "#FFFFFF";
var OBSTACLE_COLOR = "red";
// How far the player should go in a second
var PLAYER_SPEED = 60;
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
