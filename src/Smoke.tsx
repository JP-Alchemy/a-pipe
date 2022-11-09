import { Instances, Instance, useGLTF, PositionPoint } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

const COUNT = 5;
const randomData = Array.from({ length: COUNT }, () => (THREE.MathUtils.randFloat(-0.5, 0.5)));

interface ISmokeProps {
    index: number;
    delay: number;
    startPos: React.MutableRefObject<THREE.Group>;
    v1?: THREE.Vector3;
}

interface ISmokeParticlesProps {
    spawnAt: React.MutableRefObject<THREE.Group>;
}

export default function SmokeParticles(props: ISmokeParticlesProps) {
    const { nodes, materials } = useGLTF('./models/smoke/smoke.gltf') as GLTFResult;

    return (
        <>
            <group>
                <Instances limit={COUNT} material={materials.Smoke} geometry={nodes.Smoke.geometry}>
                    <Smoke index={0} delay={1} startPos={props.spawnAt} />
                    <Smoke index={1} delay={7} startPos={props.spawnAt} />
                    <Smoke index={2} delay={11} startPos={props.spawnAt} />
                    <Smoke index={3} delay={16} startPos={props.spawnAt} />
                    <Smoke index={4} delay={21} startPos={props.spawnAt} />
                </Instances>
            </group>
        </>
    )
}

function Smoke({v1 = new THREE.Vector3(), ...props}: ISmokeProps) {
    const ref = useRef<PositionPoint>(null!);
    useFrame((state, delta) => {
        if(props.startPos.current === null) return;
        if (state.clock.getElapsedTime() < props.delay) {
            ref.current.position.copy(props.startPos.current.getWorldPosition(v1));
            return;
        }
        if (ref.current.position.y > 8.5) {
            ref.current.position.copy(props.startPos.current.getWorldPosition(v1));
        }
        let a = THREE.MathUtils.inverseLerp(0, 7.5, ref.current.position.y);
        const scale = a;
        ref.current.scale.set(scale, scale, scale);
        ref.current.position.y = ref.current.position.y + (0.3 * delta);
        const t = state.clock.getElapsedTime() * randomData[props.index];
        ref.current.rotation.set(Math.cos(t), Math.sin(t), Math.cos(t));
    })

    return <Instance ref={ref} scale={[0,0,0]} />
}

type GLTFResult = GLTF & {
    nodes: {
        Smoke: THREE.Mesh
    }
    materials: {
        Smoke: THREE.MeshStandardMaterial
    }
}