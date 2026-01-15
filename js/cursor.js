/**
 * VESTLABS - Custom Cursor
 * Premium cursor with smooth following and hover effects
 */

class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorDot = document.querySelector('.cursor-dot');
        
        if (!this.cursor || !this.cursorDot) return;
        
        this.cursorPos = { x: 0, y: 0 };
        this.cursorDotPos = { x: 0, y: 0 };
        this.mousePos = { x: 0, y: 0 };
        
        this.cursorSpeed = 0.15;
        this.dotSpeed = 0.35;
        
        this.isVisible = false;
        this.isHovering = false;
        this.isText = false;
        
        this.init();
    }
    
    init() {
        // Only initialize on non-touch devices
        if (this.isTouchDevice()) {
            this.cursor.style.display = 'none';
            this.cursorDot.style.display = 'none';
            document.body.style.cursor = 'auto';
            return;
        }
        
        this.addEventListeners();
        this.animate();
    }
    
    isTouchDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }
    
    addEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
            
            if (!this.isVisible) {
                this.isVisible = true;
                this.cursor.classList.add('visible');
                this.cursorDot.classList.add('visible');
            }
        });
        
        // Mouse leave window
        document.addEventListener('mouseleave', () => {
            this.isVisible = false;
            this.cursor.classList.remove('visible');
            this.cursorDot.classList.remove('visible');
        });
        
        // Mouse enter window
        document.addEventListener('mouseenter', () => {
            this.isVisible = true;
            this.cursor.classList.add('visible');
            this.cursorDot.classList.add('visible');
        });
        
        // Interactive elements
        const hoverElements = document.querySelectorAll(
            'a, button, .service-card, .blog-card, .job-card, .testimonial-card, .pricing-card, .team-member, input, textarea'
        );
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onHoverEnter());
            el.addEventListener('mouseleave', () => this.onHoverLeave());
        });
        
        // Text elements for text cursor
        const textElements = document.querySelectorAll(
            '.hero-title, .page-title, .section-title, .cta-title'
        );
        
        textElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onTextEnter());
            el.addEventListener('mouseleave', () => this.onTextLeave());
        });
    }
    
    onHoverEnter() {
        this.isHovering = true;
        this.cursor.classList.add('hover');
    }
    
    onHoverLeave() {
        this.isHovering = false;
        this.cursor.classList.remove('hover');
    }
    
    onTextEnter() {
        this.isText = true;
        this.cursor.classList.add('text');
    }
    
    onTextLeave() {
        this.isText = false;
        this.cursor.classList.remove('text');
    }
    
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    animate() {
        // Smooth cursor following with lerp
        this.cursorPos.x = this.lerp(this.cursorPos.x, this.mousePos.x, this.cursorSpeed);
        this.cursorPos.y = this.lerp(this.cursorPos.y, this.mousePos.y, this.cursorSpeed);
        
        // Dot follows faster
        this.cursorDotPos.x = this.lerp(this.cursorDotPos.x, this.mousePos.x, this.dotSpeed);
        this.cursorDotPos.y = this.lerp(this.cursorDotPos.y, this.mousePos.y, this.dotSpeed);
        
        // Apply positions
        this.cursor.style.left = `${this.cursorPos.x}px`;
        this.cursor.style.top = `${this.cursorPos.y}px`;
        
        this.cursorDot.style.left = `${this.cursorDotPos.x}px`;
        this.cursorDot.style.top = `${this.cursorDotPos.y}px`;
        
        requestAnimationFrame(() => this.animate());
    }
    
    // Public method to update hover elements after page change
    updateHoverElements() {
        const hoverElements = document.querySelectorAll(
            'a, button, .service-card, .blog-card, .job-card, .testimonial-card, .pricing-card, .team-member, input, textarea'
        );
        
        hoverElements.forEach(el => {
            el.removeEventListener('mouseenter', this.onHoverEnter);
            el.removeEventListener('mouseleave', this.onHoverLeave);
            el.addEventListener('mouseenter', () => this.onHoverEnter());
            el.addEventListener('mouseleave', () => this.onHoverLeave());
        });
    }
}

// Initialize cursor
const customCursor = new CustomCursor();

// Export for use in other modules
window.customCursor = customCursor;
