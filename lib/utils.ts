import { clsx, type ClassValue } from 'clsx';
import { TextStats, KrediHesaplama, MevduatHesaplama } from '@/types';

// Sınıf birleştirme utility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Para formatlama
export function formatCurrency(amount: number, currency: string = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Sayı formatlama
export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// Tarih formatlama
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

// Zaman formatlama
export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
}

// Slug oluşturma
export function slugify(text: string): string {
  const turkishChars: Record<string, string> = {
    ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u',
    Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u',
  };
  
  return text
    .toLowerCase()
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => turkishChars[char] || char)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Metin istatistikleri hesaplama
export function calculateTextStats(text: string): TextStats {
  const trimmedText = text.trim();
  
  if (!trimmedText) {
    return {
      characters: 0,
      charactersNoSpace: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
      speakingTime: 0,
    };
  }

  const characters = trimmedText.length;
  const charactersNoSpace = trimmedText.replace(/\s/g, '').length;
  const words = trimmedText.split(/\s+/).filter(Boolean).length;
  const sentences = trimmedText.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = trimmedText.split(/\n\n+/).filter(Boolean).length;
  
  // Ortalama okuma hızı: 200 kelime/dakika
  const readingTime = Math.ceil(words / 200);
  // Ortalama konuşma hızı: 150 kelime/dakika
  const speakingTime = Math.ceil(words / 150);

  return {
    characters,
    charactersNoSpace,
    words,
    sentences,
    paragraphs,
    readingTime,
    speakingTime,
  };
}

// Kredi hesaplama
export function calculateKredi(
  anapara: number,
  yillikFaizOrani: number,
  vadeAy: number
): KrediHesaplama {
  const aylikFaiz = yillikFaizOrani / 100 / 12;
  
  // Aylık taksit formülü: P * r * (1+r)^n / ((1+r)^n - 1)
  const aylikTaksit =
    (anapara * aylikFaiz * Math.pow(1 + aylikFaiz, vadeAy)) /
    (Math.pow(1 + aylikFaiz, vadeAy) - 1);
  
  const toplamOdeme = aylikTaksit * vadeAy;
  const toplamFaiz = toplamOdeme - anapara;

  return {
    anapara,
    faizOrani: yillikFaizOrani,
    vade: vadeAy,
    aylikTaksit,
    toplamOdeme,
    toplamFaiz,
  };
}

// Mevduat hesaplama
export function calculateMevduat(
  anapara: number,
  yillikFaizOrani: number,
  vadeGun: number,
  stopajOrani: number = 15
): MevduatHesaplama {
  // Brüt getiri hesaplama
  const brutGetiri = (anapara * yillikFaizOrani * vadeGun) / (100 * 365);
  
  // Stopaj kesintisi
  const stopaj = (brutGetiri * stopajOrani) / 100;
  
  // Net getiri
  const netGetiri = brutGetiri - stopaj;
  
  // Vade sonu toplam
  const vadeSonuToplam = anapara + netGetiri;

  return {
    anapara,
    faizOrani: yillikFaizOrani,
    vade: vadeGun,
    brutGetiri,
    stopaj,
    netGetiri,
    vadeSonuToplam,
  };
}

// Okuma süresi hesaplama
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Excerpt oluşturma
export function createExcerpt(content: string, maxLength: number = 160): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

// Değişim yüzdesine göre renk
export function getChangeColor(change: number): string {
  if (change > 0) return 'text-emerald-500';
  if (change < 0) return 'text-red-500';
  return 'text-gray-500';
}

// Değişim yüzdesine göre arka plan
export function getChangeBg(change: number): string {
  if (change > 0) return 'bg-emerald-500/10';
  if (change < 0) return 'bg-red-500/10';
  return 'bg-gray-500/10';
}
