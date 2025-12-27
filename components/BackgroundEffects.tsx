'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundEffects() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static particles on mount to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <div className="bg-noise" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: `${p.x}vw`, y: `100vh` }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              y: `-10vh`,
              x: `${p.x + (Math.random() - 0.5) * 10}vw` 
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-gold-100 rounded-full blur-[1px]"
          />
        ))}
        
        {/* Subtle Gradient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-midnight-800/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-gold-900/5 blur-[80px] rounded-full" />
      </div>
    </>
  );
}
