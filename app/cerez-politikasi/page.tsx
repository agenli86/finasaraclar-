import type { Metadata } from 'next';
import { Cookie, Info, Settings, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'HızırMatik çerez politikası ve bilgilendirme.',
};

export default function CerezPolitikasiPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
          <Cookie className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Çerez Politikası</h1>
        <p className="text-slate-500">Son güncelleme: Aralık 2025</p>
      </div>

      <div className="card p-8 space-y-8">
        {/* Çerez Nedir */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Çerez Nedir?
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Çerezler, web sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. 
            Bu dosyalar, siteyi daha verimli kullanmanızı sağlar ve tercihlerinizi hatırlamamıza yardımcı olur.
          </p>
        </section>

        {/* Kullandığımız Çerezler */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Kullandığımız Çerezler</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-800 mb-2">Zorunlu Çerezler</h3>
              <p className="text-slate-600 text-sm">
                Sitenin temel işlevleri için gereklidir. Bu çerezler olmadan site düzgün çalışmaz.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-800 mb-2">Analitik Çerezler</h3>
              <p className="text-slate-600 text-sm">
                Ziyaretçi istatistiklerini toplamamıza yardımcı olur. Bu veriler anonim olarak işlenir.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-semibold text-slate-800 mb-2">Tercih Çerezleri</h3>
              <p className="text-slate-600 text-sm">
                Dil ve tema tercihlerinizi hatırlamamızı sağlar.
              </p>
            </div>
          </div>
        </section>

        {/* Çerez Yönetimi */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Çerez Yönetimi
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Tarayıcı ayarlarınızdan çerezleri yönetebilir veya silebilirsiniz. Ancak bazı çerezleri 
            devre dışı bırakmak sitenin işlevselliğini etkileyebilir.
          </p>
        </section>

        {/* Gizlilik */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Gizlilik
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Daha fazla bilgi için{' '}
            <a href="/gizlilik-politikasi" className="text-blue-600 hover:underline">
              Gizlilik Politikamızı
            </a>{' '}
            inceleyebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
