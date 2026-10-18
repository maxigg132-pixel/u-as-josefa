import React from 'react';
import { Heart, Instagram, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-pink-200/70 pt-12 pb-16 sm:pb-12 text-stone-700 relative overflow-hidden">
      {/* Decorative ribbons & glow */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-pink-200/50">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">🎀</span>
              <span className="font-display text-2xl font-bold text-stone-900">
                {STUDIO_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto md:mx-0">
              Home Studio de uñas en San Bernardo, Chile. Manicura rusa, Soft Gel duradero y diseños coquette personalizados hechos con amor.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-pink-700 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>San Bernardo, Región Metropolitana</span>
            </div>
          </div>

          {/* Social Links & Contact */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4">
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-pink-200 text-pink-800 hover:text-pink-600 hover:border-pink-300 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>@{STUDIO_INFO.instagram}</span>
            </a>

            <a
              href={`https://wa.me/56982618359?text=${encodeURIComponent('Hola Jo! Vengo de tu web nailssssbyjo_ y me gustaría hacerte una consulta 💕')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-3 text-center">
          <p>© {new Date().getFullYear()} nailssssbyjo_. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-pink-700">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 inline" />
            <span>para amantes de las uñas delicadas</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
