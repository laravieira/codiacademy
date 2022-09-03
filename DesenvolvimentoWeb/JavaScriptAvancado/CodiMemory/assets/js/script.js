class Game {

    score = -1;
    cards = [];
    pair = null;
    chosen = [];

    constructor() {
        this.board = document.querySelector('.grid');
        this.scoreboard = document.getElementById('scoreboard').querySelector('span');
        this.loadAssets();
        this.loadBoard();
        this.updateScore();
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
            card.onclick = this.onCardClick.bind(this);
            copy.onclick = this.onCardClick.bind(this);
            this.cards.push(card, copy);
        }
        this.cards.sort(() => .5 - Math.random());
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

    updateScore() {
        this.score++;
        this.scoreboard.innerText = '' + this.score;

        if(this.chosen.length === this.cards.length)
            location.reload();
    }

    showCard(card) {
        card.className = 'card flip';
        if (this.pair === null)
            this.pair = card;
        else if (this.pair.getAttribute('key') === card.getAttribute('key')) {
            console.debug('Match');
            this.pair.onclick = null;
            this.chosen.push(card);
            this.chosen.push(this.pair);
            this.pair = null;
            card.onclick = null;
            this.updateScore();
        }else {
            console.debug('Unmatch');
            setTimeout(() => {
                this.hideCard(this.pair);
                this.pair = null;
                this.hideCard(card);
            }, 800);
        }
    }

    hideCard(card) {
        card.className = 'card';
        if(this.pair === card)
            this.pair = null;
    }
}

function init() {
    const game = new Game();
    window.game = game;
}
document.addEventListener('DOMContentLoaded', init);