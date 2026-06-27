'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const bentoColumns = [
  {
    type: 'image-bottom-text',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Our People',
    text: 'MRI is powered by passionate professionals and industry experts who bring both excellence and heart into everything we do.',
  },
  {
    type: 'image-stack',
    image1: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    image2: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    type: 'image-bottom-text',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Ecosystem',
    text: 'Backed by the ecosystem of 8VX Holdings and alongside sister companies McLane and Nutrafinity.',
  },
  {
    type: 'image-stack',
    image1: 'https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=800',
    image2: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    type: 'image-bottom-text',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Global Reach',
    text: 'With operations that reach across continents, we continue to create meaningful impact by helping brands move further and connect with customers worldwide.',
  }
];

const MobileParallaxCard = ({ col, i, isMobile }: { col: any, i: number, isMobile: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ['-40vw', '0vw', '0vw', '-20vw']);
  const xRight = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ['40vw', '0vw', '0vw', '20vw']);
  const xMobile = i % 2 === 0 ? xLeft : xRight;
  const xDesktop = useTransform(scrollYProgress, [0, 1], ['0vw', '0vw']);
  const x = isMobile ? xMobile : xDesktop;

  const rotateYLeft = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ['40deg', '0deg', '0deg', '20deg']);
  const rotateYRight = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ['-40deg', '0deg', '0deg', '-20deg']);
  const rotateYMobile = i % 2 === 0 ? rotateYLeft : rotateYRight;
  const rotateYDesktop = useTransform(scrollYProgress, [0, 1], ['0deg', '0deg']);
  const rotateY = isMobile ? rotateYMobile : rotateYDesktop;

  const opacityMobile = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], [0, 1, 1, 0]);
  const opacityDesktop = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const opacity = isMobile ? opacityMobile : opacityDesktop;

  return (
    <motion.div
      ref={cardRef}
      className="gallery-card"
      style={{
        x,
        rotateY,
        opacity,
        flexShrink: 0,
        width: 'clamp(300px, 28vw, 420px)',
        height: '65vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        transformOrigin: 'center center',
      }}
    >
      {col.type === 'solid-center-text' && (
        <div 
          className="hover-animated-border gallery-card-inner"
          style={{ flex: 1, background: 'linear-gradient(145deg, rgba(30, 45, 60, 0.3), rgba(15, 20, 25, 0.5))', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        >
          <div className="gallery-glass-pill" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(15px)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
            {col.tag && <span className="label-upper" style={{ color: 'var(--accent)', display: 'block', marginBottom: '1.5rem', fontSize: '0.75rem' }}>{col.tag}</span>}
            <p className="text-body" style={{ color: '#fff', fontSize: '1.1rem', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{col.text}</p>
          </div>
        </div>
      )}

      {col.type === 'solid-bottom-text' && (
        <div 
          className="hover-animated-border gallery-card-inner"
          style={{ flex: 1, background: 'linear-gradient(145deg, rgba(30, 45, 60, 0.3), rgba(15, 20, 25, 0.5))', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        >
          <div className="gallery-glass-pill" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(15px)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', width: '100%', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
            {col.tag && <span className="label-upper" style={{ color: 'var(--accent)', display: 'block', marginBottom: '1.5rem', fontSize: '0.75rem' }}>{col.tag}</span>}
            <p className="text-body" style={{ color: '#fff', fontSize: '1.1rem', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{col.text}</p>
          </div>
        </div>
      )}

      {col.type === 'image-stack' && (
        <>
          <div className="hover-animated-border gallery-card-inner" style={{ flex: 1, borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', minHeight: '15vh' }}>
            <img src={col.image1} className="img-fill" style={{ objectFit: 'cover' }} alt="MRI Team" loading="lazy" />
          </div>
          <div className="hover-animated-border gallery-card-inner" style={{ flex: 1, borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', minHeight: '15vh' }}>
            <img src={col.image2} className="img-fill" style={{ objectFit: 'cover' }} alt="MRI Operations" loading="lazy" />
          </div>
        </>
      )}

      {col.type === 'image-bottom-text' && (
        <div className="hover-animated-border gallery-card-inner" style={{ flex: 1, borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <img src={col.image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} alt="MRI Ecosystem" loading="lazy" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,30,0.85) 0%, transparent 60%)', zIndex: 0 }} />
          
          {/* Separate Solid Gray Title Pill */}
          {col.tag && (
            <div className="gallery-title-pill" style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              left: '1.5rem', 
              background: '#3a3a3a',
              padding: '4px 12px',
              borderRadius: '100px', 
              zIndex: 1
            }}>
              <span className="label-upper" style={{ color: '#d4663d', margin: 0, letterSpacing: '0.15em', fontSize: '0.7rem', fontWeight: 600 }}>{col.tag}</span>
            </div>
          )}

          <div className="gallery-glass-pill" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(15px)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.15)', width: '100%', zIndex: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <p className="text-body" style={{ color: '#fff', fontSize: '1.05rem', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{col.text}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Phase 1: Entrance (0 to 0.15)
  const viewportX = useTransform(scrollYProgress, [0, 0.15], ['100vw', '0vw']);
  
  // Phase 2: Horizontal Slide (0.15 to 0.85)
  // We use static arrays for useTransform to prevent Framer Motion from throwing state update warnings during render
  const trackXDesktop = useTransform(scrollYProgress, [0.15, 0.85], ['5%', '-60%']);
  const trackXMobile = useTransform(scrollYProgress, [0.15, 0.85], ['5%', '-80%']);
  const trackX = isMobile ? trackXMobile : trackXDesktop;

  // Phase 3: Upward 3D Deep Dive Exit (0.85 to 1)
  const viewportY = useTransform(scrollYProgress, [0.85, 1], ['0vh', '-100vh']);
  const viewportRotateX = useTransform(scrollYProgress, [0.85, 1], ['0deg', '45deg']);
  const viewportZ = useTransform(scrollYProgress, [0.85, 1], ['0px', '-2000px']);
  const viewportScale = useTransform(scrollYProgress, [0.85, 1], [1, 0.6]);
  const viewportBlur = useTransform(scrollYProgress, [0.85, 1], ['blur(0px)', 'blur(10px)']);
  
  // Global Opacity
  const viewportOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      id="partners"
      ref={sectionRef}
      style={{
        height: '400vh', // Inline height (will be overridden to auto on mobile by CSS)
        position: 'relative',
        zIndex: 2,
        background: 'transparent',
        marginBottom: '-40vh', // Inline margin (will be overridden to 0 on mobile by CSS)
      }}
    >
      <div
        className="gallery-sticky-wrapper"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          perspective: '2000px', // Crucial for the deep dive
        }}
      >
        {/* Global Viewport Wrapper: Handles Entrance and Exit for ALL elements */}
        <motion.div
          className="gallery-viewport"
          style={{
            x: viewportX,
            y: viewportY,
            rotateX: viewportRotateX,
            z: viewportZ,
            scale: viewportScale,
            opacity: viewportOpacity,
            filter: viewportBlur,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transformOrigin: 'bottom center', // Tilt back smoothly from the bottom
          }}
        >
          {/* Title area */}
          <div
            className="gallery-title-area"
            style={{
              paddingLeft: 'clamp(1.5rem, 4vw, 5rem)',
              marginBottom: '3rem',
            }}
          >
            <p className="label-upper" style={{ marginBottom: '0.75rem', color: 'var(--accent2)' }}>
              What We Do
            </p>
            <h2 className="heading-serif heading-md" style={{ letterSpacing: '-0.02em' }}>
              Every brand. Every market.
            </h2>
          </div>

          {/* Horizontal Track: Handles the middle scrolling phase */}
          <motion.div
            className="gallery-track"
            style={{
              x: trackX,
              display: 'flex',
              gap: '1.5rem',
              paddingLeft: 'clamp(1.5rem, 4vw, 5rem)',
              paddingRight: '10vw', 
              transformStyle: 'preserve-3d',
            }}
          >
            {bentoColumns.map((col, i) => (
              <MobileParallaxCard key={i} col={col} i={i} isMobile={isMobile} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive Vertical Layout Override */}
      <style>{`
        @media (max-width: 900px) {
          /* Kill the 400vh scroll track and negative margin */
          #partners {
            height: auto !important;
            margin-bottom: 0 !important;
            padding: 4rem 0 !important;
          }

          /* Stop pinning the container */
          .gallery-sticky-wrapper {
            position: relative !important;
            height: auto !important;
            overflow: visible !important;
          }

          /* Force disable all Framer Motion inline transforms (Entry/Exit 3D effects) */
          .gallery-viewport {
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
            display: block !important;
          }

          .gallery-title-area {
            margin-bottom: 2rem !important;
          }

          /* Force disable the horizontal slide and switch to vertical stacking */
          .gallery-track {
            transform: none !important;
            flex-direction: column !important;
            padding-right: clamp(1.5rem, 4vw, 5rem) !important;
            gap: 1.5rem !important;
          }

          /* Make cards significantly smaller for vertical viewing */
          .gallery-card {
            width: 100% !important;
            height: auto !important;
            min-height: 25vh !important;
          }

          .gallery-card-inner {
            padding: 1rem !important;
          }

          .gallery-glass-pill {
            padding: 1.25rem !important;
          }

          .gallery-glass-pill .text-body {
            font-size: 0.95rem !important;
            line-height: 1.4 !important;
          }
          
          .gallery-title-pill {
            top: 1rem !important;
            left: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
