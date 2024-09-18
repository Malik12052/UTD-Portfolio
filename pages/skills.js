import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";


const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Skills = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`linear-gradient(to bottom, ${color}, transparent)`;

  return (
    <div
      className="relative min-h-screen px-4 py-12 text-zinc-50"
      style={{
        backgroundImage,
      }}
    >
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="relative z-10 mx-auto grid max-w-4xl grid-cols-12 gap-4"
      >
        <h1 className="col-span-12 text-4xl font-bold mb-8">My Skills</h1>
        <div className="col-span-12 space-y-4 text-lg">
          <p>🛠️ <strong>Frontend Development:</strong> Next.js, React.js, Tailwind CSS</p>
          <p>🎨 <strong>Design:</strong> Graphic Design, Figma</p>
          <p>💻 <strong>Programming Languages:</strong> JavaScript (ES6+), Solidity</p>
          <p>🎧 <strong>Audio Engineering:</strong> Ableton Live, Plugins</p>
          <p>🖥️ <strong>3D Development:</strong> React Three Fiber, Three.js</p>
          <p>📈 <strong>Blockchain Development:</strong> Smart Contracts, DApps</p>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          {/* Starry background */}
          <Stars radius={150} count={5000} factor={35} fade speed={1} />
          {/* Particle Effect */}
          <ParticleEffect />
        </Canvas>
      </div>
    </div>
  );
};

// Particle effect component
const ParticleEffect = () => {
  const points = useRef();
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Generate random particle positions and assign pink and turquoise colors
  for (let i = 0; i < particleCount; i++) {
    positions.set(
      [
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
      ],
      i * 3
    );

    // Alternate between pink and turquoise colors for particles
    const color = i % 2 === 0 ? new THREE.Color(0xff69b4) : new THREE.Color(0x40e0d0);
    colors.set(color.toArray(), i * 3);
  }

  useFrame(() => {
    // Rotate particles for a subtle motion effect
    points.current.rotation.x += 0.001;
    points.current.rotation.y += 0.001;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors depthWrite={false} transparent />
    </points>
  );
};

export default Skills;
