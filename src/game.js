function handleKey(ch) {
  if (ch == ' ') {
    player.jump()
  }
  if (ch == 'p') {
    togglePause()
  }
}

function tick() {
  handleEvents()
  if (!paused) handleUpdates()
  draw()
}

function handleEvents() {
  for (var i=0; i<keyQueue.length; i++) {
    handleKey(keyQueue[i])
  }
  keyQueue = []
}

function togglePause() {
  paused = !paused
}

function keyPressed(ev) {
  var ch = String.fromCharCode(ev.keyCode || ev.charCode)
  if (ended) {
    if (ch == ' ') {
      startGame()
    }
  }
  else {
    keyQueue.push(ch)
  }
}

var myInterval
function startGame() {
  ended = paused = false
  obstacles = []
  player.y = player.vy = 0
  myInterval = window.setInterval(tick, 1000.0/FPS)
  window.addEventListener("keypress", keyPressed, false)
}

function endGame() {
  ended = true

  window.clearInterval(myInterval)
}

loadImages(function(n) { console.info(n) }, startGame)
