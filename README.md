# Quick-tripper 🚏

**Live Site: [https://gehdoc.github.io/quick-tripper/](https://gehdoc.github.io/quick-tripper/)**

[![Hosting](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://gehdoc.github.io/quick-tripper)
[![Framework](https://img.shields.io/badge/Built_with-React-61DAFB?logo=react)](https://react.dev)
[![AI](https://img.shields.io/badge/AI_Model-Llama_3-7B1FA2?logo=meta)](https://huggingface.co)

**Quick-tripper** is a privacy-first, zero-backend travel companion web app that generates detailed road trip itineraries using AI. It operates entirely in your browser—no databases, no logins, no tracking.

## ✨ Features

- **🌍 Smart Itineraries**: Generate day-by-day travel plans using Llama 3 via the Hugging Face Router.
- **🗺️ Interactive Maps**: Embedded Google Maps for every journey, secured via client-side validation.
- **🔒 Privacy-First**: "Bring Your Own Key" (BYOK) model. Your API token is stored locally in your browser and never sent to our servers.
- **🔗 Compressed Sharing**: Share your entire itinerary via a single, ultra-compressed URL (powered by LZString). No backend storage required.
- **💾 Local Persistence**: Automatic synchronization with your browser's local storage.
- **🚀 Serverless Architecture**: Designed to be hosted on static platforms like GitHub Pages.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com)
- **AI Integration**: [Hugging Face Router](https://huggingface.co/docs/hub/spaces-router) (OpenAI-compatible)
- **Data Compression**: [LZString](https://pieroxy.net/lua/lz-string/index.html)
- **Icons**: [Lucide React](https://lucide.dev)

## 🚀 Getting Started

1. **Get an API Key**: Obtain a free User Access Token from [Hugging Face Settings](https://huggingface.co/settings/tokens).
2. **Clone the Repo**:
   ```bash
   git clone https://github.com/gehdoc/quick-tripper.git
   cd quick-tripper
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run Locally**:
   ```bash
   npm run dev
   ```
5. **Open the App**: Visit `http://localhost:3000` and enter your API key in the top bar.

## 📦 Deployment

This project is optimized for static hosting on **GitHub Pages**:

```bash
npm run deploy
```

_Note: This command runs `next build` with `output: 'export'` and pushes the `out` directory to the `gh-pages` branch._

## 📄 License

MIT © [Quick-tripper](https://github.com/gehdoc/quick-tripper)
