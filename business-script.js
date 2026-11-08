const header = document.getElementById("header");
const backTop = document.getElementById("backTop");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const navOverlay = document.getElementById("navOverlay");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
  backTop.classList.toggle("show", window.scrollY > 400);
});
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

function toggleMenu(open) {
  const isOpen =
    open !== undefined ? open : !navList.classList.contains("active");
  navList.classList.toggle("active", isOpen);
  navOverlay.classList.toggle("active", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
  menuToggle.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}
menuToggle.addEventListener("click", () => toggleMenu());
navOverlay.addEventListener("click", () => toggleMenu(false));
navList
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) toggleMenu(false);
});

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target,
          target = +el.dataset.count;
        let n = 0;
        const step = target / 60;
        const tick = () => {
          n += step;
          if (n < target) {
            el.textContent = Math.floor(n) + (target === 98 ? "%" : "+");
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + (target === 98 ? "%" : "+");
          }
        };
        tick();
        counterObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObs.observe(el));
