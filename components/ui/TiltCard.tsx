'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function TiltCard({ children, className = '', maxTilt = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rX = -(mouseY / (rect.height / 2)) * maxTilt;
    const rY = (mouseX / (rect.width / 2)) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev.slice(-3), { x, y, id }]);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`perspective-1000 relative overflow-hidden rounded-2xl sm:rounded-3xl ${className}`}
    >
      <motion.div
        whileTap={{ scale: 0.95 }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? 1.025 : 1,
          boxShadow: isClicked
            ? '0 0 35px rgba(212, 175, 55, 0.7), 0 0 15px rgba(88, 24, 37, 0.4)'
            : isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.12)'
            : '0 4px 15px rgba(0, 0, 0, 0.05)'
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className="transform-style-3d w-full h-full relative"
      >
        {children}

        {/* Powerful Golden Ripple Particle Waves on Click */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                top: ripple.y - 40,
                left: ripple.x - 40,
                width: 80,
                height: 80,
              }}
              className="absolute pointer-events-none rounded-full bg-gradient-to-r from-[#D4AF37]/60 via-[#25D366]/40 to-[#581825]/40 backdrop-blur-sm z-50 shadow-2xl border border-white/60"
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

