"use client"
import { useState, useEffect } from 'react';
import { XR } from 'three';
// import dynamic from 'next/dynamic';

// const WebXR1 = dynamic(() => import('webxr'), {
//   ssr: false,
// });

const WebXR = () => {
  const [xr, setXr] = useState(null);
  const [hasUserActivated, setHasUserActivated] = useState(false);
//   const navigatorXr = WebXR1.navigator.xr;

  useEffect(() => {
    const handleUserActivation = () => {
      setHasUserActivated(true);
    };

    document.addEventListener('click', handleUserActivation);
    document.addEventListener('touchstart', handleUserActivation);

    return () => {
      document.removeEventListener('click', handleUserActivation);
      document.removeEventListener('touchstart', handleUserActivation);
    };
  }, []);

  useEffect(() => {
    console.log("nxr", navigator.xr)
    if (hasUserActivated && navigator.xr) {
      navigatorXr.requestSession('immersive-ar')
        .then((session) => {
          setXr(session);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [hasUserActivated]);

  return (
    <div>
      {xr && (
        <div>
          <h1>WebXR is enabled!</h1>
          <button onClick={() => xr.requestAnimationFrame(() => console.log('Frame rendered!'))}>
            Render frame
          </button>
        </div>
      )}
    </div>
  );
};

export default WebXR;