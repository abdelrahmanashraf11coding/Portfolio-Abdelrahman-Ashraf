/* ================================================================================
   LOGIN OVERLAY — ايميل حقيقي (valid format) + أي باسورد
   ================================================================================ */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function doLogin() {
  var emailInput = document.getElementById("login-email");
  var passInput = document.getElementById("login-pass");
  var emailErr = document.getElementById("email-err");
  var globalErr = document.getElementById("login-err");
  var btn = document.querySelector(".login-btn");

  var email = emailInput.value.trim();
  var pass = passInput.value.trim();

  // Reset errors
  emailInput.classList.remove("input-invalid");
  emailErr.classList.remove("show");
  emailErr.textContent = "";
  globalErr.textContent = "";

  var hasError = false;

  // Validate email format
  if (!email) {
    emailInput.classList.add("input-invalid");
    emailErr.textContent = "Email is required.";
    emailErr.classList.add("show");
    hasError = true;
  } else if (!isValidEmail(email)) {
    emailInput.classList.add("input-invalid");
    emailErr.textContent = "Please enter a valid email address.";
    emailErr.classList.add("show");
    hasError = true;
  }

  // Validate password not empty
  if (!pass) {
    passInput.classList.add("input-invalid");
    globalErr.textContent = "Password is required.";
    hasError = true;
  }

  if (hasError) return;

  // Show loader animation
  btn.classList.add("loading");
  btn.disabled = true;

  setTimeout(function () {
    btn.classList.remove("loading");
    btn.disabled = false;

    // Animate login box out
    var box = document.querySelector(".login-box");
    box.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    box.style.opacity = "0";
    box.style.transform = "scale(0.9) translateY(-20px)";

    setTimeout(function () {
      document.getElementById("login-overlay").style.display = "none";
      sessionStorage.setItem("auth", "1");
    }, 400);
  }, 800);
}

document.addEventListener("DOMContentLoaded", function () {
  /* Hide overlay if already authenticated */
  if (sessionStorage.getItem("auth")) {
    var overlay = document.getElementById("login-overlay");
    if (overlay) overlay.style.display = "none";
  }

  /* Allow Enter key on email or password field */
  var loginEmail = document.getElementById("login-email");
  var loginPass = document.getElementById("login-pass");
  if (loginEmail)
    loginEmail.addEventListener("keydown", function (e) {
      if (e.key === "Enter") doLogin();
    });
  if (loginPass)
    loginPass.addEventListener("keydown", function (e) {
      if (e.key === "Enter") doLogin();
    });

  /* ================================================================================
     MOBILE NAVBAR TOGGLE
     ================================================================================ */
  var toggler = document.getElementById("nav-toggler");
  var navLinks = document.getElementById("nav-links");

  if (toggler && navLinks) {
    toggler.addEventListener("click", function () {
      toggler.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    /* Close nav when a link is clicked */
    navLinks.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        toggler.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ================================================================================
     THEME TOGGLE
     ================================================================================ */
  var toggleSwitch = document.getElementById("toggle");
  var body = document.body;
  var themeIcon = document.getElementById("theme-icon");

  var applyTheme = function (isLight) {
    if (isLight) {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        themeIcon.style.color = "var(--text-main)";
      }
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        themeIcon.style.color = "var(--text-muted)";
      }
    }
  };

  var savedTheme = localStorage.getItem("theme");
  var isLightMode = false;

  if (savedTheme === "light") {
    isLightMode = true;
  } else if (savedTheme === "dark") {
    isLightMode = false;
  } else {
    isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  applyTheme(isLightMode);
  if (toggleSwitch) toggleSwitch.checked = isLightMode;

  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", function () {
      var newTheme = this.checked ? "light" : "dark";
      applyTheme(this.checked);
      localStorage.setItem("theme", newTheme);
    });
  }

  /* ================================================================================
     SCROLL TO TOP
     ================================================================================ */
  var scrollToTopBtn = document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "flex";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ================================================================================
     ACTIVE NAV LINK ON SCROLL
     ================================================================================ */
  var sections = document.querySelectorAll("section[id]");
  var navLinksAll = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});

/* ================================================================================
   SCROLL REVEAL ANIMATIONS
   ================================================================================ */
var sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: false,
});

sr.reveal(".hero-text", { delay: 200, origin: "top" });
sr.reveal(".hero-img", { delay: 400, origin: "bottom" });
sr.reveal(".section-title", { delay: 200, origin: "top" });
sr.reveal(".about-img", { delay: 300, origin: "left" });
sr.reveal(".about-text", { delay: 400, origin: "right" });

sr.reveal(
  ".cert-img, .skill-card, .service-card, .portfolio-card, .feedback-card, .awards-card, .interests-card, .tech-card",
  {
    interval: 100,
    origin: "bottom",
  },
);

sr.reveal(".timeline-item", { interval: 150, origin: "left" });

sr.reveal(".contact-left", { origin: "left" });
sr.reveal(".contact-right", { delay: 300, origin: "right" });
sr.reveal("footer", { origin: "bottom" });
