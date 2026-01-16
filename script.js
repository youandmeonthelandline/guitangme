// ================== SETTINGS ==================
const FAMILY = {
  me: { name: "Em Bí", birthday: "2008-02-19" },
  mom: { name: "Mẹ Thim", birthday: "1985-07-09" },
  sis: { name: "Chị Cún", birthday: "2005-05-13" },
  bro: { name: "Em Boy", birthday: "2010-01-12" },
  gradDate: null,
};

const WISHES = [
  "Con cảm ơn mẹ vì luôn lo cho con 💗",
  "Chúc mẹ luôn khỏe mạnh và bình an ✨",
  "Mẹ đừng mệt quá nữa nha 🥺",
  "Chúng con yêu mẹ nhiều<33",
  "Nhà mình luôn vui tươi 💗",
  "Mẹ cứ yên tâm, con đang cố gắng nè",
  "Cười lên nha mẹ 😆",
  "Mẹ là số 1😳",
];

const GALLERY_ITEMS = [
  ...Array.from({ length: 20 }, (_, i) => ({
    type: "image",
    src: `assets/images/${i + 1}.jpg`,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    type: "video",
    src: `assets/videos/${i + 1}.mp4`,
  })),
];

const MEMES = [
  "Mẹ đọc tới đây mà không cười là con buồn đó nha 😼",
  "Con: luôn bướng hong chịu nghe lời. Cũng là con: thức đêm làm web 😭💗",
  "Mẹ mà khen đẹp là con sẽ… ngại đó 😳",
  "Em Miu cũng yêu mẹ rất nhiều",
];

// Text nguyện vọng (typewriter)
const WISH_PARAS = [
  "Đã đến lúc con suy nghĩ về tương lai của mình rồi;-;",
  "Nguyện vọng của con là theo học ngành Công nghệ Điện tử – Viễn thông ở trường đại học Đà Lạt. Cách đường kính khoảng 50km với mẹ thoi, nên mẹ hong cần lo đâu",
  "Con thích công nghệ vì nó có tính ứng dụng cao, và con muốn sau này trở thành kỹ sư IoT — làm thiết bị thông minh và hệ thống tự động hoá giúp cuộc sống tiện hơn. Và con muốn làm linh kiện điện tử đó, dù chưa thực hành bao giờ nhưng con sẽ làm được thôi hehe.",
  "Con biết muốn làm được thì không thể lười, nên con sẽ ráng học kỷ luật, rèn tiếng Anh và kỹ năng thực hành để đi đúng hướng.",
  "Mẹ cứ tin ở con nhé! 😼🩷",
];
// =================================================

const $ = (id) => document.getElementById(id);

const gate = $("gate");
const journey = $("journey");
const startBtn = $("startBtn");

const bgMusic = $("bgMusic");
const musicBtn = $("musicBtn");

const marqueeTrack = $("marqueeTrack");
const gallery = $("gallery");
const memeList = $("memeList");

const lightbox = $("lightbox");
const closeLightbox = $("closeLightbox");
const lightboxContent = $("lightboxContent");

const wishBtn = $("wishBtn");
const wishText = $("wishText");

// ---------- Helpers ----------
function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function nextOccurrence(birthdayStr) {
  const now = new Date();
  const b = new Date(birthdayStr);
  const m = b.getMonth();
  const day = b.getDate();
  let year = now.getFullYear();
  let next = new Date(year, m, day, 0, 0, 0, 0);
  if (next < stripTime(now)) next = new Date(year + 1, m, day, 0, 0, 0, 0);
  return next;
}
function daysBetween(a, b) {
  const ms = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.round((stripTime(b) - stripTime(a)) / ms));
}
function daysSince(a, b) {
  const ms = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.round((stripTime(b) - stripTime(a)) / ms));
}

