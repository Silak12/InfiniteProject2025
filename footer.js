// footer.js - Reusable Footer Component
console.log('Footer.js loaded successfully');

// Footer translations
const footerTranslations = {
    en: {
        title: 'The Infinite Canvas',
        tagline: 'Where dreams become art',
        follow: 'Follow'
    },
    de: {
        title: 'The Infinite Canvas', 
        tagline: 'Wo Träume zu Kunst werden',
        follow: 'Folgen'
    }
};

// Create footer HTML based on page type
function createFooter(pageType = 'default') {
    let footerClasses, titleClasses, taglineClasses, linkClasses;
    
    // Set different styles based on page type
    switch(pageType) {
        case 'dark':
            // For pages with dark footer (like index.html)
            footerClasses = 'py-16 px-8 border-t border-neutral-700/50 bg-neutral-900';
            titleClasses = 'text-2xl font-extralight mb-6 tracking-wider text-neutral-200';
            taglineClasses = 'text-neutral-400 text-sm tracking-widest uppercase mb-8';
            linkClasses = 'text-xs text-neutral-500 tracking-wider uppercase hover:text-neutral-300 transition-colors';
            break;
        case 'light':
        default:
            // For pages with light footer (like contact.html, timeline.html)
            footerClasses = 'py-16 px-8 border-t border-zinc-200/50';
            titleClasses = 'text-2xl font-extralight mb-6 tracking-wider';
            taglineClasses = 'text-zinc-500 text-sm tracking-widest uppercase mb-8';
            linkClasses = 'text-xs text-zinc-400 tracking-wider uppercase hover:text-zinc-600 transition-colors';
            break;
    }

    return `
        <footer class="${footerClasses}">
            <div class="max-w-6xl mx-auto text-center">
                <h3 class="${titleClasses}" id="footer-title">The Infinite Canvas</h3>
                <p class="${taglineClasses}" id="footer-tagline">
                    The never ending piece of art
                </p>
                <div class="flex items-center justify-center space-x-8 ${linkClasses}">
                    <span id="footer-follow-label">Follow</span>
                    <a href="#" class="${linkClasses}">TikTok</a>
                    <a href="#" class="${linkClasses}">Instagram</a>
                    <span>—</span>
                    <span>2025</span>
                </div>
            </div>
        </footer>
    `;
}

// Update footer language
function updateFooterLanguage(lang) {
    const t = footerTranslations[lang];
    
    const titleElement = document.getElementById('footer-title');
    const taglineElement = document.getElementById('footer-tagline');
    const followElement = document.getElementById('footer-follow-label');
    
    if (titleElement) titleElement.textContent = t.title;
    if (taglineElement) taglineElement.textContent = t.tagline;
    if (followElement) followElement.textContent = t.follow;
}

// Initialize footer
function initFooter(pageType = 'light') {
    console.log('Initializing footer with type:', pageType);
    
    // Find footer container
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        console.error('Footer container #footer-container not found!');
        return;
    }
    
    // Insert footer HTML
    footerContainer.innerHTML = createFooter(pageType);
    
    // Set initial language
    updateFooterLanguage(window.currentLanguage || 'en');
    
    console.log('Footer initialized successfully');
}

// Make functions globally available
window.initFooter = initFooter;
window.updateFooterLanguage = updateFooterLanguage;

console.log('Footer.js fully loaded - Functions exported globally');