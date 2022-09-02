class Game {
    static GRID = 20;
    static SIZE = 3;

    snake = [];
    position = { x: 10, y: 20 };
    velocity = { x: 0, y: 0 };
    food = { x: 15, y: 15 };

    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
    }
}

function init() {
    const game = new Game();
}

window.onload = init;