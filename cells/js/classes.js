/**** Classes ****/
function Player(goodGuy) {
  this.name = "unnamed"
  this.x = this.y = 0
  this.vx = this.vy = 0
  this.color = goodGuy ? "green" : "red"
  this.radius = 0
}

function Food() {
  this.color = FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)]
}
