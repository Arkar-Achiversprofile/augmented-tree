"use client"
// import Image from "next/image";
// import styles from "./page.module.css";
// import WebXR from "./webxr";
// import Three from "./three";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <WebXR/>
//       <Three/>
//     </div>
//   );
// }

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { ARButton, XR, XRControllerComponent } from '@react-three/xr';

export default function Home() {
  const treeRef = useRef(null);
  const cameraRef = useRef(null);

  console.log(treeRef.current, cameraRef.current);

  const handleUserPosition = () => {
    if (treeRef.current && cameraRef.current) {
      const distance = cameraRef.current.position.distanceTo(treeRef.current.position);
      treeRef.current.scale.setScalar(Math.max(1, 5 / distance));
    }
  };

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const beta = event.rotationRate?.beta || 0; // Use optional chaining
      if (treeRef.current) {
        treeRef.current.rotation.x += beta > 0 ? 0.01 : -0.01;
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ARButton />
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 5, 5]} />
          <mesh ref={treeRef} position={[0, 0, -5]}>
            <cylinderGeometry args={[1, 2, 10, 32]} />
            <meshStandardMaterial color='green' />
          </mesh>
          <group ref={cameraRef} onUpdate={handleUserPosition} />
          <XRControllerComponent />
        </XR>
      </Canvas>
    </div>
  );
}
