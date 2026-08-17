import { animate, createTimeline } from "./anime.esm.min.js";

const loader = document.getElementById("loader");
const skull = document.querySelector(".skull");
const skullTop = document.querySelector(".skull-top");
const nav = document.querySelector(".navigation-container");
const toggle = document.querySelector(".sidebar-toggle");
const video = skull ? skull.querySelector("video") : null;
const imgs = skull ? [...skull.querySelectorAll("img[data-src]")] : [];
const segs = [...document.querySelectorAll(".loader__seg")];
const bg = document.querySelector(".bg-pattern");

let revealed = false;

function reveal() {
    if (revealed) return;
    revealed = true;
    nav && nav.classList.add("is-visible");
    toggle && toggle.classList.add("is-visible");
    try {
        localStorage.setItem("introSeen", "1");
    } catch (e) {}
}

function skip() {
    if (loader) loader.remove();
    if (skull) skull.style.display = "none";
    reveal();
    // Even without the full intro (reload / reduced-motion), fade the tiled
    // background in and then start the ambient loop.
    if (bg) {
        animate(bg, { opacity: [0, 1], duration: 1200, ease: "inOutQuad" });
        setTimeout(startBgLoop, 1200);
    }
}

// Ambient loop on the tiled background. Each cycle: pause 2s at the current
// angle, then simultaneously bounce-zoom (10% out ease-out, back in ease-in)
// and rotate a further 15deg clockwise, LANDING there. 24 cycles accumulate
// to 360deg, so looping the whole timeline is seamless (360 === 0).
function startBgLoop() {
    if (!bg) return;
    const loop = createTimeline({ loop: true });
    for (let i = 0; i < 24; i++) {
        const base = i * 4000;
        loop.add(bg, { scale: [1, 1.1], duration: 1000, ease: "outQuad" }, base + 2000);
        loop.add(bg, { rotate: [i * 15, (i + 1) * 15], duration: 2000, ease: "inOutQuad" }, base + 2000);
        loop.add(bg, { scale: [1.1, 1], duration: 1000, ease: "inQuad" }, base + 3000);
    }
}

async function fetchToObjectURL(url, onProgress) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
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
    if (video && video.dataset.src)
        assets.push({ el: video, url: video.dataset.src, isVideo: true });
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
            fetchToObjectURL(a.url, (l, t) => {
                state[i].loaded = l;
                state[i].total = t;
                paint();
            }),
        ),
    );
    assets.forEach((a, i) => {
        a.el.src = urls[i];
        if (a.isVideo) a.el.load();
    });
    segs.forEach((seg) => seg.classList.add("is-on"));
}

function runIntro() {
    if (revealed) return; // skip()/safety-timeout already ran; don't animate a hidden skull
    animate(loader, { opacity: [1, 0], duration: 400, ease: "inOutQuad" });
    setTimeout(() => loader && loader.remove(), 450);
    if (video) {
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
    }

    const tl = createTimeline({ defaults: { ease: "inOutQuad" } });
    tl.add(skullTop, { translateY: -200, duration: 1500 }, 2300);
    tl.add(skull, { scale: [1, 20], translateY: 120, duration: 1500 }, 2300);
    tl.add(skull, { opacity: [1, 0], duration: 900 }, 3500);
    // Slow fade-in of the tiled background behind the nav as the skull dissolves.
    if (bg) tl.add(bg, { opacity: [0, 1], duration: 3000 }, 3500);
    // Once the fade completes, kick off the ambient bounce/rotate loop.
    if (bg) setTimeout(startBgLoop, 6500);

    setTimeout(reveal, 2700);
}

let reduceMotion = false;
try {
    reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
} catch (e) {}
let seen = false;
try {
    seen = !!localStorage.getItem("introSeen");
} catch (e) {}

// Any hash in the URL (e.g. /#) forces the intro and ignores the
// once-per-session flag + reduced-motion — handy for debugging.
const forceIntro = location.href.indexOf("#") !== -1;

if (!skull || !loader) {
    skip();
} else if (!forceIntro && (reduceMotion || seen)) {
    skip();
} else {
    const safety = setTimeout(skip, 12000);
    runLoader()
        .then(() => {
            clearTimeout(safety);
            runIntro();
        })
        .catch(() => {
            clearTimeout(safety);
            skip();
        });
}
