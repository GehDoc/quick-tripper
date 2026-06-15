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
2. Do not include images.
3. Maps: Include a Google Maps direction URL: https://www.google.com/maps/dir/[START]/[STOP]/
4. Logistics: Do NOT infer travel time or distance unless the user provided a transportation mode.

JSON SCHEMA:
{
  "title": "Clean Trip Title",
  "start": "Starting Point",
  "stop": "End Point",
  "content": "Markdown itinerary here"
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
