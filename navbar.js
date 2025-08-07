// navbar.js – Central Navigation Component mit Frame-Toggle & Slider
console.log('Navbar.js loaded successfully');

// Erzeugt das Navbar-HTML und hängt es an den #navbar-container
function createNavbar(currentPage = 'home') {
  console.log('Creating navbar for page:', currentPage);

  const html = `
    <header class="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div class="flex justify-between items-center px-4 md:px-8 h-full">
        <!-- Logo Desktop -->
        <div class="glass-element rounded-full px-3 md:px-4 py-1.5 hidden md:block">
          <a href="index.html" class="navbar-text text-sm md:text-base tracking-[0.2em] font-extralight hover:opacity-80 transition-all">
            The Infinite Canvas
          </a>
        </div>
        <!-- Logo Mobile -->
        <div class="glass-element rounded-full px-3 py-1.5 md:hidden transition-all duration-500" id="main-logo-mobile">
          <a href="index.html" class="navbar-text text-sm tracking-[0.2em] font-extralight hover:opacity-80 transition-all">
            The Infinite Canvas
          </a>
        </div>

        <!-- Mittleres Panel nur auf Homepage -->
        ${currentPage === 'home' ? `
        <div id="navbar-gallery" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 pointer-events-none">
          <div class="glass-element rounded-full px-3 py-1 flex items-center space-x-4 max-h-[40px]">
            <h2 class="navbar-text text-xs md:text-sm tracking-[0.2em] font-extralight whitespace-nowrap">Exhibition</h2>
            <!-- Frame Toggle -->
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="frame-toggle" class="sr-only" checked onchange="toggleFrames()" />
              <div class="w-12 h-6 bg-white/20 rounded-full peer-checked:bg-white/40 transition-colors"></div>
              <span id="toggle-dot" class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transform transition-transform peer-checked:translate-x-6"></span>
            </label>
            <!-- Spacing Slider -->
            <div id="spacing-controls" class="opacity-100 pointer-events-auto transition-opacity duration-300">
              <input type="range" id="spacing-slider" min="0" max="30" value="3"
                     class="slider w-24" oninput="updateSpacing(this.value)" title="Frame spacing" />
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Burger-Button -->
        <button onclick="toggleMenu()" class="rounded-full p-2 hover:bg-white/20 transition-all relative z-[70]" id="burger-btn">
          <i class="navbar-text fas fa-bars text-sm"></i>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div id="menu-overlay" class="fixed inset-0 z-[100] bg-black/50 hidden" style="backdrop-filter: blur(8px);">
      <div id="menu-panel" class="fixed top-0 right-0 h-full w-80 transform translate-x-full transition-transform duration-300"
           style="background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85)); backdrop-filter: blur(20px); border-left:1px solid rgba(255,255,255,0.3)">
        <div class="p-8">
          <div class="flex justify-end mb-8">
            <button onclick="toggleMenu()" class="glass-element rounded-full p-3 hover:bg-white/20">
              <i class="fas fa-times text-neutral-800"></i>
            </button>
          </div>
          <nav class="space-y-6">
            <a href="index.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105]">
              <div class="flex items-center space-x-3">
                <i class="fas fa-home text-neutral-600"></i>
                <span class="text-lg font-light text-neutral-800">Home</span>
              </div>
            </a>
            <a href="timeline.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105]">
              <div class="flex items-center space-x-3">
                <i class="fas fa-clock text-neutral-600"></i>
                <span class="text-lg font-light text-neutral-800">Timeline</span>
              </div>
            </a>
            <a href="contact.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105]">
              <div class="flex items-center space-x-3">
                <i class="fas fa-envelope text-neutral-600"></i>
                <span class="text-lg font-light text-neutral-800">Contact</span>
              </div>
            </a>
            <div class="glass-element rounded-2xl p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-globe text-neutral-600"></i>
                  <span class="text-lg font-light text-neutral-800">Language</span>
                </div>
                <div class="flex space-x-2">
                  <button onclick="setLanguage('en')" id="btn-en" class="px-3 py-1 rounded-full text-sm bg-neutral-800/20 text-neutral-800 font-medium">EN</button>
                  <button onclick="setLanguage('de')" id="btn-de" class="px-3 py-1 rounded-full text-sm text-neutral-600 hover:text-neutral-800">DE</button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- Progress-Bar -->
    <div class="fixed top-0 left-0 w-full h-0.5 z-50">
      <div id="progress-bar" class="h-full bg-gradient-to-r from-white/60 to-white/40 shadow-sm" style="width:0%"></div>
    </div>
  `;

  document.getElementById('navbar-container').innerHTML = html;
  console.log('Navbar HTML inserted');
}

// Menü öffnen/schließen
function toggleMenu() {
  const overlay = document.getElementById('menu-overlay');
  const panel   = document.getElementById('menu-panel');
  const btn     = document.getElementById('burger-btn');
  if (!overlay || !panel || !btn) return;
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => panel.style.transform = 'translateX(0)', 10);
    btn.innerHTML = '<i class="navbar-text fas fa-times text-sm"></i>';
  } else {
    panel.style.transform = 'translateX(100%)';
    setTimeout(() => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
    btn.innerHTML = '<i class="navbar-text fas fa-bars text-sm"></i>';
  }
}

// Sprache umschalten
const translations = {
  en: { home:'Home', timeline:'Timeline', contact:'Contact', language:'Language' },
  de: { home:'Startseite', timeline:'Timeline', contact:'Kontakt', language:'Sprache' }
};

function setLanguage(lang) {
  const t = translations[lang] || translations.en;
  // Buttons
  document.getElementById('btn-en').className = lang==='en'
    ? 'px-3 py-1 rounded-full text-sm bg-neutral-800/20 text-neutral-800 font-medium'
    : 'px-3 py-1 rounded-full text-sm text-neutral-600 hover:text-neutral-800';
  document.getElementById('btn-de').className = lang==='de'
    ? 'px-3 py-1 rounded-full text-sm bg-neutral-800/20 text-neutral-800 font-medium'
    : 'px-3 py-1 rounded-full text-sm text-neutral-600 hover:text-neutral-800';
}

// Dynamische Navbar (Farbe & Progress)
function initDynamicNavbar() {
  const nav = document.querySelector('.glass-navbar');
  const texts = document.querySelectorAll('.navbar-text');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const h = window.innerHeight;
    const nh = 60;
    const start = Math.max(0, y + nh - h);
    const ratio = Math.min(1, start / nh);
    if (ratio > 0.1) {
      nav.classList.add('scrolled'); texts.forEach(e => e.classList.add('scrolled'));
      const o = Math.min(1, ratio * 1.2);
      nav.style.background = `linear-gradient(135deg, rgba(255,255,255,${0.03 + o*0.92}), rgba(255,255,255,${0.01 + o*0.84}))`;
    } else {
      nav.classList.remove('scrolled'); texts.forEach(e => e.classList.remove('scrolled'));
      nav.style.background = '';
    }
    updateScrollProgress();
  });
}

// Einfaches Verhalten auf anderen Seiten
function initSimpleNavbarBehavior() {
  const nav = document.querySelector('.glass-navbar');
  const texts = document.querySelectorAll('.navbar-text');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled'); texts.forEach(e => e.classList.add('scrolled'));
    } else {
      nav.classList.remove('scrolled'); texts.forEach(e => e.classList.remove('scrolled'));
    }
    updateScrollProgress();
  });
}

// Scroll-Progress-Bar updaten
function updateScrollProgress() {
  const y = window.scrollY;
  const wh = window.innerHeight;
  const dh = document.documentElement.scrollHeight;
  const pct = (y / (dh - wh)) * 100;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';
}

// Home-spezifisches Verhalten: Mittleres Panel ein-/ausblenden
function initHomeNavbarBehavior() {
  function onScroll() {
    const rect = document.getElementById('gallery-section').getBoundingClientRect();
    const inView = rect.top <= 100;
    const isMobile = window.innerWidth < 768;
    const panel = document.getElementById('navbar-gallery');
    const logo = document.getElementById('main-logo-mobile');
    if (!panel || !logo) return;
    if (inView) {
      panel.style.opacity = '1';
      panel.style.transform = 'translate(-50%, -50%) scale(1)';
      if (isMobile) { logo.style.opacity = '0'; logo.style.transform = 'scale(0.8)'; logo.style.pointerEvents = 'none'; }
    } else {
      panel.style.opacity = '0';
      panel.style.transform = 'translate(-50%, -50%) scale(0.9)';
      if (isMobile) { logo.style.opacity = '1'; logo.style.transform = 'scale(1)'; logo.style.pointerEvents = 'auto'; }
    }
  }
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  setTimeout(onScroll, 100);
}

// Frame-Toggle & Spacing-Slider
function toggleFrames() {
  const on = document.getElementById('frame-toggle').checked;
  const grid = document.querySelector('.metallic-gallery-grid');
  const items = document.querySelectorAll('.gallery-artwork');
  const ctrl = document.getElementById('spacing-controls');
  if (on) {
    ctrl.style.opacity = '1'; ctrl.style.pointerEvents = 'auto';
    items.forEach(a => {
      a.style.border = '10px solid';
      a.style.borderImage = 'linear-gradient(to bottom right, #56575a, #000) 1';
      a.style.boxShadow = '0 0 5px rgba(0,0,0,0.25) inset, 0 5px 10px rgba(0,0,0,0.25)';
      const img = a.querySelector('.artwork-image');
      if (img) img.style.border = 'groove 4px';
    });
    updateSpacing(document.getElementById('spacing-slider').value);
  } else {
    ctrl.style.opacity = '0.3'; ctrl.style.pointerEvents = 'none';
    items.forEach(a => {
      a.style.border = 'none'; a.style.boxShadow = 'none';
      const img = a.querySelector('.artwork-image'); if (img) img.style.border = 'none';
    });
    if (grid) grid.style.gap = '0px';
  }
}

function updateSpacing(val) {
  const grid = document.querySelector('.metallic-gallery-grid');
  if (grid) grid.style.gap = val + 'px';
}

// Initialisierung aller Navbar-Teile
function initNavbar(currentPage = 'home') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createNavbar(currentPage);
      setLanguage('en');
      if (currentPage === 'home') {
        initDynamicNavbar();
        initHomeNavbarBehavior();
      } else {
        initSimpleNavbarBehavior();
      }
    });
  } else {
    createNavbar(currentPage);
    setLanguage('en');
    if (currentPage === 'home') {
      initDynamicNavbar();
      initHomeNavbarBehavior();
    } else {
      initSimpleNavbarBehavior();
    }
  }
}

// Globale Exports
window.toggleMenu = toggleMenu;
window.setLanguage = setLanguage;
window.initNavbar = initNavbar;
window.updateScrollProgress = updateScrollProgress;

console.log('Navbar.js fully loaded and ready');