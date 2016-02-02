// available functions: startGame(), pauseGame(), unpauseGame(),
// togglePause(), resetGame(), jump()

//Called when the space key is pressed
function spaceKeyPressed(){
jump()
}

//Called when the enter key is pressed
function enterKeyPressed(){
  startGame()
}

//Called when the r key is pressed
function rKeyPressed(){
  resetGame()
}

//Called when the p key is pressed
function pKeyPressed(){
  togglePause()
}
