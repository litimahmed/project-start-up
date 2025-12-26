import {
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  Images,
  Moon,
  Smartphone,
  Shield,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboard',
    description: 'Complete restaurant management system with analytics, reservations, and menu control.',
  },
  {
    icon: CalendarDays,
    title: 'Reservation System',
    description: 'Functional booking system with calendar view, time slots, and confirmation emails.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Menu Management',
    description: 'Categorized menu display with filtering, pricing, and beautiful food photography.',
  },
  {
    icon: Images,
    title: 'Gallery Lightbox',
    description: 'Elegant image gallery with lightbox, keyboard navigation, and lazy loading.',
  },
  {
    icon: Moon,
    title: 'Dark & Light Mode',
    description: 'Seamless theme switching with carefully crafted color palettes for both modes.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Pixel-perfect design across all devices — mobile, tablet, and desktop.',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'Built-in auth with Supabase for secure user and admin access control.',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Optimized performance with React, Vite, and modern best practices.',
  },
];

const FeatureShowcase = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block">
            Everything You Need
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive template packed with everything you need to launch a stunning restaurant website.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 bg-card rounded-2xl border border-border/50 hover:border-primary/50 
                         transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center
                                group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                {/* Decorative corner */}
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-primary/30 
                                group-hover:border-primary transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="relative font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/0 
                              to-transparent group-hover:via-primary/50 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
