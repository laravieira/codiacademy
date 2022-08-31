import Doll from './Doll.js';
import Tree from './Tree.js';
import Player from './Player.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let doll = new Doll(scene);
let tree = new Tree(scene);
let player = new Player(scene);

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
    player.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeydown(event) {
    switch (event.key) {
        case 'w':
        case 'a':
        case ',':
        case 'ArrowUp':
        case 'ArrowLeft':
        case ' ':
            player.walkForward();
            break;
        case 's':
        case 'd':
        case '.':
        case 'ArrowDown':
        case 'ArrowRight':
            player.walkBackward();
            break;
        default:
            break;
    }
}

function onKeyup() {
    player.stop();
}

window.onload = animate;
window.onresize = onWindowResize;
window.onkeydown = onKeydown;
window.onkeyup = onKeyup;
