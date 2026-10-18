import { NailService, PolicyCard } from '../types';

import joCrossPink from '../assets/images/jo_design_cross_pink_1792328513395.jpg';
import joFrenchGold from '../assets/images/jo_french_hotpink_gold_1792328529514.jpg';
import joAnimalPrint from '../assets/images/jo_animalprint_flower_1792328546008.jpg';
import joValeeFlowers from '../assets/images/jo_design_valee_flower_1792329294084.jpg';
import joMilkyClean from '../assets/images/jo_design_milky_clean_1792329306356.jpg';
import joHomeStudioImg from '../assets/images/jo_home_studio_setup_1792329276964.jpg';

export { joHomeStudioImg };

export const STUDIO_INFO = {
  name: 'nailssssbyjo_',
  owner: 'Jo',
  tagline: 'Home Studio en San Bernardo, Chile',
  instagram: 'nailssssbyjo_',
  instagramUrl: 'https://instagram.com/nailssssbyjo_',
  whatsapp: '+56982618359',
  address: 'San Bernardo, Santiago de Chile (a pasos de estación y locomoción)',
  depositAmount: 5000,
  googleCalendarUrl: 'https://calendar.app.google/ayUexisAw3hPoHAk7',
};

export interface RealStudioDesign {
  id: string;
  title: string;
  clientHandle?: string;
  category: string;
  image: string;
  description: string;
  styleTags: string[];
  heartCount: number;
}

export const REAL_STUDIO_DESIGNS: RealStudioDesign[] = [
  {
    id: 'real-1',
    title: 'Stiletto Dark Coquette con Cruz Gótica & Cat Eye',
    clientHandle: 'Clienta Real Jo 💕',
    category: 'Goth Coquette & Cat Eye',
    image: joCrossPink,
    description: 'Estructura stiletto combinando negro brillante con base rosa cat eye efecto magnético, coronada con dije de cruz barroca plateada y microesferas.',
    styleTags: ['Stiletto', 'Cat Eye Rosa', 'Cruz Gótica', 'Cristales'],
    heartCount: 148,
  },
  {
    id: 'real-2',
    title: 'Almendra Frenchie con Detalle Hot Pink & Oro',
    clientHandle: '@1720r__ 💖',
    category: 'French Tip & Oro',
    image: joFrenchGold,
    description: 'Uñas almendra en tono nude con francesa blanca milimétrica delineada en oro puro, acento en rosa fucsia vibrante con corona de perlitas doradas y detalle caligráfico.',
    styleTags: ['Almendra', 'Delineado Oro', 'Hot Pink', 'Perlitas'],
    heartCount: 194,
  },
  {
    id: 'real-3',
    title: 'Frenchie Animal Print & Flor Tropical a Mano Alzada',
    clientHandle: 'Clienta Real Jo 🌸',
    category: 'Nail Art a Mano Alzada',
    image: joAnimalPrint,
    description: 'Puntas francesas con patrón mixto animal print leopardo rosa y cebra, más flor tropical hibiscus hiperdetallada pintada a pincel.',
    styleTags: ['Mano Alzada', 'Animal Print', 'Flor Hibiscus', 'Soft Gel'],
    heartCount: 162,
  },
  {
    id: 'real-4',
    title: 'Micro Francesa con Glitter Rosa & Flores Esculpidas 3D',
    clientHandle: '@valee0912 🌸',
    category: 'Glitter & Arte 3D',
    image: joValeeFlowers,
    description: 'Base rosa traslúcida con destellos finos de glitter, micro línea francesa blanca y flores 3D en relieve con centro de caviar dorado en uñas anulares.',
    styleTags: ['Flores 3D', 'Micro Francesa', 'Glitter Rosa', 'Delicado'],
    heartCount: 215,
  },
  {
    id: 'real-5',
    title: 'Esmaltado Permanente Milky Porcelain en Uña Natural',
    clientHandle: 'Clienta Real Jo ✨',
    category: 'Esmaltado Permanente',
    image: joMilkyClean,
    description: 'Uñas cortas cuadradas con esmaltado lechoso impecable porcelana, nivelación de alta duración con rubber base y cutículas profundamente limpias e hidratadas.',
    styleTags: ['Uña Natural', 'Milky Nude', 'Clean Girl', 'Nivelación'],
    heartCount: 178,
  },
];

