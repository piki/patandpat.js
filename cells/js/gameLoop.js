/**** Game Loop Functions ****/
function gameTick(){
  handleKeys()
  updateGame(CANVAS)
  draw(CANVAS)
}

function handleKeys(){
  //while there are keys in the queue
  while(KEY_QUEUE.length > 0){
    var key = KEY_QUEUE.shift()
    switch (key) {
      case 37:  PLAYER.vx = -1;  break;
      case 38:  PLAYER.vy = -1;  break;
      case 39:  PLAYER.vx =  1;  break;
      case 40:  PLAYER.vy =  1;  break;
      case -37: if (PLAYER.vx == -1) PLAYER.vx = 0; break;
      case -38: if (PLAYER.vy == -1) PLAYER.vy = 0; break;
      case -39: if (PLAYER.vx ==  1) PLAYER.vx = 0; break;
      case -40: if (PLAYER.vy ==  1) PLAYER.vy = 0; break;
    }
  }
}

function moveBall(ball, adjustment) {
  var speed = PLAYER_SPEED / Math.sqrt(ball.radius) * adjustment
  var requestedSpeed = Math.sqrt(ball.vx*ball.vx + ball.vy*ball.vy)
  var vx = ball.vx * speed / requestedSpeed
  var vy = ball.vy * speed / requestedSpeed
  ball.x += vx
  if (ball.x < ball.radius) ball.x = ball.radius
  if (ball.x > WORLD_W - ball.radius) ball.x = WORLD_W - ball.radius
  ball.y += vy
  if (ball.y < ball.radius) ball.y = ball.radius
  if (ball.y > WORLD_H - ball.radius) ball.y = WORLD_H - ball.radius
}

function updateGame(canvas){
  // move player
  if (PLAYER.vx != 0 || PLAYER.vy != 0) {
    moveBall(PLAYER, 1.0)
    netSend("p=" + Math.floor(PLAYER.x) + ","
                 + Math.floor(PLAYER.y) + ","
                 + Math.floor(PLAYER.vx) + ","
                 + Math.floor(PLAYER.vy))
  }

/*
  // move the AIs
  for (var i=0; i<AI.length; i++) {
    var closest = findClosest(AI[i], FOOD, null)
    closest = findClosest(AI[i], AI, closest)
    closest = findClosest(AI[i], [PLAYER], closest)
    if (closest != null) {
      AI[i].vx = closest.x - AI[i].x
      AI[i].vy = closest.y - AI[i].y
      moveBall(AI[i], 0.5)
    }
    else {
      AI[i].vx = AI[i].vy = 0
    }
  }

  // player vs food
  var radsq = PLAYER.radius * PLAYER.radius
  for (var i=0; i<FOOD.length; i++) {
    var dx = PLAYER.x - FOOD[i].x
    var dy = PLAYER.y - FOOD[i].y
    if (dx*dx + dy*dy < radsq) {
      radsq += FOOD_RADIUS * FOOD_RADIUS
      PLAYER.radius = Math.sqrt(radsq)
      FOOD[i].reset()
    }
  }

  for (var i=0; i<AI.length; i++) {
    var airadsq = AI[i].radius * AI[i].radius
    // AI vs food
    for (var j=0; j<FOOD.length; j++) {
      var dx = AI[i].x - FOOD[j].x
      var dy = AI[i].y - FOOD[j].y
      if (dx*dx + dy*dy < airadsq) {
        airadsq += FOOD_RADIUS * FOOD_RADIUS
        AI[i].radius = Math.sqrt(airadsq)
        FOOD[j].reset()
      }
    }

    // AI vs AI
    for (var j=0; j<AI.length; j++) {
      if (i == j || AI[i].radius < AI[j].radius) continue;
      var dx = AI[i].x - AI[j].x
      var dy = AI[i].y - AI[j].y
      if (dx*dx + dy*dy < airadsq) {
        airadsq += AI[j].radius * AI[j].radius
        AI[i].radius = Math.sqrt(airadsq)
        AI[j].reset()
      }
    }

    // player vs AI
    var dx = PLAYER.x - AI[i].x
    var dy = PLAYER.y - AI[i].y
    var dsq = dx*dx + dy*dy
    if (PLAYER.radius > AI[i].radius && dsq < radsq) {
      radsq += AI[i].radius * AI[i].radius
      PLAYER.radius = Math.sqrt(radsq)
      AI[i].reset()
    }
    else if (PLAYER.radius <= AI[i].radius && dsq < AI[i].radius * AI[i].radius) {
      loseGame()
    }
  }
*/
}
