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
  
  // Triggers the text on the left slightly earlier
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Triggers the counting animations only when the grid itself is fully visible!
  // This prevents the counting from finishing behind the Gallery exit animation.
  const isGridInView = useInView(gridRef, { once: true, amount: 0.8 });

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
      }}
    >
      <div className="container-wide" style={{ width: '100%' }}>
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
