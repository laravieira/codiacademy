class Game {
    jumping = false;
    gravity = .9;
    gameOver = false;
    dinoHeight = 0;

    constructor() {
        this.desert = document.getElementById('desert');
        this.alert = document.getElementById('alert');
        this.grid = document.querySelector('.grid');
        this.dino = document.querySelector('.dino');
    }
}
function init() {
    const game = new Game();
    window.game = game;
}
window.addEventListener('DOMContentLoaded', init);