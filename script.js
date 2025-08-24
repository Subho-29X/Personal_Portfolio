// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Mobile Menu Toggle (improved)
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll("a");

    function closeMobileMenu() {
      mobileMenu.classList.add("hidden");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
      menuBtn.setAttribute("aria-expanded", "false");
    }

    function openMobileMenu() {
      mobileMenu.classList.remove("hidden");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      }
      menuBtn.setAttribute("aria-expanded", "true");
    }

    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Menu button clicked"); // Debug log
      if (mobileMenu.classList.contains("hidden")) {
        openMobileMenu();
        console.log("Opening menu"); // Debug log
      } else {
        closeMobileMenu();
        console.log("Closing menu"); // Debug log
      }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(e.target) &&
        e.target !== menuBtn &&
        !menuBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close menu on resize to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    });
  }

  // Typing animation for hero subtitle
  const typedElement = document.getElementById("typed-subtitle");
  if (typedElement && typeof Typed !== "undefined") {
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
  }

  // --- Flip Card Touch Support for Mobile ---
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  if (isTouchDevice()) {
    document.querySelectorAll(".flip-card").forEach((card) => {
      card.addEventListener("click", function (e) {
        // Only flip if not already flipped, or unflip if already flipped
        if (!card.classList.contains("flipped")) {
          // Remove flipped from all other cards
          document.querySelectorAll(".flip-card.flipped").forEach((c) => {
            c.classList.remove("flipped");
          });
          card.classList.add("flipped");
        } else {
          card.classList.remove("flipped");
        }
      });
    });
    // Optional: close flip if user taps outside any card
    document.addEventListener("touchstart", function (e) {
      if (!e.target.closest(".flip-card")) {
        document.querySelectorAll(".flip-card.flipped").forEach((c) => {
          c.classList.remove("flipped");
        });
      }
    });
  }

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
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
