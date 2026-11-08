const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

window.addEventListener("scroll", () =>
  navbar.classList.toggle("scrolled", window.scrollY > 50),
);

function toggleMenu(open) {
  const isOpen =
    open !== undefined ? open : !navLinks.classList.contains("active");
  navLinks.classList.toggle("active", isOpen);
  navOverlay.classList.toggle("active", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
  burger.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}
burger.addEventListener("click", () => toggleMenu());
navOverlay.addEventListener("click", () => toggleMenu(false));
navLinks
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) toggleMenu(false);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
