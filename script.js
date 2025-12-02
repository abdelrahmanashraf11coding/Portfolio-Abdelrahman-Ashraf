// ScrollReveal Animations
    // ScrollReveal Initialization
    const sr = ScrollReveal({
      distance: '60px',
      duration: 2500,
      delay: 400,
      reset: false
    });

    sr.reveal('.hero-text', { delay: 200, origin: 'top' });
    sr.reveal('.hero-img', { delay: 400, origin: 'bottom' });
    sr.reveal('.section-title', { delay: 200, origin: 'top' });
    sr.reveal('.about-img', { delay: 300, origin: 'left' });
    sr.reveal('.about-text', { delay: 400, origin: 'right' });

    // Animation for cards with interval for staggered effect
    sr.reveal('.cert-img, .skill-card, .service-card, .portfolio-card, .feedback-card, .awards-card, .interests-card, .tech-card', {
      interval: 100,
      origin: 'bottom'
    });

    sr.reveal('.timeline-item', { interval: 150, origin: 'left' });

    // تم تحديث الـ delay لعمود التواصل الأيمن
    sr.reveal('.contact-left', { origin: 'left' });
    sr.reveal('.contact-right', { delay: 300, origin: 'right' });
    sr.reveal('footer', { origin: 'bottom' });

// 
// Theme Toggle and Scroll-to-Top Button
    document.addEventListener('DOMContentLoaded', () => {
      const toggleSwitch = document.getElementById('toggle');
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      const scrollToTopBtn = document.getElementById('scroll-to-top');

      // 1. Theme Toggle Logic
      const applyTheme = (isLight) => {
        if (isLight) {
          body.classList.add('light-theme');
          body.classList.remove('dark-theme');
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
          themeIcon.style.color = 'var(--text-main)';
        } else {
          body.classList.remove('light-theme');
          body.classList.add('dark-theme');
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
          themeIcon.style.color = 'var(--text-muted)';
        }
      };

      const savedTheme = localStorage.getItem('theme');
      let isLightMode = false;

      if (savedTheme === 'light') {
        isLightMode = true;
      } else if (savedTheme === 'dark') {
        isLightMode = false;
      } else {
        isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
      }

      applyTheme(isLightMode);
      toggleSwitch.checked = isLightMode;

      toggleSwitch.addEventListener('change', function () {
        const newTheme = this.checked ? 'light' : 'dark';
        applyTheme(this.checked);
        localStorage.setItem('theme', newTheme);
      });


      // 2. Scroll-to-Top Button Logic 
      window.addEventListener('scroll', () => {
        // Show button if scrolled down more than 300px
        if (window.scrollY > 300) {
          scrollToTopBtn.style.display = 'flex';
        } else {
          scrollToTopBtn.style.display = 'none';
        }
      });

      // Scroll smoothly to the top when clicked
      scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
