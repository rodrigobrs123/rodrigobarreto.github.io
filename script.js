// ========================================
// Mobile Navigation Toggle
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================

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

// ========================================
// Navbar Background Change on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(30, 58, 138, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(30, 58, 138, 0.1)';
    }
});

// ========================================
// Animate Elements on Scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards and sections
const animatedElements = document.querySelectorAll(
    '.skill-card, .portfolio-item, .timeline-item, .stat-item, .availability-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `
*Nova mensagem do site - Portfólio*

*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone || 'Não informado'}
*Assunto:* ${subject}

*Mensagem:*
${message}
        `.trim();
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // WhatsApp number (remove special characters)
        const whatsappNumber = '5521999091004';
        
        // Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        
        // Show success message
        showNotification('Mensagem enviada! Você será redirecionado para o WhatsApp.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

// ========================================
// Portfolio Image Lazy Loading
// ========================================

const portfolioImages = document.querySelectorAll('.portfolio-image img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

portfolioImages.forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// Add Active State to Current Page
// ========================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// ========================================
// WhatsApp Button Interaction
// ========================================

const whatsappButton = document.querySelector('.whatsapp-float');

if (whatsappButton) {
    // Add click analytics (you can implement your own analytics here)
    whatsappButton.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
    });
    
    // Show tooltip on hover
    whatsappButton.addEventListener('mouseenter', () => {
        if (!whatsappButton.querySelector('.tooltip')) {
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Fale comigo no WhatsApp';
            tooltip.style.cssText = `
                position: absolute;
                right: 70px;
                top: 50%;
                transform: translateY(-50%);
                background: #1e3a8a;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                white-space: nowrap;
                font-size: 0.875rem;
                pointer-events: none;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            `;
            whatsappButton.appendChild(tooltip);
        }
    });
    
    whatsappButton.addEventListener('mouseleave', () => {
        const tooltip = whatsappButton.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}

// ========================================
// Stats Counter Animation
// ========================================

const stats = document.querySelectorAll('.stat-item h3');

const animateCounter = (element) => {
    const target = element.textContent;
    const isNumber = /^\d+\+?$/.test(target);
    
    if (isNumber) {
        const num = parseInt(target);
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const hasPlus = target.includes('+');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                element.textContent = num + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }
        }, duration / steps);
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// Form Validation Enhancement
// ========================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#3b82f6';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#3b82f6';
    });
});

// ========================================
// Console Welcome Message
// ========================================

console.log('%c🚀 Portfólio Rodrigo Barreto', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cAnalista de Sistemas & Desenvolvedor Full Stack', 'color: #1e3a8a; font-size: 14px;');
console.log('%cInteressado em trabalhar juntos? Entre em contato: rodrigobrs123@gmail.com', 'color: #64748b; font-size: 12px;');

// ========================================
// Performance Optimization
// ========================================

// Preload important images
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-preload]');
    images.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
};

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// ========================================
// Back to Top Button (Optional)
// ========================================

const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        z-index: 998;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
};

createBackToTopButton();

// ========================================
// Initialize Everything
// ========================================

console.log('✅ Site carregado com sucesso!');
