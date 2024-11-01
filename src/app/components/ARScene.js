// components/ARScene.js
import * as THREE from 'three';

const loader = new THREE.OBJLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
});

loader.load('tree.obj', (object) => {
  scene.add(object);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();