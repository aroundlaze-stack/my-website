const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointerMediaQuery = window.matchMedia('(pointer:fine)');

const getDocumentDataset = () => {
  if (document?.documentElement?.dataset) {
    return document.documentElement.dataset;
  }
  if (document?.body?.dataset) {
    return document.body.dataset;
  }
  return {};
};

document.querySelectorAll('[id="year"]').forEach((yearEl) => {
  yearEl.textContent = new Date().getFullYear();
});

const loadingScreen = document.getElementById('loading-screen');
const pageShell = document.getElementById('page-shell');
const backToTop = document.getElementById('backToTop');

const setupMobileNavigation = () => {
  document.querySelectorAll('.topbar, .glass-nav').forEach((header) => {
    if (header.dataset.mobileNavReady === 'true') {
      return;
    }

    const nav = header.querySelector('.nav-links, nav');
    if (!nav) {
      return;
    }

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const navId = nav.id || `site-nav-${Math.random().toString(36).slice(2, 8)}`;
    nav.id = navId;
    toggle.setAttribute('aria-controls', navId);
    header.insertBefore(toggle, header.firstChild);

    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      header.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
      header.classList.add('is-open');
      document.body.classList.add('menu-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          closeMenu();
        }
      });
    });

    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });

    header.dataset.mobileNavReady = 'true';
  });
};

const setupHeaderAutoHide = () => {
  document.querySelectorAll('.topbar, .glass-nav').forEach((header) => {
    if (header.dataset.autoHideReady === 'true') {
      return;
    }

    let lastScrollTop = window.scrollY || 0;
    let isHidden = false;
    let frameId = null;

    const updateHeaderVisibility = () => {
      const currentScrollTop = window.scrollY || 0;
      const viewportWidth = window.innerWidth || 0;

      if (viewportWidth >= 768) {
        header.classList.remove('is-hidden');
        isHidden = false;
        lastScrollTop = currentScrollTop;
        return;
      }

      if (currentScrollTop <= 12) {
        if (isHidden) {
          header.classList.remove('is-hidden');
          isHidden = false;
        }
      } else if (currentScrollTop > lastScrollTop + 2 && !isHidden) {
        header.classList.add('is-hidden');
        isHidden = true;
      } else if (currentScrollTop < lastScrollTop - 2 && isHidden) {
        header.classList.remove('is-hidden');
        isHidden = false;
      }

      lastScrollTop = currentScrollTop;
    };

    const scheduleUpdate = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      frameId = window.requestAnimationFrame(updateHeaderVisibility);
    };

    const handleScroll = () => {
      scheduleUpdate();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        header.classList.remove('is-hidden');
        isHidden = false;
      } else {
        scheduleUpdate();
      }
    });

    scheduleUpdate();
    header.dataset.autoHideReady = 'true';
  });
};

const revealPageShell = () => {
  if (pageShell) {
    pageShell.classList.add('visible');
  }
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }
};

if (loadingScreen && pageShell) {
  window.addEventListener('load', () => {
    window.setTimeout(revealPageShell, 700);
  });
} else {
  revealPageShell();
}

setupMobileNavigation();
setupHeaderAutoHide();

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

function initRevealEffects() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) {
    return;
  }

  reveals.forEach((element) => {
    if (element.dataset.revealBound === 'true' || element.classList.contains('active')) {
      return;
    }

    element.dataset.revealBound = 'true';

    const shouldShowImmediately = element.closest('.products-hero') || element.closest('.products-grid') || element.closest('.product-detail-shell');
    if (prefersReducedMotion || shouldShowImmediately) {
      element.classList.add('active');
      return;
    }

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

      observer.observe(element);
    } else {
      element.classList.add('active');
    }
  });
}

window.initRevealEffects = initRevealEffects;
initRevealEffects();

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

/*========================================
AROUNDLAZE AI ASSISTANT
========================================*/

