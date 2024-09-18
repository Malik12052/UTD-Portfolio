import React, { useEffect, useRef, useState } from "react";

const BouncingSphere = () => {
  const sphereRef = useRef();
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [velocity, setVelocity] = useState({ x: 0.1, y: 0.15 });

  useEffect(() => {
    const animate = () => {
      let { x, y } = position;
      let { x: vx, y: vy } = velocity;

      // Update position
      x += vx;
      y += vy;

      // Define boundaries to cover the whole screen
      const leftBoundary = 0;
      const rightBoundary = window.innerWidth;
      const topBoundary = 0;
      const bottomBoundary = window.innerHeight;

      // Check for collision with the walls
      if (x <= leftBoundary || x >= rightBoundary) vx = -vx;
      if (y <= topBoundary || y >= bottomBoundary) vy = -vy;

      setPosition({ x, y });
      setVelocity({ x: vx, y: vy });

      if (sphereRef.current) {
        sphereRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [position, velocity]);

  return (
    <div
      ref={sphereRef}
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default BouncingSphere;
