// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initParticles();
    initTokenomicsChart();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
    initCounters();
});

// Typewriter effect for hero section
function initTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'PIXEL PUFFIN',
            'DeFi 3.0 REVOLUTION',
            'MEME MEETS UTILITY'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });
}

// Particle system with p5.js
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    new p5((p) => {
        let particles = [];
        let mouse = { x: 0, y: 0 };
        
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight, canvas);
            
            // Create particles
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8),
                    pulse: p.random(0, p.TWO_PI)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // Update mouse position for interaction
            mouse.x = p.mouseX;
            mouse.y = p.mouseY;
            
            // Update and draw particles
            particles.forEach((particle, index) => {
                // Update pulse animation
                particle.pulse += 0.02;
                const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;
                
                // Mouse interaction
                const mouseDistance = p.dist(particle.x, particle.y, mouse.x, mouse.y);
                if (mouseDistance < 100) {
                    const force = (100 - mouseDistance) / 100;
                    const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
                    particle.vx += Math.cos(angle) * force * 0.01;
                    particle.vy += Math.sin(angle) * force * 0.01;
                }
                
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Apply friction
                particle.vx *= 0.99;
                particle.vy *= 0.99;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle with glow effect
                p.fill(99, 102, 241, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, pulseSize);
                
                // Add glow effect
                p.fill(99, 102, 241, particle.opacity * 100);
                p.ellipse(particle.x, particle.y, pulseSize * 2);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 120) {
                        const opacity = p.map(distance, 0, 120, 0.3, 0);
                        p.stroke(99, 102, 241, opacity * 255);
                        p.strokeWeight(0.5);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Tokenomics chart with ECharts
function initTokenomicsChart() {
    const chartElement = document.getElementById('tokenomics-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            textStyle: {
                color: '#ffffff'
            },
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        series: [{
            name: 'Token Distribution',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            data: [
                { value: 30, name: 'Presale', itemStyle: { color: '#8b5cf6' } },
                { value: 25, name: 'Liquidity', itemStyle: { color: '#ec4899' } },
                { value: 20, name: 'Staking Rewards', itemStyle: { color: '#3b82f6' } },
                { value: 15, name: 'Team & Development', itemStyle: { color: '#10b981' } },
                { value: 10, name: 'Marketing', itemStyle: { color: '#f59e0b' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 20,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                scaleSize: 10
            },
            label: {
                show: true,
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 'bold'
            },
            labelLine: {
                show: true,
                lineStyle: {
                    color: '#ffffff',
                    width: 1
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }]
    };
    
    chart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', () => {
        chart.resize();
    });
    
    // Add click interaction
    chart.on('click', function(params) {
        console.log('Chart clicked:', params.name, params.value + '%');
        
        // Highlight the clicked segment
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: params.dataIndex
        });
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            chart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
        }, 2000);
    });
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('svg');
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('svg');
                otherAnswer.classList.add('hidden');
                otherIcon.classList.remove('rotate-180');
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
                
                // Animate the answer
                anime({
                    targets: answer,
                    opacity: [0, 1],
                    maxHeight: [0, '200px'],
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate cards
                if (element.classList.contains('card-hover')) {
                    anime({
                        targets: element,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 800,
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad'
                    });
                }
                
                // Animate table rows
                if (element.tagName === 'TR') {
                    anime({
                        targets: element,
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        delay: anime.stagger(100),
                        easing: 'easeOutQuad'
                    });
                }
                
                // Animate FAQ items
                if (element.classList.contains('faq-item')) {
                    anime({
                        targets: element,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        delay: anime.stagger(150),
                        easing: 'easeOutQuad'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.card-hover, tr, .faq-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated counters for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            element.textContent = current + (element.getAttribute('data-suffix') || '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Intersection observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    // Fade in the body
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad'
    });
    
    // Animate navigation
    anime({
        targets: 'nav',
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 300,
        easing: 'easeOutQuad'
    });
    
    // Animate hero section elements
    anime({
        targets: '.hero-bg h1',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: 600,
        easing: 'easeOutElastic(1, .8)'
    });
    
    anime({
        targets: '.hero-bg p',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 900,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: '.hero-bg button',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(200, {start: 1200}),
        easing: 'easeOutQuad'
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add button click animations
document.addEventListener('click', (e) => {
    if (e.target.matches('button') || e.target.closest('button')) {
        const button = e.target.matches('button') ? e.target : e.target.closest('button');
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
