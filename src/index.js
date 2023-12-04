import Game from "./scripts/game.js"

let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const GAME_WIDTH = 500
const GAME_HEIGHT = 500
const SQUARE_UNIT = 20

const game = new Game(GAME_WIDTH, GAME_HEIGHT, SQUARE_UNIT)

let lastTime = 0
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime
  lastTime = timeStamp

  // Clear the canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

  game.update(deltaTime)
  game.draw(ctx)

  drawSnake()

  // Canvas Loop I supose
  requestAnimationFrame(gameLoop)
}

function drawSnake() {
  ctx.fillStyle = "#3c822e"
  ctx.fillRect(SQUARE_UNIT * 7, SQUARE_UNIT * 3, SQUARE_UNIT * 4, SQUARE_UNIT)
}

requestAnimationFrame(gameLoop)