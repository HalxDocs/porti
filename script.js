// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Changing Title
const titles = ["Frontend Developer", "Full Stack Developer", "UI/UX Designer"];
const titleElement = document.querySelector('.changing-title');
let currentIndex = 0;

function changeTitle() {
    currentIndex = (currentIndex + 1) % titles.length;
    titleElement.style.opacity = 0;
    
    setTimeout(() => {
        titleElement.textContent = titles[currentIndex];
        titleElement.style.opacity = 1;
    }, 500);
}

// Only set interval if the title element exists
if (titleElement) {
    setInterval(changeTitle, 3000);
}

// CV Popup - Improved selector to include all CV buttons
const cvPopup = document.getElementById('cv-popup');
const cvBtns = document.querySelectorAll('[id^="cv-btn"]'); // Selects all elements with id starting with "cv-btn"
const closeCv = document.getElementById('close-cv');

if (cvPopup && cvBtns.length > 0 && closeCv) {
    cvBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cvPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeCv.addEventListener('click', () => {
        cvPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close popup when clicking outside content
    cvPopup.addEventListener('click', (e) => {
        if (e.target === cvPopup) {
            cvPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Don't prevent default for CV buttons
        if (this.id.startsWith('cv-btn')) return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .skill-item, .project-card');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight / 1.3;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < triggerPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation state
function initAnimations() {
    const animatableElements = document.querySelectorAll('.service-card, .skill-item, .project-card');
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Run animations when page loads and on scroll
window.addEventListener('load', () => {
    initAnimations();
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Add animation to elements already in view on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});