# Spec: Integrate E2E Tests into CI/CD (v1)

## Overview

Include E2E tests (`npm run test:e2e`) in the `npm run check` script and ensure they run in GitHub Actions CI.

## Scope

1.  **Scripts**: Add `test:e2e` to `npm run check` in `package.json`.
2.  **CI**: Update `.github/workflows/ci.yml` to run Playwright E2E tests.

## Verification

1.  Run `npm run check` locally to ensure it now includes E2E tests.
2.  Verify CI workflow runs E2E tests.
