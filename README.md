# Mai 💬

Mai is a terminal-based AI girlfriend chatbot built in Python. She has a custom personality (warm, playful, opinionated — see [`persona.py`](persona.py)) and chats with you in a simple REPL loop.

## How It Works

- [`main.py`](main.py) — the chat loop: keeps conversation history, handles input/exit, and prints Mai's replies.
- [`chat.py`](chat.py) — talks to the LLM through OpenRouter's OpenAI-compatible API, with tuning (temperature, frequency/presence penalties) and a short context window to keep the free model from repeating itself.
- [`persona.py`](persona.py) — the system prompt defining Mai's personality.
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
   OPENROUTER_API_KEY=your_key_here
   ```

   Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys). The `.env` file is gitignored — never commit it.

4. **Run it**

   ```bash
   python main.py
   ```

## Usage

Just chat. Type `bye` to exit. Type an empty line to skip sending.

```
Mai is online.
Type 'bye' to exit.

You: hey, long day
Mai: rough one? tell me about it
...
You: bye
Mai: Byee ❤️
```

## Notes

- The default model is a free tier model from OpenRouter, configured in [`chat.py`](chat.py) — swap the `MODEL` constant for any other model.
- Response length is capped (`max_tokens=120`) to keep replies conversational rather than essay-length.
