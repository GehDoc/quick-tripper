# Spec: UI, SEO, and Analytics Enhancements (v1)

This specification outlines the improvements for desktop UI, general UI refinements, Umami analytics integration, SEO optimization, and a core pivot of the project goal towards "Point-to-Point" trip planning.

## 1. Problem Statement

The current UI is functional but lacks a "desktop-first" feel. More importantly, the project goal needs to be refined: instead of general itineraries, users want to plan specific trips from a starting point to an arrival, focusing on route proposals and arrival descriptions with minimal AI intervention. Additionally, there is no visitor tracking and minimal SEO metadata.

## 2. Proposed Changes

### 2.0 Core Mission Pivot: Point-to-Point Planning

- **Goal Update**: Quick-tripper is now a tool to plan trips one-by-one, from a starting point to an arrival (or point of interest).
- **AI Prompt Refinement**:
  - **Extraction Only**: AI focuses strictly on extracting/validating "Starting Point" and "Arrival" from user input.
  - **No AI Route Generation**: AI MUST NOT generate route descriptions or suggestions. Its only "map" task is to generate the correct Google Maps URL format using the extracted locations.
  - **Description Formatting**: "Arrival Description" should strictly follow user input, with only grammatical/syntax corrections and markdown formatting.
- **Google Maps Centrality**: Leverage Google Maps' native route proposal capabilities by ensuring the generated links use optimal parameters for multi-route suggestions.
- **README Update**: Rewrite the project description to align with this new focused goal.

### 2.1 UI/UX Refinements

- **Desktop Layout**:
  - Implement a responsive layout using a sidebar for desktop (`lg:flex lg:flex-row`).
  - Sidebar will house `WorkspaceActions` and a new `TripHistory` component (refactored from `TripNavigator`).
  - Main area will house `Navbar`, `GenerationForm`, and `TripViewer`.
- **Generation Form**:
  - Refactor to potentially include explicit fields for "Start" and "Arrival" to improve accuracy, or keep it as a single prompt but with clearer instructions.
  - Update CTA to "Plan Trip".
- **Aesthetics**:
  - Update `TripViewer` with better typography and spacing.
  - Enhance `GenerationForm` with a more prominent CTA.
  - Improve transitions and hover states across the app.

### 2.2 Umami Analytics Integration

- Add Umami tracking script to `src/app/layout.tsx`.
- Implement event tracking for:
  - `trip_planned`: When a user successfully generates a trip.
  - `trip_shared`: When the share button is clicked.
  - `trip_exported`: When the export button is clicked.
  - `trip_deleted`: When a trip is deleted.

### 2.3 SEO Optimization

- Expand the `metadata` object in `src/app/layout.tsx`:
  - Add `openGraph` and `twitter` card support.
  - Refine `title` and `description` for better CTR.
  - Add `keywords` (e.g., "Private AI Travel", "Point-to-Point Planner", "Zero-Backend Trip Planner").
- Ensure semantic HTML tags (e.g., `<main>`, `<aside>`, `<header>`, `<footer>`).

### 2.4 Educational Content & Discovery

- **Project Concept**: Clearly communicate the "Free & Private" philosophy (MIT license, free-tier AI inference, zero-tracking, BYOK).
- **Help & Samples**: Provide "How-to" guides and sample trip prompts to help users get started.
- **Navigation & Architecture**:
  - Transition to a standard navigation system (e.g., Header/Footer with links).
  - If needed for clarity/SEO, create dedicated pages (e.g., `/about`, `/how-to`) instead of a single-page anchor system.
  - Implement a `sitemap.xml` and `robots.txt` for search engine indexing.
  - Ensure a clean, professional aesthetic for these content-heavy sections.

## 3. Implementation Plan

### Phase 1: Research & Setup

- [x] Identify Umami Script URL and Website ID: `5dc1b700-3859-4cc3-9354-d98f461d39f8`.
- [ ] Research optimal SEO keywords for "Point-to-Point Trip Planner" and "Private AI Travel".
- [ ] Draft the new `SYSTEM_PROMPT` for the AI service.
- [ ] Map out the site structure (Home, About, How-to, Sitemap).

### Phase 2: Core Pivot, SEO & Navigation

- [ ] Update `README.md` with the new project goal and philosophy.
- [ ] Update `src/app/layout.tsx` with enhanced metadata, Umami script, and navigation components.
- [ ] Create `public/sitemap.xml` and `public/robots.txt`.
- [ ] Implement the refined AI prompt in `src/services/ai.ts`.

### Phase 3: UI & Content Implementation

- [ ] Create content pages/sections for "About" and "How-to".
- [ ] Create `src/components/TripHistory.tsx` to replace/enhance `TripNavigator`.
- [ ] Refactor `src/app/page.tsx` for responsive sidebar layout.
- [ ] Apply aesthetic refinements and Umami event tracking.

### Phase 4: Validation

- [ ] Run `npm run check` (Linting, Types, Tests).
- [ ] Add unit tests for `TripHistory`.
- [ ] Verify Umami events in browser console.

## 4. Technical Constraints

- No new heavy dependencies.
- Maintain "Zero-Backend" and "Privacy-First" principles.
- Ensure 100% mobile compatibility.

## 5. Success Criteria

- [ ] Project mission is clearly reflected in README and UI.
- [ ] AI generates accurate route proposals from start to arrival.
- [ ] App looks modern and efficient on desktop (sidebar layout).
- [ ] Umami script is loading and events are firing.
- [ ] SEO metadata includes OG and Twitter tags.
- [ ] All tests pass.
