# Release 0.2.0 - Clean Architecture & E2E Testing Suite

**Punchline**: This release completes the transition to a "Smart Container & Dumb Presenter" architecture for the main page, significantly improving testability and code quality. It also introduces a robust E2E testing suite powered by Playwright.

## 🚀 New Features

- **Clean Architecture**: Refactored the monolithic `Home` page into 6 specialized, presentational components (`Navbar`, `GenerationForm`, `WorkspaceActions`, `TripNavigator`, `TripViewer`, `EmptyState`).
- **E2E Testing Suite**: Integrated Playwright for cross-browser validation, including Smoke and Golden Path tests.

## 🛠 Improvements

- **Separation of Concerns**: Isolated UI rendering logic from data orchestration.
- **Improved Security**: Whitelisted and unit-tested iframe rendering for Google Maps.
- **Developer Experience**: Codified incremental development and co-located testing protocols.

## 🧪 Testing & Quality

- Added 26 unit tests for presentational components.
- Verified zero regressions via automated E2E "Golden Path" flows.

## 📝 Documentation

- Updated `ARCHITECTURE.md` with Component Architecture guidelines.
- Refined `CONTRIBUTING.md` and `AGENTS.md` with multi-tiered testing and branching protocols.
