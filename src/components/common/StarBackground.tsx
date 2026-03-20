import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 150;

    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      direction: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random();
        this.direction = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number) {
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Subtle twinkle
        this.opacity += (Math.random() - 0.5) * 0.05;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 1) this.opacity = 1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = Array.from({ length: starCount }, () => new Star(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update(canvas.width, canvas.height);
        star.draw(ctx);
      });
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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default StarBackground;
