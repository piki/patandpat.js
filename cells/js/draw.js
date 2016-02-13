function draw(canvas){
  var context = canvas.getContext("2d")

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

  //draw background
  context.fillStyle = BG_COLOR
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (var i=0; i<FOOD.length; i++) {
    context.strokeStyle = "black"
    context.fillStyle = FOOD[i].color
    context.beginPath()
    context.arc(FOOD[i].x-viewport_x, FOOD[i].y-viewport_y, FOOD[i].radius, 0, 2*Math.PI)
    context.fill()
    context.stroke()
  }

  context.strokeStyle = "black"
  context.fillStyle = PLAYER.color
  context.beginPath()
  context.arc(PLAYER.x-viewport_x, PLAYER.y-viewport_y, PLAYER.radius, 0, 2*Math.PI)
  context.fill()
  context.stroke()
  context.font = "15px Arial"
  context.fillStyle = "white"
  var str = "piki"
  var dimensions = context.measureText(str)
  context.fillText(str, PLAYER.x - dimensions.width/2 - viewport_x, PLAYER.y - viewport_y)
  str = "" + Math.floor(PLAYER.radius)
  dimensions = context.measureText(str)
  context.fillText(str, PLAYER.x - dimensions.width/2 - viewport_x, PLAYER.y + 15 - viewport_y)

  if (GAME_STATE == "loaded") {
    context.font = "20px Arial"
    context.fillStyle = "dimgray"
    context.fillText("Press space to Start", CANVAS.width/2-100, CANVAS.height/2)
  }
}
