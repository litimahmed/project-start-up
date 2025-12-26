import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DemoCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-background/30 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/10 rotate-45 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary-foreground/10 rotate-12 hidden lg:block" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-title */}
          <div className="text-primary-foreground/60 text-xs tracking-[0.3em] uppercase mb-4">
            Get Maison le Sept Today
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
            THE BEST CHOICE FOR YOUR SUCCESSFUL RESTAURANT
          </h2>

          <p className="text-primary-foreground/70 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            One time fee, no subscription. 6 Months support included. 
            Get lifetime access to all future updates.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 
                         px-10 py-6 text-base font-medium shadow-lg"
              onClick={() => window.open('https://themeforest.net', '_blank')}
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Purchase Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 
                         px-10 py-6 text-base font-medium"
              onClick={() => navigate('/')}
            >
              View Live Demo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-primary-foreground/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-foreground/80 rounded-full" />
              <span>Regular Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-foreground/80 rounded-full" />
              <span>6 Months Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-foreground/80 rounded-full" />
              <span>Documentation Included</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <div>
              © 2024 Maison le Sept. All rights reserved.
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
