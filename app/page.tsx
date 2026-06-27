import SmoothScroll from './components/SmoothScroll';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TechnologySection from './components/TechnologySection';
import PlatformSection from './components/PlatformSection';
import GallerySection from './components/GallerySection';
import PurposeSection from './components/PurposeSection';
import StatsSection from './components/StatsSection';
import StorySection from './components/StorySection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main style={{ background: 'transparent', position: 'relative' }}>

        {/* Global Premium Aurora Gradient Background (No Image Textures) */}
        <div className="aurora-container" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div className="aurora-orb aurora-orb-1" />
          <div className="aurora-orb aurora-orb-2" />
          <div className="aurora-orb aurora-orb-3" />
          <div className="bg-ray-sweep" />
        </div>

        <Nav />
        <Hero />
        
        {/* INSANE Blending Seam */}
        <div style={{ position: 'relative', width: '100%', height: 0, zIndex: 0 }}>
          <div className="seam-glow-orb seam-glow-1" />
          <div className="seam-glow-orb seam-glow-2" />
        </div>

        <PlatformSection />
        <GallerySection />
        <PurposeSection />
        <StatsSection />
        <StorySection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
