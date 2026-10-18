import React from 'react';
import { Heart, AlertCircle, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { POLICIES } from '../data/studioData';

export const BookingPolicies: React.FC = () => {
  return (
    <section id="politicas" className="py-14 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Condiciones del Home Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Políticas de Reserva 🎀
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Para coordinar tu cita con el tiempo y dedicación que mereces, por favor ten en cuenta las siguientes 3 reglas básicas:
          </p>
        </div>

        {/* 3 Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {POLICIES.map((policy, idx) => {
            const isHeart = policy.iconType === 'heart';
            const isAlert = policy.iconType === 'alert';
            const isMessage = policy.iconType === 'message';

            return (
              <div
                key={policy.id}
                className="group relative glass-panel rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-300/30 border border-pink-200/70 overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative subtle background corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/40 via-rose-100/20 to-transparent rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-100" />

                <div>
                  {/* Top Header with Icon and Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
                        isHeart
                          ? 'bg-gradient-to-br from-pink-400 to-rose-500 text-white shadow-pink-300/40'
                          : isAlert
                          ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-rose-300/40'
                          : 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-fuchsia-300/40'
                      }`}
                    >
                      {isHeart && <Heart className="w-7 h-7 fill-white/20 stroke-white stroke-[2.2]" />}
                      {isAlert && <AlertCircle className="w-7 h-7 stroke-white stroke-[2.2]" />}
                      {isMessage && <Mail className="w-7 h-7 stroke-white stroke-[2.2]" />}
                    </div>

                    <span className="text-2xl font-display font-bold text-pink-300/80 group-hover:text-pink-500 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-pink-700 transition-colors">
                    {policy.title}
                  </h3>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    {policy.description}
                  </p>
                </div>

                {/* Bottom Highlight pill */}
                <div className="mt-6 pt-4 border-t border-pink-100/80 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                  <span className="text-xs font-semibold text-pink-800 tracking-tight">
                    {policy.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra studio courtesy note banner */}
        <div className="mt-8 glass-card-subtle rounded-2xl p-4 sm:p-5 border border-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏳</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                Puntualidad & Respeto del Horario
              </p>
              <p className="text-xs text-stone-600">
                Tolerancia máxima de 10 minutos para asegurar la calidad de cada set y respetar las demás clientas.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-pink-100 text-pink-800 shrink-0">
            San Bernardo 🌸
          </span>
        </div>
      </div>
    </section>
  );
};
