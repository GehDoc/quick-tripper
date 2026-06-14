# Quick-tripper AI Agent Protocol 🤖

This project follows a strict **Spec-Driven Development (SDD)** workflow. Agents must prioritize system integrity, type safety, and architectural consistency.

## 🧭 Operational Context

- **Branding**: The project is named **Quick-tripper**. Avoid using any other name.
- **Architecture**: Zero-backend, privacy-first Next.js (App Router) application.
- **Styling**: TailwindCSS 4 + DaisyUI 5. NO inline styles in production components.
- **AI Integration**: Client-side via Hugging Face Router.

## 🔄 SDD Workflow (Mandatory)

Before writing any implementation code, agents must:

1.  **Research**: Map the current state and identify all touchpoints.
2.  **Plan (Spec)**: Create a new specification file in `specs/pending/`.
3.  **Approve**: Present the plan to the user and wait for explicit approval.
4.  **Execute**: Implement surgical changes following the approved plan.
    - **Branching**: Always create a feature branch (`feat/name`) or fix branch (`fix/name`) before execution.
    - **Incrementality**: Extract/Implement one logical unit (e.g., one component) at a time.
    - **Test-Driven**: Write unit tests for each unit immediately after creation.
    - **Atomic Commits**: Commit and push each successful "Unit + Test" cycle.
    - **No Release Files**: NEVER create separate Markdown files for release notes in the repository. Provide release notes in the final task summary or PR description only.
5.  **Validate**: Run `npm run check` to ensure zero regressions before final PR.

## 🛠 Tech Stack Constraints

- **Type Safety**: No `any`. Use strict TypeScript.
- **Testing**: Vitest + React Testing Library. All new features require unit tests.
- **Git**: Never commit without running `npm run type-check`. Pre-commit hooks are enforced.

## 📊 Status Flags

- 🔴 **Pending**: Research or planning phase.
- 🟡 **In Progress**: Implementation phase.
- 🟢 **Completed**: Implementation verified and merged.
- ⚪ **Archived**: Superseded or canceled.

---

_Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed workflow instructions._
