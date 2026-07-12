document.querySelectorAll('[id="year"]').forEach((yearEl) => {
  yearEl.textContent = new Date().getFullYear();
});

const loadingScreen = document.getElementById('loading-screen');
const pageShell = document.getElementById('page-shell');

if (loadingScreen && pageShell) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      pageShell.classList.add('visible');
    }, 1400);
  });
}

const newsletterForms = document.querySelectorAll('.newsletter-form');
if (newsletterForms.length) {
  newsletterForms.forEach((form) => {
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
          setTimeout(() => {
            button.textContent = button.dataset.originalText;
          }, 1600);
        }
      }
    });
  });
}

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 420);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const transitionOverlay = document.getElementById('page-transition');
const internalLinks = Array.from(document.querySelectorAll('a[href]'));

internalLinks.forEach((link) => {
  if (link.target === '_blank' || link.hasAttribute('download')) return;

  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      return;
    }

    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) return;

    // Transition temporarily disabled
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scene = document.querySelector('[data-parallax]');
if (scene && !prefersReducedMotion) {
  let frameId = null;
  let lastX = 0;
  let lastY = 0;

  const updateScene = () => {
    scene.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
    frameId = null;
  };

  window.addEventListener('pointermove', (event) => {
    const { innerWidth, innerHeight } = window;
    lastX = (event.clientX / innerWidth - 0.5) * 12;
    lastY = (event.clientY / innerHeight - 0.5) * 12;

    if (!frameId) {
      frameId = window.requestAnimationFrame(updateScene);
    }
  });

  window.addEventListener('pointerleave', () => {
    scene.style.transform = 'translate3d(0, 0, 0)';
  });
}

const tiltItems = document.querySelectorAll('[data-tilt]');
tiltItems.forEach((item) => {
  if (prefersReducedMotion) return;

  let frameId = null;
  let lastX = 0;
  let lastY = 0;

  const updateTilt = () => {
    item.style.transform = `perspective(1000px) rotateY(${lastX}deg) rotateX(${-lastY}deg)`;
    frameId = null;
  };

  item.addEventListener('pointermove', (event) => {
    const rect = item.getBoundingClientRect();
    lastX = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    lastY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;

    if (!frameId) {
      frameId = window.requestAnimationFrame(updateTilt);
    }
  });

  item.addEventListener('pointerleave', () => {
    item.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  });
});
