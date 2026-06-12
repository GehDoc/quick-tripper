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

## 🛠 Commands

- `npm run dev`: Start development server.
- `npm run fix`: Auto-fix linting and formatting.
- `npm run test`: Run unit tests.
- `npm run type-check`: Validate TypeScript types.

---
*For AI Agents, please follow the [AGENTS.md](./AGENTS.md) protocol.*
