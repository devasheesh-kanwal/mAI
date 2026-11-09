from openai import OpenAI
from config import NVIDIA_API_KEY

MODEL = "nvidia/nemotron-3-ultra-550b-a55b"

# NVIDIA NIM exposes an OpenAI-compatible chat completions API.
client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=NVIDIA_API_KEY,
)

def get_response(messages):
    # Keep the context short: persona + last few turns.
    # Long unbounded histories make free models parrot themselves.
    trimmed = [messages[0]] + messages[-16:]

    response = client.chat.completions.create(
        model=MODEL,
        messages=trimmed,
        max_tokens=512,
        temperature=0.8,
    )
    return response.choices[0].message.content or ""
