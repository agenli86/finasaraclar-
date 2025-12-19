import { Metadata } from 'next';
import { KrediHesaplamaClient } from './KrediHesaplamaClient';

export const metadata: Metadata = {
  title: 'Kredi Hesaplama - Taksit ve Faiz Hesaplayıcı',
  description: 'Kredi taksit tutarı, toplam ödeme ve faiz miktarını hesaplayın. İhtiyaç kredisi, konut kredisi ve taşıt kredisi hesaplama aracı.',
  keywords: ['kredi hesaplama', 'taksit hesaplama', 'faiz hesaplama', 'ihtiyaç kredisi', 'konut kredisi'],
  openGraph: {
    title: 'Kredi Hesaplama - Taksit ve Faiz Hesaplayıcı | HızırMatik',
    description: 'Kredi taksit tutarı, toplam ödeme ve faiz miktarını hesaplayın.',
    url: 'https://hizirmatik.com.tr/finans/kredi-hesaplama',
    images: ['/og-kredi.jpg'],
  },
};

export default function KrediHesaplamaPage() {
  return <KrediHesaplamaClient />;
}
