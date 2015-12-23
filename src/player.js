var player = {
  x: 2,
  y: 0,
  vy: 0,
  HEIGHT: 1,
  WIDTH: 1,
  JUMP_SPEED: 6,
  draw: function(canvas) {
    var ctx = canvas.getContext("2d")
    ctx.drawImage(images["player"].data,
                  SCALE*this.x,
                  canvas.height - SCALE*(this.y + this.HEIGHT),
                  SCALE*this.WIDTH,
                  SCALE*this.HEIGHT)
  },
  jump: function() {
    if (this.y == 0) {
      this.vy = this.JUMP_SPEED
    }
  },
  tick: function() {
    this.y += 1.0 * this.vy / FPS
    this.vy -= GRAVITY / FPS
    if (this.y <= 0) {
      this.y = 0
      this.vy = 0
    }
  },
  bounds: function() {
    return { x: this.x+this.WIDTH/3.0, y: this.y, w: this.WIDTH/2, h: this.HEIGHT }
  }
}
