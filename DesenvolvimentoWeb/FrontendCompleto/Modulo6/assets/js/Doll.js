import Game, { delay } from './Game.js';

class Doll {
    static MODEL_PATH = 'assets/model/doll/scene.gltf';

    constructor() {
        const loader = new THREE.GLTFLoader();
        loader.load(Doll.MODEL_PATH, (model) => this.onModelLoad(model));
        this.isLooking = false;
    }

    onModelLoad(model) {
        model.scene.scale.set(.4, .4, .4);
        model.scene.position.set(0, -1, -10);
        this.doll = model.scene;
        Game.scene.add(this.doll);
    }

    turnBackward() {
        gsap.to(this.doll.rotation, {
            y: -3.15,
            duration: 1
        });
        setTimeout(() => this.isLooking = false, 200);
    }

    turnForward() {
        gsap.to(this.doll.rotation, {
            y: 0,
            duration: .4
        });
        setTimeout(() => this.isLooking = true, 380);
    }

    async update() {
        if(this.doll === undefined)
            return;
        this.turnBackward();
        await delay(Math.random() * 3000 + 1000);
        this.turnForward();
        await delay(3000);
        await this.update();
    }
}

export default Doll;