/* eslint-disable @typescript-eslint/no-explicit-any */
import CardBenefit from '@/models/CardBenefit';

export async function generateCardBenefitsAI(bank: string, variant: string, network: string): Promise<any[]> {
  const baseUrl = process.env.OLLAMA_BASE_URL;
  const model = process.env.OLLAMA_MODEL || 'gemma3:12b';
  const apiKey = process.env.OLLAMA_API_KEY;

  if (!baseUrl || !apiKey) {
    console.warn('AI Credentials not configured in environment. Skipping AI generation.');
    return [];
  }

  const url = `${baseUrl}/v1/chat/completions`;
  console.log(`[AI] Generating benefits for: ${bank} ${variant} using model ${model}...`);

  const prompt = `You are a credit card expert.
Analyze and identify the correct credit card benefits for:
Bank: ${bank}
Variant: ${variant}

You must return a valid JSON Array containing the benefits of this card.
Cover these categories if they exist: 'cashback', 'lounge', 'rewards', 'dining', 'fuel', 'milestone'.
Each benefit object must contain:
- category: one of 'cashback', 'lounge', 'rewards', 'dining', 'fuel', 'milestone'
- title: a short, specific title (e.g., '5% Online Cashback', 'Unlimited Lounge Access')
- description: a clear, detailed explanation of the benefit and how to earn/use it
- value: a short summary of its value (e.g., '5%', 'Unlimited', 'Rs. 2,000 Off')
- conditions: any caps, restrictions, or exclusions (empty string if none)

You MUST respond with a valid JSON Array and nothing else. Do not include markdown code block formatting (like \`\`\`json). The output must start with [ and end with ].`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!res.ok) {
      throw new Error(`AI API responded with status ${res.status}`);
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('AI returned an empty response content');
    }

    // Clean up markdown block format if present
    let cleaned = content;
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim();
    }

    const parsedBenefits = JSON.parse(cleaned);
    if (!Array.isArray(parsedBenefits)) {
      throw new Error('AI response is not a valid JSON Array');
    }

    console.log(`[AI] Successfully generated ${parsedBenefits.length} benefits for ${bank} ${variant}.`);

    // Prepare records for database insertion
    const recordsToInsert = parsedBenefits.map((b: any) => ({
      bank,
      variant,
      network: network || 'Visa',
      category: b.category || 'rewards',
      title: b.title || 'Exclusive Benefit',
      description: b.description || '',
      value: b.value || '',
      conditions: b.conditions || ''
    }));

    // Bulk insert new benefits to database so next calls fetch instantly from DB
    const inserted = await CardBenefit.insertMany(recordsToInsert);
    return inserted;
  } catch (err: any) {
    console.error(`[AI Error] Failed to generate benefits for ${bank} ${variant}:`, err);
    return [];
  }
}
