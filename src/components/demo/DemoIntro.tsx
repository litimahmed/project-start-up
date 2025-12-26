import { useEffect, useState } from 'react';

interface DemoIntroProps {
  onComplete: () => void;
}

const DemoIntro = ({ onComplete }: DemoIntroProps) => {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'fade'>('logo');

  useEffect(() => {
    const taglineTimer = setTimeout(() => setPhase('tagline'), 1200);
    const fadeTimer = setTimeout(() => setPhase('fade'), 3000);
    const completeTimer = setTimeout(onComplete, 3800);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground transition-opacity duration-700 ${
        phase === 'fade' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gold glow backdrop */}
      <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />

      {/* Logo container */}
      <div className="relative">
        {/* Decorative lines */}
        <div
          className={`absolute -left-20 top-1/2 h-px w-16 bg-gradient-to-r from-transparent to-primary transition-all duration-1000 ${
            phase !== 'logo' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        />
        <div
          className={`absolute -right-20 top-1/2 h-px w-16 bg-gradient-to-l from-transparent to-primary transition-all duration-1000 ${
            phase !== 'logo' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        />

        {/* Main logo */}
        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl text-background tracking-wider transition-all duration-1000 ${
            phase === 'logo' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <span className="relative inline-block">
            Maison
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-shimmer-slow" />
          </span>
          <span className="block text-primary mt-2">le Sept</span>
        </h1>
      </div>

      {/* Tagline with typewriter effect */}
      <div
        className={`mt-8 overflow-hidden transition-all duration-700 ${
          phase === 'tagline' || phase === 'fade' ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
        }`}
      >
        <p className="text-background/70 text-lg md:text-xl tracking-[0.3em] uppercase font-sans animate-typewriter">
          Premium Restaurant Template
        </p>
      </div>

      {/* Decorative diamond */}
      <div
        className={`mt-12 w-3 h-3 rotate-45 border border-primary transition-all duration-1000 ${
          phase !== 'logo' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-shimmer-slow { animation: shimmer-slow 2s ease-in-out infinite; }
        .animate-typewriter { 
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 1.5s steps(30) forwards;
        }
      `}</style>
    </div>
  );
};

export default DemoIntro;
