'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const mainMenuItems = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
];

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      };
      setCurrentTime(now.toLocaleDateString('tr-TR', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* Top Bar */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-slate-800">HızırMatik</h1>
            <p className="text-xs text-slate-500">Akıllı Araçlar</p>
          </div>
        </Link>

        {/* Main Menu - Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Date/Time - Desktop */}
          <div className="hidden md:block text-right mr-2">
            <p className="text-xs text-slate-400">Türkiye</p>
            <p className="text-sm font-medium text-slate-700">{currentTime}</p>
          </div>

          {/* User Avatar */}
          <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-semibold hover:bg-blue-700 transition-colors">
            H
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl ml-2"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