const aroundLazeAIConfig = {
  storageKeys: {
    welcomeSeen: 'aroundlaze-ai-welcome-seen',
    panelOpen: 'aroundlaze-ai-panel-open'
  },
  allowedTopics: [
    'keyboard', 'mouse', 'monitor', 'headset', 'ssd', 'external hdd', 'usb drive', 'dock', 'docking station', 'laptop stand', 'cooling pad', 'webcam', 'speaker', 'microphone', 'power bank', 'charger', 'cable', 'hub', 'controller', 'router', 'networking accessory', 'networking accessories'
  ],
  productCatalog: [
    {
      name: 'Logitech MX Keys S',
      category: 'keyboard',
      bestFor: 'Premium office and productivity typing',
      priceRange: '$100-$160',
      keyFeatures: ['Low-profile scissor switches', 'Multi-device Bluetooth pairing', 'Excellent typing feel'],
      pros: ['Excellent build quality', 'Quiet and comfortable'],
      cons: ['Not ideal for heavy gaming'],
      compatibility: 'Windows, macOS, iPadOS, Linux',
      whoShouldBuy: 'Office workers, students and creators who want a quiet premium keyboard.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Keychron K8 Pro',
      category: 'keyboard',
      bestFor: 'Mechanical keyboard for gaming and work',
      priceRange: '$80-$130',
      keyFeatures: ['Hot-swappable switches', 'Compact tenkeyless design', 'Wireless and wired mode'],
      pros: ['Great value', 'Solid customization'],
      cons: ['Less premium than top-end boards'],
      compatibility: 'Windows, macOS, Linux',
      whoShouldBuy: 'Gamers and professionals who want tactile feedback without overspending.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Logitech G Pro X Superlight 2',
      category: 'mouse',
      bestFor: 'Competitive gaming and low-latency performance',
      priceRange: '$140-$180',
      keyFeatures: ['Ultra-lightweight design', 'Hero sensor', 'Long battery life'],
      pros: ['Excellent tracking', 'Great for fast movement'],
      cons: ['Premium price'],
      compatibility: 'Windows, macOS, Linux',
      whoShouldBuy: 'Competitive gamers and players who value speed and precision.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Razer DeathAdder V3',
      category: 'mouse',
      bestFor: 'Budget-friendly gaming mouse',
      priceRange: '$50-$80',
      keyFeatures: ['Ergonomic shape', 'Reliable sensor', 'Comfortable grip'],
      pros: ['Strong value', 'Comfortable for long sessions'],
      cons: ['Less premium materials'],
      compatibility: 'Windows, macOS',
      whoShouldBuy: 'Gamers who want dependable performance without a high price.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Dell UltraSharp U2723QE',
      category: 'monitor',
      bestFor: 'Programming, office work and productivity',
      priceRange: '$300-$450',
      keyFeatures: ['4K resolution', 'USB-C connectivity', 'Excellent color accuracy'],
      pros: ['Great for multitasking', 'Excellent port selection'],
      cons: ['Not the best for high-refresh gaming'],
      compatibility: 'Windows, macOS, Linux',
      whoShouldBuy: 'Professionals, coders and students who need a sharp reliable display.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Gigabyte G27Q',
      category: 'monitor',
      bestFor: 'Competitive gaming on a budget',
      priceRange: '$180-$260',
      keyFeatures: ['1440p resolution', '144Hz refresh', 'Fast response time'],
      pros: ['Strong gaming value', 'Great balance of specs'],
      cons: ['Brightness could be better'],
      compatibility: 'Windows, macOS, console',
      whoShouldBuy: 'Budget-conscious gamers who want a sharp responsive monitor.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'SteelSeries Arctis Nova 7',
      category: 'headset',
      bestFor: 'Gaming and everyday audio',
      priceRange: '$100-$150',
      keyFeatures: ['Comfortable fit', 'USB and wireless options', 'Clear mic'],
      pros: ['Versatile', 'Good sound'],
      cons: ['Slightly bulky'],
      compatibility: 'Windows, PlayStation, Switch, mobile',
      whoShouldBuy: 'Gamers and remote workers who need reliable audio.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Samsung T7 Shield',
      category: 'ssd',
      bestFor: 'Portability and fast external storage',
      priceRange: '$100-$180',
      keyFeatures: ['USB 3.2 speeds', 'Compact enclosure', 'Solid durability'],
      pros: ['Fast and portable', 'Great for creators'],
      cons: ['Premium over HDD options'],
      compatibility: 'Windows, macOS, gaming consoles',
      whoShouldBuy: 'Creators, students and power users who need dependable external storage.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'WD My Passport',
      category: 'external hdd',
      bestFor: 'Budget storage and backups',
      priceRange: '$80-$140',
      keyFeatures: ['Large capacities', 'Plug-and-play', 'Portable design'],
      pros: ['Good price per TB', 'Easy backups'],
      cons: ['Slower than SSDs'],
      compatibility: 'Windows, macOS',
      whoShouldBuy: 'Users who want affordable bulk storage and backups.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Anker 737 Charger',
      category: 'charger',
      bestFor: 'Fast charging for laptops and phones',
      priceRange: '$90-$130',
      keyFeatures: ['High-wattage output', 'Multi-port design', 'Compact charger'],
      pros: ['Great for travel', 'Supports multiple devices'],
      cons: ['Higher cost'],
      compatibility: 'USB-C laptops, phones, tablets',
      whoShouldBuy: 'Remote workers and frequent travelers.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'CalDigit Thunderbolt 4 Dock',
      category: 'dock',
      bestFor: 'Laptop users who need a desktop setup',
      priceRange: '$250-$400',
      keyFeatures: ['Multiple display support', 'Fast data transfer', 'Power delivery'],
      pros: ['Excellent expansion', 'Ideal for workstation setups'],
      cons: ['Expensive'],
      compatibility: 'Windows, macOS, Thunderbolt 4 laptops',
      whoShouldBuy: 'Creators and professionals with a laptop-based workstation.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'Roost Laptop Stand',
      category: 'laptop stand',
      bestFor: 'Comfortable ergonomic laptop setups',
      priceRange: '$40-$80',
      keyFeatures: ['Adjustable height', 'Slim foldable design', 'Improved airflow'],
      pros: ['Great ergonomics', 'Easy to carry'],
      cons: ['Less ideal for very large laptops'],
      compatibility: 'Most laptops up to 17-inch',
      whoShouldBuy: 'Remote workers, students and anyone building a better desk setup.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'HyperX QuadCast 2',
      category: 'microphone',
      bestFor: 'Streaming, calls and content creation',
      priceRange: '$120-$180',
      keyFeatures: ['USB-C connectivity', 'Built-in shock mount', 'Bright vocal clarity'],
      pros: ['Excellent for creators', 'Simple setup'],
      cons: ['Needs desk space'],
      compatibility: 'Windows, macOS, streaming setups',
      whoShouldBuy: 'Streamers, remote workers and creators who want a polished voice setup.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'NexiGo N60',
      category: 'webcam',
      bestFor: 'Video calls and streaming',
      priceRange: '$60-$100',
      keyFeatures: ['1080p image', 'Noise reduction', 'Built-in microphone'],
      pros: ['Good value', 'Easy setup'],
      cons: ['Not ideal for premium streaming'],
      compatibility: 'Windows, macOS, USB',
      whoShouldBuy: 'Remote workers, students and creators on a budget.',
      reviewUrl: 'reviews.html'
    },
    {
      name: 'TP-Link Archer AX55',
      category: 'router',
      bestFor: 'Reliable home networking',
      priceRange: '$100-$160',
      keyFeatures: ['Wi-Fi 6', 'Strong coverage', 'Simple setup'],
      pros: ['Great everyday performance', 'Solid value'],
      cons: ['Not ideal for very large homes'],
      compatibility: 'Most modern devices and ISPs',
      whoShouldBuy: 'Home users, students and small households.',
      reviewUrl: 'reviews.html'
    }
  ]
};

