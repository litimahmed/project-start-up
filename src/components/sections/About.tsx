import { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977&auto=format&fit=crop"
                alt="Executive Chef preparing a signature dish"
                className="w-full h-full object-cover"
              />
              {/* Gold Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-gold/40" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gold/40" />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 lg:-right-12 bg-charcoal text-offwhite p-6 md:p-8 shadow-2xl">
              <p className="font-serif text-4xl md:text-5xl text-gold mb-2">15+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-offwhite/70">
                Années d'Excellence
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`lg:pl-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Section Label */}
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-secondary mb-4">
              Notre Histoire
            </p>

            {/* Heading */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Une Passion pour la{' '}
              <span className="italic text-primary">Perfection</span>
            </h2>

            {/* Gold Line */}
            <div className="w-24 h-px bg-gold mb-8" />

            {/* Description */}
            <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
              <p>
                Niché au cœur de la ville, Maison le Sept représente l'aboutissement d'un 
                rêve de toute une vie — un sanctuaire où l'art culinaire rencontre 
                une hospitalité sincère. Notre philosophie est simple mais sans compromis : 
                honorer l'ingrédient, respecter le savoir-faire et créer des moments 
                qui perdurent bien après la dernière bouchée.
              </p>
              <p>
                Sous la direction du Chef Exécutif Marcus Laurent, notre cuisine transforme 
                les meilleurs ingrédients de saison et locaux en plats qui racontent des 
                histoires. Chaque assiette est une toile, chaque saveur une note soigneusement 
                composée dans une symphonie de goûts qui célèbre à la fois tradition et innovation.
              </p>
              <p>
                De notre salle à manger intime ornée d'art soigneusement sélectionné à nos 
                menus dégustation méticuleusement élaborés, chaque élément de Maison le Sept est conçu 
                pour vous transporter. Ce n'est pas simplement dîner — c'est une expérience, 
                un souvenir en devenir.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="w-16 h-px bg-border" />
              <div>
                <p className="font-serif text-xl italic text-foreground">Marcus Laurent</p>
                <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  Chef Exécutif & Fondateur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
