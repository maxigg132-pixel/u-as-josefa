import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientShowcase } from './components/ClientShowcase';
import { BookingPolicies } from './components/BookingPolicies';
import { PricingSection } from './components/PricingSection';
import { StudioLocation } from './components/StudioLocation';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Calendar, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from './data/studioData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  const [preSelectedDesign, setPreSelectedDesign] = useState<{ title: string; imageSrc: string } | null>(null);

  const handleOpenBooking = () => {
    setPreSelectedServiceId(null);
    setPreSelectedDesign(null);
    setIsBookingOpen(true);
  };

  const handleSelectServiceAndBook = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedDesign(null);
    setIsBookingOpen(true);
  };

  const handleSelectDesignForBooking = (title: string, imageSrc: string) => {
    setPreSelectedDesign({ title, imageSrc });
    setPreSelectedServiceId('soft-gel'); // Default to soft-gel for nail art
    setIsBookingOpen(true);
  };

  // Safe URI-encoded message with "uñas"
  const whatsappMessage = encodeURIComponent(
    'Hola Jo! Estoy lista para arreglarme esas uñas y me gustaría consultar disponibilidad para una cita en tu estudio.'
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-[#4A2834]">
      {/* Animated Coquette Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft floating glowing orbs */}
        <div className="absolute top-[5%] left-[10%] w-96 h-96 rounded-full bg-pink-300/30 blur-3xl animate-float-slow" />
        <div className="absolute top-[35%] right-[5%] w-[420px] h-[420px] rounded-full bg-rose-300/25 blur-3xl animate-float-reverse" />
        <div className="absolute top-[65%] left-[15%] w-[500px] h-[500px] rounded-full bg-fuchsia-200/20 blur-3xl animate-float-slow" />
        <div className="absolute top-[85%] right-[12%] w-80 h-80 rounded-full bg-pink-200/35 blur-3xl animate-float-reverse" />

        {/* Delicate floating coquette ribbons and sparkles scattered subtly across page */}
        <div className="absolute top-24 left-[7%] text-pink-300/60 text-2xl select-none animate-float-slow">🎀</div>
        <div className="absolute top-[28%] right-[8%] text-pink-300/50 text-xl select-none animate-float-reverse">✨</div>
        <div className="absolute top-[48%] left-[4%] text-rose-300/40 text-2xl select-none animate-float-slow">🎀</div>
        <div className="absolute top-[68%] right-[6%] text-pink-300/50 text-xl select-none animate-float-reverse">✨</div>
        <div className="absolute top-[88%] left-[9%] text-pink-300/50 text-2xl select-none animate-float-slow">🎀</div>
      </div>

      {/* Header Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. DEDICATED REAL CLIENT DESIGNS SECTION (Clientas Felices & Diseños Reales) */}
        <ClientShowcase onSelectDesignForBooking={handleSelectDesignForBooking} />

        {/* 3. POLÍTICAS DE RESERVA (3 tarjetas con iconos) */}
        <BookingPolicies />

        {/* 4. TARIFARIO / PRECIOS BASE (Lista estructurada) */}
        <PricingSection onSelectServiceAndBook={handleSelectServiceAndBook} />

        {/* Studio amenities & San Bernardo location */}
        <StudioLocation />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* 6. SISTEMA DE RESERVAS SIMULADO (Modal interactivo paso a paso con Mercado Pago) */}
      {isBookingOpen && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preSelectedServiceId={preSelectedServiceId}
          preSelectedDesign={preSelectedDesign}
        />
      )}

      {/* Heart-Shaped Floating WhatsApp CTA with Personalized Speech Bubble */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2.5">
        {/* Personalized Speech Bubble / Pill */}
        <a
          href={`https://wa.me/56982618359?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-pink-900 border border-pink-200/90 shadow-lg shadow-pink-200/50 hover:bg-white hover:border-pink-400 transition-all group"
        >
          <p className="text-xs font-semibold text-stone-800">
            ¿Lista para arreglarte esas uñas? <span className="text-pink-600 font-bold">Habla con Jo 🎀</span>
          </p>
        </a>

        {/* Heart-Shaped Floating Button without green dot */}
        <a
          href={`https://wa.me/56982618359?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-1 transition-all cursor-pointer"
          title="¿Lista para arreglarte esas uñas? 🎀 Habla con Jo"
          aria-label="Contactar por WhatsApp"
        >
          {/* Glowing pulse ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 blur-md opacity-70 group-hover:opacity-100 animate-pulse" />

          {/* Pure Heart-shaped container button */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white flex items-center justify-center shadow-xl shadow-pink-500/35 group-hover:scale-110 active:scale-95 transition-all duration-300">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white stroke-white animate-pulse-heart" />
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Booking Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-pink-200 px-4 py-3 flex items-center justify-between shadow-lg">
        <div>
          <span className="block text-xs font-bold text-stone-900 leading-tight">
            nailssssbyjo_ 🎀
          </span>
          <span className="text-[11px] text-pink-700 font-medium">
            ¿Lista para tus uñas? · Abono $5.000
          </span>
        </div>

        <button
          onClick={handleOpenBooking}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-300/50 active:scale-95 transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reservar</span>
        </button>
      </div>
    </div>
  );
}

