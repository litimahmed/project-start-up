import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DemoCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Top decoration line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-muted-foreground">5.0 Rating on ThemeForest</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Ready to Impress Your Guests?
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Launch your restaurant's online presence with Maison le Sept. 
            Beautiful, functional, and ready to customize.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-7 text-lg shadow-lg shadow-primary/20"
              onClick={() => navigate('/')}
            >
              Experience the Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-10 py-7 text-lg"
              onClick={() => window.open('https://themeforest.net', '_blank')}
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Purchase Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Regular Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Premium Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Detailed Documentation</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              © 2024 Maison le Sept Template. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Version 1.0.0</span>
              <span>Last Updated: December 2024</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoCTA;
