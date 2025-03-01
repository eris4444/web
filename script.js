// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Add click handler for contact button
document.querySelector('.contact-btn').addEventListener('click', () => {
    // You can add contact form functionality here
    console.log('Contact button clicked');
});

// Add hover animation for social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-3px)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0)';
    });
});

// Add page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
