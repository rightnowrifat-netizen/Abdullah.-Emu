/* =====================================================
   CONFIGURATION — edit names, date, music, photos, text
   ===================================================== */
const CONFIG = {
  coupleName: "Abdullah ❤️ Emu",                 // NAMES
  relationshipStart: "2024-01-01",               // DATE (YYYY-MM-DD) — counter updates automatically
  musicFile: "audio/love-song.mp3",              // MUSIC
  heroSubtitle: "Two hearts. One beautiful story.",
  // PHOTOS & CAPTIONS — replace files in /images with the same names, or change src
  gallery: [
    { src: "images/photo1.jpg",  caption: "Where it all began" },
    { src: "images/photo2.jpg",  caption: "That smile" },
    { src: "images/photo3.jpg",  caption: "A perfect day" },
    { src: "images/photo4.jpg",  caption: "Late night laughs" },
    { src: "images/photo5.jpg",  caption: "Just us" },
    { src: "images/photo6.jpg",  caption: "Little adventures" },
    { src: "images/photo7.jpg",  caption: "Pure happiness" },
    { src: "images/photo8.jpg",  caption: "Favorite memory" },
    { src: "images/photo9.jpg",  caption: "Together" },
    { src: "images/photo10.jpg", caption: "Always" }
  ],
  // SPECIAL MOMENTS — edit icon, title, text
  moments: [
    { icon: "❤️", title: "First Hello", text: "Where the story quietly began." },
    { icon: "📞", title: "First Call", text: "Nervous voices, endless smiles." },
    { icon: "🌙", title: "Late Night Conversations", text: "Hours that felt like minutes." },
    { icon: "😊", title: "Favorite Smile", text: "The one that makes everything better." },
    { icon: "📸", title: "Favorite Memory", text: "Write the memory you never want to forget." },
    { icon: "💌", title: "Most Special Message", text: "Words that stayed in the heart." },
    { icon: "✨", title: "The Moment Everything Changed", text: "When friends became forever." },
    { icon: "♾️", title: "Forever", text: "Not an ending, just a beginning." }
  ]
};
// Colors live at the top of style.css (:root). Timeline & letters are edited in index.html.

const $ = id => document.getElementById(id);
document.title = `${CONFIG.coupleName} | Our Love Story`;
$("title").textContent = CONFIG.coupleName;
$("subtitle").textContent = CONFIG.heroSubtitle;

/* Gallery */
$("gallery").innerHTML = CONFIG.gallery.map((g, i) =>
  `<div class="card reveal" tabindex="0" data-i="${i}"><img src="${g.src}" alt="${g.caption}" loading="lazy" onerror="this.remove()"><span>${g.caption}</span></div>`).join("");
$("momentGrid").innerHTML = CONFIG.moments.map(m =>
  `<div class="moment reveal"><b>${m.icon}</b><h3>${m.title}</h3><p>${m.text}</p></div>`).join("");

/* Lightbox */
const lb = $("lightbox");
function openLB(i) {
  const g = CONFIG.gallery[i];
  $("lbImg").src = g.src; $("lbImg").alt = g.caption; $("lbCap").textContent = g.caption;
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
}
const closeLB = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
$("gallery").addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openLB(+c.dataset.i); });
$("gallery").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.dataset.i) openLB(+e.target.dataset.i); });
$("lbClose").onclick = closeLB;
lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });

/* Mobile nav */
$("burger").onclick = () => {
  const open = $("menu").classList.toggle("open");
  $("burger").setAttribute("aria-expanded", open);
};
$("menu").addEventListener("click", () => { $("menu").classList.remove("open"); $("burger").setAttribute("aria-expanded", false); });

/* Scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });

/* Counter */
const labels = ["Years", "Months", "Days", "Hours", "Minutes", "Seconds"];
$("counter").innerHTML = labels.map(l => `<div><strong>0</strong><small>${l}</small></div>`).join("");
const cells = $("counter").querySelectorAll("strong");
function tick() {
  const a = new Date(CONFIG.relationshipStart + "T00:00:00"), b = new Date();
  if (isNaN(a) || a > b) return;
  let y = b.getFullYear() - a.getFullYear(), m = b.getMonth() - a.getMonth(), d = b.getDate() - a.getDate(),
      h = b.getHours() - a.getHours(), mi = b.getMinutes() - a.getMinutes(), s = b.getSeconds() - a.getSeconds();
  if (s < 0) { s += 60; mi--; } if (mi < 0) { mi += 60; h--; } if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); m--; }
  if (m < 0) { m += 12; y--; }
  [y, m, d, h, mi, s].forEach((v, i) => cells[i].textContent = v);
}
tick(); setInterval(tick, 1000);

/* Floating hearts background */
const cv = $("hearts"), ctx = cv.getContext("2d");
let W, H, hs = [];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
addEventListener("resize", size); size();
const mk = (initial) => ({ x: Math.random() * W, y: initial ? Math.random() * H : H + 20, s: 6 + Math.random() * 12,
  v: .25 + Math.random() * .5, d: Math.random() * 6, a: .08 + Math.random() * .22 });
const N = innerWidth < 600 ? 14 : 26;
for (let i = 0; i < N; i++) hs.push(mk(true));
function heart(x, y, s) {
  ctx.beginPath(); ctx.moveTo(x, y + s / 4);
  ctx.bezierCurveTo(x, y - s / 2, x - s, y - s / 2, x - s, y + s / 4);
  ctx.bezierCurveTo(x - s, y + s, x, y + s * 1.2, x, y + s * 1.5);
  ctx.bezierCurveTo(x, y + s * 1.2, x + s, y + s, x + s, y + s / 4);
  ctx.bezierCurveTo(x + s, y - s / 2, x, y - s / 2, x, y + s / 4); ctx.fill();
}
function frame(t) {
  ctx.clearRect(0, 0, W, H);
  hs.forEach((p, i) => {
    p.y -= p.v; const x = p.x + Math.sin(t / 1500 + p.d) * 18;
    ctx.fillStyle = (i % 3 ? "rgba(243,185,201," : "rgba(214,178,122,") + p.a + ")";
    heart(x, p.y, p.s / 2);
    if (p.y < -30) hs[i] = mk(false);
  });
  if (!reduce) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* Secret surprise */
const sp = $("surprise");
$("surpriseBtn").onclick = () => {
  const box = $("spHearts"); box.innerHTML = "";
  const chars = ["❤️", "💗", "✨", "♥", "💕"];
  for (let i = 0; i < 160; i++) {
    const e = document.createElement("span");
    e.textContent = chars[i % chars.length];
    e.style.cssText = `left:${Math.random() * 100}%;font-size:${10 + Math.random() * 22}px;animation-duration:${5 + Math.random() * 7}s;animation-delay:${Math.random() * 6}s;animation-iteration-count:infinite`;
    box.appendChild(e);
  }
  document.body.classList.add("blurred");
  sp.classList.add("open"); sp.setAttribute("aria-hidden", "false");
};
$("spClose").onclick = () => {
  sp.classList.remove("open"); sp.setAttribute("aria-hidden", "true");
  document.body.classList.remove("blurred"); $("spHearts").innerHTML = "";
};
addEventListener("keydown", e => { if (e.key === "Escape") { closeLB(); if (sp.classList.contains("open")) $("spClose").click(); } });

/* Music — starts only on click */
const audio = $("audio"), mb = $("music");
audio.src = CONFIG.musicFile;
mb.onclick = () => {
  if (audio.paused) {
    audio.play().then(() => { mb.textContent = "🔊"; mb.classList.add("playing"); })
      .catch(() => alert("Add your song at " + CONFIG.musicFile));
  } else { audio.pause(); mb.textContent = "🎵"; mb.classList.remove("playing"); }
};
