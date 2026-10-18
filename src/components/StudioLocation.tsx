import React from 'react';
import { MapPin, Sparkles, ShieldCheck, Heart, Clock, Navigation } from 'lucide-react';
import { STUDIO_INFO, joHomeStudioImg } from '../data/studioData';

export const StudioLocation: React.FC = () => {
  return (
    <section id="ubicacion" className="py-14 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main studio feature panel */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-200/80 shadow-xl shadow-pink-200/30 overflow-hidden relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Studio description & amenities */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wide uppercase">
                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                <span>San Bernardo, Chile</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                El Home Studio de Jo 🎀
              </h2>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Un espacio íntimo, cálido y privado pensado para que disfrutes de tu momento de autocuidado.
                Nos encontramos en un sector tranquilo de San Bernardo con fácil acceso y estacionamiento seguro.
              </p>

              {/* Grid of Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-pink-100">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">100% Esterilizado</h4>
                    <p className="text-[11px] text-stone-600">Herramientas desinfectadas con pouch individual descartable.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-pink-100">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-pink-500/20" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">Garantía & Durabilidad</h4>
                    <p className="text-[11px] text-stone-600">Trabajos con nivelación que duran intactos entre 3 a 4 semanas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-pink-100">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">Sin Prisas</h4>
                    <p className="text-[11px] text-stone-600">Bloques amplios dedicados únicamente a ti.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-pink-100">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">Insumos de Gama Alta</h4>
                    <p className="text-[11px] text-stone-600">Geles constructores y pigmentos hipoalergénicos certificados.</p>
                  </div>
                </div>
              </div>

              {/* Location Note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-stone-600">
                <Navigation className="w-4 h-4 text-pink-600 shrink-0" />
                <span>La dirección exacta se envía por WhatsApp una vez acreditado tu abono de $5.000.</span>
              </div>
            </div>

            {/* Right Column: Real studio room atmosphere photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-pink-200/90 aspect-[4/3] sm:aspect-[4/4]">
                <img
                  src={joHomeStudioImg}
                  alt="Home Studio de uñas en San Bernardo nailssssbyjo_"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <p className="text-xs font-semibold text-pink-200">Ambiente Climatizado & Coquette</p>
                    <p className="text-base font-bold font-display">Tu momento de calma y belleza 💕</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
