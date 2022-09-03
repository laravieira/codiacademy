class Game {

    cards = [];

    constructor() {
        this.board = document.querySelector('.grid');
        this.loadAssets();
        this.loadBoard();
    }

    loadAssets() {
        this.asset = {
            paths: {
                //beehive: 'assets/img/beehive.svg',
                beetle: 'assets/img/beetle.svg',
                bird: 'assets/img/bird.svg',
                horse: 'assets/img/horse.svg',
                koala: 'assets/img/koala.svg',
                panda: 'assets/img/panda.svg',
                pelican: 'assets/img/pelican.svg',
                penguin: 'assets/img/penguin.svg',
                tiger: 'assets/img/tiger.svg',
                //tree: 'assets/img/tree.svg',
                walrus: 'assets/img/walrus.svg'
            }
        };
    }

    loadBoard() {
        const template = document.querySelector('.template');
        for(const key of Object.keys(this.asset.paths)) {
            const card = template.cloneNode(true);
            card.className = 'card';
            card.setAttribute('key', key);
            card.querySelector('img').setAttribute('src', this.asset.paths[key]);
            const copy = card.cloneNode(true);
            card.addEventListener('click', this.onCardClick.bind(this));
            copy.addEventListener('click', this.onCardClick.bind(this));
            this.cards.push(card, copy);
        }
        this.shuffleArray(this.cards);
        this.cards.forEach((card) => this.board.appendChild(card));
    }

    onCardClick(event) {
        this.toggleCard(event.currentTarget);
    }

    toggleCard(card) {
        if(card.className === 'card')
            this.showCard(card);
        else
            this.hideCard(card);
    }

    showCard(card) {
        card.className = 'card flip';
    }

    hideCard(card) {
        card.className = 'card';
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}

function init() {
    const game = new Game();
    window.game = game;
}
document.addEventListener('DOMContentLoaded', init);