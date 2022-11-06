import { Instances, Instance, useGLTF, PositionPoint } from "@react-three/drei"
import { Euler, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";


const COUNT = 5;

interface ISmokeProps {
    delay: number;
    startPos?: THREE.Vector3;
}

interface ISmokeParticlesProps {
}

export default function SmokeParticles() {
    const { nodes, materials } = useGLTF('./models/smoke/smoke.gltf') as GLTFResult;

    return (
        <>
            <group>
                <Instances limit={COUNT} material={materials.Smoke} geometry={nodes.Smoke.geometry}>
                    <Smoke delay={0} />
                    <Smoke delay={6} />
                    <Smoke delay={10} />
                    <Smoke delay={15} />
                    <Smoke delay={20} />
                </Instances>
            </group>
        </>
    )
}

function Smoke(props: ISmokeProps) {
    const ref = useRef<PositionPoint>(null!);
    useFrame((state, delta) => {
        if (state.clock.getElapsedTime() < props.delay) {
            ref.current.scale.set(0, 0, 0);
            return;
        }
        if (ref.current.position.y > 7) {
            ref.current.position.set(0, 0, 0);
        }
        let a = THREE.MathUtils.inverseLerp(0, 6.5, ref.current.position.y);
        const scale = 0.2 + a;
        ref.current.scale.set(scale, scale, scale);
        ref.current.position.y = ref.current.position.y + (0.3 * delta);
    })

    return <Instance ref={ref} />
}

type GLTFResult = GLTF & {
    nodes: {
        Smoke: THREE.Mesh
    }
    materials: {
        Smoke: THREE.MeshStandardMaterial
    }
}