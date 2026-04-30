# JoAI Chatbot

> A modern, full-stack AI chatbot web application — ChatGPT-style UI powered by OpenRouter or Ollama.

---

## Demo

<video src="assets/demo.mov" controls width="100%" style="border-radius: 12px; max-width: 100%;">
  Your browser does not support the video tag.
</video>

---

## Overview

JoAI is a production-ready AI chatbot featuring a clean, minimalist dark-theme interface. It connects to AI models via the OpenRouter cloud API (with optional Ollama local fallback), and is built with React + Vite on the frontend and Node.js + Express on the backend.

---

## Features

- ChatGPT-style chat interface with message bubbles
- User vs AI messages clearly separated (aligned left/right)
- Animated loading indicator while AI is thinking
- Auto-scroll to the latest message
- Input box fixed at the bottom with keyboard shortcuts
- Error handling for API failures (shown inline, non-blocking)
- Responsive design — works on mobile, tablet, and desktop
- Dark theme with minimalist, futuristic aesthetic
- Supports OpenRouter API (cloud) and Ollama (local) 
- Secure `.env`-based configuration — no hardcoded secrets
- Proxy via Vite dev server — no CORS issues during development

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | TailwindCSS 3 |
| Backend | Node.js + Express 4 |
| AI Integration | OpenRouter API / Ollama |
| HTTP Client | Axios |
| Dev Tooling | Nodemon, Vite Dev Server |

---

## Project Structure

```
joai-chatbot/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # Top bar with logo and status
│   │   │   ├── ChatWindow.jsx     # Scrollable message area
│   │   │   ├── MessageBubble.jsx  # Individual message bubble
│   │   │   ├── LoadingIndicator.jsx
│   │   │   └── InputBar.jsx       # Fixed bottom input form
│   │   ├── App.jsx                # Root component + state
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Tailwind imports + custom scrollbar
│   ├── index.html
│   ├── vite.config.js             # Dev proxy → localhost:3001
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── server/                        # Express backend
│   ├── routes/
│   │   └── chat.js                # POST /api/chat
│   ├── services/
│   │   └── aiService.js           # OpenRouter + Ollama integration
│   ├── index.js                   # Server entry + CORS + routing
│   └── package.json
├── .env.example                   # Template — copy to .env
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **npm** (bundled with Node.js)
- **OpenRouter API key** — free at [openrouter.ai](https://openrouter.ai) (OR Ollama installed locally)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/joai-chatbot.git
cd joai-chatbot
```

### Step 2 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and set your API key:

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx
```

### Step 3 — Install backend dependencies

```bash
cd server
npm install
```

### Step 4 — Install frontend dependencies

```bash
cd ../client
npm install
```

---

## How to Run Locally

You need **two terminals** running simultaneously.

**Terminal 1 — Backend (Express server):**

```bash
cd joai-chatbot/server
npm run dev
# Server starts at http://localhost:3001
```

**Terminal 2 — Frontend (Vite dev server):**

```bash
cd joai-chatbot/client
npm run dev
# App available at http://localhost:5173
```

Open your browser at **http://localhost:5173** and start chatting.

---

## Environment Variables

All configuration lives in the `.env` file at the project root. Never commit this file.

| Variable | Required | Default | Description |
|---|---|---|---|
| `AI_PROVIDER` | No | `openrouter` | `openrouter` or `ollama` |
| `OPENROUTER_API_KEY` | Yes* | — | Your OpenRouter API key |
| `OPENROUTER_MODEL` | No | `openai/gpt-3.5-turbo` | Any model from openrouter.ai/models |
| `OLLAMA_URL` | No | `http://localhost:11434/api/chat` | Ollama local endpoint |
| `OLLAMA_MODEL` | No | `llama3` | Ollama model name |
| `OLLAMA_FALLBACK` | No | `false` | Fall back to Ollama if OpenRouter fails |
| `PORT` | No | `3001` | Backend port |
| `CLIENT_URL` | No | `http://localhost:5173` | Frontend URL (CORS whitelist) |

*Required when `AI_PROVIDER=openrouter`

---

## Git Workflow

This project follows a `dev → main` branching strategy.

```
main    — stable, production-ready branch
dev     — active development branch
```

All feature work is committed to `dev`, then merged into `main` for releases.

```bash
# Switch to dev for all development work
git checkout dev

# Stage and commit changes
git add .
git commit -m "feat: describe your change"

# Push dev to remote
git push origin dev

# When ready to release — merge dev into main
git checkout main
git merge dev
git push origin main
```

---

## Screenshots

> Screenshots to be added after first deployment.

| Desktop Chat View | Mobile View |
|---|---|
| _coming soon_ | _coming soon_ |

---

## Future Improvements

- [ ] Persist conversation history (localStorage or database)
- [ ] Multiple named chat sessions
- [ ] Markdown + code block rendering for AI responses
- [ ] Syntax highlighting for code snippets
- [ ] Streaming responses (Server-Sent Events)
- [ ] User authentication / accounts
- [ ] Model selector dropdown in the UI
- [ ] Dark / light theme toggle
- [ ] Voice input (Web Speech API)
- [ ] Export chat history as PDF or plain text

---

## License

This project and its code belong to **João Vilas-Boas Correia** (joaopsn3@gmail.com).

All rights reserved © 2026
