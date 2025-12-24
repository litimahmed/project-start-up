import { useState, useEffect, useRef } from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reservations = () => {
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
      id="reservations"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div
            className={`text-offwhite transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4">
              Rejoignez-nous
            </p>
            <h2 className="font-luxury text-4xl md:text-5xl lg:text-6xl mb-6">
              Faites une <span className="italic">Réservation</span>
            </h2>
            <div className="w-24 h-px bg-gold mb-8 mx-auto" />
            <p className="font-luxury text-offwhite/70 leading-relaxed mb-12 max-w-xl mx-auto text-lg">
              Nous vous invitons à nous rejoindre pour une expérience culinaire inoubliable. 
              Réservez votre table dès aujourd'hui et laissez-nous vous emmener dans un voyage 
              gastronomique célébrant les meilleurs ingrédients de saison.
            </p>

            {/* Info Cards */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-gold" size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-lg text-offwhite mb-1">Horaires</h4>
                  <p className="font-sans text-sm text-offwhite/60">
                    Mar - Dim: 12h - 14h30 / 19h - 22h30
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Users className="text-gold" size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-lg text-offwhite mb-1">Événements</h4>
                  <p className="font-sans text-sm text-offwhite/60">
                    Groupes de 8+ personnes bienvenus
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/reservations"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.15em] uppercase hover:bg-gold/90 transition-all duration-300 shadow-lg shadow-gold/30"
            >
              <span>Réserver une table</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
