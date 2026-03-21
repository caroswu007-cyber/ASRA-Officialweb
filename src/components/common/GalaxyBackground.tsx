import React, { useEffect, useRef } from 'react';

/**
 * GalaxyBackground — Soft spiral of warm light (dawn / hope palette), not cold starfield.
 */

const ROTATION_SPEED = 0.0003;
const STAR_COUNT = 340;
const CORE_RADIUS = 64;
const ARM_COUNT = 4;

/**
 * Galaxy hub position (fractions of canvas width/height).
 * Canvas spans Hero + Introduction, so vertical center must sit in the UPPER band (~hero viewport),
 * not geometric mid of the full tall layer — otherwise the core sits mid-page.
 */
const CENTER_X_RATIO = 0.5;
const CENTER_Y_RATIO = 0.2;

interface Particle {
  angle: number;
  radius: number;
  size: number;
  opacity: number;
  opacityDelta: number;
  hue: number;
}

const GalaxyBackground: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let particles: Particle[] = [];
    let cssW = 0;
    let cssH = 0;

    const buildParticles = (w: number, h: number) => {
      const maxR = Math.min(w, h) * 0.48;
      particles = [];
      for (let arm = 0; arm < ARM_COUNT; arm++) {
        const armOffset = (Math.PI * 2 * arm) / ARM_COUNT;
        for (let i = 0; i < STAR_COUNT; i++) {
          const t = i / STAR_COUNT;
          const radius = 16 + t * maxR;
          const spread = (Math.random() - 0.5) * 0.55 * (1 + t);
          const angle = armOffset + t * Math.PI * 3.5 + spread;
          const hue = 22 + t * 48 + (Math.random() - 0.5) * 18;
          particles.push({
            angle,
            radius,
            size: Math.random() * 2.1 + 0.45,
            opacity: Math.random() * 0.45 + 0.55,
            opacityDelta: (Math.random() - 0.5) * 0.012,
            hue,
          });
        }
      }
      for (let i = 0; i < 140; i++) {
        const radius = Math.random() * CORE_RADIUS * 0.92;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          angle,
          radius,
          size: Math.random() * 2.6 + 0.55,
          opacity: Math.random() * 0.35 + 0.65,
          opacityDelta: (Math.random() - 0.5) * 0.02,
          hue: 32 + Math.random() * 28,
        });
      }
    };

    const drawCore = (cx: number, cy: number) => {
      const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, CORE_RADIUS * 3.8);
      haze.addColorStop(0, 'rgba(255, 220, 180, 0.32)');
      haze.addColorStop(0.35, 'rgba(255, 160, 120, 0.12)');
      haze.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haze;
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * 3.8, 0, Math.PI * 2);
      ctx.fill();

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, CORE_RADIUS * 1.05);
      glow.addColorStop(0, 'rgba(255, 252, 245, 0.95)');
      glow.addColorStop(0.2, 'rgba(255, 200, 130, 0.75)');
      glow.addColorStop(0.55, 'rgba(255, 140, 90, 0.22)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, CORE_RADIUS * 1.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fill();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cssW = canvas.offsetWidth;
      cssH = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles(cssW, cssH);
    };

    const animate = () => {
      const w = cssW;
      const h = cssH;
      ctx.clearRect(0, 0, w, h);

      rotation += ROTATION_SPEED;
      const cx = w * CENTER_X_RATIO;
      const cy = h * CENTER_Y_RATIO;

      for (const p of particles) {
        const a = p.angle + rotation;
        const x = cx + Math.cos(a) * p.radius;
        const y = cy + Math.sin(a) * p.radius * 0.42;

        p.opacity += p.opacityDelta;
        if (p.opacity > 1) {
          p.opacity = 1;
          p.opacityDelta *= -1;
        }
        if (p.opacity < 0.15) {
          p.opacity = 0.15;
          p.opacityDelta *= -1;
        }

        const light = Math.min(1, p.opacity * 1.08);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 72%, 74%, ${light})`;
        ctx.fill();
      }

      drawCore(cx, cy);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ''}`}
    />
  );
};

export default GalaxyBackground;
