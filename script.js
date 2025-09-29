/**
 * Galaxy Labs Website JavaScript
 * Following clean code principles and best practices
 */

class GalaxyLabsWebsite {
    constructor() {
        this.init();
    }

    /**
     * Initialize all website functionality
     */
    init() {
        this.setupEventListeners();
        this.animateCounters();
        this.setupScrollEffects();
        this.setupMobileMenu();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Newsletter form submission
        const newsletterForm = document.querySelector('.newsletter');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }

        // Button click handlers
        document.querySelectorAll('.cta-button, .launch-app-btn').forEach(button => {
            button.addEventListener('click', this.handleLaunchApp.bind(this));
        });

        document.querySelectorAll('.audience-btn').forEach(button => {
            button.addEventListener('click', this.handleAudienceAction.bind(this));
        });
    }

    /**
     * Handle smooth scrolling for anchor links
     * @param {Event} e - Click event
     */
    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Handle newsletter form submission
     * @param {Event} e - Submit event
     */
    handleNewsletterSubmit(e) {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (this.validateEmail(email)) {
            this.showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            this.showNotification('Please enter a valid email address.', 'error');
        }
    }

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} - Whether email is valid
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Handle launch app button clicks
     * @param {Event} e - Click event
     */
    handleLaunchApp(e) {
        e.preventDefault();
        this.showNotification('Launching Galaxy Labs App...', 'info');
        // In a real application, this would redirect to the app
        setTimeout(() => {
            console.log('App would launch here');
        }, 1000);
    }

    /**
     * Handle audience-specific action buttons
     * @param {Event} e - Click event
     */
    handleAudienceAction(e) {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText.includes('Chat')) {
            this.showNotification('Opening chat support...', 'info');
        } else if (buttonText.includes('Exploring')) {
            this.showNotification('Starting Web3 exploration...', 'info');
        }
    }

    /**
     * Animate counter numbers
     */
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    /**
     * Animate individual counter
     * @param {HTMLElement} counter - Counter element to animate
     */
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }

    /**
     * Setup scroll effects for elements
     */
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe product cards and other elements
        document.querySelectorAll('.product-card, .feature-item, .audience-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    /**
     * Show notification to user
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: this.getNotificationColor(type)
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    /**
     * Get notification background color based on type
     * @param {string} type - Notification type
     * @returns {string} - CSS color value
     */
    getNotificationColor(type) {
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            info: '#3B82F6'
        };
        return colors[type] || colors.info;
    }
}

/**
 * Utility functions
 */
class Utils {
    /**
     * Debounce function to limit function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    static debounce(func, wait) {
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

    /**
     * Throttle function to limit function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} - Throttled function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalaxyLabsWebsite();
});

// Handle window resize events
window.addEventListener('resize', Utils.debounce(() => {
    // Recalculate any responsive elements if needed
    console.log('Window resized');
}, 250));

// Handle scroll events for navbar background
window.addEventListener('scroll', Utils.throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}, 100));
