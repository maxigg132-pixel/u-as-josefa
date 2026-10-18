import React from 'react';
import { Calendar, Sparkles, MapPin, Heart, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24">
      {/* Background delicate glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-pink-100/70 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Soft pink studio badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs sm:text-sm font-medium shadow-xs backdrop-blur-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-pink-600" />
              <span>San Bernardo, Región Metropolitana</span>
            </div>

            {/* Stylized Main Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
                Información de mis uñas <span className="inline-block hover:scale-110 transition-transform">🎀</span>
              </h1>
              <p className="text-xl sm:text-2xl text-pink-700 font-serif-soft italic font-semibold">
                Home Studio en San Bernardo, Chile
              </p>
            </div>

            {/* Studio description */}
            <p className="text-base sm:text-lg text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Atención personalizada y dedicada en un ambiente cálido y relajante. Especialista en{' '}
              <strong className="text-pink-800 font-semibold">Soft Gel</strong> duradero, manicura combinada rusa y diseños
              coquette con acabados prolijos.
            </p>

            {/* Highlights pill tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs text-stone-700">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/70 border border-pink-200/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                <span>Manicura Rusa Impecable</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/70 border border-pink-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
                <span>Esterilización Médica</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/70 border border-pink-200/80 shadow-2xs">
                <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-500/20" />
                <span>Atención 1 a 1 sin prisas</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-3xl font-bold text-base text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 shadow-xl shadow-pink-400/35 hover:shadow-2xl hover:shadow-pink-400/45 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer animate-shimmer"
              >
                <Calendar className="w-5 h-5" />
                <span>Reservar Hora Ahora</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href="#tarifario"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-3xl font-semibold text-sm text-pink-800 bg-white/80 hover:bg-white border border-pink-200/80 shadow-xs hover:shadow-md transition-all text-center"
              >
                <span>Ver Tarifario Base</span>
              </a>
            </div>

            {/* Micro disclaimer */}
            <p className="text-xs text-pink-700/80 flex items-center justify-center lg:justify-start gap-1.5">
              <span>* Se reserva con abono de $5.000 transferible o vía Mercado Pago</span>
            </p>
          </div>

          {/* Right Column: Aesthetic Coquette Visual Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Cute floating card backdrop */}
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Outer soft pink glow & decorative ribbons */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-300/40 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-rose-300/40 rounded-full blur-xl" />

              {/* Main portrait glass frame */}
              <div className="glass-panel p-3.5 sm:p-4 rounded-3xl shadow-xl shadow-pink-200/50 relative overflow-hidden group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-pink-100">
                  <img
                    src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80"
                    alt="Manicura Soft Gel Coquette por nailssssbyjo_"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle top badge over photo */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-pink-800 font-semibold text-xs shadow-xs flex items-center gap-1.5">
                    <span>🎀 nailssssbyjo_</span>
                  </div>

                  {/* Bottom glass banner on photo */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-stone-900">Soft Gel & Nail Art Delicado</p>
                        <p className="text-[11px] text-pink-700">Durabilidad 3 a 4 semanas garantizada</p>
                      </div>
                      <span className="text-base">✨</span>
                    </div>
                  </div>
                </div>

                {/* Decorative subtle glass badge on photo corner */}
                <div className="absolute -top-3 -right-2 glass-panel px-3 py-1.5 rounded-2xl shadow-md border border-pink-200 flex items-center gap-1.5 text-xs font-bold text-pink-800">
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  <span>San Bernardo 🎀</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
