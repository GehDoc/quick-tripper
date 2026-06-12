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
