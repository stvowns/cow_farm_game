/**
 * Etkinlik Servisi
 * 
 * Bu servis, oyun içi etkinlikleri yönetir.
 * Belirli sürelerde çeşitli çarpanları (süt üretimi, satış fiyatı vb.) değiştirebilir.
 */

import { EVENTS } from '../config/gameConfig';
import { setMilkProductionMultiplier } from './milkProductionService';

// Aktif etkinlik
let activeEvent: string | null = null;

// Etkinlik bitiş zamanı
let eventEndTime: number | null = null;

// Etkinlik kontrol aralığı (ms)
const EVENT_CHECK_INTERVAL = 1000;

// Etkinlik kontrol interval'i
let eventCheckInterval: NodeJS.Timeout | null = null;

/**
 * Etkinlik sistemini başlatır
 */
export const initEventSystem = () => {
  // Etkinlik kontrol interval'ini başlat
  eventCheckInterval = setInterval(() => {
    // Aktif etkinlik varsa ve süresi dolduysa
    if (activeEvent && eventEndTime && Date.now() >= eventEndTime) {
      endEvent();
    }
  }, EVENT_CHECK_INTERVAL);
};

/**
 * Etkinlik sistemini durdurur
 */
export const stopEventSystem = () => {
  if (eventCheckInterval) {
    clearInterval(eventCheckInterval);
    eventCheckInterval = null;
  }
};

/**
 * Yeni bir etkinlik başlatır
 * 
 * @param eventType Etkinlik türü
 * @param durationMinutes Etkinlik süresi (dakika)
 */
export const startEvent = (eventType: string, durationMinutes: number) => {
  // Aktif etkinlik varsa sonlandır
  if (activeEvent) {
    endEvent();
  }

  // Yeni etkinliği başlat
  activeEvent = eventType;
  eventEndTime = Date.now() + durationMinutes * 60 * 1000;

  // Etkinlik türüne göre gerekli ayarlamaları yap
  switch (eventType) {
    case EVENTS.TYPES.DOUBLE_MILK:
      setMilkProductionMultiplier(2);
      break;
    case EVENTS.TYPES.DOUBLE_PRICE:
      // Süt satış fiyatını 2x yap (gameConfig.ts'de MILK_PRODUCTION.EVENT_MULTIPLIER değerini değiştir)
      EVENTS.ACTIVE = EVENTS.TYPES.DOUBLE_PRICE;
      break;
    case EVENTS.TYPES.DOUBLE_XP:
      // XP kazanımını 2x yap (gameConfig.ts'de LEVEL.XP_PER_LITER değerini değiştir)
      EVENTS.ACTIVE = EVENTS.TYPES.DOUBLE_XP;
      break;
    case EVENTS.TYPES.HALF_HUNGER:
      // Açlık azalma hızını yarıya indir (gameConfig.ts'de HUNGER.DECREASE_RATE değerini değiştir)
      EVENTS.ACTIVE = EVENTS.TYPES.HALF_HUNGER;
      break;
  }

  console.log(`${eventType} etkinliği başlatıldı. Süre: ${durationMinutes} dakika`);
  
  // Etkinlik başladı olayını yayınla
  const eventStartEvent = new CustomEvent('eventStarted', { 
    detail: { 
      type: eventType, 
      endTime: eventEndTime 
    } 
  });
  window.dispatchEvent(eventStartEvent);

  return {
    type: eventType,
    endTime: eventEndTime
  };
};

/**
 * Aktif etkinliği sonlandırır
 */
export const endEvent = () => {
  if (!activeEvent) return;

  // Etkinlik türüne göre gerekli ayarlamaları sıfırla
  switch (activeEvent) {
    case EVENTS.TYPES.DOUBLE_MILK:
      setMilkProductionMultiplier(1);
      break;
    case EVENTS.TYPES.DOUBLE_PRICE:
    case EVENTS.TYPES.DOUBLE_XP:
    case EVENTS.TYPES.HALF_HUNGER:
      EVENTS.ACTIVE = null;
      break;
  }

  console.log(`${activeEvent} etkinliği sona erdi.`);

  // Etkinlik bitti olayını yayınla
  const eventEndEvent = new CustomEvent('eventEnded', { 
    detail: { 
      type: activeEvent 
    } 
  });
  window.dispatchEvent(eventEndEvent);

  // Aktif etkinliği sıfırla
  activeEvent = null;
  eventEndTime = null;
};

/**
 * Aktif etkinlik bilgisini döndürür
 */
export const getActiveEvent = () => {
  if (!activeEvent || !eventEndTime) return null;

  return {
    type: activeEvent,
    endTime: eventEndTime,
    remainingTime: Math.max(0, eventEndTime - Date.now())
  };
};