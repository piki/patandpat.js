function collided(obj1, obj2) {
  r1 = obj1.bounds()
  r2 = obj2.bounds()
  return (r1.x < r2.x + r2.w &&
          r1.x + r1.w > r2.x &&
          r1.y < r2.y + r2.h &&
          r1.y + r1.h > r2.y)
}

function handleUpdates() {
  player.tick()
  var maxx = 0
  for (var i=0; i<obstacles.length; i++) {
    obstacles[i].x -= OBSTACLE_SPEED / FPS
    if (obstacles[i].x + obstacles[i].WIDTH < 0) {
      var v = obstacles.pop()
      if (i < obstacles.length) {
        obstacles[i] = v
      }
      i--;
    }
    else {
      if (collided(player, obstacles[i])) {
        endGame()
        break
      }
      if (obstacles[i].x > maxx) {
        maxx = obstacles[i].x
      }
    }
  }
  if (maxx*SCALE < canvas.width*2/3) {
    obstacles.push(newObstacle(canvas.width / SCALE + Math.random()*4))
  }
}

function newObstacle(x) {
  return {
    x: x,
    y: 0,
    WIDTH: 1,
    HEIGHT: 1,
    bounds: function() { return { x: this.x, y: this.y, w: this.WIDTH, h: this.HEIGHT } }
  }
}
