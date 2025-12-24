import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-offwhite">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-luxury text-3xl text-offwhite tracking-[0.02em] italic">Maison le Sept</span>
            </div>
            <p className="font-sans text-sm text-offwhite/60 leading-relaxed mb-6">
              Là où l'art culinaire rencontre une hospitalité sincère. Rejoignez-nous pour une 
              expérience gastronomique inoubliable qui célèbre les meilleurs ingrédients de saison.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-offwhite/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-offwhite mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold flex-shrink-0 mt-1" size={16} />
                <span className="font-sans text-sm text-offwhite/60">
                  123 Avenue Culinaire
                  <br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold flex-shrink-0" size={16} />
                <a
                  href="tel:+33142681234"
                  className="font-sans text-sm text-offwhite/60 hover:text-gold transition-colors"
                >
                  +33 1 42 68 12 34
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold flex-shrink-0" size={16} />
                <a
                  href="mailto:contact@lesept.fr"
                  className="font-sans text-sm text-offwhite/60 hover:text-gold transition-colors"
                >
                  contact@lesept.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg text-offwhite mb-6">Horaires</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="text-gold flex-shrink-0 mt-1" size={16} />
                <div className="font-sans text-sm text-offwhite/60">
                  <p className="mb-2">Mardi - Jeudi</p>
                  <p className="text-offwhite">17h30 - 22h00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-7">
                <div className="font-sans text-sm text-offwhite/60">
                  <p className="mb-2">Vendredi - Dimanche</p>
                  <p className="text-offwhite">17h30 - 23h00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-7">
                <div className="font-sans text-sm text-offwhite/60">
                  <p>Lundi - Fermé</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg text-offwhite mb-6">Newsletter</h4>
            <p className="font-sans text-sm text-offwhite/60 mb-4">
              Inscrivez-vous pour des actualités exclusives, événements et aperçus des menus de saison.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Merci pour votre inscription ! Ceci est un formulaire de démonstration.');
              }}
              className="space-y-3"
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                required
                className="w-full bg-transparent border border-offwhite/20 text-offwhite placeholder:text-offwhite/40 py-3 px-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gold text-charcoal font-sans text-sm tracking-widest uppercase hover:bg-gold/90 transition-all duration-300"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-64 bg-charcoal/80 border-t border-offwhite/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="text-gold mx-auto mb-4" size={32} />
            <p className="font-sans text-sm text-offwhite/40 tracking-widest uppercase">
              Emplacement de la Carte
            </p>
            <p className="font-sans text-xs text-offwhite/30 mt-2">
              123 Avenue Culinaire, 75008 Paris, France
            </p>
          </div>
        </div>
        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--offwhite) / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--offwhite) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-offwhite/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-sans text-xs text-offwhite/40">
              © {currentYear} Maison le Sept. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-sans text-xs text-offwhite/40 hover:text-gold transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="font-sans text-xs text-offwhite/40 hover:text-gold transition-colors">
                Conditions d'Utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
