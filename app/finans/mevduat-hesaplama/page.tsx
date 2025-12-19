import type { Metadata } from 'next';
import MevduatClient from './MevduatClient';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Mevduat Faiz Hesaplama',
  description: 'Vadeli mevduat faiz hesaplama aracı. Anaparanızı, faiz oranını ve vadeyi girerek getirinizi hesaplayın. TL ve döviz mevduat hesaplama.',
  keywords: ['mevduat hesaplama', 'faiz hesaplama', 'vadeli mevduat', 'mevduat getirisi', 'banka faizi', 'TL mevduat', 'döviz mevduat'],
  openGraph: {
    title: 'Mevduat Faiz Hesaplama | HızırMatik',
    description: 'Vadeli mevduat faiz hesaplama aracı ile getirinizi kolayca hesaplayın.',
    url: 'https://hizirmatik.com.tr/finans/mevduat-hesaplama',
    type: 'website',
  },
};

const breadcrumbItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Finans', href: '/finans' },
  { label: 'Mevduat Hesaplama', href: '/finans/mevduat-hesaplama' },
];

export default function MevduatHesaplamaPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb customItems={breadcrumbItems} />
      <MevduatClient />
    </div>
  );
}
