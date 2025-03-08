/**
 * Oyun Konfigürasyonu
 * 
 * Bu dosya, oyunun temel parametrelerini içerir.
 * Oyun mekanizmalarını değiştirmek için bu dosyayı düzenleyin.
 */

import { GiWheat, GiCorn, GiCarrot, GiGrapes, GiCabbage } from 'react-icons/gi';
import { IconType } from 'react-icons';

// Yem türleri
export interface Feed {
  name: string;
  price: number;
  yield: number; // Dakika başına litre
  energy: number; // Açlık artışı yüzdesi
  minLevel: number;
  icon: IconType;
}

export const FEEDS: Feed[] = [
  {
    name: "Çim",
    price: 50,
    yield: 0.0417, // Dakika başına 0.0417 litre (saatte 2.5 litre)
    energy: 25,
    minLevel: 1,
    icon: GiWheat
  },
  {
    name: "Mısır",
    price: 150,
    yield: 0.0833, // Dakika başına 0.0833 litre (saatte 5 litre)
    energy: 25,
    minLevel: 2,
    icon: GiCorn
  },
  {
    name: "Havuç",
    price: 300,
    yield: 0.125, // Dakika başına 0.125 litre (saatte 7.5 litre)
    energy: 25,
    minLevel: 3,
    icon: GiCarrot
  },
  {
    name: "Üzüm",
    price: 500,
    yield: 0.1667, // Dakika başına 0.1667 litre (saatte 10 litre)
    energy: 25,
    minLevel: 4,
    icon: GiGrapes
  },
  {
    name: "Lahana",
    price: 1000,
    yield: 0.25, // Dakika başına 0.25 litre (saatte 15 litre)
    energy: 25,
    minLevel: 5,
    icon: GiCabbage
  }
];

// Süt üretimi parametreleri
export const MILK_PRODUCTION = {
  // Süt satış fiyatı (1 litre süt = 100 puan)
  PRICE_PER_LITER: 100,
  
  // Etkinlik çarpanı (varsayılan: 1)
  EVENT_MULTIPLIER: 1,
  
  // Süt üretimi için minimum açlık değeri
  MIN_HUNGER: 0,
  
  // Süt üretimi için minimum sağlık değeri
  MIN_HEALTH: 0
};

// Açlık parametreleri
export const HUNGER = {
  // Başlangıç açlık değeri
  INITIAL: 0,
  
  // Maksimum açlık değeri
  MAX: 100,
  
  // Açlık azalma hızı (saniye başına)
  // 100 / (240 * 60) = 100 / 14400 = 0.00694 (240 dakikada 100'den 0'a)
  DECREASE_RATE: 0.00694,
  
  // Besleme başına açlık artışı
  FEED_INCREASE: 25
};

// Sağlık parametreleri
export const HEALTH = {
  // Başlangıç sağlık değeri
  INITIAL: 100,
  
  // Maksimum sağlık değeri
  MAX: 100,
  
  // Sağlık azalma hızı (saniye başına, açlık 0 olduğunda)
  DECREASE_RATE: 0.1
};

// XP ve seviye parametreleri
export const LEVEL = {
  // Seviye başına gereken XP
  XP_REQUIREMENTS: [
    0,      // Seviye 1
    1000,   // Seviye 2
    3000,   // Seviye 3
    6000,   // Seviye 4
    10000,  // Seviye 5
    15000,  // Seviye 6
    21000,  // Seviye 7
    28000,  // Seviye 8
    36000,  // Seviye 9
    45000   // Seviye 10
  ],
  
  // Süt satışından kazanılan XP (1 litre süt = 100 XP)
  XP_PER_LITER: 100
};

// Etkinlik türleri
export const EVENT_TYPES = {
  DOUBLE_MILK: 'DOUBLE_MILK', // 2x süt üretimi
  DOUBLE_PRICE: 'DOUBLE_PRICE', // 2x süt satış fiyatı
  DOUBLE_XP: 'DOUBLE_XP', // 2x XP kazanımı
  HALF_HUNGER: 'HALF_HUNGER' // 2x yavaş açlık azalması
};

// Etkinlik parametreleri
export const EVENTS = {
  // Etkinlik türleri
  TYPES: EVENT_TYPES,
  
  // Aktif etkinlik (varsayılan: null)
  ACTIVE: null as string | null
};