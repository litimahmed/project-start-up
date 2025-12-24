import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChefHat, Wine, Clock, MapPin, Sparkles, Leaf, Star, Utensils, Quote, Calendar, Flame, X, ArrowRight } from 'lucide-react';
import { getItemBySlug, categoryData, getAllItems, type MenuCategory, type ExtendedMenuItem, type WineItem } from '@/data/menuData';
import { FloatingNav } from '@/components/shared/NavButtons';

const MenuItemDetailPage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heroSrc, setHeroSrc] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(false);
    setImageLoaded(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [slug]);

  const currentCategory = category as MenuCategory;
  const item = getItemBySlug(currentCategory, slug || '');
  const catInfo = categoryData[currentCategory];

  if (!item || !catInfo) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-luxury text-4xl text-gold italic mb-4">Plat non trouvé</h1>
          <Link to={`/menu/${category}`} className="text-offwhite/70 hover:text-gold transition-colors">
            Retour à la carte
          </Link>
        </div>
      </div>
    );
  }

  const isWine = currentCategory === 'vins';
  const foodItem = item as ExtendedMenuItem;
  const wineItem = item as WineItem;
  const heroImage = item.heroImage || (isWine ? catInfo.heroImage : foodItem.image) || catInfo.heroImage;

  // Keep a resilient hero src (so a broken URL doesn't render a blank page)
  useEffect(() => {
    setHeroSrc(heroImage);
  }, [heroImage]);
  
  // Get gallery images or create default from hero
  const galleryImages = (isWine ? wineItem.gallery : foodItem.gallery) || [heroSrc || heroImage];

  // Get related items (excluding current)
  const allItems = getAllItems(currentCategory);
  const relatedItems = allItems
    .filter(i => i.slug !== item.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <FloatingNav backTo={`/menu/${category}`} backLabel={catInfo.title} />

      {/* ==================== HERO SECTION (Dark) ==================== */}
      <section className="relative h-screen bg-charcoal">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={heroSrc || heroImage}
            alt={`${item.name} - photo du plat`}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.fallback) {
                img.dataset.fallback = '1';
                setHeroSrc(catInfo.heroImage);
              } else {
                // Show the section even if everything fails
                setImageLoaded(true);
              }
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/40" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {!isWine && foodItem.isSignature && (
                <div className="px-4 py-2 bg-gold/90 rounded-full">
                  <span className="font-sans text-xs tracking-[0.1em] uppercase text-charcoal font-medium">Signature</span>
                </div>
              )}
              {!isWine && foodItem.isNew && (
                <div className="px-4 py-2 bg-burgundy/90 rounded-full">
                  <span className="font-sans text-xs tracking-[0.1em] uppercase text-offwhite font-medium">Nouveau</span>
                </div>
              )}
              {!isWine && foodItem.isVegetarian && (
                <div className="px-4 py-2 bg-green-900/80 rounded-full">
                  <span className="font-sans text-xs tracking-[0.1em] uppercase text-green-400 font-medium">Végétarien</span>
                </div>
              )}
            </div>

            <h1 className="font-luxury text-4xl md:text-6xl lg:text-7xl text-offwhite mb-4 italic">
              {item.name}
            </h1>
            <p className="font-sans text-lg md:text-xl text-offwhite/60 mb-8 max-w-2xl">
              {item.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-luxury text-4xl md:text-5xl text-gold italic">{item.price}€</span>
              </div>
              {!isWine && foodItem.preparationTime && (
                <div className="flex items-center gap-2 text-offwhite/50">
                  <Clock size={16} />
                  <span className="font-sans text-sm">{foodItem.preparationTime}</span>
                </div>
              )}
              {!isWine && foodItem.origin && (
                <div className="flex items-center gap-2 text-offwhite/50">
                  <MapPin size={16} />
                  <span className="font-sans text-sm">{foodItem.origin}</span>
                </div>
              )}
              {isWine && wineItem.region && (
                <div className="flex items-center gap-2 text-offwhite/50">
                  <MapPin size={16} />
                  <span className="font-sans text-sm">{wineItem.region}</span>
                </div>
              )}
              {isWine && wineItem.year && (
                <div className="flex items-center gap-2 text-offwhite/50">
                  <Calendar size={16} />
                  <span className="font-sans text-sm">{wineItem.year}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 animate-bounce hidden md:block">
          <div className="w-6 h-10 border border-gold/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ==================== STORY SECTION (Light/Cream) ==================== */}
      <section className="relative py-24 md:py-32 bg-[#FAF8F5]">
        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-gold/30" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-gold/30" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-gold/30" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-gold/30" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Quote icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                <Quote size={28} className="text-gold" />
              </div>
            </div>

            <h2 className="font-luxury text-3xl md:text-4xl text-charcoal italic mb-8">
              {isWine ? "L'Histoire du Vin" : "L'Histoire du Chef"}
            </h2>
            
            <p className="font-serif text-lg md:text-xl text-charcoal/70 leading-relaxed italic mb-10">
              "{isWine ? wineItem.story : foodItem.chefStory}"
            </p>

            {/* Chef note highlight */}
            {!isWine && foodItem.chefNote && (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gold/10 rounded-full">
                <ChefHat size={18} className="text-gold" />
                <span className="font-sans text-sm text-charcoal/80">{foodItem.chefNote}</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* ==================== GALLERY SECTION (Elegant Bento Grid) ==================== */}
      {galleryImages.length > 1 && (
        <section className="relative py-24 md:py-32 bg-[#FAF8F5] overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          {/* Decorative elements */}
          <div className="absolute top-12 left-12 w-32 h-32 border-l border-t border-gold/20" />
          <div className="absolute bottom-12 right-12 w-32 h-32 border-r border-b border-gold/20" />

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold/70 mb-4 block">
                Voyage Visuel
              </span>
              <h2 className="font-luxury text-4xl md:text-5xl text-charcoal italic mb-6">
                La Galerie
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-gold/40" />
                <div className="w-2 h-2 border border-gold/60 rotate-45" />
                <div className="w-12 h-px bg-gold/40" />
              </div>
            </div>

            {/* Bento Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
                {galleryImages.map((img, idx) => {
                  // Create varied bento layout
                  const spans = [
                    'col-span-2 row-span-2',
                    'col-span-1 row-span-1',
                    'col-span-1 row-span-2',
                    'col-span-2 row-span-1',
                    'col-span-1 row-span-1',
                    'col-span-1 row-span-1',
                  ];
                  const spanClass = spans[idx % spans.length];
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setLightboxOpen(true);
                      }}
                      className={`${spanClass} group relative overflow-hidden cursor-pointer`}
                    >
                      <img 
                        src={img} 
                        alt={`${item.name} - Image ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Elegant overlay */}
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="w-14 h-14 border border-offwhite/60 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500">
                          <span className="text-offwhite text-2xl font-light">+</span>
                        </div>
                      </div>
                      {/* Corner accents on hover */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-gold/0 group-hover:border-gold transition-all duration-500" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-gold/0 group-hover:border-gold transition-all duration-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Image counter */}
            <div className="text-center mt-10">
              <span className="font-sans text-sm tracking-[0.2em] uppercase text-charcoal/40">
                {galleryImages.length} images
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={24} className="text-white" />
          </button>
          <img 
            src={galleryImages[selectedImageIndex]} 
            alt={item.name}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ==================== DETAILS SECTION (Light) ==================== */}
      <section className="relative py-24 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-luxury text-3xl md:text-4xl text-charcoal italic mb-4">Les Détails</h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Ingredients Card */}
              {!isWine && foodItem.ingredients && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <Utensils size={18} className="text-gold" />
                    </div>
                    <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal">Ingrédients</h3>
                  </div>
                  <div className="space-y-3">
                    {foodItem.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <span className="font-sans text-charcoal/70">{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasting Notes for Wine */}
              {isWine && wineItem.notes && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center">
                      <Wine size={18} className="text-burgundy" />
                    </div>
                    <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal">Notes de Dégustation</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {wineItem.notes.map((note, idx) => (
                      <span key={idx} className="px-4 py-2 bg-burgundy/10 text-burgundy rounded-full text-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technique Card */}
              {!isWine && foodItem.technique && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <Flame size={18} className="text-gold" />
                    </div>
                    <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal">Technique</h3>
                  </div>
                  <p className="font-serif text-lg text-charcoal/80 italic">{foodItem.technique}</p>
                  {foodItem.season && (
                    <div className="mt-6 pt-6 border-t border-charcoal/10">
                      <p className="font-sans text-xs tracking-[0.1em] uppercase text-charcoal/50 mb-2">Saison</p>
                      <p className="font-sans text-charcoal/70">{foodItem.season}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Origin Card */}
              {((!isWine && foodItem.origin) || (isWine && wineItem.region)) && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <MapPin size={18} className="text-gold" />
                    </div>
                    <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal">Origine</h3>
                  </div>
                  <p className="font-serif text-lg text-charcoal/80 italic">
                    {isWine ? wineItem.region : foodItem.origin}
                  </p>
                  {isWine && wineItem.grapes && (
                    <div className="mt-6 pt-6 border-t border-charcoal/10">
                      <p className="font-sans text-xs tracking-[0.1em] uppercase text-charcoal/50 mb-2">Cépages</p>
                      <p className="font-sans text-charcoal/70">{wineItem.grapes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Preparation Time */}
              {!isWine && foodItem.preparationTime && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                      <Clock size={18} className="text-gold" />
                    </div>
                    <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal">Préparation</h3>
                  </div>
                  <p className="font-luxury text-4xl text-gold italic">{foodItem.preparationTime}</p>
                  <p className="font-sans text-sm text-charcoal/50 mt-2">temps de cuisson</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PAIRING SECTION (Split Design) ==================== */}
      {((!isWine && foodItem.pairing) || (isWine && wineItem.pairsWith)) && (
        <section className="relative min-h-[70vh] overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[70vh]">
            {/* Left - Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop"
                alt="Wine cellar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-burgundy/30 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/60 to-transparent lg:hidden" />
              
              {/* Floating wine glass decoration */}
              <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-gold/40">
                  <Wine size={28} className="text-gold" />
                </div>
                <div className="h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="relative bg-gradient-to-br from-burgundy via-burgundy to-[#2a1215] flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 border border-gold/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 border border-gold/20 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-gold/30" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-gold/30" />
              
              <div className="relative z-10 max-w-lg text-center lg:text-left">
                <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/80 mb-4">
                  {isWine ? 'Accords Parfaits' : 'Accord Recommandé'}
                </p>
                
                <h2 className="font-luxury text-4xl md:text-5xl lg:text-6xl text-offwhite italic mb-6 leading-tight">
                  {!isWine ? foodItem.pairing : 'Sublimez vos plats'}
                </h2>
                
                <div className="w-20 h-px bg-gradient-to-r from-gold to-transparent mb-8 mx-auto lg:mx-0" />
                
                {!isWine && foodItem.pairingNote && (
                  <blockquote className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-gold/20 font-serif">"</span>
                    <p className="font-serif text-lg md:text-xl text-offwhite/80 italic leading-relaxed pl-6">
                      {foodItem.pairingNote}
                    </p>
                  </blockquote>
                )}

                {isWine && wineItem.pairsWith && (
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {wineItem.pairsWith.map((pair, idx) => (
                      <span key={idx} className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-gold/30 rounded-full font-sans text-offwhite text-sm hover:bg-white/20 transition-colors">
                        {pair}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== RELATED DISHES (Light) ==================== */}
      {relatedItems.length > 0 && (
        <section className="relative py-24 bg-[#FAF8F5]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-luxury text-3xl md:text-4xl text-charcoal italic mb-4">
                Vous Aimerez Aussi
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedItems.map((relatedItem) => {
                const relatedFood = relatedItem as ExtendedMenuItem;
                const relatedWine = relatedItem as WineItem;
                const relatedImage = isWine 
                  ? relatedWine.heroImage 
                  : relatedFood.image || relatedFood.heroImage;

                return (
                  <Link 
                    key={relatedItem.slug}
                    to={`/menu/${category}/${relatedItem.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-charcoal/5 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img 
                          src={relatedImage}
                          alt={relatedItem.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-luxury text-xl text-charcoal italic group-hover:text-gold transition-colors mb-2">
                          {relatedItem.name}
                        </h3>
                        <p className="font-sans text-sm text-charcoal/60 line-clamp-2 mb-4">
                          {relatedItem.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-luxury text-2xl text-gold italic">{relatedItem.price}€</span>
                          <span className="font-sans text-xs tracking-[0.1em] uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                            Découvrir →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==================== CTA SECTION (Split Design) ==================== */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[60vh]">
          {/* Left - Content */}
          <div className="relative bg-charcoal flex items-center justify-center py-16 lg:py-24 px-8 lg:px-16 order-2 lg:order-1">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px]" />
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-gold/30" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-gold/30" />
            
            {/* Decorative vertical line */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block" />
            
            <div className="relative z-10 max-w-md text-center lg:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                  <Star size={20} className="text-gold" />
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              </div>
              
              <h2 className="font-luxury text-4xl md:text-5xl text-offwhite italic mb-4 leading-tight">
                Vivez <span className="text-gold">l'Expérience</span>
              </h2>
              
              <p className="font-sans text-offwhite/60 mb-10 leading-relaxed">
                Découvrez <span className="text-gold/80 italic">{item.name}</span> lors de votre prochaine visite dans notre établissement d'exception.
              </p>
              
              <Link
                to="/reservations"
                onClick={() => window.scrollTo(0, 0)}
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.15em] uppercase hover:bg-gold/90 transition-all shadow-lg shadow-gold/20 hover:shadow-gold/40"
              >
                <span>Réserver une Table</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Right - Image */}
          <div className="relative h-64 lg:h-auto overflow-hidden order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
              alt="Restaurant ambiance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-charcoal/40 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal lg:hidden" />
            
            {/* Floating decorative frame on image */}
            <div className="absolute inset-8 border border-gold/20 pointer-events-none hidden lg:block" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuItemDetailPage;