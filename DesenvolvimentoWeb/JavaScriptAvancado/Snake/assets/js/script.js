class Game {
    static GRID = 20;
    static PERIOD = 280;
    static COLOR_BLUE = '#3688be';
    static COLOR_GREEN = '#51ee52';
    static COLOR_DARK_GREEN = '#00F102';
    static COLOR_YELLOW = '#F1C40F';

    snake = [];
    position = { x: 10, y: 10 };
    velocity = { x: 0, y: 0 };
    food = { x: 0, y: 0 };
    size = 100;


    constructor() {
        this.canvas = document.getElementById('game');
        this.score = document.getElementById('score');
        this.context = this.canvas.getContext('2d');
        this.repositionFood();
        this.repositionSnake();
        this.resetInterval(Game.PERIOD);
    }

    resetInterval(period) {
        if(period < 10)
            period = 10;
        clearInterval(this.interval);
        this.interval = setInterval(this.update.bind(this), period);
    }

    renderGround() {
        this.context.fillStyle = Game.COLOR_BLUE;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderSnake() {
        this.context.fillStyle = Game.COLOR_DARK_GREEN;
        for(let i = 0; i < this.snake.length; i++) {
            this.context.fillRect(
                this.snake[i].x * Game.GRID,
                this.snake[i].y * Game.GRID,
                Game.GRID-1,
                Game.GRID-1
            );
            this.context.fillStyle = Game.COLOR_GREEN;

            // Check if snake colide with itself
            if(i > 0 && this.snake.length > 2 && this.snake[0].x === this.snake[i].x && this.snake[0].y === this.snake[i].y)
                this.reset();
        }
    }

    renderFood() {
        this.context.fillStyle = Game.COLOR_YELLOW;
        this.context.fillRect(
            this.food.x * Game.GRID,
            this.food.y * Game.GRID,
            Game.GRID - 1,
            Game.GRID - 1
        );
    }

    reset() {
        this.snake = [];
        this.velocity = { x: 0, y: 0 };
        this.repositionFood();
        this.repositionSnake();
        this.size = 0;
        this.score.innerText = '0';
        this.resetInterval(Game.PERIOD);
    }

    repositionFood() {
        this.food.x = Math.floor(Math.random() * Game.GRID);
        this.food.y = Math.floor(Math.random() * Game.GRID);

        // Don't let food be on the snake
        for(let i = 0; i < this.snake.length; i++)
            if(this.food.x === this.snake[i].x && this.food.y === this.snake[i].y)
                this.repositionFood();
    }

    repositionSnake() {
        this.snake = [{
            x: this.position.x = Math.floor(Math.random() * Game.GRID),
            y: this.position.y = Math.floor(Math.random() * Game.GRID)
        }];
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
        if(this.velocity.x !== 0 || this.velocity.y !== 0)
            this.snake.unshift({
                x: parseInt(this.position.x),
                y: parseInt(this.position.y)
            });

        // keep snake's length
        while(this.snake.length > this.size + 3)
            this.snake.pop();

        // set snake's size if got food
        if(this.position.x === this.food.x && this.position.y === this.food.y) {
            this.score.innerText = '' + ++this.size;
            this.repositionFood();
            this.resetInterval(Game.PERIOD - this.size);
        }

        // set snake's next position
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    update() {
        this.updateSnake();
        this.renderGround();
        this.renderSnake();
        this.renderFood();
    }

    changeVelocity(x, y) {
        // cancel backward velocity
        if(x !== 0 && this.velocity.x === -x || y !== 0 && this.velocity.y === -y)
            return;

        this.velocity.x = x;
        this.velocity.y = y;
    }

    onKeydown(event) {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                this.changeVelocity(0, -1);
                break;
            case 'd':
            case 'ArrowRight':
                this.changeVelocity(1, 0);
                break;
            case 's':
            case 'ArrowDown':
                this.changeVelocity(0, 1);
                break;
            case 'a':
            case 'ArrowLeft':
                this.changeVelocity(-1, 0);
                break;
            default:
                break;
        }
    }
}

function init() {
    const game = new Game();
    window.onkeydown = game.onKeydown.bind(game);
    window.game = game;
}

window.onload = init;