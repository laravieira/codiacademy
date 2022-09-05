class Game {
    static GRAVITY = .001;
    static VELOCITY = .4;

    jumping = false;
    gameOver = false;
    score = 0;

    constructor() {
        this.desert = document.getElementById('desert');
        this.alert = document.getElementById('alert');
        this.grid = document.querySelector('.grid');
        this.dino = document.querySelector('.dino');
        this.generateObstacles();
        this.checkDinoObstacleCollision();
    }

    onKeydown(event) {
        if(event.key === ' ')
            this.jump();
    }

    onCollision() {
        for(const obstacle of this.grid.children) {
            const left = obstacle.getBoundingClientRect().left;
            obstacle.className = 'obstacle';
            obstacle.style.left = left + 'px';
            this.desert.style.animation = 'none';
            console.debug('Game Over');
            this.alert.innerText = 'Vc bateu no caquito. :(';
            this.gameOver = true;
        }
    }


    jump() {
        if(this.jumping)
            return;
        requestAnimationFrame(this.updateJump.bind(this));
    }

    updateJump(timestamp) {
        if(!this.jumping)
            this.jumping = timestamp;
        const progress = timestamp - this.jumping;

        // Free fall equation of position
        // Yf = Yo + VoT - GT^2/2
        const dinoHeight = Game.VELOCITY * progress - Game.GRAVITY * progress * progress / 2;

        if(dinoHeight >= 0) {
            this.dino.style.bottom = Math.floor(dinoHeight) + 'px';
            requestAnimationFrame(this.updateJump.bind(this));
        }else {
            this.dino.style.bottom = '0';
            this.jumping = false;
        }
    }

    generateObstacles() {
        const obstacle = document.createElement('div');
        obstacle.style.left = window.innerWidth + 'px';
        obstacle.className = 'obstacle moving';

        const obstaclesGenerator = setInterval(() => {

            // 50% change per second of spawn an obstacle
            // Increase chance of obstacles in 1% per score
            if(Math.random() < .70 - this.score/100)
                return;

            const clone = obstacle.cloneNode();
            clone.onanimationend  = this.deleteObstacle.bind(this);

            if(this.gameOver)
                return clearInterval(obstaclesGenerator);
            this.grid.appendChild(clone);
        }, 800);
    }

    deleteObstacle(event) {
        event.target.remove();
        console.debug(++this.score);
        this.alert.innerText = this.score + '';
    }

    checkDinoObstacleCollision(event) {
        const dinoCollisionBox = this.dino.getBoundingClientRect();
        const dino = {
            top: dinoCollisionBox.top * 1.1,
            right: dinoCollisionBox.right * .9,
            bottom: dinoCollisionBox.bottom * .9,
            left: dinoCollisionBox.left * 1.1,
        }

        for(const obstacle of this.grid.children) {
            const obstacleCollisionBox = obstacle.getBoundingClientRect();

            // if(dinoCollisionBox.top < obstacleCollisionBox.bottom // This never happen with cactus
            if(dino.bottom > obstacleCollisionBox.top
            && dino.left < obstacleCollisionBox.right
            && dino.right > obstacleCollisionBox.left)
                this.onCollision();
        }

        if(!this.gameOver)
            requestAnimationFrame(this.checkDinoObstacleCollision.bind(this))
    }
}

function init() {
    const game = new Game();
    window.game = game;
    window.onkeydown = game.onKeydown.bind(game);
}
window.addEventListener('DOMContentLoaded', init);