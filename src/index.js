import Game from "./scripts/game.js"

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const SQUARE_UNIT = 20

const game = new Game(GAME_WIDTH, GAME_HEIGHT, SQUARE_UNIT)

let delta = 0
let FPS = 5
let then = performance.now()
let interval = 1000 / FPS

function gameLoop(now) {
  requestAnimationFrame(gameLoop)

  delta += now - then

  if(delta > interval) {
    delta = delta % interval
    // Clear the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  
    game.update(delta)
    game.draw(ctx)
  }

  then = now
}

requestAnimationFrame(gameLoop)