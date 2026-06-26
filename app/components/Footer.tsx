'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#partners' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Privacy', href: '#' },
];

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* CTA Section */}
      <section
        id="contact"
        style={{
          paddingTop: '10rem',
          paddingBottom: '10rem',
          textAlign: 'center',
        }}
      >
        <div ref={ctaRef}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <h2
              className="heading-serif heading-lg"
              style={{ color: '#ffffff', marginBottom: '1.5rem' }}
            >
              Your brand,
              <br />
              globally within reach.
            </h2>

            <p
              className="text-body"
              style={{
                maxWidth: '500px',
                margin: '0 auto',
                marginBottom: '3rem',
              }}
            >
              We connect ambitious brands with the right markets, partners, and
              logistics — so you can scale internationally with confidence.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a href="mailto:info@marketreach.global" className="btn-primary">
                Start a Conversation
              </a>
              <a href="#partners" className="btn-ghost">
                View Partner Brands
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '3rem clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '14px',
              letterSpacing: '0.12em',
              color: 'var(--text)',
            }}
          >
            MARKET REACH
          </div>

          {/* Links */}
          <nav
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--text)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    'var(--text-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div
            style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
          >
            © 2025 Market Reach International
          </div>
        </div>

        {/* Mobile responsive: stack vertically */}
        <style>{`
          @media (max-width: 640px) {
            footer > div {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center;
            }
          }
        `}</style>
      </footer>
    </>
  );
}
