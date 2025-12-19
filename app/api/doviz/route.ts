import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // USD bazlı kurları al
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error('API hatası');
    }

    const data = await response.json();
    const rates = data.rates;
    const tryRate = rates.TRY; // 1 USD = X TRY

    // Her döviz için TRY karşılığını hesapla
    const currencies: Record<string, { code: string; name: string; buying: number; selling: number }> = {
      USD: { 
        code: 'USD', 
        name: 'Amerikan Doları', 
        buying: parseFloat((tryRate * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate * 1.003).toFixed(4))
      },
      EUR: { 
        code: 'EUR', 
        name: 'Euro', 
        buying: parseFloat((tryRate / rates.EUR * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate / rates.EUR * 1.003).toFixed(4))
      },
      GBP: { 
        code: 'GBP', 
        name: 'İngiliz Sterlini', 
        buying: parseFloat((tryRate / rates.GBP * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate / rates.GBP * 1.003).toFixed(4))
      },
      CHF: { 
        code: 'CHF', 
        name: 'İsviçre Frangı', 
        buying: parseFloat((tryRate / rates.CHF * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate / rates.CHF * 1.003).toFixed(4))
      },
      SAR: { 
        code: 'SAR', 
        name: 'Suudi Arabistan Riyali', 
        buying: parseFloat((tryRate / rates.SAR * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate / rates.SAR * 1.003).toFixed(4))
      },
      AUD: { 
        code: 'AUD', 
        name: 'Avustralya Doları', 
        buying: parseFloat((tryRate / rates.AUD * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate / rates.AUD * 1.003).toFixed(4))
      },
      CAD: { 
        code: 'CAD', 
        name: 'Kanada Doları', 
        buying: parseFloat((tryRate / rates.CAD * 0.997).toFixed(4)), 
        selling: parseFloat((tryRate / rates.CAD * 1.003).toFixed(4))
      },
    };

    return NextResponse.json({
      success: true,
      data: currencies,
      updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Döviz API Error:', error);
    
    // Güncel fallback data (19 Aralık 2025)
    return NextResponse.json({
      success: true,
      data: {
        USD: { code: 'USD', name: 'Amerikan Doları', buying: 42.65, selling: 42.80 },
        EUR: { code: 'EUR', name: 'Euro', buying: 44.50, selling: 44.70 },
        GBP: { code: 'GBP', name: 'İngiliz Sterlini', buying: 53.80, selling: 54.10 },
        CHF: { code: 'CHF', name: 'İsviçre Frangı', buying: 47.50, selling: 47.80 },
        SAR: { code: 'SAR', name: 'Suudi Arabistan Riyali', buying: 11.35, selling: 11.45 },
        AUD: { code: 'AUD', name: 'Avustralya Doları', buying: 26.80, selling: 27.00 },
        CAD: { code: 'CAD', name: 'Kanada Doları', buying: 29.90, selling: 30.10 },
      },
      updated: new Date().toISOString(),
      fallback: true
    });
  }
}
