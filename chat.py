from openai import OpenAI
from config import OPENROUTER_API_KEY

MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free"

# Initialize the OpenAI client with OpenRouter's endpoint and mandatory headers
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
    default_headers={
        "HTTP-Referer": "https://localhost:3000", # Replace with your actual site URL if applicable
        "X-Title": "My Local Test App",          # Replace with your actual application name
    }
)

def get_response(messages):
    # Keep the context short: persona + last few turns.
    # Long unbounded histories make free models parrot themselves.
    trimmed = [messages[0]] + messages[-16:]

    response = client.chat.completions.create(
        model=MODEL,
        messages=trimmed,
        max_tokens=120,
        temperature=0.8,
        frequency_penalty=0.6,   # discourages repeating the same phrases
        presence_penalty=0.4,    # discourages looping on the same topics
    )
    return response.choices[0].message.content or ""
