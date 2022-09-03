class Game {
    static SPACE_PEER_PIPE = 100;
    static GRAVITY = 1.4;
    static VELOCITY = 1;

    static BIRD_FALLING = 0;
    static BIRD_FLAP_UP = 1;
    static BIRD_FLAP_DOWN = 2;

    constant;
    bird = {
        mode: Game.BIRD_FALLING,
        position: {
            x: 33,
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

    flap() {
        this.bird.position.y -= 26;
        this.bird.angle = .3;
        this.asset.bird_flap.cloneNode().play();
        this.bird.mode = Game.BIRD_FLAP_DOWN;
        setTimeout(() => this.bird.mode = Game.BIRD_FLAP_UP, 100);
        setTimeout(() => this.bird.mode = Game.BIRD_FALLING, 210);
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

    updateBird() {
        this.bird.position.y += Game.GRAVITY;
        this.bird.angle -= Game.GRAVITY / 150;
    }

    update() {
        if(this.asset.isLoaded === this.asset.length) {
            this.updateBird();
            this.renderCity();
            this.renderBase();
            this.renderBird();
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
}
window.onload = init;