// navbar.js – FIXED VERSION - No endless retries on non-home pages
console.log('Navbar.js loaded successfully');

// Global state
window.currentLanguage = 'en';
let isToggleActive = true; // TRUE = Frames ON (left position), FALSE = Frames OFF (right position)
let currentPageType = 'home'; // Track current page type

// Erzeugt das Navbar-HTML und hängt es an den #navbar-container
function createNavbar(currentPage = 'home') {
  console.log('Creating navbar for page:', currentPage);
  currentPageType = currentPage; // Store page type

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
        <div id="navbar-gallery" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 pointer-events-none z-[60]">
          <div class="glass-element rounded-full px-4 py-2 flex items-center space-x-4">
            <h2 class="navbar-text text-xs md:text-sm tracking-[0.2em] font-extralight whitespace-nowrap">Exhibition</h2>
            
            <!-- Beautiful Toggle Switch -->
            <div class="flex items-center space-x-2">
              <span class="text-xs navbar-text font-light">Frames</span>
              <div class="toggle-switch" id="toggle-switch">
                <div class="toggle-track" id="toggle-track">
                  <div class="toggle-thumb" id="toggle-thumb"></div>
                </div>
              </div>
            </div>
            
            <!-- Beautiful Slider -->
            <div id="spacing-controls" class="flex items-center space-x-2 transition-all duration-300">
              <span class="text-xs navbar-text font-light">Gap</span>
              <div class="slider-container">
                <input type="range" id="spacing-slider" min="0" max="30" value="3" class="custom-slider" />
              </div>
            </div>
          </div>
        </div>
        ` : ''}

        <!-- Burger-Button -->
        <button onclick="toggleMenu()" class="rounded-full p-2 hover:bg-white/20 transition-all relative z-[70]" id="burger-btn">
          <i class="navbar-text fas fa-bars text-sm burger-btn-icon"></i>
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
            <a href="guide.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105]">
              <div class="flex items-center space-x-3">
                <i class="fas fa-clock text-neutral-600"></i>
                <span class="text-lg font-light text-neutral-800">Guide</span>
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
    <div class="fixed top-0 left-0 w-full h-0.5 z-40">
      <div id="progress-bar" class="h-full bg-gradient-to-r from-white/60 to-white/40 shadow-sm" style="width:0%"></div>
    </div>
  `;

  document.getElementById('navbar-container').innerHTML = html;
  console.log('Navbar HTML inserted');
  
  // Add styles FIRST
  addNavbarStyles();
  
  // Initialize functionality after DOM is ready - ONLY for home page
  if (currentPage === 'home') {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initNavbarControls();
      });
    });
  }
}

