// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Typing animation for hero subtitle
var typed = new Typed("#typed-subtitle", {
  strings: [
    "Full Stack Developer",
    "Computer Science Engineer",
    "Creative Problem Solver",
    "Lifelong Learner",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  backDelay: 2000,
  showCursor: true,
  cursorChar: "|",
});

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = mobileMenu.querySelectorAll("a");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  // Toggle icon between bars and times (X)
  const icon = menuBtn.querySelector("i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when a link is clicked
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    const icon = menuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Active navigation link highlighting on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#desktop-menu a, #mobile-menu a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("nav-active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("nav-active");
    }
  });
});

// Automatically update copyright year
document.getElementById("copyright-year").textContent =
  new Date().getFullYear();
