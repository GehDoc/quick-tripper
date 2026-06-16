# Quick-tripper 🚏

**Live Site: [https://gehdoc.github.io/quick-tripper/](https://gehdoc.github.io/quick-tripper/)**

[![Hosting](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://gehdoc.github.io/quick-tripper)
[![Framework](https://img.shields.io/badge/Built_with-React-61DAFB?logo=react)](https://react.dev)
[![AI](https://img.shields.io/badge/AI_Model-Llama_3-7B1FA2?logo=meta)](https://huggingface.co)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

**Quick-tripper** is a privacy-first, zero-backend "Point-to-Point" trip planner. Instead of overwhelming you with complex itineraries, it helps you plan specific journeys one-by-one—from a starting point to an arrival—leveraging native Google Maps route proposals and AI-powered arrival formatting.

## ✨ Features

- **📍 Point-to-Point Planning**: Focus on one trip at a time. Define where you start and where you want to go.
- **🗺️ Native Route Proposals**: Directly integrates with Google Maps to provide the best routes, alternatives, and live navigation.
- **📝 Formatted Arrival Insights**: Use your own notes about the arrival or point of interest; our AI ensures they are cleanly formatted and grammatically correct.
- **🔒 Privacy-First**: "Bring Your Own Key" (BYOK) model. Your API token and trip data stay in your browser. No databases, no tracking, no accounts.
- **🔗 Compressed Sharing**: Share any trip via a single, ultra-compressed URL (powered by LZString).
- **💾 Local Workspace**: Your trip history is automatically synchronized with your browser's local storage.

## 🔒 The "Free & Private" Philosophy

Quick-tripper is built on three core pillars:

1. **Free to Use**: Open-source under the MIT license. It leverages free-tier AI inference via Hugging Face.
2. **Privacy as a Right**: We don't want your data. There is no backend, no login, and no telemetry.
3. **User Empowerment**: You bring your own API key, giving you full control over your AI usage and privacy.

## 📖 How-to Use

1. **Enter your Hugging Face API Token**: Get a free "User Access Token" from [Hugging Face](https://huggingface.co/settings/tokens).
2. **Plan your trip**: Enter your starting point and arrival. Add some notes about what you want to do at the destination.
3. **Generate**: Click "Plan Trip". The AI will extract the locations and format your notes.
4. **Navigate**: Use the direct Google Maps link to explore route proposals and start your journey.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com)
- **AI Integration**: [Llama 3.1 8B](https://huggingface.co/meta-llama/Llama-3.1-8B-Instruct) via Hugging Face Router.
- **Data Compression**: [LZString](https://pieroxy.net/lua/lz-string/index.html)
- **Analytics**: [Umami](https://umami.is) (Privacy-focused, cookieless)

## 🔄 Development Workflow (SDD)

This project follows **Spec-Driven Development (SDD)**. See **[AGENTS.md](./AGENTS.md)** for protocol.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 🏗️ Architecture

For a detailed look at the system design, see: **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.

## 📄 License

MIT © [Quick-tripper](https://github.com/gehdoc/quick-tripper)
