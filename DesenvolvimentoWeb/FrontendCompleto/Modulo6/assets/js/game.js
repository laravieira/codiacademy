const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('assets/model/doll/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.scale.set(.4, .4, .4);
    gltf.scene.position.set(0, -1, 0);
});

const light = new THREE.AmbientLight(0xDDDDDD);
scene.add(light);

renderer.setClearColor(0x8601AF, 1);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = animate;
window.onresize = onWindowResize;