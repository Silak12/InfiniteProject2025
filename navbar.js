// navbar.js - Central Navigation Component (FIXED VERSION with Dynamic Colors and Mobile Logo Fix)
console.log('Navbar.js loaded successfully');

// Create navbar HTML
function createNavbar(currentPage = 'home') {
    console.log('Creating navbar for page:', currentPage);
    
    const navbarHTML = `
    <!-- Glasmorphismus Header -->
    <header class="fixed top-0 left-0 right-0 z-50 glass-navbar">
        <div class="flex justify-between items-center px-4 md:px-8 h-full">
            <!-- Desktop: Show logo, Mobile: Empty space -->
            <div class="glass-element rounded-full px-3 md:px-4 py-1.5 hidden md:block">
                <a href="index.html" class="navbar-text text-sm md:text-base tracking-[0.2em] font-extralight hover:opacity-80 transition-all">The Infinite Canvas</a>
            </div>
            <div class="md:hidden"></div>
            
            <!-- Museum Text in Navbar - Only show on homepage, FIXED POSITION -->
            ${currentPage === 'home' ? `
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-element rounded-full px-3 md:px-4 py-1.5 pointer-events-none" id="navbar-museum">
                <h2 class="navbar-text text-sm md:text-base tracking-[0.2em] font-extralight whitespace-nowrap">Museum</h2>
            </div>
            ` : ''}
            
            <!-- Burger Menu Button -->
            <button onclick="toggleMenu()" class="burger-menu rounded-full p-2 transition-all hover:bg-white/20 relative z-[70]" id="burger-btn">
                <i class="navbar-text fas fa-bars text-sm"></i>
            </button>
        </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div id="menu-overlay" class="fixed inset-0 z-[100] bg-black/50 hidden" style="backdrop-filter: blur(8px);">
        <div class="fixed top-0 right-0 h-full w-80 transform translate-x-full transition-transform duration-300" id="menu-panel" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85)); backdrop-filter: blur(20px); border-left: 1px solid rgba(255, 255, 255, 0.3);">
            <div class="p-8">
                <!-- Close Button -->
                <div class="flex justify-end mb-8">
                    <button onclick="toggleMenu()" class="glass-element rounded-full p-3 hover:bg-white/20 transition-all relative z-[110]">
                        <i class="fas fa-times text-neutral-800"></i>
                    </button>
                </div>
                
                <!-- Menu Items -->
                <nav class="space-y-6">
                    <!-- Mobile: Show logo in menu -->
                    <div class="md:hidden glass-element rounded-2xl p-4 bg-neutral-800/10 mb-6">
                        <div class="text-center">
                            <span class="text-lg font-light text-neutral-800">The Infinite Canvas</span>
                        </div>
                    </div>
                    
                    <a href="index.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105] ${currentPage === 'home' ? 'bg-neutral-800/10' : ''}">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-home ${currentPage === 'home' ? 'text-neutral-800' : 'text-neutral-600'}"></i>
                            <span class="text-lg font-light text-neutral-800" id="menu-home">Home</span>
                        </div>
                    </a>
                    
                    <a href="timeline.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105] ${currentPage === 'timeline' ? 'bg-neutral-800/10' : ''}">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-clock ${currentPage === 'timeline' ? 'text-neutral-800' : 'text-neutral-600'}"></i>
                            <span class="text-lg font-light text-neutral-800" id="menu-timeline">Timeline</span>
                        </div>
                    </a>
                    
                    <a href="contact.html" class="block glass-element rounded-2xl p-4 hover:bg-white/20 transition-all relative z-[105] ${currentPage === 'contact' ? 'bg-neutral-800/10' : ''}">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-envelope ${currentPage === 'contact' ? 'text-neutral-800' : 'text-neutral-600'}"></i>
                            <span class="text-lg font-light text-neutral-800" id="menu-contact">Contact</span>
                        </div>
                    </a>
                    
                    <!-- Language Toggle -->
                    <div class="glass-element rounded-2xl p-4 relative z-[105]">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <i class="fas fa-globe text-neutral-600"></i>
                                <span class="text-lg font-light text-neutral-800" id="menu-language">Language</span>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="setLanguage('en')" id="btn-en" class="px-3 py-1 rounded-full text-sm transition-all bg-neutral-800/20 text-neutral-800 font-medium relative z-[110]">EN</button>
                                <button onclick="setLanguage('de')" id="btn-de" class="px-3 py-1 rounded-full text-sm transition-all text-neutral-600 hover:text-neutral-800 relative z-[110]">DE</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <!-- Progress Indicator -->
    <div class="fixed top-0 left-0 w-full h-0.5 z-50">
        <div id="progress-bar" class="h-full bg-gradient-to-r from-white/60 to-white/40 transition-all duration-300 shadow-sm" style="width: 0%"></div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    console.log('Navbar HTML inserted');
}

// Navigation Functions
function toggleMenu() {
    console.log('Toggle menu called');
    const overlay = document.getElementById('menu-overlay');
    const panel = document.getElementById('menu-panel');
    const burger = document.getElementById('burger-btn');
    
    if (!overlay || !panel || !burger) {
        console.error('Menu elements not found');
        return;
    }
    
    if (overlay.classList.contains('hidden')) {
        console.log('Opening menu');
        // Show overlay
        overlay.classList.remove('hidden');
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Slide in panel after a tiny delay
        setTimeout(() => {
            panel.style.transform = 'translateX(0)';
        }, 10);
        
        // Update burger icon
        burger.innerHTML = '<i class="navbar-text fas fa-times text-sm"></i>';
    } else {
        console.log('Closing menu');
        // Slide out panel
        panel.style.transform = 'translateX(100%)';
        
        // Hide overlay after animation
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
        
        // Update burger icon
        burger.innerHTML = '<i class="navbar-text fas fa-bars text-sm"></i>';
    }
}

// Language System
const translations = {
    en: {
        menuHome: 'Home',
        menuTimeline: 'Timeline',
        menuContact: 'Contact',
        menuLanguage: 'Language'
    },
    de: {
        menuHome: 'Startseite',
        menuTimeline: 'Timeline',
        menuContact: 'Kontakt',
        menuLanguage: 'Sprache'
    }
};

let currentLanguage = 'en';

function setLanguage(lang) {
    console.log('Setting language to:', lang);
    currentLanguage = lang;
    const t = translations[lang];
    
    // Update navbar menu items
    const menuHome = document.getElementById('menu-home');
    const menuTimeline = document.getElementById('menu-timeline');
    const menuContact = document.getElementById('menu-contact');
    const menuLanguage = document.getElementById('menu-language');
    
    if (menuHome) menuHome.textContent = t.menuHome;
    if (menuTimeline) menuTimeline.textContent = t.menuTimeline;
    if (menuContact) menuContact.textContent = t.menuContact;
    if (menuLanguage) menuLanguage.textContent = t.menuLanguage;
    
    // Update button styles
    const btnDe = document.getElementById('btn-de');
    const btnEn = document.getElementById('btn-en');
    
    if (btnDe && btnEn) {
        btnDe.className = lang === 'de' ? 
            'px-3 py-1 rounded-full text-sm transition-all bg-neutral-800/20 text-neutral-800 font-medium relative z-[110]' : 
            'px-3 py-1 rounded-full text-sm transition-all text-neutral-600 hover:text-neutral-800 relative z-[110]';
        btnEn.className = lang === 'en' ? 
            'px-3 py-1 rounded-full text-sm transition-all bg-neutral-800/20 text-neutral-800 font-medium relative z-[110]' : 
            'px-3 py-1 rounded-full text-sm transition-all text-neutral-600 hover:text-neutral-800 relative z-[110]';
    }
    
    // Call page-specific language update if it exists
    if (typeof updatePageLanguage === 'function') {
        console.log('Calling page-specific language update');
        updatePageLanguage(lang);
    }
}

// Scroll progress
function updateScrollProgress() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate scroll progress
    const scrollProgress = (scrollY / (documentHeight - windowHeight)) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
}

// Initialize navbar
function initNavbar(currentPage = 'home') {
    console.log('Initializing navbar for page:', currentPage);
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createNavbar(currentPage);
            setupEventListeners();
            setLanguage('en'); // Default to English
        });
    } else {
        createNavbar(currentPage);
        setupEventListeners();
        setLanguage('en'); // Default to English
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // Listen to window scroll
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('menu-overlay');
            if (overlay && !overlay.classList.contains('hidden')) {
                toggleMenu();
            }
        }
    });
    
    // Close menu when clicking on overlay (not the panel)
    document.addEventListener('click', function(e) {
        const overlay = document.getElementById('menu-overlay');
        const panel = document.getElementById('menu-panel');
        
        if (overlay && !overlay.classList.contains('hidden') && 
            e.target === overlay && !panel.contains(e.target)) {
            toggleMenu();
        }
    });
    
    console.log('Event listeners set up');
}

// Make functions global
window.toggleMenu = toggleMenu;
window.setLanguage = setLanguage;
window.initNavbar = initNavbar;
window.updateScrollProgress = updateScrollProgress;

console.log('Navbar.js fully loaded and ready');