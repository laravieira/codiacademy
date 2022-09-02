class Game {
    static GRID = 20;
    static COLOR_BLUE = '#2980B9';
    static COLOR_GREEN = '#00F102';

    snake = [];
    position = { x: 10, y: 10 };
    velocity = { x: 0, y: 0 };
    food = { x: 15, y: 15 };
    size = 3;

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

    updateSnake() {
        // keep snake on the visible area
        if(this.position.x < 0)
            this.position.x = Game.GRID - 1;
        if(this.position.x > Game.GRID - 1)
            this.position.x = 0;
        if(this.position.y < 0)
            this.position.y = Game.GRID - 1;
        if(this.position.y > Game.GRID - 1)
            this.position.y = 0;

        // move snake
        this.snake.push({
            x: this.position.x,
            y: this.position.y
        });

        // keep snake's length
        while(this.snake.length > this.size)
            this.snake.shift();

        // set snake's next position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    update() {
        this.updateSnake();
        this.renderGround();
        this.renderSnake();
    }

    onKeydown(event) {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                this.velocity.x = 0;
                this.velocity.y = -1;
                break;
            case 'd':
            case 'ArrowRight':
                this.velocity.x = 1;
                this.velocity.y = 0;
                break;
            case 's':
            case 'ArrowDown':
                this.velocity.x = 0;
                this.velocity.y = 1;
                break;
            case 'a':
            case 'ArrowLeft':
                this.velocity.x = -1;
                this.velocity.y = 0;
                break;
            default:
                break;
        }
    }
}

function init() {
    const game = new Game();
    setInterval(game.update.bind(game), 100);
    window.onkeydown = game.onKeydown.bind(game);
    window.game = game;
}

window.onload = init;