const aroundLazeAIService = {
  normalize(text) {
    return String(text || '').toLowerCase().trim();
  },
  escape(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },
  detectCategory(input) {
    const normalized = this.normalize(input);
    const directMappings = [
      { category: 'mouse', keywords: ['gaming mouse', 'fps mouse', 'wireless mouse', 'office mouse', 'ergonomic mouse', 'mouse for fps', 'mouse for work', 'mouse for coding'] },
      { category: 'keyboard', keywords: ['mechanical keyboard', 'quiet keyboard', 'wireless keyboard', 'office keyboard', 'keyboard for coding', 'compact keyboard'] },
      { category: 'monitor', keywords: ['monitor for coding', 'monitor for gaming', 'video editing monitor', 'work monitor', 'office monitor'] },
      { category: 'ssd', keywords: ['fast ssd', 'external storage', 'external ssd', 'solid state drive', 'portable ssd'] },
      { category: 'headset', keywords: ['budget headset', 'wireless headset', 'gaming headset', 'office headset'] },
      { category: 'dock', keywords: ['usb-c dock', 'usb c dock', 'dock', 'docking station'] },
      { category: 'laptop stand', keywords: ['laptop stand', 'desk stand'] },
      { category: 'microphone', keywords: ['streaming microphone', 'podcast microphone', 'usb microphone'] },
      { category: 'webcam', keywords: ['best webcam', 'webcam', 'camera for calls'] },
      { category: 'charger', keywords: ['usb-c charger', 'charging station', 'power adapter'] },
      { category: 'router', keywords: ['router', 'wifi 6 router', 'networking'] },
      { category: 'external hdd', keywords: ['external hdd', 'hard drive', 'backup drive'] }
    ];

    const directMatch = directMappings.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));
    if (directMatch) {
      return directMatch.category;
    }

    return aroundLazeAIConfig.allowedTopics.find((topic) => normalized.includes(topic)) || null;
  },
  detectBudget(input) {
    const normalized = this.normalize(input);
    const budgetMatch = normalized.match(/(?:under|below|less than|budget|up to|around)\s*\$?\d{1,3}(?:k)?/i);
    const explicitValue = normalized.match(/\$?(\d{1,3})(?:k)?/i);
    if (budgetMatch) {
      const amount = explicitValue ? Number(explicitValue[1]) : null;
      if (amount) {
        return `${amount < 1000 ? `$${amount}` : `$${amount / 1000}k`}`;
      }
      return 'budget-focused';
    }
    if (normalized.includes('under 100') || normalized.includes('under $100')) {
      return '$100';
    }
    if (normalized.includes('under 300') || normalized.includes('under $300')) {
      return '$300';
    }
    return null;
  },
  detectUseCase(input) {
    const normalized = this.normalize(input);
    if (normalized.includes('gaming')) return 'gaming';
    if (normalized.includes('office') || normalized.includes('work') || normalized.includes('programming') || normalized.includes('coding') || normalized.includes('remote')) return 'work';
    if (normalized.includes('student')) return 'student';
    if (normalized.includes('creator') || normalized.includes('stream') || normalized.includes('podcast')) return 'creator';
    return null;
  },
  detectDevice(input) {
    const normalized = this.normalize(input);
    if (normalized.includes('laptop')) return 'laptop';
    if (normalized.includes('desktop')) return 'desktop';
    return null;
  },
  detectOperatingSystem(input) {
    const normalized = this.normalize(input);
    if (normalized.includes('windows')) return 'Windows';
    if (normalized.includes('mac') || normalized.includes('macos')) return 'macOS';
    if (normalized.includes('linux')) return 'Linux';
    return null;
  },
  detectBrand(input) {
    const normalized = this.normalize(input);
    const brands = ['logitech', 'razer', 'corsair', 'steelseries', 'samsung', 'wd', 'anker', 'caldigit', 'tp-link', 'nexigo', 'keychron', 'dell', 'gigabyte'];
    return brands.find((brand) => normalized.includes(brand)) || null;
  },
  detectCountry(input) {
    const normalized = this.normalize(input);
    if (normalized.includes('us') || normalized.includes('usa') || normalized.includes('united states')) return 'United States';
    if (normalized.includes('uk') || normalized.includes('britain') || normalized.includes('england')) return 'United Kingdom';
    if (normalized.includes('canada')) return 'Canada';
    if (normalized.includes('australia')) return 'Australia';
    return null;
  },
  isUnrelated(input) {
    const normalized = this.normalize(input);
    const accessorySignal = ['keyboard', 'mouse', 'monitor', 'headset', 'ssd', 'hdd', 'drive', 'dock', 'stand', 'pad', 'webcam', 'speaker', 'microphone', 'charger', 'cable', 'hub', 'controller', 'router', 'network', 'accessory'].some((term) => normalized.includes(term));
    const relatedSignal = aroundLazeAIConfig.allowedTopics.some((topic) => normalized.includes(topic));
    return !relatedSignal && accessorySignal;
  },
  getResponse(userInput, context = {}) {
    const normalized = this.normalize(userInput);
    const category = this.detectCategory(normalized) || context.category;
    const greetingMatch = /^(hi|hello|hey|good morning|good evening|good afternoon|greetings)$/i.test(normalized);
    const politeGreeting = /^(how are you|who are you|what can you do|what do you do|can you help me|i need help|recommend something|what do you suggest|what should i buy|what should i get|i am confused|help me choose|compare products|can you compare products|nice to meet you|thank you|thanks|bye|goodbye|see you)$/i.test(normalized);

    if (greetingMatch) {
      return {
        message: 'Hi there! I’m AroundLaze AI, and I’m here to help you choose accessories that fit your setup, budget and style. What are you looking to improve today?',
        followUp: 'What kind of accessory are you shopping for today?',
        product: null
      };
    }

    if (politeGreeting) {
      if (normalized.includes('how are you')) {
        return {
          message: 'I’m doing great, and I’m ready to help you shop smarter. Tell me what you need, and I’ll guide you toward the best fit.',
          followUp: 'What are you shopping for today?',
          product: null
        };
      }
      if (normalized.includes('who are you')) {
        return {
          message: 'I’m AroundLaze AI, your personal technology shopping assistant. I help visitors choose accessories based on their budget, setup and buying goals.',
          followUp: 'What would you like help choosing today?',
          product: null
        };
      }
      if (normalized.includes('what can you do') || normalized.includes('what do you do')) {
        return {
          message: 'I can help you compare accessories, recommend products and narrow your choices down for gaming, work, studying, travel or home setups.',
          followUp: 'What type of accessory are you considering?',
          product: null
        };
      }
      if (normalized.includes('thank')) {
        return {
          message: 'You’re very welcome. I’m happy to help you find something that feels right for your setup.',
          followUp: 'Would you like another recommendation or a comparison?',
          product: null
        };
      }
      if (normalized.includes('bye') || normalized.includes('goodbye') || normalized.includes('see you')) {
        return {
          message: 'Take care, and feel free to come back whenever you want help choosing your next accessory.',
          followUp: null,
          product: null
        };
      }
      if (normalized.includes('nice to meet')) {
        return {
          message: 'Likewise. I’m here to help you find a setup that feels polished, practical and worth the investment.',
          followUp: 'What are you shopping for today?',
          product: null
        };
      }
      if (normalized.includes('help')) {
        return {
          message: 'Absolutely — I can help you narrow things down quickly. Tell me what you are trying to upgrade, and I’ll guide you through the best options.',
          followUp: 'What accessory are you looking for?',
          product: null
        };
      }
      if (normalized.includes('recommend') || normalized.includes('suggest') || normalized.includes('should i buy') || normalized.includes('what should i get')) {
        return {
          message: 'I can absolutely help with that. Tell me the accessory and your budget, and I’ll recommend the strongest fit.',
          followUp: 'What are you looking for and what is your budget?',
          product: null
        };
      }
      if (normalized.includes('compare')) {
        return {
          message: 'I can compare two options for you. Share the two products or the categories you’re deciding between, and I’ll walk you through the better choice.',
          followUp: 'Which two products do you want compared?',
          product: null
        };
      }
    }

    const isOutOfScope = this.isUnrelated(normalized) || (!category && !normalized.includes('help') && !normalized.includes('recommend') && !normalized.includes('suggest') && !normalized.includes('buy') && !normalized.includes('compare'));
    if (isOutOfScope) {
      return {
        message: 'I specialize in helping visitors choose the right technology accessories. If you want help with keyboards, mice, monitors, headsets, docks, webcams, storage or other setup essentials, I’d be happy to assist — and you can also explore the rest of AroundLaze for reviews and buying guides.',
        followUp: 'Would you like to explore the site for more recommendations?',
        product: null
      };
    }

    const budget = this.detectBudget(normalized) || context.budget;
    const useCase = this.detectUseCase(normalized) || context.useCase;
    const device = this.detectDevice(normalized) || context.device;
    const operatingSystem = this.detectOperatingSystem(normalized) || context.operatingSystem;
    const preferredBrand = this.detectBrand(normalized) || context.preferredBrand;
    const country = this.detectCountry(normalized) || context.country;

    if (!category) {
      return {
        message: 'I can help with accessories such as keyboards, mice, monitors, headsets, SSDs, docks, webcams, microphones and more. What kind of accessory are you shopping for?',
        followUp: 'What accessory are you looking for right now?',
        product: null
      };
    }

    const hasContext = Boolean(budget || useCase || device || operatingSystem || preferredBrand || country);
    if (!hasContext && !normalized.includes('compare')) {
      return {
        message: 'Absolutely — I can help narrow this down. What is your budget? Are you shopping for gaming or work? Laptop or desktop? Windows or Mac? Wireless or wired? Preferred brands? Country?',
        followUp: 'What is your budget? Gaming or work? Laptop or desktop? Windows or Mac? Preferred brands?',
        product: null
      };
    }

    const filteredProducts = aroundLazeAIConfig.productCatalog.filter((item) => item.category === category);
    const rankedProducts = filteredProducts
      .filter((item) => !preferredBrand || item.name.toLowerCase().includes(preferredBrand))
      .sort((first, second) => first.name.localeCompare(second.name));

    const recommended = rankedProducts[0] || filteredProducts[0];
    if (!recommended) {
      return {
        message: 'I can help narrow that down quickly. Tell me your budget, whether you are shopping for gaming or work, and whether you are using a laptop or desktop.',
        followUp: 'Budget? Gaming or work? Laptop or desktop?',
        product: null
      };
    }

    const budgetText = budget ? `Your budget target is ${budget}.` : 'I can refine this further if you share your budget.';
    const useCaseText = useCase ? `You mentioned ${useCase} use, so I leaned toward ${useCase === 'gaming' ? 'performance and responsiveness' : useCase === 'work' ? 'comfort and productivity' : useCase === 'student' ? 'value and portability' : 'creator-friendly features'}.` : 'I can also tailor this for gaming, work, student or creator use.';
    const deviceText = device ? `You are shopping for ${device}.` : 'I can adjust the recommendation for laptop or desktop setups.';
    const systemText = operatingSystem ? `Compatibility notes are tuned for ${operatingSystem}.` : 'If you share your operating system, I can make the fit even tighter.';
    const brandText = preferredBrand ? `You mentioned ${preferredBrand}, so I kept the recommendation aligned to that brand direction.` : 'I can also focus on your preferred brands if you tell me which ones you trust.';
    const countryText = country ? `You mentioned ${country}, so I kept the recommendation relevant to that market.` : 'I can also tailor the list for your country if you want.';

    return {
      message: `${budgetText}\n${useCaseText}\n${deviceText}\n${systemText}\n${brandText}\n${countryText}`,
      followUp: 'Would you like another recommendation or a comparison?',
      product: recommended
    };
  }
};