// Add beautiful styles for toggle and slider - IMPROVED VERSION
function addNavbarStyles() {
  // Remove existing styles first
  const existingStyles = document.getElementById('navbar-custom-styles');
  if (existingStyles) {
    existingStyles.remove();
  }
  
  const styleSheet = document.createElement('style');
  styleSheet.id = 'navbar-custom-styles';
  styleSheet.textContent = `
    /* Beautiful Toggle Switch - IMPROVED WITH BETTER VISIBILITY */
    .toggle-switch {
      width: 44px;
      height: 22px;
      cursor: pointer;
      user-select: none;
      position: relative;
      display: flex;
      align-items: center;
      z-index: 70;
    }

    .toggle-track {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.15) 100%
      );
      border-radius: 11px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.15),
        0 1px 2px rgba(255, 255, 255, 0.1);
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* FRAMES OFF STATE (Toggle rechts) - Dunklerer Hintergrund */
    .toggle-track.active {
      background: linear-gradient(135deg, 
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.25) 100%
      );
      border-color: rgba(0, 0, 0, 0.4);
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.3),
        0 1px 2px rgba(0, 0, 0, 0.15);
    }

    .toggle-thumb {
      width: 18px;
      height: 18px;
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 100%
      );
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 
        0 2px 6px rgba(0, 0, 0, 0.3),
        0 1px 3px rgba(0, 0, 0, 0.2),
        inset 0 1px 2px rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    /* FRAMES OFF STATE (Toggle rechts) - Kontrastierender Thumb */
    .toggle-thumb.active {
      transform: translateX(22px);
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(240, 240, 240, 1) 100%
      );
      box-shadow: 
        0 3px 8px rgba(0, 0, 0, 0.4),
        0 1px 4px rgba(0, 0, 0, 0.3),
        inset 0 1px 3px rgba(255, 255, 255, 1);
      border: 2px solid rgba(255, 255, 255, 0.9);
    }

    .toggle-switch:hover .toggle-track {
      border-color: rgba(255, 255, 255, 0.5);
    }

    .toggle-switch:hover .toggle-track.active {
      border-color: rgba(0, 0, 0, 0.6);
      background: linear-gradient(135deg, 
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
    }

    .toggle-switch:hover .toggle-thumb {
      box-shadow: 
        0 3px 10px rgba(0, 0, 0, 0.35),
        0 1px 5px rgba(0, 0, 0, 0.25),
        inset 0 1px 3px rgba(255, 255, 255, 1);
    }

    .toggle-switch:hover .toggle-thumb.active {
      box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.5),
        0 2px 6px rgba(0, 0, 0, 0.35),
        inset 0 1px 4px rgba(255, 255, 255, 1);
    }

    /* Beautiful Slider - COMPLETELY REDESIGNED */
    .slider-container {
      width: 70px;
      height: 22px;
      padding: 4px;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 100%
      );
      border-radius: 11px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.2),
        0 1px 2px rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      z-index: 70;
    }

    .custom-slider {
      width: 100%;
      height: 14px;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      border-radius: 7px;
      outline: none;
      border: none;
      cursor: pointer;
      position: relative;
    }

    /* Track Styles */
    .custom-slider::-webkit-slider-track {
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.15) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .custom-slider::-moz-range-track {
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.15) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Thumb Styles - PERFECTLY CENTERED */
    .custom-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.8) 100%
      );
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.25),
        0 1px 2px rgba(0, 0, 0, 0.15),
        inset 0 1px 1px rgba(255, 255, 255, 0.8);
      transition: all 0.2s ease;
      position: relative;
    }

    .custom-slider::-webkit-slider-thumb:hover {
      transform: scale(1.15);
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 100%
      );
      box-shadow: 
        0 3px 8px rgba(0, 0, 0, 0.3),
        0 1px 4px rgba(0, 0, 0, 0.2),
        inset 0 1px 2px rgba(255, 255, 255, 0.9);
    }

    .custom-slider::-moz-range-thumb {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.8) 100%
      );
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.25),
        0 1px 2px rgba(0, 0, 0, 0.15),
        inset 0 1px 1px rgba(255, 255, 255, 0.8);
      transition: all 0.2s ease;
    }

    .custom-slider::-moz-range-thumb:hover {
      transform: scale(1.15);
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.9) 100%
      );
      box-shadow: 
        0 3px 8px rgba(0, 0, 0, 0.3),
        0 1px 4px rgba(0, 0, 0, 0.2),
        inset 0 1px 2px rgba(255, 255, 255, 0.9);
    }

    /* Ensure proper pointer events for gallery panel */
    #navbar-gallery {
      pointer-events: none;
    }

    #navbar-gallery.active {
      pointer-events: auto;
    }

    #navbar-gallery .glass-element {
      pointer-events: auto;
    }
  `;
  
  document.head.appendChild(styleSheet);
  console.log('Navbar styles added');
}

