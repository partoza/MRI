'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 60, suffix: '+', label: 'Global Partners' },
  { value: 5000, suffix: '+', label: 'SKUs Managed' },
  { value: 4, suffix: '', label: 'Continents Reached' },
];

function formatValue(current: number): string {
  // Uses standard US formatting to ensure 5000 becomes 5,000
  return new Intl.NumberFormat('en-US').format(Math.round(current));
}

function AnimatedStat({ item, index, inView }: { item: StatItem; index: number; inView: boolean }) {
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => formatValue(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, item.value, {
        duration: 2.5,
        delay: index * 0.2, // Staggered counting
        ease: [0.16, 1, 0.3, 1], // Smooth ease
      });
      return controls.stop;
    }
  }, [inView, item.value, index, count]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div
        className="heading-serif"
        style={{
          fontSize: 'clamp(3rem, 4vw, 4rem)',
          fontWeight: 600,
          lineHeight: 1,
          marginBottom: '0.75rem',
          color: 'var(--text)',
          display: 'flex',
          alignItems: 'center',
          letterSpacing: '-0.02em',
        }}
      >
        <motion.span>{displayValue}</motion.span>
        <span style={{ color: 'var(--accent)' }}>{item.suffix}</span>
      </div>
      <div
        className="text-body"
        style={{
          color: 'var(--text-muted)',
          fontSize: '1rem',
          fontWeight: 400,
        }}
      >
        {item.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Triggers the text on the left slightly earlier
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Triggers the counting animations only when the grid itself is fully visible!
  // This prevents the counting from finishing behind the Gallery exit animation.
  const isGridInView = useInView(gridRef, { once: true, amount: 0.8 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: any[] = [];
    let mouse = { x: null as number | null, y: null as number | null };

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
          canvas.width = rect.width;
          canvas.height = rect.height;
          init();
        }
      } else if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        init();
      }
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      update(mousePos: {x: number | null, y: number | null}) {
        let dx = (mousePos.x ?? this.baseX) - this.x;
        let dy = (mousePos.y ?? this.baseY) - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let maxDistance = 200; 

        if (mousePos.x !== null && mousePos.y !== null && distance < maxDistance) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }

      draw() {
        ctx!.fillStyle = '#3b82f6'; // Blue color
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas!.width * canvas!.height) / 9000; 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);
    
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    }

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove as any);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove as any);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="insights"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '80vh',
        background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 15%, var(--bg) 85%, transparent 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container-wide" style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: 'clamp(3rem, 6vw, 8rem)',
            alignItems: 'center',
          }}
        >
          {/* ---- Left: Professional Typography ---- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ paddingRight: '2rem' }}
          >
            <span
              className="label-upper"
              style={{ marginBottom: '1.5rem', display: 'block', color: 'var(--accent2)' }}
            >
              By the Numbers
            </span>
            <h2
              className="heading-serif heading-lg"
              style={{ marginBottom: '1.5rem', color: 'var(--text)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Building global impact.
            </h2>
            <p
              className="text-body"
              style={{ marginBottom: '2.5rem', fontSize: '1.15rem', maxWidth: '95%' }}
            >
              Over the past 15 years, we have consistently scaled our operations and forged deep partnerships across continents. We maintain an undeniable track record of excellence in delivering premium brands to global markets.
            </p>
            <div className="divider" />
          </motion.div>

          {/* ---- Right: Clean 2x2 Stats Grid ---- */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '4rem 3rem',
            }}
          >
            {stats.map((stat, i) => (
              <AnimatedStat key={i} item={stat} index={i} inView={isGridInView} />
            ))}
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          #insights .container-wide > div {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          #insights .container-wide > div > div:first-child {
            padding-right: 0 !important;
          }
        }
        @media (max-width: 500px) {
          #insights .container-wide > div > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
