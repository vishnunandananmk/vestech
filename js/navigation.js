/**
 * VESTLABS - Navigation Controller
 * Handles page navigation, mobile menu, and transitions
 */

class NavigationController {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('[data-page]');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.menuBtn = document.querySelector('.nav-menu-btn');
        this.pageTransition = document.querySelector('.page-transition');
        
        this.currentPage = 'home';
        this.isMenuOpen = false;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.setActiveNavLink();
    }
    
    addEventListeners() {
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                if (pageId && pageId !== this.currentPage) {
                    this.navigateTo(pageId);
                }
                
                // Close mobile menu if open
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            });
        });
        
        // Mobile menu button
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMenu();
            }
        });
    }
    
    // ==================== PAGE NAVIGATION ====================
    
    navigateTo(pageId) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Start transition
        this.pageTransition.classList.add('entering');
        
        // After transition covers screen
        setTimeout(() => {
            // Hide current page
            this.pages.forEach(page => page.classList.remove('active'));
            
            // Show new page
            const newPage = document.getElementById(`page-${pageId}`);
            if (newPage) {
                newPage.classList.add('active');
            }
            
            // Update current page
            this.currentPage = pageId;
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update active nav link
            this.setActiveNavLink();
            
            // Start leave transition
            this.pageTransition.classList.remove('entering');
            this.pageTransition.classList.add('leaving');
            
            // Re-initialize animations for new page
            setTimeout(() => {
                if (window.animationController) {
                    window.animationController.reinit();
                }
                
                if (window.customCursor) {
                    window.customCursor.updateHoverElements();
                }
            }, 100);
            
            // End transition
            setTimeout(() => {
                this.pageTransition.classList.remove('leaving');
                this.isTransitioning = false;
            }, 700);
            
        }, 600);
    }
    
    setActiveNavLink() {
        this.navLinks.forEach(link => {
            const pageId = link.getAttribute('data-page');
            if (pageId === this.currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // ==================== MOBILE MENU ====================
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.mobileMenu.classList.add('open');
            this.menuBtn.classList.add('open');
            this.menuBtn.setAttribute('aria-expanded', 'true');
            this.mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            this.mobileMenu.classList.remove('open');
            this.menuBtn.classList.remove('open');
            this.menuBtn.setAttribute('aria-expanded', 'false');
            this.mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }
    
    // ==================== PUBLIC METHODS ====================
    
    getCurrentPage() {
        return this.currentPage;
    }
    
    goToPage(pageId) {
        this.navigateTo(pageId);
    }
}

// Initialize navigation
const navigationController = new NavigationController();

// Export for use in other modules
window.navigationController = navigationController;

// Legacy support for inline onclick handlers
window.showPage = function(pageId) {
    navigationController.navigateTo(pageId);
};

window.toggleMenu = function() {
    navigationController.toggleMenu();
};
