/**** Classes ****/
function Player(name, x, y, color) {
  this.name = name
  this.x = x
  this.y = y
  this.vx = this.vy = 0
  this.color = color
  this.radius = STARTING_RADIUS
  this.reset = function() {
    this.x = WORLD_W * Math.random()
    this.y = WORLD_H * Math.random()
    this.radius = AI_MIN_RADIUS + Math.random() * (AI_MAX_RADIUS - AI_MIN_RADIUS)
  }
}

function Food() {
  this.radius = FOOD_RADIUS
  this.reset = function() {
    this.x = WORLD_W * Math.random()
    this.y = WORLD_H * Math.random()
    this.color = FOOD_COLORS[Math.floor(Math.random() * FOOD_COLORS.length)]
  }
  this.reset()
}
