import { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const reservationSchema = z.object({
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(100, 'Le nom est trop long'),
  email: z.string().trim().email('Email invalide').max(255, 'Email trop long'),
  date: z.string().min(1, 'La date est requise'),
  time: z.string().min(1, 'L\'heure est requise'),
  guests: z.string().min(1, 'Le nombre de convives est requis'),
  message: z.string().max(1000, 'Message trop long').optional(),
});

const Reservations = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Check if date is in the future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrors({ date: 'La date doit être dans le futur' });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          date: formData.date,
          time: formData.time,
          guests: parseInt(formData.guests),
          special_requests: formData.message.trim() || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Reservation error:', error);
        toast.error('Erreur lors de la réservation. Veuillez réessayer.');
        return;
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '',
        message: '',
      });

      // Navigate to confirmation page
      navigate(`/reservation-confirmation?id=${data.id}`);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Une erreur inattendue s\'est produite.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <section
      id="reservations"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side - Content */}
          <div
            className={`text-offwhite transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <p className="font-sans text-sm tracking-[0.3em] uppercase text-gold mb-4">
              Rejoignez-nous
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Faites une <span className="italic">Réservation</span>
            </h2>
            <div className="w-24 h-px bg-gold mb-8" />
            <p className="font-sans text-offwhite/70 leading-relaxed mb-8">
              Nous vous invitons à nous rejoindre pour une expérience culinaire inoubliable. 
              Réservez votre table dès aujourd'hui et laissez-nous vous emmener dans un voyage 
              gastronomique célébrant les meilleurs ingrédients de saison.
            </p>

            {/* Info Cards */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-offwhite mb-1">Horaires</h4>
                  <p className="font-sans text-sm text-offwhite/60">
                    Mardi - Dimanche: 12h00 - 14h30 / 19h00 - 22h30
                    <br />
                    Fermé le lundi
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <Users className="text-gold" size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-offwhite mb-1">Événements privés</h4>
                  <p className="font-sans text-sm text-offwhite/60">
                    Pour les groupes de 8 personnes ou plus, veuillez nous contacter directement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-offwhite/5 backdrop-blur-md border border-offwhite/10 p-8 lg:p-10"
            >
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/40" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-offwhite/20 text-offwhite placeholder:text-offwhite/40 py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/40" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Votre email"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-offwhite/20 text-offwhite placeholder:text-offwhite/40 py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/40" size={18} />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={getMinDate()}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-transparent border border-offwhite/20 text-offwhite py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors [color-scheme:dark] disabled:opacity-50"
                      />
                    </div>
                    {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/40" size={18} />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-transparent border border-offwhite/20 text-offwhite py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="" className="bg-charcoal">Heure</option>
                        <option value="12:00" className="bg-charcoal">12:00</option>
                        <option value="12:30" className="bg-charcoal">12:30</option>
                        <option value="13:00" className="bg-charcoal">13:00</option>
                        <option value="13:30" className="bg-charcoal">13:30</option>
                        <option value="14:00" className="bg-charcoal">14:00</option>
                        <option value="19:00" className="bg-charcoal">19:00</option>
                        <option value="19:30" className="bg-charcoal">19:30</option>
                        <option value="20:00" className="bg-charcoal">20:00</option>
                        <option value="20:30" className="bg-charcoal">20:30</option>
                        <option value="21:00" className="bg-charcoal">21:00</option>
                        <option value="21:30" className="bg-charcoal">21:30</option>
                      </select>
                    </div>
                    {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/40" size={18} />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-offwhite/20 text-offwhite py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="" className="bg-charcoal">Nombre de convives</option>
                      <option value="1" className="bg-charcoal">1 personne</option>
                      <option value="2" className="bg-charcoal">2 personnes</option>
                      <option value="3" className="bg-charcoal">3 personnes</option>
                      <option value="4" className="bg-charcoal">4 personnes</option>
                      <option value="5" className="bg-charcoal">5 personnes</option>
                      <option value="6" className="bg-charcoal">6 personnes</option>
                      <option value="7" className="bg-charcoal">7 personnes</option>
                    </select>
                  </div>
                  {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
                </div>

                {/* Message */}
                <div>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-offwhite/40" size={18} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Demandes spéciales (optionnel)"
                      rows={4}
                      disabled={isSubmitting}
                      className="w-full bg-transparent border border-offwhite/20 text-offwhite placeholder:text-offwhite/40 py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none disabled:opacity-50"
                    />
                  </div>
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 bg-primary text-primary-foreground font-sans text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Réservation en cours...
                      </>
                    ) : (
                      'Réserver maintenant'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
