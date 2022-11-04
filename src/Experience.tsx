import { Float, PresentationControls } from '@react-three/drei'
import PipeModel from './Pipe';
import { Stage } from '@react-three/drei'
import SmokeParticles from './Smoke';

function Experience() {
  return (
    <>

      <color args={['#fcf4ae']} attach='background' />

      <Stage shadows adjustCamera intensity={1} environment="apartment" preset="rembrandt">
        <rectAreaLight width={3.95} height={1.65} intensity={65} color={'#FF0000'} rotation={[0.1, Math.PI, 0]} position={[0, 0.55, -1]} />

        <PresentationControls global polar={[-.4, .3]} azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }} rotation={[.13, .1, 0]} snap={{ mass: 4, tension: 400 }}>

          <Float>
            <SmokeParticles />
            <PipeModel rotation-y={-Math.PI * 0.5} />
          </Float>
        </PresentationControls>
      </Stage>

    </>
  );
}

export default Experience;
