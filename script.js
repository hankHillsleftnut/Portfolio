// Simple Chart Drawing for DoorDash Project
function drawDeliveryChart() {
    const canvas = document.getElementById('deliveryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart data points (simulating delivery metrics)
    const dataPoints = [
        { x: 50, y: 150 },
        { x: 80, y: 120 },
        { x: 110, y: 100 },
        { x: 140, y: 80 },
        { x: 170, y: 60 },
        { x: 200, y: 90 },
        { x: 230, y: 110 },
        { x: 260, y: 95 }
    ];
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 8; i++) {
        const x = 50 + (i * 30);
        ctx.beginPath();
        ctx.moveTo(x, 50);
        ctx.lineTo(x, 170);
        ctx.stroke();
    }
    
    // Draw chart line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    dataPoints.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#fbbf24';
    dataPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw peak indicator (dotted line)
    const peakPoint = dataPoints[4]; // Fifth point is the peak
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(peakPoint.x, peakPoint.y);
    ctx.lineTo(peakPoint.x, 170);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash
}

// Status dot animation
function animateStatusDots() {
    const dots = document.querySelectorAll('.status-dot');
    let activeIndex = 0;
    
    setInterval(() => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[activeIndex].classList.add('active');
        activeIndex = (activeIndex + 1) % dots.length;
    }, 2000);
}

// Smooth scroll for project navigation
function setupProjectNavigation() {
    const nextButtons = document.querySelectorAll('.next-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    nextButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const nextIndex = (index + 1) % projectCards.length;
            const nextCard = projectCards[nextIndex];
            
            if (nextCard) {
                nextCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Typing animation for the main title
function typeWriterEffect() {
    const titleElement = document.querySelector('.main-title');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let index = 0;
    const speed = 50;
    
    function type() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// AI Interface Animation
function animateAIInterface() {
    const aiStatus = document.querySelector('.ai-status');
    const responseText = document.querySelector('.response-bubble');
    
    if (!aiStatus || !responseText) return;
    
    // Animate status text
    const statuses = ['Processing...', 'Analyzing...', 'Generating...', 'Complete!'];
    let statusIndex = 0;
    
    const statusInterval = setInterval(() => {
        aiStatus.textContent = statuses[statusIndex];
        statusIndex++;
        
        if (statusIndex >= statuses.length) {
            clearInterval(statusInterval);
            
            // Animate response text
            const originalText = responseText.textContent;
            responseText.textContent = '';
            
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                responseText.textContent += originalText.charAt(charIndex);
                charIndex++;
                
                if (charIndex >= originalText.length) {
                    clearInterval(typeInterval);
                }
            }, 30);
        }
    }, 800);
}

// Parallax effect for left column
function setupParallax() {
    const rightColumn = document.querySelector('.right-column');
    const leftColumn = document.querySelector('.left-column');
    
    if (window.innerWidth > 1024) { // Only on desktop
        rightColumn.addEventListener('scroll', () => {
            const scrollTop = rightColumn.scrollTop;
            const scrollPercent = scrollTop / (rightColumn.scrollHeight - rightColumn.clientHeight);
            
            // Subtle parallax effect on bio text
            const bioText = document.querySelector('.bio-text');
            if (bioText) {
                bioText.style.transform = `translateY(${scrollPercent * 20}px)`;
            }
        });
    }
}

// Copy email to clipboard
function setupEmailCopy() {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = emailLink.href.replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                // Show copied feedback
                const originalText = emailLink.innerHTML;
                emailLink.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    emailLink.innerHTML = originalText;
                }, 2000);
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    setTimeout(drawDeliveryChart, 500);
    
    // Setup animations and interactions
    animateStatusDots();
    setupProjectNavigation();
    setupScrollAnimations();
    setupParallax();
    setupEmailCopy();
    
    // Animate AI interface when it comes into view
    const aiCard = document.querySelector('.answersai');
    if (aiCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateAIInterface, 1000);
                    observer.unobserve(aiCard);
                }
            });
        });
        observer.observe(aiCard);
    }
    
    // Start typing animation
    setTimeout(typeWriterEffect, 1000);
});

// Handle window resize
window.addEventListener('resize', () => {
    drawDeliveryChart();
});

// Smooth transitions for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.01)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});