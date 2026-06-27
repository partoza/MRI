'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cloudImages = [
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1416862291207-4ca732144d83?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473216853966-2673238fa2c6?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445207436034-7a1a21e64985?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513002749550-c59d8409f5e0?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
];

const layoutBlocks = [
  { type: 'text-card', text: 'MRI is powered by passionate professionals and industry experts who bring both excellence and heart into everything we do.' },
  { type: 'stacked-image', indices: [0, 1] },
  { type: 'image-text-card', index: 2, text: 'Backed by the ecosystem of 8VX Holdings and alongside sister companies McLane and Nutrafinity.' },
  { type: 'stacked-image', indices: [3, 4] },
  { type: 'text-card', text: 'With operations that reach across continents, we continue to create meaningful impact by helping brands move further and connect with customers worldwide.' },
  { type: 'stacked-image', indices: [5, 6] },
  { type: 'image-text-card', index: 7, text: 'Building the future of digital infrastructure through relentless innovation and creativity.' },
  { type: 'stacked-image', indices: [8, 9] },
  { type: 'text-card', text: 'Empowering teams with seamless collaboration and visionary leadership for a connected world.' },
  { type: 'stacked-image', indices: [10, 11] },
  { type: 'image-text-card', index: 12, text: 'Innovating logistics and connecting brands with cutting-edge technology and data-driven insights.' },
  { type: 'stacked-image', indices: [13, 14] },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track pinned phase
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Uncomplicated horizontal slide
  const galleryX = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0vw', 'calc(-100% + 100vw)']
  );

  return (
    <section 
      ref={sectionRef} 
      id="services"
      style={{ 
        position: 'relative', 
        height: isMobile ? 'auto' : '600vh', 
        background: 'var(--bg)', 
        zIndex: 10
      }}
    >
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <motion.div
          style={{
            x: isMobile ? '0%' : galleryX,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '3rem',
            paddingLeft: '5vw',
            paddingRight: '5vw',
            width: isMobile ? '100%' : 'max-content',
            alignItems: 'center',
            paddingTop: isMobile ? '4rem' : '0',
            paddingBottom: isMobile ? '4rem' : '0',
          }}
        >
          {layoutBlocks.map((block, i) => {
            const popupAnimation = {
              initial: { opacity: 0, scale: 0.8, y: 100 },
              whileInView: { opacity: 1, scale: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
            };

            if (block.type === 'text-card') {
              return (
                <motion.div 
                  key={`text-${i}`}
                  {...popupAnimation}
                  style={{
                    width: isMobile ? '90vw' : '450px',
                    height: isMobile ? '60vh' : '75vh',
                    borderRadius: '40px',
                    background: '#FDE599', // Premium yellow/gold
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '2.5rem',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    background: '#FEF2CB', // Lighter inner box
                    borderRadius: '32px',
                    padding: '2.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    marginTop: '2rem',
                    width: '100%',
                  }}>
                    <p style={{
                      color: '#1A365D', // Dark navy text for contrast
                      fontSize: '1.5rem',
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: '500',
                    }}>
                      {block.text}
                    </p>
                  </div>
                </motion.div>
              );
            }

            if (block.type === 'image-text-card') {
              return (
                <motion.div 
                  key={`imgtext-${i}`}
                  {...popupAnimation}
                  style={{
                    width: isMobile ? '90vw' : '450px',
                    height: isMobile ? '60vh' : '75vh',
                    borderRadius: '40px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                >
                  <img 
                    src={cloudImages[block.index as number]} 
                    alt="Gallery" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    fetchPriority="high" 
                    loading="eager"
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '2.5rem',
                    right: '2.5rem',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '32px',
                    padding: '2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)', // Contrast shadow
                  }}>
                    <p style={{
                      color: '#1A365D',
                      fontSize: '1.3rem',
                      lineHeight: 1.5,
                      margin: 0,
                      fontWeight: '500',
                    }}>
                      {block.text}
                    </p>
                  </div>
                </motion.div>
              );
            }

            if (block.type === 'stacked-image') {
              return (
                <motion.div 
                  key={`stacked-${i}`}
                  {...popupAnimation}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2.5rem',
                    width: isMobile ? '90vw' : '450px',
                    height: isMobile ? 'auto' : '75vh',
                    flexShrink: 0,
                  }}
                >
                  {block.indices?.map((imgIndex, j) => (
                    <div 
                      key={j}
                      style={{
                        flex: 1,
                        borderRadius: '40px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        position: 'relative'
                      }}
                    >
                      <img 
                        src={cloudImages[imgIndex]} 
                        alt="Gallery" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                        fetchPriority="high" 
                        loading="eager"
                      />
                    </div>
                  ))}
                </motion.div>
              );
            }
            return null;
          })}
        </motion.div>
      </div>
    </section>
  );
}
