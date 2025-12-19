'use client';

import { useState } from 'react';
import { PiggyBank, Calculator, TrendingUp, Calendar, Percent, Banknote, Info, RefreshCw } from 'lucide-react';

interface MevduatSonuc {
  brutGetiri: number;
  stopajKesintisi: number;
  netGetiri: number;
  toplamTutar: number;
  aylikGetiri: number;
  yillikEfektifFaiz: number;
}

const VADE_OPTIONS = [
  { value: 32, label: '32 Gün' },
  { value: 60, label: '60 Gün' },
  { value: 90, label: '90 Gün (3 Ay)' },
  { value: 180, label: '180 Gün (6 Ay)' },
  { value: 365, label: '365 Gün (1 Yıl)' },
];

const STOPAJ_ORANLARI = {
  tl_32: 0, // 6 aya kadar TL mevduatta %0
  tl_180: 0, // 6 ay-1 yıl TL mevduatta %0
  tl_365: 0, // 1 yıl üstü TL mevduatta %0
  doviz: 25, // Döviz mevduatta %25
};

export default function MevduatClient() {
  const [anapara, setAnapara] = useState<string>('100000');
  const [faizOrani, setFaizOrani] = useState<string>('45');
  const [vade, setVade] = useState<number>(90);
  const [paraBirimi, setParaBirimi] = useState<'TL' | 'USD' | 'EUR'>('TL');
  const [sonuc, setSonuc] = useState<MevduatSonuc | null>(null);
  const [detayGoster, setDetayGoster] = useState(false);

  const hesapla = () => {
    const anaparaNum = parseFloat(anapara.replace(/[.,]/g, '')) || 0;
    const faizNum = parseFloat(faizOrani) || 0;

    if (anaparaNum <= 0 || faizNum <= 0) {
      alert('Lütfen geçerli değerler girin.');
      return;
    }

    // Brüt getiri hesaplama (basit faiz)
    const brutGetiri = (anaparaNum * faizNum * vade) / (365 * 100);

    // Stopaj oranı belirleme
    let stopajOrani = 0;
    if (paraBirimi !== 'TL') {
      stopajOrani = STOPAJ_ORANLARI.doviz;
    } else {
      // TL mevduatlarda 2024 itibariyle stopaj %0
      stopajOrani = 0;
    }

    const stopajKesintisi = (brutGetiri * stopajOrani) / 100;
    const netGetiri = brutGetiri - stopajKesintisi;
    const toplamTutar = anaparaNum + netGetiri;

    // Aylık ortalama getiri
    const aylikGetiri = netGetiri / (vade / 30);

    // Yıllık efektif faiz oranı
    const yillikEfektifFaiz = Math.pow(1 + netGetiri / anaparaNum, 365 / vade) - 1;

    setSonuc({
      brutGetiri,
      stopajKesintisi,
      netGetiri,
      toplamTutar,
      aylikGetiri,
      yillikEfektifFaiz: yillikEfektifFaiz * 100,
    });
  };

  const formatPara = (num: number): string => {
    const symbol = paraBirimi === 'TL' ? '₺' : paraBirimi === 'USD' ? '$' : '€';
    return `${symbol}${num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const temizle = () => {
    setAnapara('100000');
    setFaizOrani('45');
    setVade(90);
    setParaBirimi('TL');
    setSonuc(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
          <PiggyBank className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Mevduat Faiz Hesaplama</h1>
          <p className="text-slate-400">Vadeli mevduat getirinizi hesaplayın</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Panel - Giriş Formu */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-violet-400" />
            Mevduat Bilgileri
          </h2>

          {/* Para Birimi Seçimi */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Para Birimi</label>
            <div className="grid grid-cols-3 gap-2">
              {(['TL', 'USD', 'EUR'] as const).map((pb) => (
                <button
                  key={pb}
                  onClick={() => setParaBirimi(pb)}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    paraBirimi === pb
                      ? 'bg-violet-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {pb === 'TL' ? '₺ TL' : pb === 'USD' ? '$ USD' : '€ EUR'}
                </button>
              ))}
            </div>
          </div>

          {/* Anapara */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Banknote className="w-4 h-4 inline mr-1" />
              Anapara
            </label>
            <input
              type="text"
              value={anapara}
              onChange={(e) => setAnapara(e.target.value.replace(/[^0-9]/g, ''))}
              className="input-field"
              placeholder="100.000"
            />
          </div>

          {/* Faiz Oranı */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Percent className="w-4 h-4 inline mr-1" />
              Yıllık Faiz Oranı (%)
            </label>
            <input
              type="number"
              value={faizOrani}
              onChange={(e) => setFaizOrani(e.target.value)}
              className="input-field"
              placeholder="45"
              step="0.1"
              min="0"
              max="100"
            />
            <p className="text-xs text-slate-500 mt-1">Bankanızın sunduğu yıllık faiz oranını girin</p>
          </div>

          {/* Vade */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Vade Süresi
            </label>
            <select
              value={vade}
              onChange={(e) => setVade(Number(e.target.value))}
              className="input-field"
            >
              {VADE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-2">
            <button onClick={hesapla} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Hesapla
            </button>
            <button onClick={temizle} className="btn-ghost flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Temizle
            </button>
          </div>
        </div>

        {/* Sağ Panel - Sonuçlar */}
        <div className="space-y-4">
          {sonuc ? (
            <>
              {/* Ana Sonuç Kartı */}
              <div className="glass-card p-6 border-2 border-violet-500/30">
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-1">Vade Sonunda Toplam Tutar</p>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                    {formatPara(sonuc.toplamTutar)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm">Net Getiri</p>
                    <p className="text-xl font-bold text-green-400">{formatPara(sonuc.netGetiri)}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm">Aylık Ortalama</p>
                    <p className="text-xl font-bold text-violet-400">{formatPara(sonuc.aylikGetiri)}</p>
                  </div>
                </div>
              </div>

              {/* Detaylı Bilgiler */}
              <div className="glass-card p-6">
                <button
                  onClick={() => setDetayGoster(!detayGoster)}
                  className="w-full flex items-center justify-between text-white"
                >
                  <span className="font-semibold flex items-center gap-2">
                    <Info className="w-5 h-5 text-violet-400" />
                    Detaylı Hesaplama
                  </span>
                  <span className="text-slate-400">{detayGoster ? '▲' : '▼'}</span>
                </button>

                {detayGoster && (
                  <div className="mt-4 space-y-3 border-t border-slate-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Anapara:</span>
                      <span className="text-white font-medium">{formatPara(parseFloat(anapara.replace(/[.,]/g, '')))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Brüt Getiri:</span>
                      <span className="text-white font-medium">{formatPara(sonuc.brutGetiri)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stopaj Kesintisi ({paraBirimi === 'TL' ? '0%' : '25%'}):</span>
                      <span className="text-red-400 font-medium">-{formatPara(sonuc.stopajKesintisi)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700 pt-3">
                      <span className="text-slate-400">Net Getiri:</span>
                      <span className="text-green-400 font-bold">{formatPara(sonuc.netGetiri)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Yıllık Efektif Faiz:</span>
                      <span className="text-violet-400 font-medium">%{sonuc.yillikEfektifFaiz.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Karşılaştırma Tablosu */}
              <div className="glass-card p-6">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Vade Karşılaştırması
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-slate-400 text-sm border-b border-slate-700">
                        <th className="text-left py-2">Vade</th>
                        <th className="text-right py-2">Net Getiri</th>
                        <th className="text-right py-2">Toplam</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {VADE_OPTIONS.map((opt) => {
                        const anaparaNum = parseFloat(anapara.replace(/[.,]/g, '')) || 0;
                        const faizNum = parseFloat(faizOrani) || 0;
                        const brutG = (anaparaNum * faizNum * opt.value) / (365 * 100);
                        const stopajO = paraBirimi !== 'TL' ? 0.25 : 0;
                        const netG = brutG * (1 - stopajO);
                        const isSelected = opt.value === vade;
                        
                        return (
                          <tr
                            key={opt.value}
                            className={`border-b border-slate-700/50 ${isSelected ? 'bg-violet-500/10' : ''}`}
                          >
                            <td className={`py-3 ${isSelected ? 'text-violet-400 font-medium' : 'text-slate-300'}`}>
                              {opt.label}
                            </td>
                            <td className="py-3 text-right text-green-400">{formatPara(netG)}</td>
                            <td className="py-3 text-right text-white font-medium">{formatPara(anaparaNum + netG)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-violet-500/10 flex items-center justify-center">
                <PiggyBank className="w-10 h-10 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mevduat Getirinizi Hesaplayın</h3>
              <p className="text-slate-400 text-sm">
                Sol taraftaki formu doldurarak vadeli mevduat getirinizi öğrenebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" />
          Önemli Bilgiler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
          <div className="space-y-2">
            <p>• <strong className="text-slate-300">Stopaj Oranları:</strong> TL mevduatlarda %0, döviz mevduatlarda %25 stopaj uygulanır (2024).</p>
            <p>• <strong className="text-slate-300">Efektif Faiz:</strong> Vade sonunda anaparanın yeniden yatırılması durumundaki yıllık getiri oranıdır.</p>
          </div>
          <div className="space-y-2">
            <p>• <strong className="text-slate-300">TMSF Güvencesi:</strong> Mevduatlar 600.000 TL&apos;ye kadar TMSF güvencesi altındadır.</p>
            <p>• <strong className="text-slate-300">Güncel Faizler:</strong> Faiz oranları bankaya ve vadeye göre değişir. Bankanızdan güncel oranları öğrenin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
