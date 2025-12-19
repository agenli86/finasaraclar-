import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return NextResponse.json({ success: false, error: 'API Key eksik!' }, { status: 500 });

    const masterPrompt = `Sen usta bir aşçısın. Malzemeler: ${prompt}. Bu malzemelerle en mantıklı tarifi yaz. Un-şeker varsa TATLI, et-sebze varsa YEMEK yap.`;

    // EN GÜNCEL VE STABİL YOL: v1beta üzerinden gemini-1.5-flash-latest kullanımı
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
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
      return NextResponse.json({ success: false, error: 'Google Hatası: ' + errorData.error.message }, { status: 500 });
    }

    const data = await response.json();
    const aiResult = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ success: true, data: aiResult });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Bağlantı hatası!' }, { status: 500 });
  }
}
