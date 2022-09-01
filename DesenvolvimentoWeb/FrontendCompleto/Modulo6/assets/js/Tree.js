import Game from './Game.js';

class Tree {
    static MODEL_PATH = 'assets/model/tree/scene.gltf';

    constructor() {
        const loader = new THREE.GLTFLoader();
        loader.load(Tree.MODEL_PATH, (model) => this.onModelLoad(model));
    }

    onModelLoad(model) {
        model.scene.scale.set(16, 16, 16);
        model.scene.position.set(0, -4, -23);
        this.tree = model.scene;
        Game.scene.add(this.tree);
    }
}

export default Tree;