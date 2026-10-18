import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Instagram,
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  AlertCircle,
  FileText,
  Upload,
} from 'lucide-react';
import { BASE_SERVICES, ADDON_SERVICES, TIME_SLOTS, STUDIO_INFO } from '../data/studioData';
import { NailService } from '../types';

interface StudioSlotDay {
  dateKey: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  fullFormatted: string;
}

const getUpcomingDays = (): StudioSlotDay[] => {
  const days: StudioSlotDay[] = [];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const shortMonth = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dayOfWeek = d.getDay();
    // Atiende de Lunes (1) a Sábado (6)
    if (dayOfWeek !== 0) {
      days.push({
        dateKey: d.toISOString().split('T')[0],
        dayName: dayNames[dayOfWeek],
        dayNumber: d.getDate(),
        monthName: shortMonth[d.getMonth()],
        fullFormatted: `${dayNames[dayOfWeek]} ${d.getDate()} de ${monthNames[d.getMonth()]}`,
      });
    }
  }
  return days;
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string | null;
  preSelectedDesign?: { title: string; imageSrc: string } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedDesign,
}) => {
  const upcomingDays = getUpcomingDays();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(['soft-gel']);
  
  // Date and Time selection right inside the app
  const [selectedDayKey, setSelectedDayKey] = useState<string>(upcomingDays[0]?.dateKey || '');
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('15:00 PM');
  const [calendarAppointment, setCalendarAppointment] = useState<string>('');
  
  // Client details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientInstagram, setClientInstagram] = useState<string>('');
  const [designNotes, setDesignNotes] = useState<string>('');
  const [referenceDesign, setReferenceDesign] = useState<{ title: string; imageSrc: string } | null>(null);

  // Mercado Pago Payment Flow State
  const [paymentState, setPaymentState] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'tarjeta' | 'cuentarut' | 'mercadopago'>('tarjeta');
  const [bookingCode, setBookingCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Fixed internal values (protected in code so clients cannot alter them)
  const joPhone = '56982618359';
  const customMpLink = 'https://mpago.la/abono-nailssssbyjo';
  const googleCalendarUrl = STUDIO_INFO.googleCalendarUrl || 'https://calendar.app.google/ayUexisAw3hPoHAk7';

  // Handle pre-selections
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServices((prev) =>
        prev.includes(preSelectedServiceId) ? prev : [...prev, preSelectedServiceId]
      );
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (preSelectedDesign) {
      setReferenceDesign(preSelectedDesign);
      setDesignNotes((prev) =>
        prev ? `${prev} | Referencia: ${preSelectedDesign.title}` : `Referencia: ${preSelectedDesign.title}`
      );
    }
  }, [preSelectedDesign]);

  if (!isOpen) return null;

  const allAvailableServices: NailService[] = [...BASE_SERVICES, ...ADDON_SERVICES];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) return; // Keep at least one
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const calculateSubtotal = () => {
    return selectedServices.reduce((total, id) => {
      const s = allAvailableServices.find((item) => item.id === id);
      return total + (s ? s.price : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deposit = STUDIO_INFO.depositAmount; // $5.000
  const remainingAtStudio = Math.max(0, subtotal - deposit);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(price);
  };


  const handleSimulatePayment = () => {
    setPaymentState('processing');
    const randomCode = 'NBJ-' + Math.floor(10000 + Math.random() * 90000);
    setBookingCode(randomCode);

    // If Jo configured a real Mercado Pago link (Checkout Pro / Link de Pago), open it in a new window
    if (customMpLink) {
      try {
        window.open(customMpLink, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error('Error opening Mercado Pago link', err);
      }
    }

    setTimeout(() => {
      setPaymentState('success');
    }, 1200);
  };

  const selectedDayObj = upcomingDays.find((d) => d.dateKey === selectedDayKey) || upcomingDays[0];
  const activeAppointmentText = calendarAppointment.trim()
    ? calendarAppointment
    : (selectedDayObj ? `${selectedDayObj.fullFormatted} a las ${selectedSlotTime}` : 'Por definir');

  const getFullBookingText = () => {
    const selectedServiceNames = selectedServices
      .map((id) => allAvailableServices.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const slotNote = activeAppointmentText;

    return `Hola Jo! Acabo de reservar mi cita en tu web nailssssbyjo_:\n\n` +
      `*Reserva:* #${bookingCode}\n` +
      `*Clienta:* ${clientName || 'Clienta'}\n` +
      `*Teléfono:* +56 ${clientPhone || 'No especificado'}\n` +
      (clientInstagram ? `*Instagram:* ${clientInstagram}\n` : '') +
      `*Servicios:* ${selectedServiceNames}\n` +
      `*Fecha y Hora Elegida:* ${slotNote}\n` +
      `*Abono:* $5.000 CLP (Pagado vía Mercado Pago)\n` +
      `*Saldo a pagar en estudio:* ${formatPrice(remainingAtStudio)}\n` +
      (designNotes ? `*Detalle de diseño:* ${designNotes}\n` : '') +
      `\nQuedo atenta para que me confirmes la hora y me envíes la dirección en San Bernardo. ¡Muchas gracias! 💕`;
  };

  const handleSendWhatsAppConfirmation = () => {
    const message = getFullBookingText();
    const cleanPhone = joPhone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCopySummary = () => {
    const text = getFullBookingText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-pink-950/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden my-auto animate-scaleUp">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎀</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Agendar Cita en nailssssbyjo_
              </h2>
              <p className="text-xs text-pink-100">
                Home Studio en San Bernardo · Abono de $5.000
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-pink-50/80 px-6 py-3 border-b border-pink-100 flex items-center justify-between text-xs font-semibold text-pink-900">
          <div className="flex items-center gap-1.5 sm:gap-4 overflow-x-auto no-scrollbar w-full justify-between">
            <span className={`flex items-center gap-1 ${currentStep === 1 ? 'text-pink-600 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 1 ? 'bg-pink-500 text-white' : 'bg-stone-200 text-stone-600'}`}>1</span>
              <span>Servicio</span>
            </span>
            <span className="text-pink-200">›</span>

            <span className={`flex items-center gap-1 ${currentStep === 2 ? 'text-pink-600 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 2 ? 'bg-pink-500 text-white' : 'bg-stone-200 text-stone-600'}`}>2</span>
              <span>Fecha & Hora</span>
            </span>
            <span className="text-pink-200">›</span>

            <span className={`flex items-center gap-1 ${currentStep === 3 ? 'text-pink-600 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-pink-500 text-white' : 'bg-stone-200 text-stone-600'}`}>3</span>
              <span>Tus Datos</span>
            </span>
            <span className="text-pink-200">›</span>

            <span className={`flex items-center gap-1 ${currentStep === 4 ? 'text-pink-600 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 4 ? 'bg-pink-500 text-white' : 'bg-stone-200 text-stone-600'}`}>4</span>
              <span>Abono $5.000</span>
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          
          {/* ==================== PASO 1: SERVICIOS ==================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Paso 1: Selecciona tu servicio
                </h3>
                <p className="text-xs text-stone-600">
                  Marca el servicio principal que deseas realizarte (puedes agregar retiros o nail art adicional).
                </p>
              </div>

              {/* Base services checkboxes */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-pink-800 uppercase tracking-wider">
                  Servicios Base & Retiros
                </p>
                {BASE_SERVICES.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      className={`flex items-start justify-between gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-pink-50/90 border-pink-400 shadow-xs'
                          : 'bg-white border-pink-100 hover:border-pink-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleService(service.id)}
                          className="mt-1 w-4 h-4 text-pink-600 rounded-md border-pink-300 focus:ring-pink-500 cursor-pointer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-stone-900">{service.name}</span>
                            {service.isPopular && (
                              <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">
                                Más pedido ✨
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5">{service.description}</p>
                          <span className="inline-block text-[11px] text-pink-700 mt-1 font-medium">
                            ⏱ {service.duration}
                          </span>
                        </div>
                      </div>

                      <span className="text-sm font-display font-bold text-pink-800 shrink-0">
                        {formatPrice(service.price)}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Addons checkboxes */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-pink-800 uppercase tracking-wider">
                  ¿Deseas agregar Nail Art o Efectos? (Opcional)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADDON_SERVICES.map((addon) => {
                    const isChecked = selectedServices.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-pink-50 border-pink-400 font-semibold text-pink-950'
                            : 'bg-white border-pink-100 hover:border-pink-200 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleService(addon.id)}
                            className="w-3.5 h-3.5 text-pink-600 rounded border-pink-300"
                          />
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-bold text-pink-700 shrink-0">
                          +{formatPrice(addon.price)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Calculation Summary Card */}
              <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal estimado servicios:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-pink-700 font-bold">
                  <span>Abono para reservar hora hoy:</span>
                  <span>{formatPrice(deposit)}</span>
                </div>
                <div className="pt-2 border-t border-pink-200/80 flex justify-between text-stone-900 font-bold text-sm">
                  <span>Saldo a pagar el día de tu cita:</span>
                  <span className="text-pink-800 font-display text-base">
                    {formatPrice(remainingAtStudio)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PASO 2: FECHA Y HORA EN EL ESTUDIO ==================== */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center sm:text-left">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-pink-100 text-pink-700 border border-pink-200 mb-1">
                  🎀 Reserva In-App sin salir de la página
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  Paso 2: Elige tu Día y Horario
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Selecciona directamente aquí tu fecha y bloque de horario disponible. Sin abrir otras apps ni cambiar de pestaña:
                </p>
              </div>

              {/* 1. Selector de Días Disponibles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-pink-600" />
                    <span>1. Selecciona el Día (Lunes a Sábado):</span>
                  </label>
                  <span className="text-[10px] text-pink-600 font-semibold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                    Domingos cerrado
                  </span>
                </div>

                {/* Day selector grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-1 max-h-56 overflow-y-auto p-1">
                  {upcomingDays.map((day) => {
                    const isSelected = selectedDayKey === day.dateKey;
                    return (
                      <button
                        key={day.dateKey}
                        type="button"
                        onClick={() => {
                          setSelectedDayKey(day.dateKey);
                          setCalendarAppointment('');
                        }}
                        className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer text-center relative border ${
                          isSelected
                            ? 'bg-gradient-to-b from-pink-500 to-rose-500 text-white border-pink-600 shadow-md shadow-pink-300/50 scale-[1.02]'
                            : 'bg-white hover:bg-pink-50/60 border-pink-200/80 text-stone-700 hover:border-pink-300 shadow-2xs'
                        }`}
                      >
                        <span className={`text-[11px] uppercase font-bold tracking-wider ${isSelected ? 'text-pink-100' : 'text-pink-600'}`}>
                          {day.dayName}
                        </span>
                        <span className="text-lg font-display font-extrabold my-0.5">
                          {day.dayNumber}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'text-pink-100' : 'text-stone-500'}`}>
                          {day.monthName}
                        </span>
                        {isSelected && (
                          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-pink-600 rounded-full flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Selector de Horas Disponibles */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-pink-600" />
                  <span>2. Elige el Bloque de Horario:</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlotTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlotTime(slot);
                          setCalendarAppointment('');
                        }}
                        className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-pink-500 text-white border-pink-600 shadow-md shadow-pink-300/40'
                            : 'bg-white hover:bg-pink-50 text-stone-700 border-pink-200/80 hover:border-pink-300 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-pink-500'}`} />
                          <span>{slot}</span>
                        </div>
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <span className="text-[10px] text-pink-600 font-normal">Libre</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Resumen Coquette de la Cita Elegida */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200 text-stone-800 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-pink-800">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span>Tu cita seleccionada:</span>
                  </span>
                  <span className="text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-pink-200 text-pink-700 font-semibold">
                    Confirmación directa
                  </span>
                </div>
                <p className="text-base font-display font-bold text-pink-950">
                  🗓️ {activeAppointmentText}
                </p>
                <p className="text-[11px] text-stone-600">
                  Esta hora se registrará automáticamente en tu comprobante y se enviará al WhatsApp de Jo para confirmártela en San Bernardo.
                </p>
              </div>

              {/* Botón opcional discreto para ver Google Calendar */}
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 pt-1 px-1 gap-1">
                <span className="text-[11px]">¿Quieres ver la agenda de Jo en Google Calendar?</span>
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-pink-700 hover:text-pink-800 hover:underline text-[11px]"
                >
                  <CalendarIcon className="w-3 h-3" />
                  <span>Ver Google Calendar oficial ↗</span>
                </a>
              </div>

              {/* Continuar a Paso 3 */}
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-300/40 hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Confirmar Día y Hora ➔ Continuar a Mis Datos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ==================== PASO 3: TUS DATOS & DISEÑO ==================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Paso 3: Tus datos de contacto
                </h3>
                <p className="text-xs text-stone-600">
                  Te enviaremos la confirmación oficial y la ubicación exacta de San Bernardo por WhatsApp.
                </p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-pink-600" />
                    <span>Nombre y Apellido *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Florencia Muñoz"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-pink-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-pink-400 bg-white"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-pink-600" />
                    <span>Teléfono / WhatsApp *</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="p-3 rounded-xl bg-pink-100/60 border border-pink-200 text-xs font-bold text-pink-800 flex items-center">
                      🇨🇱 +56
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9 1234 5678"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-pink-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-pink-400 bg-white"
                    />
                  </div>
                </div>

                {/* Instagram handle */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>Usuario de Instagram (Opcional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="@tu_usuario"
                    value={clientInstagram}
                    onChange={(e) => setClientInstagram(e.target.value)}
                    className="w-full p-3 rounded-xl border border-pink-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-pink-400 bg-white"
                  />
                </div>

                {/* Reference Design from Gallery or Notes */}
                {referenceDesign && (
                  <div className="p-3 bg-pink-50 border border-pink-200 rounded-2xl flex items-center gap-3">
                    <img
                      src={referenceDesign.imageSrc}
                      alt={referenceDesign.title}
                      className="w-12 h-12 object-cover rounded-xl"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-pink-900 block">Diseño seleccionado:</span>
                      <span className="text-stone-700">{referenceDesign.title}</span>
                    </div>
                  </div>
                )}

                {/* Design notes */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                    <span>Detalle del diseño o largo deseado (Opcional):</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej: Quiero forma almendra con mini moñitos rosados y francesa con glitter..."
                    value={designNotes}
                    onChange={(e) => setDesignNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-pink-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-pink-400 bg-white resize-none"
                  />
                  <p className="text-[11px] text-stone-600">
                    * También podrás enviar fotos de referencia directamente a Jo por WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PASO 4: PAGO DE ABONO MERCADO PAGO ==================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {paymentState === 'checkout' && (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      Paso 4: Confirmación y Abono de Reserva
                    </h3>
                    <p className="text-xs text-stone-600">
                      Asegura tu bloque horario mediante el pago seguro del abono de $5.000.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 bg-pink-50/70 border border-pink-200 rounded-2xl space-y-2.5 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-pink-200/80">
                      <span className="font-bold text-stone-900">Resumen de tu cita:</span>
                      <span className="text-pink-700 font-bold">San Bernardo, Chile</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-stone-700">
                      <div>
                        <span className="text-stone-500 block">Clienta:</span>
                        <span className="font-semibold">{clientName || 'Por confirmar'}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">WhatsApp:</span>
                        <span className="font-semibold">+56 {clientPhone || 'Por confirmar'}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-stone-500 block">Fecha y Hora Seleccionada:</span>
                        <span className="font-bold text-pink-900">
                          {activeAppointmentText}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-pink-200/80 flex items-center justify-between">
                      <span className="text-stone-900 font-bold">Monto del Abono hoy:</span>
                      <span className="text-xl font-display font-bold text-pink-700">
                        {formatPrice(deposit)}
                      </span>
                    </div>
                  </div>

                  {/* Mercado Pago Payment Method Selector */}
                  <div className="border border-sky-200 bg-sky-50/50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#009EE3] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          MP
                        </div>
                        <div>
                          <p className="text-xs font-bold text-sky-950">
                            Pasarela Segura Mercado Pago
                          </p>
                          <p className="text-[11px] text-sky-700">
                            Pago instantáneo con Redcompra, Débito o Cuenta RUT
                          </p>
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-sky-600" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('tarjeta')}
                        className={`p-2 rounded-xl text-[11px] font-semibold border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'tarjeta'
                            ? 'bg-white border-sky-500 text-sky-900 shadow-xs'
                            : 'bg-white/60 border-sky-200 text-stone-600 hover:bg-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-sky-600" />
                        <span>Débito / Webpay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('cuentarut')}
                        className={`p-2 rounded-xl text-[11px] font-semibold border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'cuentarut'
                            ? 'bg-white border-sky-500 text-sky-900 shadow-xs'
                            : 'bg-white/60 border-sky-200 text-stone-600 hover:bg-white'
                        }`}
                      >
                        <span className="font-bold text-xs text-orange-600">RUT</span>
                        <span>Cuenta RUT</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('mercadopago')}
                        className={`p-2 rounded-xl text-[11px] font-semibold border flex flex-col items-center justify-center text-center gap-1 cursor-pointer transition-all ${
                          selectedPaymentMethod === 'mercadopago'
                            ? 'bg-white border-sky-500 text-sky-900 shadow-xs'
                            : 'bg-white/60 border-sky-200 text-stone-600 hover:bg-white'
                        }`}
                      >
                        <span className="font-bold text-xs text-sky-600">MP</span>
                        <span>Saldo MP</span>
                      </button>
                    </div>
                  </div>

                  {/* Primary CTA: Pagar Abono ($5.000 con Mercado Pago) */}
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-base text-white bg-[#009EE3] hover:bg-[#0089C7] shadow-lg shadow-sky-300/40 active:scale-98 transition-all cursor-pointer animate-shimmer"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Pagar Abono ($5.000 con Mercado Pago)</span>
                  </button>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                    <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                      <span>🧪 Modo de Prueba Activo (Gratis)</span>
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      <strong>No se descuenta dinero real</strong>: puedes presionar el botón tranquilamente para probar todo el flujo, la confirmación y el WhatsApp.
                    </p>
                  </div>
                </>
              )}

              {/* Processing state */}
              {paymentState === 'processing' && (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-block w-16 h-16 border-4 border-sky-200 border-t-[#009EE3] rounded-full animate-spin" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-stone-900">
                      Conectando con Mercado Pago...
                    </h4>
                    <p className="text-xs text-stone-600">
                      Validando abono de $5.000 y reservando tu bloque en nailssssbyjo_
                    </p>
                  </div>
                </div>
              )}

              {/* Success state */}
              {paymentState === 'success' && (
                <div className="py-2 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-9 h-9 stroke-[3]" />
                  </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        ¡Abono de $5.000 Registrado! 🎀
                      </span>
                      <h3 className="text-2xl font-display font-bold text-stone-900 pt-2">
                        Paso Final: Enviar a Jo por WhatsApp
                      </h3>
                      <p className="text-xs text-stone-600 max-w-md mx-auto">
                        Envía todos los datos de tu reserva a Jo por WhatsApp. Ella revisará tu mensaje y te responderá de vuelta con: <strong>"¡Hora Confirmada!"</strong> y la dirección exacta en San Bernardo.
                      </p>
                    </div>

                    {/* Ticket card */}
                    <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-200 text-left text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Reserva:</span>
                        <span className="font-bold text-pink-900">#{bookingCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Clienta:</span>
                        <span className="font-bold text-stone-900">{clientName || 'Clienta'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Cita:</span>
                        <span className="font-bold text-pink-900">
                          {activeAppointmentText}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Abono:</span>
                        <span className="font-bold text-emerald-700">$5.000 CLP (Vía Mercado Pago)</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-pink-200">
                        <span className="text-stone-800 font-bold">Saldo a pagar en estudio:</span>
                        <span className="font-bold text-pink-700 font-display text-sm">
                          {formatPrice(remainingAtStudio)}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2.5 pt-1">
                      <button
                        onClick={handleSendWhatsAppConfirmation}
                        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-200 active:scale-98 transition-all cursor-pointer animate-shimmer"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Enviar toda la información a Jo por WhatsApp 💬</span>
                      </button>

                      {/* Google Calendar Link Button */}
                      <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-stone-800 bg-white border border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-colors shadow-2xs"
                      >
                        <CalendarIcon className="w-4 h-4 text-pink-600" />
                        <span>📅 Ver / Revisar cita en Google Calendar</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-stone-700 hover:bg-pink-50 border border-pink-200 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-pink-600" />
                        <span>{copied ? '¡Copiado al portapapeles! ✓' : 'Copiar texto para WhatsApp'}</span>
                      </button>

                      <button
                        onClick={onClose}
                        className="w-full py-2 rounded-xl text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors"
                      >
                        Cerrar y volver a la web
                      </button>
                    </div>
                  </div>
                )}
            </div>
          )}

        </div>

        {/* Security & Studio Guarantee Footer Notice */}
        <div className="bg-pink-50/50 px-6 py-2.5 border-t border-pink-100 flex items-center justify-between text-[11px] text-pink-700">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
            <span>nailssssbyjo_ · San Bernardo, Chile</span>
          </div>
          <span className="font-semibold text-stone-700">Abono oficial seguro $5.000</span>
        </div>

        {/* Modal Footer Controls (When not in success or processing) */}
        {paymentState === 'checkout' && (
          <div className="bg-stone-50/80 px-6 py-4 border-t border-pink-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-pink-100/50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Atrás</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 3 && (!clientName.trim() || !clientPhone.trim())) {
                    alert('Por favor ingresa tu Nombre y Teléfono / WhatsApp para continuar 🎀');
                    return;
                  }
                  setCurrentStep(currentStep + 1);
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md shadow-pink-300/40 transition-all cursor-pointer"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
};
