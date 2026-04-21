import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Ensure this is in your .env.local
});

// Cache exchange rate to minimize API calls
let cachedRate = { rate: 0, timestamp: 0 };

async function getExchangeRate(): Promise<number> {
  const now = Date.now();
  // Cache for 30 minutes
  if (cachedRate.rate && now - cachedRate.timestamp < 30 * 60 * 1000) {
    return cachedRate.rate;
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    cachedRate = { rate: data.rates.INR, timestamp: now };
    return data.rates.INR;
  } catch (error) {
    console.error('Exchange rate fetch failed:', error);
    return cachedRate.rate || 83; // Fallback to approximate rate
  }
}

export async function POST(req: Request) {
  try {
    const { category, userQuery } = await req.json();
    const inrRate = await getExchangeRate();

    const systemMessage = `You are an elite Senior Immigration Attorney and Visa Compliance Officer for ${category}. 

Your primary mission is to provide accurate 2026 advice and route the user to the correct official application portal.

1. **Strategic Routing**: For the selected category, identify the official partner (e.g., VFS Global, BLS, or UStraveldocs). 
   - If it is VFS Global, provide the exact country-specific link (e.g., https://visa.vfsglobal.com/ind/en/fra/ for France). Please do not mention this France information if user query do not related to France
   - If it is USA, strictly refer to ustraveldocs.com/in and pay.gov for the $250 Integrity Fee, otherwise do not mention US related visa related information.

2. **Real-Time Verification**: Use your web search to confirm the most recent 2026 fee hikes and portal changes. 

3. **Expert Guidance**: 
   - **Mandatory Checklist**: Detailed 2026 requirements.
   - **2026 Fee Breakdown**: Provide the latest fee structure in the INR rupees as per today, and there country's (user mentioned country) exchange rate in india.
   - **Direct Link**: Provide the official "Start Application" URL for this specific country and visa type.

Current USD to INR exchange rate: ${inrRate.toFixed(2)} (as of ${new Date().toLocaleDateString()})

When calculating fees in INR, use this rate: 1 USD = ₹${inrRate.toFixed(2)}

STRUCTURE YOUR RESPONSE FOR A NON-TECHNICAL USER:
1. **Executive Summary**: A 2-sentence friendly greeting and status overview.
2. **The Fee Table**: Use a clean Markdown Table ( | Fee | USD | INR | ) for the 2026 costs.
3. **Checklist Categories**: Group documents into "Personal," "Financial," and "Educational" using bold headers.
4. **Action Buttons (Text)**: Instead of raw links, use clear labels like: [Click here to start your VFS Application].

STYLE RULES:
- Use CLEAR HEADINGS (H2 and H3).
- NO raw URL brackets in the middle of sentences.
- Use emojis sparingly to guide the eye (e.g., 💰 for fees, 📄 for documents).
- Cite sources at the very bottom in a "Data Verification" section."`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemMessage,
        },
        {
          role: 'user',
          content: userQuery,
        },
      ],
      model: 'groq/compound',
      temperature: 0.2, // Keeps responses focused and factual
      max_tokens: 2048, // Allows for detailed responses with structured information
    });

    return NextResponse.json({
      answer: chatCompletion.choices[0]?.message?.content || 'No response from AI.',
      exchangeRate: inrRate,
    });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response from AI' },
      { status: 500 }
    );
  }
}
