import React from 'react';
import { Sparkles, Clock, Check, ArrowRight, Heart } from 'lucide-react';
import { BASE_SERVICES, ADDON_SERVICES } from '../data/studioData';
import { NailService } from '../types';

interface PricingSectionProps {
  onSelectServiceAndBook: (serviceId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectServiceAndBook }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="tarifario" className="py-14 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Transparencia & Calidad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Tarifario / Precios Base ✨
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Todos los servicios de esmaltado y Soft Gel incluyen preparación rusa/combinada profunda y nivelación de alta duración.
          </p>
        </div>

        {/* Base Pricing Glass Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-200/40 border border-pink-200/80 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-pink-100">
            <div className="flex items-center gap-2">
              <span className="text-xl">💅</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                Servicios Principales
              </h3>
            </div>
            <span className="text-xs font-medium text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200/60">
              Valores en Pesos Chilenos (CLP)
            </span>
          </div>

          {/* Structured List with right-aligned prices */}
          <div className="divide-y divide-pink-100/70">
            {BASE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-white/40 -mx-4 px-4 rounded-2xl transition-all"
              >
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                      {service.name}
                    </h4>
                    {service.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500 text-white shadow-2xs">
                        Favorito ✨
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-pink-700 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duración aprox: {service.duration}</span>
                  </div>
                </div>

                {/* Right-aligned price & CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-pink-800 tracking-tight">
                      {formatPrice(service.price)}
                    </span>
                    <span className="block text-[11px] text-stone-600 font-medium -mt-0.5">
                      Abonas $5.000 al agendar
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectServiceAndBook(service.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-pink-700 bg-pink-100/80 hover:bg-pink-500 hover:text-white transition-all shadow-2xs cursor-pointer active:scale-95"
                  >
                    <span>Seleccionar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons and Design Accents */}
        <div className="glass-card-subtle rounded-3xl p-6 sm:p-7 border border-pink-200/60">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✨</span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900">
              Adicionales & Diseños a Mano Alzada
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mb-6">
            Puedes sumar estos complementos durante tu cita o indicarlos al reservar para darte el tiempo necesario:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ADDON_SERVICES.map((addon) => (
              <div
                key={addon.id}
                className="bg-white/80 rounded-2xl p-4 border border-pink-100 flex items-start justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{addon.name}</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{addon.description}</p>
                </div>
                <span className="font-display font-bold text-pink-700 text-sm shrink-0">
                  +{formatPrice(addon.price)}
                </span>
              </div>
            ))}
          </div>

          {/* Abono reminder badge */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <p className="text-xs text-pink-900 leading-snug">
              <strong>Recuerda:</strong> El abono inicial de $5.000 se descuenta íntegramente del total final a pagar el día de tu atención en el estudio.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
