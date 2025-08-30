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
    ctx.strokeStyle = '#10b981';
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
    ctx.fillStyle = '#10b981';
    dataPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw peak indicator (dotted line)
    const peakPoint = dataPoints[4]; // Fifth point is the peak
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(peakPoint.x, peakPoint.y);
    ctx.lineTo(peakPoint.x, 170);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash
}

// Status dot - static
function setupStatusDots() {
    const dots = document.querySelectorAll('.status-dot');
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
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
    drawDeliveryChart();
    
    // Setup basic interactions
    setupStatusDots();
    setupProjectNavigation();
    setupEmailCopy();
});

// Handle window resize
window.addEventListener('resize', () => {
    drawDeliveryChart();
});