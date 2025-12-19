'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Type,
  AlignLeft,
  Hash,
  Clock,
  Mic,
  Copy,
  Trash2,
  Check,
  ArrowUpAZ,
  ArrowDownAZ,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface TextStats {
  characters: number;
  charactersNoSpace: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

function calculateStats(text: string): TextStats {
  const characters = text.length;
  const charactersNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 150);

  return {
    characters,
    charactersNoSpace,
    words,
    sentences,
    paragraphs,
    readingTime,
    speakingTime,
  };
}

export function MetinDoktoruClient() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpace: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const copyToClipboard = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setText('');
  };

  const transformText = (type: 'upper' | 'lower' | 'capitalize' | 'sentence') => {
    if (!text) return;
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'capitalize':
        setText(
          text
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        );
        break;
      case 'sentence':
        setText(
          text
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
    }
  };

  const removeExtraSpaces = () => {
    if (!text) return;
    setText(text.replace(/\s+/g, ' ').trim());
  };

  const removeDuplicateLines = () => {
    if (!text) return;
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    setText(uniqueLines.join('\n'));
  };

  const sortLines = (asc: boolean) => {
    if (!text) return;
    const lines = text.split('\n').filter(Boolean);
    lines.sort((a, b) => (asc ? a.localeCompare(b, 'tr') : b.localeCompare(a, 'tr')));
    setText(lines.join('\n'));
  };

  const statCards = [
    { label: 'Karakter', value: stats.characters, icon: Type, color: 'text-blue-600' },
    { label: 'Boşluksuz', value: stats.charactersNoSpace, icon: Hash, color: 'text-indigo-600' },
    { label: 'Kelime', value: stats.words, icon: AlignLeft, color: 'text-green-600' },
    { label: 'Cümle', value: stats.sentences, icon: FileText, color: 'text-amber-600' },
    { label: 'Paragraf', value: stats.paragraphs, icon: FileText, color: 'text-rose-600' },
    { label: 'Okuma', value: `${stats.readingTime} dk`, icon: Clock, color: 'text-purple-600' },
    { label: 'Konuşma', value: `${stats.speakingTime} dk`, icon: Mic, color: 'text-pink-600' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb />

      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
          Metin <span className="text-blue-600">Doktoru</span>
        </h1>
        <p className="text-slate-500">
          Karakter sayacı, kelime analizi ve metin formatlama araçları
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
        {statCards.map((stat) => (
          <div key={stat.label} className="card p-3 text-center">
            <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
            <p className="text-xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Text Area */}
        <div className="lg:col-span-3">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Metin Alanı
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!text}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </button>
                <button
                  onClick={clearText}
                  disabled={!text}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Temizle
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Metninizi buraya yazın veya yapıştırın..."
              className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
            />
          </div>
        </div>

        {/* Tools Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Case Transformation */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              Büyük/Küçük Harf
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => transformText('upper')}
                disabled={!text}
                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                <span className="text-sm font-bold">AB</span>
                <span className="text-xs text-slate-500">BÜYÜK</span>
              </button>
              <button
                onClick={() => transformText('lower')}
                disabled={!text}
                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                <span className="text-sm font-bold">ab</span>
                <span className="text-xs text-slate-500">küçük</span>
              </button>
              <button
                onClick={() => transformText('capitalize')}
                disabled={!text}
                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                <Type className="w-4 h-4" />
                <span className="text-xs text-slate-500">Her Kelime</span>
              </button>
              <button
                onClick={() => transformText('sentence')}
                disabled={!text}
                className="flex flex-col items-center gap-1 p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                <AlignLeft className="w-4 h-4" />
                <span className="text-xs text-slate-500">Cümle başı</span>
              </button>
            </div>
          </div>

          {/* Text Operations */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              Metin İşlemleri
            </h3>
            <div className="space-y-2">
              <button
                onClick={removeExtraSpaces}
                disabled={!text}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                Fazla Boşlukları Sil
              </button>
              <button
                onClick={removeDuplicateLines}
                disabled={!text}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                Tekrar Eden Satırları Sil
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              Sıralama
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => sortLines(true)}
                disabled={!text}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                <ArrowUpAZ className="w-4 h-4" />
                A-Z
              </button>
              <button
                onClick={() => sortLines(false)}
                disabled={!text}
                className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-slate-50"
              >
                <ArrowDownAZ className="w-4 h-4" />
                Z-A
              </button>
            </div>
          </div>

          {/* Twitter Character Limit */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-slate-500 mb-3">
              Twitter Limiti
            </h3>
            <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  stats.characters <= 280 ? 'bg-blue-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((stats.characters / 280) * 100, 100)}%` }}
              />
            </div>
            <p className={`text-sm mt-2 ${stats.characters > 280 ? 'text-red-600' : 'text-slate-500'}`}>
              {stats.characters}/280 karakter
              {stats.characters > 280 && ` (${stats.characters - 280} fazla)`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
