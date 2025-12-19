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
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const suggestedIngredients = [
  'Tavuk', 'Pirinç', 'Makarna', 'Domates', 'Soğan', 'Sarımsak',
  'Biber', 'Patates', 'Yumurta', 'Peynir', 'Süt', 'Un',
  'Zeytinyağı', 'Tereyağı', 'Limon', 'Salatalık', 'Havuç', 'Patlıcan',
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

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: ingredients.join(', '),
          type: 'recipe',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipe(data.data);
      } else {
        setError(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (err) {
      setError('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
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
    <div className="space-y-8">
      <Breadcrumb />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-rose-500/10 border border-rose-500/20">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="text-sm font-medium text-rose-400">
            Gemini AI Destekli
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          AI <span className="gradient-text">Mutfak</span>
        </h1>
        <p className="text-slate-400">
          Elinizdeki malzemeleri girin, yapay zeka size muhteşem tarifler önersin!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Ingredient Input */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-rose-400" />
              Malzemeler
            </h2>

            <div className="space-y-4">
              {/* Input */}
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Malzeme yazın ve Enter'a basın"
                  className="input-field pr-12"
                />
                <button
                  onClick={() => addIngredient(inputValue)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Selected Ingredients */}
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-sm"
                    >
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={getRecipe}
                  disabled={isLoading || ingredients.length === 0}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Tarif Hazırlanıyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Tarif Al
                    </>
                  )}
                </button>
                {ingredients.length > 0 && (
                  <button onClick={clearAll} className="btn-ghost">
                    Temizle
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Hızlı Ekle
            </h3>
            <div className="flex flex-wrap gap-2">
              {suggestedIngredients
                .filter((i) => !ingredients.includes(i))
                .slice(0, 12)
                .map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => addIngredient(ingredient)}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                  >
                    + {ingredient}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 min-h-[500px]">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Tarif Önerisi
            </h2>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                {error}
              </div>
            )}

            {!recipe && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mb-4">
                  <ChefHat className="w-10 h-10 text-rose-400" />
                </div>
                <p className="text-slate-400 mb-2">
                  Malzemelerinizi ekleyin ve &quot;Tarif Al&quot; butonuna tıklayın
                </p>
                <p className="text-sm text-slate-500">
                  AI size özel bir tarif hazırlayacak
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 animate-pulse" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white" />
                </div>
                <p className="mt-4 text-slate-400">AI tarif hazırlıyor...</p>
                <p className="text-sm text-slate-500">Bu işlem birkaç saniye sürebilir</p>
              </div>
            )}

            {recipe && (
              <div className="prose prose-invert max-w-none">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>30-45 dk</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Users className="w-4 h-4" />
                    <span>4 Porsiyon</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Flame className="w-4 h-4" />
                    <span>Orta Zorluk</span>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                  {recipe}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card p-6 bg-gradient-to-br from-rose-500/5 to-pink-500/5">
        <h3 className="font-semibold text-white mb-2">💡 İpuçları</h3>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• Ana malzemenizi mutlaka ekleyin (tavuk, kıyma, balık vb.)</li>
          <li>• Baharatları ve sosları da belirtebilirsiniz</li>
          <li>• Daha spesifik sonuçlar için daha fazla malzeme ekleyin</li>
          <li>• Diyet tercihlerinizi malzeme olarak belirtebilirsiniz (vejetaryen, vegan vb.)</li>
        </ul>
      </div>
    </div>
  );
}
