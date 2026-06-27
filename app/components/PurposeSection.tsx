'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function PurposeSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Set up scroll tracking for the 500vh sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Add a spring to smooth out the scroll progress, adding beautiful inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70, 
    damping: 20,   
    restDelta: 0.001
  });

  // --- DESKTOP ANIMATION VALUES ---
  // Phase 1 (0 to 0.2): Purpose card moves to center horizontally & shrinks width/height slightly
  const purposeLeftDesk = useTransform(smoothProgress, [0, 0.2], ["0%", "33.333%"]);
  const purposeWidthDesk = useTransform(smoothProgress, [0, 0.2], ["50%", "33.333%"]);
  const purposeHeightDesk = useTransform(smoothProgress, [0, 0.2], ["80vh", "60vh"]);
  const purposeTopDesk = useTransform(smoothProgress, [0, 0.2], ["10vh", "20vh"]);

  // --- MOBILE ANIMATION VALUES ---
  // Phase 1 (0 to 0.2): Purpose card shrinks vertically, stays full width
  const purposeTopMob = useTransform(smoothProgress, [0, 0.2], ["0%", "33.333%"]);
  const purposeHeightMob = useTransform(smoothProgress, [0, 0.2], ["100%", "33.333%"]);
  const purposeWidthMob = useTransform(smoothProgress, [0, 0.2], ["100%", "100%"]);

  // --- SHARED ANIMATION VALUES (Applies to both layouts) ---
  // Phase 2 (0.2 to 0.3): Mission slides in horizontally
  const missionX = useTransform(smoothProgress, [0.2, 0.3], ["-100%", "0%"]);
  const missionOpacity = useTransform(smoothProgress, [0.2, 0.3], [0, 1]);

  // Phase 3 (0.3 to 0.4): Vision slides in horizontally
  const visionX = useTransform(smoothProgress, [0.3, 0.4], ["100%", "0%"]);
  const visionOpacity = useTransform(smoothProgress, [0.3, 0.4], [0, 1]);

  // Phase 4 (0.4 to 0.85): Hold everything static (3 scrolls to stay)

  // Phase 5 (0.85 to 1.0): Fade out the entire layout before exiting section
  const finalOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0]);

  // Particle System
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
        ctx!.fillStyle = '#3b82f6';
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

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove as any);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (resizeObserver) resizeObserver.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove as any);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="purpose"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '350vh', // Reduced height for tighter scrolling transition
        background: 'transparent',
        zIndex: 10,
      }}
    >
      {/* Sticky Inner Wrapper */}
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh', // Locks into viewport
        background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 15%, var(--bg) 100%)',
        overflow: 'hidden', // Crucial to prevent horizontal scrollbars during animations
      }}>
        
        {/* Particle Canvas spanning the entire background */}
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

        {/* Scrollable Layout Container */}
        <motion.div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 10,
          opacity: finalOpacity,
        }}>
          
          {/* MISSION CARD (Slides in top on mobile, left on desktop) */}
          <motion.div 
            className="mission-card card-inner"
            style={{
              x: missionX,
              opacity: missionOpacity,
              zIndex: 3,
            }}
          >
            <div className="card-bg">
              <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Mission" className="card-img" fetchPriority="high" loading="eager" />
              <div className="card-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)' }} />
              <div className="card-shadow" />
            </div>
            <div className="card-text">
              <h3 className="heading-sans">Our Mission</h3>
              <p>Forging global partnerships to<br />place world-class solutions<br />within reach.</p>
            </div>
          </motion.div>


          {/* PURPOSE CARD (Starts large, shrinks and centers) */}
          <motion.div 
            className="purpose-card card-inner"
            style={{
              "--p-left-desk": purposeLeftDesk,
              "--p-top-desk": purposeTopDesk,
              "--p-width-desk": purposeWidthDesk,
              "--p-height-desk": purposeHeightDesk,
              "--p-top-mob": purposeTopMob,
              "--p-width-mob": purposeWidthMob,
              "--p-height-mob": purposeHeightMob,
              zIndex: 5, 
            } as any}
          >
            <div className="card-bg">
              <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Purpose" className="card-img" fetchPriority="high" loading="eager" />
              <div className="card-overlay" style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)' }} />
              <div className="card-shadow" />
            </div>
            <div className="card-text purpose-text">
              <h3 className="heading-sans">Our Purpose</h3>
              <p>Reaching every home through<br />Filipino excellence.</p>
            </div>
          </motion.div>


          {/* VISION CARD (Slides in bottom on mobile, right on desktop) */}
          <motion.div 
            className="vision-card card-inner"
            style={{
              x: visionX,
              opacity: visionOpacity,
              zIndex: 3,
            }}
          >
            <div className="card-bg">
              <img src="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Vision" className="card-img" fetchPriority="high" loading="eager" />
              <div className="card-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)' }} />
              <div className="card-shadow" />
            </div>
            <div className="card-text">
              <h3 className="heading-sans">Our Vision</h3>
              <p>To become a Top 10 global<br />Filipino company, reaching 4<br />billion people across 195<br />countries.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Embedded CSS for clean mapping of Framer Motion variables and layout */}
      <style>{`
        /* Universal Card Internal Architecture */
        .card-inner {
          position: absolute;
          display: flex;
          flex-direction: column;
          padding: 0;
        }
        .card-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          box-shadow: 0 0 100px 60px var(--bg), 0 0 40px 20px var(--bg); /* Outer massive shadow */
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .card-shadow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 60px 30px var(--bg), inset 0 0 20px 10px var(--bg); /* Inner thick shadow */
          pointer-events: none;
          z-index: 1;
        }
        .card-text {
          position: relative;
          z-index: 2;
          padding: clamp(3rem, 5vw, 5rem);
        }
        .card-text h3 {
          color: #ffffff;
          font-size: clamp(2.5rem, 3.5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .card-text p {
          color: #ffffff;
          font-size: clamp(1.1rem, 1.5vw, 1.4rem);
          line-height: 1.4;
        }

        /* --- DESKTOP LAYOUT --- */
        @media (min-width: 901px) {
          .mission-card {
            left: 0;
            top: 20vh;
            width: 33.333%;
            height: 60vh;
            justify-content: flex-start;
            align-items: flex-start;
          }
          .purpose-card {
            left: var(--p-left-desk);
            top: var(--p-top-desk);
            width: var(--p-width-desk);
            height: var(--p-height-desk);
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .vision-card {
            right: 0;
            top: 20vh;
            width: 33.333%;
            height: 60vh;
            justify-content: flex-end;
            align-items: flex-start;
          }
        }

        /* --- MOBILE LAYOUT --- */
        @media (max-width: 900px) {
          .mission-card {
            top: 0;
            left: 0;
            width: 100%;
            height: 33.333vh;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .mission-card .card-overlay {
             background: radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%) !important;
          }
          .purpose-card {
            top: var(--p-top-mob);
            left: 0;
            width: var(--p-width-mob);
            height: var(--p-height-mob);
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .vision-card {
            bottom: 0;
            left: 0;
            width: 100%;
            height: 33.333vh;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .vision-card .card-overlay {
             background: radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%) !important;
          }

          .card-text p {
             font-size: 1rem; /* Slightly smaller on mobile to ensure it fits perfectly in the thirds */
          }
          .card-text h3 {
             font-size: 2rem;
             margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
