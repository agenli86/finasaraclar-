import { NextRequest, NextResponse } from 'next/server';

// Hazır tarifler - API çalışmazsa bunları göster
const recipes: Record<string, string> = {
  tavuk: `🍗 **Fırında Baharatlı Tavuk**

⏱️ Süre: 45 dakika | 👥 Porsiyon: 4 | 🔥 Zorluk: Kolay

**Malzemeler:**
- Tavuk but veya göğüs
- Zeytinyağı
- Tuz, karabiber, pul biber
- Sarımsak, kekik

**Yapılışı:**
1. Tavukları yıkayıp kurulayın
2. Zeytinyağı, tuz ve baharatlarla marine edin
3. 200°C fırında 40-45 dk pişirin
4. Üzeri kızarana kadar bekletin

💡 İpucu: Yanında pilav veya salata ile servis edin!`,

  makarna: `🍝 **Domates Soslu Makarna**

⏱️ Süre: 25 dakika | 👥 Porsiyon: 4 | 🔥 Zorluk: Kolay

**Malzemeler:**
- 500g makarna
- 4 adet domates
- Sarımsak, soğan
- Zeytinyağı, tuz

**Yapılışı:**
1. Makarnayı tuzlu suda haşlayın
2. Soğan ve sarımsağı kavurun
3. Domatesleri rendeleyin, ekleyin
4. 15 dk pişirin, makarnayla karıştırın

💡 İpucu: Üzerine parmesan rendeleyin!`,

  yumurta: `🍳 **Menemen**

⏱️ Süre: 15 dakika | 👥 Porsiyon: 2 | 🔥 Zorluk: Çok Kolay

**Malzemeler:**
- 4 yumurta
- 2 domates
- 2 biber
- Zeytinyağı, tuz

**Yapılışı:**
1. Biberleri doğrayıp kavurun
2. Domatesleri ekleyin, pişirin
3. Yumurtaları kırın, karıştırın
4. Kıvam alınca servis edin

💡 İpucu: Yanında taze ekmek ile servis edin!`,

  patates: `🥔 **Fırında Patates**

⏱️ Süre: 40 dakika | 👥 Porsiyon: 4 | 🔥 Zorluk: Kolay

**Malzemeler:**
- 1 kg patates
- Zeytinyağı
- Tuz, karabiber, kekik
- Sarımsak (isteğe bağlı)

**Yapılışı:**
1. Patatesleri dilimleyin
2. Zeytinyağı ve baharatlarla karıştırın
3. Tepsiye dizin
4. 200°C fırında 35-40 dk pişirin

💡 İpucu: Yoğurt ile servis edin!`,

  pirinc: `🍚 **Tereyağlı Pilav**

⏱️ Süre: 30 dakika | 👥 Porsiyon: 4 | 🔥 Zorluk: Orta

**Malzemeler:**
- 2 su bardağı pirinç
- 3.5 su bardağı su
- 2 yemek kaşığı tereyağı
- Tuz

**Yapılışı:**
1. Pirinci yıkayıp suda bekletin
2. Tereyağında kavurun
3. Kaynar suyu ekleyin
4. Kısık ateşte 20 dk pişirin

💡 İpucu: Demlenmeye bırakın, kabarık olur!`,

  default: `👨‍🍳 **Karışık Sebze Yemeği**

⏱️ Süre: 35 dakika | 👥 Porsiyon: 4 | 🔥 Zorluk: Kolay

**Malzemeler:**
- Elinizdeki sebzeler
- Zeytinyağı
- Tuz, karabiber
- Sarımsak, soğan

**Yapılışı:**
1. Tüm sebzeleri yıkayıp doğrayın
2. Soğanı zeytinyağında kavurun
3. Sert sebzeleri önce, yumuşak olanları sonra ekleyin
4. Kısık ateşte pişirin

💡 İpucu: Yanında pilav veya ekmek ile servis edin!`
};

function findRecipe(ingredients: string): string {
  const lower = ingredients.toLowerCase();
  
  if (lower.includes('tavuk')) return recipes.tavuk;
  if (lower.includes('makarna')) return recipes.makarna;
  if (lower.includes('yumurta')) return recipes.yumurta;
  if (lower.includes('patates')) return recipes.patates;
  if (lower.includes('pirinç') || lower.includes('pilav')) return recipes.pirinc;
  
  return recipes.default;
}

async function tryGeminiAPI(apiKey: string, prompt: string): Promise<string | null> {
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
  
  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
          }),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt gerekli' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Önce Gemini API'yi dene
    if (apiKey) {
      let systemPrompt = '';
      
      if (type === 'recipe') {
        systemPrompt = `Sen profesyonel bir Türk aşçısısın. Kullanıcının verdiği malzemelere göre pratik ve lezzetli bir tarif öner.
Tarifi şu formatta yaz:
- Tarif adı (emoji ile)
- Süre, porsiyon, zorluk
- Malzemeler listesi
- Adım adım yapılış
- İpucu

Malzemeler: ${prompt}`;
      } else {
        systemPrompt = prompt;
      }

      const aiResult = await tryGeminiAPI(apiKey, systemPrompt);
      
      if (aiResult) {
        return NextResponse.json({ success: true, data: aiResult, source: 'ai' });
      }
    }

    // API çalışmazsa hazır tarifleri kullan
    if (type === 'recipe') {
      const recipe = findRecipe(prompt);
      return NextResponse.json({ 
        success: true, 
        data: recipe + '\n\n---\n_Not: AI şu an devre dışı, hazır tarifler gösteriliyor._',
        source: 'fallback'
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'AI servisi şu an kullanılamıyor' 
    }, { status: 503 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Bilinmeyen hata' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 });
}
