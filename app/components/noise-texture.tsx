"use client";

import { useEffect, useRef } from "react";

interface NoiseTextureProps {
  opacity?: number;
  className?: string;
}

export function NoiseTexture({ opacity = 0.03, className = "" }: NoiseTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateNoise();
    };

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // Red
        data[i + 1] = value; // Green
        data[i + 2] = value; // Blue
        data[i + 3] = 255;   // Alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Animate noise
    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Update noise every 3 frames for subtle animation
      if (frameCount % 3 === 0) {
        generateNoise();
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] mix-blend-overlay"
      style={{ opacity }}
    />
  );
}

// Static SVG noise alternative (lighter on performance)
export function StaticNoise({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity }}
    >
      <svg className="w-full h-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

// CSS-based grain (lightest, uses pseudo-element)
export function GrainOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
