import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DemoHero = () => {
  const navigate = useNavigate();

  const badges = [
    'Fully Responsive',
    'Modern Design',
    'Admin Dashboard',
    'Reservation System',
    'Dark Mode',
    'SEO Optimized',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* Geometric decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-primary/10 rotate-12" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary/50 rounded-full animate-pulse animation-delay-300" />

      {/* Gold lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-primary/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Pre-title */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
          <div className="h-px w-12 bg-primary" />
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-primary/80 text-sm tracking-[0.3em] uppercase">ThemeForest Exclusive</span>
          <Sparkles className="w-5 h-5 text-primary" />
          <div className="h-px w-12 bg-primary" />
        </div>

        {/* Main title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-background mb-4 animate-fade-in animation-delay-100">
          Maison
          <span className="block text-primary">le Sept</span>
        </h1>

        {/* Subtitle */}
        <p className="text-background/60 text-xl md:text-2xl font-sans mb-8 animate-fade-in animation-delay-200">
          A Premium Restaurant & Fine Dining Template
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in animation-delay-300">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 text-sm text-background/80 border border-primary/30 rounded-full backdrop-blur-sm
                         hover:border-primary hover:text-primary transition-colors duration-300"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-400">
          <Button
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
            onClick={() => navigate('/')}
          >
            View Live Demo
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary px-8 py-6 text-lg"
            onClick={() => window.open('https://themeforest.net', '_blank')}
          >
            Purchase on ThemeForest
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-background/40 text-xs tracking-widest uppercase">Scroll to Explore</span>
          <div className="w-6 h-10 border-2 border-background/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        @keyframes scroll-indicator {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(8px); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default DemoHero;
