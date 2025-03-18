// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a navigation link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Counter animation
    const countElements = document.querySelectorAll('[data-count]');
    
    // Statistics counter animation
    function animateCounter(element, target, duration) {
        const start = parseInt(element.textContent);
        const increment = Math.ceil(target / (duration / 16));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = current.toLocaleString();
            }
        }, 16);
    }

    // Create an intersection observer for the counter elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // When an element enters the viewport
            if (entry.isIntersecting) {
                const targetValue = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, targetValue, 1500);
                observer.unobserve(entry.target); // Stop observing once animation starts
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible

    // Observe all counter elements
    countElements.forEach((el) => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header height
                    behavior: 'smooth'
                });
            }
        });
    });
});
