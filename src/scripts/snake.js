const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down"
}

export default class Snake {
  constructor(game) {
    this.game = game
    this.squareUnit = game.squareUnit
    this.snakeSize = 4
    this.direction = DIRECTIONS.RIGHT

    this.headPosition = {
      x: 10,
      y: 3
    }

    this.snakeBody = []

    this.start()
  }

  draw(ctx) {
    ctx.fillStyle = "#3c822e"
    for (let i = this.snakeSize - 1; i >= 0; i--) {
      ctx.fillRect(this.squareUnit * this.snakeBody[i].x, this.squareUnit * this.snakeBody[i].y, this.squareUnit, this.squareUnit)
    }
  }

  start() {
    for(let i = this.snakeSize - 1; i >= 0; i--) {
      this.snakeBody.push({ x: this.headPosition.x - i, y: this.headPosition.y })
    }
  }

  update(deltaTime) {
    switch (this.direction) {
      case DIRECTIONS.RIGHT:
        this.headPosition.x++
        break;
      case DIRECTIONS.DOWN:
        this.headPosition.y++
        break;
      case DIRECTIONS.LEFT:
        this.headPosition.x--
        break;
      case DIRECTIONS.UP:
        this.headPosition.y--
        break;
      default:
        break;
    }

    if (this.checkBoundaries())
      this.game.gameState = 3

    
    this.snakeBody.push({ x: this.headPosition.x, y: this.headPosition.y })
    this.snakeBody.shift()
  }

  checkBoundaries() {
    let absoluteX = this.headPosition.x * this.squareUnit
    let absoluteY = this.headPosition.y * this.squareUnit

    if (
      absoluteY >= this.game.gameHeight ||
      absoluteY < 0 ||
      absoluteX >= this.game.gameWidth ||
      absoluteX < 0
    ) {
      return true
    }
  }
}