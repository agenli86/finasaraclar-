import { NextRequest, NextResponse } from 'next/server';

// Akıllı Fallback (API kapalıyken bile kategorik tahmin yapar)
const recipes: Record<string, string> = {
  tatli: `🧁 **Şefin Gurme Keki**\n\n⏱️ 45 dk | 👥 6 Kişilik\n\n**Özellik:** API şu an meşgul ama un ve şekeri görünce sana en güvenilir kek tarifimi bıraktım! Karıştır ve fırınla!`,
  tuzlu: `🥘 **Pratik Ev Yemeği**\n\n⏱️ 30 dk | 👥 4 Kişilik\n\n**Özellik:** Şu an yedek sistemdeyiz. Elindeki malzemeleri soğan ve salça ile kavurarak harika bir tencere yemeği yapabilirsin.`,
  kahvalti: `🍳 **Hızlı Kahvaltı**\n\n⏱️ 10 dk | 👥 2 Kişilik\n\n**Özellik:** Yumurtaları elindeki malzemelerle çırpıp güzel bir omlet yapmaya ne dersin?`
};

function findSmartFallback(ingredients: string): string {
  const lower = ingredients.toLowerCase();
  if (lower.includes('un') || lower.includes('şeker') || lower.includes('kakao')) return recipes.tatli;
  if (lower.includes('yumurta') || lower.includes('peynir')) return recipes.kahvalti;
  return recipes.tuzlu;
}

async function callGemini(apiKey: string, prompt: string) {
  // Flash modeli en hızlı ve talimatlara en sadık olanıdır
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { 
        temperature: 0.85, // Yaratıcılık dozu (0.7-0.9 arası iyidir)
        maxOutputTokens: 1500,
        topP: 0.95
      }
    }),
  });
  
  if (!response.ok) throw new Error('API Hatası');
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: true, data: findSmartFallback(prompt), source: 'fallback' });
    }

    // İŞTE O YARATICI VE SERT TALİMAT (PROMPT)
    const masterPrompt = `
      SENARYO: Sen "AI Mutfak" platformunun baş şefisin. 
      GÖREV: Kullanıcının verdiği malzemelerle dünyanın en yaratıcı ve lezzetli tarifini yaz.
      
      KRİTİK KURALLAR:
      1. ANALİZ: Malzemeleri kokla! Un, şeker, kakao varsa TATLI yap. Et, sebze varsa YEMEK yap. Hamur işi malzemesi varsa POĞAÇA/BÖREK yap.
      2. YARATICILIK: Sadece klasik tarifler verme, malzemeleri modern bir şekilde birleştir.
      3. İSİMLENDİRME: Tarife havalı ve iştah açıcı bir isim ver (Örn: "Altın Sarısı Patates Şöleni").
      4. FORMAT: 
         - [Emoji] İsim
         - [Saat İkonu] Hazırlık Süresi
         - [Ateş İkonu] Kalori Tahmini
         - [Liste] Malzemeler (Ölçüleriyle uydur)
         - [Numaralı Liste] Şefin Hazırlanış Adımları
         - [Yıldız] Şefin Sırrı (Püf noktası)

      Kullanıcının Elindeki Malzemeler: ${prompt}
      
      Şimdi mutfağa gir ve sanatını konuştur!
    `;

    const aiResponse = await callGemini(apiKey, masterPrompt);

    return NextResponse.json({ 
      success: true, 
      data: aiResponse, 
      source: 'gemini-ai' 
    });

  } catch (error) {
    // Hata anında bile kullanıcıyı aç bırakma!
    return NextResponse.json({ 
      success: true, 
      data: recipes.tuzlu + "\n\n(Not: Mutfakta küçük bir aksilik oldu, yedek tarif geldi!)", 
      source: 'error-fallback' 
    });
  }
}
