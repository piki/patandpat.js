function draw(canvas){
  var context = canvas.getContext("2d")

  //draw background
  context.fillStyle = BG_COLOR
  context.fillRect(0, 0, canvas.width, canvas.height)

  if (!netReady()) {
    context.font = "20px Arial"
    context.fillStyle = "dimgray"
    context.fillText("Connecting to server", CANVAS.width/2-100, CANVAS.height/2)
    return
  }

  var viewport_x = PLAYER.x - CANVAS.width/2
  var viewport_y = PLAYER.y - CANVAS.height/2
  if (viewport_x < 0)
    viewport_x = 0
  if (viewport_x > WORLD_W - CANVAS.width)
    viewport_x = WORLD_W - CANVAS.width
  if (viewport_y < 0)
    viewport_y = 0
  if (viewport_y > WORLD_H - CANVAS.height)
    viewport_y = WORLD_H - CANVAS.height

  for (var i=0; i<FOOD.length; i++) {
    context.strokeStyle = "black"
    context.fillStyle = FOOD[i].color
    context.beginPath()
    context.arc(FOOD[i].x-viewport_x, FOOD[i].y-viewport_y, FOOD[i].radius, 0, 2*Math.PI)
    context.fill()
    context.stroke()
  }

  drawBall(context, viewport_x, viewport_y, PLAYER)
  for (var i=0; i<AI.length; i++) {
    drawBall(context, viewport_x, viewport_y, AI[i])
  }

  var closest = findClosest(PLAYER, AI, null)
  if (closest != null) {
    var dx = closest.x - PLAYER.x
    var dy = closest.y - PLAYER.y
    var dist = Math.sqrt(dx*dx + dy*dy)
    var x1 = PLAYER.x + dx * (PLAYER.radius+10)/dist
    var y1 = PLAYER.y + dy * (PLAYER.radius+10)/dist
    var x2 = PLAYER.x + dx * (PLAYER.radius+20)/dist
    var y2 = PLAYER.y + dy * (PLAYER.radius+20)/dist
    context.beginPath()
    context.moveTo(x1 - viewport_x, y1 - viewport_y)
    context.lineTo(x2 - viewport_x, y2 - viewport_y)
    context.stroke()
  }
}

function drawBall(context, viewport_x, viewport_y, ball) {
  context.strokeStyle = "black"
  context.fillStyle = ball.color
  context.beginPath()
  context.arc(ball.x-viewport_x, ball.y-viewport_y, ball.radius, 0, 2*Math.PI)
  context.fill()
  context.stroke()
  var fontSize = Math.floor(ball.radius/2)
  context.font = "" + fontSize + "px Arial"
  context.fillStyle = "white"
  var str = ball.name
  var dimensions = context.measureText(str)
  context.fillText(str, ball.x - dimensions.width/2 - viewport_x, ball.y - viewport_y)
  str = "" + Math.floor(ball.radius)
  dimensions = context.measureText(str)
  context.fillText(str, ball.x - dimensions.width/2 - viewport_x, ball.y + fontSize - viewport_y)
}
