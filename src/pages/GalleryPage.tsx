import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

// Curated images for Art Culinaire section
const culinaryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    alt: "Plat gastronomique magnifiquement dressé",
    title: "Perfection Wagyu",
    description: "Notre carpaccio de wagyu signature",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    alt: "Présentation de dessert",
    title: "Symphonie Sucrée",
    description: "Soufflé au chocolat à la feuille d'or",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    alt: "Plat de foie gras",
    title: "Foie Gras Royal",
    description: "Poêlé avec compote de figues",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
    alt: "Plat du menu dégustation",
    title: "Jardin & Mer",
    description: "De notre menu dégustation saisonnier",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
    alt: "Salade fraîche gastronomique",
    title: "Fraîcheur du Potager",
    description: "Légumes de notre jardin partenaire",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800",
    alt: "Tartare de saumon",
    title: "Fraîcheur Marine",
    description: "Tartare de saumon aux agrumes",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    alt: "Tarte aux fruits",
    title: "Douceur Fruitée",
    description: "Tarte aux fruits de saison",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
    alt: "Burger gourmet",
    title: "Le Classique Revisité",
    description: "Burger wagyu truffe et foie gras",
  },
];

// Curated images for Ambiance section
const ambianceImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    alt: "Salle à manger élégante",
    title: "La Salle Principale",
    description: "Où l'art culinaire rencontre une ambiance raffinée",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    alt: "Coin repas intime",
    title: "Coin Privé",
    description: "Places intimes pour des moments spéciaux",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    alt: "Chef préparant un plat",
    title: "Maîtrise Culinaire",
    description: "Le Chef Laurent à l'œuvre",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    alt: "Cave à vins",
    title: "La Cave",
    description: "Plus de 500 sélections choisies",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800",
    alt: "Mains du chef dressant un plat",
    title: "L'Art du Dressage",
    description: "Précision dans chaque détail",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=800",
    alt: "Brigade de cuisine",
    title: "La Brigade",
    description: "Notre talentueuse équipe culinaire",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800",
    alt: "Cocktail artisanal",
    title: "Mixologie d'Exception",
    description: "Créations signature de notre bar",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
    alt: "Table dressée",
    title: "L'Art de la Table",
    description: "Chaque détail compte",
  },
];

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface InfiniteCarouselProps {
  images: CarouselImage[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  onImageClick: (index: number) => void;
}

const InfiniteCarousel = ({ images, direction = "left", speed = "normal", onImageClick }: InfiniteCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Double the images for seamless loop
  const doubledImages = [...images, ...images];
  
  const speedDuration = {
    slow: "60s",
    normal: "40s",
    fast: "25s",
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex gap-6"
        style={{
          animation: `scroll-left ${speedDuration[speed]} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {doubledImages.map((image, idx) => (
          <div
            key={`${image.id}-${idx}`}
            onClick={() => onImageClick(idx % images.length)}
            className="group relative flex-shrink-0 w-[280px] md:w-[360px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-charcoal/20"
          >
            {/* Image */}
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Gold accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-700" />
            
            {/* Content on hover */}
            <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 text-center">
              <h3 className="font-luxury text-xl text-offwhite mb-1 italic transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.title}</h3>
              <p className="font-sans text-sm text-offwhite/70 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<"culinary" | "ambiance" | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleImageClick = (section: "culinary" | "ambiance", index: number) => {
    setSelectedSection(section);
    setSelectedIndex(index);
  };

  const currentImages = selectedSection === "culinary" ? culinaryImages : ambianceImages;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setSelectedSection(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => 
          prev !== null ? (prev + 1) % currentImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => 
          prev !== null ? (prev - 1 + currentImages.length) % currentImages.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, currentImages.length]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-charcoal">
      <PageHeader />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end justify-center overflow-hidden bg-charcoal pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/40 to-charcoal" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 border border-gold/20 rotate-45 hidden md:block" />
        <div className="absolute bottom-24 right-16 w-24 h-24 border border-gold/30 rotate-12 hidden md:block" />
        
        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-2 h-2 bg-gold rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          
          <h1 className="font-luxury text-5xl md:text-7xl tracking-wide text-offwhite mb-4 italic drop-shadow-lg">
            La Galerie
          </h1>
          
          <p className="font-sans text-sm md:text-base text-offwhite/80 tracking-[0.3em] uppercase drop-shadow-md">
            Un Voyage Visuel
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-[#FAF8F5]">
        
        {/* Section 1: Art Culinaire */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-px bg-gold/50" />
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal/50">Première Section</span>
                <div className="w-20 h-px bg-gold/50" />
              </div>
              <h2 className="font-luxury text-4xl md:text-5xl text-charcoal italic mb-4">
                Art Culinaire
              </h2>
              <p className="font-sans text-charcoal/60 max-w-xl mx-auto">
                Chaque plat est une œuvre d'art, minutieusement composée pour éveiller tous vos sens
              </p>
            </div>
          </div>
          
          <InfiniteCarousel 
            images={culinaryImages} 
            direction="left" 
            speed="normal"
            onImageClick={(idx) => handleImageClick("culinary", idx)}
          />
        </section>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center py-8">
          <div className="w-1/4 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <div className="mx-6 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
            <div className="w-2 h-2 bg-gold rotate-45" />
            <div className="w-1.5 h-1.5 bg-gold/40 rotate-45" />
          </div>
          <div className="w-1/4 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>

        {/* Section 2: L'Ambiance & Nos Coulisses */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-px bg-gold/50" />
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-charcoal/50">Deuxième Section</span>
                <div className="w-20 h-px bg-gold/50" />
              </div>
              <h2 className="font-luxury text-4xl md:text-5xl text-charcoal italic mb-4">
                L'Ambiance & Nos Coulisses
              </h2>
              <p className="font-sans text-charcoal/60 max-w-xl mx-auto">
                Découvrez l'univers qui donne vie à nos créations, de la salle aux cuisines
              </p>
            </div>
          </div>
          
          <InfiniteCarousel 
            images={ambianceImages} 
            direction="right" 
            speed="slow"
            onImageClick={(idx) => handleImageClick("ambiance", idx)}
          />
        </section>
      </div>

      {/* Bottom CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border border-gold/10 rotate-45" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 border border-gold/15 -rotate-12" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
            <div className="w-2 h-2 bg-gold rounded-full" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite mb-6">
            Découvrez Le Sept en Personne
          </h2>
          
          <p className="font-sans text-offwhite/60 text-lg mb-10 max-w-xl mx-auto">
            Laissez-nous créer une soirée inoubliable pour vous. Réservez votre table et plongez dans notre univers d'excellence culinaire.
          </p>
          
          <a
            href="/reservations"
            className="inline-block px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.2em] uppercase border border-gold hover:bg-transparent hover:text-gold transition-all duration-300"
          >
            Réserver Votre Table
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-offwhite/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-sans text-sm text-offwhite/40 tracking-wider">
            © {new Date().getFullYear()} Le Sept. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {selectedIndex !== null && selectedSection !== null && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => {
            setSelectedIndex(null);
            setSelectedSection(null);
          }}
        >
          {/* Close button */}
          <button
            onClick={() => {
              setSelectedIndex(null);
              setSelectedSection(null);
            }}
            className="absolute top-6 right-6 text-offwhite/60 hover:text-offwhite transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={32} />
          </button>
          
          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => 
                prev !== null ? (prev - 1 + currentImages.length) % currentImages.length : null
              );
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Image précédente"
          >
            <ChevronLeft size={40} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => 
                prev !== null ? (prev + 1) % currentImages.length : null
              );
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-offwhite/60 hover:text-offwhite transition-colors p-2"
            aria-label="Image suivante"
          >
            <ChevronRight size={40} />
          </button>
          
          {/* Image container */}
          <div 
            className="relative max-w-5xl max-h-[80vh] mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImages[selectedIndex].src}
              alt={currentImages[selectedIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <div className="w-12 h-px bg-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-offwhite mb-2">
                {currentImages[selectedIndex].title}
              </h3>
              <p className="font-sans text-offwhite/60">
                {currentImages[selectedIndex].description}
              </p>
            </div>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-offwhite/40 tracking-widest">
            {selectedIndex + 1} / {currentImages.length}
          </div>
        </div>
      )}

      {/* Add CSS animation */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
