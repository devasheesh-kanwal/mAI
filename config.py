import os
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN not found in .env")

