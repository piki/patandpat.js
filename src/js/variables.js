/**** Globals ****/
var PLAYER
var GAME_STATE
var KEY_QUEUE
var GAME_LOOP
var GAME_STATE
var CANVAS
var VIEWPORT_X
var currentObstacle
var HIGH_SCORE = 0
var TREE_X = 4
var TREE_SIZE = 120
var TREE_SPACING = 150
var SPEEDUP_MOD = 1.5
var SLOWDOWN_MOD = 0.5
var SPEEDUP = 1.0


/**** Settings ****/
var FPS = 60
var FRAMES_PER_SPRITE = 4
var SCREEN_BACKGROUND = "#FFFFFF"
var OBSTACLE_COLOR = "red"
// How far the player should go in a second
var PLAYER_SPEED = 120
var PLAYER_OFFSET = 80
var GRAVITY = 35 * 9.8
var PLAYER_JUMP = 280
var JUMP_MOD = 3.0


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
  coin:           { src: "images/coin.png"},
  hills:          { src: "images/hills.png"},
  tree:           { src: "images/tree.png"},
}
var WALK_CYCLE = [
  IMAGES.playerWalking1,
  IMAGES.playerWalking2,
  IMAGES.playerWalking3,
  IMAGES.playerWalking4,
  IMAGES.playerWalking5,
  IMAGES.playerWalking6
]

var jumpSound = new Audio("sounds/jump.wav")
var crashSound = new Audio("sounds/pacman.wav")
