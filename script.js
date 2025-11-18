// ===== IMPROVED MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== IMPROVED TESTIMONIAL SLIDER =====
let currentSlide = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderDots = document.querySelectorAll('.slider-dot');
const totalSlides = testimonialCards.length;

function updateSliderDots() {
    sliderDots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function slideTestimonials(direction) {
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    }
    
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateSliderDots();
}

// Add click events to slider dots
sliderDots.forEach(dot => {
    dot.addEventListener('click', function() {
        currentSlide = parseInt(this.getAttribute('data-slide'));
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateSliderDots();
        
        // Reset auto-slide timer
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            slideTestimonials('next');
        }, 5000);
    });
});

// Auto-slide testimonials every 5 seconds
let autoSlide = setInterval(() => {
    slideTestimonials('next');
}, 5000);

// Reset auto-slide timer when manually navigating
document.querySelectorAll('.slider-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            slideTestimonials('next');
        }, 5000);
    });
});

// ===== PRODUCT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter products
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== SHOPPING CART FUNCTIONALITY =====
let cartCount = 0;
const cartCounter = document.getElementById('cartCounter');
const cartButton = document.getElementById('cartButton');

function addToCart(productName) {
    cartCount++;
    cartCounter.textContent = cartCount;
    cartCounter.style.animation = 'none';
    setTimeout(() => {
        cartCounter.style.animation = 'pulse 0.5s';
    }, 10);
    
    showNotification(`"${productName}" added to your cart!`, 'success');
}

cartButton.addEventListener('click', () => {
    if (cartCount > 0) {
        showNotification(`You have ${cartCount} item${cartCount > 1 ? 's' : ''} in your cart. Proceed to checkout?`, 'success');
    } else {
        showNotification('Your cart is empty. Start shopping!', 'error');
    }
});

// ===== IMPROVED CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you within 24 hours. 💜', 'success');
    
    // Reset form
    contactForm.reset();
});

// ===== IMPROVED NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    notification.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== GALLERY LIGHTBOX EFFECT =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const itemName = this.querySelector('.gallery-overlay p').textContent;
        showNotification(`🧶 ${itemName} - Contact us to order similar items or discuss customizations!`, 'success');
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== EASTER EGG: YARN BALL CURSOR TRAIL =====
let isYarnMode = false;
let clickCount = 0;

document.querySelector('.logo').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        isYarnMode = !isYarnMode;
        showNotification(isYarnMode ? '🧶 Yarn mode activated! Move your cursor around.' : 'Yarn mode deactivated', 'success');
        clickCount = 0;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isYarnMode) {
        const yarn = document.createElement('div');
        yarn.textContent = '🧶';
        yarn.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            font-size: 20px;
            z-index: 9998;
            animation: yarnFade 1s ease forwards;
        `;
        document.body.appendChild(yarn);
        
        setTimeout(() => yarn.remove(), 1000);
    }
});

// Add yarn animation styles
const yarnStyle = document.createElement('style');
yarnStyle.textContent = `
    @keyframes yarnFade {
        to {
            opacity: 0;
            transform: translateY(-20px) scale(0.5);
        }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(yarnStyle);

// ===== CONSOLE MESSAGE =====
console.log('%c🧶 Welcome to MiCrochet! 🧶', 'font-size: 20px; color: #C8A27A; font-weight: bold;');
console.log('%cHandmade with love since 2020', 'font-size: 14px; color: #8B6F47;');
console.log('%cTip: Click the logo 5 times for a surprise! 😉', 'font-size: 12px; color: #666;');