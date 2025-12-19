'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  customItems?: { label: string; href: string }[];
}

const pathLabels: Record<string, string> = {
  '': 'Ana Sayfa',
  'doviz-altin': 'Döviz & Altın',
  'ai-mutfak': 'AI Mutfak',
  'metin-doktoru': 'Metin Doktoru',
  'finans': 'Finans',
  'kredi-hesaplama': 'Kredi Hesaplama',
  'mevduat-hesaplama': 'Mevduat Hesaplama',
  'blog': 'Blog',
  'gizlilik-politikasi': 'Gizlilik Politikası',
  'hakkimizda': 'Hakkımızda',
  'iletisim': 'İletişim',
};

export function Breadcrumb({ customItems }: BreadcrumbProps) {
  const pathname = usePathname();
  
  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Ana Sayfa', href: '/' }];

    let currentPath = '';
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: pathLabels[segment] || segment,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li
              key={item.href}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="breadcrumb-item flex items-center gap-1"
                  itemProp="item"
                >
                  <Home className="w-4 h-4" />
                  <span itemProp="name" className="sr-only sm:not-sr-only">
                    {item.label}
                  </span>
                </Link>
              ) : isLast ? (
                <span className="breadcrumb-current" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="breadcrumb-item"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              
              <meta itemProp="position" content={String(index + 1)} />
              
              {!isLast && (
                <ChevronRight className="w-4 h-4 mx-2 breadcrumb-separator" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