// Initialize navbar controls - ONLY FOR HOME PAGE
function initNavbarControls() {
  if (currentPageType !== 'home') {
    console.log('Not on home page, skipping navbar controls initialization');
    return;
  }

  console.log('Initializing navbar controls for home page...');
  
  // Wait for elements to be available - WITH RETRY LIMIT
  let retryCount = 0;
  const maxRetries = 10; // Maximum 10 retries (1 second total)
  
  const waitForElements = () => {
    const toggleSwitch = document.getElementById('toggle-switch');
    const toggleTrack = document.getElementById('toggle-track');
    const toggleThumb = document.getElementById('toggle-thumb');
    const spacingSlider = document.getElementById('spacing-slider');
    
    if (!toggleSwitch || !toggleTrack || !toggleThumb) {
      retryCount++;
      if (retryCount < maxRetries) {
        console.log(`Toggle elements not found, retrying... (${retryCount}/${maxRetries})`);
        setTimeout(waitForElements, 100);
      } else {
        console.log('Toggle elements not found after maximum retries, giving up');
      }
      return;
    }

    console.log('All navbar elements found, setting up event listeners...');

    // Set initial state - FRAMES ON (toggle LEFT position)
    isToggleActive = true; // TRUE = frames ON = toggle LEFT
    updateToggleState(isToggleActive);
    
    // Toggle click handler - FIXED
    const handleToggleClick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Toggle clicked!');
      
      isToggleActive = !isToggleActive;
      console.log('New toggle state:', isToggleActive);
      
      updateToggleState(isToggleActive);
      handleToggleChange(isToggleActive);
    };

    // Add multiple event listeners to ensure it works
    toggleSwitch.addEventListener('click', handleToggleClick);
    toggleTrack.addEventListener('click', handleToggleClick);
    toggleThumb.addEventListener('click', handleToggleClick);

    // Slider input handler - FIXED
    if (spacingSlider) {
      const handleSliderChange = function(e) {
        console.log('Slider changed to:', e.target.value);
        handleSpacingChange(e.target.value);
      };

      spacingSlider.addEventListener('input', handleSliderChange);
      spacingSlider.addEventListener('change', handleSliderChange);
      
      // Set initial spacing
      handleSpacingChange(spacingSlider.value);
    }

    console.log('Navbar controls initialized successfully');
  };

  // Start waiting for elements
  waitForElements();

  // Update toggle visual state - CORRECTED LOGIC
  function updateToggleState(active) {
    const toggleTrack = document.getElementById('toggle-track');
    const toggleThumb = document.getElementById('toggle-thumb');
    const spacingControls = document.getElementById('spacing-controls');
    
    if (!toggleTrack || !toggleThumb) return;
    
    console.log('Updating toggle state to:', active ? 'FRAMES ON (left)' : 'FRAMES OFF (right)');
    
    if (active) {
      // FRAMES ON = Toggle LEFT position (default state)
      toggleTrack.classList.remove('active');
      toggleThumb.classList.remove('active');
    } else {
      // FRAMES OFF = Toggle RIGHT position (active classes)
      toggleTrack.classList.add('active');
      toggleThumb.classList.add('active');
    }
    
    // Slider is ALWAYS enabled now
    if (spacingControls) {
      spacingControls.classList.remove('disabled');
    }
  }

  // Handle toggle change - Apply to gallery (SLIDER ALWAYS WORKS)
  function handleToggleChange(isActive) {
    console.log('handleToggleChange called - Frames are:', isActive ? 'ON' : 'OFF');
    
    // Wait for gallery to be available
    setTimeout(() => {
      const artworks = document.querySelectorAll('.gallery-artwork');
      console.log('Found', artworks.length, 'artworks to modify');
      
      if (isActive) {
        // FRAMES ON
        console.log('Enabling metallic frames...');
        artworks.forEach(artwork => {
          artwork.style.border = 'solid 10px';
          artwork.style.borderImage = 'linear-gradient(to bottom right, #56575a, #000) 1';
          artwork.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.25) inset, 0 5px 10px 5px rgba(0, 0, 0, 0.25)';
          artwork.style.borderRadius = '4px';
          
          const img = artwork.querySelector('.artwork-image');
          if (img) {
            if (img.tagName === 'IMG') {
              img.style.border = 'groove 4px';
              img.style.borderBottomColor = '#56575a';
              img.style.borderLeftColor = '#2b2b2d';
              img.style.borderRightColor = '#2b2b2d';
              img.style.borderTopColor = '#000';
            }
            img.style.borderRadius = '1px';
          }
        });
        
      } else {
        // FRAMES OFF - But images can still be spaced with slider
        console.log('Disabling frames (but keeping slider functional)...');
        artworks.forEach(artwork => {
          artwork.style.border = 'none';
          artwork.style.borderImage = 'none';
          artwork.style.boxShadow = 'none';
          artwork.style.borderRadius = '4px'; // Keep slight rounding for clean look
          
          const img = artwork.querySelector('.artwork-image');
          if (img) {
            img.style.border = 'none';
            img.style.borderRadius = '4px'; // Keep slight rounding
          }
        });
      }
      
      // Always apply current spacing (slider works in both modes)
      const spacingSlider = document.getElementById('spacing-slider');
      const spacing = spacingSlider ? spacingSlider.value : '3';
      handleSpacingChange(spacing);
      
    }, 100);
  }

  // Handle spacing change - Apply to gallery grid
  function handleSpacingChange(value) {
    console.log('handleSpacingChange called with:', value);
    
    setTimeout(() => {
      const grid = document.querySelector('.metallic-gallery-grid');
      if (grid) {
        grid.style.gap = value + 'px';
        console.log('Updated grid gap to:', value + 'px');
      } else {
        console.log('Gallery grid not found');
      }
    }, 50);
  }
}

