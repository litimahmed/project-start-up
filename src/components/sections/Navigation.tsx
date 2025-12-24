import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'À Propos', href: '#about' },
  { name: 'Carte', href: '/menu', isPage: true },
  { name: 'Galerie', href: '/gallery', isPage: true },
  { name: 'Réservations', href: '/reservations', isPage: true },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg py-5'
          : 'bg-gradient-to-b from-charcoal/80 to-transparent py-7'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group"
          >
            <span className="font-luxury text-2xl md:text-3xl tracking-[0.03em] transition-colors duration-500 italic text-offwhite group-hover:text-gold">
              Maison le Sept
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              link.isPage ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 py-2 text-offwhite/70 hover:text-offwhite"
                >
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 py-2 ${
                    activeSection === link.href.substring(1)
                      ? 'text-gold'
                      : 'text-offwhite/70 hover:text-offwhite'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-px transform origin-left transition-transform duration-300 bg-gold ${
                      activeSection === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            ))}
          </div>

          <Link
            to="/reservations"
            onClick={() => window.scrollTo(0, 0)}
            className="hidden lg:block px-5 py-2 font-sans text-xs tracking-[0.15em] uppercase transition-all duration-500 text-gold border border-gold/50 hover:bg-gold hover:text-charcoal"
          >
            Réserver
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 transition-colors duration-500 text-offwhite hover:text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 py-6 border-t border-offwhite/10">
            {navLinks.map((link) => (
              link.isPage ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-sm tracking-widest uppercase py-3 px-4 transition-all duration-300 text-offwhite/70 hover:text-offwhite hover:bg-offwhite/5"
                >
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-sans text-sm tracking-widest uppercase py-3 px-4 transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-gold bg-offwhite/5'
                      : 'text-offwhite/70 hover:text-offwhite hover:bg-offwhite/5'
                  }`}
                >
                  {link.name}
                </a>
              )
            ))}
            <Link
              to="/reservations"
              onClick={() => window.scrollTo(0, 0)}
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

export default Navigation;
