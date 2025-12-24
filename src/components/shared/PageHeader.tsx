import { useState, useEffect, useCallback, memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'À Propos', href: '/#about' },
  { name: 'Carte', href: '/menu' },
  { name: 'Galerie', href: '/gallery' },
  { name: 'Réservations', href: '/reservations' },
] as const;

const PageHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = useCallback((href: string) => {
    if (href === '/#about') return false;
    return location.pathname.startsWith(href);
  }, [location.pathname]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-lg py-3 shadow-2xl shadow-black/20'
          : 'bg-gradient-to-b from-charcoal/80 to-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="group">
            <span className="font-luxury text-2xl md:text-3xl tracking-[0.03em] text-offwhite group-hover:text-gold transition-colors duration-300 italic">
              Maison le Sept
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 py-2 ${
                  isActive(link.href)
                    ? 'text-gold'
                    : 'text-offwhite/70 hover:text-offwhite'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-px bg-gold transform origin-left transition-transform duration-300 ${
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Reservation Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/reservations"
              onClick={() => window.scrollTo(0, 0)}
              className="px-6 py-2.5 bg-transparent text-gold font-sans text-xs tracking-[0.15em] uppercase border border-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-offwhite p-2 hover:text-gold transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 py-6 border-t border-offwhite/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className={`font-sans text-sm tracking-widest uppercase py-3 px-4 transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-gold bg-offwhite/5'
                    : 'text-offwhite/70 hover:text-offwhite hover:bg-offwhite/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <Link
              to="/reservations"
              onClick={() => { closeMobileMenu(); window.scrollTo(0, 0); }}
              className="mt-4 mx-4 px-6 py-3 bg-transparent text-gold font-sans text-sm tracking-widest uppercase text-center border border-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              Réserver une Table
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(PageHeader);
