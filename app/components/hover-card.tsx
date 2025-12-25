"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HoverCard({ children, className = "" }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  const rotateX = useSpring(0, { stiffness: 500, damping: 100 });
  const rotateY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
    rotateX.set(yPct * -20);
    rotateY.set(xPct * 20);
  }

  function onMouseLeave() {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 ${className}`}
    >
      {/* Gradient spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 80%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border gradient effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}
