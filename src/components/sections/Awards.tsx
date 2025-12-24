import { useState, useEffect, useRef } from 'react';
import { Award, Star, Sparkles } from 'lucide-react';

const awards = [
  {
    id: 1,
    icon: Star,
    title: 'Étoile Michelin',
    year: '2023',
    description: 'Excellence culinaire reconnue',
  },
  {
    id: 2,
    icon: Award,
    title: 'Gault & Millau',
    year: '2024',
    description: '17/20 - Cuisine remarquable',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Best of Paris',
    year: '2024',
    description: 'Top 10 Gastronomique',
  },
];

const pressLogos = [
  { name: 'Le Figaro', text: 'LE FIGARO' },
  { name: 'Le Monde', text: 'LE MONDE' },
  { name: 'Vogue', text: 'VOGUE' },
  { name: 'GQ', text: 'GQ' },
];

const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-offwhite overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/80 mb-3">
            Reconnaissance
          </p>
          <h2 className="font-luxury text-3xl md:text-4xl lg:text-5xl text-charcoal italic mb-4">
            Distinctions & <span className="text-gold">Presse</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-charcoal/20" />
            <Award className="w-5 h-5 text-gold/60" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-charcoal/20" />
          </div>
        </div>

        {/* Awards Grid */}
        <div 
          className={`grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={award.id}
                className="group relative text-center p-8 bg-white border border-charcoal/5 hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-transparent group-hover:border-gold/30 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-transparent group-hover:border-gold/30 transition-colors duration-500" />

                {/* Icon */}
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-full h-full flex items-center justify-center bg-charcoal/5 rounded-full group-hover:bg-gold/10 transition-colors duration-500">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-luxury text-xl text-charcoal italic mb-1 group-hover:text-gold transition-colors duration-300">
                  {award.title}
                </h3>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">
                  {award.year}
                </p>
                <p className="font-sans text-sm text-charcoal/60">
                  {award.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Press Logos */}
        <div 
          className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-center font-sans text-xs tracking-[0.2em] uppercase text-charcoal/40 mb-8">
            Ils parlent de nous
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {pressLogos.map((logo, index) => (
              <div
                key={logo.name}
                className="font-serif text-xl md:text-2xl text-charcoal/20 hover:text-charcoal/50 transition-colors duration-500 tracking-widest"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {logo.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
