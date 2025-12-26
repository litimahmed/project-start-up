import {
  Gauge,
  FileCode2,
  Code2,
  Smartphone,
  Headphones,
  RefreshCw,
  Layers,
  Type,
  Shield,
  Palette,
  LayoutDashboard,
  CalendarCheck,
} from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Speed Optimized',
    description: 'Lightning fast performance with optimized code and lazy loading.',
  },
  {
    icon: FileCode2,
    title: 'React + TypeScript',
    description: 'Built with modern React 18 and TypeScript for type safety.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Well-organized, documented, and easy to customize codebase.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Pixel-perfect on all devices from mobile to desktop.',
  },
  {
    icon: Headphones,
    title: 'Premium Support',
    description: '6 months of dedicated support to help you get started.',
  },
  {
    icon: RefreshCw,
    title: 'Free Updates',
    description: 'Regular updates with new features and improvements.',
  },
  {
    icon: Layers,
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid customization.',
  },
  {
    icon: Type,
    title: 'Google Fonts',
    description: 'Beautiful typography with premium Google Font pairings.',
  },
  {
    icon: Shield,
    title: 'Supabase Auth',
    description: 'Secure authentication with email and social login support.',
  },
  {
    icon: Palette,
    title: 'Theme Options',
    description: 'Multiple color themes and dark mode support included.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboard',
    description: 'Complete restaurant management with analytics and reports.',
  },
  {
    icon: CalendarCheck,
    title: 'Reservation System',
    description: 'Functional booking system with calendar and validation.',
  },
];

const FeatureShowcase = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Top decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-xs tracking-[0.3em] uppercase mb-4 block">
            Core Features
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            POWERFUL FEATURES TO BUILD YOUR RESTAURANT WEBSITE
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Everything you need to create a stunning restaurant website with modern features and excellent performance.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center text-center p-6 rounded-xl 
                         bg-card border border-border/30 hover:border-primary/40 
                         hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4
                              group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Title */}
              <h3 className="font-medium text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
