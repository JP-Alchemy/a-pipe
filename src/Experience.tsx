import { Float, PresentationControls, useHelper } from '@react-three/drei'
import PipeModel from './Pipe';
import { Stage } from '@react-three/drei'
import SmokeParticles from './Smoke';
import { useRef } from 'react';
import * as THREE from 'three';

function Experience() {

  const spawnPos = useRef<THREE.Group>(null!);

  return (
    <>

      <color args={['#fcf4ae']} attach='background' />

      <Stage shadows adjustCamera intensity={1} environment="apartment" preset="rembrandt">

        <PresentationControls global polar={[-.4, .3]} azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }} rotation={[.13, .1, 0]} snap={{ mass: 4, tension: 400 }}>

          <Float>
            <group ref={spawnPos} position={[-0.22, 1.2, 0]}>
              <SmokeParticles />
              <pointLight args={['#FF0000', 64, 0.7, 2]} position-y={0.2}/>
            </group>
            <PipeModel rotation-y={-Math.PI * 0.5} />
          </Float>
        </PresentationControls>


      </Stage>

    </>
  );
}

export default Experience;
