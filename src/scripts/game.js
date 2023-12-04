import InputHandler from "./input.js";
import Snake from "./snake.js"

import Pause from "../screens/pause.js";
import Menu from "../screens/menu.js";
import GameOver from "../screens/gameOver.js";
// import GameComplete from "./screens/complete";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  COMPLETE: 4
}

export default class Game {
  constructor(gameWidth, gameHeigh, squareUnit) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeigh
    this.squareUnit = squareUnit

    this.gameState = GAMESTATE.MENU
    this.gameObjects = []
    // this.sound = document.getElementById('theme');
    // this.sound.volume = 0.2;

    this.snake = new Snake(this);
    this.pause = new Pause(this);
    this.menu = new Menu(this);
    this.gameOver = new GameOver(this);
    // this.gameComplete = new GameComplete(this);

    new InputHandler(this);
  }

  start() {
    this.gameObjects = [this.snake]

    console.log("start")

    this.gameState = GAMESTATE.RUNNING
    // this.sound.play();
  }

  update(deltaTime) {
    if(this.gameState !== GAMESTATE.RUNNING) return

    this.gameObjects.forEach(object => object.update(deltaTime))

    // this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
  }

  draw(ctx) {
    // Draw the arena
    ctx.fillStyle = "#383838"
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)
    ctx.lineWidth = 1
    ctx.strokeStyle = "#AAA"

    for (let x = 0; x < this.gameWidth; x += this.squareUnit) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, this.gameHeight)
      ctx.stroke()
    }
    for (let y = 0; y < this.gameHeight; y += this.squareUnit) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(this.gameWidth, y)
      ctx.stroke()
    }

    if (this.gameState === GAMESTATE.PAUSED) {
      this.pause.draw(ctx);
      return
    }

    if (this.gameState === GAMESTATE.MENU) {
      this.menu.draw(ctx);
      return
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.gameOver.draw(ctx);
      return
    }

    if (this.gameState === GAMESTATE.COMPLETE) {
      // this.gameComplete.draw(ctx);
    }

    this.gameObjects.forEach(object => object.draw(ctx))
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      // this.sound.play()
      this.gameState = GAMESTATE.RUNNING;
    } else {
      // this.sound.pause()
      this.gameState = GAMESTATE.PAUSED
    }
  }
}