import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. API KEY KONTROLÜ
    if (!apiKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'Vercel üzerinde API anahtarı bulunamadı! Lütfen Environment Variables kısmını kontrol et abi.' 
      }, { status: 500 });
    }

    // 2. GEMINI'YE GÖNDERİLECEK MASTER PROMPT (KALIPLARI KIRAN TALİMAT)
    const masterPrompt = `
      SENARYO: Sen dünyanın en zeki ve yaratıcı şefisin. 
      GÖREV: Kullanıcının malzemelerine göre ASLA kalıplaşmış cevaplar verme.
      MALZEMELER: ${prompt}

      KURALLAR:
      - Eğer un, şeker, kakao varsa; bu malzemelerle yapılacak EN YARATICI TATLIYI tarif et.
      - Eğer sebze/et varsa; en lezzetli ANA YEMEĞİ tarif et.
      - Çorba, hamur işi veya içecek; malzeme neye uygunsa ona göre karar ver.
      - Tarifi emoji kullanarak, süre ve porsiyon bilgisiyle, iştah açıcı bir dille yaz.
    `;

    // 3. DOĞRUDAN GEMINI API ÇAĞRISI (EN GÜNCEL MODEL)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: masterPrompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 1500 }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: 'API Hatası: ' + errorData.error.message }, { status: 500 });
    }

    const data = await response.json();
    const aiResult = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (aiResult) {
      return NextResponse.json({ success: true, data: aiResult });
    }

    return NextResponse.json({ success: false, error: 'Tarif üretilemedi.' }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}
