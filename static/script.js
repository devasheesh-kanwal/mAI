const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendButton = chatForm.querySelector(".send-btn");
const themeToggle = document.getElementById("themeToggle");
const layoutToggle = document.getElementById("layoutToggle");
const statusText = document.getElementById("statusText");

// Conversation history (roles + content). Starts empty: the user texts first.
let history = [];

/* ── Empty state (quiet hint, no buttons) ── */
const emptyState = document.createElement("div");
emptyState.className = "empty-state";
emptyState.textContent = "Send Mai a message to start";
chatWindow.appendChild(emptyState);

/* ── Theme toggle (light / dark) ── */
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeToggle.textContent = dark ? "☀️" : "🌙";
  themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
  localStorage.setItem("mai-theme", dark ? "dark" : "light");
}

applyTheme(localStorage.getItem("mai-theme") === "dark");

themeToggle.addEventListener("click", () => {
  applyTheme(!document.body.classList.contains("dark"));
});

/* ── Layout toggle (PC / phone) ── */
function applyLayout(layout) {
  const isPhone = layout === "phone";
  document.body.classList.toggle("layout-phone", isPhone);
  document.body.classList.toggle("layout-pc", !isPhone);
  // The button shows the layout you'll switch TO
  layoutToggle.textContent = isPhone ? "💻" : "📱";
  layoutToggle.title = isPhone ? "Switch to PC layout" : "Switch to phone layout";
  localStorage.setItem("mai-layout", layout);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// First visit: pick based on screen size. After that: remember the choice.
const savedLayout = localStorage.getItem("mai-layout");
applyLayout(savedLayout || (window.innerWidth <= 700 ? "phone" : "pc"));

layoutToggle.addEventListener("click", () => {
  applyLayout(document.body.classList.contains("layout-phone") ? "pc" : "phone");
});

/* ── Helpers ───────────── */
function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addMessage(role, text, time = timestamp()) {
  const message = document.createElement("div");
  message.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  const meta = document.createElement("span");
  meta.className = "meta";
  meta.textContent = time;

  message.append(bubble, meta);
  chatWindow.appendChild(message);
  scrollToBottom();
  return bubble;
}

function showTyping() {
  const message = document.createElement("div");
  message.className = "message mai typing";
  message.innerHTML =
    '<div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
  chatWindow.appendChild(message);
  statusText.textContent = "typing…";
  scrollToBottom();
  return message;
}

function hideTyping(el) {
  el.remove();
  statusText.textContent = "online";
}

async function fetchReply(messages) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.reply || "hmm ok, anyway. say something else";
}

/* ── Sending ───────────── */
async function sendMessage(text) {
  emptyState.remove();

  addMessage("user", text);
  history.push({ role: "user", content: text });

  const typing = showTyping();
  sendButton.disabled = true;

  try {
    const reply = await fetchReply(history);
    hideTyping(typing);
    addMessage("mai", reply);
    history.push({ role: "assistant", content: reply });
  } catch {
    hideTyping(typing);
    addMessage("mai", "ugh, something broke on my end 😿 try again?");
  } finally {
    sendButton.disabled = false;
    userInput.focus();
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text || sendButton.disabled) return;
  userInput.value = "";
  sendMessage(text);
});
