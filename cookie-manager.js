// cookie-manager.js - Cookie Management System für "The Infinite Canvas"
console.log('Cookie Manager geladen');

// Cookie Management System
class CookieManager {
    constructor() {
        this.cookieSettings = {
            essential: true,    // Immer aktiv
            functional: false,
            analytics: false
        };
        this.init();
    }

    init() {
        this.addStyles();
        this.addHTML();
        this.loadSettings();
        
        // Banner anzeigen wenn noch keine Einwilligung vorliegt
        if (!this.hasConsent()) {
            setTimeout(() => this.showBanner(), 1000);
        }
        
        this.updateStatus();
    }

    addStyles() {
        // Styles nur einmal hinzufügen
        if (document.getElementById('cookie-manager-styles')) return;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'cookie-manager-styles';
        styleSheet.textContent = `
            /* Cookie Banner Styles */
            .cookie-banner {
                background: linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.95),
                    rgba(0, 0, 0, 0.9)
                );
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 
                    0 10px 40px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .cookie-button {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1),
                    rgba(255, 255, 255, 0.05)
                );
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
            }

            .cookie-button:hover {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.2),
                    rgba(255, 255, 255, 0.1)
                );
                border-color: rgba(255, 255, 255, 0.3);
            }

            .cookie-button.accept {
                background: linear-gradient(135deg, 
                    rgba(34, 197, 94, 0.8),
                    rgba(34, 197, 94, 0.6)
                );
                border-color: rgba(34, 197, 94, 0.5);
            }

            .cookie-button.accept:hover {
                background: linear-gradient(135deg, 
                    rgba(34, 197, 94, 0.9),
                    rgba(34, 197, 94, 0.7)
                );
            }

            /* Settings Modal */
            .cookie-settings-modal {
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95),
                    rgba(255, 255, 255, 0.9)
                );
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.3);
            }

            /* Toggle Switch */
            .cookie-toggle-switch {
                width: 50px;
                height: 24px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .cookie-toggle-switch.active {
                background: rgba(34, 197, 94, 0.8);
            }

            .cookie-toggle-thumb {
                width: 20px;
                height: 20px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 2px;
                left: 2px;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .cookie-toggle-switch.active .cookie-toggle-thumb {
                left: 28px;
            }

            @media (max-width: 768px) {
                .cookie-banner {
                    margin: 1rem;
                    padding: 1rem;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    addHTML() {
        // HTML nur einmal hinzufügen
        if (document.getElementById('cookie-banner')) return;
        
        const bannerHTML = `
            <!-- Cookie Banner -->
            <div id="cookie-banner" class="fixed bottom-0 left-0 right-0 z-50 cookie-banner p-6 m-4 rounded-2xl" style="display: none;">
                <div class="max-w-6xl mx-auto">
                    <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div class="flex-1 text-white">
                            <h3 class="text-lg font-medium mb-2">
                                <i class="fas fa-cookie-bite mr-2"></i>
                                <span class="cookie-banner-title">Cookie-Einstellungen</span>
                            </h3>
                            <p class="text-sm text-gray-300 leading-relaxed cookie-banner-text">
                                Wir nutzen Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. 
                                Notwendige Cookies sind für die Grundfunktionen erforderlich. 
                                Zusätzliche Cookies helfen uns, die Website zu verbessern und Ihnen relevante Inhalte anzuzeigen.
                            </p>
                        </div>
                        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                            <button onclick="window.cookieManager.showSettings()" class="cookie-button px-6 py-3 rounded-lg text-white text-sm font-medium">
                                <i class="fas fa-cog mr-2"></i>
                                <span class="cookie-settings-btn">Einstellungen</span>
                            </button>
                            <button onclick="window.cookieManager.acceptOnly('essential')" class="cookie-button px-6 py-3 rounded-lg text-white text-sm font-medium">
                                <span class="cookie-essential-btn">Nur Notwendige</span>
                            </button>
                            <button onclick="window.cookieManager.acceptAll()" class="cookie-button accept px-6 py-3 rounded-lg text-white text-sm font-medium">
                                <i class="fas fa-check mr-2"></i>
                                <span class="cookie-accept-btn">Alle akzeptieren</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cookie Settings Modal -->
            <div id="cookie-settings-modal" class="fixed inset-0 z-[70] hidden">
                <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onclick="window.cookieManager.hideSettings()"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="cookie-settings-modal max-w-2xl w-full rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-light text-zinc-800 cookie-modal-title">Cookie-Einstellungen</h2>
                            <button onclick="window.cookieManager.hideSettings()" class="text-zinc-600 hover:text-zinc-800">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div class="space-y-6">
                            <!-- Essential Cookies -->
                            <div class="border-b border-zinc-200 pb-6">
                                <div class="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 class="text-lg font-medium text-zinc-800 cookie-essential-title">Notwendige Cookies</h3>
                                        <p class="text-sm text-zinc-600 cookie-essential-desc">Für die Grundfunktionen der Website erforderlich</p>
                                    </div>
                                    <div class="cookie-toggle-switch active">
                                        <div class="cookie-toggle-thumb"></div>
                                    </div>
                                </div>
                                <p class="text-sm text-zinc-500 cookie-essential-info">
                                    Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich und können nicht deaktiviert werden.
                                </p>
                            </div>

                            <!-- Functional Cookies -->
                            <div class="border-b border-zinc-200 pb-6">
                                <div class="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 class="text-lg font-medium text-zinc-800 cookie-functional-title">Funktionale Cookies</h3>
                                        <p class="text-sm text-zinc-600 cookie-functional-desc">Für erweiterte Website-Funktionen</p>
                                    </div>
                                    <div class="cookie-toggle-switch" id="functional-toggle" onclick="window.cookieManager.toggleCookie('functional')">
                                        <div class="cookie-toggle-thumb"></div>
                                    </div>
                                </div>
                                <p class="text-sm text-zinc-500 cookie-functional-info">
                                    Diese Cookies ermöglichen erweiterte Funktionen wie Spracheinstellungen und Formular-Speicherung.
                                </p>
                            </div>

                            <!-- Analytics Cookies -->
                            <div class="pb-6">
                                <div class="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 class="text-lg font-medium text-zinc-800 cookie-analytics-title">Analyse Cookies</h3>
                                        <p class="text-sm text-zinc-600 cookie-analytics-desc">Für Website-Analyse und Verbesserungen</p>
                                    </div>
                                    <div class="cookie-toggle-switch" id="analytics-toggle" onclick="window.cookieManager.toggleCookie('analytics')">
                                        <div class="cookie-toggle-thumb"></div>
                                    </div>
                                </div>
                                <p class="text-sm text-zinc-500 cookie-analytics-info">
                                    Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                                </p>
                            </div>
                        </div>

                        <div class="flex space-x-4 mt-8">
                            <button onclick="window.cookieManager.saveSettingsFromModal()" class="flex-1 bg-zinc-800 text-white py-3 rounded-lg hover:bg-zinc-700 transition-colors">
                                <i class="fas fa-save mr-2"></i>
                                <span class="cookie-save-btn">Einstellungen speichern</span>
                            </button>
                            <button onclick="window.cookieManager.acceptAll(); window.cookieManager.hideSettings()" class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-check mr-2"></i>
                                <span class="cookie-accept-all-btn">Alle akzeptieren</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
    }

