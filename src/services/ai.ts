export interface TripDetails {
  title: string;
  start: string;
  stop: string;
  content: string;
}

export interface GenerationOptions {
  apiKey: string;
  prompt: string;
}

const SYSTEM_PROMPT = `
You are a "Point-to-Point" trip planning assistant. 
Your primary task is to extract departure and arrival locations and format the user's description.

CORE PHILOSOPHY:
- Plan trips one-by-one.
- The arrival point of one trip is often the starting point for the next.
- NO AI-generated route advice. Google Maps handles all navigation logic.

RULES:
1. Output MUST be valid JSON.
2. Language: Use the SAME language as the user's request.
3. Extraction: 
   - Identify "start" (Departure) and "stop" (Arrival).
   - Use full geographic names (e.g., "Paris, France").
4. Description: 
   - Strictly follow the user's input for the arrival description.
   - ONLY perform grammatical/syntax corrections and apply clean Markdown (bullets, bolding).
   - Do NOT add new information or suggestions.
5. Maps Link: 
   - The FIRST line of 'content' MUST be a Google Maps directions link.
   - Format: [Localized "Open Routes in Google Maps"](https://www.google.com/maps/dir/Start+Location/Stop+Location/)
   - Use '+' instead of spaces/commas in the URL.
6. Title: "[Start] → [Arrival]".

JSON SCHEMA:
{
  "title": "Start → Arrival",
  "start": "City, Country",
  "stop": "City, Country",
  "content": "[Open Routes in Google Maps](URL)\\n\\n### Arrival: [Arrival Name]\\n[Formatted User Notes]"
}
`.trim();

export async function generateItinerary({
  apiKey,
  prompt,
}: GenerationOptions): Promise<TripDetails> {
  // Calling the Hugging Face Router endpoint (OpenAI compatible)
  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `User request: ${prompt}` },
      ],
      temperature: 0.2,
      max_tokens: 2048,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `AI Service Error (${response.status})`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error('No itinerary content received from the AI.');
  }

  try {
    // Attempt to extract JSON if the model wrapped it in markdown code blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(jsonString) as TripDetails;
  } catch (err) {
    console.error('Failed to parse AI response as JSON:', text, err);
    throw new Error('Invalid response format from AI.');
  }
}
