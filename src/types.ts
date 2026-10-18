export interface NailService {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: 'base' | 'retiro' | 'adicional';
  isPopular?: boolean;
}

export interface PolicyCard {
  id: string;
  iconType: 'heart' | 'alert' | 'message';
  title: string;
  description: string;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'soft-gel' | 'glitter' | 'cristales' | 'french' | 'coquette';
  categoryLabel: string;
  image: string;
  description: string;
  tag: string;
}

export interface BookingData {
  selectedServiceIds: string[];
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientInstagram: string;
  designNotes: string;
  referenceImageTitle?: string;
  referenceImageSrc?: string;
}
