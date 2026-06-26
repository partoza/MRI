'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Track global theme for smooth video crossfading
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Initial load
    setTheme(document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark');
    
    // Observe changes to the html data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="story-video-wrapper">
        {/* Light Mode Video Background */}
        <video
          className="story-video"
          src="/storybg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            opacity: theme === 'light' ? 1 : 0,
          }}
        />

        {/* Dark Mode Video Background */}
        <video
          className="story-video"
          src="/storybg_dark.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            opacity: theme === 'dark' ? 1 : 0,
          }}
        />

        {/* Top and Bottom Blending Gradients (Desktop only) */}
        <div
          className="absolute-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 15%, transparent 85%, var(--bg) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="story-content-wrapper"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingLeft: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <motion.div
          className="story-text-container"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '35%',
            marginTop: 'clamp(4rem, 10vh, 8rem)',
          }}
        >
          <p
            className="heading-serif story-text"
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 2.2rem)',
              lineHeight: 1.4,
              color: 'var(--text)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              textAlign: 'justify',
            }}
          >
            In just 15 years, we&rsquo;ve grown into{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
              a trusted global FMCG logistics and supply partner,
            </span>{' '}
            specializing in arbitrage, trade financing, custom packaging, and tailored client solutions.
          </p>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* Desktop base styles for the video wrapper */
        .story-video-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .story-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          transition: opacity 1.2s ease-in-out;
        }

        @media (max-width: 900px) {
          /* Restore absolute overlay and push text to the bottom */
          #our-story {
            align-items: flex-end !important;
            padding-bottom: 12vh !important;
          }

          /* Center the wrapper and remove left padding */
          .story-content-wrapper {
            padding-left: 0 !important;
            display: flex !important;
            justify-content: center !important;
          }

          .story-text-container {
            max-width: 85% !important;
            margin-top: 0 !important;
          }

          .story-text {
            text-align: center !important;
            font-size: clamp(1.3rem, 3vw, 1.8rem) !important;
          }

          /* Add a slight dark gradient at the bottom so the centered text is readable */
          .absolute-overlay {
            background: linear-gradient(to bottom, var(--bg) 0%, transparent 15%, rgba(10,10,10,0.6) 70%, var(--bg) 100%) !important;
          }
        }

        @media (max-width: 600px) {
          #our-story {
            padding-bottom: 8vh !important;
          }
          .story-text-container {
            max-width: 95% !important;
          }
          .story-text {
            font-size: clamp(1.1rem, 4.5vw, 1.4rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
