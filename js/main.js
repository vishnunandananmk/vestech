/**
 * VESTLABS - Main Application
 * Loader, forms, and general functionality
 */

class VestlabsApp {
    constructor() {
        this.loader = document.getElementById('loader');
        this.contactForm = document.getElementById('contactForm');
        this.newsletterForm = document.getElementById('newsletterForm');
        
        this.init();
    }
    
    init() {
        this.setupLoader();
        this.setupForms();
        this.setupSmoothScroll();
        this.setupScrollProgress();
        this.setupAIParticles();
        this.setupContactMap();
        this.setupBentoGradients();
        this.setupGlowingEffects();
        this.setupPageSearch();
    }
    
    // ==================== LOADER ====================
    
    setupLoader() {
        // Hide loader after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 2000);
        });
        
        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';
    }
    
    // ==================== FORMS ====================
    
    setupForms() {
        // Contact form
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit();
            });
        }
        
        // Newsletter form
        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit();
            });
        }
        
        // Input focus effects
        this.setupInputEffects();
    }
    
    handleContactSubmit() {
        const form = this.contactForm;
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Validate
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('input-error');
                setTimeout(() => input.classList.remove('input-error'), 500);
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        btn.innerHTML = '<span class="spinner"></span>';
        btn.disabled = true;
        
        // Simulate submission (replace with actual API call)
        setTimeout(() => {
            btn.innerHTML = '<span class="btn-text">Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = 'var(--accent)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    }
    
    handleNewsletterSubmit() {
        const form = this.newsletterForm;
        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        if (!input.value.trim()) {
            input.classList.add('input-error');
            setTimeout(() => input.classList.remove('input-error'), 500);
            return;
        }
        
        // Show loading state
        btn.innerHTML = '<span class="spinner"></span>';
        btn.disabled = true;
        
        // Simulate subscription (replace with actual API call)
        setTimeout(() => {
            btn.innerHTML = '<span class="btn-text">Subscribed!</span>';
            btn.style.background = 'var(--accent)';
            
            // Reset
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1000);
    }
    
    setupInputEffects() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            // Focus effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
    
    // ==================== SMOOTH SCROLL ====================
    
    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ==================== SCROLL PROGRESS ====================
    
    setupScrollProgress() {
        // Create scroll progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);
        
        const bar = progressBar.querySelector('.scroll-progress-bar');
        
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) || 0;
            bar.style.transform = `scaleX(${scrolled})`;
        }, { passive: true });
    }
    
    // ==================== AI PARTICLES ====================
    
    setupAIParticles() {
        const container = document.getElementById('aiParticles');
        if (!container) return;
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            container.appendChild(particle);
        }
    }
    
    // ==================== GLOWING EFFECTS ====================
    
    setupGlowingEffects() {
        const glowingCards = document.querySelectorAll('.service-card');
        
        glowingCards.forEach(card => {
            const glowEffect = card.querySelector('.glowing-effect');
            if (!glowEffect) return;
            
            let animationFrame = null;
            let currentAngle = 0;
            let targetAngle = 0;
            
            const updateGlow = (e) => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                
                animationFrame = requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    const mouseX = e.clientX;
                    const mouseY = e.clientY;
                    
                    // Check if mouse is near the card (within proximity)
                    const proximity = 100;
                    const isNear = 
                        mouseX > rect.left - proximity &&
                        mouseX < rect.right + proximity &&
                        mouseY > rect.top - proximity &&
                        mouseY < rect.bottom + proximity;
                    
                    // Check if mouse is in the inactive center zone
                    const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
                    const inactiveRadius = Math.min(rect.width, rect.height) * 0.1;
                    
                    if (!isNear || distanceFromCenter < inactiveRadius) {
                        glowEffect.style.setProperty('--glow-active', '0');
                        return;
                    }
                    
                    glowEffect.style.setProperty('--glow-active', '1');
                    
                    // Calculate angle from center to mouse
                    targetAngle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI) + 90;
                    
                    // Smooth angle transition
                    const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
                    currentAngle += angleDiff * 0.15; // Easing factor
                    
                    glowEffect.style.setProperty('--glow-start', currentAngle.toString());
                });
            };
            
            // Track mouse movement on the document
            document.addEventListener('pointermove', updateGlow, { passive: true });
            
            // Also update on scroll
            window.addEventListener('scroll', () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                animationFrame = requestAnimationFrame(() => {
                    // Re-trigger with last known position
                    updateGlow({ clientX: this.lastMouseX || 0, clientY: this.lastMouseY || 0 });
                });
            }, { passive: true });
        });
        
        // Track last mouse position
        document.addEventListener('pointermove', (e) => {
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        }, { passive: true });
    }
    
    // ==================== BENTO GRADIENTS ====================
    
    setupBentoGradients() {
        const gradientContainers = document.querySelectorAll('.bento-gradient');
        
        gradientContainers.forEach(container => {
            const colorsAttr = container.getAttribute('data-colors');
            if (!colorsAttr) return;
            
            try {
                const colors = JSON.parse(colorsAttr);
                this.createGradientSVGs(container, colors);
            } catch (e) {
                console.warn('Invalid colors JSON:', e);
            }
        });
    }
    
    createGradientSVGs(container, colors) {
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height, 200);
        
        colors.forEach((color, index) => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            
            // Random size between 50% and 150% of container
            const circleSize = size * (0.5 + Math.random());
            
            svg.setAttribute('width', circleSize);
            svg.setAttribute('height', circleSize);
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.style.position = 'absolute';
            svg.style.top = `${Math.random() * 50}%`;
            svg.style.left = `${Math.random() * 50}%`;
            svg.style.filter = 'blur(40px)';
            
            // Set animation CSS variables
            svg.style.setProperty('--gradient-speed', `${15 + index * 5}s`);
            svg.style.setProperty('--tx-1', (Math.random() - 0.5).toString());
            svg.style.setProperty('--ty-1', (Math.random() - 0.5).toString());
            svg.style.setProperty('--tx-2', (Math.random() - 0.5).toString());
            svg.style.setProperty('--ty-2', (Math.random() - 0.5).toString());
            svg.style.setProperty('--tx-3', (Math.random() - 0.5).toString());
            svg.style.setProperty('--ty-3', (Math.random() - 0.5).toString());
            svg.style.setProperty('--tx-4', (Math.random() - 0.5).toString());
            svg.style.setProperty('--ty-4', (Math.random() - 0.5).toString());
            
            // Add animation delay for staggered effect
            svg.style.animationDelay = `${index * -5}s`;
            
            circle.setAttribute('cx', '50');
            circle.setAttribute('cy', '50');
            circle.setAttribute('r', '50');
            circle.setAttribute('fill', color);
            
            svg.appendChild(circle);
            container.appendChild(svg);
        });
    }
    
    // ==================== CONTACT MAP ====================
    
    setupContactMap() {
        // Kochi, Kerala, India coordinates
        const kochiCoords = [76.2673, 9.9312]; // [longitude, latitude]
        
        // Store map instance
        this.contactMap = null;
        this.mapInitialized = false;
        
        // Initialize map when contact page becomes visible
        const initMap = () => {
            const mapContainer = document.getElementById('contact-map');
            if (!mapContainer || this.mapInitialized) return;
            
            // Check if MapLibre GL is loaded
            if (typeof maplibregl === 'undefined') {
                console.warn('MapLibre GL JS not loaded');
                return;
            }
            
            // Create map
            this.contactMap = new maplibregl.Map({
                container: 'contact-map',
                style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
                center: kochiCoords,
                zoom: 13,
                attributionControl: false
            });
            
            // Add attribution control
            this.contactMap.addControl(
                new maplibregl.AttributionControl({ compact: true }),
                'bottom-right'
            );
            
            // Add navigation controls
            this.contactMap.addControl(
                new maplibregl.NavigationControl({ showCompass: false }),
                'bottom-right'
            );
            
            // Create custom marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'map-marker';
            markerEl.innerHTML = '<i class="fas fa-building"></i>';
            
            // Add marker
            new maplibregl.Marker({ element: markerEl })
                .setLngLat(kochiCoords)
                .addTo(this.contactMap);
            
            this.mapInitialized = true;
            
            // Resize map after initialization
            setTimeout(() => {
                this.contactMap.resize();
            }, 100);
        };
        
        // Initialize on page load if contact page is active
        const contactPage = document.getElementById('page-contact');
        if (contactPage && contactPage.classList.contains('active')) {
            setTimeout(initMap, 500);
        }
        
        // Re-initialize when navigating to contact page
        document.querySelectorAll('[data-page="contact"]').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (!this.mapInitialized) {
                        initMap();
                    } else if (this.contactMap) {
                        this.contactMap.resize();
                    }
                }, 100);
            });
        });
    }
    
    // ==================== PAGE SEARCH (CTRL+F FUNCTIONALITY) ====================
    
    setupPageSearch() {
        const searchInput = document.getElementById('pageSearchInput');
        const searchNav = document.getElementById('searchNav');
        const prevBtn = document.getElementById('prevMatch');
        const nextBtn = document.getElementById('nextMatch');
        const closeBtn = document.getElementById('closeSearch');
        const currentMatchEl = document.getElementById('currentMatch');
        const totalMatchesEl = document.getElementById('totalMatches');
        
        if (!searchInput) return;
        
        this.searchMatches = [];
        this.currentMatchIndex = -1;
        
        let debounceTimer;
        
        // Search on input
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
        
        // Keyboard shortcuts
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.navigateMatch(-1);
                } else {
                    this.navigateMatch(1);
                }
            } else if (e.key === 'Escape') {
                this.clearSearch();
                searchInput.blur();
            }
        });
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateMatch(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateMatch(1));
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.clearSearch();
                searchInput.value = '';
                searchInput.blur();
            });
        }
        
        // Global Ctrl+F override
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
            }
        });
    }
    
    performSearch(query) {
        this.clearHighlights();
        
        const searchNav = document.getElementById('searchNav');
        const currentMatchEl = document.getElementById('currentMatch');
        const totalMatchesEl = document.getElementById('totalMatches');
        
        if (!query || query.length < 2) {
            if (searchNav) searchNav.classList.remove('active');
            this.searchMatches = [];
            this.currentMatchIndex = -1;
            return;
        }
        
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;
        
        const walker = document.createTreeWalker(
            activePage,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    
                    const tagName = parent.tagName.toLowerCase();
                    if (['script', 'style', 'noscript', 'iframe'].includes(tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    if (parent.classList.contains('search-highlight')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        this.searchMatches = [];
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const matches = [...text.matchAll(regex)];
            
            if (matches.length > 0) {
                const parent = textNode.parentNode;
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                
                matches.forEach(match => {
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
                    }
                    
                    const mark = document.createElement('mark');
                    mark.className = 'search-highlight';
                    mark.textContent = match[0];
                    fragment.appendChild(mark);
                    this.searchMatches.push(mark);
                    
                    lastIndex = match.index + match[0].length;
                });
                
                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
                }
                
                parent.replaceChild(fragment, textNode);
            }
        });
        
        if (this.searchMatches.length > 0) {
            if (searchNav) searchNav.classList.add('active');
            this.currentMatchIndex = 0;
            this.highlightCurrentMatch();
            if (totalMatchesEl) totalMatchesEl.textContent = this.searchMatches.length;
            if (currentMatchEl) currentMatchEl.textContent = 1;
        } else {
            if (searchNav) searchNav.classList.add('active');
            if (totalMatchesEl) totalMatchesEl.textContent = '0';
            if (currentMatchEl) currentMatchEl.textContent = '0';
        }
    }
    
    navigateMatch(direction) {
        if (this.searchMatches.length === 0) return;
        
        if (this.searchMatches[this.currentMatchIndex]) {
            this.searchMatches[this.currentMatchIndex].classList.remove('current');
        }
        
        this.currentMatchIndex += direction;
        
        if (this.currentMatchIndex >= this.searchMatches.length) {
            this.currentMatchIndex = 0;
        } else if (this.currentMatchIndex < 0) {
            this.currentMatchIndex = this.searchMatches.length - 1;
        }
        
        this.highlightCurrentMatch();
        
        const currentMatchEl = document.getElementById('currentMatch');
        if (currentMatchEl) {
            currentMatchEl.textContent = this.currentMatchIndex + 1;
        }
    }
    
    highlightCurrentMatch() {
        const match = this.searchMatches[this.currentMatchIndex];
        if (!match) return;
        
        match.classList.add('current');
        match.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
    
    clearHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(mark => {
            const parent = mark.parentNode;
            const text = document.createTextNode(mark.textContent);
            parent.replaceChild(text, mark);
            parent.normalize();
        });
        
        this.searchMatches = [];
        this.currentMatchIndex = -1;
    }
    
    clearSearch() {
        this.clearHighlights();
        
        const searchNav = document.getElementById('searchNav');
        const currentMatchEl = document.getElementById('currentMatch');
        const totalMatchesEl = document.getElementById('totalMatches');
        
        if (searchNav) searchNav.classList.remove('active');
        if (currentMatchEl) currentMatchEl.textContent = '0';
        if (totalMatchesEl) totalMatchesEl.textContent = '0';
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// ==================== UTILITY FUNCTIONS ====================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.vestlabsApp = new VestlabsApp();
});

// ==================== KEYBOARD NAVIGATION ====================

// Skip to main content
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            padding: 1rem;
            background: var(--accent);
            color: var(--black);
            z-index: 10000;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.transform = 'translateY(0)';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.transform = 'translateY(-100%)';
        });
        
        document.body.prepend(skipLink);
    }
});

// ==================== PERFORMANCE MONITORING ====================

// Log performance metrics
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}

// ==================== ERROR HANDLING ====================

window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.message);
});

// ==================== PRELOAD CRITICAL ASSETS ====================

// Preload images on page navigation
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
