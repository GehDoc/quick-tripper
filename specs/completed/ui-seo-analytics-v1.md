# Spec: UI, SEO, and Analytics Enhancements (v1)

This specification outlines the improvements for desktop UI, general UI refinements, Umami analytics integration, SEO optimization, and a core pivot of the project goal towards "Point-to-Point" trip planning.

## 1. Problem Statement

The current UI is functional but lacks a "desktop-first" feel. More importantly, the project goal needs to be refined: instead of general itineraries, users want to plan specific trips from a starting point to an arrival, focusing on route proposals and arrival descriptions with minimal AI intervention. Additionally, there is no visitor tracking and minimal SEO metadata.

## 2. Proposed Changes

### 2.0 Core Mission Pivot: Point-to-Point Planning

- [x] **Goal Update**: Quick-tripper is now a tool to plan trips one-by-one, from a starting point to an arrival (or point of interest).
- [x] **AI Prompt Refinement**:
  - [x] **Extraction Only**: AI focuses strictly on extracting/validating "Starting Point" and "Arrival" from user input.
  - [x] **No AI Route Generation**: AI MUST NOT generate route descriptions or suggestions. Its only "map" task is to generate the correct Google Maps URL format using the extracted locations.
  - [x] **Description Formatting**: "Arrival Description" should strictly follow user input, with only grammatical/syntax corrections and markdown formatting.
- [x] **Google Maps Centrality**: Leverage Google Maps' native route proposal capabilities by ensuring the generated links use optimal parameters for multi-route suggestions.
- [x] **README Update**: Rewrite the project description to align with this new focused goal.

### 2.1 UI/UX Refinements

- [x] **Desktop Layout**:
  - [x] Implement a responsive layout using a sidebar for desktop (`lg:flex lg:flex-row`).
  - [x] Sidebar will house `WorkspaceActions` and a new `TripHistory` component (refactored from `TripNavigator`).
  - [x] Main area will house `Navbar`, `GenerationForm`, and `TripViewer`.
- [x] **Generation Form**:
  - [x] Refactor to potentially include explicit fields for "Start" and "Arrival" to improve accuracy, or keep it as a single prompt but with clearer instructions.
  - [x] Update CTA to "Plan Trip".
- [x] **Aesthetics**:
  - [x] Update `TripViewer` with better typography and spacing.
  - [x] Enhance `GenerationForm` with a more prominent CTA.
  - [x] Improve transitions and hover states across the app.

### 2.2 Umami Analytics Integration

- [x] Add Umami tracking script to `src/app/layout.tsx`.
- [x] Implement event tracking for:
  - [x] `trip_planned`: When a user successfully generates a trip.
  - [x] `trip_shared`: When the share button is clicked.
  - [x] `trip_exported`: When the export button is clicked.
  - [x] `trip_deleted`: When a trip is deleted.

### 2.3 SEO Optimization

- [x] Expand the `metadata` object in `src/app/layout.tsx`:
  - [x] Add `openGraph` and `twitter` card support.
  - [x] Refine `title` and `description` for better CTR.
  - [x] Add `keywords` (e.g., "Private AI Travel", "Point-to-Point Planner", "Zero-Backend Trip Planner").
- [x] Ensure semantic HTML tags (e.g., `<main>`, `<aside>`, `<header>`, `<footer>`).
- [x] Implement a `sitemap.xml` and `robots.txt` for search engine indexing.

### 2.4 Educational Content & Discovery

- [x] **Project Concept**: Clearly communicate the "Free & Private" philosophy (MIT license, free-tier AI inference, zero-tracking, BYOK).
- [x] **Help & Samples**: Provide "How-to" guides and sample trip prompts to help users get started.
- [x] **Navigation & Architecture**:
  - [x] Transition to a standard navigation system (e.g., Header/Footer with links).
  - [x] If needed for clarity/SEO, create dedicated pages (e.g., `/about`, `/how-to`) instead of a single-page anchor system.
  - [x] Ensure a clean, professional aesthetic for these content-heavy sections.

## 3. Implementation Plan

### Phase 1: Research & Setup

- [x] Identify Umami Script URL and Website ID: `5dc1b700-3859-4cc3-9354-d98f461d39f8`.
- [x] Research optimal SEO keywords for "Point-to-Point Trip Planner" and "Private AI Travel".
- [x] Draft the new `SYSTEM_PROMPT` for the AI service.
- [x] Map out the site structure (Home, About, How-to, Sitemap).

### Phase 2: Core Pivot, SEO & Navigation

- [ ] Update `README.md` with the new project goal and philosophy.
- [x] Update `src/app/layout.tsx` with enhanced metadata, Umami script, and navigation components.
- [x] Create `public/sitemap.xml` and `public/robots.txt`. (Handled by `src/app/sitemap.ts` and `src/app/robots.ts`)
- [x] Implement the refined AI prompt in `src/services/ai.ts`.

### Phase 3: UI & Content Implementation

- [x] Create content pages/sections for "About" and "How-to".
- [x] Create `src/components/TripHistory.tsx` to replace/enhance `TripNavigator`.
- [x] Refactor `src/app/page.tsx` for responsive sidebar layout.
- [x] Apply aesthetic refinements and Umami event tracking.

### Phase 4: Validation

- [x] Run `npm run check` (Linting, Types, Tests).
- [x] Add unit tests for `TripHistory`.
- [ ] Verify Umami events in browser console.

## 4. Technical Constraints

- [x] No new heavy dependencies.
- [x] Maintain "Zero-Backend" and "Privacy-First" principles.
- [x] Ensure 100% mobile compatibility.

## 5. Success Criteria

- [ ] Project mission is clearly reflected in README and UI.
- [x] AI generates accurate route proposals from start to arrival.
- [x] App looks modern and efficient on desktop (sidebar layout).
- [x] Umami script is loading and events are firing.
- [x] SEO metadata includes OG and Twitter tags.
- [x] All tests pass.