export const BASE_SERVICES: NailService[] = [
  {
    id: 'esmaltado-permanente',
    name: 'Esmaltado permanente',
    price: 10000,
    duration: '1h 15m',
    description: 'Manicura combinada / rusa, nivelación con base rubber para dar fuerza a la uña natural, esmaltado en color liso e hidratación con aceites esenciales.',
    category: 'base',
    isPopular: false,
  },
  {
    id: 'soft-gel',
    name: 'Soft gel',
    price: 15000,
    duration: '1h 45m',
    description: 'Extensiones de tip de gel completo adheridas con gel constructivo. Apariencia ultra natural, liviana y resistente (hasta 3-4 semanas). Incluye color base liso.',
    category: 'base',
    isPopular: true,
  },
  {
    id: 'retiro-otro-lugar',
    name: 'Retiro de otro lugar',
    price: 6000,
    duration: '35m',
    description: 'Retiro cuidadoso y no invasivo con torno y pulidores profesionales para proteger la lámina ungueal.',
    category: 'retiro',
  },
  {
    id: 'retiro-propio',
    name: 'Retiro de trabajo realizado por mí',
    price: 4000,
    duration: '25m',
    description: 'Tarifa preferencial para clientas habituales. Retiro seguro sin dolor ni adelgazamiento de tu uña natural.',
    category: 'retiro',
  },
];

export const ADDON_SERVICES: NailService[] = [
  {
    id: 'french-tip',
    name: 'Diseño French Tip / Francesa',
    price: 2500,
    duration: '15m',
    description: 'Línea de sonrisa perfecta: clásica blanca, baby pink o con glitter.',
    category: 'adicional',
  },
  {
    id: 'cristales-coquette',
    name: 'Cristales & Dijes Coquette (Lazos/Perlas)',
    price: 3000,
    duration: '20m',
    description: 'Aplicación de cristales Swarovski, perlitas o dijes de lazo sellados con gel blindado.',
    category: 'adicional',
  },
  {
    id: 'efecto-cromo-aurora',
    name: 'Efecto Glazed Donut / Cromo / Aurora',
    price: 2500,
    duration: '15m',
    description: 'Polvo de perla o tornasol para un acabado brillante aperlado de tendencia.',
    category: 'adicional',
  },
  {
    id: 'nail-art-alzada',
    name: 'Nail Art a Mano Alzada (Corazones/Lazos)',
    price: 3500,
    duration: '25m',
    description: 'Trazos finos, corazones miniatura, lazos coquette o flores dibujadas a mano.',
    category: 'adicional',
  },
];

export const POLICIES: PolicyCard[] = [
  {
    id: 'abono',
    iconType: 'heart',
    title: 'Abono de Reserva',
    description: 'Abono inicial de $5.000 que serán descontados del valor final para asegurar tu hora.',
    highlight: '$5.000 para reservar',
  },
  {
    id: 'reembolso',
    iconType: 'alert',
    title: 'Política de Asistencia',
    description: 'No reembolsable en caso de no asistir. Puedes reagendar con al menos 24 hrs de anticipación.',
    highlight: 'No reembolsable',
  },
  {
    id: 'diseno',
    iconType: 'message',
    title: 'Diseño al Agendar',
    description: 'Debes adjuntar o indicar el diseño que deseas al agendar para calcular los tiempos de atención.',
    highlight: 'Adjunta tu referencia',
  },
];

export const TIME_SLOTS = [
  '10:00 AM',
  '12:30 PM',
  '15:00 PM',
  '17:30 PM',
  '19:00 PM',
];

export const FAQS = [
  {
    q: '¿Qué tolerancia hay en caso de atraso?',
    a: 'Manejamos una tolerancia máxima de 10 minutos. Pasado ese tiempo, el servicio podría simplificarse en diseño o suspenderse para no afectar la cita de la siguiente clienta.',
  },
  {
    q: '¿Puedo ir con acompañante?',
    a: 'Por tratarse de un espacio privado de Home Studio y para garantizar tu máxima comodidad y concentración en el servicio, solicitamos asistir sin acompañantes ni niños.',
  },
  {
    q: '¿Cuánto dura la sesión?',
    a: 'Esmaltado permanente toma aproximadamente 1 hora y 15 minutos, mientras que Soft Gel y diseños con cristales o nail art toman entre 1 hora y media a 2 horas.',
  },
  {
    q: '¿Qué medios de pago se reciben para el saldo?',
    a: 'El abono de $5.000 se realiza por Mercado Pago o transferencia bancaria al agendar. El saldo restante se cancela presencialmente al terminar mediante transferencia, débito o efectivo.',
  },
];

