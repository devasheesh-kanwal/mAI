from flask import Flask, render_template, jsonify, request
from chat import get_response
from persona import PERSONA
import os 

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")





@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    messages = data.get("messages") or []

    # Rebuild a safe history: system persona + last turns
    history = [{"role": "system", "content": PERSONA}] + [
        {"role": m.get("role"), "content": str(m.get("content", ""))[:2000]}
        for m in messages[-20:]
        if m.get("role") in ("user", "assistant")
    ]

    try:
        reply = (get_response(history) or "").strip() or "hmm ok, anyway. say something else"
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Render provides the port dynamically. Default to 5000 for local testing.
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)