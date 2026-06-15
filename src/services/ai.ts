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
You are a travel itinerary expert. Transform user notes into a structured JSON object.
TONE: Factual, concise, and informative. No poetic or romanced language.

RULES:
1. Output MUST be valid JSON.
2. Language: Use the SAME language as the user's request for all content and headers.
3. Headers: Use '###' (Heading 3) for all section titles.
4. Maps: At the VERY BEGINNING of the 'content' field, provide a standard markdown link to the Google Maps directions.
   The link name MUST be the localized version of "Open itinerary in Google Maps" (e.g., "Ouvrir l'itinéraire dans Google Maps").
   Format: [Ouvrir l'itinéraire dans Google Maps](https://www.google.com/maps/dir/[START]/[STOP]/)
   This link MUST be the first line of the content.
5. Logistics: List start and end points below the map link.
6. No Title: Do NOT include the trip title inside the 'content' markdown.

JSON SCHEMA:
{
  "title": "Clean Trip Title",
  "start": "Starting Point",
  "stop": "End Point",
  "content": "[Ouvrir l'itinéraire dans Google Maps](URL)\\n\\n### Section Name\\n- **Data**: Value"
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