    hasConsent() {
        return localStorage.getItem('cookie-consent') !== null;
    }

    loadSettings() {
        const saved = localStorage.getItem('cookie-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.cookieSettings = { ...this.cookieSettings, ...settings };
        }
    }

    saveSettings() {
        localStorage.setItem('cookie-settings', JSON.stringify(this.cookieSettings));
        localStorage.setItem('cookie-consent', 'true');
        localStorage.setItem('cookie-consent-date', new Date().toISOString());
        this.applyCookies();
        this.updateStatus();
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'block';
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'none';
    }

    acceptAll() {
        this.cookieSettings = {
            essential: true,
            functional: true,
            analytics: true
        };
        this.saveSettings();
        this.hideBanner();
        this.updateToggles();
    }

    acceptOnly(type) {
        if (type === 'essential') {
            this.cookieSettings = {
                essential: true,
                functional: false,
                analytics: false
            };
        }
        this.saveSettings();
        this.hideBanner();
        this.updateToggles();
    }

    toggleCookie(type) {
        if (type !== 'essential') {
            this.cookieSettings[type] = !this.cookieSettings[type];
            this.updateToggles();
        }
    }

    updateToggles() {
        const functionalToggle = document.getElementById('functional-toggle');
        if (functionalToggle) {
            if (this.cookieSettings.functional) {
                functionalToggle.classList.add('active');
            } else {
                functionalToggle.classList.remove('active');
            }
        }

        const analyticsToggle = document.getElementById('analytics-toggle');
        if (analyticsToggle) {
            if (this.cookieSettings.analytics) {
                analyticsToggle.classList.add('active');
            } else {
                analyticsToggle.classList.remove('active');
            }
        }
    }

