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

function updateGame(canvas){
  if (PLAYER.vx != 0 || PLAYER.vy != 0) {
    var speed = PLAYER_SPEED / Math.sqrt(PLAYER.radius)
    var requestedSpeed = Math.sqrt(PLAYER.vx*PLAYER.vx + PLAYER.vy*PLAYER.vy)
    var vx = PLAYER.vx * speed / requestedSpeed
    var vy = PLAYER.vy * speed / requestedSpeed
    PLAYER.x += vx
    if (PLAYER.x < PLAYER.radius) PLAYER.x = PLAYER.radius
    if (PLAYER.x > WORLD_W - PLAYER.radius) PLAYER.x = WORLD_W - PLAYER.radius
    PLAYER.y += vy
    if (PLAYER.y < PLAYER.radius) PLAYER.y = PLAYER.radius
    if (PLAYER.y > WORLD_H - PLAYER.radius) PLAYER.y = WORLD_H - PLAYER.radius
  }

  var radsq = PLAYER.radius * PLAYER.radius
  for (var i=0; i<FOOD.length; i++) {
    var dx = PLAYER.x - FOOD[i].x
    var dy = PLAYER.y - FOOD[i].y
    if (dx*dx + dy*dy < radsq) {
      FOOD[i].reset()

      var area = radsq
      area += FOOD_RADIUS * FOOD_RADIUS
      PLAYER.radius = Math.sqrt(area)
    }
  }
}
