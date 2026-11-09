# Jenseng Jinping 💗

Jenseng Jinping is an AI girlfriend chatbot built in Python, with a hot pink & rose pink web UI. She has a custom personality (warm, playful, opinionated — see [`persona.py`](persona.py)).

## How It Works

- [`app.py`](app.py) — the Flask web server and `/api/chat` endpoint.
- [`templates/index.html`](templates/index.html), [`static/style.css`](static/style.css), [`static/script.js`](static/script.js) — the chat UI.
- [`main.py`](main.py) — optional terminal version of the chatbot (same brain, no web UI).
- [`chat.py`](chat.py) — talks to the LLM through NVIDIA NIM's OpenAI-compatible API, with tuning (temperature, frequency/presence penalties) and a short context window.
- [`persona.py`](persona.py) — the system prompt defining Jenseng Jinping's personality.
- [`config.py`](config.py) — loads the API key from your `.env`.

## Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/devasheesh-kanwal/mAI.git
   cd mAI
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Add your API key** — create a `.env` file in the project root:

   ```env
   NVIDIA_API_KEY=your_key_here
   ```

   Get an API key from [NVIDIA Build](https://build.nvidia.com/). The `.env` file is gitignored — never commit it.

4. **Run it**

   ```bash
   python app.py
   ```

   Then open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

   (Prefer the terminal? Run `python main.py` instead.)

## Usage

You start the conversation — just type. It's a clean, glassy messaging UI: a frosted header with Jenseng Jinping's avatar, status, and active model name, a translucent message area over a shifting pink backdrop, and a frosted input bar. Two small toggles live in the header:

- **📱 / 💻 layout toggle** — flips between the wider PC layout and a compact phone layout (framed mockup on desktop, full-screen on a real phone). Your choice is remembered.
- **🌙 / ☀️ theme toggle** — switches between light glass and dark rose glass.

## Notes

- The model is configured in [`chat.py`](chat.py) and shown in the chat header — change the `MODEL` constant to use another NVIDIA NIM model.
- Response length is capped (`max_tokens=512`) to keep replies conversational while giving the model enough room to finish.