    applyCookies() {
        console.log('Angewendete Cookie-Einstellungen:', this.cookieSettings);

        if (this.cookieSettings.functional) {
            this.setFunctionalCookies();
        }

        if (this.cookieSettings.analytics) {
            this.setAnalyticsCookies();
        }
    }

    setFunctionalCookies() {
        // Spracheinstellung speichern
        const currentLang = window.currentLanguage || 'en';
        document.cookie = `language=${currentLang}; path=/; max-age=31536000; SameSite=Lax`;
        console.log('Funktionale Cookies gesetzt');
    }

    setAnalyticsCookies() {
        console.log('Analytics Cookies gesetzt');
        // Hier würden Sie Analytics-Tools initialisieren
        // Beispiel für Google Analytics:
        // gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }

    updateStatus() {
        this.updateToggles();
    }

    resetCookies() {
        localStorage.removeItem('cookie-consent');
        localStorage.removeItem('cookie-settings');
        localStorage.removeItem('cookie-consent-date');
        
        this.cookieSettings = {
            essential: true,
            functional: false,
            analytics: false
        };
        
        this.updateStatus();
        console.log('Cookies zurückgesetzt');
    }

    showSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('hidden');
            this.updateToggles();
        }
    }

    hideSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) modal.classList.add('hidden');
    }

    saveSettingsFromModal() {
        this.saveSettings();
        this.hideSettings();
        console.log('Einstellungen gespeichert');
    }

    // Sprachunterstützung
    updateLanguage(lang) {
        const translations = {
            en: {
                bannerTitle: 'Cookie Settings',
                bannerText: 'We use cookies to provide you with the best possible use of our website. Necessary cookies are required for basic functions. Additional cookies help us improve the website and show you relevant content.',
                settingsBtn: 'Settings',
                essentialBtn: 'Only Necessary',
                acceptBtn: 'Accept All',
                modalTitle: 'Cookie Settings',
                essentialTitle: 'Necessary Cookies',
                essentialDesc: 'Required for basic website functions',
                essentialInfo: 'These cookies are essential for the website to function and cannot be disabled.',
                functionalTitle: 'Functional Cookies',
                functionalDesc: 'For extended website functions',
                functionalInfo: 'These cookies enable advanced features like language settings and form storage.',
                analyticsTitle: 'Analytics Cookies',
                analyticsDesc: 'For website analysis and improvements',
                analyticsInfo: 'These cookies help us understand how visitors interact with the website.',
                saveBtn: 'Save Settings',
                acceptAllBtn: 'Accept All'
            },
            de: {
                bannerTitle: 'Cookie-Einstellungen',
                bannerText: 'Wir nutzen Cookies, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen. Notwendige Cookies sind für die Grundfunktionen erforderlich. Zusätzliche Cookies helfen uns, die Website zu verbessern und Ihnen relevante Inhalte anzuzeigen.',
                settingsBtn: 'Einstellungen',
                essentialBtn: 'Nur Notwendige',
                acceptBtn: 'Alle akzeptieren',
                modalTitle: 'Cookie-Einstellungen',
                essentialTitle: 'Notwendige Cookies',
                essentialDesc: 'Für die Grundfunktionen der Website erforderlich',
                essentialInfo: 'Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich und können nicht deaktiviert werden.',
                functionalTitle: 'Funktionale Cookies',
                functionalDesc: 'Für erweiterte Website-Funktionen',
                functionalInfo: 'Diese Cookies ermöglichen erweiterte Funktionen wie Spracheinstellungen und Formular-Speicherung.',
                analyticsTitle: 'Analyse Cookies',
                analyticsDesc: 'Für Website-Analyse und Verbesserungen',
                analyticsInfo: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
                saveBtn: 'Einstellungen speichern',
                acceptAllBtn: 'Alle akzeptieren'
            }
        };

        const t = translations[lang] || translations.de;

        // Banner-Texte aktualisieren
        const bannerTitle = document.querySelector('.cookie-banner-title');
        const bannerText = document.querySelector('.cookie-banner-text');
        const settingsBtn = document.querySelector('.cookie-settings-btn');
        const essentialBtn = document.querySelector('.cookie-essential-btn');
        const acceptBtn = document.querySelector('.cookie-accept-btn');

        if (bannerTitle) bannerTitle.textContent = t.bannerTitle;
        if (bannerText) bannerText.textContent = t.bannerText;
        if (settingsBtn) settingsBtn.textContent = t.settingsBtn;
        if (essentialBtn) essentialBtn.textContent = t.essentialBtn;
        if (acceptBtn) acceptBtn.textContent = t.acceptBtn;

        // Modal-Texte aktualisieren
        const modalTitle = document.querySelector('.cookie-modal-title');
        const essentialTitle = document.querySelector('.cookie-essential-title');
        const essentialDesc = document.querySelector('.cookie-essential-desc');
        const essentialInfo = document.querySelector('.cookie-essential-info');
        const functionalTitle = document.querySelector('.cookie-functional-title');
        const functionalDesc = document.querySelector('.cookie-functional-desc');
        const functionalInfo = document.querySelector('.cookie-functional-info');
        const analyticsTitle = document.querySelector('.cookie-analytics-title');
        const analyticsDesc = document.querySelector('.cookie-analytics-desc');
        const analyticsInfo = document.querySelector('.cookie-analytics-info');
        const saveBtn = document.querySelector('.cookie-save-btn');
        const acceptAllBtn = document.querySelector('.cookie-accept-all-btn');

        if (modalTitle) modalTitle.textContent = t.modalTitle;
        if (essentialTitle) essentialTitle.textContent = t.essentialTitle;
        if (essentialDesc) essentialDesc.textContent = t.essentialDesc;
        if (essentialInfo) essentialInfo.textContent = t.essentialInfo;
        if (functionalTitle) functionalTitle.textContent = t.functionalTitle;
        if (functionalDesc) functionalDesc.textContent = t.functionalDesc;
        if (functionalInfo) functionalInfo.textContent = t.functionalInfo;
        if (analyticsTitle) analyticsTitle.textContent = t.analyticsTitle;
        if (analyticsDesc) analyticsDesc.textContent = t.analyticsDesc;
        if (analyticsInfo) analyticsInfo.textContent = t.analyticsInfo;
        if (saveBtn) saveBtn.textContent = t.saveBtn;
        if (acceptAllBtn) acceptAllBtn.textContent = t.acceptAllBtn;
    }
}

// Integration mit bestehender Website
function integrateCookieManager() {
    // Sprache aus Cookie laden (wenn funktionale Cookies aktiviert)
    if (window.cookieManager && window.cookieManager.cookieSettings.functional) {
        const languageCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('language='));
        
        if (languageCookie) {
            const language = languageCookie.split('=')[1];
            if (typeof setLanguage === 'function') {
                setLanguage(language);
            }
        }
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
    console.log('Cookie-Manager initialisiert');
    
    // Auto-Integration nach 2 Sekunden
    setTimeout(integrateCookieManager, 2000);
});

// Export für globalen Zugriff
window.CookieManager = CookieManager;