# Contributing to Quick-tripper

Thank you for your interest in contributing! We follow a **Spec-Driven Development (SDD)** approach to ensure high quality and clarity.

## 🧭 Project Navigation

- **User Instructions**: See [README.md](./README.md).
- **AI Agent Protocol**: See [AGENTS.md](./AGENTS.md).
- **Architecture**: See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).
- **Active Roadmap**: Check [specs/pending/](./specs/pending/).

## 💻 Coding Standards

- **No Inline Styles**: To ensure maintainability and style consistency, inline styles (`style={{ ... }}`) are prohibited in production components. Use Tailwind classes exclusively.

## 🔄 Workflow & Automation

### 🚦 Type Safety & Commit Hooks

To prevent the introduction of breaking changes, the project uses **Husky** to enforce type safety:

- **Pre-commit**: The `.husky/pre-commit` hook automatically runs `npm run check:fast` (lint, format, type-check). Commits will fail if any errors are detected.

### 🤖 Starting with an AI Agent (Recommended)

To initiate a new feature, simply provide the following command to your AI collaborator:

> "Read AGENTS.md and start a plan for GitHub Issue #XX"

**The Agent will automatically:**

1. Create a new branch: `feat/XX-short-description`.
2. Initialize the spec file in `specs/pending/` from the template.
3. Commit the initial spec to the branch and wait for your approval.

### 🧑‍💻 Manual Workflow

If working without an agent, follow these steps to keep the project state synchronized:

1.  **Branching**: Create a feature branch from `main`: `git checkout -b feat/XX-description` (or `feat/description` if not linked to an issue).
2.  **Spec-First**: Create a Spec file in `specs/pending/` using the [specs/template.md](./specs/template.md).
3.  **Implement & Trace**: Write code, keeping the spec's **Task List** `[x]` updated. Update the **Technical Strategy** if the approach deviates from the plan.
4.  **Verify**:
    - Ensure all tasks in the spec are marked as complete.
    - Run the full verification suite: `npm run check`.
    - Document the successful verification in the spec's **Change Log**.
5.  **Archive**: Update the **Status** to `🟢 Completed`, move the spec to `specs/completed/`, and merge your branch.

## 🛠 Development Commands

| Command              | Description                                          |
| :------------------- | :--------------------------------------------------- |
| `npm run check`      | Full suite: Lint, Format, Type-check, and Unit tests |
| `npm run check:fast` | Fast checks: Lint, Format, and Type-check            |
| `npm run fix`        | Automatically fix linting and formatting issues      |
| `npm run test`       | Run unit tests with Vitest                           |
| `npm run test:e2e`   | Run E2E tests with Playwright                        |
| `npm run type-check` | Validate TypeScript types                            |

## 🧪 Testing Strategy

Beyond end-to-end testing, we use a multi-tiered strategy for component, accessibility, and visual validation:

1. **Unit Tests (`*.test.[ts|tsx]`)**: Validate logic, utilities, and basic component interaction using Vitest and JSDOM. These are fast and do not require a browser.
   - **Co-location**: Unit tests MUST be co-located with the source file they test (e.g., `src/components/Button.test.tsx` for `src/components/Button.tsx`).
   - **Command**: `npm run test` (or `npm run check` for the full suite).
2. **Visual Regression Tests (`*.spec.[ts|tsx]`)**: Validate component-level rendering and pixel-perfect consistency in a real browser (Chromium) using Playwright.
   - **Location**: Co-located with the component, similar to unit tests, but using the `.spec` suffix.
   - **Command**: `npm run test:visual` (Future capability).
3. E2E Tests (`e2e/*.spec.ts`): Validate full user workflows in a real browser environment.
   - **Location**: Dedicated `e2e/` directory at the project root.
   - **Command**: `npm run test:e2e`
4. **Storybook Interaction & A11y Tests**: Validate visual/accessibility compliance (e.g., color contrast) and component interactions in isolation.
   - **Command**: `npm run test:storybook` (Future capability).

## ✅ The "Definition of Done"

A contribution is only considered complete when it satisfies all of the following criteria:

### 1. Specification (Spec-First)

- All non-trivial changes must have an approved specification file in `specs/`.
- Architectural changes must be documented or updated in `docs/ARCHITECTURE.md`.

### 2. Testing

- Every new feature or bug fix **must** include corresponding unit tests.
- Run tests: `npm run test`.
- All tests must pass: `npm run check`.

### 3. Documentation

- If the feature introduces new functionality, ensure it is documented in `README.md` and/or `docs/ARCHITECTURE.md`.

## 🏷 Versioning Policy

To maintain synchronization across the project, every release must increment the version number in the root `package.json`.

Use the `npm version [patch|minor|major]` command before committing.

## 📝 Release Note Best Practices

To maintain consistent, high-quality release notes, follow this structure:

- **Format**: `Release [Version] - [Short Descriptive Title]`
- **Punchline**: 2-3 sentence summary.
- **Structured Details**: Use `🚀 New Features`, `🛠 Improvements`, `🧪 Testing & Quality`, `📝 Documentation`.

---

_For AI Agents, please follow the [AGENTS.md](./AGENTS.md) protocol._
