const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendButton = chatForm.querySelector("button");

// Conversation history (roles + content), mirrors the CLI version
let history = [];

function addMessage(role, text) {
  const message = document.createElement("div");
  message.className = `message ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  message.appendChild(bubble);
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

function showTyping() {
  const message = document.createElement("div");
  message.className = "message mai typing";
  message.innerHTML =
    '<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return message;
}

async function sendMessage(text) {
  addMessage("user", text);
  history.push({ role: "user", content: text });

  const typing = showTyping();
  sendButton.disabled = true;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    const data = await res.json();

    typing.remove();

    const reply = data.reply || "hmm ok, anyway. say something else";
    addMessage("mai", reply);
    history.push({ role: "assistant", content: reply });
  } catch (err) {
    typing.remove();
    addMessage("mai", "ugh, something broke on my end 😿 try again?");
  } finally {
    sendButton.disabled = false;
    userInput.focus();
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  userInput.value = "";
  sendMessage(text);
});
