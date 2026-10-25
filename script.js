const loader = document.getElementById("pageLoader");
const loaderCount = document.getElementById("loaderCount");
const progressLine = document.getElementById("progressLine");
const pointerDot = document.getElementById("pointerDot");
const menuButton = document.getElementById("menuButton");
const fullscreenNav = document.getElementById("fullscreenNav");

let count = 0;
const countTimer = window.setInterval(() => {
  count = Math.min(100, count + Math.floor(Math.random() * 17) + 8);
  loaderCount.textContent = String(count).padStart(2, "0");
  if (count >= 100) window.clearInterval(countTimer);
}, 95);

window.addEventListener("load", () => {
  window.setTimeout(() => loader.classList.add("loaded"), 850);
});

function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressLine.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    pointerDot.style.opacity = "1";
    pointerDot.style.left = `${event.clientX}px`;
    pointerDot.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.addEventListener("pointerleave", () => { pointerDot.style.opacity = "0"; });
}

const observer = new IntersectionObserver((entries, activeObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      activeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${(index % 3) * 75}ms`;
  observer.observe(element);
});

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  fullscreenNav.classList.toggle("open", open);
  fullscreenNav.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}
menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
fullscreenNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.getElementById("year").textContent = new Date().getFullYear();
