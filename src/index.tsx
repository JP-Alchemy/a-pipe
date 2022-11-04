import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Canvas
    shadows
    camera={{
      fov: 70,
    }}
  >
    <Experience />
  </Canvas>
);