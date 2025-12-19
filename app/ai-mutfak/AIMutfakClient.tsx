'use client';

import { useState } from 'react';
import {
  ChefHat,
  Sparkles,
  Plus,
  X,
  Send,
  Loader2,
  Clock,
  Users,
  Flame,
  Lightbulb,
  UtensilsCrossed,
  RotateCcw
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// Önerilen malzemeleri daha geniş ve kategorik hale getirdik
const suggestedIngredients = [
  'Tavuk', 'Kıyma', 'Yumurta', 'Un', 'Şeker', 'Kakao', 
  'Süt', 'Pirinç', 'Makarna', 'Patates', 'Domates', 'Soğan', 
  'Sarımsak', 'Zeytinyağı', 'Tereyağı', 'Yoğurt', 'Peynir', 'Limon'
];

export function AIMutfakClient() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
      setError(null);
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  const getRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Lütfen en az bir malzeme ekleyin.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipe(null);

    // AI'nın saçmalamasını engelleyen o meşhur "Şef Komutu"
    const smartPrompt = `
      Sen dünyanın en iyi şefisin. Kullanıcının verdiği malzemeleri analiz et ve şu kurallara göre bir tarif oluştur:
      1. Malzemeler: ${ingredients.join(', ')}
      2. ANALİZ: Eğer malzemeler un, şeker, süt, kakao gibi tatlı malzemeleri ağırlıklıysa MUTLAKA bir TATLI veya KEK tarifi ver. Sakın sebze yemeği verme.
      3. ANALİZ: Eğer malzemeler et, sebze, bakliyat ağırlıklıysa doyurucu bir ANA YEMEK tarifi ver.
      4. FORMAT: Çıktıyı şu başlıklarla ver: 
         - **YEMEK ADI**
         - **GEREKLİ EK MALZEMELER** (Evde bulunabilecek tuz, su gibi şeyler)
         - **ADIM ADIM YAPILIŞI**
         - **ŞEFİN SIRRI** (Küçük bir püf noktası)
      5. DİL: Samimi, iştah açıcı ve Türkçe bir üslup kullan.
    `;

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: smartPrompt,
          type: 'recipe',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipe(data.data);
      } else {
        setError(data.error || 'Tarif hazırlanırken bir hata oluştu.');
      }
    } catch (err) {
      setError('Bağlantı hatası. Lütfen internetinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setIngredients([]);
    setRecipe(null);
    setError(null);
  };

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 shadow-sm">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="text-sm font-semibold text-rose-400 uppercase tracking-wider">
            Akıllı Mutfak Asistanı
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
          AI <span className="text-rose-500">Mutfak</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Malzemeni söyle, şefin sana en uygun tarifi hazırlasın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Panel: Giriş */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6 border-white/5 bg-white/5 backdrop-blur-xl rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <UtensilsCrossed className="w-6 h-6 text-rose-500" />
              Dolapta Ne Var?
            </h2>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Örn: Un, Yumurta..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                />
                <button
                  onClick={() => addIngredient(inputValue)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-rose-500 rounded-xl text-white hover:bg-rose-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2 py-2">
                  {ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-sm font-medium animate-in fade-in zoom-in duration-300"
                    >
                      {ingredient}
                      <button onClick={() => removeIngredient(ingredient)} className="hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={getRecipe}
                  disabled={isLoading || ingredients.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl text-white font-bold flex items-center justify-center gap-3 shadow-lg shadow-rose-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Şef Hazırlıyor...
                    </>
                  ) : (
                    <>
                      <ChefHat className="w-6 h-6" />
                      Tarif Oluştur
                    </>
                  )}
                </button>
                {ingredients.length > 0 && (
                  <button onClick={clearAll} className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                    Listeyi Sıfırla
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Hızlı Ekleme */}
          <div className="glass-card p-6 border-white/5 bg-white/5 rounded-3xl">
            <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Sık Kullanılanlar
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedIngredients
                .filter((i) => !ingredients.includes(i))
                .map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => addIngredient(ingredient)}
                    className="px-3 py-2 text-xs font-semibold rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-all"
                  >
                    + {ingredient}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Sağ Panel: Tarif Sonucu */}
        <div className="lg:col-span-2">
          <div className="glass-card p-8 min-h-[600px] border-white/5 bg-white/5 backdrop-blur-xl rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ChefHat className="w-64 h-64 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative">
              <Sparkles className="w-6 h-6 text-amber-400" />
              Şefin Önerisi
            </h2>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6 animate-shake">
                {error}
              </div>
            )}

            {!recipe && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-6 relative">
                <div className="w-24 h-24 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-12 h-12 text-rose-500/50" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-medium text-slate-300">Henüz bir tarif yok</p>
                  <p className="text-slate-500 max-w-xs">
                    Malzemeleri ekleyip butona basınca yapay zeka senin için mutfağa girecek.
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-[400px] space-y-6 relative">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" />
                  <ChefHat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-rose-500" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white animate-pulse">Şef Malzemeleri Tartıyor...</p>
                  <p className="text-slate-500 mt-2">En lezzetli tarifi bulmak üzereyim.</p>
                </div>
              </div>
            )}

            {recipe && (
              <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-wrap items-center gap-6 mb-8 py-4 border-y border-white/5">
                  <div className="flex items-center gap-2 text-rose-400">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold text-sm">Standart Süre</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold text-sm">4 Kişilik</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Flame className="w-5 h-5" />
                    <span className="font-semibold text-sm">Sıcak Servis</span>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-slate-200 text-lg leading-relaxed font-light">
                  {recipe}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
