from huggingface_hub import InferenceClient

from config import HF_TOKEN
from persona import PERSONA


# Change this later to whatever model you choose
MODEL = "Qwen/Qwen3-4B-Instruct-2507"
client = InferenceClient(
    provider="auto",
    api_key=HF_TOKEN
)


def get_response(messages):
    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        max_tokens=120,
        temperature=0.8,
    )

    return response.choices[0].message.content or ""