"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const PARTICLE_COUNT = 300;
const PARTICLE_RADIUS = 2;
const CONNECTION_DISTANCE = 150;
const MOUSE_INFLUENCE_RADIUS = 200;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', handleMouseMove);

    const particles: {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      originalX: number;
      originalY: number;
    }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        velocityX: (Math.random() - 0.5) * 0.5,
        velocityY: (Math.random() - 0.5) * 0.5,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentMouseX = springX.get();
      const currentMouseY = springY.get();

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        const dx = currentMouseX - particle.x;
        const dy = currentMouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_INFLUENCE_RADIUS) {
          const force = (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
          particle.velocityX -= dx * force * 0.02;
          particle.velocityY -= dy * force * 0.02;
        }
        
        const homeX = particle.originalX - particle.x;
        const homeY = particle.originalY - particle.y;
        particle.velocityX += homeX * 0.003;
        particle.velocityY += homeY * 0.003;
        
        particle.velocityX *= 0.95;
        particle.velocityY *= 0.95;
        
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        
        ctx.strokeStyle = 'rgba(90, 103, 216, 0.15)';
        ctx.lineWidth = 0.5;
        
        for (let j = i + 1; j < particles.length; j++) {
          const particleB = particles[j];
          const dxB = particle.x - particleB.x;
          const dyB = particle.y - particleB.y;
          const distanceB = Math.sqrt(dxB * dxB + dyB * dyB);
          
          if (distanceB < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particleB.x, particleB.y);
            const opacity = 1 - (distanceB / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(90, 103, 216, ${opacity * 0.2})`;
            ctx.stroke();
          }
        }
        
        ctx.fillStyle = 'rgba(90, 103, 216, 0.8)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, springX, springY]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}