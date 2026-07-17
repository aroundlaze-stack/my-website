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
    const match = aroundLazeAIConfig.allowedTopics.find((topic) => normalized.includes(topic));
    return match || null;
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
    if (normalized.includes('office') || normalized.includes('work')) return 'work';
    if (normalized.includes('student')) return 'student';
    if (normalized.includes('creator') || normalized.includes('stream')) return 'creator';
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
    const relatedSignal = aroundLazeAIConfig.allowedTopics.some((topic) => normalized.includes(topic));
    const accessorySignal = ['keyboard', 'mouse', 'monitor', 'headset', 'ssd', 'hdd', 'drive', 'dock', 'stand', 'pad', 'webcam', 'speaker', 'microphone', 'charger', 'cable', 'hub', 'controller', 'router', 'network', 'accessory'].some((term) => normalized.includes(term));
    return !relatedSignal && accessorySignal;
  },
  getResponse(userInput, context = {}) {
    const normalized = this.normalize(userInput);
    const category = this.detectCategory(normalized) || context.category;
    const isOutOfScope = this.isUnrelated(normalized) || (!category && !normalized.includes('help') && !normalized.includes('recommend'));

    if (isOutOfScope) {
      return {
        message: 'I specialize in helping visitors choose the right technology accessories. For other questions, please explore the rest of AroundLaze.',
        followUp: null,
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
        message: 'I can help with accessories such as keyboards, mice, monitors, headsets, SSDs, docks, webcams and more. What type of accessory are you shopping for?',
        followUp: 'What accessory are you looking for right now?',
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

    return {
      message: `${budgetText}\n${useCaseText}\n${deviceText}\n${systemText}\n${brandText}`,
      followUp: 'Budget? Gaming or work? Laptop or desktop? Operating system? Preferred brands? Country?',
      product: recommended
    };
  }
};

function initAroundLazeAI() {
  const conversationContext = {
    category: null,
    budget: null,
    useCase: null,
    device: null,
    operatingSystem: null,
    preferredBrand: null,
    country: null
  };

  const toggleButton = document.createElement('button');
  toggleButton.className = 'aroundlaze-ai-toggle';
  toggleButton.id = 'aroundlaze-ai-toggle';
  toggleButton.type = 'button';
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-controls', 'aroundlaze-ai-panel');
  toggleButton.innerHTML = '<span class="aroundlaze-ai-toggle__icon">✦</span><span class="aroundlaze-ai-toggle__label">AroundLaze AI</span>';
  document.body.appendChild(toggleButton);

  let shell = null;
  let messagesContainer = null;
  let composer = null;
  let input = null;
  let status = null;
  let isOpen = false;
  let isMinimized = false;
  let focusTrapActive = false;
  let hasShownWelcome = localStorage.getItem(aroundLazeAIConfig.storageKeys.welcomeSeen) === 'true';

  const buildShell = () => {
    if (shell) {
      return shell;
    }

    shell = document.createElement('div');
    shell.className = 'aroundlaze-ai-shell';
    shell.id = 'aroundlaze-ai-panel';
    shell.setAttribute('role', 'dialog');
    shell.setAttribute('aria-modal', 'false');
    shell.setAttribute('aria-labelledby', 'aroundlaze-ai-title');
    shell.setAttribute('aria-describedby', 'aroundlaze-ai-description');
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
      <p class="aroundlaze-ai-description" id="aroundlaze-ai-description">Focused on keyboards, mice, monitors, headsets, SSDs and more.</p>
      <div class="aroundlaze-ai-messages" id="aroundlaze-ai-messages" aria-live="polite"></div>
      <div class="aroundlaze-ai-suggestions" aria-label="Suggested questions"></div>
      <form class="aroundlaze-ai-composer" novalidate>
        <label class="visually-hidden" for="aroundlaze-ai-input">Ask AroundLaze AI</label>
        <input id="aroundlaze-ai-input" name="question" type="text" placeholder="Ask about keyboards, mice, docks and more" autocomplete="off" />
        <button type="submit" class="aroundlaze-ai-send">Send</button>
      </form>
    `;

    document.body.appendChild(shell);
    messagesContainer = shell.querySelector('#aroundlaze-ai-messages');
    composer = shell.querySelector('.aroundlaze-ai-composer');
    input = shell.querySelector('#aroundlaze-ai-input');
    status = document.createElement('div');
    status.className = 'aroundlaze-ai-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    shell.querySelector('.aroundlaze-ai-header').appendChild(status);

    shell.querySelector('.aroundlaze-ai-suggestions').innerHTML = `
      <button type="button" class="aroundlaze-ai-chip">Best gaming mouse</button>
      <button type="button" class="aroundlaze-ai-chip">Mechanical keyboard</button>
      <button type="button" class="aroundlaze-ai-chip">Best monitor under $300</button>
      <button type="button" class="aroundlaze-ai-chip">Laptop stand</button>
      <button type="button" class="aroundlaze-ai-chip">USB-C dock</button>
      <button type="button" class="aroundlaze-ai-chip">SSD recommendations</button>
      <button type="button" class="aroundlaze-ai-chip">Budget headset</button>
      <button type="button" class="aroundlaze-ai-chip">Monitor for programming</button>
      <button type="button" class="aroundlaze-ai-chip">Best webcam</button>
      <button type="button" class="aroundlaze-ai-chip">External SSD</button>
    `;

    shell.querySelectorAll('.aroundlaze-ai-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        sendMessage(chip.textContent.trim());
      });
    });

    composer.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) {
        return;
      }
      sendMessage(value);
    });

    shell.querySelectorAll('[data-action]').forEach((control) => {
      control.addEventListener('click', () => {
        const action = control.getAttribute('data-action');
        if (action === 'close') {
          closePanel();
        } else if (action === 'minimize') {
          toggleMinimize();
        }
      });
    });

    return shell;
  };

  const setStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  const addMessage = (role, content, options = {}) => {
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
          <p><strong>Best For</strong><br>${aroundLazeAIService.escape(product.bestFor)}</p>
          <p><strong>Price Range</strong><br>${aroundLazeAIService.escape(product.priceRange)}</p>
          <p><strong>Key Features</strong><br>${aroundLazeAIService.escape(product.keyFeatures.join(' • '))}</p>
          <p><strong>Pros</strong><br>${aroundLazeAIService.escape(product.pros.join(' • '))}</p>
          <p><strong>Cons</strong><br>${aroundLazeAIService.escape(product.cons.join(' • '))}</p>
          <p><strong>Compatibility</strong><br>${aroundLazeAIService.escape(product.compatibility)}</p>
          <p><strong>Who Should Buy It</strong><br>${aroundLazeAIService.escape(product.whoShouldBuy)}</p>
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

    messagesContainer.appendChild(message);
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth"
    });
  };

  const openPanel = () => {
    buildShell();
    shell.hidden = false;
    isOpen = true;
    isMinimized = false;
    toggleButton.setAttribute('aria-expanded', 'true');
    toggleButton.classList.add('aroundlaze-ai-toggle--active');
    shell.classList.remove('aroundlaze-ai-shell--minimized');
    localStorage.setItem(aroundLazeAIConfig.storageKeys.panelOpen, 'true');
    if (!hasShownWelcome) {
      hasShownWelcome = true;
      localStorage.setItem(aroundLazeAIConfig.storageKeys.welcomeSeen, 'true');
      setTimeout(() => {
        addMessage('assistant', '👋 Welcome to AroundLaze AI!\n\nI\'m here to help you find the perfect tech accessories based on your budget and needs.\n\nBefore we begin, don\'t forget to subscribe to our newsletter to receive:\n• Latest reviews\n• Buying guides\n• New product recommendations\n• Exclusive deals\n• Technology news\n\nEnter your email below to stay updated.', { isTyping: false });
        const welcomeForm = document.createElement('form');
        welcomeForm.className = 'aroundlaze-ai-subscribe';
        welcomeForm.innerHTML = '<label class="visually-hidden" for="aroundlaze-ai-subscribe-email">Email address</label><input id="aroundlaze-ai-subscribe-email" type="email" placeholder="your@email.com" required /><button type="submit">Subscribe</button>';
        welcomeForm.addEventListener('submit', (event) => {
          event.preventDefault();

          const emailInput = welcomeForm.querySelector('input');
          const submitButton = welcomeForm.querySelector('button');

          if (!emailInput || !submitButton) return;

          const email = emailInput.value.trim();

          if (!email) {
            setStatus('Please enter your email.');
            return;
          }

          /*
          * TODO:
          * Replace this section with your real newsletter service
          * (Mailchimp, Brevo, ConvertKit, etc.)
          */

          submitButton.disabled = true;
          submitButton.textContent = 'Subscribing...';

          setTimeout(() => {
            submitButton.textContent = 'Subscribed ✓';
            emailInput.value = '';
            setStatus('Thanks for subscribing to AroundLaze!');
          }, 800);
        });
        messagesContainer.appendChild(welcomeForm);
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: "smooth"
        });
      }, 250);
    }
    if (messagesContainer && !messagesContainer.querySelector('.aroundlaze-ai-message')) {
      addMessage('assistant', 'I can help you compare accessories for gaming, work, students and creators. Ask me about a specific product or your budget.', { isTyping: false });
    }
    input.focus();
    focusTrapActive = true;
  };

  const closePanel = () => {
    if (!shell) {
      return;
    }
    shell.hidden = true;
    isOpen = false;
    isMinimized = false;
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.classList.remove('aroundlaze-ai-toggle--active');
    shell.classList.remove('aroundlaze-ai-shell--minimized');
    localStorage.setItem(aroundLazeAIConfig.storageKeys.panelOpen, 'false');
    focusTrapActive = false;
  };

  const toggleMinimize = () => {
    if (!shell) {
      return;
    }
    isMinimized = !isMinimized;
    shell.classList.toggle('aroundlaze-ai-shell--minimized', isMinimized);
  };

  const sendMessage = (value) => {
    buildShell();
    if (!shell.hidden) {
      input.value = '';
      addMessage('user', value);
      setStatus('Thinking…');
      const typing = document.createElement('div');
      typing.className = 'aroundlaze-ai-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messagesContainer.appendChild(typing);
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: "smooth"
      });
      window.setTimeout(() => {
        typing.remove();
        const detected = {
          category: aroundLazeAIService.detectCategory(value),
          budget: aroundLazeAIService.detectBudget(value),
          useCase: aroundLazeAIService.detectUseCase(value),
          device: aroundLazeAIService.detectDevice(value),
          operatingSystem: aroundLazeAIService.detectOperatingSystem(value),
          preferredBrand: aroundLazeAIService.detectBrand(value),
          country: aroundLazeAIService.detectCountry(value)
        };

        Object.keys(detected).forEach((key) => {
          if (detected[key]) {
            conversationContext[key] = detected[key];
          }
        });

        const context = { ...conversationContext };
        const response = aroundLazeAIService.getResponse(value, context);
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
      }, 700);
    }
  };

  toggleButton.addEventListener('click', () => {
    if (!isOpen) {
      openPanel();
    } else {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!focusTrapActive || !shell || shell.hidden) {
      return;
    }
    if (event.key === 'Tab') {
      const focusable = shell.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
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
  });

  if (localStorage.getItem(aroundLazeAIConfig.storageKeys.panelOpen) === 'true') {
    openPanel();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAroundLazeAI);
} else {
  initAroundLazeAI();
}