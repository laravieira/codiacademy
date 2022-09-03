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
        angle: 0
    }
    score = 0;

    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');

        this.loadAssets();
    }

    update() {}

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
            isLoaded: 0
        };

        for(const key of Object.keys(this.asset.paths)) {
            let asset = null;
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
}
window.onload = init;