'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  RefreshCw,
  ArrowRightLeft,
  Coins,
  Clock,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ChefHat,
  FileText,
  Calculator,
} from 'lucide-react';

interface CurrencyData {
  code: string;
  name: string;
  buying: number;
  selling: number;
}

interface ExchangeData {
  success: boolean;
  data: Record<string, CurrencyData>;
  updated: string;
}

const currencyFlags: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  CHF: '🇨🇭',
  SAR: '🇸🇦',
  AUD: '🇦🇺',
  CAD: '🇨🇦',
  TRY: '🇹🇷',
};

// Altın fiyatları (güncel - Aralık 2025)
const goldPrices = [
  { name: 'Gram Altın', buying: 5920, selling: 5945 },
  { name: 'Çeyrek Altın', buying: 9680, selling: 9750 },
  { name: 'Yarım Altın', buying: 19350, selling: 19500 },
  { name: 'Tam Altın', buying: 38700, selling: 39000 },
];

// Blog yazıları
const blogPosts = [
  {
    slug: 'dolar-tl-tahminleri-2024',
    title: 'Dolar/TL Tahminleri ve Piyasa Analizi',
    excerpt: 'Uzman ekonomistlerin dolar kuru tahminleri ve piyasa beklentileri...',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    category: 'Ekonomi',
    date: '18 Aralık 2025',
  },
  {
    slug: 'altin-yatirim-rehberi',
    title: 'Altın Yatırım Rehberi: Nereden Başlamalı?',
    excerpt: 'Altın yatırımına yeni başlayanlar için kapsamlı rehber...',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=250&fit=crop',
    category: 'Yatırım',
    date: '15 Aralık 2025',
  },
  {
    slug: 'mevduat-faizi-karsilastirma',
    title: 'Bankaların Mevduat Faiz Oranları Karşılaştırması',
    excerpt: 'En yüksek mevduat faizi veren bankalar ve güncel oranlar...',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    category: 'Finans',
    date: '12 Aralık 2025',
  },
];

// Araçlar
const tools = [
  {
    href: '/doviz-altin',
    title: 'Döviz & Altın',
    description: 'Güncel kurlar ve hesaplama',
    icon: TrendingUp,
    color: 'bg-green-500',
  },
  {
    href: '/ai-mutfak',
    title: 'AI Mutfak',
    description: 'Yapay zeka ile tarif önerileri',
    icon: ChefHat,
    color: 'bg-orange-500',
  },
  {
    href: '/metin-doktoru',
    title: 'Metin Doktoru',
    description: 'Metin analiz ve düzenleme',
    icon: FileText,
    color: 'bg-purple-500',
  },
  {
    href: '/finans/kredi-hesaplama',
    title: 'Kredi Hesaplama',
    description: 'Taksit ve faiz hesaplama',
    icon: Calculator,
    color: 'bg-blue-500',
  },
];

export function HomeClient() {
  const [currencies, setCurrencies] = useState<Record<string, CurrencyData>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  
  // Converter state
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [result, setResult] = useState<number>(0);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/doviz');
      const data: ExchangeData = await res.json();
      
      if (data.success) {
        setCurrencies(data.data);
        setLastUpdate(new Date().toLocaleTimeString('tr-TR'));
      }
    } catch (error) {
      console.error('Döviz verileri alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  // Hesaplama
  useEffect(() => {
    if (!currencies || Object.keys(currencies).length === 0) return;
    
    const numAmount = parseFloat(amount) || 0;
    
    if (fromCurrency === 'TRY' && toCurrency !== 'TRY') {
      const rate = currencies[toCurrency]?.selling || 1;
      setResult(numAmount / rate);
    } else if (fromCurrency !== 'TRY' && toCurrency === 'TRY') {
      const rate = currencies[fromCurrency]?.buying || 1;
      setResult(numAmount * rate);
    } else if (fromCurrency === toCurrency) {
      setResult(numAmount);
    } else {
      const fromRate = currencies[fromCurrency]?.buying || 1;
      const toRate = currencies[toCurrency]?.selling || 1;
      const tryAmount = numAmount * fromRate;
      setResult(tryAmount / toRate);
    }
  }, [amount, fromCurrency, toCurrency, currencies]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const allCurrencies = ['TRY', ...Object.keys(currencies)];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
          Akıllı Finans ve Yaşam <span className="text-blue-600">Araçları</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Döviz kurları, altın fiyatları, AI destekli yemek tarifleri ve finansal hesaplayıcılar - 
          tüm ihtiyaçlarınız tek platformda.
        </p>
      </div>

      {/* Döviz Hesaplama */}
      <div className="card p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" />
            Döviz Hesaplama
          </h2>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <Clock className="w-4 h-4" />
            <span>{lastUpdate || '--:--'}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm text-blue-100 mb-2">Miktar</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg font-semibold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-blue-100 mb-2">Kaynak</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 text-lg font-semibold"
            >
              {allCurrencies.map((code) => (
                <option key={code} value={code} className="text-slate-800">
                  {currencyFlags[code]} {code}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-blue-100 mb-2">Hedef</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 text-lg font-semibold"
            >
              {allCurrencies.map((code) => (
                <option key={code} value={code} className="text-slate-800">
                  {currencyFlags[code]} {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Sonuç</p>
            <p className="text-3xl font-bold">
              {currencyFlags[toCurrency]} {result.toLocaleString('tr-TR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })} {toCurrency}
            </p>
          </div>
          <button
            onClick={fetchRates}
            disabled={loading}
            className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Araçlar */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Popüler Araçlar</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card p-5 hover:shadow-lg hover:border-blue-200 transition-all group"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Döviz Kurları */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Döviz Kurları
            </h2>
            <Link href="/doviz-altin" className="text-sm text-blue-600 hover:underline">
              Tümü →
            </Link>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Döviz</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Alış</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Satış</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(currencies).slice(0, 5).map((currency) => (
                  <tr key={currency.code} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{currencyFlags[currency.code]}</span>
                        <span className="font-medium text-slate-800">{currency.code}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">
                      ₺{currency.buying.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-800">
                      ₺{currency.selling.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Altın Fiyatları */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-500" />
              Altın Fiyatları
            </h2>
            <Link href="/doviz-altin" className="text-sm text-blue-600 hover:underline">
              Tümü →
            </Link>
          </div>
          
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Altın</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Alış</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Satış</th>
              </tr>
            </thead>
            <tbody>
              {goldPrices.map((gold) => (
                <tr key={gold.name} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🪙</span>
                      <span className="font-medium text-slate-800">{gold.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">
                    ₺{gold.buying.toLocaleString('tr-TR')}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">
                    ₺{gold.selling.toLocaleString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Öne Çıkanlar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Blog Yazıları
          </h2>
          <Link href="/blog" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
            Tümünü Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card overflow-hidden group hover:shadow-lg transition-all"
            >
              <div className="aspect-video bg-slate-200 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.date}</span>
                </div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
