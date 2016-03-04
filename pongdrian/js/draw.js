function draw(canvas){
  var context = canvas.getContext("2d")

  //draw background
  context.fillStyle = BG_COLOR
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.strokeStyle = "black"
  context.lineWidth = 5
  context.beginPath()
  drawBox(canvas, context, BALL)
  drawBox(canvas, context, PLAYER1)
  drawBox(canvas, context, PLAYER2)
  context.closePath()
  context.stroke()

  context.fillStyle = BALL_COLOR
  context.fillRect(BALL.x, BALL.y, BALL.width, BALL.height)
  context.strokeRect(BALL.x, BALL.y, BALL.width, BALL.height)

  context.fillStyle = LEFT_COLOR
  context.fillRect(PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.height)
  context.strokeRect(PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.height)

  context.fillStyle = RIGHT_COLOR
  context.fillRect(PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.height)
  context.strokeRect(PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.height)
}

function drawBox(canvas, context, obj) {
  // left
  context.moveTo(obj.x, 0)
  context.lineTo(obj.x, canvas.height)

  // right
  context.moveTo(obj.x + obj.width, 0)
  context.lineTo(obj.x + obj.width, canvas.height)

  // top
  context.moveTo(0, obj.y)
  context.lineTo(canvas.width, obj.y)

  // bottom
  context.moveTo(0, obj.y + obj.height)
  context.lineTo(canvas.width, obj.y + obj.height)
}
