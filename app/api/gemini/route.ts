import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API anahtarı eksik!' }, { status: 500 });
    }

    // AI'yı terbiye eden ana talimat
    const masterPrompt = `Sen profesyonel bir aşçısın. 
    Kullanıcının verdiği malzemeleri analiz et. 
    Eğer un, şeker, kakao gibi malzemeler varsa MUTLAKA tatlı/kek tarifi ver. 
    Sakın malzemeyle alakasız sebze yemeği önerme.
    Malzemeler: ${prompt}`;

    // ÇÖZÜM: v1 sürümü ve gemini-pro modeli her zaman çalışır.
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: masterPrompt }] }]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ 
        success: false, 
        error: 'Google API Hatası: ' + (errorData.error?.message || 'Bilinmeyen hata') 
      }, { status: 500 });
    }

    const data = await response.json();
    const aiResult = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (aiResult) {
      return NextResponse.json({ success: true, data: aiResult });
    }

    return NextResponse.json({ success: false, error: 'Tarif üretilemedi.' }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Bağlantı hatası oluştu.' }, { status: 500 });
  }
}
