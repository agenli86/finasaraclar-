import { Metadata } from 'next';
import { MetinDoktoruClient } from './MetinDoktoruClient';

export const metadata: Metadata = {
  title: 'Metin Doktoru - Karakter ve Kelime Sayacı',
  description: 'Karakter sayacı, kelime sayacı, cümle analizi ve metin formatlama araçları. İçerik üreticileri için profesyonel metin analiz aracı.',
  keywords: ['karakter sayacı', 'kelime sayacı', 'metin analizi', 'cümle sayacı', 'okuma süresi'],
  openGraph: {
    title: 'Metin Doktoru - Karakter ve Kelime Sayacı | HızırMatik',
    description: 'Profesyonel metin analiz ve formatlama araçları.',
    url: 'https://hizirmatik.com.tr/metin-doktoru',
    images: ['/og-metin.jpg'],
  },
};

export default function MetinDoktoruPage() {
  return <MetinDoktoruClient />;
}
