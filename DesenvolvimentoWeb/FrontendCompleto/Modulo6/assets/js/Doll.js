class Doll {
    static MODEL_PATH = 'assets/model/doll/scene.gltf';

    constructor(scene) {
        const loader = new THREE.GLTFLoader();
        loader.load(Doll.MODEL_PATH, (model) => this.onModelLoad(model, scene));
    }

    onModelLoad(model, scene) {
        model.scene.scale.set(.4, .4, .4);
        model.scene.position.set(0, -1, 0);
        this.doll = model.scene;
        scene.add(this.doll);
    }

    turnBackward() {
        gsap.to(this.doll.rotation, {
            y: -3.15,
            duration: 1
        });
    }

    turnForward() {
        gsap.to(this.doll.rotation, {
            y: 0,
            duration: .3
        });
    }
}

export default Doll;