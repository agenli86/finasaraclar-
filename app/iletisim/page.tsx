import type { Metadata } from 'next';
import IletisimClient from './IletisimClient';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'HızırMatik ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bize ulaşın.',
  openGraph: {
    title: 'İletişim | HızırMatik',
    description: 'HızırMatik ekibiyle iletişime geçin. Sorularınız için buradayız.',
    url: 'https://hizirmatik.com.tr/iletisim',
    type: 'website',
  },
};

export default function IletisimPage() {
  return <IletisimClient />;
}
