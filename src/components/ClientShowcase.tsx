import React, { useState } from 'react';
import { Heart, Sparkles, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';
import { REAL_STUDIO_DESIGNS } from '../data/studioData';
import { RealStudioDesign } from '../data/studioData';

interface ClientShowcaseProps {
  onSelectDesignForBooking: (designTitle: string, imageSrc: string) => void;
}

export const ClientShowcase: React.FC<ClientShowcaseProps> = ({ onSelectDesignForBooking }) => {
  const [likes, setLikes] = useState<Record<string, number>>({
    'real-1': 148,
    'real-2': 194,
    'real-3': 162,
    'real-4': 215,
    'real-5': 178,
  });

  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserLiked((prev) => {
      const isCurrentlyLiked = !!prev[id];
      setLikes((currentLikes) => ({
        ...currentLikes,
        [id]: currentLikes[id] + (isCurrentlyLiked ? -1 : 1),
      }));
      return { ...prev, [id]: !isCurrentlyLiked };
    });
  };

  return (
    <section id="disenos-reales" className="py-14 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-pink-200 text-pink-700 text-xs font-semibold tracking-wide uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
            <span>Trabajos Reales en San Bernardo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            Diseños Realizados & Clientas Felices 💕
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Sets reales realizados en el estudio para nuestras hermosas clientas. Uñas con estructura prolija, cutículas limpias y nail art detallado.
          </p>
        </div>

        {/* 5 Real Designs Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REAL_STUDIO_DESIGNS.map((item) => {
            const isLiked = !!userLiked[item.id];
            const currentLikeCount = likes[item.id] || item.heartCount;

            return (
              <div
                key={item.id}
                className="group glass-panel rounded-3xl p-4 sm:p-5 border border-pink-200/90 shadow-xl shadow-pink-200/40 hover:shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Frame with Instagram Story Feel */}
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-pink-100 shadow-md group-hover:shadow-lg transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-black/25 pointer-events-none" />

                    {/* Top client tag ribbon */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-pink-900 shadow-xs border border-white/60">
                      <span>🎀 {item.clientHandle}</span>
                    </div>

                    {/* Interactive Like Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => handleLike(item.id, e)}
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500 text-white scale-105'
                          : 'bg-white/85 text-stone-700 hover:bg-white hover:text-rose-500'
                      }`}
                      aria-label="Dar me gusta"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? 'fill-white stroke-white' : 'stroke-rose-500'
                        }`}
                      />
                      <span>{currentLikeCount}</span>
                    </button>

                    {/* Bottom overlay preview inside the image */}
                    <div className="absolute bottom-3 inset-x-3 text-white pointer-events-none">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300 bg-pink-950/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {item.category}
                      </span>
                      <p className="text-sm font-bold text-white mt-1 leading-snug drop-shadow-sm">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/* Text Description & Style Tags */}
                  <div className="pt-4 space-y-3">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Style Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.styleTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-pink-100/70 text-pink-800 border border-pink-200/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Action Button to book this exact design */}
                <div className="pt-4 mt-3 border-t border-pink-100">
                  <button
                    onClick={() => onSelectDesignForBooking(item.title, item.image)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-300/40 hover:shadow-lg hover:shadow-pink-300/50 active:scale-97 transition-all cursor-pointer animate-shimmer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Quiero este diseño para mi cita 🎀</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coquette studio seal */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/80 border border-pink-200 text-xs text-stone-700 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Todos los sets son realizados a mano alzada y con insumos de alta gama en el estudio</span>
          </div>
        </div>

      </div>
    </section>
  );
};
