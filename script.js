function enableVoiceInput(field) {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Brak obsługi rozpoznawania mowy");
    return;
  }
  const rec = new webkitSpeechRecognition();
  rec.lang = "pl-PL";
  rec.continuous = false;
  rec.interimResults = false;
  rec.onresult = e => {
    field.value = e.results[0][0].transcript;
    showToast("✅ Wprowadzono dane głosowe");
  };
  rec.start();
}

function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#2ecc71",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    zIndex: 9999
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

document.querySelectorAll("input, textarea").forEach(f => {
  const mic = document.createElement("button");
  mic.textContent = "🎤";
  mic.type = "button";
  mic.style.marginLeft = "6px";
  mic.onclick = () => enableVoiceInput(f);
  f.insertAdjacentElement("afterend", mic);
});

// tryb jasny / ciemny
const toggle = document.createElement("button");
toggle.textContent = localStorage.getItem("theme") === "dark" ? "☀️" : "🌙";
toggle.style.cssText =
  "position:fixed;bottom:20px;left:20px;font-size:20px;background:none;border:none;cursor:pointer;z-index:9999;";
document.body.appendChild(toggle);
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
  toggle.textContent = dark ? "☀️" : "🌙";
});

// styl dla trybu ciemnego
const style = document.createElement("style");
style.textContent = `
  body.dark { background:#121212; color:#f1f1f1; }
  body.dark input, body.dark textarea { background:#1e1e1e; color:#fff; border-color:#333; }
`;
document.head.appendChild(style);