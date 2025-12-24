import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, Clock, Users, Sparkles, MessageSquare, MapPin, Star, Utensils, Wine, ChevronDown, Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const timeSlots = [
  "17h30", "18h00", "18h30", "19h00", "19h30", 
  "20h00", "20h30", "21h00", "21h30"
];

const guestOptions = ["1 Personne", "2 Personnes", "3 Personnes", "4 Personnes", "5 Personnes", "6 Personnes", "7+ Personnes"];

const occasions = ["Aucune", "Anniversaire", "Mariage", "Dîner d'affaires", "Demande en mariage", "Célébration", "Autre"];

// Validation schema
const reservationSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email invalide").max(255),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide").max(20),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
  guests: z.string().min(1, "Nombre de convives requis"),
  occasion: z.string().optional(),
  requests: z.string().max(1000).optional(),
});

const ReservationsPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    requests: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on field change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = reservationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Veuillez corriger les erreurs du formulaire");
      return;
    }

    // Check date is in the future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrors({ date: "La date doit être aujourd'hui ou dans le futur" });
      toast.error("La date doit être aujourd'hui ou dans le futur");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse guests number from string like "2 Personnes"
      const guestsNumber = parseInt(formData.guests.match(/\d+/)?.[0] || "2", 10);
      
      // Convert time format from "19h30" to "19:30"
      const timeFormatted = formData.time.replace('h', ':');

      // Prepare data for database
      const reservationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: timeFormatted,
        guests: guestsNumber,
        occasion: formData.occasion && formData.occasion !== "Aucune" ? formData.occasion : null,
        special_requests: formData.requests?.trim() || null,
        status: 'pending' as const,
      };

      const { data, error } = await supabase
        .from('reservations')
        .insert(reservationData)
        .select()
        .single();

      if (error) {
        console.error('Reservation error:', error);
        toast.error("Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      toast.success("Réservation envoyée avec succès!");
      window.scrollTo(0, 0);
      navigate('/reservations/confirmation', { 
        state: { 
          reservationData: formData,
          reservationId: data.id 
        } 
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PageHeader />

      {/* Hero Section - Dark */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end justify-center overflow-hidden bg-charcoal pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/30 to-charcoal" />
        
        <div className="absolute top-32 left-10 w-32 h-32 border border-gold/20 rotate-45 hidden md:block" />
        <div className="absolute bottom-24 right-16 w-24 h-24 border border-gold/30 rotate-12 hidden md:block" />
        
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-2 h-2 bg-gold rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          
          <h1 className="font-luxury text-5xl md:text-7xl tracking-wide text-offwhite mb-4 italic drop-shadow-lg">
            Réservations
          </h1>
          
          <p className="font-sans text-sm md:text-base text-offwhite/80 tracking-[0.3em] uppercase drop-shadow-md">
            Une Soirée Inoubliable Vous Attend
          </p>
        </div>
      </section>

      {/* Light Content Section */}
      <div className="bg-gradient-to-b from-[#FAF8F5] via-[#F5F2EE] to-[#FAF8F5]">
        {/* Main Reservation Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4">Réservez Votre Expérience</p>
              <h2 className="font-luxury text-4xl md:text-5xl text-charcoal italic mb-4">Votre Table Vous Attend</h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
            </div>

            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              
              {/* Left Side - Restaurant Info - 2 cols */}
              <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                
                {/* Info Cards */}
                <div className="space-y-4">
                  {/* Hours Card */}
                  <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Clock size={18} className="text-gold" />
                      </div>
                      <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal font-medium">Horaires</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm text-charcoal/60">Mar — Jeu</span>
                        <span className="font-sans text-sm text-charcoal font-medium">17h30 — 22h00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm text-charcoal/60">Ven — Sam</span>
                        <span className="font-sans text-sm text-charcoal font-medium">17h00 — 23h00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm text-charcoal/60">Dimanche</span>
                        <span className="font-sans text-sm text-charcoal font-medium">17h00 — 21h00</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-charcoal/5">
                        <span className="font-sans text-sm text-charcoal/60">Lundi</span>
                        <span className="font-sans text-sm text-charcoal/40 italic">Fermé</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <MapPin size={18} className="text-gold" />
                      </div>
                      <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal font-medium">Adresse</h3>
                    </div>
                    <p className="font-sans text-charcoal/70 leading-relaxed">
                      7 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </p>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-white rounded-2xl p-6 border border-charcoal/5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-charcoal font-medium">Contact</h3>
                    </div>
                    <div className="space-y-2">
                      <a href="tel:+33123456789" className="block font-sans text-charcoal hover:text-gold transition-colors">
                        +33 1 23 45 67 89
                      </a>
                      <a href="mailto:reservations@lesept.fr" className="block font-sans text-charcoal/70 hover:text-gold transition-colors text-sm">
                        reservations@lesept.fr
                      </a>
                    </div>
                  </div>

                  {/* Dress Code & Events */}
                  <div className="bg-gradient-to-br from-charcoal to-charcoal/95 rounded-2xl p-6 text-offwhite">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-gold" />
                      </div>
                      <h3 className="font-sans text-sm tracking-[0.15em] uppercase text-offwhite font-medium">Événements Privés</h3>
                    </div>
                    <p className="font-sans text-offwhite/70 text-sm leading-relaxed mb-4">
                      Notre salle privée accueille jusqu'à 24 convives pour vos célébrations et réunions.
                    </p>
                    <p className="font-sans text-xs text-gold">
                      Tenue décontractée chic appréciée
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Reservation Form - 3 cols */}
              <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-charcoal/5 border border-charcoal/5">
                  {/* Decorative top accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/30">
                    <Calendar size={24} className="text-charcoal" />
                  </div>

                  {/* Form Header */}
                  <div className="text-center mb-10 pt-6">
                    <h2 className="font-luxury text-2xl md:text-3xl text-charcoal italic mb-2">Réservez Votre Table</h2>
                    <p className="font-sans text-sm text-charcoal/50">
                      Confirmation sous 24 heures
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                        Nom complet <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white border border-gold/30 pl-12 pr-4 py-4 text-charcoal font-sans placeholder:text-charcoal/40 focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <p className="font-sans text-xs text-charcoal/50 pl-1">Nom sous lequel la réservation sera enregistrée</p>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                          Email <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                            <Mail size={18} />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-white border border-gold/30 pl-12 pr-4 py-4 text-charcoal font-sans placeholder:text-charcoal/40 focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                            placeholder="votre@email.com"
                          />
                        </div>
                        <p className="font-sans text-xs text-charcoal/50 pl-1">Pour recevoir la confirmation</p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                          Téléphone <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                            <Phone size={18} />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-white border border-gold/30 pl-12 pr-4 py-4 text-charcoal font-sans placeholder:text-charcoal/40 focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                            placeholder="+33 6 12 34 56 78"
                          />
                        </div>
                        <p className="font-sans text-xs text-charcoal/50 pl-1">En cas de changement de dernière minute</p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="date" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                          Date <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                            <Calendar size={18} />
                          </div>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={getMinDate()}
                            required
                            className={`w-full bg-white border pl-12 pr-4 py-4 text-charcoal font-sans focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all cursor-pointer ${errors.date ? 'border-red-500' : 'border-gold/30'}`}
                          />
                          {errors.date && <p className="font-sans text-xs text-red-500 mt-1">{errors.date}</p>}
                        </div>
                        <p className="font-sans text-xs text-charcoal/50 pl-1">Nous sommes ouverts du mardi au samedi</p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="time" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                          Heure <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                            <Clock size={18} />
                          </div>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 pointer-events-none">
                            <ChevronDown size={18} />
                          </div>
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full bg-white border border-gold/30 pl-12 pr-10 py-4 text-charcoal font-sans focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Sélectionnez l'heure</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                        <p className="font-sans text-xs text-charcoal/50 pl-1">Service de 17h30 à 22h00</p>
                      </div>
                    </div>

                    {/* Guests & Occasion */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="guests" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                          Nombre de convives <span className="text-gold">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                            <Users size={18} />
                          </div>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 pointer-events-none">
                            <ChevronDown size={18} />
                          </div>
                          <select
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                            className="w-full bg-white border border-gold/30 pl-12 pr-10 py-4 text-charcoal font-sans focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Sélectionnez</option>
                            {guestOptions.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                        <p className="font-sans text-xs text-charcoal/50 pl-1">Pour les groupes de 7+, contactez-nous directement</p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="occasion" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                          Occasion
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">
                            <Sparkles size={18} />
                          </div>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 pointer-events-none">
                            <ChevronDown size={18} />
                          </div>
                          <select
                            id="occasion"
                            name="occasion"
                            value={formData.occasion}
                            onChange={handleChange}
                            className="w-full bg-white border border-gold/30 pl-12 pr-10 py-4 text-charcoal font-sans focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled>Sélectionnez (optionnel)</option>
                            {occasions.map(occ => (
                              <option key={occ} value={occ}>{occ}</option>
                            ))}
                          </select>
                        </div>
                        <p className="font-sans text-xs text-charcoal/50 pl-1">Nous préparerons une surprise pour vous</p>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <label htmlFor="requests" className="block font-sans text-xs tracking-[0.1em] uppercase text-charcoal/70">
                        Demandes spéciales
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 text-gold/60">
                          <MessageSquare size={18} />
                        </div>
                        <textarea
                          id="requests"
                          name="requests"
                          value={formData.requests}
                          onChange={handleChange}
                          rows={3}
                          className="w-full bg-white border border-gold/30 pl-12 pr-4 py-4 text-charcoal font-sans placeholder:text-charcoal/40 focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all resize-none"
                          placeholder="Allergies, préférences alimentaires, demandes particulières..."
                        />
                      </div>
                      <p className="font-sans text-xs text-charcoal/50 pl-1">Informez-nous de vos restrictions alimentaires ou besoins particuliers</p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-8 px-8 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.15em] uppercase hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 transition-all duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        "Confirmer la Réservation"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Experience Section - Modern Card Design */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-charcoal">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gold/[0.03] rounded-full blur-[150px]" />
        </div>
        
        {/* Decorative geometric elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold/10 rotate-45 hidden lg:block" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-gold/15 -rotate-12 hidden lg:block" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
              <div className="w-2 h-2 bg-gold rounded-full" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h2 className="font-luxury text-4xl md:text-5xl text-offwhite italic mb-4">
              Ce Qui Vous Attend
            </h2>
            <p className="font-sans text-offwhite/50 max-w-xl mx-auto">
              Une expérience gastronomique conçue pour éveiller tous vos sens
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - Ambiance */}
            <div className="group relative bg-gradient-to-b from-offwhite/10 to-offwhite/5 backdrop-blur-sm rounded-2xl p-8 border border-offwhite/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <Star size={24} className="text-gold" />
              </div>
              <h4 className="font-luxury text-xl text-offwhite italic mb-3">Ambiance Raffinée</h4>
              <p className="font-sans text-offwhite/60 text-sm leading-relaxed">
                Éclairage intimiste, décor élégant et atmosphère conçue pour des moments mémorables.
              </p>
            </div>

            {/* Card 2 - Cuisine */}
            <div className="group relative bg-gradient-to-b from-offwhite/10 to-offwhite/5 backdrop-blur-sm rounded-2xl p-8 border border-offwhite/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <Utensils size={24} className="text-gold" />
              </div>
              <h4 className="font-luxury text-xl text-offwhite italic mb-3">Menus de Saison</h4>
              <p className="font-sans text-offwhite/60 text-sm leading-relaxed">
                Des ingrédients frais de nos producteurs locaux transformés en expériences culinaires extraordinaires.
              </p>
            </div>

            {/* Card 3 - Service */}
            <div className="group relative bg-gradient-to-b from-offwhite/10 to-offwhite/5 backdrop-blur-sm rounded-2xl p-8 border border-offwhite/10 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <Wine size={24} className="text-gold" />
              </div>
              <h4 className="font-luxury text-xl text-offwhite italic mb-3">Service Impeccable</h4>
              <p className="font-sans text-offwhite/60 text-sm leading-relaxed">
                Une équipe attentive et experte, dévouée à dépasser vos attentes.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <p className="font-sans text-offwhite/50 mb-4">
              Vous préférez nous parler directement ?
            </p>
            <a 
              href="tel:+33123456789" 
              className="inline-flex items-center gap-3 font-luxury text-2xl md:text-3xl text-offwhite hover:text-gold transition-colors group"
            >
              <Phone size={24} className="text-gold group-hover:scale-110 transition-transform" />
              +33 1 23 45 67 89
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-offwhite/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-sans text-sm text-offwhite/40 tracking-wider">
            © {new Date().getFullYear()} Le Sept. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationsPage;
