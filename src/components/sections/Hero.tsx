import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')`,
          transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0002})`,
        }}
      >
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/50 to-charcoal/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-charcoal/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Decorative Line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent mb-8 opacity-0 animate-fade-in" />

        {/* Tagline */}
        <p className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-gold/90 mb-6 opacity-0 animate-fade-in animation-delay-200">
          Depuis 2024 — Haute Gastronomie
        </p>

        {/* Main Headline */}
        <h1 className="font-luxury text-5xl md:text-7xl lg:text-8xl tracking-[0.02em] text-offwhite italic mb-6 opacity-0 animate-fade-in animation-delay-300">
          Maison le Sept
        </h1>

        {/* Subtitle */}
        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-offwhite/90 italic mb-3 opacity-0 animate-fade-in animation-delay-400">
          Expériences Culinaires d'Exception
        </p>

        {/* Decorative Separator */}
        <div className="flex items-center gap-4 my-6 opacity-0 animate-fade-in animation-delay-500">
          <div className="w-16 h-px bg-gold/50" />
          <div className="w-2 h-2 rotate-45 border border-gold/50" />
          <div className="w-16 h-px bg-gold/50" />
        </div>

        {/* Secondary Tagline */}
        <p className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-offwhite/60 mb-12 opacity-0 animate-fade-in animation-delay-600">
          Là où la Saveur Rencontre l'Art
        </p>

        {/* CTA Button */}
        <a
          href="#reservations"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-gold/30 opacity-0 animate-fade-in animation-delay-700 border border-gold"
        >
          <span className="relative z-10 group-hover:text-gold transition-colors duration-500">
            Réserver une Table
          </span>
          <div className="absolute inset-0 bg-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-offwhite/50 hover:text-gold transition-colors cursor-pointer opacity-0 animate-fade-in animation-delay-800"
        aria-label="Défiler vers la section à propos"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Découvrir</span>
        <ChevronDown className="animate-scroll-indicator" size={20} />
      </button>

      {/* Side decorative elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-offwhite/20 to-transparent" />
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-offwhite/30 writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Défiler
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-offwhite/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
