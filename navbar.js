// navbar.js - Central Navigation Component (UPDATED - All navbar features from index.html)
console.log('Navbar.js loaded successfully');

// Create navbar HTML with all features from index.html
function createNavbar(currentPage = 'home') {
    console.log('Creating navbar for page:', currentPage);
    
    const navbarHTML = `
    <!-- SCHLANKE Glasmorphismus Header -->
    <header class="fixed top-0 left-0 right-0 z-50 glass-navbar">
        <div class="flex justify-between items-center px-4 md:px-8 h-full">
            <!-- Desktop: Show logo -->
            <div class="glass-element rounded-full px-3 md:px-4 py-1.5 hidden md:block">
                <a href="index.html" class="navbar-text text-sm md:text-base tracking-[0.2em] font-extralight hover:opacity-80 transition-all">The Infinite Canvas</a>
            </div>
            
            <!-- Mobile: Show logo (will be controlled by page-specific behavior) -->
            <div class="glass-element rounded-full px-3 py-1.5 md:hidden transition-all duration-500" id="main-logo-mobile">
                <a href="index.html" class="navbar-text text-sm tracking-[0.2em] font-extralight hover:opacity-80 transition-all">The Infinite Canvas</a>
            </div>
            
            <!-- Museum Text in Navbar - FIXED POSITION (only for homepage) -->
            ${currentPage === 'home' ? `
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-element rounded-full px-3 md:px-4 py-1.5 pointer-events-none" id="navbar-museum">
                <h2 class="navbar-text text-sm md:text-base tracking-[0.2em] font-extralight whitespace-nowrap">Museum</h2>
            </div>
            ` : ''}
            
            <!-- Exhibition Text in Navbar - PERFECTLY CENTERED (only for homepage) -->
            ${currentPage === 'home' ? `
            <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 pointer-events-none" id="navbar-exhibition">
                <div class="glass-element rounded-full px-2 md:px-3 py-1 max-h-[40px] flex items-center">
                    <h2 class="navbar-text text-xs md:text-sm tracking-[0.2em] font-extralight whitespace-nowrap text-center">Exhibition</h2>
                </div>
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

// Homepage specific navbar behavior - Museum/Exhibition toggle
function initHomeNavbarBehavior() {
    console.log('Initializing homepage navbar behavior');
    
    function handleScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if gallery/museum section is in view
        const gallerySection = document.getElementById('gallery-section');
        const museumHeader = document.getElementById('museum-header');
        const navbarMuseum = document.getElementById('navbar-museum');
        const navbarExhibition = document.getElementById('navbar-exhibition');
        const mainLogoMobile = document.getElementById('main-logo-mobile');
        
        if (gallerySection && navbarMuseum && navbarExhibition && mainLogoMobile) {
            const rect = gallerySection.getBoundingClientRect();
            const isInView = rect.top <= 100; // When gallery is close to navbar
            const isMobile = window.innerWidth < 768;
            
            if (isInView) {
                // Gallery in view - show exhibition title, hide museum
                navbarExhibition.style.opacity = '1';
                navbarExhibition.style.transform = 'translate(-50%, -50%) scale(1)';
                navbarMuseum.classList.add('absorbed');
                
                // Mobile: Hide main logo from navbar completely
                if (isMobile) {
                    mainLogoMobile.style.opacity = '0';
                    mainLogoMobile.style.transform = 'scale(0.8)';
                    mainLogoMobile.style.pointerEvents = 'none';
                }
            } else {
                // Gallery not in view - hide exhibition title, show museum
                navbarExhibition.style.opacity = '0';
                navbarExhibition.style.transform = 'translate(-50%, -50%) scale(0.9)';
                navbarMuseum.classList.remove('absorbed');
                
                // Mobile: Show main logo in navbar
                if (isMobile) {
                    mainLogoMobile.style.opacity = '1';
                    mainLogoMobile.style.transform = 'scale(1)';
                    mainLogoMobile.style.pointerEvents = 'auto';
                }
            }
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    console.log('Homepage navbar behavior initialized');
}

// SMARTE Dynamic navbar - NUR wenn über weißem Hintergrund (from index.html)
function initDynamicNavbar() {
    console.log('Initializing dynamic navbar behavior');
    const navbar = document.querySelector('.glass-navbar');
    const navbarTexts = document.querySelectorAll('.navbar-text');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = window.innerHeight;
        const navbarHeight = 60; // FIXED HEIGHT
        
        // Berechne wieviel % der Navbar über weißem Hintergrund ist
        const overlapStart = Math.max(0, scrollY + navbarHeight - heroHeight);
        const overlapRatio = Math.min(1, overlapStart / navbarHeight);
        
        // Anwenden basierend auf Overlap-Ratio
        if (overlapRatio > 0.1) { // Beginne Übergang bei 10% Overlap
            navbar.classList.add('scrolled');
            navbarTexts.forEach(text => text.classList.add('scrolled'));
            
            // Progressiver Übergang für smooth effect
            const whiteOpacity = Math.min(1, overlapRatio * 1.2);
            navbar.style.background = `linear-gradient(135deg, 
                rgba(255, 255, 255, ${0.03 + whiteOpacity * 0.92}),
                rgba(255, 255, 255, ${0.01 + whiteOpacity * 0.84})
            )`;
        } else {
            navbar.classList.remove('scrolled');
            navbarTexts.forEach(text => text.classList.remove('scrolled'));
            navbar.style.background = '';
        }
        
        updateScrollProgress();
    });
}

// Simple navbar behavior for other pages
function initSimpleNavbarBehavior() {
    const navbar = document.querySelector('.glass-navbar');
    const navbarTexts = document.querySelectorAll('.navbar-text');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
            navbarTexts.forEach(text => text.classList.add('scrolled'));
        } else {
            navbar.classList.remove('scrolled');
            navbarTexts.forEach(text => text.classList.remove('scrolled'));
        }
        
        updateScrollProgress();
    });
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
    window.currentLanguage = lang; // Make it globally accessible
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
    
    // Update navbar museum/exhibition text for homepage
    const navbarMuseum = document.querySelector('#navbar-museum h2');
    const navbarExhibition = document.querySelector('#navbar-exhibition h2');
    
    if (navbarMuseum) {
        navbarMuseum.textContent = lang === 'en' ? 'Museum' : 'Museum';
    }
    if (navbarExhibition) {
        navbarExhibition.textContent = lang === 'en' ? 'Exhibition' : 'Ausstellung';
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
            
            // Initialize page-specific behavior
            if (currentPage === 'home') {
                initDynamicNavbar();
                initHomeNavbarBehavior();
            } else {
                initSimpleNavbarBehavior();
            }
        });
    } else {
        createNavbar(currentPage);
        setupEventListeners();
        setLanguage('en'); // Default to English - this will set window.currentLanguage
        
        // Initialize page-specific behavior
        if (currentPage === 'home') {
            initDynamicNavbar();
            initHomeNavbarBehavior();
        } else {
            initSimpleNavbarBehavior();
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    
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