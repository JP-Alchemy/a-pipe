import { ContactShadows, Float, PresentationControls, Text, Text3D, useHelper } from '@react-three/drei'
import PipeModel from './Pipe';
import { Stage } from '@react-three/drei'
import SmokeParticles from './Smoke';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Desk } from './Desk';

function Experience() {

  const spawnPos = useRef<THREE.Group>(null!);
  const cam = useThree((s) => s.camera);

  useEffect(() => {
    cam.lookAt(spawnPos.current.position);
  }, [])

  return (
    <>

      <color args={['#fcf4ae']} attach='background' />
        
      <Stage shadows adjustCamera={false} intensity={0.2} environment="apartment" preset="rembrandt">

        <PresentationControls global polar={[-.4, .3]} azimuth={[-0.5, 0.5]}
          config={{ mass: 2, tension: 400 }} rotation={[.13, .1, 0]} snap={{ mass: 4, tension: 400 }}>

          <Float>
            <group ref={spawnPos} position={[-0.22, 1.5, 0.1]}>
              <pointLight args={['#FF0000', 100, 1.2, 2]} castShadow={false} position-y={0.3} />
            </group>
            <PipeModel rotation-y={-Math.PI * 0.5} />
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -0.001, 0]} opacity={0.9} scale={10} blur={1.5} far={0.8} />

        <Desk receiveShadow/>
      </Stage>

      <SmokeParticles spawnAt={spawnPos} />

    </>
  );
}

export default Experience;
