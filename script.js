/**
 * Bean Board Coffeehouse JavaScript
 * Handles interactive elements and animations
 */

document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const header = document.getElementById("header");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    const newsletterForm = document.querySelector(".newsletter-form");
    
    // Sticky header on scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener("click", function() {
        mobileMenuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });
    
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu tabs functionality
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            button.classList.add("active");
            
            // Get the tab to show
            const tabToShow = button.getAttribute("data-tab");
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove("active"));
            
            // Show the selected tab content
            document.getElementById(`${tabToShow}-menu`).classList.add("active");
        });
    });
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector("input[type='email']");
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // In a real implementation, this would send the data to a server
                showFormSuccess(newsletterForm, "Thank you for subscribing!");
                emailInput.value = "";
            } else {
                showFormError(emailInput, "Please enter a valid email address");
            }
        });
    }
    
    // Initialize Animations on scroll
    initScrollAnimations();
});

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is email valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show success message after form submission
 * @param {HTMLElement} form - The form element
 * @param {string} message - Success message to show
 */
function showFormSuccess(form, message) {
    // Remove any existing messages
    removeFormMessages(form);
    
    // Create success message
    const successEl = document.createElement("div");
    successEl.className = "form-success";
    successEl.textContent = message;
    
    // Insert after form
    form.parentNode.insertBefore(successEl, form.nextSibling);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successEl.remove();
    }, 3000);
}

/**
 * Show error message for a form input
 * @param {HTMLElement} input - The input element
 * @param {string} message - Error message to show
 */
function showFormError(input, message) {
    // Remove any existing error
    removeInputError(input);
    
    // Add error class to input
    input.classList.add("error");
    
    // Create error message
    const errorEl = document.createElement("div");
    errorEl.className = "form-error";
    errorEl.textContent = message;
    
    // Insert after input
    input.parentNode.insertBefore(errorEl, input.nextSibling);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        removeInputError(input);
    }, 3000);
}

/**
 * Remove error styling and message for an input
 * @param {HTMLElement} input - The input element
 */
function removeInputError(input) {
    input.classList.remove("error");
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains("form-error")) {
        errorEl.remove();
    }
}

/**
 * Remove all success and error messages from a form
 * @param {HTMLElement} form - The form element
 */
function removeFormMessages(form) {
    const messages = form.parentNode.querySelectorAll(".form-success, .form-error");
    messages.forEach(msg => msg.remove());
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.feature, .menu-item, .gallery-item, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}
