class Game {
    constructor() {
        this.loadAssets();
    }

    loadAssets() {
        this.asset.path = {
            beehive: 'assets/img/beehive.svg',
            beetle: 'assets/img/beetle.svg',
            bird: 'assets/img/bird.svg',
            horse: 'assets/img/horse.svg',
            koala: 'assets/img/koala.svg',
            panda: 'assets/img/panda.svg',
            pelican: 'assets/img/pelican.svg',
            penguin: 'assets/img/penguin.svg',
            tiger: 'assets/img/tiger.svg',
            walrus: 'assets/img/walrus.svg',
        };
    }
}

function init() {
    const game = new Game();
    window.game = game;
}
document.addEventListener('DOMContentLoaded', init);