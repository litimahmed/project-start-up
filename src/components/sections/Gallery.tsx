import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    alt: 'Atmosphère élégante de la salle à manger',
    title: 'La Salle',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
    alt: 'Plat artistiquement présenté',
    title: 'Art Culinaire',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=2080&auto=format&fit=crop',
    alt: 'Sélection de vins fins',
    title: 'Cave à Vins',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    alt: 'Présentation gastronomique',
    title: 'Plat Signature',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Chef en cuisine',
    title: 'En Coulisses',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?q=80&w=2070&auto=format&fit=crop',
    alt: 'Cadre intime de la salle',
    title: 'Salon Privé',
    span: 'md:col-span-1 md:row-span-1',
  },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-secondary mb-4">
            Voyage Visuel
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            La <span className="italic text-primary">Galerie</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gold/40" />
            <div className="w-2 h-2 rotate-45 border border-gold/40" />
            <div className="w-16 h-px bg-gold/40" />
          </div>
        </div>

        {/* Bento Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden cursor-pointer rounded-sm ${image.span}`}
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center mb-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <span className="text-gold text-xl">+</span>
                </div>
                <span className="font-serif text-lg text-offwhite">{image.title}</span>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/60 transition-all duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/0 group-hover:border-gold/60 transition-all duration-300" />
              
              {/* Gold Accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
              );
            }}
            className="absolute left-4 md:left-8 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Navigation - Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1
              );
            }}
            className="absolute right-4 md:right-8 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>

          {/* Image */}
          <img
            src={galleryImages[selectedIndex].src}
            alt={galleryImages[selectedIndex].alt}
            className="max-w-full max-h-[85vh] object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-offwhite/60 tracking-widest">
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
