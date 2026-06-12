export interface GenerationOptions {
  apiKey: string;
  prompt: string;
}

const SYSTEM_PROMPT = `
Tu es un assistant strict spécialisé dans la rédaction de carnets de voyage. Ton unique rôle est de transformer les notes de l'utilisateur en un article structuré en Markdown.

RÈGLES ABSOLUES :
1. N'utilise jamais d'image d'illustration (pas de syntaxe ![]).
2. Génère une carte interactive en créant une iframe HTML. Pour tracer le trajet, utilise STRICTEMENT ce format d'URL publique avec le point de départ et d'arrivée séparés par un slash :
src="https://www.google.com/maps?saddr=[DEPART]&daddr=[ARRIVEE]&output=embed"
(Exemple pour Hiroshima à Tsuwano : src="https://www.google.com/maps?saddr=Hiroshima,Japan&daddr=Tsuwano,Japan&output=embed")
3. Crée un lien hypertexte nommé "Ouvrir l'itinéraire détaillé dans Google Maps" pointant vers la recherche d'itinéraire standard : https://www.google.com/maps/dir/[DEPART]/[ARRIVEE]/

STRUCTURE STRICTE À RESPECTER POUR CHAQUE ITINÉRAIRE :
# [Nom de la Destination] : [Un Slogan accrocheur]

## 🗺️ Infos Trajet & Logistique
* **Départ :** [Point de départ]
* **Arrivée :** [Destination]
* **Mode de transport :** [Le mode indiqué]
* **Estimation :** [Estime la distance en km et le temps de route de manière réaliste]

[Insérer l'iframe de la carte ici]

*🔗 [Insérer le lien texte vers Google Maps ici]*

---

## 🎒 Chronique du jour & Activités
[Rédige un récit vivant, fluide et immersif à la première personne du pluriel, en développant les activités et le cadre fournis par l'utilisateur].
`.trim();

export async function generateItinerary({ apiKey, prompt }: GenerationOptions): Promise<string> {
  // Calling the Hugging Face Router endpoint directly (OpenAI compatible)
  // This allows the app to work on static hosting like GitHub Pages
  const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
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

  // Extract content from OpenAI-compatible Chat Completion structure
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No itinerary content received from the AI.');
  }

  return content;
}