// Menü öffnen/schließen
function toggleMenu() {
  const overlay = document.getElementById('menu-overlay');
  const panel = document.getElementById('menu-panel');
  const btn = document.getElementById('burger-btn');
  if (!overlay || !panel || !btn) return;
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => panel.style.transform = 'translateX(0)', 10);
    btn.innerHTML = '<i class="navbar-text fas fa-times text-sm burger-btn-icon"></i>';
  } else {
    panel.style.transform = 'translateX(100%)';
    setTimeout(() => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
    btn.innerHTML = '<i class="navbar-text fas fa-bars text-sm burger-btn-icon"></i>';
  }
}

// Sprache umschalten - IMPROVED
function setLanguage(lang) {
  console.log('Setting language to:', lang);
  window.currentLanguage = lang;
  
  const btnEn = document.getElementById('btn-en');
  const btnDe = document.getElementById('btn-de');
  
  if (btnEn && btnDe) {
    btnEn.className = lang==='en'
      ? 'px-3 py-1 rounded-full text-sm bg-neutral-800/20 text-neutral-800 font-medium'
      : 'px-3 py-1 rounded-full text-sm text-neutral-600 hover:text-neutral-800';
    btnDe.className = lang==='de'
      ? 'px-3 py-1 rounded-full text-sm bg-neutral-800/20 text-neutral-800 font-medium'
      : 'px-3 py-1 rounded-full text-sm text-neutral-600 hover:text-neutral-800';
  }
  
  // Update page language if function exists
  if (typeof updatePageLanguage === 'function') {
    updatePageLanguage(lang);
  }
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
      nav.classList.add('scrolled'); 
      texts.forEach(e => e.classList.add('scrolled'));
      const o = Math.min(1, ratio * 1.2);
      nav.style.background = `linear-gradient(135deg, rgba(255,255,255,${0.03 + o*0.92}), rgba(255,255,255,${0.01 + o*0.84}))`;
    } else {
      nav.classList.remove('scrolled'); 
      texts.forEach(e => e.classList.remove('scrolled'));
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
      nav.classList.add('scrolled'); 
      texts.forEach(e => e.classList.add('scrolled'));
    } else {
      nav.classList.remove('scrolled'); 
      texts.forEach(e => e.classList.remove('scrolled'));
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
    const gallerySection = document.getElementById('gallery-section');
    const panel = document.getElementById('navbar-gallery');
    const logo = document.getElementById('main-logo-mobile');
    
    if (!gallerySection || !panel) return;
    
    const rect = gallerySection.getBoundingClientRect();
    const inView = rect.top <= 100;
    const isMobile = window.innerWidth < 768;
    
    if (inView) {
      panel.style.opacity = '1';
      panel.style.pointerEvents = 'auto';
      panel.style.transform = 'translate(-50%, -50%) scale(1)';
      panel.classList.add('active');
      
      if (logo && isMobile) { 
        logo.style.opacity = '0'; 
        logo.style.transform = 'scale(0.8)'; 
        logo.style.pointerEvents = 'none'; 
      }
    } else {
      panel.style.opacity = '0';
      panel.style.pointerEvents = 'none';
      panel.style.transform = 'translate(-50%, -50%) scale(0.9)';
      panel.classList.remove('active');
      
      if (logo && isMobile) { 
        logo.style.opacity = '1'; 
        logo.style.transform = 'scale(1)'; 
        logo.style.pointerEvents = 'auto'; 
      }
    }
  }
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  setTimeout(onScroll, 100);
}

// Initialisierung aller Navbar-Teile
function initNavbar(currentPage = 'home') {
  console.log('initNavbar called for page:', currentPage);
  
  const init = () => {
    createNavbar(currentPage);
    setLanguage('en');
    if (currentPage === 'home') {
      initDynamicNavbar();
      initHomeNavbarBehavior();
    } else {
      initSimpleNavbarBehavior();
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

// Globale Exports
window.toggleMenu = toggleMenu;
window.setLanguage = setLanguage;
window.initNavbar = initNavbar;
window.updateScrollProgress = updateScrollProgress;
window.currentLanguage = 'en';

console.log('Navbar.js fully loaded and ready - All functions exported globally');