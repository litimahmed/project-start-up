import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const FloatingReserveCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link
      to="/reservations"
      onClick={() => window.scrollTo(0, 0)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3 
        bg-gold text-charcoal font-sans text-xs tracking-[0.15em] uppercase
        shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30
        transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
        hover:scale-105 hover:bg-gold/90
        group
      `}
      aria-label="Réserver une table"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon with rotation animation */}
      <Calendar 
        size={16} 
        className={`relative z-10 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`}
      />
      
      {/* Text */}
      <span className="relative z-10 hidden sm:inline">Réserver</span>
      
      {/* Pulse ring effect */}
      <div className="absolute inset-0 rounded-sm animate-ping bg-gold/20 opacity-0 group-hover:opacity-100" 
           style={{ animationDuration: '2s' }} 
      />
    </Link>
  );
};

export default FloatingReserveCTA;