// ---------- Gate ----------
startBtn?.addEventListener("click", () => {
  gate.classList.add("hidden");
  journey.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- Music ----------
let musicOn = false;
musicBtn?.addEventListener("click", async () => {
  try {
    if (!musicOn) {
      await bgMusic.play();
      musicOn = true;
      musicBtn.textContent = "⏸ Tắt nhạc";
    } else {
      bgMusic.pause();
      musicOn = false;
      musicBtn.textContent = "🎵 Bật nhạc";
    }
  } catch {
    alert("Thiết bị đang chặn phát nhạc 😭 Mẹ bấm lại giúp con nha.");
  }
});

// ---------- Marquee ----------
function renderMarquee() {
  const items = [...WISHES, ...WISHES];
  marqueeTrack.innerHTML = items
    .map((t) => `<div class="pill">💗 ${t}</div>`)
    .join("");
}

const photoFilm = document.getElementById("photoFilm");
const videoRow = document.getElementById("videoRow");

// tách danh sách
const PHOTOS = Array.from(
  { length: 23 },
  (_, i) => `assets/images/${i + 1}.jpg`
);
const VIDEOS = Array.from(
  { length: 10 },
  (_, i) => `assets/videos/${i + 1}.mp4`
);

// ===== ẢNH: film cuốn + auto 3s/ảnh =====
let filmIndex = 0;
let filmTimer = null;

function renderPhotoFilm() {
  if (!photoFilm) return;

  // render ảnh (nhân đôi để cuốn vô tận mượt)
  const items = [...PHOTOS, ...PHOTOS];
  photoFilm.innerHTML = items
    .map(
      (src, idx) => `
    <div class="film-item" data-type="image" data-src="${src}">
      <img loading="lazy" src="${src}" alt="Ảnh ${idx + 1}">
    </div>
  `
    )
    .join("");

  // click phóng to
  photoFilm.querySelectorAll(".film-item").forEach((el) => {
    el.addEventListener("click", () => {
      openLightbox({ type: "image", src: el.dataset.src });
    });
  });

  startFilmAuto();
}

function startFilmAuto() {
  // auto dịch theo từng ảnh: 3s/1 ảnh
  stopFilmAuto();

  const gap = 12;
  const itemW = photoFilm.querySelector(".film-item")?.offsetWidth || 220;
  const step = itemW + gap;

  filmTimer = setInterval(() => {
    filmIndex++;
    photoFilm.style.transition = "transform 0.8s ease";
    photoFilm.style.transform = `translateX(${-filmIndex * step}px)`;

    // reset mượt khi đi hết nửa (vì có nhân đôi)
    if (filmIndex >= PHOTOS.length) {
      setTimeout(() => {
        photoFilm.style.transition = "none";
        filmIndex = 0;
        photoFilm.style.transform = "translateX(0px)";
      }, 900);
    }
  }, 3000);

  // chạm vào thì tạm dừng (mẹ xem rõ)
  const wrap = photoFilm.parentElement;
  wrap?.addEventListener("touchstart", stopFilmAuto, { passive: true });
  wrap?.addEventListener("touchend", startFilmAuto, { passive: true });
}

function stopFilmAuto() {
  if (filmTimer) {
    clearInterval(filmTimer);
    filmTimer = null;
  }
}

// ===== VIDEO: hàng ngang, lướt & bấm xem =====
function renderVideoRow() {
  if (!videoRow) return;

  videoRow.innerHTML = VIDEOS.map(
    (src, i) => `
    <div class="album-item is-visible" data-type="video" data-src="${src}">
      <video class="album-thumb" src="${src}" muted playsinline preload="metadata"></video>
    </div>
  `
  ).join("");

  videoRow.querySelectorAll(".album-item").forEach((el) => {
    el.addEventListener("click", () => {
      openLightbox({ type: "video", src: el.dataset.src });
    });
  });
}

// ---------- Lightbox ----------
function openLightbox(item) {
  lightbox.classList.remove("hidden");
  if (item.type === "image")
    lightboxContent.innerHTML = `<img src="${item.src}" alt="Ảnh" />`;
  else
    lightboxContent.innerHTML = `<video src="${item.src}" controls autoplay playsinline></video>`;
}
function closeLb() {
  lightbox.classList.add("hidden");
  lightboxContent.innerHTML = "";
}
closeLightbox?.addEventListener("click", closeLb);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLb();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLb();
});

// ---------- Memes ----------
function renderMemes() {
  memeList.innerHTML = MEMES.map((t) => `<div class="meme">✨ ${t}</div>`).join(
    ""
  );
}

// ---------- Counters ----------
function renderCounters() {
  const now = new Date();
  const birthMe = new Date(FAMILY.me.birthday);

  $("daysWithMom").textContent = `${daysSince(birthMe, now)}`;
  $("bdayMe").textContent = `${daysBetween(
    now,
    nextOccurrence(FAMILY.me.birthday)
  )}`;
  $("bdayMom").textContent = `${daysBetween(
    now,
    nextOccurrence(FAMILY.mom.birthday)
  )}`;
  $("bdaySis").textContent = `${daysBetween(
    now,
    nextOccurrence(FAMILY.sis.birthday)
  )}`;
  $("bdayBro").textContent = `${daysBetween(
    now,
    nextOccurrence(FAMILY.bro.birthday)
  )}`;

  $("gradCountdown").textContent = FAMILY.gradDate
    ? `${daysBetween(now, new Date(FAMILY.gradDate))}`
    : `Chưa chốt`;
}

