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
