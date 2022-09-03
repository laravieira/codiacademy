class Game {
    static GRAVITY = 1.2;
    static VELOCITY = .7;

    static BIRD_FALLING = 0;
    static BIRD_FLAP_UP = 1;
    static BIRD_FLAP_DOWN = 2;

    constant;
    bird = {
        mode: Game.BIRD_FALLING,
        position: {
            x: 100,
            y: 200
        },
        angle: .3
    }
    score = 0;
    pipes = [];

    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');

        this.loadAssets();
        this.addPipe();
        this.update();
    }

    renderCity() {
        if(this.asset.city === undefined) {
            this.asset.city = this.asset.city_day;
            const hour = new Date().getHours();

            if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                this.asset.city = this.asset.city_night;
            if(hour < 6 || hour > 17)
                this.asset.city = this.asset.city_night;
        }

        this.context.drawImage(
            this.asset.city,
            0,
            0,
            this.canvas.width,
            this.canvas.height);
    }

    renderBase() {
        this.context.drawImage(
            this.asset.base,
            0,
            this.canvas.height - this.asset.base.height,
            this.canvas.width,
            this.asset.base.height);
    }

    renderBird() {
        let asset = this.asset.bird_mid_flap;
        if(this.bird.mode === Game.BIRD_FLAP_UP)
            asset = this.asset.bird_up_flap;
        if(this.bird.mode === Game.BIRD_FLAP_DOWN)
            asset = this.asset.bird_down_flap;

        this.context.save();
        this.context.translate(
            this.bird.position.x + asset.width / 2,
            this.bird.position.y + asset.height / 2
        );
        this.context.rotate(-this.bird.angle);
        this.context.drawImage(
            asset,
            -asset.width / 2,
            -asset.height / 2,
            asset.width,
            asset.height
        );

        this.context.restore();
    }

    renderPipes() {
        for(const pipe of this.pipes) {
            this.context.save();
            this.context.translate(
                pipe.distance,
                pipe.height
            );
            this.context.drawImage(
                this.asset.pipe_green,
                0,
                0,
                this.asset.pipe_green.width,
                this.asset.pipe_green.height
            );

            this.context.translate(0, -pipe.aperture);
            this.context.scale(-1, 1);
            this.context.rotate(Math.PI);
            this.context.drawImage(
                this.asset.pipe_green,
                0,
                0,
                this.asset.pipe_green.width,
                this.asset.pipe_green.height
            );

            this.context.restore();
        }
    }

    renderScoreboard() {
        this.context.fillStyle = '#000000';
        this.context.font = '20px Verdana';
        this.context.fillText('Placar: ' + this.score, 10, this.canvas.height - 20);
    }

    flap() {
        this.bird.position.y -= 30;
        this.bird.angle = .3;
        this.asset.bird_flap.cloneNode().play();
        this.bird.mode = Game.BIRD_FLAP_DOWN;
        setTimeout(() => this.bird.mode = Game.BIRD_FLAP_UP, 100);
        setTimeout(() => this.bird.mode = Game.BIRD_FALLING, 210);
    }

    addPipe() {
        this.pipes.push({
            distance: this.canvas.width,
            aperture: Math.random() * 40 + 60,
            height: Math.random() * 100 + 250,
            counted: false
        });
    }

    addScore() {
        this.pipes[0].counted = true;
        this.asset.score.cloneNode().play();
        console.debug(++this.score);
    }

    onKeydown(event) {
        if(this.asset.isLoaded < this.asset.length)
            return;

        switch (event.key) {
            case 'w':
            case ' ':
            case 'ArrowUp':
                this.flap();
                break;
            default:
                break;
        }
    }

    onClick() {
        this.onKeydown({key: 'w'});
    }

    updateBird() {
        this.bird.position.y += Game.GRAVITY;
        this.bird.angle -= Game.GRAVITY / 150;
    }

    updatePipe() {
        for(let pipe of this.pipes) {
            pipe.distance -= Game.VELOCITY + this.score/20;

        }

        if(this.pipes.at(-1).distance < this.canvas.width - this.asset.pipe_green.width * 3)
            this.addPipe();

        if(this.pipes[0].distance < 0 - this.asset.pipe_green.width)
            this.pipes.shift();
    }

    updateScore() {
        for (const pipe of this.pipes) {
            // If bird collided with base or fly off screen
            if (this.bird.position.y < 0 || this.bird.position.y + this.asset.bird_mid_flap.height > this.canvas.height - this.asset.base.height) {
                console.debug('Out of the world');
                location.reload();

                // If bird is inside pipe's region
            } else if (pipe.distance < this.bird.position.x + this.asset.bird_mid_flap.width
                && pipe.distance + this.asset.pipe_green.width > this.bird.position.x) {

                // If bird is inside pipes
                if (this.bird.position.y < pipe.height - pipe.aperture
                    || this.bird.position.y + this.asset.bird_mid_flap.height > pipe.height) {
                    // Bird collision
                    console.debug('Collision');
                    location.reload();

                    // If bird crossed the middle of the pipe
                } else if (pipe.distance + this.asset.pipe_green.width / 2 < this.bird.position.x + this.asset.bird_mid_flap.width / 2) {

                    // If this wasn't checked before
                    if (!pipe.counted) {
                        // Score ++
                        this.addScore();
                    }
                }
            }
        }
    }

    update() {
        if(this.asset.isLoaded === this.asset.length) {
            this.updateBird();
            this.updatePipe();
            this.updateScore();
            this.renderCity();
            this.renderPipes()
            this.renderBird();
            this.renderBase();
            this.renderScoreboard();
        }

        requestAnimationFrame(this.update.bind(this));
    }

    loadAssets() {
        this.asset = {
            paths: {
                pipe_green: 'assets/img/pipe-green.png',
                base: 'assets/img/base.png',
                city_day: 'assets/img/background-day.png',
                city_night: 'assets/img/background-night.png',
                bird_up_flap: 'assets/img/bird/bluebird-upflap.png',
                bird_mid_flap: 'assets/img/bird/bluebird-midflap.png',
                bird_down_flap: 'assets/img/bird/bluebird-downflap.png',
                bird_flap: 'assets/audio/fly.mp3',
                score: 'assets/audio/score.mp3'
            },
            length: 0,
            isLoaded: 0
        };

        for(const key of Object.keys(this.asset.paths)) {
            let asset = null;
            this.asset.length++;
            if(this.asset.paths[key].endsWith('png')) {
                asset = new Image();
                asset.onload = () => this.asset.isLoaded++;
                asset.src = this.asset.paths[key];
            }else if(this.asset.paths[key].endsWith('mp3')) {
                asset = new Audio();
                asset.onloadeddata = () => this.asset.isLoaded++;
                asset.src = this.asset.paths[key];
                asset.load();
            }
            this.asset[key] = asset;
        }
    }
}

function init() {
    const game = new Game();
    window.game = game;
    window.onkeydown = game.onKeydown.bind(game);
    window.onclick = game.onClick.bind(game);
}
window.onload = init;