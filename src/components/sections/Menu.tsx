import { useState, useEffect, useRef } from 'react';
import { Wine } from 'lucide-react';
type MenuCategory = 'appetizers' | 'mains' | 'desserts' | 'wine';
interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
}
const menuData: Record<MenuCategory, MenuItem[]> = {
  appetizers: [{
    name: 'Saint-Jacques de Hokkaido Saisies',
    description: 'Purée de chou-fleur, raisins dorés, beurre noisette, câpres',
    price: '32',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop'
  }, {
    name: 'Burrata Caprese',
    description: 'Tomates anciennes, balsamique vieilli, micro basilic, perles d\'huile d\'olive',
    price: '24',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2092&auto=format&fit=crop'
  }, {
    name: 'Tartare de Thon',
    description: 'Mousse d\'avocat, tuile de sésame, émulsion wasabi, tobiko',
    price: '28',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=1936&auto=format&fit=crop'
  }, {
    name: 'Terrine de Foie Gras',
    description: 'Gelée de Sauternes, brioche toastée, compote de figues',
    price: '36',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1974&auto=format&fit=crop'
  }],
  mains: [{
    name: 'Filet de Bœuf Wagyu',
    description: 'Purée truffée, moelle rôtie, réduction au vin rouge',
    price: '85',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2031&auto=format&fit=crop'
  }, {
    name: 'Sole de Douvres Poêlée',
    description: 'Beurre noisette aux câpres, haricots verts, citron confit',
    price: '68',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop'
  }, {
    name: "Magret de Canard à l'Orange",
    description: 'Croquette de cuisse confite, orange sanguine, endive',
    price: '56',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2076&auto=format&fit=crop'
  }, {
    name: 'Risotto aux Champignons Sauvages',
    description: 'Cèpes, girolles, huile de truffe, tuile de parmesan vieilli',
    price: '42',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop'
  }],
  desserts: [{
    name: 'Fondant au Chocolat Valrhona',
    description: 'Cœur coulant, glace vanille bourbon, feuille d\'or',
    price: '18',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop'
  }, {
    name: 'Crème Brûlée',
    description: 'Vanille de Tahiti, croûte de sucre caramélisé, fruits frais',
    price: '16',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=2070&auto=format&fit=crop'
  }, {
    name: 'Tarte Tatin',
    description: 'Pommes caramélisées, crème fraîche, calvados',
    price: '17',
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=1974&auto=format&fit=crop'
  }],
  wine: [{
    name: 'Château Margaux 2015',
    description: 'Bordeaux, France — Bouquet intense, tanins raffinés',
    price: '420'
  }, {
    name: 'Opus One 2019',
    description: 'Napa Valley — Corsé, structuré, notes de fruits noirs',
    price: '380'
  }, {
    name: 'Dom Pérignon 2012',
    description: 'Champagne, France — Élégant, crémeux, finale agrumes',
    price: '320'
  }, {
    name: 'Cloudy Bay Sauvignon Blanc',
    description: 'Marlborough, NZ — Vif, tropical, rafraîchissant',
    price: '68'
  }]
};
const categories: {
  key: MenuCategory;
  label: string;
}[] = [{
  key: 'appetizers',
  label: 'Entrées'
}, {
  key: 'mains',
  label: 'Plats Principaux'
}, {
  key: 'desserts',
  label: 'Desserts'
}, {
  key: 'wine',
  label: 'Sélection de Vins'
}];
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('appetizers');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const isWineCategory = activeCategory === 'wine';
  return <section id="menu" ref={sectionRef} className="section-padding relative overflow-hidden bg-offwhite">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-burgundy/[0.02] rounded-full blur-[100px]" />
      
      {/* Decorative diagonal golden lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-0 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent rotate-[15deg]" />
        <div className="absolute top-1/3 -left-20 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent rotate-[15deg]" />
        <div className="absolute top-2/3 -left-10 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-gold/12 to-transparent rotate-[15deg]" />
        <div className="absolute -bottom-10 left-0 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent rotate-[15deg]" />
      </div>
      
      {/* Floating geometric frames */}
      <div className="absolute top-20 left-10 w-40 h-40 border border-charcoal/10 rotate-45 hidden lg:block" />
      <div className="absolute top-20 left-10 w-32 h-32 border border-charcoal/5 rotate-45 hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-charcoal/8 -rotate-12 hidden lg:block" />
      <div className="absolute top-1/2 right-8 w-20 h-20 border border-charcoal/5 rotate-[30deg] hidden xl:block" />
      <div className="absolute bottom-1/3 left-8 w-24 h-24 border border-charcoal/5 -rotate-[20deg] hidden xl:block" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Excellence Culinaire
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal">
            Notre <span className="italic text-gold">Carte</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-2 h-2 rotate-45 border border-gold/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>

        {/* Modern Category Tabs */}
        <div className={`flex justify-center mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative flex flex-wrap justify-center items-center gap-1 md:gap-0">
            {/* Underline indicator */}
            {categories.map(category => <button key={category.key} onClick={() => setActiveCategory(category.key)} className="group relative px-6 md:px-8 py-4">
                <span className={`relative z-10 font-sans text-sm md:text-base tracking-[0.08em] uppercase transition-all duration-500 ${activeCategory === category.key ? 'text-charcoal font-medium' : 'text-charcoal/40 group-hover:text-charcoal/70'}`}>
                  {category.label}
                </span>
                {/* Active underline */}
                <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gold rounded-full transition-all duration-500 ${activeCategory === category.key ? 'w-8' : 'w-0 group-hover:w-4 group-hover:bg-charcoal/20'}`} />
              </button>)}
          </div>
        </div>

        {/* Menu Items */}
        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {isWineCategory ? (/* Wine List - Modern glass morphism */
        <div className="max-w-4xl mx-auto">
              <div className="bg-charcoal/5 backdrop-blur-md border border-charcoal/10 rounded-2xl overflow-hidden">
                {menuData.wine.map((item, index) => <div key={item.name} className={`group relative flex items-center justify-between p-6 md:p-8 transition-all duration-500 hover:bg-charcoal/10 ${index !== menuData.wine.length - 1 ? 'border-b border-charcoal/10' : ''}`}>
                    {/* Wine Icon with glow */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-burgundy/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-12 h-12 flex items-center justify-center bg-burgundy/10 border border-burgundy/30 rounded-full group-hover:border-burgundy group-hover:bg-burgundy/20 transition-all duration-500">
                          <Wine size={20} className="text-burgundy/80 group-hover:text-burgundy transition-colors" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-luxury text-lg md:text-xl text-charcoal group-hover:text-burgundy transition-colors duration-300 italic">
                          {item.name}
                        </h3>
                        <p className="font-sans text-sm text-charcoal/60 mt-1 tracking-wide">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {/* Price with line accent */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent to-burgundy/30 hidden md:block" />
                      <span className="font-luxury text-2xl text-burgundy italic">${item.price}</span>
                    </div>
                  </div>)}
              </div>
            </div>) : (/* Food Items - Modern card design */
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {menuData[activeCategory].map((item, index) => <div key={item.name} className="group relative rounded-2xl overflow-hidden transition-all duration-700 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1" style={{
            animationDelay: `${index * 100}ms`,
            perspective: '1000px',
          }}
          onMouseMove={(e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
          }}
          >
                  {/* Card border */}
                  <div className="absolute inset-0 border border-charcoal/10 rounded-2xl group-hover:border-gold/40 transition-colors duration-700" />
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
                  
                  <div className="relative">
                    {/* Image Section */}
                    {item.image && <div className="relative h-52 lg:h-64 overflow-hidden rounded-t-2xl">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                        {/* Modern overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                        
                        {/* Floating price badge */}
                        <div className="absolute top-4 right-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gold/30 blur-lg rounded-full" />
                            <div className="relative bg-charcoal/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-gold/40">
                              <span className="font-luxury text-xl text-gold italic">${item.price}</span>
                            </div>
                          </div>
                        </div>

                        {/* Corner accent lines */}
                        <div className="absolute top-0 left-0 w-16 h-16">
                          <div className="absolute top-4 left-4 w-8 h-[1px] bg-gold/0 group-hover:bg-gold/60 transition-all duration-500" />
                          <div className="absolute top-4 left-4 w-[1px] h-8 bg-gold/0 group-hover:bg-gold/60 transition-all duration-500" />
                        </div>
                      </div>}

                    {/* Content Section */}
                    <div className="relative p-6 lg:p-8 bg-charcoal">
                      <h3 className="font-luxury text-xl lg:text-2xl text-offwhite group-hover:text-gold transition-colors duration-500 mb-3 italic">
                        {item.name}
                      </h3>
                      <p className="font-sans text-sm text-offwhite/60 leading-relaxed group-hover:text-offwhite/80 transition-colors duration-500">
                        {item.description}
                      </p>

                      {/* Decorative hover element */}
                      <a href={`/menu/${activeCategory === 'appetizers' ? 'entrees' : activeCategory === 'mains' ? 'plats' : 'desserts'}`} className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-gold to-transparent" />
                        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 hover:text-gold transition-colors">Découvrir</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                      </a>
                    </div>
                  </div>
                </div>)}
            </div>)}
        </div>
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-charcoal/20" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="w-12 h-px bg-charcoal/20" />
          </div>
          
        </div>
      </div>
    </section>;
};
export default Menu;