/**** Utility Functions ****/
function loadImages(progress, finished) {
  var loaded = 0
  var imageCount = 0
  for (var key in IMAGES) {
    if (!IMAGES.hasOwnProperty(key)) continue;
    imageCount++;
    console.info("loading "+key);
    IMAGES[key].data = new Image();
    IMAGES[key].data.addEventListener("load", function() {
      loaded++;
      console.info("loaded "+key+" "+loaded+"/"+imageCount);
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
  CANVAS.width=400;
  CANVAS.height=225;
  CANVAS.style.width = "400px";
  CANVAS.style.height = "225px";
}

function hitBoxesOverlapping(hitBox1, hitBox2) {
  return (hitBox1.x < hitBox2.x + hitBox2.width &&
          hitBox1.x + hitBox1.width > hitBox2.x &&
          hitBox1.y < hitBox2.y + hitBox2.height &&
          hitBox1.y + hitBox1.height > hitBox2.y)
}

/**** Event Functions ****/

function keyPressed(event){
  //get the key that was pressed
  var key = String.fromCharCode(event.keyCode || event.charCode);

  //If the game is loaded (but not started), start the game
  if(GAME_STATE == "loaded"){
    if(key == ' ')
      startGame();
    if(key == 'p')
      pauseGame();
  } else if(GAME_STATE == "lost"){
    if(key == ' '){
      resetGame();
      startGame();
    }
  } else if(GAME_STATE == "paused"){
    if(key == 'p')
      startGame();
  } else {
    KEY_QUEUE.push(key);
  }
}

/**** Character Functions ****/

function jump(){
  if(PLAYER.y == 0)
    PLAYER.yVelocity = PLAYER_JUMP;
}
