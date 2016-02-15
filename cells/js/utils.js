function fixCanvas() {
  CANVAS.width = window.innerWidth
  CANVAS.height = window.innerHeight
}

function keyDown(e){
  //If the game is loaded (but not started), start the game
  if(netReady()) {
    KEY_QUEUE.push(e.keyCode)
  }
  return false
}

function keyUp(e){
  if(netReady()) {
    KEY_QUEUE.push(-e.keyCode)
  }
  return false
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
