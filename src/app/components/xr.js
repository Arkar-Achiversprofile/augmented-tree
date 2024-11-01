import dynamic from 'next/dynamic';

const WebXR = dynamic(() => import('webxr'), {
  ssr: false,
});

const App = () => {
  const xr = WebXR.navigator.xr;

  // Use the xr property as needed
};

export default App;