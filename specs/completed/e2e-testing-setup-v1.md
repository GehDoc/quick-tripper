# Spec: E2E Testing Setup with Playwright (v1)

## Status

🟢 Completed

## Overview

Initialize Playwright E2E testing for Quick-tripper to ensure core functionality works end-to-end.

## Scope

- [x] **Installation**: Install `@playwright/test`.
- [x] **Configuration**: Create initial Playwright configuration in the root.
- [x] **Directory**: Create `e2e/` folder for test files.
- [x] **Tests**:
  - [x] `e2e/smoke.spec.ts`: Verify homepage loading, branding, and EmptyState.
  - [x] `e2e/golden-path.spec.ts`: Mock Hugging Face API, simulate user trip generation, verify output.
- [x] **Scripts**: Add `test:e2e` to `package.json`.
- [x] **Documentation**: Update `CONTRIBUTING.md` to include the new E2E testing strategy.

## Verification

- [x] Run tests using `npx playwright test`.
- [x] Ensure tests pass.
- [x] Add `test:e2e` to `package.json` and run.
- [x] Update `CONTRIBUTING.md`.

## Change Log

- 2026-06-13: E2E suite initialized, smoke and golden-path tests implemented, `package.json` and `CONTRIBUTING.md` updated. Tests verified passing.
