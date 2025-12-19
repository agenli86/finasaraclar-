import { Metadata } from 'next';
import { DovizAltinClient } from './DovizAltinClient';

export const metadata: Metadata = {
  title: 'Döviz & Altın Kurları',
  description: 'Anlık döviz kurları ve altın fiyatları. USD, EUR, GBP, CHF ve tüm altın çeşitlerinin güncel fiyatlarını takip edin.',
  keywords: ['döviz kuru', 'altın fiyatı', 'dolar kuru', 'euro kuru', 'gram altın', 'çeyrek altın'],
  openGraph: {
    title: 'Döviz & Altın Kurları | HızırMatik',
    description: 'Anlık döviz kurları ve altın fiyatları. Güncel piyasa verilerini takip edin.',
    url: 'https://hizirmatik.com.tr/doviz-altin',
    images: ['/og-doviz.jpg'],
  },
};

export default function DovizAltinPage() {
  return <DovizAltinClient />;
}
