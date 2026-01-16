// ===== Helper =====
const $ = (id) => document.getElementById(id);
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function formatVN(d = new Date()) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

function parseLocalDateInput(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ===== Hearts =====
function hearts() {
  const wrap = $("hearts");
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 4;
    const size = 10 + Math.random() * 12;

    h.style.left = left + "vw";
    h.style.animationDuration = duration + "s";
    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.opacity = 0.35 + Math.random() * 0.35;

    wrap.appendChild(h);
    setTimeout(() => h.remove(), duration * 1000 + 200);
  }, 420);
}

// ===== Typewriter =====
async function typeWriter(el, text, speed = 18) {
  el.innerHTML = "";
  const lines = text.trim().split("\n");
  for (const line of lines) {
    for (const ch of line) {
      el.innerHTML += ch;
      await sleep(speed);
    }
    el.innerHTML += "<br/>";
    await sleep(speed * 6);
  }
}

// ===== Data =====
const LETTER = `
Mẹ ơi,

Con không giỏi nói lời tình cảm, nên con chọn cách viết ra ở đây để mẹ đọc.

Con cảm ơn mẹ vì đã luôn ở bên con từ khi con sinh ra đến bây giờ.
Có những điều trước đây con từng nghĩ là “hiển nhiên”, nhưng càng lớn con càng hiểu:
đó là sự cố gắng và tình thương của mẹ dành cho con.

Con xin lỗi vì những lúc con khiến mẹ lo hoặc buồn.
Con đang học cách trưởng thành hơn — biết nghĩ nhiều hơn cho mẹ,
và biết trân trọng những điều mẹ làm.

Năm nay là một năm rất quan trọng đối với con.
Con không hứa những điều quá lớn lao,
nhưng con muốn mẹ yên tâm rằng:
con đang nghiêm túc với tương lai của mình,
và con sẽ cố gắng từng ngày.

Con thương mẹ.
`;

const TIMELINE = [
  {
    year: "2008",
    text: "Ngày con xuất hiện trên đời — con được mẹ ôm vào lòng.",
  },
  {
    year: "2012",
    text: "Những ngày thơ bé — mẹ luôn là người ở cạnh con nhiều nhất.",
  },
  {
    year: "2016",
    text: "Con bắt đầu lớn — mẹ vẫn luôn dõi theo con từng chút.",
  },
  {
    year: "2020",
    text: "Có những lần con bướng — nhưng mẹ vẫn kiên nhẫn với con.",
  },
  {
    year: "2024",
    text: "Con hiểu mẹ hơn — và bắt đầu biết thương mẹ theo cách của con.",
  },
  {
    year: "2026",
    text: "Con sắp bước vào kỳ thi tốt nghiệp — con muốn mẹ yên tâm và tự hào.",
  },
];

const GALLERY = [
  "Ảnh 1: Con & Mẹ",
  "Ảnh 2: Kỷ niệm",
  "Ảnh 3: Một ngày bình thường",
  "Ảnh 4: Nụ cười của Mẹ",
  "Ảnh 5: Chuyến đi",
  "Ảnh 6: Cột mốc",
];

// ===== Render timeline =====
function renderTimeline() {
  const tl = $("timeline");
  tl.innerHTML = "";
  TIMELINE.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<div class="year">${item.year}</div><p class="txt">${item.text}</p>`;
    tl.appendChild(div);
  });
}

// ===== Render gallery =====
function renderGallery() {
  const g = $("gallery");
  g.innerHTML = "";
  GALLERY.forEach((cap, i) => {
    const div = document.createElement("div");
    div.className = "polaroid";
    div.style.setProperty("--rot", `${(Math.random() * 8 - 4).toFixed(2)}deg`);
    div.innerHTML = `<div class="ph">${cap}</div><div class="cap">(#${
      i + 1
    })</div>`;
    g.appendChild(div);
  });
}

// ===== Modal (FIX 100%) =====
function openModal() {
  $("modal").classList.remove("hidden");
}
function closeModal() {
  $("modal").classList.add("hidden");
}
function setupModal() {
  const modal = $("modal");
  const card = modal.querySelector(".modal-card");
  const closeBtn = $("closeModalBtn");

  // X
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });

  // click outside
  modal.addEventListener("click", (e) => {
    if (!card.contains(e.target)) closeModal();
  });

  // ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ===== Countdown =====
const DEFAULT_EXAM_DATE = "2026-06-26";

function getExamDate() {
  return localStorage.getItem("exam_date") || DEFAULT_EXAM_DATE;
}
function setExamDate(v) {
  localStorage.setItem("exam_date", v);
}

function updateCountdown() {
  const examStr = getExamDate();
  const exam = parseLocalDateInput(examStr);
  const now = new Date();

  const diffMs = exam.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 0) {
    $(
      "countdown"
    ).textContent = `Còn ${diffDays} ngày nữa là tới kỳ thi tốt nghiệp 💗`;
  } else {
    $(
      "countdown"
    ).textContent = `Kỳ thi đã diễn ra rồi — con vẫn sẽ tiếp tục cố gắng 💗`;
  }

  // progress from 1/1 to exam date
  const start = new Date(exam.getFullYear(), 0, 1);
  const total = exam.getTime() - start.getTime();
  const done = now.getTime() - start.getTime();
  const pct = clamp((done / total) * 100, 0, 100);

  $("percent").textContent = pct.toFixed(1) + "%";
  $("fill").style.width = pct + "%";
}

// ===== Init =====
window.addEventListener("DOMContentLoaded", async () => {
  $("today").textContent = formatVN(new Date());

  hearts();
  renderTimeline();
  renderGallery();

  // countdown input
  $("examDate").value = getExamDate();
  $("saveDateBtn").addEventListener("click", () => {
    const v = $("examDate").value;
    if (!v) return;
    setExamDate(v);
    updateCountdown();
  });
  updateCountdown();
  setInterval(updateCountdown, 30_000);

  // open web letter
  $("openLetterBtn").addEventListener("click", async () => {
    $("hero").style.display = "none";
    $("main").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await typeWriter($("typed"), LETTER, 18);
  });

  // modal
  setupModal();
  $("openSecretBtn").addEventListener("click", openModal);
});
