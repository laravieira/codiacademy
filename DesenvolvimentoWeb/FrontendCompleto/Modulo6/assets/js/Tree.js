class Tree {
    static MODEL_PATH = 'assets/model/tree/scene.gltf';

    constructor(scene) {
        const loader = new THREE.GLTFLoader();
        loader.load(Tree.MODEL_PATH, (model) => this.onModelLoad(model, scene));
    }

    onModelLoad(model, scene) {
        model.scene.scale.set(16, 16, 16);
        model.scene.position.set(0, -6, -12);
        this.tree = model.scene;
        scene.add(this.tree);
    }
}

export default Tree;