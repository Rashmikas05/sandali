/* Update these placeholders with Sandali's confirmed contact details. */
const CONTACT = {
  email: "sandaliashara@gmail.com",
  phone: "+947XXXXXXXX",
  whatsapp: "947XXXXXXXX",
  linkedin: "https://www.linkedin.com/in/YOUR-LINKEDIN-USERNAME/"
};

document.documentElement.style.setProperty("--header-h", window.matchMedia("(max-width: 760px)").matches ? "68px" : "76px");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];

function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});
navLinks.forEach(link => link.addEventListener("click", event => {
  const target = document.querySelector(link.getAttribute("href"));
  if (target) {
    event.preventDefault();
    target.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"});
    history.replaceState(null, "", link.getAttribute("href"));
  }
  closeMenu();
}));
document.addEventListener("click", event => {
  if (nav.classList.contains("open") && !nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => {
  document.documentElement.style.setProperty("--header-h", window.matchMedia("(max-width: 760px)").matches ? "68px" : "76px");
  if (window.innerWidth > 760) closeMenu();
});

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", updateHeader, {passive:true});
updateHeader();

// Mark the section currently in view without changing navigation geometry.
const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, {rootMargin:"-35% 0px -55% 0px", threshold:0});
sections.forEach(section => sectionObserver.observe(section));

// Editorial scroll reveal.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

// A restrained champagne ripple; does not cancel or delay native link actions.
document.addEventListener("pointerdown", event => {
  const host = event.target.closest("a, button");
  if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = host.getBoundingClientRect();
  const diameter = Math.max(rect.width, rect.height) * 1.45;
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - rect.left - diameter/2}px`;
  ripple.style.top = `${event.clientY - rect.top - diameter/2}px`;
  host.classList.add("ripple-host");
  host.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), {once:true});
}, {passive:true});

// Smooth-scroll the brand mark and footer brand to the top.
document.querySelectorAll('a[href="#home"]').forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#home").scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
  closeMenu();
}));
