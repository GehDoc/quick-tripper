# Spec: UX, Performance, and Inference Refinement (v2)

**Status**: 🔴 Pending
**Author**: Gemini CLI
**Date**: 2026-06-15

## 1. Overview & Rationalization

This specification is a direct continuation of `v1`. After implementing the UI components and Data Model (v2), we are pivoting the **Inference Engine** back to **Hugging Face** while retaining all UX and performance improvements planned in the original spec.

### Reasons for the Pivot:

1. **API Reliability**: Hugging Face's OpenAI-compatible router is simpler and more stable for our serverless architecture.
2. **Sustainability**: Google Search grounding consumes API credits too quickly, making the BYOK model less viable for users.
3. **Data Scope**: Real-time data (opening hours, current events) is a "nice-to-have" but not a core requirement. Factual, static travel suggestions are sufficient.

## 2. Goals (Carried over & Updated)

- **UX**: Retain the `textarea` for richer prompts (Implemented in v1).
- **Performance**: Retain `React.memo` and optimization strategy to prevent re-renders (Implemented in v1).
- **Inference (Updated)**:
  - **Revert to Hugging Face**: Use `meta-llama/Llama-3.1-8B-Instruct`.
  - **Structured JSON**: Enforce JSON output in the system prompt.
  - **Fact over Romance**: Standardize on a factual tone.
  - **Simplified Logistics**: Only infer duration/distance if explicitly requested and transportation is specified.
- **Maps**: Retain the **automatic iframe rendering** logic from v1. The application will detect standard Google Maps direction URLs and transform them into embedded iframe views for a seamless visual experience.

## 3. Technical Changes

### 3.1 AI Service (`src/services/ai.ts`)

- Revert endpoint to `https://router.huggingface.co/v1/chat/completions`.
- Update `SYSTEM_PROMPT` to:
  - Demand valid JSON matching the `TripDetails` interface.
  - Remove Search Grounding instructions.
  - Instructions to use `https://www.google.com/maps/dir/[START]/[STOP]/` for maps.

### 3.2 System Prompt Refinement

```typescript
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
`;
```

### 3.3 Documentation & UI

- Revert "Gemini" branding to "Hugging Face" in:
  - `README.md`
  - `CONTRIBUTING.md`
  - `docs/ARCHITECTURE.md`
  - `src/components/Navbar.tsx` (Placeholder text).

### 3.4 UI and Prompt Refinement (Final Polish)

To align the visual quality with the structured data, we will:

1.  **Prompt**: Remove redundant prefixes (e.g., "Google Maps:") and mandate `###` for all section headers. Ensure the AI uses the user's language for all headers.
2.  **UI**: Remove the redundant `{trip.title}` rendering inside `TripViewer`.
3.  **Typography**: Update `TripViewer.tsx` to include explicit Tailwind utility overrides for `h3` and `li` tags to fix the "flat" appearance of the `prose` class.

## 4. Task List

- [x] Revert `src/services/ai.ts` to Hugging Face Router.
- [x] Refine `SYSTEM_PROMPT` for Llama 3.1.
- [x] Update documentation to restore Hugging Face branding.
- [x] Update unit tests for `ai.ts`.
- [x] Implement strict sanitization in `TripViewer.tsx` using `rehype-sanitize`.
- [x] Update `ARCHITECTURE.md`, `CONTRIBUTING.md`, and `README.md` with security details.
- [ ] Implement UI Polish (Remove redundant title, fix `prose` scaling).
- [ ] Refine `SYSTEM_PROMPT` to remove redundant labels and enforce language consistency.
- [ ] Final verification pass (`npm run check`).

## 5. Verification Plan

- **Unit Testing**: Update `ai.test.ts` to mock the OpenAI-compatible response.
- **Integration Testing**: Verify the `Home` component handles the Hugging Face JSON response correctly.
- **Manual Verification**: Confirm "Hugging Face" branding is visible in the UI and README.
