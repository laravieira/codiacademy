class Game {
    static GRID = 20;
    static SIZE = 3;
    static COLOR_BLUE = '#2980B9';
    static COLOR_GREEN = '#00F102';

    snake = [];
    position = { x: 10, y: 10 };
    velocity = { x: 0, y: 0 };
    food = { x: 15, y: 15 };

    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
    }

    renderGround() {
        this.context.fillStyle = Game.COLOR_BLUE;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderSnake() {
        this.context.fillStyle = Game.COLOR_GREEN;
        for(let i = 0; i < this.snake.length; i++) {
            this.context.fillRect(
                this.snake[i].x * Game.GRID,
                this.snake[i].y * Game.GRID,
                Game.GRID-1,
                Game.GRID-1
            );
        }
    }

    update() {
        this.renderGround();
        this.renderSnake();

        this.snake[0] = ({
            x: this.position.x,
            y: this.position.y
        });
    }
}

function init() {
    const game = new Game();
    setInterval(game.update.bind(game), 100);
    window.game = game;
}

window.onload = init;