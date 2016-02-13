function fixCanvas() {
  CANVAS.width = window.innerWidth
  CANVAS.height = window.innerHeight
}

function keyDown(e){
  //If the game is loaded (but not started), start the game
  if(GAME_STATE == "running"){
    KEY_QUEUE.push(e.keyCode)
  }
  return false
}

function keyUp(e){
  if(GAME_STATE == "running"){
    KEY_QUEUE.push(-e.keyCode)
  }
  return false
}

function keyPressed(e){
  if (GAME_STATE != "running" && e.charCode == 32) {  // space bar
    startGame()
  }
  return false
}

function mouseDown(e){
}

function mouseUp(e){
}

function touchStart(e){
  //var y = e.touches[0].screenY - 100
}

function touchEnd(e){
}

function findClosest(anchor, targets, closest) {
  var closestDist
  for (var i=0; i<targets.length; i++) {
    if (targets[i].radius < anchor.radius) {
      var dx = anchor.x - targets[i].x
      var dy = anchor.y - targets[i].y
      if (closest == null || dx*dx + dy*dy < closestDist) {
        closestDist = dx*dx + dy*dy
        closest = targets[i]
      }
    }
  }
  return closest
}
