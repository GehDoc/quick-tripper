# Spec: UX, Performance, and Inference Refinement

**Status**: 🟡 In Progress
**Author**: Gemini CLI
**Date**: 2026-06-14

## 1. Overview

This specification covers improvements to the user experience (UX), application performance, and AI inference quality. We are migrating from Hugging Face to **Gemini (Google AI)** to leverage its superior reasoning and **Google Search grounding** for real-time travel data. The goal is to provide a more robust prompt input, reduce unnecessary re-renders, and extract structured data from the AI.

## 2. Goals

- **UX**: Expand the prompt input area to allow for detailed descriptions using a `textarea`.
- **Performance**: Prevent `TripViewer` and other static components from re-rendering during user typing.
- **Inference**:
  - **Migrate to Gemini**: Use `gemini-1.5-flash` or `gemini-1.5-pro` via Google AI Studio.
  - **Google Search Grounding**: Enable the `google_search_retrieval` tool to fetch live travel information (opening hours, current events).
  - **Structured JSON**: Extract `title`, `start`, `stop`, and `content` properties.
  - **Tone**: Favor factual, concise, and useful information over "romanced" descriptions.
- **Storage**: Update the `Trip` data structure to v2 and implement migration.

## 3. Technical Changes

### 3.1 Data Model (`src/types/trip.ts`)

- Update `Trip` interface:
  ```typescript
  export interface Trip {
    id: string;
    prompt: string; // Original user input
    title: string; // AI-generated clean title
    start?: string; // Extracted start point
    stop?: string; // Extracted end point
    content: string; // Markdown content
    createdAt: string;
  }
  ```
- Bump `CURRENT_VERSION` to `2` in `src/utils/migration.ts`.

### 3.2 AI Service (`src/services/ai.ts`)

- **API Switch**: Replace Hugging Face fetch call with Google AI REST API (`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`).
- **Google Search Integration**:
  - Include the `tools` parameter in the request body:
    ```json
    "tools": [{
      "google_search_retrieval": {
        "dynamic_retrieval_config": {
          "mode": "MODE_DYNAMIC",
          "dynamic_threshold": 0.3
        }
      }
    }]
    ```
- **Prompt Engineering**:
  - Update `SYSTEM_PROMPT` to enforce JSON output.
  - Instruct the AI to use its search capability to verify locations and routes.
  - Standardize map rendering by outputting standard Google Maps URLs which the client will render.

### 3.3 Components

#### 3.3.1 `GenerationForm.tsx`

- Replace `input type="text"` with a `textarea`.
- Implement auto-resizing or a fixed larger height (e.g., 3-4 rows).
- Ensure the "Generate" button remains accessible and looks good with the larger input.

#### 3.3.2 `TripViewer.tsx`

- Memoize the component using `React.memo` to prevent re-renders when the parent state (`prompt`) changes.
- Update `ReactMarkdown` components:
  - Intercept specific links (e.g., Google Maps URLs) and render them as iframes.
  - This provides better security and control over how maps are displayed.
  - Add support for displaying search citations/sources if provided by Gemini.

#### 3.3.3 `TripNavigator.tsx`

- Memoize the component.
- Display `trip.title` instead of `trip.destination`.

#### 3.3.4 `Home` (`src/app/page.tsx`)

- Update `handleGeneration` to process the new structured AI response.
- Update `addTrips` usage to include the new fields.

### 3.4 Migration (`src/utils/migration.ts`)

- Implement migration logic from `v1` to `v2`.
- `destination` (v1) -> `title` (v2) and `prompt` (v2).
- `start` and `stop` will be `undefined` for migrated trips.

### 3.5 Documentation Improvements

#### 3.5.1 `README.md`

- **How-to Use**: Add a clear step-by-step guide for users.
- **Privacy & BYOK**: Elaborate on the "Bring Your Own Key" model. Provide instructions on obtaining a Gemini API key from Google AI Studio.
- **Search Grounding**: Explain the benefits of live data (opening hours, fresh events) provided by Google Search integration.
- **Clean Up**: Remove deployment instructions (move to `CONTRIBUTING.md`).

#### 3.5.2 `CONTRIBUTING.md`

- **Deployment**: Add the "Deployment" section moved from `README.md`, explaining how `npm run deploy` works for GitHub Pages.

#### 3.5.3 `docs/ARCHITECTURE.md`

- **AI Integration**: Update to reflect the shift from Hugging Face (Llama 3) to Gemini 1.5.
- **Grounding Architecture**: Document how Google Search grounding is integrated into the inference flow to ensure data freshness.
- **V2 Schema**: Document the `Trip` v2 schema and the migration path.

## 4. Performance Optimization Strategy

- Use `React.memo` on all major child components of `Home`.
- Since `Home` holds the `prompt` state, typing in the prompt triggers a re-render of `Home`. Memoization will ensure that children only re-render if their specific props change.

## 5. Verification Plan

### 5.1 Unit Tests

- `migration.test.ts`: Verify v1 to v2 migration.
- `ai.test.ts`: Verify JSON parsing and structured data extraction.
- `GenerationForm.test.tsx`: Verify textarea rendering and change handling.
- `TripViewer.test.tsx`: Verify map URL to iframe rendering.

### 5.2 Manual Verification

- Type in the prompt and observe (via React DevTools or logging) that `TripViewer` does not re-render.
- Generate a trip and verify that the title is clean and start/stop points are stored.
- Verify that the map is correctly rendered from a URL provided by the AI.
- Verify that old trips are migrated correctly on load.
