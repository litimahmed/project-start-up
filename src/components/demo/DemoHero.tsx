import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DemoHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-foreground">
      {/* Background with food imagery overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/98 to-foreground" />
      
      {/* Decorative food elements - positioned around the hero */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-60 hidden lg:block">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
      </div>
      <div className="absolute top-20 right-20 w-40 h-40 opacity-40 hidden lg:block">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-3xl" />
      </div>
      <div className="absolute bottom-32 left-1/4 w-24 h-24 opacity-50 hidden lg:block">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
      </div>

      {/* Gold decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/60 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        {/* Pre-title badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <span className="text-primary text-xs tracking-[0.2em] uppercase">Premium HTML Template</span>
        </div>

        {/* Main title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-background mb-4 tracking-wide">
          MAISON LE SEPT
        </h1>
        
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
          <div className="w-2 h-2 rotate-45 border border-primary/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
        </div>

        {/* Tagline */}
        <p className="text-primary text-sm tracking-[0.4em] uppercase mb-6">
          Restaurant & Fine Dining
        </p>

        {/* Subtitle */}
        <p className="text-background/60 text-lg md:text-xl max-w-3xl mx-auto mb-4 font-light">
          The perfect choice for your restaurant and homepages — 7+ inner pages
        </p>
        
        <p className="text-background/50 text-base max-w-2xl mx-auto mb-12">
          Discover Maison le Sept, a modern React template designed for restaurant, 
          coffee bars, cafes, and bistros with complete admin dashboard and reservation system.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="group bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-base font-medium tracking-wide"
          onClick={() => navigate('/')}
        >
          View Live Preview
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Bottom curve decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default DemoHero;
