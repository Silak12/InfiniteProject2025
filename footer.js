// footer.js - Fixed Version with working legal links and social media
console.log('Footer.js loaded successfully');

// Footer translations
const footerTranslations = {
    en: {
        title: 'The Infinite Canvas',
        tagline: 'Where art evolves',
        follow: 'Follow',
        // Rechtliche Links
        legal: 'Legal',
        privacy: 'Privacy',
        terms: 'Terms',
        impressum: 'Imprint',
        cookieSettings: 'Cookie Settings',
        contact: 'Contact',
        getInTouch: 'Get in Touch',
        guide: 'Guide',
        copyright: '© 2025 The Infinite Canvas. Collaborative art project.'
    },
    de: {
        title: 'The Infinite Canvas', 
        tagline: 'Wo Träume zu Kunst werden',
        follow: 'Folgen',
        // Rechtliche Links
        legal: 'Rechtliches',
        privacy: 'Datenschutz',
        terms: 'AGB',
        impressum: 'Impressum',
        cookieSettings: 'Cookie-Einstellungen',
        contact: 'Kontakt',
        getInTouch: 'Kontakt aufnehmen',
        guide: 'Anleitung',
        copyright: '© 2025 The Infinite Canvas. Kollaboratives Kunstprojekt.'
    }
};

// Create footer HTML - FORCE DARK THEME FOR ALL PAGES
function createFooter(pageType = 'dark') {
    // OVERRIDE: Alle Seiten bekommen dunklen Footer
    const footerClasses = 'py-16 px-8 border-t border-neutral-700/50 bg-neutral-900';
    const titleClasses = 'text-2xl font-extralight mb-6 tracking-wider text-neutral-200';
    const taglineClasses = 'text-neutral-400 text-sm tracking-widest uppercase mb-8';
    const linkClasses = 'text-xs text-neutral-500 tracking-wider uppercase hover:text-neutral-300 transition-colors';
    const sectionClasses = 'text-neutral-400';

    return `
        <footer class="${footerClasses}">
            <div class="max-w-6xl mx-auto">
                <!-- Main Footer Content -->
                <div class="text-center mb-12">
                    <h3 class="${titleClasses}" id="footer-title">The Infinite Canvas</h3>
                    <p class="${taglineClasses}" id="footer-tagline">
                        Where art evolves
                    </p>
                    
                    <!-- Social Links -->
                    <div class="flex items-center justify-center space-x-8 mb-8">
                        <a href="https://tiktok.com/@the.infinite.canvas" target="_blank" rel="noopener noreferrer" class="${linkClasses}">
                            <i class="fab fa-tiktok mr-1"></i>TikTok
                        </a>
                        <a href="https://instagram.com/the.infinite.canvas.." target="_blank" rel="noopener noreferrer" class="${linkClasses}">
                            <i class="fab fa-instagram mr-1"></i>Instagram
                        </a>
                        <span class="${linkClasses}">—</span>
                        <span class="${linkClasses}">2025</span>
                    </div>
                </div>

                <!-- Legal Links Section -->
                <div class="border-t border-neutral-700/50 pt-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        
                        <!-- Rechtliche Dokumente -->
                        <div class="text-center md:text-left">
                            <h4 class="text-sm font-medium ${sectionClasses} mb-4 tracking-wider uppercase" id="footer-legal-title">
                                Legal
                            </h4>
                            <div class="space-y-2">
                                <div>
                                    <a href="javascript:void(0)" onclick="handleLegalLink('impressum')" class="${linkClasses} block" id="footer-impressum-link">
                                        <i class="fas fa-info-circle mr-2"></i>Impressum
                                    </a>
                                </div>
                                <div>
                                    <a href="javascript:void(0)" onclick="handleLegalLink('datenschutz')" class="${linkClasses} block" id="footer-privacy-link">
                                        <i class="fas fa-shield-alt mr-2"></i>Datenschutz
                                    </a>
                                </div>
                                <div>
                                    <a href="javascript:void(0)" onclick="handleLegalLink('agb')" class="${linkClasses} block" id="footer-terms-link">
                                        <i class="fas fa-file-contract mr-2"></i>AGB
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Cookie-Einstellungen -->
                        <div class="text-center">
                            <h4 class="text-sm font-medium ${sectionClasses} mb-4 tracking-wider uppercase">
                                Cookies
                            </h4>
                            <div class="space-y-2 flex flex-col items-center">
                                <div>
                                    <a href="javascript:void(0)" onclick="handleLegalLink('cookies')" class="${linkClasses} block">
                                        <i class="fas fa-cookie-bite mr-2"></i>Cookie-Info
                                    </a>
                                </div>
                                <div>
                                    <button onclick="showCookieSettings()" class="${linkClasses} block hover:opacity-80 text-center" id="footer-cookie-settings">
                                        <i class="fas fa-cog mr-2"></i>Cookie-Einstellungen
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Kontakt -->
                        <div class="text-center md:text-right">
                            <h4 class="text-sm font-medium ${sectionClasses} mb-4 tracking-wider uppercase" id="footer-contact-title">
                                Contact
                            </h4>
                            <div class="space-y-2">
                                <div>
                                    <a href="contact.html" class="${linkClasses} block" id="footer-contact-link">
                                        <i class="fas fa-envelope mr-2"></i>Get in Touch
                                    </a>
                                </div>
                                <div>
                                    <a href="guide.html" class="${linkClasses} block" id="footer-guide-link">
                                        <i class="fas fa-clock mr-2"></i>Guide
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Copyright ONLY -->
                    <div class="text-center pt-6 border-t border-neutral-700/50">
                        <p class="text-xs ${sectionClasses}" id="footer-copyright">
                            © 2025 The Infinite Canvas. Kollaboratives Kunstprojekt.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// FIXED: Handle legal links properly
function handleLegalLink(section) {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('legal.html')) {
        // Already on legal page - use showContent function
        if (typeof showContent === 'function') {
            showContent(section);
        } else {
            // Fallback: scroll to section
            window.location.hash = section;
        }
    } else {
        // Navigate to legal page with hash
        window.location.href = `legal.html#${section}`;
    }
}

