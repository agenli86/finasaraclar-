'use client';

import { useState, useEffect } from 'react';
import {
  CreditCard,
  Calculator,
  Percent,
  Calendar,
  Wallet,
  TrendingUp,
  Info,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { calculateKredi, formatCurrency, formatNumber } from '@/lib/utils';
import { KrediHesaplama } from '@/types';

export function KrediHesaplamaClient() {
  const [anapara, setAnapara] = useState<string>('100000');
  const [faizOrani, setFaizOrani] = useState<string>('3.5');
  const [vade, setVade] = useState<string>('12');
  const [sonuc, setSonuc] = useState<KrediHesaplama | null>(null);
  const [odemeTablosu, setOdemeTablosu] = useState<Array<{
    ay: number;
    taksit: number;
    anapara: number;
    faiz: number;
    kalanBakiye: number;
  }>>([]);

  useEffect(() => {
    const anaparaNum = parseFloat(anapara) || 0;
    const faizNum = parseFloat(faizOrani) || 0;
    const vadeNum = parseInt(vade) || 0;

    if (anaparaNum > 0 && faizNum > 0 && vadeNum > 0) {
      const hesaplama = calculateKredi(anaparaNum, faizNum, vadeNum);
      setSonuc(hesaplama);

      // Ödeme tablosu oluştur
      const tablo = [];
      let kalanBakiye = anaparaNum;
      const aylikFaiz = faizNum / 100 / 12;

      for (let ay = 1; ay <= vadeNum; ay++) {
        const faizTutari = kalanBakiye * aylikFaiz;
        const anaparaTutari = hesaplama.aylikTaksit - faizTutari;
        kalanBakiye = Math.max(0, kalanBakiye - anaparaTutari);

        tablo.push({
          ay,
          taksit: hesaplama.aylikTaksit,
          anapara: anaparaTutari,
          faiz: faizTutari,
          kalanBakiye,
        });
      }

      setOdemeTablosu(tablo);
    } else {
      setSonuc(null);
      setOdemeTablosu([]);
    }
  }, [anapara, faizOrani, vade]);

  const vadeSecenekleri = [3, 6, 9, 12, 18, 24, 36, 48, 60, 72, 84, 96, 120];

  return (
    <div className="space-y-8">
      <Breadcrumb />

      {/* Header */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Kredi <span className="gradient-text">Hesaplama</span>
        </h1>
        <p className="text-slate-400">
          Kredi taksit tutarı, toplam ödeme ve faiz miktarını hesaplayın
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            Kredi Bilgileri
          </h2>

          <div className="space-y-6">
            {/* Anapara */}
            <div>
              <label className="input-label flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Kredi Tutarı (₺)
              </label>
              <input
                type="number"
                value={anapara}
                onChange={(e) => setAnapara(e.target.value)}
                className="input-field"
                placeholder="100000"
                min="0"
              />
            </div>

            {/* Faiz Oranı */}
            <div>
              <label className="input-label flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Yıllık Faiz Oranı (%)
              </label>
              <input
                type="number"
                value={faizOrani}
                onChange={(e) => setFaizOrani(e.target.value)}
                className="input-field"
                placeholder="3.5"
                min="0"
                step="0.1"
              />
              <p className="text-xs text-slate-500 mt-1">
                Aylık: %{(parseFloat(faizOrani) / 12 || 0).toFixed(3)}
              </p>
            </div>

            {/* Vade */}
            <div>
              <label className="input-label flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Vade (Ay)
              </label>
              <select
                value={vade}
                onChange={(e) => setVade(e.target.value)}
                className="input-field"
              >
                {vadeSecenekleri.map((v) => (
                  <option key={v} value={v}>
                    {v} Ay ({(v / 12).toFixed(1)} Yıl)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          {sonuc && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-card p-6 bg-gradient-to-br from-blue-500/10 to-green-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-400">Aylık Taksit</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(sonuc.aylikTaksit)}
                </p>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-400">Toplam Ödeme</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(sonuc.toplamOdeme)}
                </p>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-rose-500/10 to-pink-500/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-rose-400" />
                  </div>
                  <span className="text-sm text-slate-400">Toplam Faiz</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(sonuc.toplamFaiz)}
                </p>
              </div>
            </div>
          )}

          {/* Payment Table */}
          {odemeTablosu.length > 0 && (
            <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Ödeme Planı
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <table className="data-table">
                  <thead className="sticky top-0 bg-dark-900/95 backdrop-blur-sm">
                    <tr>
                      <th>Ay</th>
                      <th className="text-right">Taksit</th>
                      <th className="text-right">Anapara</th>
                      <th className="text-right">Faiz</th>
                      <th className="text-right">Kalan Bakiye</th>
                    </tr>
                  </thead>
                  <tbody>
                    {odemeTablosu.map((row) => (
                      <tr key={row.ay}>
                        <td className="font-medium">{row.ay}. Ay</td>
                        <td className="text-right font-mono">
                          ₺{formatNumber(row.taksit, 2)}
                        </td>
                        <td className="text-right font-mono text-blue-400">
                          ₺{formatNumber(row.anapara, 2)}
                        </td>
                        <td className="text-right font-mono text-rose-400">
                          ₺{formatNumber(row.faiz, 2)}
                        </td>
                        <td className="text-right font-mono">
                          ₺{formatNumber(row.kalanBakiye, 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-500/5 to-indigo-500/5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-white mb-2">Önemli Bilgi</h3>
            <p className="text-sm text-slate-400">
              Bu hesaplama aracı bilgilendirme amaçlıdır. Gerçek kredi tutarları banka komisyonları, 
              dosya masrafları, BSMV ve KKDF gibi ek maliyetler nedeniyle farklılık gösterebilir. 
              Kesin bilgi için bankanızla iletişime geçiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
