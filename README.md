# Quick-tripper 🚏

**Live Site: [https://gehdoc.github.io/quick-tripper/](https://gehdoc.github.io/quick-tripper/)**

[![Hosting](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://gehdoc.github.io/quick-tripper)
[![Framework](https://img.shields.io/badge/Built_with-React-61DAFB?logo=react)](https://react.dev)
[![AI](https://img.shields.io/badge/AI_Model-Llama_3-7B1FA2?logo=meta)](https://huggingface.co)

**Quick-tripper** is a privacy-first, zero-backend travel companion web app that generates detailed road trip itineraries using AI. It operates entirely in your browser—no databases, no logins, no tracking. Now powered by **Llama 3.1** via the Hugging Face Serverless API.

## ✨ Features

- **🌍 Smart Itineraries**: Generate day-by-day travel plans using Llama 3.1.
- **🗺️ Interactive Maps**: Embedded Google Maps for every journey, rendered securely from AI-generated routes.
- **🔒 Privacy-First**: "Bring Your Own Key" (BYOK) model. Your API token is stored locally in your browser and never sent to our servers.
- **🔗 Compressed Sharing**: Share your entire itinerary via a single, ultra-compressed URL (powered by LZString).
- **💾 Local Persistence**: Automatic synchronization with your browser's local storage.

## 📖 How-to Use

1. **Enter your Hugging Face API Token**: Get a free "User Access Token" from your [Hugging Face Settings](https://huggingface.co/settings/tokens).
2. **Describe your trip**: Use the prompt area to describe where you want to go, for how long, and what you like.
3. **Generate**: Click "Generate Itinerary" and wait a few seconds.
4. **Explore**: Use the interactive map and read the day-by-day suggestions.
5. **Manage**: Your trips are saved automatically. You can export them as JSON or share them via a unique link.

## 🔒 Privacy & BYOK (Bring Your Own Key)

Quick-tripper is designed to be **serverless and private**. We don't have a backend to store your data or your keys.

- **Local Storage**: Your API token and trip history are stored ONLY in your browser's local storage.
- **Direct AI Calls**: The app communicates directly with Hugging Face APIs from your browser.
- **No Tracking**: We don't use cookies, analytics, or tracking scripts.

To use the app, you need a **Hugging Face User Access Token**.

- Visit [Hugging Face Settings](https://huggingface.co/settings/tokens).
- Create a new token (Read access is enough).
- Paste it into the top bar of Quick-tripper.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com)
- **AI Integration**: [Llama 3.1 8B](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) via Hugging Face Router.
- **Data Compression**: [LZString](https://pieroxy.net/lua/lz-string/index.html)
- **Testing**: [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com)
- **Automation**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)

## 🔄 Development Workflow (SDD)

This project follows **Spec-Driven Development (SDD)** to maintain a clear roadmap and high technical standards. Before implementing a new feature, a technical specification must be drafted and approved.

- **For Contributors**: See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for workflow and commands.
- **For AI Agents**: Follow the **[AGENTS.md](./AGENTS.md)** protocol.

## 🚀 Getting Started

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/gehdoc/quick-tripper.git
   cd quick-tripper
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Locally**:
   ```bash
   npm run dev
   ```
4. **Open the App**: Visit `http://localhost:3000` (development) or `http://localhost:3000/quick-tripper` (production-emulated) and enter your API key in the top bar.

## 🏗️ Architecture

For a detailed look at the system design, core modules, and data contract versioning, see: **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.

## 🧪 Quality & Integrity Strategy

To maintain a robust "zero-backend" application, we rely on a multi-tiered validation strategy:

1. **Architectural Design**: High-level designs and data contracts are documented in `ARCHITECTURE.md`.
2. **Static Analysis**: ESLint and Prettier ensure code consistency and catch early errors.
3. **Type Safety**: Strict TypeScript is enforced at the commit level via Husky hooks.
4. **Unit Testing**: Vitest and JSDOM validate core logic, utility functions, and presentational components (co-located tests).
5. **E2E Testing**: Playwright validates full user workflows and "golden paths" in a real browser environment.
6. **Spec-First Implementation**: Every change is traced back to a technical specification in `specs/`, ensuring architectural alignment.

## 📄 License

MIT © [Quick-tripper](https://github.com/gehdoc/quick-tripper)

## 💖 Support the Project

If you find this tool helpful, please consider supporting its development:

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/GehDoc)

Your support helps cover maintenance and further development of the tool. Thank you!