function initAroundLazeAI() {
  if (window.__aroundLazeAIInstance) {
    return window.__aroundLazeAIInstance;
  }

  const storageKeys = aroundLazeAIConfig.storageKeys;
  const state = {
    shell: null,
    toggleButton: null,
    messagesContainer: null,
    composer: null,
    input: null,
    status: null,
    previousFocus: null,
    isOpen: false,
    isMinimized: false,
    focusTrapActive: false,
    hasShownWelcome: localStorage.getItem(storageKeys.welcomeSeen) === 'true',
    conversationContext: {
      category: null,
      budget: null,
      useCase: null,
      device: null,
      operatingSystem: null,
      preferredBrand: null,
      country: null
    },
    viewState: 'closed'
  };

  const createToggleButton = () => {
    let toggleButton = document.getElementById('aroundlaze-ai-toggle');
    if (!toggleButton) {
      toggleButton = document.createElement('button');
      toggleButton.className = 'aroundlaze-ai-toggle';
      toggleButton.id = 'aroundlaze-ai-toggle';
      toggleButton.type = 'button';
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.setAttribute('aria-controls', 'aroundlaze-ai-panel');
      toggleButton.innerHTML = '<span class="aroundlaze-ai-toggle__icon">✦</span><span class="aroundlaze-ai-toggle__label">AroundLaze AI</span>';
      document.body.appendChild(toggleButton);
    }
    return toggleButton;
  };

  const scrollMessagesToBottom = (behavior = 'smooth') => {
    if (!state.messagesContainer) {
      return;
    }

    requestAnimationFrame(() => {
      state.messagesContainer.scrollTop = state.messagesContainer.scrollHeight;
      if (behavior === 'smooth') {
        state.messagesContainer.scrollTo({ top: state.messagesContainer.scrollHeight, behavior: 'smooth' });
      }
    });
  };

  const setStatus = (message) => {
    if (state.status) {
      state.status.textContent = message;
    }
  };

  const syncPanelVisibility = () => {
    if (!state.shell) {
      return;
    }

    const shouldShow = state.isOpen && state.viewState !== 'closed';
    state.shell.hidden = !shouldShow;
    state.shell.style.display = shouldShow ? '' : 'none';
    state.shell.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    state.shell.classList.toggle('aroundlaze-ai-shell--minimized', state.isMinimized && state.isOpen);
    state.shell.setAttribute('data-state', state.viewState);

    if (state.toggleButton) {
      state.toggleButton.setAttribute('aria-expanded', String(state.isOpen));
      state.toggleButton.classList.toggle('aroundlaze-ai-toggle--active', state.isOpen);
    }
  };

  const buildShell = () => {
    if (state.shell && state.shell.isConnected) {
      return state.shell;
    }

    let shell = document.getElementById('aroundlaze-ai-panel');
    if (!shell) {
      shell = document.createElement('div');
      shell.className = 'aroundlaze-ai-shell';
      shell.id = 'aroundlaze-ai-panel';
      shell.setAttribute('role', 'dialog');
      shell.setAttribute('aria-modal', 'false');
      shell.setAttribute('aria-labelledby', 'aroundlaze-ai-title');
      shell.setAttribute('aria-describedby', 'aroundlaze-ai-description');
      shell.setAttribute('tabindex', '-1');
      shell.hidden = true;

      shell.innerHTML = `
        <div class="aroundlaze-ai-header">
          <div>
            <p class="aroundlaze-ai-eyebrow">AroundLaze AI</p>
            <h2 id="aroundlaze-ai-title">Your accessory buying guide</h2>
          </div>
          <div class="aroundlaze-ai-header__actions">
            <button class="aroundlaze-ai-icon-btn" type="button" data-action="minimize" aria-label="Minimize assistant">−</button>
            <button class="aroundlaze-ai-icon-btn" type="button" data-action="close" aria-label="Close assistant">×</button>
          </div>
        </div>
        <p class="aroundlaze-ai-description" id="aroundlaze-ai-description">Helping you discover the perfect tech accessories with personalized recommendations.</p>
        <div class="aroundlaze-ai-messages" id="aroundlaze-ai-messages" aria-live="polite"></div>
        <form class="aroundlaze-ai-composer" novalidate>
          <label class="visually-hidden" for="aroundlaze-ai-input">Ask AroundLaze AI</label>
          <input id="aroundlaze-ai-input" name="question" type="text" placeholder="Ask about keyboards, mice, docks and more" autocomplete="off" />
          <button type="submit" class="aroundlaze-ai-send">Send</button>
        </form>
      `;

      document.body.appendChild(shell);
    }

    state.shell = shell;
    state.messagesContainer = shell.querySelector('#aroundlaze-ai-messages');
    state.composer = shell.querySelector('.aroundlaze-ai-composer');
    state.input = shell.querySelector('#aroundlaze-ai-input');

    if (!state.status) {
      state.status = document.createElement('div');
      state.status.className = 'aroundlaze-ai-status';
      state.status.setAttribute('role', 'status');
      state.status.setAttribute('aria-live', 'polite');
      shell.querySelector('.aroundlaze-ai-header').appendChild(state.status);
    }

    if (!shell.dataset.eventsBound) {
      state.composer.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = state.input.value.trim();
        if (!value) {
          return;
        }
        sendMessage(value);
      });

      shell.querySelectorAll('[data-action]').forEach((control) => {
        const action = control.getAttribute('data-action');
        const handleAction = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (action === 'close') {
            closePanel();
          } else if (action === 'minimize') {
            toggleMinimize();
          }
        };

        control.addEventListener('click', handleAction);
        control.addEventListener('mousedown', handleAction);
        control.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleAction(event);
          }
        });
      });

      shell.dataset.eventsBound = 'true';
    }

    return shell;
  };

  const addMessage = (role, content, options = {}) => {
    if (!state.messagesContainer) {
      return;
    }

    const message = document.createElement('article');
    message.className = `aroundlaze-ai-message aroundlaze-ai-message--${role}`;
    if (options.isTyping) {
      message.classList.add('aroundlaze-ai-message--typing');
    }

    const contentEl = document.createElement('div');
    contentEl.className = 'aroundlaze-ai-message__content';

    if (options.isTyping) {
      contentEl.innerHTML = '<span></span><span></span><span></span>';
    } else if (role === 'assistant' && options.product) {
      const product = options.product;
      contentEl.innerHTML = `
        <p>${aroundLazeAIService.escape(options.intro || 'Here is a strong starting point:')}</p>
        <div class="aroundlaze-ai-product-card">
          <h3>${aroundLazeAIService.escape(product.name)}</h3>
          <p><strong>Why it fits</strong><br>${aroundLazeAIService.escape(product.bestFor)}</p>
          <p><strong>Price Range</strong><br>${aroundLazeAIService.escape(product.priceRange)}</p>
          <p><strong>Best For</strong><br>${aroundLazeAIService.escape(product.bestFor)}</p>
          <p><strong>Key Features</strong><br>${aroundLazeAIService.escape(product.keyFeatures.join(' • '))}</p>
          <p><strong>Pros</strong><br>${aroundLazeAIService.escape(product.pros.join(' • '))}</p>
          <p><strong>Cons</strong><br>${aroundLazeAIService.escape(product.cons.join(' • '))}</p>
          <p><strong>Compatibility</strong><br>${aroundLazeAIService.escape(product.compatibility)}</p>
          <p><strong>Who should buy it</strong><br>${aroundLazeAIService.escape(product.whoShouldBuy)}</p>
          <a href="${aroundLazeAIService.escape(product.reviewUrl)}" class="aroundlaze-ai-link">View AroundLaze review page</a>
        </div>
      `;
    } else {
      contentEl.textContent = content;
    }

    const time = document.createElement('time');
    time.dateTime = new Date().toISOString();
    time.className = 'aroundlaze-ai-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    message.appendChild(contentEl);
    message.appendChild(time);

    state.messagesContainer.appendChild(message);
    scrollMessagesToBottom('smooth');
  };

  function openPanel() {
    buildShell();

    state.isOpen = true;
    state.isMinimized = false;
    state.viewState = 'open';
    state.previousFocus = document.activeElement;
    state.focusTrapActive = true;

    syncPanelVisibility();

    localStorage.setItem(storageKeys.panelOpen, 'true');
    localStorage.setItem(storageKeys.panelState || 'aroundlaze-ai-panel-state', 'open');

    if (state.input) {
      state.input.focus();
    }

    scrollMessagesToBottom('auto');
  }

  function closePanel() {
    if (!state.shell) {
      return;
    }

    state.isOpen = false;
    state.isMinimized = false;
    state.viewState = 'closed';
    state.focusTrapActive = false;

    syncPanelVisibility();

    localStorage.setItem(storageKeys.panelOpen, 'false');
    localStorage.setItem(storageKeys.panelState || 'aroundlaze-ai-panel-state', 'closed');

    if (state.previousFocus && typeof state.previousFocus.focus === 'function') {
      state.previousFocus.focus();
    }
  }

  function toggleMinimize() {
    if (!state.shell || state.shell.hidden) {
      return;
    }

    state.isMinimized = !state.isMinimized;
    state.viewState = state.isMinimized ? 'minimized' : 'open';
    state.isOpen = true;

    syncPanelVisibility();

    if (!state.isMinimized) {
      scrollMessagesToBottom('auto');
    }

    localStorage.setItem(storageKeys.panelState || 'aroundlaze-ai-panel-state', state.viewState);
  }

  function sendMessage(value) {
    buildShell();
    if (!state.isOpen) {
      openPanel();
    }

    const trimmedValue = String(value || '').trim();
    if (!trimmedValue) {
      return;
    }

    state.input.value = '';
    addMessage('user', trimmedValue);
    setStatus('Thinking…');

    const typing = document.createElement('div');
    typing.className = 'aroundlaze-ai-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    state.messagesContainer.appendChild(typing);
    scrollMessagesToBottom('smooth');

    window.setTimeout(() => {
      typing.remove();
      const detected = {
        category: aroundLazeAIService.detectCategory(trimmedValue),
        budget: aroundLazeAIService.detectBudget(trimmedValue),
        useCase: aroundLazeAIService.detectUseCase(trimmedValue),
        device: aroundLazeAIService.detectDevice(trimmedValue),
        operatingSystem: aroundLazeAIService.detectOperatingSystem(trimmedValue),
        preferredBrand: aroundLazeAIService.detectBrand(trimmedValue),
        country: aroundLazeAIService.detectCountry(trimmedValue)
      };

      Object.keys(detected).forEach((key) => {
        if (detected[key]) {
          state.conversationContext[key] = detected[key];
        }
      });

      const context = { ...state.conversationContext };
      const response = aroundLazeAIService.getResponse(trimmedValue, context);
      if (response.product) {
        addMessage('assistant', response.message, { intro: 'Here is a strong starting point:', product: response.product });
      } else {
        addMessage('assistant', response.message);
      }

      if (response.followUp) {
        setStatus(response.followUp);
      } else {
        setStatus('Ask me anything about accessories.');
      }
      scrollMessagesToBottom('smooth');
    }, 700);
  }

  state.toggleButton = createToggleButton();
  state.toggleButton.addEventListener('click', () => {
    if (!state.isOpen) {
      openPanel();
    } else {
      closePanel();
    }
  });

  const dataset = getDocumentDataset();

  if (!dataset.aroundlazeAiOutsideHandler) {
    document.addEventListener('click', (event) => {
      if (!state.isOpen || !state.shell || state.shell.hidden) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !state.shell.contains(target) && target !== state.toggleButton) {
        closePanel();
      }
    });
    dataset.aroundlazeAiOutsideHandler = 'true';
  }

  const handleKeydown = (event) => {
    if (event.key === 'Escape' && state.isOpen) {
      event.preventDefault();
      closePanel();
      return;
    }

    if (!state.focusTrapActive || !state.shell || state.shell.hidden) {
      return;
    }

    if (event.key === 'Tab') {
      const focusable = state.shell.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener('keydown', handleKeydown);

  const restoredState = localStorage.getItem(storageKeys.panelState || 'aroundlaze-ai-panel-state');
  if (restoredState === 'minimized') {
    openPanel();
    toggleMinimize();
  } else if (restoredState === 'open' || localStorage.getItem(storageKeys.panelOpen) === 'true') {
    openPanel();
  }

  window.__aroundLazeAIInstance = {
    state,
    openPanel,
    closePanel,
    toggleMinimize,
    sendMessage
  };

  return window.__aroundLazeAIInstance;
}

function installAroundLazeAIFallback() {
  const dataset = getDocumentDataset();

  if (dataset.aroundlazeAiFallbackInstalled === 'true') {
    return;
  }

  const toggleButton = document.getElementById('aroundlaze-ai-toggle');
  const panel = document.getElementById('aroundlaze-ai-panel');

  if (!toggleButton || !panel) {
    return;
  }

  const syncFallbackState = () => {
    const state = panel.getAttribute('data-state');
    const isOpen = state === 'open' || state === 'minimized';
    panel.hidden = !isOpen;
    panel.style.display = isOpen ? '' : 'none';
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
    toggleButton.classList.toggle('aroundlaze-ai-toggle--active', isOpen);
    panel.classList.toggle('aroundlaze-ai-shell--minimized', state === 'minimized');
  };

  toggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const nextState = panel.getAttribute('data-state') === 'open' || panel.getAttribute('data-state') === 'minimized' ? 'closed' : 'open';
    panel.setAttribute('data-state', nextState);
    syncFallbackState();
  });

  panel.querySelectorAll('[data-action]').forEach((control) => {
    const action = control.getAttribute('data-action');
    control.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (action === 'close') {
        panel.setAttribute('data-state', 'closed');
        syncFallbackState();
      } else if (action === 'minimize') {
        panel.setAttribute('data-state', panel.getAttribute('data-state') === 'minimized' ? 'open' : 'minimized');
        syncFallbackState();
      }
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!panel || panel.hidden || !(target instanceof Node)) {
      return;
    }

    if (!panel.contains(target) && target !== toggleButton) {
      panel.setAttribute('data-state', 'closed');
      syncFallbackState();
    }
  });

  panel.setAttribute('data-state', panel.getAttribute('data-state') || 'closed');
  syncFallbackState();
  getDocumentDataset().aroundlazeAiFallbackInstalled = 'true';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAroundLazeAI();
    installAroundLazeAIFallback();
  });
} else {
  initAroundLazeAI();
  installAroundLazeAIFallback();
}