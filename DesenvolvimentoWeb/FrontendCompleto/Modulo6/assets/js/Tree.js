class Tree {
    constructor(scene) {
        const loader = new THREE.GLTFLoader();
        loader.load('assets/model/tree/scene.gltf', (gltf) => {
            gltf.scene.scale.set(16, 16, 16);
            gltf.scene.position.set(0, -6, -12);
            scene.add(gltf.scene);
            this.tree = gltf.scene;
        });
    }
}

export default Tree;