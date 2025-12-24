import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

// Gallery categories
const categories = [
  { id: "all", label: "Tout" },
  { id: "culinary", label: "Art Culinaire" },
  { id: "ambiance", label: "Ambiance" },
  { id: "behind", label: "En Coulisses" },
  { id: "events", label: "Événements" },
];

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    alt: "Salle à manger élégante avec éclairage chaleureux",
    title: "La Salle Principale",
    description: "Où l'art culinaire rencontre une ambiance raffinée",
    category: "ambiance",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
    alt: "Plat gastronomique magnifiquement dressé",
    title: "Perfection Wagyu",
    description: "Notre carpaccio de wagyu signature",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
    alt: "Chef préparant un plat en cuisine",
    title: "Maîtrise Culinaire",
    description: "Le Chef Laurent à l'œuvre",
    category: "behind",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    alt: "Coin repas intime",
    title: "Coin Privé",
    description: "Places intimes pour des moments spéciaux",
    category: "ambiance",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600",
    alt: "Présentation de dessert",
    title: "Symphonie Sucrée",
    description: "Soufflé au chocolat à la feuille d'or",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=800",
    alt: "Configuration d'événement privé",
    title: "Grande Célébration",
    description: "Salle privée pour événements exclusifs",
    category: "events",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600",
    alt: "Mains du chef dressant un plat",
    title: "L'Art du Dressage",
    description: "Précision dans chaque détail",
    category: "behind",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    alt: "Plat de foie gras",
    title: "Foie Gras Royal",
    description: "Poêlé avec compote de figues",
    category: "culinary",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600",
    alt: "Cave à vins",
    title: "La Cave",
    description: "Plus de 500 sélections choisies",
    category: "ambiance",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
    alt: "Plat du menu dégustation",
    title: "Jardin & Mer",
    description: "De notre menu dégustation saisonnier",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
    alt: "Réception de mariage",
    title: "Réception de Mariage",
    description: "Créer des célébrations inoubliables",
    category: "events",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=600",
    alt: "Brigade de cuisine",
    title: "La Brigade",
    description: "Notre talentueuse équipe culinaire",
    category: "behind",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600",
    alt: "Salade fraîche gastronomique",
    title: "Fraîcheur du Potager",
    description: "Légumes de notre jardin partenaire",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
    alt: "Pancakes au petit déjeuner",
    title: "Brunch Dominical",
    description: "Une tradition gourmande du dimanche",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600",
    alt: "Tartare de saumon",
    title: "Fraîcheur Marine",
    description: "Tartare de saumon aux agrumes",
    category: "culinary",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600",
    alt: "Burger gourmet",
    title: "Le Classique Revisité",
    description: "Burger wagyu truffe et foie gras",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=600",
    alt: "Cocktail artisanal",
    title: "Mixologie d'Exception",
    description: "Créations signature de notre bar",
    category: "ambiance",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600",
    alt: "Table dressée",
    title: "L'Art de la Table",
    description: "Chaque détail compte",
    category: "ambiance",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600",
    alt: "Tarte aux fruits",
    title: "Douceur Fruitée",
    description: "Tarte aux fruits de saison",
    category: "culinary",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1529543544277-750e2ac4ed30?w=800",
    alt: "Événement corporate",
    title: "Soirées Corporate",
    description: "Des moments d'exception pour vos équipes",
    category: "events",
    span: "md:col-span-2 md:row-span-1",
  },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter images
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => 
          prev !== null ? (prev + 1) % filteredImages.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => 
          prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

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
      <section className="relative h-[60vh] min-h-[500px] flex items-end justify-center overflow-hidden bg-charcoal pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/30 to-charcoal" />
        
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

      {/* Light Content Section */}
      <div className="bg-[#FAF8F5]">
        {/* Category Navigation - Matching Menu Style */}
        <section className="bg-[#FAF8F5] py-6 sticky top-16 z-40 border-b border-charcoal/10">
          <div className="container mx-auto px-6">
            <div className="flex justify-center">
              <div className="inline-flex items-center bg-charcoal/5 rounded-2xl p-1.5 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative font-sans text-xs tracking-[0.1em] uppercase py-3 px-5 md:px-6 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'text-charcoal bg-white shadow-md shadow-charcoal/10'
                        : 'text-charcoal/50 hover:text-charcoal'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Gallery */}
        <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[240px]">
            {filteredImages.map((image, idx) => (
              <div
                key={image.id}
                onClick={() => setSelectedIndex(idx)}
                className={`group relative overflow-hidden cursor-pointer rounded-xl bg-charcoal/5 transition-all duration-500 hover:shadow-2xl hover:shadow-charcoal/20 animate-fade-in border border-charcoal/10 hover:border-gold/40 ${image.span}`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Gold accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-500" />
                
                {/* Content on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 text-center">
                  {/* Plus indicator */}
                  <div className="w-11 h-11 rounded-full border border-gold flex items-center justify-center mb-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 bg-charcoal/30 backdrop-blur-sm">
                    <span className="text-gold text-xl">+</span>
                  </div>
                  
                  <h3 className="font-luxury text-xl text-offwhite mb-2 italic">{image.title}</h3>
                  <p className="font-sans text-sm text-offwhite/70">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
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
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
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
                prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
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
                prev !== null ? (prev + 1) % filteredImages.length : null
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
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].alt}
              className="max-w-full max-h-[70vh] object-contain"
            />
            
            {/* Caption */}
            <div className="mt-6 text-center">
              <div className="w-12 h-px bg-gold mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-offwhite mb-2">
                {filteredImages[selectedIndex].title}
              </h3>
              <p className="font-sans text-offwhite/60">
                {filteredImages[selectedIndex].description}
              </p>
            </div>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-offwhite/50 tracking-widest">
            {selectedIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
