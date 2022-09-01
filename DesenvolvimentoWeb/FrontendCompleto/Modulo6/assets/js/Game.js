import Doll from './Doll.js';
import Tree from './Tree.js';
import Player from './Player.js';

class Game {
    static WAITING = 0;
    static PLAYING = 1;
    static FINISHED = 2;

    static scene = new THREE.Scene();

    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
        this.camera.position.z = 5;

        this.text = document.querySelector('.text');
        this.timeLimit = 30;
        this.gameStatus = Game.WAITING;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x8601AF, 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.doll = new Doll();
        this.tree = new Tree();
        this.player = new Player();

        const light = new THREE.AmbientLight(0xDDDDDD);
        Game.scene.add(light);

        this.animate();
        this.start().then();
    }

    async start() {
        await delay(500);
        this.text.innerText = 'Começando em 3';
        await delay(500);
        this.text.innerText = 'Começando em 2';
        await delay(500);
        this.text.innerText = 'Começando em 1';
        await delay(500);
        this.text.innerText = 'VAI!';

        this.gameStatus = Game.PLAYING;
        this.doll.update().then();

        setTimeout(() => {
            if(this.gameStatus === Game.FINISHED)
                return;
            this.text.innerText = 'Acabou o Tempo!';
            this.gameStatus = Game.FINISHED;
        }, this.timeLimit*1000);
    }

    animate() {
        if(this.gameStatus === Game.FINISHED)
            return;
        requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(Game.scene, this.camera);
        this.catchOnMoving();
        this.player.update();
    }

    catchOnMoving() {
        if(this.player.playerInfo.velocity !== 0 && this.doll.isLooking) {
            this.player.stop();
            this.text.innerText = 'Você Perdeu!';
            this.gameStatus = Game.FINISHED;
        }
        if(this.player.playerInfo.positionX < -6) {
            this.player.stop();
            this.text.innerText = 'Você Ganhou!';
            this.gameStatus = Game.FINISHED;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onKeydown(event) {
        if(this.gameStatus !== Game.PLAYING)
            return;

        switch (event.key) {
            case 'w':
            case 'a':
            case ',':
            case 'ArrowUp':
            case 'ArrowLeft':
            case ' ':
                this.player.walkForward();
                break;
            case 's':
            case 'd':
            case '.':
            case 'ArrowDown':
            case 'ArrowRight':
                this.player.walkBackward();
                break;
            default:
                break;
        }
    }

    onKeyup() {
        if(this.gameStatus !== Game.PLAYING)
            return;

        this.player.stop();
    }

}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Game;

function init() {
    const game = new Game();
    window.onresize = game.onWindowResize.bind(game);
    window.onkeydown = game.onKeydown.bind(game);
    window.onkeyup = game.onKeyup.bind(game);
}
window.onload = init;