// ================== Wish Typewriter ==================
let typing = false;
async function typeWriteParagraphs(paras, el) {
  if (typing) return;
  typing = true;

  el.innerHTML = ""; // clear
  const cursor = document.createElement("span");
  cursor.className = "cursor";

  for (let p of paras) {
    const line = document.createElement("div");
    line.style.marginBottom = "10px";
    el.appendChild(line);

    for (let i = 0; i < p.length; i++) {
      line.textContent += p[i];
      el.appendChild(cursor);
      await new Promise((r) => setTimeout(r, 18)); // tốc độ gõ
    }
  }

  // done: giữ cursor nhấp nháy
  el.appendChild(cursor);
  typing = false;
}

wishBtn?.addEventListener("click", () => {
  typeWriteParagraphs(WISH_PARAS, wishText);
  wishBtn.disabled = true;
  wishBtn.textContent = "💗 Con có điều muốn nói...><";
});

// ================== FX: sparkle dots + petals ==================
function mountFXCanvas() {
  const c = document.createElement("canvas");
  c.id = "fxCanvas";
  document.body.prepend(c);
  const ctx = c.getContext("2d");

  let w = 0,
    h = 0;
  const dpr = Math.min(2, window.devicePixelRatio || 1);

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    c.style.width = w + "px";
    c.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const dots = []; // ⭐ dấu chấm lấp lánh
  const petals = []; // 🌸 cánh hoa

  const rand = (a, b) => a + Math.random() * (b - a);

  const DOT_COUNT = 75; // nhiều nhưng nhỏ
  const PETAL_COUNT = 12; // ít để không rối

  function spawnDot() {
    dots.push({
      x: rand(0, w),
      y: rand(-h, h),
      r: rand(0.8, 1.9), // nhỏ xíu như dấu chấm
      vy: rand(0.15, 0.45),
      tw: rand(0.01, 0.03),
      a: rand(0.2, 0.7),
      hue: rand(0, 1) < 0.75 ? "255,230,245" : "255,155,208",
    });
  }

  function spawnPetal() {
    petals.push({
      x: rand(-40, w + 40),
      y: rand(-80, -20),
      r: rand(3.2, 6.8), // to nhỏ tự nhiên
      rot: rand(0, Math.PI * 2),
      rotSpd: rand(-0.015, 0.015),
      vx: rand(-0.12, 0.12),
      vy: rand(0.25, 0.65),
      sway: rand(0.8, 1.4),
      t: 0,
      life: rand(900, 1600),
    });
  }

  for (let i = 0; i < DOT_COUNT; i++) spawnDot();
  for (let i = 0; i < PETAL_COUNT; i++) spawnPetal();

  function drawDot(d, t) {
    const twinkle = 0.35 + 0.65 * Math.sin(t * d.tw);
    const alpha = d.a * twinkle;

    // dot
    ctx.beginPath();
    ctx.fillStyle = `rgba(${d.hue},${alpha})`;
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();

    // glow nhẹ
    ctx.beginPath();
    ctx.fillStyle = `rgba(${d.hue},${alpha * 0.25})`;
    ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    ctx.globalAlpha = 0.55; // giảm để không che chữ
    const grad = ctx.createLinearGradient(0, -p.r * 3, 0, p.r * 3);
    grad.addColorStop(0, "rgba(255,155,208,0.85)");
    grad.addColorStop(1, "rgba(255,79,163,0.35)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * 1.1, p.r * 2.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    const t = Date.now();

    // sparkle dots
    for (let i = dots.length - 1; i >= 0; i--) {
      const d = dots[i];
      d.y += d.vy;
      drawDot(d, t);

      if (d.y > h + 40) {
        d.y = rand(-120, -20);
        d.x = rand(0, w);
      }
    }

    // petals
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.t++;
      p.rot += p.rotSpd;
      p.x += p.vx + Math.sin((p.t / 90) * p.sway) * 0.18;
      p.y += p.vy;

      drawPetal(p);

      if (p.y > h + 100 || p.t > p.life) {
        petals.splice(i, 1);
        spawnPetal();
      }
    }

    requestAnimationFrame(tick);
  }
  tick();
}
// =========================================================

// Init
renderMarquee();
renderPhotoFilm();
renderVideoRow();
renderMemes();
renderCounters();
mountFXCanvas();
setInterval(renderCounters, 60 * 1000);






