import { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marie-Claire Dubois',
    role: 'Critique Gastronomique',
    quote: 'Une expérience culinaire transcendante. Chaque plat raconte une histoire, chaque saveur est une révélation. Le Chef Moreau a créé quelque chose de véritablement exceptionnel.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Philippe Laurent',
    role: 'Entrepreneur',
    quote: 'Nous avons célébré notre anniversaire de mariage ici et ce fut magique. L\'attention aux détails, le service impeccable et la cuisine raffinée ont rendu cette soirée inoubliable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Sophie Mercier',
    role: 'Sommelière',
    quote: 'La carte des vins est exceptionnelle, avec des sélections rares parfaitement accordées aux créations du Chef. Un voyage gustatif que je recommande sans réserve.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-charcoal overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-3">
            Témoignages
          </p>
          <h2 className="font-luxury text-3xl md:text-4xl lg:text-5xl text-offwhite italic mb-4">
            Ce que disent nos <span className="text-gold">invités</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <Quote className="w-5 h-5 text-gold/40" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>

        {/* Featured Testimonial */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            {/* Quote mark */}
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gold/10" />
            
            {/* Testimonial content */}
            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/20" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/20" />
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-700 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                >
                  {index === activeIndex && (
                    <div className="text-center">
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 text-gold fill-gold" 
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="font-serif text-xl md:text-2xl text-offwhite/90 leading-relaxed mb-10 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-serif text-lg text-offwhite">{testimonial.name}</p>
                          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold/60">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gold w-8' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div 
          className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '1500+', label: 'Avis 5 étoiles' },
            { value: '98%', label: 'Recommandent' },
            { value: '15', label: 'Ans d\'excellence' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-luxury text-2xl md:text-3xl text-gold mb-1">{stat.value}</p>
              <p className="font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase text-offwhite/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
