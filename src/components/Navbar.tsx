import React, { useState } from 'react';
import { Sparkles, Calendar, Menu, X, Heart, MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro announcement banner */}
      <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide shadow-xs flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Agenda abierta para citas este mes · Cupos limitados en San Bernardo 🎀</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      {/* Main glass navigation */}
      <nav className="glass-panel border-b border-pink-200/50 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-md shadow-pink-300/40 group-hover:scale-105 transition-transform">
              <span className="text-base select-none">🎀</span>
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-pink-950 group-hover:text-pink-600 transition-colors">
                {STUDIO_INFO.name}
              </span>
              <span className="block text-[10px] text-pink-700 font-medium tracking-wider uppercase -mt-0.5">
                Home Studio · San Bernardo
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-pink-900/80">
            <a href="#disenos-reales" className="hover:text-pink-600 transition-colors py-1 flex items-center gap-1 font-semibold text-pink-700">
              <span className="text-xs">💕</span>
              <span>Clientas Felices</span>
            </a>
            <a href="#politicas" className="hover:text-pink-600 transition-colors py-1">
              Políticas
            </a>
            <a href="#tarifario" className="hover:text-pink-600 transition-colors py-1">
              Tarifario
            </a>
            <a href="#ubicacion" className="hover:text-pink-600 transition-colors py-1">
              Estudio
            </a>
            <a href="#preguntas" className="hover:text-pink-600 transition-colors py-1">
              Preguntas
            </a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/56912345678?text=Hola%20Jo!%20Me%20gustaria%20consultar%20por%20una%20hora%20para%20unas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-pink-700 hover:text-pink-900 border border-pink-200/60 transition-all shadow-xs"
              title="Consultar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-300/50 hover:shadow-lg hover:shadow-pink-300/60 active:scale-95 transition-all cursor-pointer animate-shimmer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Cita</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-sm"
            >
              Reservar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-pink-900 hover:bg-pink-100/60 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-pink-100 mt-3 space-y-2.5 animate-fadeIn">
            <div className="flex flex-col gap-1 text-sm font-medium text-pink-900">
              <a
                href="#disenos-reales"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-pink-100/50 transition-colors font-semibold text-pink-700"
              >
                💕 Clientas Felices & Diseños
              </a>
              <a
                href="#politicas"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-pink-100/50 transition-colors"
              >
                🎀 Políticas de Reserva
              </a>
              <a
                href="#tarifario"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-pink-100/50 transition-colors"
              >
                💅 Tarifario & Servicios
              </a>
              <a
                href="#ubicacion"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-pink-100/50 transition-colors"
              >
                📍 Ubicación en San Bernardo
              </a>
              <a
                href="#preguntas"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-pink-100/50 transition-colors"
              >
                ❔ Preguntas Frecuentes
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-md shadow-pink-300/40"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar Hora Ahora</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
