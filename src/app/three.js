import { useEffect, useState } from 'react';
import * as THREE from 'three';

const Three = () => {
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
      antialias: true,
    });

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);
  }, []);

  return (
    <div>
      <canvas id="canvas" />
      {scene && (
        <div>
          <h1>Three.js is enabled!</h1>
          <button onClick={() => renderer.render(scene, camera)}>
            Render scene
          </button>
        </div>
      )}
    </div>
  );
};

export default Three;