'use client';

import { useState, useEffect } from 'react';
import {
  RefreshCw,
  ArrowRightLeft,
  Coins,
  DollarSign,
  Clock,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface CurrencyData {
  code: string;
  name: string;
  buying: number;
  selling: number;
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
  { name: 'Cumhuriyet Altını', buying: 39500, selling: 40000 },
  { name: 'Ata Altın', buying: 39200, selling: 39700 },
];

export function DovizAltinClient() {
  const [currencies, setCurrencies] = useState<Record<string, CurrencyData>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');
  
  // Converter state
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [result, setResult] = useState<number>(0);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/doviz');
      const data = await res.json();
      
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
    <div className="space-y-6">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Döviz & Altın <span className="text-blue-600">Kurları</span>
          </h1>
          <p className="text-slate-500 mt-1">Anlık döviz kurları ve altın fiyatlarını takip edin</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>Son güncelleme: {lastUpdate || '--:--'}</span>
          </div>
          <button
            onClick={fetchRates}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
      </div>

      {/* Converter */}
      <div className="card p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" />
          Döviz Çevirici
        </h2>
        
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

        <div className="mt-6 p-4 bg-white/10 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Sonuç</p>
              <p className="text-3xl font-bold">
                {currencyFlags[toCurrency]} {result.toLocaleString('tr-TR', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })} {toCurrency}
              </p>
            </div>
            <div className="text-right text-blue-100 text-sm">
              <p>1 {fromCurrency} = {
                fromCurrency === 'TRY' 
                  ? (1 / (currencies[toCurrency]?.selling || 1)).toFixed(4)
                  : toCurrency === 'TRY'
                    ? currencies[fromCurrency]?.buying.toFixed(4)
                    : ((currencies[fromCurrency]?.buying || 1) / (currencies[toCurrency]?.selling || 1)).toFixed(4)
              } {toCurrency}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Döviz Kurları */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-slate-800">Döviz Kurları</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-500 mt-2">Yükleniyor...</p>
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
                {Object.values(currencies).map((currency) => (
                  <tr key={currency.code} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{currencyFlags[currency.code]}</span>
                        <div>
                          <p className="font-semibold text-slate-800">{currency.code}</p>
                          <p className="text-xs text-slate-500">{currency.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold text-slate-800">
                        ₺{currency.buying.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold text-slate-800">
                        ₺{currency.selling.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Altın Fiyatları */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <h2 className="font-semibold text-slate-800">Altın Fiyatları</h2>
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
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🪙</span>
                      <p className="font-semibold text-slate-800">{gold.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-slate-800">
                      ₺{gold.buying.toLocaleString('tr-TR')}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-slate-800">
                      ₺{gold.selling.toLocaleString('tr-TR')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
