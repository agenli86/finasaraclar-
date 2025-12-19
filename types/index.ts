// Döviz ve Altın Tipleri
export interface CurrencyRate {
  code: string;
  name: string;
  buying: number;
  selling: number;
  change: number;
  changePercent: number;
  time: string;
}

export interface GoldRate {
  name: string;
  buying: number;
  selling: number;
  change: number;
  changePercent: number;
  time: string;
}

// Gemini API Tipleri
export interface GeminiRequest {
  prompt: string;
  maxTokens?: number;
}

export interface GeminiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

// Blog Tipleri
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  readTime: number;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

// Finans Hesaplama Tipleri
export interface KrediHesaplama {
  anapara: number;
  faizOrani: number;
  vade: number;
  aylikTaksit: number;
  toplamOdeme: number;
  toplamFaiz: number;
}

export interface MevduatHesaplama {
  anapara: number;
  faizOrani: number;
  vade: number;
  brutGetiri: number;
  stopaj: number;
  netGetiri: number;
  vadeSonuToplam: number;
}

// Navigation Tipleri
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  description?: string;
  children?: NavItem[];
}

// Breadcrumb Tipleri
export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

// Metin Doktoru Tipleri
export interface TextStats {
  characters: number;
  charactersNoSpace: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}
