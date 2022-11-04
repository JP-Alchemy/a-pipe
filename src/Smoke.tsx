import { useTexture, Instances, Instance } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from 'three';

let particles: ISmokeProps[] = Array.from({ length: 1 }, () => ({
    factor: 0,
    speed: THREE.MathUtils.randFloat(0.1, 0.3),
    z: Math.random() - 0.5
}))

interface ISmokeProps {
    factor: number;
    speed: number;
    z: number;
}

const smokeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
export default function SmokeParticles() {
    const smoke = useTexture('https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/clouds.png');

    useEffect(() => {
        smokeMaterial.map = smoke;
        smokeMaterial.map.minFilter = THREE.LinearFilter;
    }, [])

    return (
        <>
            <Instances limit={particles.length} material={smokeMaterial}>
                <planeGeometry />
                {particles.map((data, i) => (
                    <Smoke key={i} {...data} />
                ))}
            </Instances>
        </>
    )
}

function Smoke(props: ISmokeProps) {
    const ref = useRef<any>(null!);
    useFrame((state, delta) => {
        if(ref.current.position.y > 4.5) ref.current.position.y = 0;
        let a = THREE.MathUtils.inverseLerp(0, 4.5, ref.current.position.y);
        ref.current.scale.setScalar(1 + a);
        ref.current.position.y = ref.current.position.y + (props.speed * delta);
        ref.current.position.z = props.z;
    })

    return <Instance ref={ref} />
}