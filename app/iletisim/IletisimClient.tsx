'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'E-posta',
    value: 'iletisim@hizirmatik.com.tr',
    description: 'Her zaman yanıtlıyoruz',
    color: 'emerald',
  },
  {
    icon: Phone,
    title: 'Telefon',
    value: '+90 (312) 000 00 00',
    description: 'Hafta içi 09:00 - 18:00',
    color: 'blue',
  },
  {
    icon: MapPin,
    title: 'Adres',
    value: 'Ankara, Türkiye',
    description: 'Merkez ofisimiz',
    color: 'violet',
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    value: 'Hafta içi 09:00 - 18:00',
    description: 'Hafta sonu kapalı',
    color: 'orange',
  },
];

const faqs = [
  {
    question: 'HızırMatik ücretsiz mi?',
    answer: 'Evet! Tüm temel araçlarımız tamamen ücretsizdir. İleride premium özellikler eklenebilir.',
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'Kesinlikle. Verilerinizi satmıyor veya üçüncü taraflarla paylaşmıyoruz. SSL şifreleme kullanıyoruz.',
  },
  {
    question: 'Döviz kurları gerçek zamanlı mı?',
    answer: 'Döviz ve altın kurları düzenli aralıklarla güncellenmektedir. Yatırım kararları için bankanızı kontrol edin.',
  },
  {
    question: 'AI Mutfak nasıl çalışıyor?',
    answer: 'Girdiğiniz malzemelere göre Google Gemini AI, size uygun tarifler öneriyor.',
  },
];

const getColorClass = (color: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    emerald: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-400' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  };
  return colors[color] || { bg: 'bg-slate-500/10', text: 'text-slate-400' };
};

export default function IletisimClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simüle edilmiş gönderim
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">İletişim</h1>
          <p className="text-slate-400">Bizimle iletişime geçin</p>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contactInfo.map((info, index) => {
          const colorClass = getColorClass(info.color);
          return (
            <div key={index} className="glass-card p-5">
              <div className={`inline-flex p-2 rounded-lg ${colorClass.bg} mb-3`}>
                <info.icon className={`w-5 h-5 ${colorClass.text}`} />
              </div>
              <h3 className="font-semibold text-white mb-1">{info.title}</h3>
              <p className="text-blue-400 font-medium text-sm">{info.value}</p>
              <p className="text-slate-500 text-xs mt-1">{info.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* İletişim Formu */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-400" />
            Mesaj Gönderin
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Adınız</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">E-posta</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Konu</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Konu Seçin</option>
                <option value="genel">Genel Soru</option>
                <option value="oneri">Öneri / Geri Bildirim</option>
                <option value="hata">Hata Bildirimi</option>
                <option value="isbirligi">İş Birliği</option>
                <option value="diger">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mesajınız</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="input-field resize-none"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Gönderiliyor...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Gönderildi!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Gönder
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                Mesajınız başarıyla gönderildi. En kısa sürede yanıt vereceğiz.
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                Bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            )}
          </form>
        </div>

        {/* SSS */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            Sık Sorulan Sorular
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-800/50">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-slate-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-blue-400 text-sm">
              💡 Sorunuz burada yok mu? Yukarıdaki formu kullanarak bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* Harita placeholder */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          Konum
        </h2>
        <div className="h-64 rounded-xl bg-slate-800/50 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Ankara, Türkiye</p>
            <p className="text-slate-500 text-sm">Harita yakında eklenecek</p>
          </div>
        </div>
      </div>
    </div>
  );
}
