# Contributing to Quick-tripper

Thank you for your interest in contributing! We follow a **Spec-Driven Development (SDD)** approach to ensure high quality and clarity.

## 🚀 Getting Started

1.  **Fork** the repository.
2.  **Install dependencies**: `npm install`.
3.  **Setup hooks**: `npm run prepare` (Husky).

## 🔄 Development Workflow

### 1. The Spec-First Rule

Before coding a new feature or fix:

- Create a Markdown file in `specs/pending/XX-description.md`.
- Define the **Goal**, **User Story**, and **Technical Strategy**.
- List specific **Tasks** and **Verification Steps**.

### 2. Quality Control

Before submitting a Pull Request, ensure the following checks pass:

```bash
npm run check
```

This command runs:

- **Linting**: ESLint (Next.js config).
- **Formatting**: Prettier.
- **Type Checking**: TypeScript (`tsc --noEmit`).
- **Unit Tests**: Vitest.

### 3. Commit Guidelines

- We use **Husky** to prevent broken commits. Your commit will fail if there are TypeScript errors.
- Use **Conventional Commits** (e.g., `feat: ...`, `fix: ...`, `docs: ...`).

## 🛠 Development Commands

| Command              | Description                                          |
| :------------------- | :--------------------------------------------------- |
| `npm run check`      | Full suite: Lint, Format, Type-check, and Unit tests |
| `npm run check:fast` | Fast checks: Lint, Format, and Type-check            |
| `npm run fix`        | Automatically fix linting and formatting issues      |
| `npm run test`       | Run unit tests with Vitest                           |
| `npm run type-check` | Validate TypeScript types                            |

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
