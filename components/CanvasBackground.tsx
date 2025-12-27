'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    
    // Configuration
    const starCount = 60;
    const stars: Star[] = [];
    const colors = ['#F9F1D8', '#D4AF37', '#4A3B0F']; // Gold shades

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: Math.random(),
          fadeSpeed: (Math.random() * 0.005) + 0.001,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach((star) => {
        // Update
        star.x += star.speedX;
        star.y += star.speedY;
        star.opacity += star.fadeSpeed;

        if (star.opacity > 1 || star.opacity < 0) {
          star.fadeSpeed = -star.fadeSpeed;
        }

        // Wrap around
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 241, 216, ${Math.abs(star.opacity)})`;
        ctx.fill();
        
        // Glow
        if (Math.random() > 0.99) {
           ctx.shadowBlur = 10;
           ctx.shadowColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
           ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}
