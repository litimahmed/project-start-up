import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import DemoIntro from '@/components/demo/DemoIntro';
import DemoHero from '@/components/demo/DemoHero';
import DemoVariations from '@/components/demo/DemoVariations';
import DemoStats from '@/components/demo/DemoStats';
import FeatureShowcase from '@/components/demo/FeatureShowcase';
import DemoCTA from '@/components/demo/DemoCTA';

const DemoPage = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <>
      <Helmet>
        <title>Maison le Sept - Premium Restaurant Template | ThemeForest</title>
        <meta
          name="description"
          content="A premium, fully responsive restaurant template with admin dashboard, reservation system, and modern design. Built with React, TypeScript, and Tailwind CSS."
        />
        <meta name="keywords" content="restaurant template, themeforest, premium template, react template, restaurant website" />
      </Helmet>

      {/* Cinematic Intro */}
      {showIntro && <DemoIntro onComplete={handleIntroComplete} />}

      {/* Main Demo Showcase */}
      <main className={`transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <DemoHero />
        <DemoVariations />
        <DemoStats />
        <FeatureShowcase />
        <DemoCTA />
      </main>
    </>
  );
};

export default DemoPage;
