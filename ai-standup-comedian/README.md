# AI Stand-up Comedian — Voice/Video Generator (Starter Kit)

This is a **from-scratch starter project** for an AI stand-up comedian generator with a web UI.
It focuses on *theory + working* and ships a **fully working front-end demo** that:
- Generates short stand-up sets from templates (client-side) — no API key required.
- Speaks the jokes using the **Web Speech Synthesis API** (in supported browsers).
- Animates a simple avatar on a stage (SVG) with a fake lip-sync during playback.
- Provides clean HTML/CSS you can style to taste.

It also includes **backend stubs** (Node.js or Python/Flask) showing where to integrate:
- LLM joke/script generation (e.g., OpenAI responses).
- TTS (e.g., ElevenLabs, Amazon Polly, OpenAI TTS).
- Avatar/video generation (e.g., D-ID, HeyGen, Wav2Lip pipelines).

> Use the front-end alone to demo UX. When ready, hook up the backend endpoints to real AI services.

---

## Quick Start (Front-end only)

1. Open `frontend/index.html` in a modern desktop browser (Chrome recommended).
2. Enter a topic (e.g., **exams**, **programming**, **college life**), select style, and click **Generate Set**.
3. Hit **Perform** to hear the AI comedian via browser TTS and see the avatar animate.

> Note: Web Speech Synthesis may require a user gesture; if you don’t hear audio, click the page and try again.

---

## Project Structure

```
ai-standup-comedian/
├── README.md
├── LICENSE
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── script_engine.js
│   └── assets/
│       └── placeholder.txt
└── backend/
    ├── server.js        # Node/Express stub
    ├── server.py        # Python/Flask stub
    ├── package.json     # For Node path
    └── requirements.txt # For Python path
```

---

## How It Works (Theory)

**1) Script Generation (Text → Jokes)**  
- In the demo, `script_engine.js` builds a short set from topic + style using templates and a tiny rules engine.  
- In a production build, replace this with an LLM endpoint (e.g., `/api/generate-script`), passing audience style, length, and constraints.

**2) Voice (Text-to-Speech)**  
- Demo uses browser **SpeechSynthesis** for simple TTS.  
- Production: call your TTS provider on the backend, return an audio URL, and play it in the front-end audio element.

**3) Video/Avatar**  
- Demo shows an **SVG avatar** with a reactive “mouth” animation (timed to speech events).  
- Production: call a video/avatar service on the backend and stream or download the generated video.

**4) Front-end (HTML/CSS/JS)**  
- `index.html` provides a UX with topic input, style selector, generate/perform buttons, script viewer, and a stage area.
- `styles.css` creates a comedy-club vibe: dark stage, spotlight, ambient glow.
- `app.js` orchestrates: handles UI, calls the local script engine, triggers TTS, and animates the avatar.

---

## Backend Integration (Stubs)

##Python/Flask

backend/server_flask.py exposes routes:
POST /api/generate-script → Calls the LLM (e.g., OpenAI or placeholder).
POST /api/tts → Calls the Text-to-Speech provider and returns a playable audio response.
POST /api/video → Connects to the avatar/video service if enabled.
API keys are stored as environment variables for security.
Inline TODOs are provided in the code to guide integration with real APIs..

---

## Notes on Safety & Style

- Include toggles for **family-friendly** vs **edgy** styles. Don’t output hateful content.  
- Add a **content moderation** step in production (filter topics, run safety checks on model output).  
- Keep sets short at first (30–60 seconds) for fast iteration.

---

## License
MIT — do whatever you want, just keep the notice.
