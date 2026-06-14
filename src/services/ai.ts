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
You are a strict assistant specialized in writing travel journals.
Your goal is to transform user notes into a structured JSON object.

RULES:
1. Use Google Search to verify locations, opening hours, and routes.
2. The content must be factual, concise, and useful. Avoid flowery "romanced" language.
3. NEVER use illustration images.
4. For maps, include a standard Google Maps URL in the markdown content.
   Format: https://www.google.com/maps/dir/[START]/[STOP]/
5. Output MUST be a valid JSON object with the following fields:
   - title: A clean, catchy title for the trip.
   - start: The starting point of the journey.
   - stop: The final destination.
   - content: The itinerary in Markdown format.

MARKDOWN STRUCTURE FOR 'content':
## 🗺️ Logistics
* **Start:** [Start]
* **End:** [Stop]
* **Estimation:** [Distance in km and driving time]

[Google Maps URL here]

---
## 🎒 Itinerary
[Day by day description, concise and factual]
`.trim();

export async function generateItinerary({
  apiKey,
  prompt,
}: GenerationOptions): Promise<TripDetails> {
  const model = 'models/gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }, { text: `User request: ${prompt}` }],
        },
      ],
      tools: [
        {
          google_search_retrieval: {
            dynamic_retrieval_config: {
              mode: 'MODE_DYNAMIC',
              dynamic_threshold: 0.3,
            },
          },
        },
      ],
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Gemini API Error (${response.status})`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('No content received from Gemini.');
  }

  try {
    return JSON.parse(text) as TripDetails;
  } catch {
    console.error('Failed to parse Gemini response as JSON:', text);
    throw new Error('Invalid response format from AI.');
  }
}
