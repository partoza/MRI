'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Phase 1: "Fly-Away" Big Text
  // Extreme cinematic fly-away: shrinks, flips backward, and flies up
  const bigTextScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.5]);
  const bigTextRotateX = useTransform(scrollYProgress, [0, 0.15], ['0deg', '80deg']);
  const bigTextY = useTransform(scrollYProgress, [0, 0.15], ['0vh', '-80vh']);
  
  // Wait until it reaches the massive framed state (0.12) before dissolving and blurring
  const bigTextOpacity = useTransform(scrollYProgress, [0.12, 0.15], [1, 0]);
  const bigTextBlur = useTransform(scrollYProgress, [0.12, 0.15], ['blur(0px)', 'blur(50px)']);
  const bigTextLetterSpacing = useTransform(scrollYProgress, [0, 0.15], ['-0.02em', '0.2em']);

  // Phase 2: Dynamic Video Card Creation
  const scale = useTransform(scrollYProgress, [0.15, 0.45, 0.6, 1], [1, 0.8, 0.8, 0.6]);
  const borderRadius = useTransform(scrollYProgress, [0.15, 0.45, 1], ['0rem', '3.5rem', '3.5rem']);

  // Phase 2: Small Text "3D Cinematic Drop"
  // Reaches its final state instantly on the first touch of the scroll
  const smallTextY = useTransform(scrollYProgress, [0, 0.04], ['-40vh', '0vh']);
  const smallTextRotateX = useTransform(scrollYProgress, [0, 0.04], ['-80deg', '0deg']);
  const smallTextOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const smallTextScale = useTransform(scrollYProgress, [0, 0.04], [0.8, 1]);
  const smallTextLetterSpacing = useTransform(scrollYProgress, [0, 0.05], ['-0.05em', '0.02em']);

  // Phase 3: Extreme Parallax Deep Dive
  const rotateX = useTransform(scrollYProgress, [0.5, 1], ['0deg', '45deg']);
  const z = useTransform(scrollYProgress, [0.5, 1], ['0px', '-3500px']);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const videoBlur = useTransform(scrollYProgress, [0.7, 1], ['blur(0px)', 'blur(15px)']);

  return (
    <section ref={containerRef} style={{ height: '300vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '2000px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {/* INSANE Big Text Fly-Through */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            scale: bigTextScale,
            opacity: bigTextOpacity,
            filter: bigTextBlur,
            rotateX: bigTextRotateX,
            y: bigTextY,
            transformOrigin: 'center center',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            zIndex: 15,
            pointerEvents: 'none',
            padding: '0 5%',
            textAlign: 'center',
          }}
        >
          <motion.h1 
            className="heading-xl" 
            style={{ 
              color: 'var(--white)', 
              textShadow: '0 8px 30px rgba(0,0,0,0.8)', 
              lineHeight: 1.05,
              letterSpacing: bigTextLetterSpacing,
              fontWeight: 700
            }}
          >
            Your Global Gateway <br /> to{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span className="text-gradient-moving">PREMIUM BRANDS.</span>
              <span className="shining-star" style={{ right: '-20px', top: '10px' }} />
            </span>
          </motion.h1>
        </motion.div>

        {/* 3D Flip Small Text */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingBottom: '15%',
            y: smallTextY,
            rotateX: smallTextRotateX,
            scale: smallTextScale,
            opacity: smallTextOpacity,
            zIndex: 10,
            pointerEvents: 'none',
            paddingLeft: '5%',
            paddingRight: '5%',
            textAlign: 'center',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Animated Gradient Border Glassmorphism Card */}
          <div className="animated-border-wrapper">
            <h2 className="heading-md" style={{ color: 'var(--white)', margin: 0, fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 400 }}>
              Delivered to you, efficiently and reliably.
            </h2>
          </div>
        </motion.div>

        {/* Extreme Parallax Video */}
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            scale,
            borderRadius,
            rotateX,
            z,
            opacity,
            filter: videoBlur,
            overflow: 'hidden',
            transformOrigin: 'bottom center',
            boxShadow: '0 40px 80px -10px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}
        >
          {/* Dark High-Contrast Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))', zIndex: 1, pointerEvents: 'none' }} />
          
          <video
            src="/mri_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="img-fill"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectPosition: 'center 40%', 
              objectFit: 'cover', 
              pointerEvents: 'none', 
              position: 'relative', 
              zIndex: 0,
              filter: 'contrast(1.3) brightness(0.6)'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
