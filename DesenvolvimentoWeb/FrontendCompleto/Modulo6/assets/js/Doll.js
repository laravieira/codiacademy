class Doll {
    constructor(scene) {
        const loader = new THREE.GLTFLoader();
        loader.load('assets/model/doll/scene.gltf', (gltf) => {
            gltf.scene.scale.set(.4, .4, .4);
            gltf.scene.position.set(0, -1, 0);
            scene.add(gltf.scene);
            this.doll = gltf.scene;
        });
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
            duration: 1
        });
    }
}

export default Doll;