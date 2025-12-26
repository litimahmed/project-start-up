import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const demos = [
  {
    title: 'Main Restaurant',
    homepages: '4 Homepages',
    description: 'Modern French cuisine showcase with elegant animations and smooth transitions for upscale dining.',
    path: '/',
    featured: true,
  },
  {
    title: 'Luxury Restaurant',
    homepages: '2 Homepages',
    description: 'The finest in haute cuisine dining experience, perfect for high-end establishments.',
    path: '/',
    featured: false,
  },
  {
    title: 'Coffee Shop',
    homepages: '2 Homepages',
    description: 'Perfect design for a Coffee Shop theme layout for Cafés with cozy aesthetic.',
    path: '/menu',
    featured: false,
  },
  {
    title: 'Fast Food',
    homepages: '2 Homepages',
    description: 'Fast food, delicious fast food options with a modern twist for quick service restaurants.',
    path: '/menu',
    featured: false,
  },
  {
    title: 'Pizza Shop',
    homepages: '2 Homepages',
    description: 'Satisfy your cravings for pizzas with many stunning pizza themes and layouts.',
    path: '/menu',
    featured: false,
  },
  {
    title: 'Sushi Restaurant',
    homepages: '2 Homepages',
    description: 'A delicate and memorable Japanese sushi bar experience with modern design.',
    path: '/menu',
    featured: false,
  },
  {
    title: 'Bakery Restaurant',
    homepages: '1 Homepage',
    description: 'Fresh artisan bakery collection including pastries for bakery lovers.',
    path: '/menu',
    featured: false,
  },
  {
    title: 'Admin Dashboard',
    homepages: '10+ Pages',
    description: 'Complete restaurant management system with analytics, reservations, and menu control.',
    path: '/admin',
    featured: true,
  },
  {
    title: 'Reservation System',
    homepages: '3 Pages',
    description: 'Complete booking system with calendar, validation, and confirmation pages.',
    path: '/reservations',
    featured: false,
  },
];

const DemoVariations = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Demo cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <div
              key={demo.title}
              className="group relative bg-card rounded-xl overflow-hidden border border-border/50 
                         hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Preview area */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/30 overflow-hidden">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="font-serif text-2xl text-foreground/80 mb-2">{demo.title}</div>
                    <div className="text-xs text-muted-foreground/70">Preview</div>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/85 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => navigate(demo.path)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground 
                               rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    View Demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Featured badge */}
                {demo.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground 
                                  text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg text-foreground">{demo.title}</h3>
                  <span className="text-xs text-primary font-medium">{demo.homepages}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {demo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoVariations;
