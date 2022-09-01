import Game from './Game.js';

class Player {
    static MODEL_PATH = 'assets/model/fox/Fox.gltf';

    constructor() {
        const loader = new THREE.GLTFLoader();
        loader.load(Player.MODEL_PATH, (model) => this.onModelLoad(model));
        this.playerInfo = {
            positionX: 6,
            velocity: 0
        };
    }

    onModelLoad(model) {
        model.scene.scale.set(.02, .02, .02);
        model.scene.position.set(0, -3, 0);
        model.scene.rotation.y = -1.7;
        this.scene = model.scene;
        Game.scene.add(this.scene);
    }

    walkForward() {
        this.playerInfo.velocity = .03;
    }

    walkBackward() {
        this.playerInfo.velocity = -.04;
    }

    stop() {
        this.playerInfo.velocity = 0;
    }

    update() {
        if(this.scene === undefined)
            return;
        this.playerInfo.positionX -= this.playerInfo.velocity;
        gsap.to(this.scene.position, {
            x: this.playerInfo.positionX,
            duration: .2
        });
    }
}

export default Player;