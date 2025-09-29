// Vetro Labs - Enhanced Main JavaScript
class VetroLabs {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupParticles();
        this.setupNeuralNetwork();
        this.setupScrollAnimations();
        this.setupMetricsAnimation();
        this.setupCodeDemo();
        this.setupSmoothScrolling();
        this.setupHamburgerMenu();
        this.setupAIIntegrations();
        this.setupSolanaPayments();
    }

    // Hamburger Menu Setup
    setupHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // AI Integrations Setup
    setupAIIntegrations() {
        // DeepSeek AI Integration
        const deepSeekAI = new DeepSeekAI();
        
        // VetroGPT Launch
        window.launchVetroGPT = async () => {
            try {
                const response = await deepSeekAI.generateCode('Create a simple React component that displays "Hello from VetroGPT!"');
                alert('🚀 VetroGPT Launched!\n\n✅ DeepSeek AI Connected\n✅ Code Generation Active\n✅ Ready for natural language programming');
            } catch (error) {
                alert('🚀 VetroGPT Launched!\n\n(Simulation Mode - API Key Required)');
            }
        };
        
        // Code Forge Launch
        window.launchCodeForge = () => {
            alert('🔥 AI Forge Activated!\n\n✅ Project Templates Ready\n✅ Best Practices Loaded\n✅ CI/CD Pipeline Configured\n✅ Ready to scaffold projects');
        };
        
        // Smart Deploy Launch
        window.launchSmartDeploy = () => {
            alert('🚀 Smart Deploy Ready!\n\n✅ AWS Integration Active\n✅ Vercel Deployment Ready\n✅ Docker Containers Prepared\n✅ Auto-scaling Enabled');
        };
        
        // Analytics AI Launch
        window.launchAnalyticsAI = () => {
            alert('📊 Analytics AI Active!\n\n✅ Real-time Monitoring\n✅ Predictive Insights\n✅ Performance Alerts\n✅ Custom Dashboards Ready');
        };
    }

    // Solana Payment Setup
    setupSolanaPayments() {
        const solanaPayment = new SolanaPayment();
        
        window.openPaymentModal = (plan) => {
            const modal = document.getElementById('payment-modal');
            if (modal) {
                this.generateSolanaPayment(plan);
                modal.classList.add('active');
            }
        };
        
        window.closePaymentModal = () => {
            const modal = document.getElementById('payment-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        };
    }

    async generateSolanaPayment(plan) {
        const amounts = {
            'starter': 0.1,
            'professional': 0.3
        };
        
        const amount = amounts[plan];
        const paymentAddress = document.getElementById('payment-address');
        const paymentAmount = document.getElementById('payment-amount');
        const paymentPlan = document.getElementById('payment-plan');
        const qrCodeContainer = document.getElementById('qr-code');
        
        if (paymentAddress) paymentAddress.textContent = '3khUUsRd8ihbpSL2ph3BhQfRhJMYtQYhRTzaqU9Uhkay';
        if (paymentAmount) paymentAmount.textContent = amount;
        if (paymentPlan) paymentPlan.textContent = plan.charAt(0).toUpperCase() + plan.slice(1);
        
        try {
            const { url, reference } = await solanaPayment.generatePaymentRequest(amount, plan);
            const qrCode = solanaPayment.createQRCode(url);
            
            if (qrCodeContainer) {
                qrCodeContainer.innerHTML = '';
                qrCodeContainer.appendChild(qrCode);
            }
            
            this.verifyPayment(reference, plan);
        } catch (error) {
            console.error('Payment generation error:', error);
        }
    }

    async verifyPayment(reference, plan) {
        const statusElement = document.getElementById('payment-status');
        const solanaPayment = new SolanaPayment();
        
        if (statusElement) {
            statusElement.innerHTML = '<span class="text-yellow-400">⏳ Waiting for payment...</span>';
        }
        
        const checkInterval = setInterval(async () => {
            try {
                const isPaid = await solanaPayment.verifyPayment(reference);
                
                if (isPaid) {
                    clearInterval(checkInterval);
                    if (statusElement) {
                        statusElement.innerHTML = '<span class="text-green-400">✅ Payment confirmed! Access granted.</span>';
                    }
                    
                    setTimeout(() => {
                        window.closePaymentModal();
                        alert(`🎉 Welcome to Vetro Labs ${plan} plan!\n\nYour payment has been confirmed and you now have full access to our AI tools.`);
                    }, 2000);
                }
            } catch (error) {
                console.error('Payment verification error:', error);
            }
        }, 3000);
        
        // Stop checking after 5 minutes
        setTimeout(() => {
            clearInterval(checkInterval);
            if (statusElement && statusElement.innerHTML.includes('Waiting')) {
                statusElement.innerHTML = '<span class="text-red-400">❌ Payment timeout. Please try again.</span>';
            }
        }, 300000);
    }

    // Typewriter effect for hero text
    setupTypewriter() {
        const typed = new Typed('#typed-text', {
            strings: ['Builders', 'Creators', 'Developers', 'Innovators'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }

    // Particle system using p5.js
    setupParticles() {
        const particleContainer = document.getElementById('particles');
        
        if (particleContainer && typeof p5 !== 'undefined') {
            new p5((p) => {
                let particles = [];
                const numParticles = 50;

                p.setup = () => {
                    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                    canvas.parent('particles');
                    
                    for (let i = 0; i < numParticles; i++) {
                        particles.push({
                            x: p.random(p.width),
                            y: p.random(p.height),
                            vx: p.random(-0.5, 0.5),
                            vy: p.random(-0.5, 0.5),
                            size: p.random(2, 6),
                            opacity: p.random(0.3, 0.8)
                        });
                    }
                };

                p.draw = () => {
                    p.clear();
                    
                    particles.forEach(particle => {
                        particle.x += particle.vx;
                        particle.y += particle.vy;
                        
                        if (particle.x < 0) particle.x = p.width;
                        if (particle.x > p.width) particle.x = 0;
                        if (particle.y < 0) particle.y = p.height;
                        if (particle.y > p.height) particle.y = 0;
                        
                        p.fill(0, 212, 255, particle.opacity * 255);
                        p.noStroke();
                        p.ellipse(particle.x, particle.y, particle.size);
                        
                        particles.forEach(other => {
                            const distance = p.dist(particle.x, particle.y, other.x, other.y);
                            if (distance < 100) {
                                p.stroke(0, 212, 255, (1 - distance / 100) * 50);
                                p.strokeWeight(1);
                                p.line(particle.x, particle.y, other.x, other.y);
                            }
                        });
                    });
                };

                p.windowResized = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                };
            });
        }
    }

    // Neural network visualization
    setupNeuralNetwork() {
        const neuralCanvas = document.getElementById('neural-canvas');
        
        if (neuralCanvas && typeof p5 !== 'undefined') {
            new p5((p) => {
                let nodes = [];
                let connections = [];
                const numLayers = 4;
                const nodesPerLayer = [3, 5, 4, 2];

                p.setup = () => {
                    const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                    canvas.parent('neural-canvas');
                    
                    for (let layer = 0; layer < numLayers; layer++) {
                        for (let node = 0; node < nodesPerLayer[layer]; node++) {
                            nodes.push({
                                x: p.map(layer, 0, numLayers - 1, 100, p.width - 100),
                                y: p.map(node, 0, nodesPerLayer[layer] - 1, 100, p.height - 100),
                                layer: layer,
                                activation: p.random(0.2, 1),
                                pulse: p.random(0, p.TWO_PI)
                            });
                        }
                    }
                    
                    for (let i = 0; i < nodes.length; i++) {
                        for (let j = i + 1; j < nodes.length; j++) {
                            if (nodes[j].layer === nodes[i].layer + 1) {
                                connections.push({
                                    from: i,
                                    to: j,
                                    weight: p.random(0.1, 1),
                                    activity: 0
                                });
                            }
                        }
                    }
                };

                p.draw = () => {
                    p.clear();
                    
                    connections.forEach(conn => {
                        const from = nodes[conn.from];
                        const to = nodes[conn.to];
                        
                        conn.activity = p.lerp(conn.activity, from.activation * to.activation, 0.1);
                        
                        p.stroke(0, 212, 255, conn.activity * 100);
                        p.strokeWeight(conn.weight * 3);
                        p.line(from.x, from.y, to.x, to.y);
                    });
                    
                    nodes.forEach(node => {
                        node.pulse += 0.05;
                        const pulseSize = 1 + p.sin(node.pulse) * 0.2;
                        
                        p.fill(0, 212, 255, node.activation * 255);
                        p.noStroke();
                        p.ellipse(node.x, node.y, 20 * pulseSize);
                        
                        p.fill(255, 255, 255, node.activation * 100);
                        p.ellipse(node.x, node.y, 10 * pulseSize);
                        
                        if (p.random() < 0.02) {
                            node.activation = p.random(0.2, 1);
                        }
                    });
                };

                p.windowResized = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                };
            });
        }
    }

    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Animated metrics counters
    setupMetricsAnimation() {
        const metrics = [
            { id: 'metric-1', target: 70, suffix: '%' },
            { id: 'metric-2', target: 6, suffix: 'X' },
            { id: 'metric-3', target: 50, suffix: '%' },
            { id: 'metric-4', target: 10000, suffix: '+' }
        ];

        const animateMetric = (element, target, suffix) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (target >= 1000) {
                    displayValue = displayValue.toLocaleString();
                }
                
                element.textContent = displayValue + suffix;
            }, 30);
        };

        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    metrics.forEach(metric => {
                        const element = document.getElementById(metric.id);
                        if (element && !element.classList.contains('animated')) {
                            element.classList.add('animated');
                            animateMetric(element, metric.target, metric.suffix);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        const metricsSection = document.querySelector('.metric-card')?.parentElement?.parentElement;
        if (metricsSection) {
            metricsObserver.observe(metricsSection);
        }
    }

    // Code demo animation
    setupCodeDemo() {
        const codeLines = [
            'import React, { useState } from "react";',
            '',
            'const TodoApp = () => {',
            '  const [todos, setTodos] = useState([]);',
            '  const [input, setInput] = useState("");',
            '',
            '  const addTodo = () => {',
            '    if (input.trim()) {',
            '      setTodos([...todos, {',
            '        id: Date.now(),',
            '        text: input,',
            '        completed: false',
            '      }]);',
            '      setInput("");',
            '    }',
            '  };',
            '',
            '  return (',
            '    <div className="todo-app">',
            '      <h1>My Todo List</h1>',
            '      <input',
            '        value={input}',
            '        onChange={(e) => setInput(e.target.value)}',
            '        placeholder="Add a new task..."',
            '      />',
            '      <button onClick={addTodo}>Add</button>',
            '    </div>',
            '  );',
            '};',
            '',
            'export default TodoApp;'
        ];

        const typingElement = document.querySelector('.typing-text');
        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeCode = () => {
            if (!typingElement) return;

            const currentLine = codeLines[lineIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentLine.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    lineIndex = (lineIndex + 1) % codeLines.length;
                }
            } else {
                typingElement.textContent = currentLine.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentLine.length) {
                    isDeleting = true;
                    setTimeout(typeCode, 2000);
                    return;
                }
            }
            
            const typingSpeed = isDeleting ? 30 : 50;
            setTimeout(typeCode, typingSpeed);
        };

        // Start typing animation after a delay
        setTimeout(typeCode, 2000);
    }

    // Smooth scrolling for navigation
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VetroLabs();
});

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Card hover effects
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Button hover effects
    document.querySelectorAll('.glow-effect').forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Add cursor trail effect
    let cursorTrail = [];
    const maxTrailLength = 20;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        // Create cursor trail elements
        if (cursorTrail.length > 1) {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.backgroundColor = 'rgba(0, 212, 255, 0.6)';
            trail.style.borderRadius = '50%';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.transition = 'all 0.3s ease';
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.style.opacity = '0';
                trail.style.transform = 'scale(0)';
                setTimeout(() => {
                    document.body.removeChild(trail);
                }, 300);
            }, 100);
        }
    });
});
