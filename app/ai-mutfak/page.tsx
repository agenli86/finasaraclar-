import { Metadata } from 'next';
import { AIMutfakClient } from './AIMutfakClient';

export const metadata: Metadata = {
  title: 'AI Mutfak - Yapay Zeka Tarif Önerileri',
  description: 'Elinizdeki malzemelerle yapay zeka destekli tarif önerileri alın. Gemini AI ile kişiselleştirilmiş yemek tarifleri.',
  keywords: ['ai tarif', 'yapay zeka yemek', 'tarif önerisi', 'malzeme ile tarif', 'akıllı mutfak'],
  openGraph: {
    title: 'AI Mutfak - Yapay Zeka Tarif Önerileri | HızırMatik',
    description: 'Elinizdeki malzemelerle yapay zeka destekli tarif önerileri alın.',
    url: 'https://hizirmatik.com.tr/ai-mutfak',
    images: ['/og-mutfak.jpg'],
  },
};

export default function AIMutfakPage() {
  return <AIMutfakClient />;
}
