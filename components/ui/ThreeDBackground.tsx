"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// If maath isn't available, I'd fallback, but let's try to do it without external lib first to save complexity or just raw JS
// Actually, let's stick to raw JS to avoid another dependency install if 'maath' isn't there. 
// Re-writing to use standard Float32Array generation.

// --- Helper for random sphere generation ---
function generateSphere(count: number, radius: number) {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

function ParticleNetwork(props: any) {
    const ref = useRef<any>();
    const sphere = useMemo(() => generateSphere(5000, 1.5), []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00FFFF"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function ThreeDBackground() {
    return (
        <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleNetwork />
            </Canvas>
        </div>
    );
}
