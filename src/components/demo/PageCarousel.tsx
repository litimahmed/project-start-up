import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pages = [
  {
    title: 'Homepage',
    description: 'Stunning hero section with smooth animations',
    path: '/',
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    title: 'Menu',
    description: 'Categorized dishes with elegant presentation',
    path: '/menu',
    gradient: 'from-secondary/20 to-primary/20',
  },
  {
    title: 'Gallery',
    description: 'Lightbox gallery with keyboard navigation',
    path: '/gallery',
    gradient: 'from-primary/20 to-burgundy/20',
  },
  {
    title: 'Reservations',
    description: 'Complete booking system with validation',
    path: '/reservations',
    gradient: 'from-burgundy/20 to-primary/20',
  },
  {
    title: 'Admin Dashboard',
    description: 'Full management system for your restaurant',
    path: '/admin',
    gradient: 'from-primary/20 to-muted/20',
  },
];

const PageCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Section decoration */}
      <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      <div className="absolute top-1/2 right-0 w-32 h-px bg-gradient-to-l from-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Template Pages
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Explore Every Page
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            7+ beautifully designed pages ready to customize for your restaurant.
          </p>
        </div>

        {/* Pages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pages.map((page, index) => (
            <div
              key={page.title}
              className="group relative rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 
                         transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Preview placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${page.gradient}`}>
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <div className="font-serif text-xl text-foreground/80 mb-2">{page.title}</div>
                  <div className="text-sm text-muted-foreground text-center">{page.description}</div>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => navigate(page.path)}
                >
                  View Page
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Card info */}
              <div className="p-4 bg-card">
                <h3 className="font-serif text-lg text-foreground">{page.title}</h3>
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </div>

              {/* Index badge */}
              <div className="absolute top-4 left-4 w-8 h-8 bg-primary/90 rounded-full flex items-center 
                              justify-center text-primary-foreground text-sm font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Additional pages note */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Plus: Authentication, Confirmation, 404 page, and more...
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageCarousel;
