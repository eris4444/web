document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const elements = document.querySelectorAll('.reveal-text, .reveal-image');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.visibility = 'hidden';
    });

    // Trigger animations
    setTimeout(() => {
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        });
    }, 100);

    // Handle navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Handle contact button
    const contactBtn = document.querySelector('.contact-btn');
    contactBtn.addEventListener('click', () => {
        // Add your contact form logic here
        console.log('Contact button clicked');
    });

    // Add hover effects for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-3px)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0)';
        });
    });
});
