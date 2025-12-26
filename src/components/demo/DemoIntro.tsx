import { useEffect, useState } from 'react';

interface DemoIntroProps {
  onComplete: () => void;
}

const DemoIntro = ({ onComplete }: DemoIntroProps) => {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'fade'>('logo');

  useEffect(() => {
    const taglineTimer = setTimeout(() => setPhase('tagline'), 800);
    const fadeTimer = setTimeout(() => setPhase('fade'), 2200);
    const completeTimer = setTimeout(onComplete, 2800);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Gold glow backdrop */}
      <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />

      {/* Logo container */}
      <div className="relative">
        {/* Main logo */}
        <h1
          className={`font-serif text-4xl md:text-6xl lg:text-7xl text-background tracking-[0.2em] transition-all duration-700 ${
            phase === 'logo' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          MAISON LE SEPT
        </h1>
        
        {/* Underline */}
        <div 
          className={`h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-4 transition-all duration-700 ${
            phase === 'logo' ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />
      </div>

      {/* Tagline */}
      <div
        className={`mt-6 transition-all duration-500 ${
          phase === 'tagline' || phase === 'fade' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-primary text-sm tracking-[0.4em] uppercase">
          Premium Restaurant Template
        </p>
      </div>
    </div>
  );
};

export default DemoIntro;
