class Player {
    static MODEL_PATH = 'assets/model/fox/Fox.gltf';

    constructor(scene) {
        const loader = new THREE.GLTFLoader();
        loader.load(Player.MODEL_PATH, (model) => this.onModelLoad(model, scene));
        this.playerInfo = {
            positionX: 6,
            velocity: 0
        };
    }

    onModelLoad(gltf, scene) {
        gltf.scene.scale.set(.02, .02, .02);
        gltf.scene.position.set(0, -3, 0);
        gltf.scene.rotation.y = -1.7;
        this.scene = gltf.scene;
        scene.add(this.scene);
    }

    walkForward() {
        this.playerInfo.velocity = .06;
    }

    walkBackward() {
        this.playerInfo.velocity = -.06;
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
            duration: .3
        });
    }
}

export default Player;