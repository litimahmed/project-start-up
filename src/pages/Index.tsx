import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Menu from '@/components/sections/Menu';
import Gallery from '@/components/sections/Gallery';
import Reservations from '@/components/sections/Reservations';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservations />
      <Footer />
    </main>
  );
};

export default Index;
