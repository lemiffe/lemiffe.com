import { animate, createTimeline } from "./anime.esm.min.js";

const loader = document.getElementById("loader");
const skull = document.querySelector(".skull");
const skullTop = document.querySelector(".skull-top");
const nav = document.querySelector(".navigation-container");
const toggle = document.querySelector(".sidebar-toggle");
const video = skull ? skull.querySelector("video") : null;
const imgs = skull ? [...skull.querySelectorAll("img[data-src]")] : [];
const segs = [...document.querySelectorAll(".loader__seg")];

let revealed = false;

function reveal() {
  if (revealed) return;
  revealed = true;
  nav && nav.classList.add("is-visible");
  toggle && toggle.classList.add("is-visible");
  try { sessionStorage.setItem("introSeen", "1"); } catch (e) {}
}

function skip() {
  if (loader) loader.remove();
  if (skull) skull.style.display = "none";
  reveal();
}

async function fetchToObjectURL(url, onProgress) {
  const res = await fetch(url);
  const total = Number(res.headers.get("Content-Length")) || 0;
  const reader = res.body.getReader();
  const chunks = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress(loaded, total);
  }
  return URL.createObjectURL(new Blob(chunks));
}

async function runLoader() {
  const assets = [];
  if (video && video.dataset.src) assets.push({ el: video, url: video.dataset.src, isVideo: true });
  imgs.forEach((img) => assets.push({ el: img, url: img.dataset.src }));
  const state = assets.map(() => ({ loaded: 0, total: 0 }));

  const paint = () => {
    const total = state.reduce((s, a) => s + a.total, 0);
    const loaded = state.reduce((s, a) => s + a.loaded, 0);
    const p = total ? loaded / total : 0;
    const on = Math.floor(p * segs.length);
    segs.forEach((seg, i) => seg.classList.toggle("is-on", i < on));
  };

  const urls = await Promise.all(
    assets.map((a, i) =>
      fetchToObjectURL(a.url, (l, t) => { state[i].loaded = l; state[i].total = t; paint(); })
    )
  );
  assets.forEach((a, i) => {
    a.el.src = urls[i];
    if (a.isVideo) a.el.load();
  });
  segs.forEach((seg) => seg.classList.add("is-on"));
}

function runIntro() {
  animate(loader, { opacity: [1, 0], duration: 400, ease: "inOutQuad" });
  setTimeout(() => loader && loader.remove(), 450);
  if (video) { const p = video.play(); if (p && p.catch) p.catch(() => {}); }

  const tl = createTimeline({ defaults: { ease: "inOutQuad" } });
  tl.add(skullTop, { translateY: -200, duration: 1500 }, 300);
  tl.add(skull, { scale: [1, 20], translateY: 120, duration: 1500 }, 300);
  tl.add(skull, { opacity: [1, 0], duration: 900 }, 1500);

  setTimeout(reveal, 1500);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let seen = false;
try { seen = !!sessionStorage.getItem("introSeen"); } catch (e) {}

if (reduceMotion || seen || !skull || !loader) {
  skip();
} else {
  const safety = setTimeout(skip, 12000);
  runLoader().then(() => { clearTimeout(safety); runIntro(); }).catch(() => { clearTimeout(safety); skip(); });
}
