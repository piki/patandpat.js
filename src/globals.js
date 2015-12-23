var canvas = document.getElementById("mainCanvas")
var FPS = 30
var GRAVITY = 9.8
var SCALE = 60   // 640x480 => 10.7 x 8 meters
var OBSTACLE_SPEED = 3
var keyQueue = []
var obstacles = []
var paused = false, ended = false
var images = {
  "player":{ "src":"Melissa_Stand_R.png" },
  "obstacle":{ "src":"Block_Caution_Red.png" },
}

function loadImages(progress, finished) {
  var loaded = 0
  var imageCount = 0
  for (var key in images) {
    if (!images.hasOwnProperty(key)) continue;
    imageCount++
    console.info("loading "+key)
    images[key].data = new Image();
    images[key].data.addEventListener("load", function() {
      loaded++
      console.info("loaded "+key+" "+loaded+"/"+imageCount)
      if (loaded == imageCount) {
        if (finished != null) { finished() }
      }
      else {
        if (progress != null) { progress(loaded * 1.0 / imageCount) }
      }
    })
    images[key].data.src = images[key].src
  }
}
