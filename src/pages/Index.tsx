import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Menu from '@/components/sections/Menu';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Awards from '@/components/sections/Awards';
import Reservations from '@/components/sections/Reservations';
import Footer from '@/components/sections/Footer';
import FloatingReserveCTA from '@/components/shared/FloatingReserveCTA';
import BackToTop from '@/components/shared/BackToTop';

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Testimonials />
      <Awards />
      <Reservations />
      <Footer />
      <FloatingReserveCTA />
      <BackToTop />
    </main>
  );
};

export default Index;
