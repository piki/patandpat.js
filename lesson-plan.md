## Jumping and function calls

We'll start with a side-scrolling, endless-runner game in the spirit of
Flappy Bird, Jetpack Joyride, or [Awexome
Cross](http://www.homestarrunner.com/awexome.html).  Only, jumping
functionality will be missing, so the player character will hit the first
obstable and die every time.

We'll introduce explicitly the idea of jumping and event handlers -- the
students will edit an event-handler function that we provide to call a
jump function that we also provide.  Implicitly, we'll also introduce
gravity, a game heartbeat, and a little bit of object-oriented
programming.

We'll start with a crappy jump function -- press a key to jump a fixed
height at a constant vertical velocity.  Time permitting, we can improve
it to simulate gravity (parabolas!) and to allow a longer key press to
result in a higher jump.


## Score keeping and text painting

We'll keep score, by counting time, distance, or the number of obstacles
jumped.  We'll introduce text-painting by having students display the
score on the screen.


## Sprites and random numbers

We'll teach students how to change the player character's appearance.
They'll use Google images or a web-based image editor (TBD) to create a
new graphic for the player character and the obstacles.  They'll create
several different sprites for obstacles and use random numbers to assign
sprites to obstacles.

Time permitting, we can change sprites based on the game heartbeat, to
animate both the player character (running) and the obstacles.


## Persistence, arrays, and sorting

We'll build a top-ten list for high scores.  Each time they end a game,
they will add the score to the array, sort it, and drop the 11th element
(if any).  Time permitting, we'll persist the top ten list as a JSON
string in a cookie.


## Destructible scenery

We will give the player character a weapon capable of destroying at least
some of the obstacles.  Students will be responsible for some of the
function calls -- binding a key to a "player.shoot" function -- and for
removing destroyed obstacles from game state.


## Parallax

We will add backgrounds, first one layer, then two.


## Sound effects

We'll use audio clips or record audio using a web-based sound editor
(TBD).  Students will wire up sound effects to in-game events like jumping
and dying.


## Non-player characters and AI

We'll add a non-player character with some very basic programmatic
behavior.  For example, a bird could fly from left to right (past the
player), avoid obstacles, and drop coins or power-ups of some sort.
Students would be responsible for programming the bird to fly up or down
to avoid obstacles.
