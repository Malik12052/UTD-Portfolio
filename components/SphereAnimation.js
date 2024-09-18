import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';

const SphereAnimation = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    const { pointer } = state;
    sphereRef.current.rotation.x += 0.002;
    sphereRef.current.rotation.y += 0.002;
    sphereRef.current.rotation.z += 0.002;
  });

  return (
    <>
      {/* Switch to mesh for a solid sphere */}
      <mesh ref={sphereRef} position={[1, 0.15, 0]} scale={[5, 4, 1.5]}>
        <sphereGeometry args={[2, 35, 32]} />
        <meshStandardMaterial color="#22a6f0" /> {/* Soft teal color */}
      </mesh>

      {/* Optional: Adding a second geometry like a Torus around the sphere */}
      <mesh position={[1, 0.25, 0]} scale={[3, 3, 3]}>
        <torusGeometry args={[6, 0.2, 32, 100]} />
        <MeshWobbleMaterial 
          color="#22a6f0" 
          factor={0.3} 
          speed={1} 
          emissive="#22a6f0" 
          emissiveIntensity={1.6}
        />
      </mesh>
    </>
  );
};

export default SphereAnimation;
