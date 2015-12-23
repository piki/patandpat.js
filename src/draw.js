function draw() {
  var ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  player.draw(canvas)
  for (var i=0; i<obstacles.length; i++) {
    ctx.drawImage(images["obstacle"].data,
                  SCALE*obstacles[i].x,
                  canvas.height - SCALE*(obstacles[i].y + obstacles[i].HEIGHT),
                  SCALE*obstacles[i].WIDTH,
                  SCALE*obstacles[i].HEIGHT)
  }

  if (ended) {
    var ctx = canvas.getContext("2d")
    var str = "GAME OVER"
    ctx.font = "30px Arial"
    ctx.fillStyle = "rgb(255,0,0)"
    ctx.strokeStyle = "rgb(255,0,0)"
    var dim = ctx.measureText(str)
    ctx.fillText(str, canvas.width/2-dim.width/2, canvas.height/2)
  }
}
