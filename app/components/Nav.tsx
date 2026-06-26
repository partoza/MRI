'use client';
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [theme]);

  const handleClick = useCallback((href: string) => {
    setIsHovered(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          width: isHovered ? 380 : 320, /* Increased width */
          borderRadius: 24,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          background: 'var(--nav-bg)',
          color: 'var(--nav-text)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(128,128,128,0.4)', /* More visible border */
        }}
      >
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 52,
          padding: '0 24px',
        }}>
          <span style={{ fontWeight: 800, fontSize: 18, fontFamily: 'var(--font-poppins)', cursor: 'pointer' }}>MRI</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            
            {/* Menu Trigger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setIsHovered(!isHovered)}>
              <span style={{ fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-poppins)', letterSpacing: '0.02em' }}>Menu</span>
              <motion.svg 
                animate={{ rotate: isHovered ? 180 : 0 }}
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ opacity: 0.7 }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </motion.svg>
            </div>

            {/* Vertical Divider */}
            <div style={{ width: 1, height: 16, background: 'rgba(128,128,128,0.3)' }} />

            {/* Theme Toggle - Positioned at the most right */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--nav-text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(15deg)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 20, height: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', padding: '0 20px 20px' }}>
                <div style={{ fontSize: 10, color: '#888', marginBottom: 10, marginTop: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Menu</div>
                {navLinks.map((link, idx) => (
                  <button
                    key={link.label}
                    onClick={() => handleClick(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      padding: '10px 0',
                      fontSize: 18,
                      fontFamily: 'var(--font-poppins)',
                      cursor: 'pointer',
                      color: idx === 0 ? 'var(--accent)' : 'var(--nav-text)', // First one uses accent color
                      borderBottom: idx === navLinks.length - 1 ? 'none' : '1px solid rgba(128,128,128,0.2)',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = idx === 0 ? 'var(--accent)' : 'var(--nav-text)')}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
