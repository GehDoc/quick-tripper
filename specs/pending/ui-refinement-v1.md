# Spec: UI/UX Refinement & "Point-to-Point" Polish (v1)

This specification addresses the identified flaws in the current "Point-to-Point" implementation, focusing on workflow efficiency, mobile usability, and professional UI standards.

## 1. User-Identified Flaws

- **Missing API Key Input**: The API key input has disappeared from the UI, preventing users from setting up their credentials.
- **Buggy Sidebar**: The left panel doesn't reflow content correctly when text is too long (causing overflow/cutoff) and wastes horizontal space.
- **Scrollbar & Footer Issues**: Multiple nested scrollbars are present, and the footer is in an "unknown status" (buggy positioning/scrolling).
- **AI Prompt Concerns**: User has potential concerns with the current prompt; agent MUST ask questions for feedback after user testing.

## 2. Agent-Identified Refinements

### 2.1 Workspace Flow & Layout

- **Mobile Sidebar**: Refactor `TripHistory` into a `drawer` (off-canvas) or move it below the main form to ensure the `GenerationForm` is immediately accessible.
- **State Persistence**: Ensure the `AppProvider` handles hydration and local storage synchronization flawlessly across all pages (`/`, `/about`, `/how-to`).

### 2.2 Functional Precision (Point-to-Point)

- **Explicit Inputs**: Refactor `GenerationForm` to include distinct fields for "Start" and "Arrival" to guarantee 100% Google Maps accuracy without relying on AI extraction.
- **Leg Chaining**: Add a "Plan Next Leg" button to the `TripViewer`. Clicking this will pre-fill the "Start" field of the next trip with the current "Arrival".

### 2.3 Aesthetics & Interaction

- **Transitions**: Implement smooth transitions (e.g., using CSS transitions or Framer Motion) when switching between trips in the history.
- **Visual Hierarchy**: Refine the `TripHistory` sidebar with better active states and hover effects.

## 3. Implementation Plan

### Phase 1: User Flaws & Input Refactoring

- [ ] Address the list of flaws provided by the user.
- [ ] Refactor `GenerationForm` with explicit "Start" and "Arrival" fields.

### Phase 2: Workflow & Layout

- [ ] Implement the "Plan Next Leg" feature.
- [ ] Fix the mobile sidebar/drawer layout issue.

### Phase 3: Polish & Validation

- [ ] Apply aesthetic refinements and transitions.
- [ ] Run full `npm run check` and update tests.

## 4. Success Criteria

- [ ] All user-identified flaws are resolved.
- [ ] The "Point-to-Point" workflow feels intuitive and robust.
- [ ] The app is highly usable on both desktop and mobile.
