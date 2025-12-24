import { lazy, Suspense, memo } from 'react';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';

// Lazy load below-the-fold sections
const About = lazy(() => import('@/components/sections/About'));
const Menu = lazy(() => import('@/components/sections/Menu'));
const Gallery = lazy(() => import('@/components/sections/Gallery'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Reservations = lazy(() => import('@/components/sections/Reservations'));
const Footer = lazy(() => import('@/components/sections/Footer'));
const BackToTop = lazy(() => import('@/components/shared/BackToTop'));

// Minimal section loader
const SectionLoader = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
  </div>
));

SectionLoader.displayName = 'SectionLoader';

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Menu />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Reservations />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </main>
  );
};

export default Index;