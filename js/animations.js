/**
 * VESTLABZ - Premium Animations
 * Scroll reveals, parallax, counters, and more
 */

class AnimationController {
    constructor() {
        this.revealElements = [];
        // Store parallax items as objects: { el: Element, speed: number }
        this.parallaxElements = [];
        this.counterElements = [];
        this.heroLines = [];
        this.fadeElements = [];
        
        this.scrollY = 0;
        this.windowHeight = window.innerHeight;
        this._rafPending = false;
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.setupIntersectionObserver();
        this.setupParallax();
        this.setupServiceCardGlow();
        this.setupMagneticButtons();
        this.addEventListeners();
        
        // Initial trigger
        this.triggerHeroAnimations();
    }
    
    cacheElements() {
        // Reveal elements
        this.revealElements = document.querySelectorAll(
            '.reveal-item, .reveal-scale, .reveal-slide-right, .reveal-chars'
        );
        
        // Reset parallax items list (we populate it in setupParallax)
        this.parallaxElements = [];
        
        // Counter elements
        this.counterElements = document.querySelectorAll('[data-count]');
        
        // Hero elements
        this.heroLines = document.querySelectorAll('.hero-title .line');
        this.fadeElements = document.querySelectorAll('.fade-up');
    }
    
    addEventListeners() {
        // Scroll
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        // Resize
        window.addEventListener('resize', () => this.onResize());
    }
    
    // ==================== INTERSECTION OBSERVER ====================
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animation
                    if (entry.target.hasAttribute('data-count')) {
                        this.animateCounter(entry.target);
                    }
                    
                    // Optional: unobserve after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all reveal elements
        this.revealElements.forEach(el => this.observer.observe(el));
        this.fadeElements.forEach(el => this.observer.observe(el));
    }
    
    // ==================== HERO ANIMATIONS ====================
    
    triggerHeroAnimations() {
        // Wait for loader to finish
        setTimeout(() => {
            this.heroLines.forEach(line => {
                line.classList.add('visible');
            });
            
            this.fadeElements.forEach(el => {
                if (el.closest('.hero')) {
                    el.classList.add('visible');
                }
            });
        }, 1800);
    }
    
    // ==================== COUNTER ANIMATION ====================
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-expo)
            const easeOutExpo = progress === 1 
                ? 1 
                : 1 - Math.pow(2, -10 * progress);
            
            const current = Math.floor(start + (target - start) * easeOutExpo);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    // ==================== PARALLAX ====================
    
    setupParallax() {
        // Simple parallax for hero elements
        const heroGradient = document.querySelector('.hero-gradient');
        const heroGrid = document.querySelector('.hero-grid');
        
        if (heroGradient) {
            this.parallaxElements.push({
                el: heroGradient,
                speed: 0.3
            });
        }
        
        if (heroGrid) {
            this.parallaxElements.push({
                el: heroGrid,
                speed: 0.1
            });
        }
    }
    
    updateParallax() {
        this.parallaxElements.forEach(item => {
            if (item.el) {
                const yPos = this.scrollY * item.speed;
                item.el.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // ==================== SERVICE CARD GLOW ====================
    
    setupServiceCardGlow() {
        const cards = document.querySelectorAll('.service-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }
    
    // ==================== MAGNETIC BUTTONS ====================
    
    setupMagneticButtons() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ==================== SCROLL EVENTS ====================
    
    onScroll() {
        this.scrollY = window.scrollY;
        
        // Throttle heavy work to animation frames (smooth + reliable)
        if (this._rafPending) return;
        this._rafPending = true;
        requestAnimationFrame(() => {
            this._rafPending = false;
            this.updateParallax();
        });
    }
    
    onResize() {
        this.windowHeight = window.innerHeight;
    }
    
    // ==================== RE-INITIALIZE ====================
    
    reinit() {
        // Re-cache elements
        this.cacheElements();
        
        // Observe new elements
        this.revealElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                this.observer.observe(el);
            }
        });
        
        this.fadeElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                this.observer.observe(el);
            }
        });
        
        // Re-setup interactions
        this.setupServiceCardGlow();
        this.setupMagneticButtons();
    }
}

// Initialize animations
const animationController = new AnimationController();

// Export for use in other modules
window.animationController = animationController;
