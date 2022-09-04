class Game {
    jumping = false;
    gameOver = false;

    constructor() {
        this.desert = document.getElementById('desert');
        this.alert = document.getElementById('alert');
        this.grid = document.querySelector('.grid');
        this.dino = document.querySelector('.dino');
    }

    jump() {
        if(this.jumping)
            return;
        requestAnimationFrame(this.updateJump.bind(this));
    }

    onKeydown(event) {
        if(event.key === ' ')
            this.jump();
    }

    updateJump(timestamp) {
        if(!this.jumping)
            this.jumping = timestamp;
        const progress = timestamp - this.jumping;

        // Animation code
        // Yf = Yo + VoT - GT^2/2
        const dinoHeight = 1.4 * progress - .01 * progress * progress / 2;

        if(dinoHeight >= 0) {
            this.dino.style.bottom = Math.floor(dinoHeight) + 'px';
            requestAnimationFrame(this.updateJump.bind(this));
        }else {
            this.dino.style.bottom = '0';
            this.jumping = false;
        }
    }
}

function init() {
    const game = new Game();
    window.game = game;
    window.onkeydown = game.onKeydown.bind(game);
}
window.addEventListener('DOMContentLoaded', init);