import { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: string;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        type: ['chart', 'candlestick', 'trend'][Math.floor(Math.random() * 3)]
      });
    }

    const drawStockSymbol = (x: number, y: number, size: number, type: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
      ctx.lineWidth = 1;

      if (type === 'chart') {
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x - size * 0.5, y - size * 0.7);
        ctx.lineTo(x, y - size * 0.3);
        ctx.lineTo(x + size * 0.5, y - size);
        ctx.lineTo(x + size, y - size * 0.5);
        ctx.stroke();
      } else if (type === 'candlestick') {
        ctx.fillStyle = Math.random() > 0.5
          ? `rgba(16, 185, 129, ${opacity})`
          : `rgba(239, 68, 68, ${opacity})`;
        ctx.fillRect(x - size * 0.3, y - size, size * 0.6, size * 2);
        ctx.strokeRect(x - size * 0.1, y - size * 1.5, size * 0.2, size * 3);
      } else {
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y - size);
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(30, 58, 138, 0.03)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(1, 'rgba(30, 58, 138, 0.03)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.x += Math.sin(time + index) * 0.2;
        particle.y += Math.cos(time + index) * 0.2;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        drawStockSymbol(particle.x, particle.y, particle.size, particle.type, particle.opacity);

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 right-0 bottom-0 w-full pointer-events-none z-0"
      style={{
        background: 'linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)',
        height: '100vh',
        maxHeight: '100vh'
      }}
    />
  );
}
