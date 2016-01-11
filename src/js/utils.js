/**** Utility Functions ****/
function loadImages(progress, finished) {
  var loaded = 0
  var imageCount = 0
  for (var key in IMAGES) {
    if (!IMAGES.hasOwnProperty(key)) continue
    imageCount++
    console.info("loading "+key)
    IMAGES[key].data = new Image()
    IMAGES[key].data.addEventListener("load", function() {
      loaded++
      console.info("loaded "+key+" "+loaded+"/"+imageCount)
      if (loaded == imageCount) {
        if (finished != null) { finished() }
      }
      else {
        if (progress != null) { progress(loaded * 1.0 / imageCount) }
      }
    })
    IMAGES[key].data.src = IMAGES[key].src
  }
}

//make the canvas at half resolution
function fixCanvas(){
  CANVAS.width=400
  CANVAS.height=225
  CANVAS.style.width = "400px"
  CANVAS.style.height = "225px"
}

function hitBoxesOverlapping(hitBox1, hitBox2) {
  return (hitBox1.x < hitBox2.x + hitBox2.width &&
          hitBox1.x + hitBox1.width > hitBox2.x &&
          hitBox1.y < hitBox2.y + hitBox2.height &&
          hitBox1.y + hitBox1.height > hitBox2.y)
}

function passedOver(hitBox1, hitBox2) {
  var box2right = hitBox2.x + hitBox2.width
  if (hitBox1.x < box2right && hitBox1.x + PLAYER_SPEED/FPS >= box2right)
    return true
  else
    return false
}

function makeNewCoin(canvas){
  currentCoin.x = PLAYER.x + canvas.width * (1+Math.random())
  currentCoin.y = 75 + 75 * Math.random()
}

/**** Event Functions ****/

function keyPressed(event){
  //get the key that was pressed
  var key = String.fromCharCode(event.keyCode || event.charCode)

  //If the game is loaded (but not started), start the game
  if(GAME_STATE == "running"){
    KEY_QUEUE.push(key)
  } else {
    if(key == ' '){
      spaceKeyPressed()
    }
    //Here we use keycode for the enter key
    if(event.keyCode == 13){
      enterKeyPressed()
    }
    if(key == 'p'){
      pKeyPressed()
    }
    if(key == 'r'){
      rKeyPressed()
    }
  }
}

/**** Character Functions ****/

function jump(){
  if(PLAYER.y == 0)
    PLAYER.yVelocity = PLAYER_JUMP
}
