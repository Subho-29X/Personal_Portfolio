// Loading Screen Functionality
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const progressBar = document.getElementById("progress-bar");
  const loadingText = document.getElementById("loading-text");

  let progress = 0;
  const loadingMessages = [
    "Loading....",
    "Initializing portfolio....!!",
    "Loading assets...",
    "Preparing experience...!!",
    "Almost ready !!...",
    "Welcome!!",
  ];

  let messageIndex = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;

    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);

      loadingText.textContent = loadingMessages[loadingMessages.length - 1];

      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        mainContent.classList.remove("hidden");

        // Remove loading screen from DOM after animation
        setTimeout(() => {
          loadingScreen.remove();
          // Initialize AOS after loading screen is removed
          initializeAOS();
        }, 800);
      }, 500);
    } else {
      // Update progress bar
      progressBar.style.width = progress + "%";

      const newMessageIndex = Math.floor(
        (progress / 100) * (loadingMessages.length - 1)
      );
      if (
        newMessageIndex !== messageIndex &&
        newMessageIndex < loadingMessages.length - 1
      ) {
        messageIndex = newMessageIndex;
        loadingText.textContent = loadingMessages[messageIndex];
      }
    }
  }, 200 + Math.random() * 300);
});

function initializeAOS() {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
}

document.addEventListener("DOMContentLoaded", function () {
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

  // --- Project Card Touch Support for Mobile ---
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  if (isTouchDevice()) {
    // Modern project card touch support (simple hover effect)
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("touchstart", function (e) {
        card.classList.add("mobile-active");
      });

      card.addEventListener("touchend", function (e) {
        setTimeout(() => {
          card.classList.remove("mobile-active");
        }, 300);
      });

      // Fallback for click events
      card.addEventListener("click", function (e) {
        card.classList.add("mobile-active");
        setTimeout(() => {
          card.classList.remove("mobile-active");
        }, 300);
      });
    });

    // Skill card touch support
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.addEventListener("touchstart", function (e) {
        card.classList.add("mobile-active");
      });

      card.addEventListener("touchend", function (e) {
        setTimeout(() => {
          card.classList.remove("mobile-active");
        }, 150);
      });

      // Fallback for click events
      card.addEventListener("click", function (e) {
        card.classList.add("mobile-active");
        setTimeout(() => {
          card.classList.remove("mobile-active");
        }, 300);
      });
    });

    // Legacy flip card support (for backward compatibility)
    document.querySelectorAll(".flip-card").forEach((card) => {
      card.addEventListener("click", function (e) {
        card.classList.add("mobile-active");
        setTimeout(() => {
          card.classList.remove("mobile-active");
        }, 300);

        if (!card.classList.contains("flipped")) {
          document.querySelectorAll(".flip-card.flipped").forEach((c) => {
            c.classList.remove("flipped");
          });
          card.classList.add("flipped");
        } else {
          card.classList.remove("flipped");
        }
      });
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
