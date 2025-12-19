'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  ChefHat,
  FileText,
  Calculator,
  PiggyBank,
  ChevronDown,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  { href: '/doviz-altin', label: 'Döviz & Altın', icon: TrendingUp },
 
  { href: '/metin-doktoru', label: 'Metin Doktoru', icon: FileText },
];

const financeItems = [
  { href: '/finans/kredi-hesaplama', label: 'Kredi Hesaplama', icon: Calculator },
  { href: '/finans/mevduat-hesaplama', label: 'Mevduat Hesaplama', icon: PiggyBank },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [financeOpen, setFinanceOpen] = useState(true);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 
          transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:top-[73px] lg:h-[calc(100vh-73px)]
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200">
          <span className="font-semibold text-slate-800">Araçlar</span>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Araçlar
          </p>

          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          {/* Finans Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setFinanceOpen(!financeOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5" />
                <span className="font-medium">Finans</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${financeOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {financeOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {financeItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
