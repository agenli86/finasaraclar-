import type { Metadata } from 'next';
import { Users, Target, Zap, Heart, Award, TrendingUp, Shield, Lightbulb } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'HızırMatik hakkında bilgi edinin. Misyonumuz, vizyonumuz ve sunduğumuz akıllı finans ve yaşam araçları.',
  openGraph: {
    title: 'Hakkımızda | HızırMatik',
    description: 'HızırMatik - Akıllı finans ve yaşam araçları platformu hakkında.',
    url: 'https://hizirmatik.com.tr/hakkimizda',
    type: 'website',
  },
};

const breadcrumbItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
];

const stats = [
  { value: '50.000+', label: 'Aktif Kullanıcı', icon: Users },
  { value: '100.000+', label: 'Günlük İşlem', icon: TrendingUp },
  { value: '10+', label: 'Akıllı Araç', icon: Zap },
  { value: '99.9%', label: 'Uptime', icon: Shield },
];

const values = [
  {
    icon: Lightbulb,
    title: 'İnovasyon',
    description: 'En son teknolojileri kullanarak kullanıcılarımıza en iyi deneyimi sunuyoruz.',
    color: 'yellow',
  },
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Verilerinizin güvenliği ve hizmet sürekliliği bizim için önceliktir.',
    color: 'blue',
  },
  {
    icon: Heart,
    title: 'Kullanıcı Odaklılık',
    description: 'Her kararımızı kullanıcılarımızın ihtiyaçlarını düşünerek alıyoruz.',
    color: 'red',
  },
  {
    icon: Award,
    title: 'Kalite',
    description: 'Sunduğumuz her araç ve hizmette en yüksek kalite standartlarını hedefliyoruz.',
    color: 'emerald',
  },
];

const team = [
  { name: 'Teknoloji Ekibi', description: 'Modern web teknolojileri ve AI uzmanları' },
  { name: 'Finans Ekibi', description: 'Piyasa analizi ve hesaplama algoritmaları' },
  { name: 'Tasarım Ekibi', description: 'Kullanıcı deneyimi ve arayüz tasarımı' },
  { name: 'İçerik Ekibi', description: 'Eğitici ve bilgilendirici içerik üretimi' },
];

const getColorClass = (color: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400' },
    emerald: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  };
  return colors[color] || { bg: 'bg-slate-500/10', text: 'text-slate-400' };
};

export default function HakkimizdaPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb customItems={breadcrumbItems} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Hakkımızda</h1>
          <p className="text-slate-400">HızırMatik&apos;i tanıyın</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="glass-card p-8 text-center bg-gradient-to-br from-blue-500/5 to-blue-500/5">
        <h2 className="text-3xl font-bold text-white mb-4">
          Akıllı Finans ve Yaşam Araçları
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          HızırMatik, günlük hayatınızı kolaylaştırmak için tasarlanmış akıllı araçlar sunan 
          bir platformdur. Döviz hesaplama, AI destekli tarif önerileri, metin analizi ve 
          finans hesaplayıcıları ile yanınızdayız.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-5 text-center">
            <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-3">
              <stat.icon className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Misyon & Vizyon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Misyonumuz</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Herkesin finansal okur-yazarlığını artırmak ve günlük hayatı kolaylaştıran, 
            erişilebilir ve ücretsiz araçlar sunmak. Teknoloji ile kullanıcılarımızın 
            hayatına değer katmak.
          </p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <TrendingUp className="w-5 h-5 text-violet-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Vizyonumuz</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Türkiye&apos;nin en güvenilir ve kapsamlı online araç platformu olmak. 
            AI teknolojilerini entegre ederek kullanıcılarımıza akıllı çözümler sunmak 
            ve sürekli yenilikçi ürünler geliştirmek.
          </p>
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-6 text-center">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => {
            const colorClass = getColorClass(value.color);
            return (
              <div key={index} className="p-5 rounded-xl bg-slate-800/50 text-center">
                <div className={`inline-flex p-3 rounded-xl ${colorClass.bg} mb-3`}>
                  <value.icon className={`w-6 h-6 ${colorClass.text}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ekibimiz */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-6 text-center">Ekibimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, index) => (
            <div key={index} className="p-5 rounded-xl bg-slate-800/50 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-slate-400">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-8 text-center bg-gradient-to-br from-blue-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-white mb-3">Bize Katılın!</h2>
        <p className="text-slate-400 mb-6">
          Sorularınız mı var? Önerileriniz mi? Bizimle iletişime geçmekten çekinmeyin.
        </p>
        <a href="/iletisim" className="btn-primary inline-flex items-center gap-2">
          İletişime Geç
        </a>
      </div>
    </div>
  );
}
