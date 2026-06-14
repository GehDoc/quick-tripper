# Quick-tripper Architecture

## Data Contract Versioning

To ensure maintainability and support future data structure migrations, the application uses a versioned data contract for both `localStorage` and URL shareable payloads.

### The Envelope Pattern

All persisted or shared data is wrapped in a versioned envelope to prevent direct coupling between the data format and the application logic.

```typescript
// Generic envelope structure
export type Envelope<T, V extends number> = { version: V; data: T };
```

### Migration Flow

The `migrateToLatest` utility acts as the single point of entry for de-serializing data. It automatically detects the version and upgrades legacy or older-versioned data to the latest supported version before it reaches the application state.

1.  **Read/Parse**: Data is retrieved and parsed from `localStorage` or URL params.
2.  **Detection**: `migrateToLatest` identifies if the data is a raw `Trip[]` (Legacy v0) or an `Envelope` (v1+).
3.  **Upgrade**: If necessary, it chains migration functions (e.g., `v0 -> v1 -> v2`) until `CURRENT_VERSION` is reached.
4.  **Usage**: The application always receives the latest format.

### How to Create a New Version (vN)

When the `Trip` data structure changes in a breaking way, follow these steps to perform a migration:

1.  **Define the New Format**:
    - Update `src/types/trip.ts` with the new structure.
2.  **Update Migration Utility (`src/utils/migration.ts`)**:
    - Increment `CURRENT_VERSION` to `N`.
    - Define a new concrete envelope type for vN (e.g., `type VersionedTripEnvelopeV2 = Envelope<TripV2[], 2>`).
    - Create a migration function `migrateV<N-1>ToV<N>(data: Trip<N-1>[]): Trip<N>[]`.
    - Update `migrateToLatest` to handle the new version in the migration chain.
3.  **Update `isVersionedEnvelope`**:
    - Update the type guard to include support for the new version number.
4.  **Update `useTrips.ts`**:
    - Ensure that any new properties or structural changes are handled during the hook's initialization or `addTrips`/`deleteTrip` methods if needed.
5.  **Test**:
    - Add test cases in `src/tests/migration.test.ts` to verify the upgrade path from `v<N-1>` to `v<N>`.

## Component Architecture

The project follows a **Smart Container & Dumb Presenter** pattern (Clean Architecture) to ensure high testability and separation of concerns.

### Smart Containers (Pages/Hooks)

- **Role**: Data orchestration, service invocation (API calls), and state management.
- **Location**: Found in `src/app/` (Pages) and `src/hooks/`.
- **Responsibility**: They do not contain complex UI logic or styling. They pass data and event handlers down to presentational components.

### Dumb Presenters (Components)

- **Role**: Visual representation and user interaction.
- **Location**: Found in `src/components/`.
- **Responsibility**: They are "stateless" (logic-lite) and rely entirely on props. They must be easily unit-testable in isolation using Vitest and React Testing Library.

### Testing Co-location

To maintain architectural clarity, every presentational component MUST have a co-located unit test file (e.g., `src/components/MyComponent.test.tsx`).

## SSR and Hydration Strategy

To maintain a "zero-backend" architecture using Next.js (SSR), we must ensure that the server-rendered HTML and client-rendered UI are identical during the initial mount.

### The "Empty-First" Hydration Pattern

1.  **Initial State**: All components using `localStorage` or browser-native APIs must initialize with a default "empty" state (e.g., `[]` for trips, `''` for API keys).
2.  **Server Rendering**: The server renders the page using these empty defaults.
3.  **Client Hydration**: The client initially renders the same empty state, preventing a mismatch.
4.  **Client Mounting**: After the component mounts on the client, a `useEffect` hook is triggered to safely read from `localStorage` and update the state.
5.  **Re-render**: React performs a controlled update, populating the UI with the retrieved data.

_This pattern is mandatory for all components accessing persistent browser storage to avoid React hydration errors._
