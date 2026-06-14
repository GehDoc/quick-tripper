# Specification: Page Component Refactoring

## Goal

Refactor `src/app/page.tsx` to follow a clean architecture by extracting logic-heavy UI sections into "dumb", presentational components. This will improve testability, maintainability, and readability.

## Current State

The `Home` component in `src/app/page.tsx` is a "God Component" handling:

- State orchestration (via `useTrips`).
- API Key management and local storage syncing.
- AI Service calls.
- File I/O (JSON Import/Export).
- Complex Markdown rendering logic (including iframe security).
- Layout and styling.

## Proposed Architecture

Extract UI logic into 6 functional components in `src/components/`. The `Home` page will act as a "Smart Container" that manages data and passes handlers.

### 1. `Navbar`

- **Props**: `apiKey: string`, `onApiKeyChange: (val: string) => void`.
- **Content**: Logo, versioning, GitHub link, and API Token input.

### 2. `GenerationForm`

- **Props**: `prompt: string`, `onPromptChange: (val: string) => void`, `onGenerate: () => void`, `isLoading: boolean`, `error: string`.
- **Content**: Prompt input field and generation button.

### 3. `WorkspaceActions`

- **Props**: `totalTrips: number`, `onExport: () => void`, `onImport: (e: React.ChangeEvent<HTMLInputElement>) => void`, `onShare: () => void`.
- **Content**: Export, Import (with hidden file input), and Share buttons.

### 4. `TripNavigator`

- **Props**: `activeTrip: Trip`, `activeIndex: number`, `totalTrips: number`, `onNext: () => void`, `onPrev: () => void`.
- **Content**: Pagination controls and trip metadata (destination/date).

### 5. `TripViewer` (formerly TripContent)

- **Props**: `content: string`, `onDelete: () => void`.
- **Content**: Markdown renderer with custom components for Google Maps iframes and specialized link styling.

### 6. `EmptyState`

- **Props**: None.
- **Content**: Placeholder UI when no trips are present.

## Implementation Plan

This refactoring will be executed incrementally. For each component identified in the architecture:

1. **Extract**: Create the component in `src/components/`.
2. **Test**: Create a corresponding unit test (e.g., `src/components/__tests__/ComponentName.test.tsx`).
3. **Integrate**: Update `src/app/page.tsx` to use the new component.
4. **Verify & Commit**: Run `npm run check`, then commit and push the changes for that specific component.

### Execution Order:

1. [x] `EmptyState`
2. [x] `Navbar`
3. [ ] `GenerationForm`
4. [ ] `WorkspaceActions`
5. [ ] `TripNavigator`
6. [ ] `TripViewer`

## Branching Strategy

- **Branch**: `feat/refactor-page-components`
- **Commits**: Atomic commits for each component extraction + test suite.

## Testing Strategy

1.  **Unit Tests**: Create test files for each new component in `src/components/__tests__/` (if following project convention, or alongside the file).
    - Verify `GenerationForm` displays the loading spinner when `isLoading` is true.
    - Verify `TripViewer` correctly blocks non-Google Maps iframes.
    - Verify `WorkspaceActions` buttons are disabled when `totalTrips` is 0.
2.  **Regression Testing**: Run `npm run check` to ensure no type errors or linting regressions were introduced.
