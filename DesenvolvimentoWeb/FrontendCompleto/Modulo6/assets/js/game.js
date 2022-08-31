import Doll from './Doll.js';
import Tree from './Tree.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let doll = new Doll(scene);
let tree = new Tree(scene);

setTimeout(() => {
    doll.turnBackward();
}, 1000);

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