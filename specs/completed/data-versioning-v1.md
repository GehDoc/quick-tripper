# Specification: Data Contract Versioning

## Goal

Implement versioning for `localStorage` and URL payloads to facilitate future data structure migrations.

## Current State

- `localStorage` key: `saved_trips` -> `Trip[]`
- URL payload: `compressed(JSON.stringify(Trip[]))`

## Proposed Architecture

1. **Schema Envelope**:
   ```typescript
   interface VersionedPayload<T> {
     version: number;
     data: T;
   }
   ```
2. **Versioning Logic**:
   - `CURRENT_VERSION = 1`
   - If no `version` field is present, assume `version 0` (legacy format).
   - `migrate(payload: unknown): VersionedPayload<Trip[]>`:
     - Detect version.
     - Apply sequential migrations (e.g., `migrateV0ToV1`, `migrateV1ToV2`) until `version == CURRENT_VERSION`.

## Implementation Plan

- Create `src/utils/migration.ts` to hold migration functions and `VersionedPayload` type.
- Update `src/utils/share.ts` to wrap/unwrap `VersionedPayload`.
- Update `src/hooks/useTrips.ts` to wrap/unwrap `localStorage` using the new utility.
- Ensure that `migrate` handles legacy data (v0) gracefully without transformation, merely wrapping it into a `v1` structure if needed.

## Testing Strategy

1. **Unit Testing (`vitest`)**
   - Migration logic: Test legacy (v0), current (v1), and invalid data.
   - Serialization/Deserialization: Verify integrity of `VersionedPayload` round-trips.
2. **Integration Testing**
   - Mock `localStorage`: Verify v0 data in `localStorage` migrates to v1 on hook initialization.
   - URL handling: Verify legacy and versioned payloads correctly parse into `Trip[]`.
3. **Edge Cases**
   - Test empty initialization and schema mismatches.
