const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointerMediaQuery = window.matchMedia('(pointer:fine)');

document.querySelectorAll('[id="year"]').forEach((yearEl) => {
  yearEl.textContent = new Date().getFullYear();
});

const loadingScreen = document.getElementById('loading-screen');
const pageShell = document.getElementById('page-shell');
const backToTop = document.getElementById('backToTop');

if (loadingScreen && pageShell) {
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      loadingScreen.classList.add('hidden');
      pageShell.classList.add('visible');
    }, 700);
  });
}

const newsletterForms = document.querySelectorAll('.newsletter-form');
if (newsletterForms.length) {
  newsletterForms.forEach((form) => {
    const liveRegion = document.createElement('span');
    liveRegion.className = 'visually-hidden';
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    form.appendChild(liveRegion);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input');
      if (input) {
        input.value = '';
        const button = form.querySelector('button');
        if (button) {
          if (!button.dataset.originalText) {
            button.dataset.originalText = button.textContent || 'Subscribe';
          }
          button.textContent = 'Thanks!';
          liveRegion.textContent = 'Thanks!';
          window.setTimeout(() => {
            button.textContent = button.dataset.originalText;
            liveRegion.textContent = '';
          }, 1600);
        }
      }
    });
  });
}

if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 420);
  };

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/*========================================
SCROLL REVEAL
========================================*/

const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add('active'));
}

/*========================================
3D TILT
========================================*/

const tiltCards = Array.from(
  document.querySelectorAll('.glass-card,.review-card,.article-card,.feature-card,.resource-card')
);

if (!prefersReducedMotion && pointerMediaQuery.matches && tiltCards.length) {
  tiltCards.forEach((card) => {
    let frameId = null;
    let targetX = 0;
    let targetY = 0;

    const resetTilt = () => {
      card.style.transition = 'transform 220ms ease';
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    const updateTilt = () => {
      card.style.transition = 'none';
      card.style.transform = `perspective(1200px) rotateX(${targetY}deg) rotateY(${targetX}deg) translateY(-8px)`;
      frameId = null;
    };

    const handlePointerMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetX = (x - centerX) / 18;
      targetY = (centerY - y) / 18;

      if (!frameId) {
        frameId = window.requestAnimationFrame(updateTilt);
      }
    };

    const handlePointerLeave = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      resetTilt();
    };

    card.addEventListener('pointermove', handlePointerMove, { passive: true });
    card.addEventListener('pointerleave', handlePointerLeave);
    card.addEventListener('pointercancel', handlePointerLeave);
  });
}

/*========================================
PREMIUM CURSOR
========================================*/

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
  if (prefersReducedMotion || !pointerMediaQuery.matches) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  } else {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frameId = null;
    let isPageVisible = !document.hidden;

    const updateCursorPosition = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      frameId = window.requestAnimationFrame(animateCursor);
    };

    const startCursorAnimation = () => {
      if (frameId || !isPageVisible) {
        return;
      }
      frameId = window.requestAnimationFrame(animateCursor);
    };

    const stopCursorAnimation = () => {
      if (!frameId) {
        return;
      }
      window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      document.documentElement.classList.toggle('page-paused', document.hidden);

      if (isPageVisible) {
        startCursorAnimation();
      } else {
        stopCursorAnimation();
      }
    };

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    window.addEventListener('pointermove', updateCursorPosition, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startCursorAnimation();

    document.querySelectorAll('a,button,.btn').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        cursorRing.style.width = '58px';
        cursorRing.style.height = '58px';
        cursorRing.style.borderColor = '#5ca0ff';
        cursorRing.style.background = 'rgba(92,160,255,.08)';
        cursorRing.style.boxShadow = '0 0 35px rgba(92,160,255,.5)';
        cursorDot.style.transform = 'translate(-50%,-50%) scale(1.4)';
      });

      item.addEventListener('mouseleave', () => {
        cursorRing.style.width = '34px';
        cursorRing.style.height = '34px';
        cursorRing.style.borderColor = 'rgba(255,255,255,.35)';
        cursorRing.style.background = 'rgba(255,255,255,.02)';
        cursorRing.style.boxShadow = '0 0 20px rgba(92,160,255,.18)';
        cursorDot.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }
}