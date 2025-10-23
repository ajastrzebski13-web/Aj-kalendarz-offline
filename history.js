function showPersonHistory(name) {
  const data = JSON.parse(localStorage.getItem("trainings") || "[]");
  const list = data.filter(t => t.person === name);
  const modal = document.createElement("div");
  modal.className = "history-modal";
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.5);
    display:flex;align-items:center;justify-content:center;z-index:10000;`;
  modal.innerHTML = `
    <div style="background:#fff;padding:20px;border-radius:10px;max-width:400px;width:90%;">
      <h2>${name} – treningi</h2>
      <select id="filter">
        <option value="all">Wszystkie</option>
        <option value="7">Ostatnie 7 dni</option>
        <option value="30">Ostatni miesiąc</option>
      </select>
      <ul style="max-height:300px;overflow:auto;margin-top:10px;">
        ${list.map(t => `<li>${t.date} – ${t.type} – ${t.notes}</li>`).join("")}
      </ul>
      <button onclick="document.querySelector('.history-modal').remove()">⬅️ Wróć</button>
    </div>`;
  document.body.appendChild(modal);
}