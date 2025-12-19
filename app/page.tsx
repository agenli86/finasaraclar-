import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'HızırMatik - Döviz & Altın Kurları | Anlık Hesaplama',
  description: 'Güncel döviz kurları, altın fiyatları ve anlık döviz hesaplama. USD, EUR, GBP ve daha fazlası için TCMB kurları.',
  openGraph: {
    title: 'HızırMatik - Döviz & Altın Kurları',
    description: 'Güncel döviz kurları ve anlık hesaplama aracı',
    url: 'https://hizirmatik.com.tr',
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
