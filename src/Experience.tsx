import { ContactShadows, Environment, Float, PresentationControls, useHelper } from '@react-three/drei'
import PipeModel from './Pipe';
import { Stage } from '@react-three/drei'
import SmokeParticles from './Smoke';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Desk } from './Desk';
import { useControls } from 'leva'
import { EffectComposer, Vignette, Glitch, Noise, Bloom, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

function Experience() {

  const spawnPos = useRef<THREE.Group>(null!);
  const cam = useThree((s) => s.camera);
  const light = useRef<THREE.SpotLight>(null!);
  useHelper(light, THREE.PointLightHelper);

  useEffect(() => {
    (cam as THREE.PerspectiveCamera).setFocalLength(40);
    // cam.lookAt(spawnPos.current.position);
  }, [])

  const deskLampLight = useControls('Desk Lamp', {
    position: {
      value: [11.8, 5.6, -4.2],
      step: 0.1
    },
    rotation: {
      value: [0, 0, 0],
      step: 0.1
    }
  });
  return (
    <>

      <color args={['#fcf4ae']} attach='background' />
      <Environment background preset="apartment" />

      {/* MODELS */}
      <PresentationControls global polar={[-.4, .3]} azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }} rotation={[.13, .1, 0]} snap={{ mass: 4, tension: 400 }}>
        <Float>
          <group ref={spawnPos} position={[-0.22, 1.5, 0.1]}>
            <pointLight args={['#FF0000', 100, 1.2, 2]} castShadow={false} position-y={0.3} />
          </group>
          <PipeModel rotation-y={-Math.PI * 0.5} />
        </Float>
      </PresentationControls>
      <Desk receiveShadow />
      <SmokeParticles spawnAt={spawnPos} />
      <spotLight castShadow {...deskLampLight} ref={light} intensity={5} color="orange" />

      {/* POST PROCESSING */}
      <EffectComposer>
      <Vignette offset={0.2} darkness={0.5} blendFunction={BlendFunction.NORMAL} />
      {/* <Noise blendFunction={BlendFunction.AVERAGE} premultiply opacity={0.3}/> */}
      <Bloom mipmapBlur intensity={1} />
      <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} />
    </EffectComposer>
    </>
  );
}

export default Experience;