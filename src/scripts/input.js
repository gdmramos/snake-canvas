export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case 'ArrowRight':
          if (game.snake.direction != "left")
            game.snake.direction = "right";
          break;
        case 'ArrowDown':
          if (game.snake.direction != "up")
            game.snake.direction = "down";
          break;
        case 'ArrowLeft':
          if (game.snake.direction != "right")
            game.snake.direction = "left";
          break;
        case 'ArrowUp':
          if (game.snake.direction != "down")
            game.snake.direction = "up";
          break;
        case 'Escape':
          game.togglePause();
          break;
        case 'Space':
          if (game.gameState === 2) game.start();
          break;
        case 'KeyR':
          if (game.gameState === 3) game.start();
          break;
        default:
          break;
      }
    });
  }
}