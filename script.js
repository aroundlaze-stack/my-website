const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll('[id="year"]').forEach((yearEl) => {
  yearEl.textContent = new Date().getFullYear();
});

const loadingScreen = document.getElementById('loading-screen');
const pageShell = document.getElementById('page-shell');
const backToTop = document.getElementById('backToTop');

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

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle(
      'visible',
      window.scrollY > 420
    );
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

/*========================================
SCROLL REVEAL
========================================*/

const reveals = document.querySelectorAll(
'.reveal'
);


const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add('active');

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:.15
});

reveals.forEach(el=>observer.observe(el));

/*========================================
3D TILT
========================================*/

const tiltCards = document.querySelectorAll(

'.glass-card,.review-card,.article-card,.feature-card,.resource-card'

);

tiltCards.forEach(card=>{

card.addEventListener('mousemove',e=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const centerX=rect.width/2;

const centerY=rect.height/2;

const rotateX=((centerY-y)/18);

const rotateY=((x-centerX)/18);

card.style.transform=

`perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener('mouseleave',()=>{

card.style.transform=

'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';

});

});

/*========================================
PREMIUM CURSOR
========================================*/

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
  if (prefersReducedMotion) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  } else {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frameId = null;
    let isPageVisible = !document.hidden;

    const updateCursorPosition = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    };

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      frameId = window.requestAnimationFrame(animateCursor);
    };

    const startCursorAnimation = () => {
      if (frameId || !isPageVisible) return;
      frameId = window.requestAnimationFrame(animateCursor);
    };

    const stopCursorAnimation = () => {
      if (!frameId) return;
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    window.addEventListener('pointermove', updateCursorPosition, { passive: true });

    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startCursorAnimation();
      } else {
        stopCursorAnimation();
      }
    });

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

document.addEventListener("visibilitychange", () => {
    const root = document.documentElement;

    if (document.hidden) {
        root.classList.add("page-paused");
    } else {
        root.classList.remove("page-paused");
    }
});

const hero = document.querySelector(".hero");
const orbitItems = document.querySelectorAll(".orbit-item");