// Cookie-Settings-Funktion für Footer
function showCookieSettings() {
    if (typeof window.cookieManager !== 'undefined' && window.cookieManager.showSettings) {
        window.cookieManager.showSettings();
    } else {
        console.log('Cookie-Manager nicht geladen. Versuche nach 1 Sekunde erneut...');
        setTimeout(() => {
            if (typeof window.cookieManager !== 'undefined' && window.cookieManager.showSettings) {
                window.cookieManager.showSettings();
            } else {
                alert('Cookie-Manager ist noch nicht verfügbar. Bitte versuchen Sie es in einem Moment erneut.');
            }
        }, 1000);
    }
}

// Update footer language
function updateFooterLanguage(lang) {
    const t = footerTranslations[lang];
    
    const titleElement = document.getElementById('footer-title');
    const taglineElement = document.getElementById('footer-tagline');
    const legalTitleElement = document.getElementById('footer-legal-title');
    const impressumLinkElement = document.getElementById('footer-impressum-link');
    const privacyLinkElement = document.getElementById('footer-privacy-link');
    const termsLinkElement = document.getElementById('footer-terms-link');
    const cookieSettingsElement = document.getElementById('footer-cookie-settings');
    const contactTitleElement = document.getElementById('footer-contact-title');
    const contactLinkElement = document.getElementById('footer-contact-link');
    const guideLinkElement = document.getElementById('footer-guide-link');
    const copyrightElement = document.getElementById('footer-copyright');
    
    if (titleElement) titleElement.textContent = t.title;
    if (taglineElement) taglineElement.textContent = t.tagline;
    if (legalTitleElement) legalTitleElement.textContent = t.legal;
    if (contactTitleElement) contactTitleElement.textContent = t.contact;
    if (copyrightElement) copyrightElement.textContent = t.copyright;
    
    // Rechtliche Links aktualisieren
    if (impressumLinkElement) {
        impressumLinkElement.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${t.impressum}`;
    }
    if (privacyLinkElement) {
        privacyLinkElement.innerHTML = `<i class="fas fa-shield-alt mr-2"></i>${t.privacy}`;
    }
    if (termsLinkElement) {
        termsLinkElement.innerHTML = `<i class="fas fa-file-contract mr-2"></i>${t.terms}`;
    }
    if (cookieSettingsElement) {
        cookieSettingsElement.innerHTML = `<i class="fas fa-cog mr-2"></i>${t.cookieSettings}`;
    }
    if (contactLinkElement) {
        contactLinkElement.innerHTML = `<i class="fas fa-envelope mr-2"></i>${t.getInTouch}`;
    }
    if (guideLinkElement) {
        guideLinkElement.innerHTML = `<i class="fas fa-clock mr-2"></i>${t.guide}`;
    }

    // Cookie-Manager Sprache aktualisieren (falls verfügbar)
    if (typeof window.cookieManager !== 'undefined' && window.cookieManager.updateLanguage) {
        window.cookieManager.updateLanguage(lang);
    }
}

// Initialize footer - PREVENT DOUBLE INITIALIZATION
function initFooter(pageType = 'dark') {
    console.log('Initializing footer with FORCED dark theme');
    
    // Find footer container
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.error('Footer container #footer-container not found!');
        return;
    }
    
    // PREVENT DOUBLE INITIALIZATION
    if (footerContainer.innerHTML.trim() !== '') {
        console.log('Footer already initialized, skipping...');
        return;
    }
    
    // Insert footer HTML - ALWAYS DARK THEME
    footerContainer.innerHTML = createFooter('dark');
    
    // Set initial language
    updateFooterLanguage(window.currentLanguage || 'en');
    
    console.log('Footer initialized successfully with DARK theme');
}

// Make functions globally available
window.initFooter = initFooter;
window.updateFooterLanguage = updateFooterLanguage;
window.showCookieSettings = showCookieSettings;
window.handleLegalLink = handleLegalLink;

console.log('Footer.js fully loaded - Functions exported globally');

// Auto-initialize Cookie Manager Integration
document.addEventListener('DOMContentLoaded', function() {
    // Warte auf Cookie-Manager und integriere dann
    const checkCookieManager = () => {
        if (typeof window.cookieManager !== 'undefined') {
            console.log('Cookie-Manager gefunden, Footer-Integration abgeschlossen');
            
            // Sprache synchronisieren
            const currentLang = window.currentLanguage || 'en';
            if (window.cookieManager.updateLanguage) {
                window.cookieManager.updateLanguage(currentLang);
            }
        } else {
            // Versuche es nach 500ms erneut
            setTimeout(checkCookieManager, 500);
        }
    };
    
    setTimeout(checkCookieManager, 1000);
});