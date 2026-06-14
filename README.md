# Quick-tripper 🚏

**Live Site: [https://gehdoc.github.io/quick-tripper/](https://gehdoc.github.io/quick-tripper/)**

[![Hosting](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://gehdoc.github.io/quick-tripper)
[![Framework](https://img.shields.io/badge/Built_with-React-61DAFB?logo=react)](https://react.dev)
[![AI](https://img.shields.io/badge/AI_Model-Gemini_1.5-blue?logo=googlegemini)](https://ai.google.dev)

**Quick-tripper** is a privacy-first, zero-backend travel companion web app that generates detailed road trip itineraries using AI. It operates entirely in your browser—no databases, no logins, no tracking. Now powered by **Gemini 1.5** with **Google Search grounding** for real-time travel data.

## ✨ Features

- **🌍 Smart Itineraries**: Generate day-by-day travel plans using Gemini 1.5.
- **🔍 Real-time Grounding**: Uses Google Search to verify opening hours, current events, and fresh travel data.
- **🗺️ Interactive Maps**: Embedded Google Maps for every journey, rendered securely from AI-generated routes.
- **🔒 Privacy-First**: "Bring Your Own Key" (BYOK) model. Your API token is stored locally in your browser and never sent to our servers.
- **🔗 Compressed Sharing**: Share your entire itinerary via a single, ultra-compressed URL (powered by LZString).
- **💾 Local Persistence**: Automatic synchronization with your browser's local storage.

## 📖 How-to Use

1. **Enter your Gemini API Key**: Get one for free at [Google AI Studio](https://aistudio.google.com/).
2. **Describe your trip**: Use the prompt area to describe where you want to go, for how long, and what you like.
3. **Generate**: Click "Generate Itinerary" and wait a few seconds.
4. **Explore**: Use the interactive map and read the day-by-day suggestions.
5. **Manage**: Your trips are saved automatically. You can export them as JSON or share them via a unique link.

## 🔒 Privacy & BYOK (Bring Your Own Key)

Quick-tripper is designed to be **serverless and private**. We don't have a backend to store your data or your keys.

- **Local Storage**: Your API key and trip history are stored ONLY in your browser's local storage.
- **Direct AI Calls**: The app communicates directly with Google's AI APIs from your browser.
- **No Tracking**: We don't use cookies, analytics, or tracking scripts.

To use the app, you need a **Gemini API Key**.

- Visit [Google AI Studio](https://aistudio.google.com/).
- Create a new API Key.
- Paste it into the top bar of Quick-tripper.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com)
- **AI Integration**: [Gemini 1.5 Flash](https://ai.google.dev/gemini-api/docs/models/gemini) with Google Search grounding.
- **Data Compression**: [LZString](https://pieroxy.net/lua/lz-string/index.html)
- **Testing**: [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com)
- **Automation**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)

## 🔄 Development Workflow (SDD)

This project follows **Spec-Driven Development (SDD)** to maintain a clear roadmap and high technical standards. Before implementing a new feature, a technical specification must be drafted and approved.

- **For Contributors**: See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for workflow and commands.
- **For AI Agents**: Follow the **[AGENTS.md](./AGENTS.md)** protocol.

## 🚀 Getting Started

... 5. **Open the App**: Visit `http://localhost:3000` (development) or `http://localhost:3000/quick-tripper` (production-emulated) and enter your API key in the top bar.

## 🏗️ Architecture

...

## 🧪 Quality & Integrity Strategy

...

## 📄 License

MIT © [Quick-tripper](https://github.com/gehdoc/quick-tripper)

## 💖 Support the Project

...
