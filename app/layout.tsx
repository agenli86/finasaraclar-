import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LayoutClient } from './LayoutClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://hizirmatik.com.tr'),
  title: {
    default: 'HızırMatik - Akıllı Finans ve Yaşam Araçları',
    template: '%s | HızırMatik',
  },
  description: 'Döviz kurları, altın fiyatları, AI destekli yemek tarifleri, metin araçları ve finansal hesaplayıcılar. Tüm ihtiyaçlarınız için akıllı online araçlar.',
  keywords: [
    'döviz kuru',
    'altın fiyatı',
    'güncel döviz',
    'kredi hesaplama',
    'mevduat faiz hesaplama',
    'karakter sayacı',
    'kelime sayacı',
    'ai mutfak',
    'yapay zeka tarif',
    'finans araçları',
    'online hesaplama',
    'türk lirası döviz',
  ],
  authors: [{ name: 'HızırMatik', url: 'https://hizirmatik.com.tr' }],
  creator: 'HızırMatik',
  publisher: 'HızırMatik',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hizirmatik.com.tr',
    siteName: 'HızırMatik',
    title: 'HızırMatik - Akıllı Finans ve Yaşam Araçları',
    description: 'Döviz kurları, altın fiyatları, AI destekli yemek tarifleri, metin araçları ve finansal hesaplayıcılar.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HızırMatik - Akıllı Finans ve Yaşam Araçları',
    description: 'Döviz kurları, altın fiyatları, AI destekli yemek tarifleri ve daha fazlası.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'HızırMatik',
              description: 'Akıllı Finans ve Yaşam Araçları',
              url: 'https://hizirmatik.com.tr',
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
